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
        <el-checkbox v-model="show_linenums" label="显示行号" size="small" border />
    </el-row>

    <el-row>
        <el-col :span="5" v-if="error_message" class="error-text">{{ error_message }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_changed"> changed : {{ changed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_removed"> removed : {{ removed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_added"> added : {{ added_nums }}</el-col>
    </el-row>

    <el-row gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->
        <el-col :span="12">
            <div class="editor-wrapper">
                <textarea ref="editor_left" placeholder="请输入JSON" class="editor-left"></textarea>
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="12">
            <div class="editor-wrapper">
                <textarea ref="editor_right" placeholder="请输入JSON" class="editor-right"></textarea>
            </div>
        </el-col>

    </el-row>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css"
import { Loading, ArrowRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { compareJson } from "@/api/api";
// import { formatHeaders } from "@/api/api";
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
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "application/json",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineNumbers: this.show_linenums,
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "application/json",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineNumbers: this.show_linenums,
        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.left_content = "";
        this.right_content = "";
    },
    watch: {
        show_linenums(newValue) {
            // 监听 show_linenums 的变化，动态更新 CodeMirror 的 lineNumbers 配置
            this.editor_left.setOption("lineNumbers", newValue);
            this.editor_right.setOption("lineNumbers", newValue);
        }
    },
    methods: {
        highlightLines(editor, lines, class_type) {

            editor.operation(() => {
                lines.forEach(lineNum => {
                    editor.addLineClass(lineNum, "background", class_type); // 减1是因为行号是从0开始的
                });
            });
        },
        clearHighlights(editor) {
            editor.operation(() => {
                for (let i = 0; i < editor.lineCount(); i++) {
                    let lineHandle = editor.getLineHandle(i);
                    editor.removeLineClass(lineHandle, "background", "highlight_changed");
                    editor.removeLineClass(lineHandle, "background", "highlight_added");
                    editor.removeLineClass(lineHandle, "background", "highlight_removed");
                }
            });
        },
        async handleExecute() {
            this.isLoading = true;

            const left_content_input = this.editor_left.getValue();
            const right_content_input = this.editor_right.getValue();

            // 如果左右的值没有变动，那么即使再次执行也不进行任何操作
            if (left_content_input == this.left_content && right_content_input == this.right_content) {
                this.isLoading = false;
                return
            }
            const response = await compareJson(left_content_input, right_content_input)

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


            this.editor_left.setValue(rpjs.json1);
            this.editor_right.setValue(rpjs.json2);
            this.error_message = '';

            this.clearHighlights(this.editor_left);
            this.clearHighlights(this.editor_right);
            let editor_left_changed = rpjs.json1_highlight_change;
            let editor_right_changed = rpjs.json2_highlight_change;
            let editor_left_removed = rpjs.json1_highlight_removed;
            let editor_right_added = rpjs.json2_highlight_added;
            this.highlightLines(this.editor_left, editor_left_changed, "highlight_changed");
            this.highlightLines(this.editor_right, editor_right_changed, "highlight_changed");
            this.highlightLines(this.editor_left, editor_left_removed, "highlight_removed");
            this.highlightLines(this.editor_right, editor_right_added, "highlight_added");

            this.changed_nums = editor_left_changed.length + editor_right_changed.length
            this.removed_nums = editor_left_removed.length
            this.added_nums = editor_right_added.length

            this.editor_left.refresh()
            this.editor_right.refresh()
            this.isLoading = false;

        },
    },
};
</script>

<style scoped>
.editor-container {
    height: 100%;
    margin: 0;
}

.editor-wrapper {
    height: 100%;
    padding: 5px;
}

/* 添加 CodeMirror 相关样式 */
:deep(.CodeMirror) {
    height: 100% !important;
    max-height: calc(100vh - 95px);
    border: 1px solid #0b4bdf;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
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
