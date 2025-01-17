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
import { Loading } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { compareJson } from "@/api/api";
// import { formatHeaders } from "@/api/api";
export default {
    name: "json_compare",
    components: {
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
            lineNumbers: true,
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "application/json",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineNumbers: true,
        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.left_content = "";
        this.right_content = "";
    },
    methods: {
        compare_json(json1, json2, path = null) {
            path = path === null ? [] : path
            var differences = []

            if (json1 instanceof Object && json2 instanceof Object) {
                const keys1 = new Set(Object.keys(json1));
                const keys2 = new Set(Object.keys(json2));
                // 找出新增的键
                const difference_add = new Set([...keys2].filter(key => !keys1.has(key)));
                for (const key of difference_add) {
                    differences.push({ "path": path.concat([key]), "type": "added", "value": json2[key] })
                }

                // 找出删除的键
                const difference_remove = new Set([...keys1].filter(key => !keys2.has(key)));
                for (const key of difference_remove) {
                    differences.push({ "path": path.concat([key]), "type": "removed", "value": json1[key] })
                }

                const difference_same = new Set([...keys1].filter(key => keys2.has(key)));
                for (const key of difference_same) {
                    differences.push(...this.compare_json(json1[key], json2[key], path.concat([key])))
                }

            } else if (json1 instanceof Array && json2 instanceof Array) {
                const max_len = Math.max(json1.length, json2.length)
                for (let i = 0; i < max_len; i++) {
                    let new_path = path.concat([i])
                    if (i >= json1.length) {
                        differences.push({ "path": new_path, "type": "added", "value": json2[i] })
                    } else if (i >= json2.length) {
                        differences.push({ "path": new_path, "type": "removed", "value": json1[i] })
                    } else {
                        differences.push(...this.compare_json(json1[i], json2[i], new_path))
                    }
                }
            } else {
                if (json1 !== json2) {
                    differences.push({ "path": path, "type": "changed", "value": { "from": json1, "to": json2 } })
                }

            }

            return differences

        },
        convert_json_to_tree(json_data, line = 1, last_path = null, all_result = null) {
            last_path = last_path === null ? [] : last_path
            all_result = all_result === null ? {} : all_result
            let key_str = '';
            if (json_data instanceof Object) {
                for (const [key, value] of Object.entries(json_data)) {
                    last_path.push(key)
                    key_str = JSON.stringify(last_path)
                    if (all_result[key_str]) {
                        all_result[key_str].push(line)
                    } else {
                        all_result[key_str] = [line]
                    }
                    line = line + 1
                    if (value instanceof Object || value instanceof Array) {
                        [line, all_result] = this.convert_json_to_tree(value, line, last_path, all_result)
                        line += 1
                    } else {
                        last_path.pop()
                        if (last_path.length > 0) {
                            key_str = JSON.stringify(last_path)
                            all_result[key_str].push(line)
                        }
                    }
                }
                if (last_path.length > 0) {
                    last_path.pop();
                    key_str = JSON.stringify(last_path);
                    if (all_result[key_str]) {
                        all_result[key_str].push(line + 1)
                    } else {
                        all_result[key_str] = [line]
                    }
                }
            } else if (json_data instanceof Array) {
                for (const [i, item] of json_data.entries()) {
                    last_path.push(i)
                    key = JSON.stringify(last_path)
                    if (all_result[key]) {
                        all_result[key].push(line)
                    } else {
                        all_result[key] = [line]
                    }
                    line = line + 1;
                    if (item instanceof Object || item instanceof Array) {
                        [line, all_result] = this.convert_json_to_tree(item, line, last_path, all_result)
                        line += 1

                    } else {
                        last_path.pop()
                    }
                }
                if (last_path.length > 0) {
                    key = JSON.stringify(last_path);
                    all_result[key].push(line)
                    last_path.pop()
                } else {
                    line += 1;
                }
            } else {
                if (last_path.length > 0) {
                    let pop_data = last_path.pop()
                } else {
                    let pop_data = ''
                }
                key = JSON.stringify(last_path)
                if (all_result[key]) {
                    all_result[key].push(line)
                } else {
                    all_result[key] = [line]
                }
                if (typeof pop_data === 'number') {
                    line = line + 1
                }
            }

            return [line, all_result]
        },
        compare_json_to_lines(json1, json2) {
            const [_1, json_tree1] = this.convert_json_to_tree(json1)
            const [_2, json_tree2] = this.convert_json_to_tree(json2)

            const differences = this.compare_json(json1, json2)
            let json1_hightlight_change = [];
            let json2_hightlight_change = [];
            let json1_hightlight_removed = [];
            let json2_hightlight_added = [];
            for (const diff of differences) {
                if (diff['type'] === "changed") {
                    let lines1 = json_tree1[JSON.stringify(diff["path"])];
                    let start1 = Math.min(...lines1)
                    let end1 = Math.max(...lines1)
                    json1_hightlight_change.push(Array.from({ length: end1 - start1 + 1 }, (_, i) => start1 + i));


                    let lines2 = json_tree2[JSON.stringify(diff["path"])];
                    let start2 = Math.min(...lines2)
                    let end2 = Math.max(...lines2)
                    json2_hightlight_change.push(Array.from({ length: end2 - start2 + 1 }, (_, i) => start2 + i));

                } else if (diff["type"] === "added") {
                    let lines3 = json_tree2[JSON.stringify(diff["path"])]
                    let start3 = Math.min(...lines3)
                    let end3 = Math.max(...lines3)
                    json2_hightlight_added.push(Array.from({ length: end3 - start3 + 1 }, (_, i) => start3 + i));

                } else if (diff["type"] === "removed") {
                    let lines4 = json_tree1[JSON.stringify(diff["path"])]
                    let start4 = Math.min(...lines4)
                    let end4 = Math.max(...lines4)
                    json1_hightlight_removed.push(Array.from({ length: end4 - start4 + 1 }, (_, i) => start4 + i));

                }

            }
            return {
                'json1_hightlight_change': json1_hightlight_change,
                'json2_hightlight_change': json2_hightlight_change,
                'json1_hightlight_removed': json1_hightlight_removed,
                'json2_hightlight_added': json2_hightlight_added
            }


        },
        tryParseJSON(jsonString) {
            if (!jsonString.trim()) return null;
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                console.error("JSON解析错误:", e);
                return null;
            }
        },
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
                return;
            }
            const rpjs = JSON.parse(response.data.result)
            if (rpjs.json1 == "parse error") {
                this.error_message = '左侧无效的JSON格式';
                console.error(error_message);
                ElMessage({
                    message: error_message,
                    type: 'error',
                    duration: 3000
                });
                return;
            }
            if (rpjs.json2 == "parse error") {
                this.error_message = '右侧无效的JSON格式';
                console.error(error_message);
                ElMessage({
                    message: error_message,
                    type: 'error',
                    duration: 3000
                });
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
    max-height: calc(100vh - 75px);
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
