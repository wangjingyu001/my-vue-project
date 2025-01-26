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
        <el-button @click="compression_html" size="small">
            压缩JS </el-button>
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

// 折叠相关
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/xml-fold";  // 添加这个
import "codemirror/addon/fold/foldgutter.css";
import beautify from "js-beautify";
import { minify } from 'terser';

import { ArrowDown } from '@element-plus/icons-vue';

export default {
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
            show_linenums: false,
            lineWrapping: false,
            leftFolded: false,
            rightFolded: false,
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "javascript",
            foldGutter: true,
            simplescrollbars: 'simple',
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // theme: "monokai",
            lineWrapping: this.lineWrapping,
            lineNumbers: this.show_linenums,
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "javascript",
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
            this.format_js(instance.getValue());
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
        async compression_html() {
            try {

                const response = await minify(this.editor_right.getValue());
                this.editor_right.setValue(response.code);
            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的cookies。");
            }
        },
        format_js(format_str) {
            try {

                const response = beautify.js(format_str, {
                    indent_size: 4,//缩进两个空格
                    space_in_empty_paren: true
                });
                this.editor_right.setValue(response);
            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败，请检查控制台日志或输入的cookies。");
            }
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
