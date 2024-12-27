<template>


    <el-row gutter="20" class="json-format" style="height: 100%;">
        <!-- 左侧 JSON 编辑区域 -->

        <el-col :span="12" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonLeft" placeholder="输入url ,例如
https://example.com/profile?user=alice&id=1234&active=true
                        " class="json-editor"></textarea>
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
            this.formaturl(newValue); // 调用处理函数
        },
    },
    mounted() {
        this.format  = window.prettier
        this.babelParser = window.prettierPlugins.babel
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
        this.jsonEditor2.setValue(`
        
url = "https://example.com/profile"
params = {
    "user": "alice",
    "id": "1234",
    "active": "true"
}


from urllib.parse import urlparse, parse_qs, urlencode, urljoin
base_url = "https://example.com/profile"
params = {
    "user": "alice",
    "id": "1234",
    "active": "true"
}
query_string = urlencode(params)
full_url = urljoin(base_url, '?' + query_string)

                
        `)
        this.jsonLeft = "";
     
    },
    methods: {
        extractUrlParams(urlString) {
            const url = new URL(urlString);
            return Object.fromEntries(url.searchParams);
        },
        formaturl(format_str) {
            try {
                const url = new URL(format_str);
                const origin = url.origin;
                const pathname = url.pathname;
                const base_url = origin + pathname;
                const params = Object.fromEntries(url.searchParams);


                const response = `
url = "${base_url}"
params = ${JSON.stringify(params, null, 4)}


from urllib.parse import urlparse, parse_qs, urlencode, urljoin
base_url = "${base_url}"
params = ${JSON.stringify(params, null, 4)}
query_string = urlencode(params)
full_url = urljoin(base_url, '?' + query_string)

                `
                
                this.jsonEditor2.setValue(response);
      
                
            } catch (error) {
                
                console.error("请求失败:", error);
                this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的cookies。");
            }
 
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