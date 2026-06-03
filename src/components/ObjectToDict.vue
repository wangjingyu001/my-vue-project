<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange"
    >
        <template #actions>
            <el-button size="small" :loading="isLoading" @click="handleExecute" class="toolbar-btn">
                <el-icon v-if="!isLoading"><ArrowRight /></el-icon>
                <el-icon v-else><LoadingIcon /></el-icon>
                执行
            </el-button>
        </template>
    </DualEditorLayout>
</template>

<script>
import { ArrowRight, Loading as LoadingIcon } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { objectToDict } from '@/api/api';
import { Compartment } from "@codemirror/state";
import { Decoration, WidgetType } from "@codemirror/view";
import { EditorView, basicSetup } from "codemirror";
import { StateEffect, StateField } from "@codemirror/state";
import { foldable, foldEffect, codeFolding, syntaxTree } from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import DualEditorLayout from "./DualEditorLayout.vue";

// 定义添加 widget 的状态效果
const addWidgetEffect = StateEffect.define();
// 定义清除 widget 的状态效果
const clearWidgetsEffect = StateEffect.define();
// 定义添加 count 装饰器的状态效果
const addCountEffect = StateEffect.define();

// 创建一个组合装饰器字段，同时处理widget和count装饰器
const combinedDecorations = StateField.define({
    create() {
        return { widgets: Decoration.none, counts: Decoration.none };
    },
    update(decorations, tr) {
        let widgets = decorations.widgets;
        let counts = decorations.counts;
        
        // 处理所有效果
        for (let effect of tr.effects) {
            if (effect.is(clearWidgetsEffect)) {
                widgets = Decoration.none;
            } else if (effect.is(addWidgetEffect)) {
                widgets = effect.value;
            } else if (effect.is(addCountEffect)) {
                counts = effect.value;
            }
        }
        
        widgets = widgets.map(tr.changes);
        counts = counts.map(tr.changes);
        
        return { widgets, counts };
    },
    provide: (f) => EditorView.decorations.from(f, (value) => {
        if (value.widgets === Decoration.none && value.counts === Decoration.none) {
            return Decoration.none;
        }
        if (value.widgets === Decoration.none) {
            return value.counts;
        }
        if (value.counts === Decoration.none) {
            return value.widgets;
        }
        
        const allDecorations = [];
        const cursor1 = value.widgets.iter();
        const cursor2 = value.counts.iter();
        
        while (cursor1.value !== null) {
            allDecorations.push(cursor1.value.range(cursor1.from, cursor1.to));
            cursor1.next();
        }
        
        while (cursor2.value !== null) {
            allDecorations.push(cursor2.value.range(cursor2.from, cursor2.to));
            cursor2.next();
        }
        
        return Decoration.set(allDecorations.sort((a, b) => a.from - b.from));
    }),
});

