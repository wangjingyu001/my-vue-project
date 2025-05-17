<template>
    <el-row>
        <!-- 视图控制下拉菜单 -->
        <el-dropdown @command="handleViewCommand" trigger="click">
            <el-button size="small">
                视图控制
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <!-- 左侧全屏选项 -->
                    <el-dropdown-item command="leftFull" v-if="el_col_left <= 12">左侧全屏</el-dropdown-item>
                    <!-- 右侧全屏选项 -->
                    <el-dropdown-item command="rightFull" v-if="el_col_right <= 12">右侧全屏</el-dropdown-item>
                    <!-- 还原布局选项 -->
                    <el-dropdown-item command="restore" v-if="el_col_left !== 12">还原布局</el-dropdown-item>
                    <!-- 添加空白分隔行 -->
                    <el-dropdown-item disabled style="cursor: default; background: grey; height: 1px; padding: 0; margin: 5px 0;"></el-dropdown-item>
                    <!-- 左侧折叠/展开选项 -->
                    <el-dropdown-item v-if="el_col_right <= 12" command="foldLeft">左侧{{ leftFolded ? '展开' : '折叠' }}</el-dropdown-item>
                    <!-- 右侧折叠/展开选项 -->
                    <el-dropdown-item command="foldRight" v-if="el_col_left <= 12">右侧{{ rightFolded ? '展开' : '折叠' }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 执行按钮 -->
        <el-checkbox v-model="lineWrapping" label="自动换行" size="small" border />
        <el-button @click="compression_js" size="small">
            压缩JS </el-button>
        <el-button @click="format_js" size="small">
            格式化JS </el-button>
    </el-row>

    <el-row :gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->
        <el-col :span="el_col_left">
            <div class="editor-wrapper" id="editor-left">
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="el_col_right">
            <div class="editor-wrapper" id="editor-right">
            </div>
        </el-col>

    </el-row>
</template>

<script>
import { EditorState, Compartment, StateEffect, StateField  } from "@codemirror/state"
import { Decoration, WidgetType } from "@codemirror/view" // 添加这行
import { EditorView, basicSetup } from "codemirror"
import { codeFolding,foldAll, unfoldAll,syntaxTree,foldable,foldEffect   } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import beautify from "js-beautify";
import { minify } from 'terser';

import { ArrowDown } from '@element-plus/icons-vue';

export default {
    name: "format_js",
    components: {
        ArrowDown
    },
    data() {
        return {
            error_message: "",
            left_content: "",
            right_content: "",
            el_col_left: 12,
            el_col_right: 12,
            show_linenums: false,
            lineWrapping: false,
            leftFolded: false,
            rightFolded: false,
            lineWrapping: false, // 默认关闭换行
            lineWrappingComp: new Compartment(), // 创建 Compartment 实例
        };
    },
    mounted() {
        
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                javascript(),
                codeFolding(), // 启用折叠功能
                // EditorView.updateListener.of((update) => {
                //     if (update.docChanged) {
                //     // 文档内容发生了变化
                //     console.log("内容已变更！");
                //     // console.log("变更前内容：", update.startState.doc.toString());
                //     // console.log("变更后内容：", update.state.doc.toString());
                //     this.format_js();
                    
                //     }
                // }),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : []) // 动态管理换行扩展
            ],
            parent: document.getElementById("editor-left"),
            contentHeight: 1000
        })

        const editorLeftContainer = document.getElementById("editor-left");
        editorLeftContainer.style.width = '100%';
        editorLeftContainer.style.height = '100%';

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
                javascript(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : []), // 动态管理换行扩展
            ],
            parent: document.getElementById("editor-right"),
            contentHeight: 1000
        })
        const editorRightContainer = document.getElementById("editor-right");
        editorRightContainer.style.width = '100%';
        editorRightContainer.style.height = '100%';

    },
    watch: {
        lineWrapping(newValue) {
            // 动态更新换行配置
            this.editor_left.dispatch({
                effects: this.lineWrappingComp.reconfigure(newValue ? EditorView.lineWrapping : [])
            });
            this.editor_right.dispatch({
                effects: this.lineWrappingComp.reconfigure(newValue ? EditorView.lineWrapping : [])
            });
        }
    },
    methods: {
        foldAllRecursive(view) {
            const state = view.state;

            // Traverse the syntax tree and collect all foldable ranges
            const foldRanges= [];
            syntaxTree(state).iterate({
                enter(node) {
                const isFoldable = foldable(state, node.from, node.to)
                if (isFoldable) {
                    foldRanges.push({ from: isFoldable.from, to: isFoldable.to });
                }
                }
            });

            view.dispatch({
                effects: foldRanges.map(range => foldEffect.of({ from: range.from, to: range.to }))
            });
        },
        handleViewCommand(command) {
            switch (command) {
                case 'leftFull':
                    this.el_col_left = 24;
                    this.el_col_right = 0;
                    break;
                case 'rightFull':
                    this.el_col_left = 0;
                    this.el_col_right = 24;
                    break;
                case 'restore':
                    this.el_col_left = 12;
                    this.el_col_right = 12;
                    break;
                case 'foldLeft':
                    this.leftFolded = !this.leftFolded;
                    if (this.leftFolded) {
                        this.foldAllRecursive(this.editor_left);
                    } else {
                        unfoldAll(this.editor_left);
                    };
                    break;
                case 'foldRight':
                    this.rightFolded = !this.rightFolded;
                    if (this.rightFolded) {
                        this.foldAllRecursive(this.editor_right);
                    } else {
                        unfoldAll(this.editor_right);
                    };
                    break;
            }
        },
        async compression_js() {
            try {

                const response = await minify(this.editor_left.state.doc.toString());
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: response.code } });

            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求失败,请检查控制台日志或输入的js" } });
               }
        },
        format_js() {
            const format_str = this.editor_left.state.doc.toString();
            try {

                const response = beautify.js(format_str, {
                    indent_size: 4,//缩进两个空格
                    space_in_empty_paren: true
                });
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } });

            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求失败,请检查控制台日志或输入的js" } });
                
            }
        },
    },
};
</script>

<style scoped>
.editor-container {
    height: 100%;
    width: 100%;
    margin: 0;
}

.editor-wrapper {
    height: 100%;
    padding: 5px;
}

/* 添加 CodeMirror 相关样式 */
:deep(.cm-editor) {
    height: 100% !important;
    max-height: calc(100vh - 75px);
    border: 1px solid #0b4bdf;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
}
:deep(.cm-editor.cm-focused) {
    outline: none !important;
}

:deep(.CodeMirror-gutters) {
    border-right: 1px solid #4b4b4b;
    /* background-color: #272822; */
}

/* 可以添加一些悬停效果 */
.editor-card:hover {
    border-color: var(--el-color-primary);
}
</style>
