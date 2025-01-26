<template>


    <el-row :gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->

        <el-col :span="12">
            <div class="editor-wrapper">
                <textarea v-model="left_content" ref="editor_left" class="editor-left"></textarea>
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="12">
            <div class="editor-wrapper">
                <textarea v-model="right_content" ref="editor_right" class="editor-right"></textarea>
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
import 'codemirror/addon/display/placeholder.js'

export default {
    data() {
        return {
            error_message: "",
            left_content: "",
            right_content: ""
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "text/plain",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            lineNumbers: true,
            scrollbarStyle: "simple", // 使用原生滚动条样式
            placeholder: `输入 url 
https://www.google.com/search?q=1&rlz=1C1GCHD_en__1135__1135&oq=1+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRhB0gEINTEzOGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8
            `
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "python",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            lineNumbers: true,
            placeholder: `

url = "https://www.google.com/search"
params = {
    "q": "1",
    "rlz": "1C1GCHD_en__1135__1135",
    "oq": "1 ",
    "gs_lcrp": "EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRhB0gEINTEzOGowajeoAgCwAgA",
    "sourceid": "chrome",
    "ie": "UTF-8"
}



from urllib.parse import urlparse, parse_qs, urlencode, urljoin
base_url = "https://www.google.com/search"
params = {
    "q": "1",
    "rlz": "1C1GCHD_en__1135__1135",
    "oq": "1 ",
    "gs_lcrp": "EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRhB0gEINTEzOGowajeoAgCwAgA",
    "sourceid": "chrome",
    "ie": "UTF-8"
}
query_string = urlencode(params)
full_url = urljoin(base_url, '?' + query_string)


            `,
        });
        this.editor_left.on('change', (instance, changeObj) => {
            this.formaturl(instance.getValue());
        });

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

                this.editor_right.setValue(response);


            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的cookies。");
            }

        }
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
    max-height: calc(100vh - 51px);
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


/* 设置 CodeMirror 的 placeholder 样式 */
.CodeMirror .CodeMirror-placeholder {
    color: #ccc;
    /* 将 placeholder 颜色设置为浅灰色 */
    opacity: 1;
    /* 确保 placeholder 不透明 */
}
</style>