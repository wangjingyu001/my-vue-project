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
                    
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 执行按钮 -->
        <el-checkbox v-model="lineWrapping" label="自动换行" size="small" border />
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
import { EditorView, basicSetup } from "codemirror"

import { ArrowDown } from '@element-plus/icons-vue';



export default {
    name : "encodedecode_url",
    components: {
        ArrowDown
    },
    data() {
        return {
            el_col_left: 12,
            el_col_right: 12,
            left_content: "",
            right_content: "",
            lineWrapping: false, // 默认关闭换行
            lineWrappingComp: new Compartment(), // 创建 Compartment 实例
   
        };
    },
    mounted() {
        
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                    // 文档内容发生了变化
                    console.log("内容已变更！");
                    // console.log("变更前内容：", update.startState.doc.toString());
                    // console.log("变更后内容：", update.state.doc.toString());
                    this.url_encode_decode();
                    
                    }
                }),
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
            }
        },
        url_encode_decode() {
            const format_str = this.editor_left.state.doc.toString();
            
            try {
                const url_encode_safe = encodeURI(format_str);
                const url_encode_unsafe = encodeURIComponent(format_str);
                const url_decode_safe = decodeURI(format_str);
                const url_decode_unsafe = decodeURIComponent(format_str);


                const response = `

url 安全编码
${url_encode_safe}

url 全部编码
${url_encode_unsafe}

url 安全解码(仅params部分解码)
${url_decode_safe}

url 全部解码
${url_decode_unsafe}

                `

                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } });



            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求失败,请检查控制台日志或输入的url" } });
                
            }


        }
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