export default {
    name: "object_to_dict",
    components: {
        DualEditorLayout,
        ArrowRight,
        LoadingIcon
    },
    data() {
        return {
            isLoading: false,
            lineWrapping: false,
            lineWrappingComp: new Compartment(),
            currentWidgetLine: null,
            response: ''
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                json(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getLeftContainer()
        });

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(),
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : []),
                combinedDecorations,
                EditorView.domEventHandlers({
                    mousedown: (event, view) => {
                        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
                        if (pos !== null) {
                            const line = view.state.doc.lineAt(pos);
                            const lineNumber = line.number;
                            const isAtEnd = pos === line.to;
                            if (this.currentWidgetLine !== lineNumber || !isAtEnd) {
                                this.clearWidgets(view);
                            }
                            if (isAtEnd) {
                                const path = this.lines_yingshe[lineNumber];
                                const path_reverse = this.lines_yingshe_reverse[lineNumber];

                                if (path) {
                                    this.showInteractiveWidget(view, path.path, lineNumber, path.end_line);
                                }
                                if (path_reverse) {
                                    this.showInteractiveWidget(view, path_reverse.path, path_reverse.start_line, lineNumber);
                                }
                            }
                        }
                    }
                })
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
        process_string(externalDataString) {
            const scriptToRun = `
            (() => {
                const None = null;
                const True = true;
                const False = false;
                return ${externalDataString}; 
            })()
            `;
            try {
                let result = eval(scriptToRun);
                return JSON.stringify(result);
            } catch (e) {
                console.error("IIFE eval 执行失败:", e);
                return externalDataString;
            }
        },
        clearWidgets(editor) {
            editor.dispatch({
                effects: clearWidgetsEffect.of(null)
            });
            this.currentWidgetLine = null;
        },
        getValueByPath(path, start_line, end_line) {
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
                let to = last_line.text.slice(-1) === ',' ? last_line.to - 1 : last_line.to;
                let from = first_line.from + first_line.length - 1;
                return this.editor_right.state.doc.sliceString(from, to);
            }
            else if (current === '') { return '""'; }
            else { return current; }
        },
        showInteractiveWidget(view, path, start_line, end_line) {
            if (this.currentDecoration) {
                view.dispatch({
                    effects: StateEffect.appendConfig.of([EditorView.decorations.of(Decoration.none)])
                });
                this.currentDecoration = null;
            }
            const widgetNode = document.createElement("div");
            widgetNode.style.cssText = "display: inline-flex; align-items: center; margin-left: 1em; vertical-align: middle;";

            let formattedPath = path;

            const resultSpan = document.createElement("span");
            resultSpan.textContent = `路径：${formattedPath}`;
            resultSpan.style.color = "#666";

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

            const copyBtnValue = document.createElement("button");
            copyBtnValue.textContent = "复制值";
            copyBtnValue.style.marginLeft = "8px";
            copyBtnValue.onmousedown = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            copyBtnValue.onclick = () => {
                const value = this.getValueByPath(path, start_line, end_line);
                navigator.clipboard.writeText(value).then(() => {
                    console.log("值已复制");
                });
            };

            widgetNode.appendChild(resultSpan);
            widgetNode.appendChild(copyBtn);
            widgetNode.appendChild(copyBtnValue);

            const decoration = Decoration.widget({
                widget: new class extends WidgetType {
                    toDOM() {
                        return widgetNode;
                    }
                }(),
                side: 1
            });

            const linePos = view.state.doc.line(start_line).to;
            const decorations = Decoration.set([decoration.range(linePos)]);

            view.dispatch({
                effects: addWidgetEffect.of(decorations)
            });
        },
        async handleExecute() {
            this.isLoading = true;
            try {
                await this.fetchData();
            } finally {
                this.isLoading = false;
            }
        },
        async fetchData() {
            let format_str = this.editor_left.state.doc.toString();
            try {
                try {
                    format_str = JSON.stringify(JSON.parse(JSON.parse(format_str)));
                } catch (e) {
                    try {
                        format_str = JSON.stringify(JSON.parse(format_str));
                    } catch (e) {}
                }

                try {
                    this.response = await objectToDict(this.process_string(format_str));
                } catch (e) {
                    this.editor_right.dispatch({ 
                        changes: { from: 0, to: this.editor_right.state.doc.length, insert: "请求接口失败，请检查控制台日志或网络." } 
                    });
                    return;
                }

                if (this.response.data.status === 200) {
                    this.path_yingshe = this.response.data.result.path_yingshe;
                    this.editor_left.dispatch({ 
                        changes: { from: 0, to: this.editor_left.state.doc.length, insert: this.response.data.result.object_js } 
                    });
                    this.editor_right.dispatch({ 
                        changes: { from: 0, to: this.editor_right.state.doc.length, insert: this.response.data.result.dict_py } 
                    });
                    this.editor_right.dispatch({
                        effects: EditorView.scrollIntoView(this.editor_right.state.doc.length)
                    });
                    this.editor_left.dispatch({
                        effects: EditorView.scrollIntoView(this.editor_left.state.doc.length)
                    });
                    await new Promise(r => setTimeout(r, 200));
                    
                    this.editor_right.dispatch({ effects: EditorView.scrollIntoView(0) });
                    this.editor_left.dispatch({ effects: EditorView.scrollIntoView(0) });

                    this.lines_yingshe = this.response.data.result.lines_yingshe;
                    this.lines_yingshe_reverse = this.response.data.result.lines_yingshe_reverse;
                    this.addCountDecorations();
                    this.editor_right.requestMeasure();
                } else {
                    this.editor_right.dispatch({ 
                        changes: { from: 0, to: this.editor_right.state.doc.length, insert: "格式化失败,json不合法,请检查控制台日志或输入的数据." } 
                    });
                    ElMessage({
                        message: '请求失败,json不合法,请检查控制台日志或输入的数据.',
                        type: 'error',
                        duration: 3000
                    });
                }
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ 
                    changes: { from: 0, to: this.editor_right.state.doc.length, insert: "格式化失败,json不合法,请检查控制台日志或输入的数据." } 
                });
                ElMessage({
                    message: '请求失败，请检查控制台日志或输入的数据。',
                    type: 'error',
                    duration: 3000
                });
            }
        },
        addCountDecorations() {
            try {
                const object_js = JSON.parse(this.response.data.result.object_js);
                const editor = this.editor_right;
                let decorations = [];
                
                let rootCountText = '';
                if (Array.isArray(object_js)) {
                    rootCountText = `${object_js.length} items`;
                } else if (object_js && typeof object_js === 'object') {
                    rootCountText = `${Object.keys(object_js).length} keys`;
                }
                
                if (rootCountText) {
                    const countSpan = document.createElement('span');
                    countSpan.className = 'count-info';
                    countSpan.textContent = `# ${rootCountText}`;
                    countSpan.style.cssText = "margin-left: 10px; color: var(--text-muted); font-style: italic; font-size: 12px; background-color: var(--toolbar-bg); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--border-color);";
                    
                    const decoration = Decoration.widget({
                        widget: new class extends WidgetType {
                            toDOM() {
                                return countSpan;
                            }
                        }(),
                        side: 1
                    });
                    
                    const firstLinePos = editor.state.doc.line(1).to;
                    decorations.push(decoration.range(firstLinePos));
                }
                
                for (const [key, value] of Object.entries(this.path_yingshe)) {
                    const startLine = value[0];
                    const endLine = value[value.length-1];
                    
                    if (endLine !== startLine) {
                        let countText = '';
                        let path_list = JSON.parse(key);
                        let jsonValue = object_js;
                        
                        for (let path of path_list) {
                            if (jsonValue && jsonValue.hasOwnProperty(path)) {
                                jsonValue = jsonValue[path];
                            } else {
                                jsonValue = null;
                                break;
                            }
                        }
                        
                        if (Array.isArray(jsonValue)) {
                            countText = `${jsonValue.length} items`;
                        } else if (jsonValue && typeof jsonValue === 'object') {
                            countText = `${Object.keys(jsonValue).length} keys`;
                        }
                        
                        if (countText) {
                            const countSpan = document.createElement('span');
                            countSpan.className = 'count-info';
                            countSpan.textContent = `# ${countText}`;
                            countSpan.style.cssText = "margin-left: 10px; color: var(--text-muted); font-style: italic; font-size: 12px; background-color: var(--toolbar-bg); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--border-color);";
                            
                            const decoration = Decoration.widget({
                                widget: new class extends WidgetType {
                                    toDOM() {
                                        return countSpan;
                                    }
                                }(),
                                side: 1
                            });
                            
                            const linePos = editor.state.doc.line(startLine).to;
                            decorations.push(decoration.range(linePos));
                        }
                    }
                }
                
                decorations = decorations.sort((a, b) => a.from - b.from);
                
                if (decorations.length > 0) {
                    const decorationSet = Decoration.set(decorations);
                    editor.dispatch({
                        effects: addCountEffect.of(decorationSet)
                    });
                }
            } catch (error) {
                console.error('Error in addCountDecorations:', error);
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