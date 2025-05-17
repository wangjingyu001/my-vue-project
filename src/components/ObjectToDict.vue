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
import { EditorState, Compartment } from "@codemirror/state"
import { Decoration, WidgetType } from "@codemirror/view" // 添加这行


import { EditorView, basicSetup } from "codemirror"
import { StateEffect, StateField } from "@codemirror/state";
import { foldAll, unfoldAll,foldable,foldEffect , foldGutter, codeFolding ,foldCode,syntaxTree} from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";

// 定义添加 widget 的状态效果
const addWidgetEffect = StateEffect.define();
// 定义清除 widget 的状态效果
const clearWidgetsEffect = StateEffect.define();
// 定义 widget 装饰器的状态字段
const widgetDecorations = StateField.define({
    create() {
        return Decoration.none;
    },
    update(decorations, tr) {
        // 清除所有装饰器
        for (let effect of tr.effects) {
            if (effect.is(clearWidgetsEffect)) {
                return Decoration.none;
            }
        }

        // 添加新装饰器
        for (let effect of tr.effects) {
            if (effect.is(addWidgetEffect)) {
                return effect.value;
            }
        }

        // 保持现有装饰器并映射到新状态
        return decorations.map(tr.changes);
    },
    provide: (f) => EditorView.decorations.from(f),
});

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
            currentWidgetLine: null, // 跟踪当前显示小部件的行号
            query: '',
            response: '', // 接口返回的响应数据，用于显示在右侧编辑器中。可以根据需要进行初始化。
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                json(),
                codeFolding(), // 启用折叠功能
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
                python(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : []), // 动态管理换行扩展
                widgetDecorations, // 添加装饰器状态字段
                EditorView.domEventHandlers({
                    mousedown: (event, view) => {
                        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
                        if (pos !== null) {
                            const line = view.state.doc.lineAt(pos);
                            const lineNumber = line.number;
                            const isAtEnd = pos === line.to;
                            // 如果不是在之前点击的行尾，清除现有小部件
                            if (this.currentWidgetLine !== lineNumber || !isAtEnd) {
                                this.clearWidgets(view);
                            }
                            if (isAtEnd) {
                                console.log("鼠标在行尾");
                                const lineNumber = line.number; // 获取当前行号
                                const path = this.lines_yingshe[lineNumber]; // 获取路径信息
                                const path_reverse = this.lines_yingshe_reverse[lineNumber]; // 获取路径信息

                                if (path) {
                                    this.showInteractiveWidget(view, path.path,lineNumber,path.end_line); // 显示交互组件
                                }
                                if (path_reverse) {
                                    this.showInteractiveWidget(view, path_reverse.path,path_reverse.start_line, lineNumber); // 显示交互组件
                                }
                                // 在这里添加你的逻辑
                            }
                        } else {
                            console.log("鼠标不在行尾");

                        }
                    }
                })
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
        // 清除所有小部件
        clearWidgets(editor) {
            editor.dispatch({
                effects: clearWidgetsEffect.of(null)
            });
            this.currentWidgetLine = null;
        },
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
        getValueByPath(path,start_line,end_line ) {
            const object_js = JSON.parse(this.response.data.result.object_js);

            let current = object_js;
            const pathArray = JSON.parse(path);
            for (let key of pathArray) {

                current = current[key];

            }
            if (Array.isArray(current) && current.length === 0) { return '[]'; }
            if (current !== null && typeof current === "object" && !Array.isArray(current) && Object.keys(current).length === 0) { return '{}'; }
            else if (current === true) { return 'True'; }
            else if (current === false) { return 'False'; }
            else if (current === null) { return 'None'; }
            else if (typeof current === 'object') {
                const first_line = this.editor_right.state.doc.line(start_line);
                const last_line = this.editor_right.state.doc.line(end_line);
                if (last_line.text.slice(-1) == ',') {
                    var to = last_line.to - 1;

                } else { var to = last_line.to; }
                if (first_line.text.trim() == '{') {
                    var from = first_line.from+first_line.length-1;

                } else { 
                    var from = first_line.from+first_line.length-1;
                }

                // const from = this.editor_right.state.doc.line(start_line).from;
                // const to = this.editor_right.state.doc.line(path.end_lin).to;
                const textRange = this.editor_right.state.doc.sliceString(from, to);

                return textRange;
            }
            else if (current === '') { return '""'; }
            else { return current; }

        },
        // 显示交互式 widget 的函数
        showInteractiveWidget(editor, path, start_line, end_line) {
            if (this.currentDecoration) {
                editor.dispatch({
                    effects: StateEffect.appendConfig.of([EditorView.decorations.of(Decoration.none)])
                });
                this.currentDecoration = null;
            }
            const widgetNode = document.createElement("div");
            // widgetNode.style.cssText = "display: flex; align-items: center; margin-left: 1em;";
            widgetNode.style.cssText = "display: inline-flex; align-items: center; margin-left: 1em; vertical-align: middle;"

            // 格式化路径为 ['data', 'feed', 'item'] 格式
            let formattedPath = "";
            try {
                formattedPath = path;
            } catch (e) {
                console.error("路径解析错误:", e);
                return;
            }

            // 显示路径
            const resultSpan = document.createElement("span");
            resultSpan.textContent = `路径：${formattedPath}`;
            resultSpan.style.color = "#666";

            // 创建复制路径按钮
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "复制路径";
            copyBtn.style.marginLeft = "8px";
            copyBtn.onmousedown = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(formattedPath).then(() => {
                    console.log("路径已复制");
                });
            };

            // 创建复制值按钮
            const copyBtnValue = document.createElement("button");
            copyBtnValue.textContent = "复制值";
            copyBtnValue.style.marginLeft = "8px";
            copyBtnValue.onmousedown = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            copyBtnValue.onclick = () => {
                const value = this.getValueByPath(path,start_line,end_line); // 假设你有此函数
                navigator.clipboard.writeText(value).then(() => {
                    console.log("值已复制");
                });
            };

            // 组装组件
            widgetNode.appendChild(resultSpan);
            widgetNode.appendChild(copyBtn);
            widgetNode.appendChild(copyBtnValue);

            // 创建 widget 装饰器
            const decoration = Decoration.widget({
                widget: new class extends WidgetType {
                    toDOM() {
                        return widgetNode;
                    }
                }(),
                side: 1 // 行尾显示
            });

            // 计算行尾位置
            const linePos = editor.state.doc.line(start_line).to;

            // 创建装饰器集合
            const decorations = Decoration.set([decoration.range(linePos)]);

            // 更新编辑器状态
            editor.dispatch({
                effects: addWidgetEffect.of(decorations)
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
                    }
                    break;
                case 'foldRight':
                    this.rightFolded = !this.rightFolded;
                    if (this.rightFolded) {
    //                         this.editor_right.dispatch({
    // effects: EditorView.scrollIntoView(this.editor_right.state.doc.length)
    // });
                    foldAll(this.editor_right)
                        
                        // this.foldAllRecursive(this.editor_right);
                    } else {
                        unfoldAll(this.editor_right);
                    }
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
                    this.lines_yingshe_reverse = this.response.data.result.lines_yingshe_reverse;
                    this.editor_right.requestMeasure()
                    this.editor_right.dispatch({
                effects: EditorView.scrollIntoView(0, { y: "start" })
            });
            // 延迟刷新，确保渲染完成
            setTimeout(() => {
                this.editor_right.requestMeasure();
            }, 1000);

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
