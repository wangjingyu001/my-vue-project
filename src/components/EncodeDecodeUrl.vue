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
import "codemirror/lib/codemirror.css";

// 模式引入
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";

// 主题
import "codemirror/theme/monokai.css";


// 滚动条
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/placeholder.js'


export default {

    data() {
        return {
            left_content: "",
            right_content: "",
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.placeholder_left = `
https://example.com/profile?user=alice&id=1234&active=true
`
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "text/plain",
            simplescrollbars: 'simple',
            placeholder: this.placeholder_left
        });
        this.placeholder_right = `
        
url 安全编码
https://example.com/profile?user=alice&id=1234&active=true

url 全部编码
https%3A%2F%2Fexample.com%2Fprofile%3Fuser%3Dalice%26id%3D1234%26active%3Dtrue

url 安全解码(仅params部分解码)
https://example.com/profile?user=alice&id=1234&active=true

url 全部解码
https://example.com/profile?user=alice&id=1234&active=true  

        `
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "text/plain",
            simplescrollbars: 'simple',
            placeholder: this.placeholder_right

        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_left.on('change', (instance, changeObj) => {
            this.url_encode_decode(instance.getValue());
        });
        this.left_content = "";
        this.right_content = "";

        this.editor_left.on('focus', () => {
            // 清空 placeholder
            this.editor_left.setOption('placeholder', '');
        });
        this.editor_right.on('focus', () => {
            // 清空 placeholder
            this.editor_right.setOption('placeholder', '');
        });
        this.editor_left.on('blur', () => {
            // 如果编辑器内容为空，恢复 placeholder
            if (this.editor_left.getValue() === '') {
                this.editor_left.setOption('placeholder', this.placeholder_left);
            }
        });
        this.editor_right.on('blur', () => {
            // 如果编辑器内容为空，恢复 placeholder
            if (this.editor_right.getValue() === '') {
                this.editor_right.setOption('placeholder', this.placeholder_right);
            }
        });
    },
    methods: {
        url_encode_decode(format_str) {
            try {
                const url_encode_safe = encodeURI(format_str);
                const url_encode_unsafe = encodeURIComponent(format_str);
                const url_decode_safe = decodeURI(format_str);
                const url_decode_unsafe = decodeURIComponent(format_str);


                const response = `

url 安全编码
${url_encode_safe}

url 全部编码
${url_encode_unsafe}

url 安全解码(仅params部分解码)
${url_decode_safe}

url 全部解码
${url_decode_unsafe}

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
