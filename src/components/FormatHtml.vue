<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange"
    >
        <template #actions>
            <el-button @click="compression_html" size="small" class="toolbar-btn">压缩HTML</el-button>
            <el-button @click="format_html" size="small" class="toolbar-btn">格式化HTML</el-button>
        </template>
    </DualEditorLayout>
</template>

<script>
import { Compartment } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { codeFolding } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import beautify from "js-beautify";
import { minify } from 'html-minifier-terser';
import DualEditorLayout from "./DualEditorLayout.vue";

export default {
    name: "format_html",
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
                html(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getLeftContainer()
        });

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
                html(),
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
        async compression_html() {
            try {
                const response = await minify(this.editor_left.state.doc.toString(), {
                    collapseWhitespace: true,
                    processScripts: ['application/ld+json'],
                    minifyJS: true,
                    minifyCSS: true
                });
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "压缩失败，请检查输入的 HTML 语法是否正确" } 
                });
            }
        },
        format_html() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                const response = beautify.html(format_str, {
                    indent_size: 4,
                    space_in_empty_paren: true,
                    indent_inner_html: true
                });
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } 
                });
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "格式化失败，请检查输入的 HTML 语法" } 
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
