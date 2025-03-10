<template>
    <el-container style="height: 100vh; flex-direction: column">
        <!-- 上部分：左右布局 -->
        <el-container style="flex: 1">
            <!-- 左侧树形菜单 -->
            <el-aside width="260px" style="border-right: 1px solid #eee">
                <div class="tree-menu">
                    <div v-for="item in algorithms" :key="item.type">
                        <div class="menu-item" @click="toggleMenu(item)">
                            {{ item.name }}
                            <el-icon :class="['arrow', { rotated: item.expanded }]">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <div v-if="item.expanded" class="sub-items">
                            <div v-for="sub in item.children" :key="sub.type" class="sub-item" :class="{ active: currentAlgorithm === sub.type }" @click="selectAlgorithm(sub)">
                                {{ sub.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </el-aside>

            <!-- 右侧代码编辑器 -->
            <el-main>
                <div ref="codeEditor" class="code-editor"></div>
            </el-main>
        </el-container>

        <!-- 下部分：动态表单 -->
        <el-footer height="auto" style="padding: 20px; background: #f5f7fa">
            <el-form :model="form" label-width="120px">
                <!-- 通用输入 -->
                <el-form-item label="输入内容">
                    <el-input v-model="form.input" clearable />
                </el-form-item>

                <!-- 动态加密参数 -->
                <template v-if="currentAlgorithm === 'AES'">
                    <el-form-item label="Mode">
                        <el-select v-model="form.mode">
                            <el-option label="CBC" value="CBC" />
                            <el-option label="ECB" value="ECB" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Padding">
                        <el-input v-model="form.padding" />
                    </el-form-item>
                    <el-form-item label="Key">
                        <el-input v-model="form.key" show-password />
                    </el-form-item>
                    <el-form-item label="IV">
                        <el-input v-model="form.iv" />
                    </el-form-item>
                </template>

                <!-- 输出结果 -->
                <el-form-item label="输出结果">
                    <el-input v-model="form.output" type="textarea" :rows="3" readonly />
                </el-form-item>

                <el-button type="primary" @click="handleEncrypt">加密</el-button>
            </el-form>
        </el-footer>
    </el-container>
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
import "codemirror/addon/fold/foldgutter.css"
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import "codemirror/addon/fold/indent-fold";


export default {
    data() {
        return {
            currentAlgorithm: 'MD5',
            codeEditor: null,
            form: {
                input: '',
                output: '',
                // AES参数
                mode: 'CBC',
                padding: '',
                key: '',
                iv: ''
            },
            algorithms: [
                {
                    type: 'hash',
                    name: '哈希算法',
                    expanded: true,
                    children: [
                        { type: 'MD5', name: 'MD5' },
                        { type: 'SHA256', name: 'SHA-256' }
                    ]
                },
                {
                    type: 'symmetric',
                    name: '对称加密',
                    expanded: false,
                    children: [
                        { type: 'AES', name: 'AES' },
                        { type: 'DES', name: 'DES' }
                    ]
                }
            ]
        }
    },
    mounted() {
        this.initCodeEditor()
    },
    methods: {
        initCodeEditor() {
            this.codeEditor = CodeMirror(this.$refs.codeEditor, {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'default',
                readOnly: true,
                value: '// 选择算法查看示例代码\n'
            })
        },

        toggleMenu(item) {
            item.expanded = !item.expanded
        },

        selectAlgorithm(sub) {
            this.currentAlgorithm = sub.type
            this.updateCodeExample()
        },

        updateCodeExample() {
            const examples = {
                MD5: `function md5(input) {
    // MD5加密逻辑
    return hash;
  }`,
                AES: `function aesEncrypt(text, key, iv, mode) {
    // AES加密逻辑
    return encrypted;
  }`
            }
            this.codeEditor.setValue(examples[this.currentAlgorithm] || '')
        },

        handleEncrypt() {
            // 加密逻辑处理
            this.form.output = '加密结果将显示在这里'
        }
    }
}
</script>

<style scoped>
.tree-menu {
    padding: 12px;
}

.menu-item {
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s;
}

.menu-item:hover {
    background: #f5f7fa;
}

.sub-items {
    margin-left: 20px;
    border-left: 2px solid #eee;
}

.sub-item {
    padding: 8px 10px;
    margin: 4px 0;
    cursor: pointer;
    border-radius: 4px;
}

.sub-item:hover,
.sub-item.active {
    background: #e1f3ff;
    color: #409eff;
}

.arrow {
    transition: transform 0.3s;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.code-editor {
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>