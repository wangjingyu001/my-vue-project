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
import DualEditorLayout from "./DualEditorLayout.vue";

export default {
    name: "format_url",
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
                        this.formaturl();
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
        formaturl() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                const url = new URL(format_str.trim());
                const origin = url.origin;
                const pathname = url.pathname;
                const base_url = origin + pathname;
                const params = Object.fromEntries(url.searchParams);

                const response = `url = "${base_url}"
params = ${JSON.stringify(params, null, 4)}

from urllib.parse import urlparse, parse_qs, urlencode, urljoin
base_url = "${base_url}"
params = ${JSON.stringify(params, null, 4)}
query_string = urlencode(params)
full_url = urljoin(base_url, '?' + query_string)
`;
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "解析失败，请输入合法的 URL 字符串" } 
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
