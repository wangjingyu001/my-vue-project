<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange"
    >
        <template #actions>
            <el-button @click="unicode_decode" size="small" class="toolbar-btn">Unicode解码</el-button>
            <el-button @click="unicode_encode" size="small" class="toolbar-btn">Unicode编码</el-button>
        </template>
    </DualEditorLayout>
</template>

<script>
import { Compartment } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import DualEditorLayout from "./DualEditorLayout.vue";

export default {
    name: "unicode_decode",
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
                        this.unicode_decode();
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
        encodeMixedUnicode(input) {
            return input.split('').map(char => {
                if (char.charCodeAt(0) > 127) {
                    return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
                }
                return char;
            }).join('');
        },
        decodeMixedUnicode(input) {
            return input.replace(/\\u([\da-fA-F]{4})/g, (match, code) => {
                return String.fromCharCode(parseInt(code, 16));
            });
        },
        unicode_decode() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: this.decodeMixedUnicode(format_str) } 
                });
            } catch (error) {
                console.error("解码失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "解码出错，请检查输入格式" } 
                });
            }
        },
        unicode_encode() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: this.encodeMixedUnicode(format_str) } 
                });
            } catch (error) {
                console.error("编码失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "编码出错，请检查输入" } 
                });
            }
        }
    }
};
</script>

<style scoped>
.toolbar-btn {
    background: var(--btn-bg, #ffffff);
    border-color: var(--border-color, #dcdfe6);
    color: var(--text-color, #606266);
}

.toolbar-btn:hover {
    background: var(--btn-hover-bg, #ecf5ff);
    border-color: var(--btn-hover-border, #c6e2ff);
    color: var(--btn-hover-text, #409eff);
}
</style>
