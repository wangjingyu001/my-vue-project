<template>
    <el-row class="editor-container" :gutter="100">
        <!-- 左侧编辑区域 -->
        <el-col :span="24">
            <div class="editor-wrapper">
                <textarea v-model="left_content" ref="editor_left" class="editor-left"></textarea>
            </div>
        </el-col>
    </el-row>

    <el-row>
        <!-- 视图控制下拉菜单 -->
        <el-dropdown @command="handleViewCommand" trigger="click">
            <el-button size="small">
                {{ dropdownButtonText }}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="ALL">ALL</el-dropdown-item>
                    <el-dropdown-item command="AES">AES</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 执行按钮 -->
        <!-- <el-input v-model="Padding" style="width: 240px" placeholder="Please input" /> -->

    </el-row>

    <el-row class="editor-container" :gutter="100">
        <!-- 右侧编辑区域 -->
        <el-col :span="24">
            <div class="editor-wrapper">
                <textarea v-model="right_content" ref="editor_right" class="editor-right"></textarea>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import "codemirror/lib/codemirror.css";
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
            isLoading: false, // 按钮加载状态
            show_linenums: false,
            dropdownButtonText: 'ALL',
        };
    },
    mounted() {
        // 初始化 CodeMirror
        this.editor_left = CodeMirror.fromTextArea(this.$refs.editor_left, {
            mode: "text/explain",
            simplescrollbars: 'simple',
        });
        this.editor_right = CodeMirror.fromTextArea(this.$refs.editor_right, {
            mode: "text/explain",
            simplescrollbars: 'simple',
        });
        this.editor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.editor_left.on('change', (instance, changeObj) => {
            this.encrypt(instance.getValue());
        });
        this.left_content = "";
        this.right_content = "";
    },
    methods: {
        handleViewCommand(command) {
            switch (command) {
                case 'AES':
                    console.log("AES");
                    this.dropdownButtonText = 'AES';
                    break;
                case 'ALL':
                    console.log("ALL");
                    this.dropdownButtonText = 'ALL';
                    break;

            }

            // 在布局变化后刷新编辑器
            this.$nextTick(() => {
                if (this.el_col_left > 0) this.editor_left.refresh();
                if (this.el_col_right > 0) this.editor_right.refresh();
            });
        },
        encrypt(format_str) {
            try {
                console.log('执行')
            } catch (error) {
                console.error("请求失败:", error);

            }
        }
    },
};
</script>

<style scoped>
.editor-container {
    height: 40vh;
    margin: 0;
    margin-bottom: 20px;
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
