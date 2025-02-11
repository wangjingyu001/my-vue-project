<template>
    <el-row>
        <!-- 视图控制下拉菜单 -->
        <el-dropdown @command="handleViewCommand" trigger="click">
            <el-button size="small">
                视图控制
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <!-- 左侧全屏选项 -->
                    <el-dropdown-item command="leftFull" v-if="el_col_left <= 12">左侧全屏</el-dropdown-item>
                    <!-- 右侧全屏选项 -->
                    <el-dropdown-item command="rightFull" v-if="el_col_right <= 12">右侧全屏</el-dropdown-item>
                    <!-- 还原布局选项 -->
                    <el-dropdown-item command="restore" v-if="el_col_left !== 12">还原布局</el-dropdown-item>
                    <!-- 添加空白分隔行 -->
                    <el-dropdown-item disabled style="cursor: default; background: grey; height: 1px; padding: 0; margin: 5px 0;"></el-dropdown-item>
                    <!-- 左侧折叠/展开选项 -->
                    <el-dropdown-item v-if="el_col_right <= 12" command="foldLeft">左侧{{ leftFolded ? '展开' : '折叠' }}</el-dropdown-item>
                    <!-- 右侧折叠/展开选项 -->
                    <el-dropdown-item command="foldRight" v-if="el_col_left <= 12">右侧{{ rightFolded ? '展开' : '折叠' }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 执行按钮 -->
        <el-checkbox v-model="lineWrapping" label="自动换行" size="small" border />
        <el-checkbox v-model="show_linenums" label="显示行号" size="small" border />
    </el-row>

    <el-row :gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->
        <el-col :span="el_col_left">
            <div class="editor-wrapper">
                <textarea v-model="left_content" ref="editor_left" class="editor-left"></textarea>
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="el_col_right">
            <div class="editor-wrapper">
                <textarea v-model="right_content" ref="editor_right" class="editor-right"></textarea>
            </div>
        </el-col>

    </el-row>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import 'codemirror/mode/python/python';
import 'codemirror/mode/shell/shell.js';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css"
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import "codemirror/addon/fold/indent-fold";
import { supportedArgs } from 'curlconverter/dist/src/generators/python/python.js';
import { parse } from 'curlconverter/dist/src/parse.js';
import { ArrowDown } from '@element-plus/icons-vue';

export default {
    name: "curl_to_requests",
    components: {
        ArrowDown
    },
    data() {
        return {
            error_message: "",
            left_content: "",
            right_content: "",
            el_col_left: 12,
            el_col_right: 12,
            isLoading: false, // 按钮加载状态
            show_linenums: false,
            lineWrapping: false,
            leftFolded: false,
            rightFolded: false,
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "shell",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineWrapping: this.lineWrapping,
            lineNumbers: this.show_linenums,
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "python",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineWrapping: this.lineWrapping,
            lineNumbers: this.show_linenums,
        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_left.on('change', (instance, changeObj) => {
            this.formatcurl(instance.getValue());
        });
        this.left_content = "";
        this.right_content = "";
    },
    watch: {
        show_linenums(newValue) {
            // 监听 show_linenums 的变化，动态更新 CodeMirror 的 lineNumbers 配置
            this.editor_left.setOption("lineNumbers", newValue);
            this.editor_right.setOption("lineNumbers", newValue);
        },
        lineWrapping(newValue) {
            // 监听 lineWrapping 的变化，动态更新 CodeMirror 的 lineWrapping 配置
            this.editor_left.setOption("lineWrapping", newValue);
            this.editor_right.setOption("lineWrapping", newValue);
        }
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
                if (this.el_col_left > 0) this.editor_left.refresh();
                if (this.el_col_right > 0) this.editor_right.refresh();
            });
        },
        toggleLineWrapping() {
            this.editor_left.setOption('lineWrapping', this.lineWrapping); // 更新左侧编辑器的自动换行设置
            this.editor_right.setOption('lineWrapping', this.lineWrapping); // 更新右侧编辑器的自动换行设置
        },
        trans_object_to_dict(data, indent) {
            return JSON.stringify(data, (key, value) => {
                if (value === false) return 'False_trans_python'; // 处理 false
                if (value === true) return 'True_trans_python'; // 处理 true
                if (value === null) return 'None_trans_python'; // 处理 null
                return value;
            }, indent).replace(/"False_trans_python"/g, "False")
                .replace(/"True_trans_python"/g, "True")
                .replace(/"None_trans_python"/g, "None");
        },
        deal_headers_cookie(headers, indent) {
            return JSON.stringify(headers, (key, value) => {
                if (key === 'cookie') return; // 处理 cookie 把cookie 删除
                return value;
            }, indent);
        },

        parse_curl(curl_commond) {
            var result = parse(curl_commond, supportedArgs)
            let method = result[0].urls[0].method;
            let base_url = result[0].urls[0].urlWithoutQueryArray;
            let params = result[0].urls[0].queryDict ? result[0].urls[0].queryDict.reduce((acc, [key, value]) => {
                acc[key.toString()] = value.toString();
                return acc;
            }, {}) : {};
            let headers = result[0].headers.headers.reduce((acc, [key, value]) => {
                acc[key.toString()] = value.toString();
                return acc;
            }, {});
            let cookies = result[0].cookies ? result[0].cookies.reduce((acc, [key, value]) => {
                acc[key.toString()] = value.toString();
                return acc;
            }, {}) : {};

            let data, data_temp, data_str, data_python;
            if (method.toString() == "POST") {
                try {
                    data = JSON.parse(result[0].dataArray[0])

                    data_python = this.trans_object_to_dict(data, 4);
                } catch {
                    data_python = JSON.stringify(result[0].dataArray[0].toString());
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                }


                if (headers['content-type'] && headers['content-type'].indexOf('application/json') !== -1) {
                    data_temp = `
post_data = ${data_python}
    `
                    data_str = `, json=post_data`
                } else if (headers['content-type'] && headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
                    data_temp = `
post_data = ${data_python}
    `
                    data_str = `, data=post_data`
                } else {
                    data_temp = `
post_data = ${data_python}
    `
                    data_str = `, data=json.dumps(post_data,separators=(',', ':'))`
                }

            } else {
                data_temp = ``;
                data_str = ``;
            }
            let requests_code = `import requests
import json 
headers = ${this.deal_headers_cookie(headers, 4)}
cookies = ${this.trans_object_to_dict(cookies, 4)}
params = ${this.trans_object_to_dict(params, 4)}
${data_temp}
url = "${base_url}"

response = requests.${method.toLowerCase()}(url, params=params, cookies=cookies, headers=headers${data_str}, verify=False)
print(response.text)
print(response.status_code)

# from lxml import etree
# html = etree.HTML(response.text)

    
    `

            // console.log(requests_code)
            return requests_code
        },
        formatcurl(format_str) {
            try {
                const response = this.parse_curl(format_str);
                this.editor_right.setValue(response);
                console.log("完成格式化")
                this.el_col_left = 12;
                this.el_col_right = 12;
                this.leftFolded = 0;
                this.rightFolded = 0;
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的curl。");
                this.el_col_left = 12;
                this.el_col_right = 12;
                this.leftFolded = 0;
                this.rightFolded = 0;
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
