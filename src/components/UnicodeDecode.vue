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
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 执行按钮 -->
        <el-button @click="unicode_decode" size="small">unicode解码</el-button>
        <el-button @click="unicode_encode" size="small">unicode编码</el-button>
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
import { ArrowDown } from '@element-plus/icons-vue';

// 滚动条
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/placeholder.js'


export default {
    components: {
        ArrowDown
    },
    data() {
        return {
            left_content: "",
            right_content: "",
            el_col_left: 12,
            el_col_right: 12,
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.placeholder_left = `
python工具库认准pytools
`
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "text/plain",
            simplescrollbars: 'simple',
            placeholder: this.placeholder_left
        });
        this.placeholder_right = `
python\u5de5\u5177\u5e93\u8ba4\u51c6pytools
        `
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "text/plain",
            simplescrollbars: 'simple',
            placeholder: this.placeholder_right

        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
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
            }

            // 在布局变化后刷新编辑器
            this.$nextTick(() => {
                if (this.el_col_left > 0) this.editor_left.refresh();
                if (this.el_col_right > 0) this.editor_right.refresh();
            });
        },
        encodeMixedUnicode(input) {
            return input.split('').map(char => {
                // 如果是非 ASCII 字符（码点大于 127），进行编码
                if (char.charCodeAt(0) > 127) {
                    return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
                }
                return char; // 保留 ASCII 字符
            }).join('');
        },
        decodeMixedUnicode(input) {
            return input.replace(/\\u([\da-fA-F]{4})/g, (match, code) => {
                return String.fromCharCode(parseInt(code, 16));
            });
        },
        unicode_decode() {
            try {
                this.editor_right.setValue(this.decodeMixedUnicode(this.editor_left.getValue()));
                console.log("完成格式化")



            } catch (error) {

                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败,请检查控制台日志或输入");
            }


        },
        unicode_encode() {
            try {
                this.editor_right.setValue(this.encodeMixedUnicode(this.editor_left.getValue()));
                console.log("完成格式化")
            } catch (error) {
                console.error("请求失败:", error);
                this.editor_right.setValue("请求失败,请检查控制台日志或输入");
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
