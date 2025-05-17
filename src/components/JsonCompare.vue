<template>
    <el-row>
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

    <el-row>
        <el-col :span="5" v-if="error_message" class="error-text">{{ error_message }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_changed"> changed : {{ changed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_removed"> removed : {{ removed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_added"> added : {{ added_nums }}</el-col>
    </el-row>

    <el-row :gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->
        <el-col :span="12">
            <div class="editor-wrapper" id="editor-left">
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="12">
            <div class="editor-wrapper" id="editor-right">
            </div>
        </el-col>

    </el-row>
</template>

<script>
import { EditorState, Compartment, StateEffect, StateField  } from "@codemirror/state"
import { Decoration, WidgetType } from "@codemirror/view" // 添加这行
import { EditorView, basicSetup } from "codemirror"
import { codeFolding } from "@codemirror/language";
import { python } from "@codemirror/lang-python";

import { Loading, ArrowRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { compareJson } from "@/api/api";
// import { formatHeaders } from "@/api/api";



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
    // 映射现有高亮到新文档位置
    highlights = highlights.map(tr.changes);
    
    // 添加新高亮
    for (let e of tr.effects) {
      if (e.is(highlightEffect)) {
        const deco = Decoration.mark({
          class: e.value.className
        }).range(e.value.from, e.value.to);
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
        ArrowRight,
        Loading
    },
    data() {
        return {
            error_message: "",
            changed_nums: 0,
            added_nums: 0,
            removed_nums: 0,
            left_content: "",
            right_content: "",
            isLoading: false, // 按钮加载状态
            show_linenums: true,
            lineWrapping: false, // 默认关闭换行
            lineWrappingComp: new Compartment(), // 创建 Compartment 实例
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = new EditorView({
            extensions: [
                basicSetup,
                python(),
                codeFolding(), // 启用折叠功能
                highlightField ,
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
                highlightField ,
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
        
        // 4. 添加高亮（可选，完整示例）
        addHighlight(editor, lines, className) {
            // 1. 获取文档对象
            const doc = editor.state.doc;
            
            // 2. 收集所有需要高亮的范围
            const ranges = [];
            for (const lineNum of lines) {
                try {
                // 行号有效性检查
                if (lineNum < 0 || lineNum >= doc.lines) continue;
                
                // 获取行范围
                const line = doc.line(lineNum + 1); // 注意: 行号从1开始
                ranges.push({
                    from: line.from,
                    to: line.to,
                    className
                });
                } catch (e) {
                console.warn(`无效行号: ${lineNum}`, e);
                }
            }

            // 3. 批量添加高亮效果
            editor.dispatch({
                effects: ranges.map(range => 
                highlightEffect.of(range))
            })
        },

        async handleExecute() {
            this.isLoading = true;

            const left_content_input = this.editor_left.state.doc.toString();
            const right_content_input = this.editor_right.state.doc.toString();

            // 如果左右的值没有变动，那么即使再次执行也不进行任何操作
            if (left_content_input == this.left_content && right_content_input == this.right_content) {
                this.isLoading = false;
                return
            }
            try{
                var response = await compareJson(left_content_input, right_content_input)
            } catch (e) {
                    ElMessage({
                        message: '请求失败,json不合法,请检查控制台日志或输入的数据.',
                        type: 'error',
                        duration: 3000
                    });
                this.isLoading = false;
                    console.error(e)
                    return 
            }
            if (response.data.status != 200) {
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
            const rpjs = JSON.parse(response.data.result)
            if (rpjs.json1 == "parse error") {
                this.error_message = '左侧无效的JSON格式';
                console.error(this.error_message);
                ElMessage({
                    message: this.error_message,
                    type: 'error',
                    duration: 3000
                });
                this.isLoading = false;
                return;
            }
            if (rpjs.json2 == "parse error") {
                this.error_message = '右侧无效的JSON格式';
                console.error(this.error_message);
                ElMessage({
                    message: this.error_message,
                    type: 'error',
                    duration: 3000
                });
                this.isLoading = false;
                return;
            }

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

            this.changed_nums = editor_left_changed.length + editor_right_changed.length
            this.removed_nums = editor_left_removed.length
            this.added_nums = editor_right_added.length

            // this.editor_left.refresh()
            // this.editor_right.refresh()
            this.isLoading = false;

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
    max-height: calc(100vh - 100px);
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
