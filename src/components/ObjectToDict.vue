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
        <el-button size="small" :loading="isLoading" @click="handleExecute">
            <el-icon v-if="!isLoading"><arrow-right /></el-icon>
            <el-icon v-else>
                <loading />
            </el-icon>
            执行
        </el-button>
        <el-checkbox v-model="lineWrapping" label="自动换行" size="small" border />
    </el-row>
    <el-row :gutter="20" class="editor-container">
        <!-- 左侧 JSON 编辑区域 -->
        <el-col :span="el_col_left">
            <div class="editor-wrapper" id="editor-left">
            </div>
        </el-col>

        <!-- 右侧 JSON 编辑区域 -->
        <el-col :span="el_col_right">
            <div class="editor-wrapper" id="editor-right">
            </div>
        </el-col>

    </el-row>
</template>

<script>

import { ArrowDown, ArrowRight, Loading } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { objectToDict } from '@/api/api'

import { EditorView, basicSetup } from "codemirror"
import { EditorState, Compartment } from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"

export default {
    name: "object_to_dict",
    components: {
        ArrowDown, // 这里注册图标组件
        ArrowRight,
        Loading
    },
    data() {
        return {
            error_message: "",
            left_content: "",
            right_content: "",
            el_col_left: 12,
            el_col_right: 12,
            case_input: "",
            case_output: "",
            isLoading: false, // 按钮加载状态
            leftFolded: false,
            rightFolded: false,
            lines_yingshe: {},
            lineWrapping: false, // 默认关闭换行
            lineWrappingComp: new Compartment(), // 创建 Compartment 实例
            query: '',
            response: '', // 接口返回的响应数据，用于显示在右侧编辑器中。可以根据需要进行初始化。
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                javascript(),
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
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : []) // 动态管理换行扩展
            ],
            parent: document.getElementById("editor-right"),
            contentHeight: 1000
        })
        const editorRightContainer = document.getElementById("editor-right");
        editorRightContainer.style.width = '100%';
        editorRightContainer.style.height = '100%';


        // this.left_content = "";
        // this.right_content = "";

        // this.case_output = `右侧处理后为python dict`

        // let currentWidget = null;
        // this.editor_right.on("mousedown", (cm, event) => {
        //     // 清除旧组件
        //     if (currentWidget) currentWidget.clear();

        //     const pos = cm.coordsChar({ left: event.clientX, top: event.clientY }, "window");
        //     const lineContent = cm.getLine(pos.line);
        //     let lineNumber = pos.line + 1; // Codemirror 行号从 0 开始，所以需要 +1
        //     const path = this.lines_yingshe[lineNumber - 1];
        //     // 判断是否点击在行尾空白区域
        //     if (pos.ch >= lineContent.length && path) {
        //         currentWidget = this.showInteractiveWidget(cm, path, pos.line);
        //     }
        // });
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
        getValueByPath(start_lin, path) {
            const object_js = JSON.parse(this.response.data.result.object_js);

            let current = object_js;
            const pathArray = JSON.parse(path.path);
            for (let key of pathArray) {

                current = current[key];

            }
            if (current == []) { return '[]'; }
            if (current == {}) { return '{}'; }
            else if (typeof current === 'object') {
                const firstLineLength = this.editor_right.getLine(start_lin).length;
                const lastLine = this.editor_right.getLine(path.end_lin);
                if (lastLine.slice(-1) == ',') {
                    var lastLineLength = lastLine.length - 1;

                } else { var lastLineLength = lastLine.length; }

                const from = { line: start_lin, ch: firstLineLength - 1 };
                const to = { line: path.end_lin, ch: lastLineLength };
                const textRange = this.editor_right.getRange(from, to);

                return textRange;
            }
            else if (current === true) { return 'True'; }
            else if (current === false) { return 'False'; }
            else if (current === null) { return 'None'; } else { return current; }

        },
        showInteractiveWidget(editor, path, line) {
            let currentWidget = null;
            // 创建显示容器
            const widgetNode = document.createElement("div");
            widgetNode.style = "display:flex; align-items:center; margin-left:1em;";

            // 计算结果
            const calcResult = path.path;
            const resultSpan = document.createElement("span");
            resultSpan.textContent = `路径：${calcResult}`;
            resultSpan.style.color = "#666";

            // 创建复制路径按钮
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "复制路径";
            copyBtn.style.marginLeft = "8px";
            copyBtn.onmousedown = (e) => {
                e.preventDefault();  // 阻止默认行为
                e.stopPropagation(); // 阻止冒泡到编辑器
            };
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(calcResult.toString());
            };
            // 创建复制值按钮

            const copyBtn_value = document.createElement("button");
            copyBtn_value.textContent = "复制值";
            copyBtn_value.style.marginLeft = "8px";
            copyBtn_value.onmousedown = (e) => {
                e.preventDefault();  // 阻止默认行为
                e.stopPropagation(); // 阻止冒泡到编辑器
            };
            copyBtn_value.onclick = () => {
                navigator.clipboard.writeText(this.getValueByPath(line, path));
            };

            // 组装组件
            widgetNode.appendChild(resultSpan);
            widgetNode.appendChild(copyBtn);
            widgetNode.appendChild(copyBtn_value);

            // 添加行尾组件
            currentWidget = editor.addLineWidget(line, widgetNode, {
                coverGutter: false,
                noHScroll: true
            });
            return currentWidget
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
                    this.editor_left.execCommand(this.leftFolded ? 'foldAll' : 'unfoldAll');
                    break;
                case 'foldRight':
                    this.rightFolded = !this.rightFolded;
                    this.editor_right.execCommand(this.rightFolded ? 'foldAll' : 'unfoldAll');
                    break;
            }

            // 在布局变化后刷新编辑器
            // this.$nextTick(() => {
            //     if (this.el_col_left > 0) this.editor_left.refresh();
            //     if (this.el_col_right > 0) this.editor_right.refresh();
            // });
        },
        async handleExecute() {
            this.isLoading = true;
            try {
                await this.fetchData();
            } finally {
                this.isLoading = false;
                this.el_col_left = 12;
                this.el_col_right = 12;
                this.leftFolded = 0;
                this.rightFolded = 0;
            }
        },
        async fetchData() {
            let format_str = this.editor_left.state.doc.toString();
            try {
                try {
                    format_str = JSON.stringify(JSON.parse(format_str));
                } catch (e) {
                }
                try {
                    this.response = await objectToDict(format_str);
                } catch (e) {
                    this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求接口失败，请检查控制台日志或网络." } });
                    console.log("完成格式化")
                }

                if (this.response.data.status === 200) {
                    this.editor_left.dispatch({ changes: { from: 0, to: this.editor_left.state.doc.length, insert: this.response.data.result.object_js } });
                    this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: this.response.data.result.dict_py } });
                    this.lines_yingshe = this.response.data.result.lines_yingshe;
                    console.log("完成格式化")
                } else {
                    this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: "格式化失败,json不合法,请检查控制台日志或输入的数据." } });
                    console.log("完成格式化")
                    ElMessage({
                        message: '请求失败,json不合法,请检查控制台日志或输入的数据.',
                        type: 'error',
                        duration: 3000
                    });
                }


            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的数据。", error);
                ElMessage({
                    message: '请求失败，请检查控制台日志或输入的数据。',
                    type: 'error',
                    duration: 3000
                });
            } finally {
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
    background-color: #272822;
}

/* 可以添加一些悬停效果 */
.editor-card:hover {
    border-color: var(--el-color-primary);
}
</style>
