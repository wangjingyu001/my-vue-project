<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange" 
    />
</template>

<script>
import { Compartment } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import DualEditorLayout from "./DualEditorLayout.vue";

export default {
    name: "encodedecode_url",
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
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.url_encode_decode();
                    }
                }),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getLeftContainer()
        });

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
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
        url_encode_decode() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                const url_encode_safe = encodeURI(format_str);
                const url_encode_unsafe = encodeURIComponent(format_str);
                const url_decode_safe = decodeURI(format_str);
                const url_decode_unsafe = decodeURIComponent(format_str);

                const response = `url 安全编码:
${url_encode_safe}

url 全部编码:
${url_encode_unsafe}

url 安全解码(仅 params 部分解码):
${url_decode_safe}

url 全部解码:
${url_decode_unsafe}
`;
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求失败，请检查输入的 URL 字符串" } 
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
