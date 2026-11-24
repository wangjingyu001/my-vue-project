<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange" 
    />
</template>

<script>
import { Compartment } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { codeFolding } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import * as curlconverter from 'curlconverter';
import DualEditorLayout from "./DualEditorLayout.vue";

export default {
    name: "curl_to_spiderverse",
    components: {
        DualEditorLayout
    },
    data() {
        return {
            lineWrapping: false,
            lineWrappingComp: new Compartment()
        };
    },
    mounted() {
        this._debounceTimer = null;
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        clearTimeout(this._debounceTimer);
                        this._debounceTimer = setTimeout(() => this.formatcurl(), 120);
                    }
                }),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getLeftContainer()
        });

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getRightContainer()
        });

        this.$refs.layout.registerEditors(this.editor_left, this.editor_right);
    },
    beforeUnmount() {
        clearTimeout(this._debounceTimer);
    },
    methods: {
        handleLineWrappingChange(val) {
            this.lineWrapping = val;
            this.editor_left.dispatch({
                effects: this.lineWrappingComp.reconfigure(val ? EditorView.lineWrapping : [])
            });
            this.editor_right.dispatch({
                effects: this.lineWrappingComp.reconfigure(val ? EditorView.lineWrapping : [])
            });
        },
        deal_headers_cookie(headers, indent) {
            return JSON.stringify(headers, (key, value) => {
                if (key === 'cookie') return;
                return value;
            }, indent);
        },
        addSpacesToLastLine(str) {
            const lines = str.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (i === 0 && lines[i] === '{') {
                    continue;
                }
                lines[i] = '    ' + lines[i];
            }
            return lines.join('\n');
        },
        trans_object_to_dict(data, indent) {
            return JSON.stringify(data, (key, value) => {
                if (value === false) return 'False_trans_python';
                if (value === true) return 'True_trans_python';
                if (value === null) return 'None_trans_python';
                return value;
            }, indent).replace(/"False_trans_python"/g, "False")
                .replace(/"True_trans_python"/g, "True")
                .replace(/"None_trans_python"/g, "None");
        },
        build_requests_code(curl_str) {
            try {
                const json_string_curl = curlconverter.toJsonString(curl_str);
                const json_curl = JSON.parse(json_string_curl);

                const url = new URL(json_curl.raw_url);
                const origin = url.origin;
                const pathname = url.pathname;
                const base_url = origin + pathname;
                const params = Object.fromEntries(url.searchParams);

                const method = json_curl.method;
                const headers = json_curl.headers;
                let data = json_curl.data || {};
                try {
                    if (data) {
                        data = JSON.parse(data);
                    } 
                } catch (error) {}
                const cookies = json_curl.cookies || {};

                let data_temp, data_str;
                const data_python = this.addSpacesToLastLine(this.trans_object_to_dict(data, 4));

                if (method === "post") {
                    if (headers['content-type'] && headers['content-type'].indexOf('application/json') !== -1) {
                        data_temp = `\n    post_data = ${data_python}\n`;
                        data_str = `, json=post_data`;
                    } else if (headers['content-type'] && headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
                        data_temp = `\n    post_data = ${data_python}\n`;
                        data_str = `, data=post_data`;
                    } else {
                        data_temp = `\n    post_data = ${data_python}\n`;
                        data_str = `, data=json.dumps(post_data, separators=(',', ':'))`;
                    }
                } else {
                    data_temp = ``;
                    data_str = ``;
                }

                return `
def request_composer(data, runtime_vars):
    import json
    from urllib.parse import urlparse, parse_qs, urlencode, urljoin
    headers = ${this.deal_headers_cookie(headers, 8).slice(0, -1) + '    }'}
    cookies = ${this.trans_object_to_dict(cookies, 8).slice(0, -1) + '    }'}
    cookie_str = "; ".join([f"{key}={value}" for key, value in cookies.items()])
    headers["cookie"] = cookie_str
    params = ${this.trans_object_to_dict(params, 8).slice(0, -1) + '    }'}
${data_temp}
    base_url = "${base_url}"
    query_string = urlencode(params)
    url = urljoin(base_url, '?' + query_string)
     
    return {'url': url, 'method': '${method}', 'headers': headers${data_str}, 'retries': 3}
`;
            } catch (error) {
                console.error("请求失败:", error);
                return `解析失败: ${error.message}`;
            }
        },
        formatcurl() {
            const format_str = this.editor_left.state.doc.toString();
            if (!format_str.trim()) {
                this.editor_right.dispatch({
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: '' }
                });
                return;
            }
            try {
                const response = this.build_requests_code(format_str);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("格式化出错:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "格式化解析失败，请检查输入的 curl 命令格式" } 
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
