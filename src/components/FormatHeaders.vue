<template>


    <el-row gutter="20" class="json-format" style="height: 100%;">
        <!-- 左侧 JSON 编辑区域 -->

        <el-col :span="12" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonLeft" placeholder="在这里粘贴从浏览器控制台复制的headers " class="json-editor"></textarea>
            </el-card>
        </el-col>

        <!-- 右侧 JSON 编辑区域 -->
        <el-col :span="12" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonRight" ref="jsonEditor2" placeholder="点击处理" class="json-editor"></textarea>
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
import { formatHeaders } from "@/api/api"; // 引入封装的方法

export default {
    data() {
        return {
            jsonLeft: "", // 左侧 JSON 输入
            jsonRight: "", // 右侧 JSON 输入
            compareResult: null, // 比对结果
            responseData : "",
        };
    },
    watch: {
        // 监听 text 数据的变动
        jsonLeft(newValue, oldValue) {
            console.log("数据发生变动：", { newValue, oldValue });
            this.formatcurl(newValue); // 调用处理函数
        },
    },
    mounted() {
        // 初始化 CodeMirror
        this.jsonEditor2 = CodeMirror.fromTextArea(this.$refs.jsonEditor2, {
            mode: "application/json",
            //   theme: "monokai",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // lineWrapping: true, // 启用自动换行
            lineNumbers: true,
            scrollbarStyle: "simple" // 使用原生滚动条样式
        });
        this.jsonEditor2.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.jsonLeft = "";
        // this.jsonEditor2.on("mousedown", this.formatcurl);

    },
    methods: {
        async fetchData(format_str) {
            try {
                // 发起请求，替换为你的接口地址
                // const format_str = this.format_str;
                const response = await formatHeaders(format_str);
                if (response.data.status===200){
                    this.jsonEditor2.setValue(JSON.stringify(response.data.result, null, 4));
                    console.log("完成格式化")
                }else{
                    this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的headers。");
                    console.log("完成格式化")
                }
                
            } catch (error) {
                console.error("请求失败:", error);
                this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的headers。");
            }
        },
        async formatcurl(format_str) {
            this.fetchData(format_str)

            // this.jsonEditor2.setValue(JSON.parse(this.responseData).result);
            // console.log("完成格式化")
        }
    },
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