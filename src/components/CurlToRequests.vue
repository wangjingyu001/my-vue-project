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
    name: "curl_to_requests",
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
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.formatcurl();
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
        deal_headers_cookie(headers, indent) {
            return JSON.stringify(headers, (key, value) => {
                if (key === 'cookie') return; // 移除 cookie
                return value;
            }, indent);
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
                } catch (error) {
                    console.log("不是json格式的数据")
                }
                const cookies = json_curl.cookies || {};

                let data_temp, data_str, data_python;
                data_python = this.trans_object_to_dict(data, 4);

                if (method === "post") {
                    if (headers['content-type'] && headers['content-type'].indexOf('application/json') !== -1) {
                        data_temp = `post_data = ${data_python}\n`;
                        data_str = `, json=post_data`;
                    } else if (headers['content-type'] && headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
                        data_temp = `post_data = ${data_python}\n`;
                        data_str = `, data=post_data`;
                    } else {
                        data_temp = `post_data = ${data_python}\n`;
                        data_str = `, data=json.dumps(post_data, separators=(',', ':'))`;
                    }
                } else {
                    data_temp = ``;
                    data_str = ``;
                }
                
                return `import requests
import json 

headers = ${this.deal_headers_cookie(headers, 4)}
cookies = ${this.trans_object_to_dict(cookies, 4)}
params = ${this.trans_object_to_dict(params, 4)}
${data_temp}url = "${base_url}"

response = requests.${method}(url, params=params, cookies=cookies, headers=headers${data_str}, verify=False)
print(response.text)
print(response.status_code)
`;
            } catch (error) {
                console.error("解析失败:", error);
                return `解析失败: ${error.message}`;
            }
        },
        formatcurl() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                const response = this.build_requests_code(format_str);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求失败，请检查输入的 curl 命令格式" } 
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
