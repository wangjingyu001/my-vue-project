<template>
    <DualEditorLayout 
        ref="layout" 
        @line-wrapping-change="handleLineWrappingChange"
    >
        <template #actions>
            <div class="diff-summary" v-if="!error_message && (changed_nums || removed_nums || added_nums)">
                <span class="summary-item changed">changed: {{ changed_nums }}</span>
                <span class="summary-item removed">removed: {{ removed_nums }}</span>
                <span class="summary-item added">added: {{ added_nums }}</span>
            </div>
            <div class="error-text" v-if="error_message">{{ error_message }}</div>
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
import { Compartment } from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import { EditorView, basicSetup } from "codemirror";
import { StateEffect, StateField } from "@codemirror/state";
import { codeFolding } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { compareJson } from "@/api/api";
import DualEditorLayout from "./DualEditorLayout.vue";

// 1. 定义高亮效果
const highlightEffect = StateEffect.define({
  map: (val, mapping) => ({
    from: mapping.mapPos(val.from),
    to: mapping.mapPos(val.to),
    className: val.className
  })
});

// 2. 创建状态字段管理装饰器
const highlightField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(highlights, tr) {
    highlights = highlights.map(tr.changes);
    
    for (let e of tr.effects) {
      if (e.is(highlightEffect)) {
        // 使用 Decoration.line 高亮整行
        const deco = Decoration.line({
          attributes: { class: e.value.className }
        }).range(e.value.from);
        highlights = highlights.update({ add: [deco] });
      }
    }
    
    return highlights;
  },
  provide: f => EditorView.decorations.from(f)
});

export default {
    name: "json_compare",
    components: {
        DualEditorLayout,
        ArrowRight,
        LoadingIcon
    },
    data() {
        return {
            error_message: "",
            changed_nums: 0,
            added_nums: 0,
            removed_nums: 0,
            left_content: "",
            right_content: "",
            isLoading: false,
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
                highlightField,
                this.lineWrappingComp.of(this.lineWrapping ? EditorView.lineWrapping : [])
            ],
            parent: this.$refs.layout.getLeftContainer()
        });

        this.editor_right = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(),
                highlightField,
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
        addHighlight(editor, lines, className) {
            const doc = editor.state.doc;
            const ranges = [];
            for (const lineNum of lines) {
                try {
                    // CodeMirror 行号是 1-indexed (1 到 doc.lines)
                    if (lineNum < 1 || lineNum > doc.lines) continue;
                    const line = doc.line(lineNum);
                    ranges.push({
                        from: line.from,
                        to: line.from, // 对于行装饰器，to 与 from 相同
                        className
                    });
                } catch (e) {
                    console.warn(`无效行号: ${lineNum}`, e);
                }
            }

            editor.dispatch({
                effects: ranges.map(range => highlightEffect.of(range))
            });
        },
        async handleExecute() {
            this.isLoading = true;

            const left_content_input = this.editor_left.state.doc.toString();
            const right_content_input = this.editor_right.state.doc.toString();

            if (left_content_input === this.left_content && right_content_input === this.right_content) {
                this.isLoading = false;
                return;
            }
            
            let response;
            try {
                response = await compareJson(this.process_string(left_content_input), this.process_string(right_content_input));
            } catch (e) {
                ElMessage({
                    message: '请求失败,json不合法,请检查控制台日志或输入的数据.',
                    type: 'error',
                    duration: 3000
                });
                this.isLoading = false;
                console.error(e);
                return;
            }

            if (response.data.status !== 200) {
                console.error("解析数据失败");
                ElMessage({
                    message: '请求失败，json不合法，请检查控制台日志或输入的数据。',
                    type: 'error',
                    duration: 3000
                });
                this.error_message = '解析数据失败';
                this.isLoading = false;
                return;
            }

            const rpjs = JSON.parse(response.data.result);
            if (rpjs.json1 === "parse error") {
                this.error_message = '左侧无效的JSON格式';
                ElMessage({
                    message: this.error_message,
                    type: 'error',
                    duration: 3000
                });
                this.isLoading = false;
                return;
            }
            if (rpjs.json2 === "parse error") {
                this.error_message = '右侧无效的JSON格式';
                ElMessage({
                    message: this.error_message,
                    type: 'error',
                    duration: 3000
                });
                this.isLoading = false;
                return;
            }

            // 清理原有高亮并写入新内容
            this.editor_left.dispatch({ changes: { from: 0, to: this.editor_left.state.doc.length, insert: rpjs.json1 } });
            this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: rpjs.json2 } });

            this.error_message = '';

            let editor_left_changed = rpjs.json1_highlight_change;
            let editor_right_changed = rpjs.json2_highlight_change;
            let editor_left_removed = rpjs.json1_highlight_removed;
            let editor_right_added = rpjs.json2_highlight_added;
            
            this.addHighlight(this.editor_left, editor_left_removed, "highlight_removed");
            this.addHighlight(this.editor_left, editor_left_changed, "highlight_changed");
            this.addHighlight(this.editor_right, editor_right_changed, "highlight_changed");
            this.addHighlight(this.editor_right, editor_right_added, "highlight_added");

            this.changed_nums = editor_left_changed.length + editor_right_changed.length;
            this.removed_nums = editor_left_removed.length;
            this.added_nums = editor_right_added.length;

            this.left_content = left_content_input;
            this.right_content = right_content_input;
            this.isLoading = false;
        }
    }
};
</script>

<style scoped>
.diff-summary {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-right: 16px;
    font-size: 12px;
}

.summary-item {
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
    color: #1f2937;
}

.summary-item.changed {
    background-color: var(--highlight-changed);
}

.summary-item.removed {
    background-color: var(--highlight-removed);
}

.summary-item.added {
    background-color: var(--highlight-added);
}

.error-text {
    color: #ef4444;
    font-weight: 500;
    font-size: 12px;
    margin-right: 16px;
}

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
