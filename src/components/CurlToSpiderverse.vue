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
        </el-row>

    <el-row :gutter="20" class="editor-container">
        <!-- 左侧编辑区域 -->
        <el-col :span="el_col_left">
            <div class="editor-wrapper" id="editor-left">
            </div>
        </el-col>

        <!-- 右侧编辑区域 -->
        <el-col :span="el_col_right">
            <div class="editor-wrapper" id="editor-right">
            </div>
        </el-col>

    </el-row>
</template>

<script>
import { EditorState, Compartment, StateEffect, StateField  } from "@codemirror/state"
import { Decoration, WidgetType } from "@codemirror/view" // 添加这行
import { EditorView, basicSetup } from "codemirror"
import { codeFolding,foldAll, unfoldAll,syntaxTree,foldable,foldEffect   } from "@codemirror/language";
import { python } from "@codemirror/lang-python";

import * as curlconverter from 'curlconverter';
import { ArrowDown } from '@element-plus/icons-vue';
import { forIn } from "lodash";

export default {
    name: "curl_to_spiderverse",
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
            lineWrapping: false,
            leftFolded: false,
            rightFolded: false,
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
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                    // 文档内容发生了变化
                    console.log("内容已变更！");
                    // console.log("变更前内容：", update.startState.doc.toString());
                    // console.log("变更后内容：", update.state.doc.toString());
                    this.formatcurl();
                    
                    }
                }),
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
        foldAllRecursive(view) {
            const state = view.state;

            // Traverse the syntax tree and collect all foldable ranges
            const foldRanges= [];
            syntaxTree(state).iterate({
                enter(node) {
                const isFoldable = foldable(state, node.from, node.to)
                if (isFoldable) {
                    foldRanges.push({ from: isFoldable.from, to: isFoldable.to });
                }
                }
            });

            view.dispatch({
                effects: foldRanges.map(range => foldEffect.of({ from: range.from, to: range.to }))
            });
        },
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
                    if (this.leftFolded) {
                        this.foldAllRecursive(this.editor_left);
                    } else {
                        unfoldAll(this.editor_left);
                    };
                    break;
                case 'foldRight':
                    this.rightFolded = !this.rightFolded;
                    if (this.rightFolded) {
                        this.foldAllRecursive(this.editor_right);
                    } else {
                        unfoldAll(this.editor_right);
                    };
                    break;
            }

        },
        deal_headers_cookie(headers, indent) {
            return JSON.stringify(headers, (key, value) => {
                if (key === 'cookie') return; // 处理 cookie 把cookie 删除
                return value;
            }, indent);
        },
        addSpacesToLastLine(str) {
            const lines = str.split('\n');
            // if (lines[lines.length - 1] === '}') {
            // lines[lines.length - 1] = '    ' + lines[lines.length - 1];
            // }
            forIn(lines, (value, index) => {
                if (index == 0 && lines[index] == '{') {

                } else {
                    lines[index] = '    ' + lines[index];

                }

            })
            return lines.join('\n');
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

        build_requests_code(curl_str) {
            try {
                const json_string_curl = curlconverter.toJsonString(curl_str);
                const json_curl = JSON.parse(json_string_curl);

                const url = new URL(json_curl.raw_url);
                const origin = url.origin;
                const pathname = url.pathname;
                const base_url = origin + pathname;
                const params = Object.fromEntries(url.searchParams);

                const method = json_curl.method;
                const headers = json_curl.headers;
                var data = json_curl.data || {};
                try {
                    if (data) {
                        data = JSON.parse(data);
                    } 
                }catch (error) {
                    console.log("不是json格式的数据")
                }
                const cookies = json_curl.cookies || {};

                let data_temp, data_str, data_python;
                data_python = this.addSpacesToLastLine(this.trans_object_to_dict(data, 4));

                if (method == "post") {
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
                let requests_code = `
def request_composer(data, runtime_vars):
    import json
    from urllib.parse import urlparse, parse_qs, urlencode, urljoin
    headers = ${this.deal_headers_cookie(headers, 8).slice(0, -1) + '    }'}
    cookies = ${this.trans_object_to_dict(cookies, 8).slice(0, -1) + '    }'}
    cookie_str = "; ".join([f"{key}={value}" for key, value in cookies.items()])
    headers["cookie"] = cookie_str
    params = ${this.trans_object_to_dict(params, 8).slice(0, -1) + '    }'}
${data_temp}
    base_url = "${base_url}"
    query_string = urlencode(params)
    url = urljoin(base_url, '?' + query_string)
     
    return {'url': url, 'method': '${method}','headers':headers${data_str},'retries':3}
    
    `
                console.log("完成转换")

                return requests_code;
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.setValue(error);
                return
            }

        },
        formatcurl() {
            const format_str = this.editor_left.state.doc.toString();
            try {
                const response = this.build_requests_code(format_str);
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } });

                console.log("完成格式化")
                this.el_col_left = 12;
                this.el_col_right = 12;
                this.leftFolded = 0;
                this.rightFolded = 0;
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.dispatch({ changes: { from: 0, to: this.editor_right.state.doc.length, insert: response } });
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
    max-height: calc(100vh - 75px);
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
