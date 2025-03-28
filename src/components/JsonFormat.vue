<template>
    <!-- <el-container style="height: 100%; padding: 10px;">
      <el-main style="height: 100%;"> -->
    <el-row v-if="isValidJson(jsonLeft)" class="format_buttons">
        <el-button @click="fullScreenSpan">{{ button_1 }}</el-button>
        <el-button @click="toggleFold">{{ button_2 }}</el-button>
        <el-button>Default</el-button>
        <el-button>Default</el-button>
        <el-button>Default</el-button>
    </el-row>
    <el-row gutter="20" class="json-format" style="height: 100%;">
        <!-- 左侧 JSON 编辑区域 -->

        <el-col :span="el_col_left" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <p v-if="!isValidJson(jsonLeft)" class="error-text">左侧JSON不合法!</p>
                <textarea v-model="jsonLeft" placeholder="在这里粘贴JSON数据" class="json-editor"></textarea>
            </el-card>
        </el-col>

        <!-- 右侧 JSON 编辑区域 -->
        <el-col :span="el_col_right" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonRight" ref="jsonEditor2" placeholder="点击处理" class="json-editor"></textarea>
            </el-card>
        </el-col>
    </el-row>
    <!-- </el-main>
    </el-container> -->
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
import { formatJson } from "@/api/api"; // 引入封装的方法

export default {
    data() {
        return {
            jsonLeft: "", // 左侧 JSON 输入
            jsonRight: "", // 右侧 JSON 输入
            compareResult: null, // 比对结果
            full_screen: false,
            el_col_left: 12,
            el_col_right: 12,
            button_1: "全屏",
            button_2: "折叠所有",
            folded: false,

        };
    },
    watch: {
        // 监听 text 数据的变动
        jsonLeft(newValue, oldValue) {
            console.log("数据发生变动：", { newValue, oldValue });
            this.formatjson(newValue); // 调用处理函数
        },
    },
    mounted() {
        // 初始化 CodeMirror
        this.jsonEditor2 = CodeMirror.fromTextArea(this.$refs.jsonEditor2, {
            mode: "application/json",
            //   theme: "monokai",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            lineWrapping: true, // 启用自动换行
            lineNumbers: true,
            scrollbarStyle: "simple" // 使用原生滚动条样式
        });
        this.jsonEditor2.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.jsonLeft = "";

        this.jsonEditor2.on("mousedown", function (instance, event) {
            let pos = instance.coordsChar({ left: event.clientX, top: event.clientY });
            let lineNumber = pos.line + 1; // Codemirror 行号从 0 开始，所以需要 +1
            console.log("点击行号：", lineNumber);
            // 在这里执行你的其他操作，例如：
            // doSomethingWithLine(lineNumber);
        });

    },
    methods: {
        async fetchData(format_str) {
            try {
                // 发起请求，替换为你的接口地址
                // const format_str = this.format_str;
                const response = await formatJson(format_str);
                if (response.data.status === 200) {
                    this.jsonEditor2.setValue(response.data.result);
                    console.log("完成格式化")
                } else {
                    this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的headers。");
                    console.log("完成格式化")
                }

            } catch (error) {
                console.error("请求失败:", error);
                this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的headers。");
            }
        },
        isValidJson(json) {
            if (!json.trim()) {
                this.compareResult = "请输入合法json";
                return false; // 空白 JSON 不合法
            }
            try {
                JSON.parse(json, null, 4);
                return true;
            } catch (e) {
                return false;
            }
        },
        async formatjson(format_str) {
            this.fetchData(format_str);

        },
        fullScreenSpan() {
            this.full_screen = !this.full_screen;
            if (this.full_screen) {
                this.el_col_left = 0
                this.el_col_right = 24
                this.button_1 = "还原"
            } else {
                this.el_col_left = 12
                this.el_col_right = 12
                this.button_1 = "全屏"
            }
            this.$nextTick(() => {
                this.jsonEditor2.refresh(); // 通知 CodeMirror 刷新布局
            });

        },
        toggleFold() {
            if (this.folded) {
                this.jsonEditor2.execCommand('unfoldAll');
                this.button_2 = "折叠所有"
            } else {
                this.jsonEditor2.execCommand('foldAll');
                this.button_2 = "展开所有"
            }
            this.folded = !this.folded;
        },

    }
};
</script>

<style scoped>
.json-editor {
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

.error-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.card {
    height: 100%;
    overflow: hidden;
    /* 确保卡片内容不会超出卡片边界 */
}
</style>