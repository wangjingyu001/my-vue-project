<template>
    <el-row>
        <el-dropdown @command="handleViewCommand" trigger="click">
            <el-button size="small">
                视图控制
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="leftFull" :disabled="el_col_left > 12">左侧全屏</el-dropdown-item>
                    <el-dropdown-item command="rightFull" :disabled="el_col_right > 12">右侧全屏</el-dropdown-item>
                    <el-dropdown-item command="restore" :disabled="el_col_left === 12">还原布局</el-dropdown-item>
                    <!-- 添加空白分隔行 -->
                    <el-dropdown-item disabled style="cursor: default; background: grey; height: 1px; padding: 0; margin: 5px 0;"></el-dropdown-item>
                    <el-dropdown-item command="foldLeft" :disabled="el_col_right > 12">左侧{{ leftFolded ? '展开' : '折叠' }}</el-dropdown-item>
                    <el-dropdown-item command="foldRight" :disabled="el_col_left > 12">右侧{{ rightFolded ? '展开' : '折叠' }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>


    </el-row>
    <el-row gutter="20" class="object-to-dict" style="height: 100%;">
        <!-- 左侧 JSON 编辑区域 -->
        <el-col :span="el_col_left" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea ref="editor_left" placeholder="请输入JSON" class="json-editor-left"></textarea>
            </el-card>
        </el-col>

        <!-- 右侧 JSON 编辑区域 -->
        <el-col :span="el_col_right" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea ref="editor_right" placeholder="请输入JSON" class="json-editor-right"></textarea>
            </el-card>
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
import { ArrowDown } from '@element-plus/icons-vue';
import { objectToDict } from '@/api/api'

export default {
    components: {
        ArrowDown, // 这里注册图标组件
    },
    data() {
        return {
            error_message: "",
            left_content: "",
            right_content: "",
            button1: "全屏",
            button2: "全屏",
            button3: "折叠",
            button4: "折叠",
            el_col_left: 12,
            el_col_right: 12,
        };
    },
    watch: {
        // 监听 left_content 数据的变动
        left_content(newValue, oldValue) {
            console.log("左侧数据发生变动：", { newValue, oldValue });
            this.fetchData(newValue); // 调用处理函数
        },
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "application/json",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            theme: "monokai",
            lineNumbers: true,
        });
        this.editor_left.getWrapperElement().addEventListener('dblclick', this.fetchData);
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "application/json",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            theme: "monokai",
            lineNumbers: true,
        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.left_content = "";
        this.right_content = "";

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
            this.$nextTick(() => {
                if (this.el_col_left > 0) this.jsonEditor_left.refresh();
                if (this.el_col_right > 0) this.jsonEditor_right.refresh();
            });
        },
        fullScreenSpan(area) {
            if (area == "left") {
                // let editor = this.editor_left;
                // this.button1 = this.button1 == "全屏" ? "还原" : "全屏";
                if (this.button1 == "全屏") {
                    this.button1 = "还原"
                    this.el_col_left = 24
                    this.el_col_right = 0
                } else {
                    this.button1 = "全屏"
                    this.el_col_left = 12
                    this.el_col_right = 12
                }
                this.$nextTick(() => {
                    this.editor_left.refresh(); // 通知 CodeMirror 刷新布局
                });
            } else {
                if (this.button2 == "全屏") {
                    this.button2 = "还原"
                    this.el_col_left = 0
                    this.el_col_right = 24
                } else {
                    this.button2 = "全屏"
                    this.el_col_left = 12
                    this.el_col_right = 12
                }
                this.$nextTick(() => {
                    this.editor_right.refresh(); // 通知 CodeMirror 刷新布局
                });
            }
        },
        toggleFold(area) {
            if (area == "left") {
                if (this.button3 == "展开") {
                    this.button3 = "折叠"
                    this.editor_left.execCommand('unfoldAll');
                } else {
                    this.button3 = "展开"
                    this.editor_left.execCommand('foldAll');
                }
            } else {
                if (this.button4 == "展开") {
                    this.button4 = "折叠"
                    this.editor_right.execCommand('unfoldAll');
                } else {
                    this.button4 = "展开"
                    this.editor_right.execCommand('foldAll');
                }
            }
        },
        async fetchData() {
            let format_str = this.editor_left.getValue();
            try {
                try {
                    format_str = JSON.stringify(JSON.parse(format_str));
                } catch (e) {
                }
                const response = await objectToDict(format_str);
                // this.editor_left.off("change", this.fetchData);
                if (response.data.status === 200) {
                    this.editor_left.setValue(response.data.result.object_js);
                    this.editor_right.setValue(response.data.result.dict_py);
                    console.log("完成格式化")
                } else {
                    this.editor_right.setValue("请求失败，请检查控制台日志或输入的数据。");
                    console.log("完成格式化")
                }


            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的数据。");
            } finally {
                // this.editor_left.on("change", this.fetchData);
            }
        },
    },
};
</script>

<style scoped>
.json-editor-left {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    box-sizing: border-box;
    overflow: auto;
    /* 确保内容超出时出现滚动条 */
}

.json-editor-right {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    box-sizing: border-box;
    overflow: auto;
    /* 确保内容超出时出现滚动条 */
}

.card {
    height: 100%;
    overflow: hidden;
    /* 确保卡片内容不会超出卡片边界 */
}
</style>
