<template>
    <div class="encrypt-container">
        <el-container>
            <!-- 左侧算法分类 -->
            <el-aside width="280px" class="algorithm-sidebar">
                <el-scrollbar>
                    <el-collapse v-model="activeCollapse" accordion>
                        <!-- 哈希算法 -->
                        <el-collapse-item title="哈希算法" name="hash">
                            <div v-for="algo in hashAlgorithms" :key="algo.value" class="algorithm-item" @click="selectAlgorithm(algo)">
                                {{ algo.label }}
                            </div>
                        </el-collapse-item>

                        <!-- 对称加密 -->
                        <el-collapse-item title="对称加密" name="symmetric">
                            <div v-for="algo in symmetricAlgorithms" :key="algo.value" class="algorithm-item" @click="selectAlgorithm(algo)">
                                {{ algo.label }}
                            </div>
                        </el-collapse-item>

                        <!-- 非对称加密 -->
                        <el-collapse-item title="非对称加密" name="asymmetric">
                            <div v-for="algo in asymmetricAlgorithms" :key="algo.value" class="algorithm-item" @click="selectAlgorithm(algo)">
                                {{ algo.label }}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </el-aside>

            <!-- 中间区域 -->
            <el-col :span="8">
                <el-main class="operation-area">
                    <el-scrollbar class="algorithm-scrollbar">
                        <div class="selected-algorithms">
                            <algorithm-card v-for="(algo, index) in selectedAlgorithms" :key="index" :algorithm="algo" :index="index" @input="handleAlgorithmInput" @remove="removeAlgorithm" />
                        </div>
                    </el-scrollbar>
                </el-main>
            </el-col>
            <!-- 右侧操作区域 -->
            <el-col :span="12">
                <el-row style="height: 50%;width: 100%;">
                    <textarea v-model="input_str" @change="encrypt">输入内容</textarea>
                </el-row>
                <el-row>
                    <textarea>输出内容</textarea>
                </el-row>
            </el-col>

        </el-container>
    </div>
</template>

<script>

import CryptoJS from 'crypto-js'
import AlgorithmCard from './AlgorithmCard.vue'


export default {
    components: {
        AlgorithmCard
    },
    data() {
        return {
            activeCollapse: 'hash',
            activeTab: 'operation',
            selectedAlgorithm: null,
            form: {
                input: '',
                output: '',
                key: '',
                iv: '',
                mode: 'CBC',
                padding: 'Pkcs7'
            },
            history: [],
            // 算法配置
            hashAlgorithms: [
                { label: 'MD5', value: 'md5', supportsDecrypt: false },
                { label: 'SHA1', value: 'sha1', supportsDecrypt: false },
                { label: 'SHA256', value: 'sha256', supportsDecrypt: false },
                { label: 'SHA512', value: 'sha512', supportsDecrypt: false }
            ],
            symmetricAlgorithms: [
                {
                    label: 'AES',
                    value: 'aes',
                    needsKey: true,
                    needsIV: true,
                    modes: ['CBC', 'ECB', 'CFB', 'OFB', 'CTR'],
                    paddings: ['Pkcs7', 'AnsiX923', 'Iso10126', 'ZeroPadding']
                },
                {
                    label: 'DES',
                    value: 'des',
                    needsKey: true,
                    needsIV: true,
                    modes: ['CBC', 'ECB'],
                    paddings: ['Pkcs7', 'ZeroPadding']
                },
                {
                    label: 'TripleDES',
                    value: '3des',
                    needsKey: true,
                    needsIV: true,
                    modes: ['CBC', 'ECB']
                }
            ],
            asymmetricAlgorithms: [
                { label: 'RSA', value: 'rsa', needsKey: true },
                { label: 'ECC', value: 'ecc', needsKey: true }
            ],
            selectedAlgorithms: [],
            input_str: ''
        }
    },
    methods: {
        selectAlgorithm(algo) {
            this.selectedAlgorithm = algo
            this.resetForm()
            this.selectedAlgorithms.push({
                ...algo,
                input: '',
                result: ''
            })
        },
        async performOperation(type) {
            try {
                let result
                if (type === 'encrypt') {
                    result = await this.encrypt()
                } else {
                    result = await this.decrypt()
                }

                this.form.output = result
                this.addHistory({
                    type,
                    algorithm: this.selectedAlgorithm.label,
                    result
                })
            } catch (error) {
                this.$message.error(`操作失败: ${error.message}`)
            }
        },
        async encrypt() {
            // 实现加密逻辑
            const { input1, key, iv, mode, padding } = this.form
            var input = this.input_str;
            switch (this.selectedAlgorithm.value) {
                case 'md5':
                    return CryptoJS.MD5(input).toString()
                case 'sha1':
                    return CryptoJS.SHA1(input).toString()
                case 'aes':
                    return this.handleAES('encrypt', input, key, iv, mode, padding)
                // 添加其他算法处理...
            }
        },
        handleAES(type, input, key, iv, mode, padding) {
            const cipherParams = {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding]
            }

            const keyBytes = CryptoJS.enc.Utf8.parse(key)

            if (type === 'encrypt') {
                return CryptoJS.AES.encrypt(input, keyBytes, cipherParams).toString()
            }
            return CryptoJS.AES.decrypt(input, keyBytes, cipherParams)
                .toString(CryptoJS.enc.Utf8)
        },
        addHistory(record) {
            this.history.unshift({
                ...record,
                timestamp: new Date().toLocaleString()
            })
        },
        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            this.$message.success('已复制到剪贴板')
        },
        handleKeyGenerated({ key, iv }) {
            this.form.key = key
            this.form.iv = iv
        },
        resetForm() {
            this.form.input = ''
            this.form.output = ''
        },
        clearHistory() {
            this.history = []
        }
    }
}
</script>

<style scoped>
.encrypt-container {
    height: 100vh;
    display: flex;
}

.algorithm-sidebar {
    border-right: 1px solid #e4e7ed;
    background: #f8f9fa;
}

.algorithm-item {
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.3s;
}

.algorithm-item:hover {
    background: #e1f3ff;
    transform: translateX(5px);
}

.operation-area {
    padding: 20px 40px;
}

.history-section {
    margin-top: 30px;
    border-top: 1px solid #ebeef5;
    padding-top: 20px;
}

:deep(.el-timeline) {
    max-height: 200px;
    overflow-y: auto;
}

.algorithm-scrollbar {
    height: calc(100vh - 40px);
    /* 根据实际高度调整 */
}

.selected-algorithms {
    padding-right: 20px;
    /* 为滚动条留出空间 */
}
</style>