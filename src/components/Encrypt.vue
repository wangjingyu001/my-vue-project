<template>
    <div class="encrypt-container">
      <el-container>
        <!-- 左侧算法分类 -->
        <el-aside width="280px" class="algorithm-sidebar">
          <el-scrollbar>
            <el-collapse v-model="activeCollapse" accordion>
              <!-- 哈希算法 -->
              <el-collapse-item title="哈希算法" name="hash">
                <div v-for="algo in hashAlgorithms" 
                     :key="algo.value"
                     class="algorithm-item"
                     @click="selectAlgorithm(algo)">
                  {{ algo.label }}
                </div>
              </el-collapse-item>
  
              <!-- 对称加密 -->
              <el-collapse-item title="对称加密" name="symmetric">
                <div v-for="algo in symmetricAlgorithms" 
                     :key="algo.value"
                     class="algorithm-item"
                     @click="selectAlgorithm(algo)">
                  {{ algo.label }}
                </div>
              </el-collapse-item>
  
              <!-- 非对称加密 -->
              <el-collapse-item title="非对称加密" name="asymmetric">
                <div v-for="algo in asymmetricAlgorithms" 
                     :key="algo.value"
                     class="algorithm-item"
                     @click="selectAlgorithm(algo)">
                  {{ algo.label }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-scrollbar>
        </el-aside>
  
        <!-- 右侧操作区域 -->
        <el-main class="operation-area">
          <el-tabs v-model="activeTab">
            <!-- 加密/解密选项卡 -->
            <el-tab-pane label="加密/解密" name="operation">
              <el-form ref="form" :model="form" label-width="120px">
                <!-- 算法参数动态表单 -->
                <template v-if="selectedAlgorithm">
                  <el-form-item label="加密模式" v-if="selectedAlgorithm.modes">
                    <el-select v-model="form.mode">
                      <el-option v-for="mode in selectedAlgorithm.modes" 
                               :key="mode" 
                               :label="mode" 
                               :value="mode"/>
                    </el-select>
                  </el-form-item>
  
                  <el-form-item label="填充方式" v-if="selectedAlgorithm.paddings">
                    <el-select v-model="form.padding">
                      <el-option v-for="padding in selectedAlgorithm.paddings" 
                               :key="padding" 
                               :label="padding" 
                               :value="padding"/>
                    </el-select>
                  </el-form-item>
  
                  <el-form-item label="密钥" v-if="selectedAlgorithm.needsKey">
                    <el-input v-model="form.key" show-password clearable>
                      <template #append>
                        <el-button icon="el-icon-copy-document" @click="copyToClipboard(form.key)"/>
                      </template>
                    </el-input>
                  </el-form-item>
  
                  <el-form-item label="IV向量" v-if="selectedAlgorithm.needsIV">
                    <el-input v-model="form.iv" clearable>
                      <template #append>
                        <el-button icon="el-icon-copy-document" @click="copyToClipboard(form.iv)"/>
                      </template>
                    </el-input>
                  </el-form-item>
                </template>
  
                <!-- 输入输出区域 -->
                <el-form-item label="输入内容">
                  <el-input 
                    v-model="form.input" 
                    type="textarea" 
                    :rows="4" 
                    placeholder="请输入要加密/解密的内容"
                    clearable/>
                </el-form-item>
  
                <el-form-item label="操作结果">
                  <el-input 
                    v-model="form.output" 
                    type="textarea" 
                    :rows="4" 
                    readonly
                    placeholder="结果将显示在这里">
                    <template #append>
                      <el-button-group>
                        <el-button 
                          type="primary" 
                          @click="performOperation('encrypt')"
                          :disabled="!selectedAlgorithm">
                          加密
                        </el-button>
                        <el-button 
                          type="success" 
                          @click="performOperation('decrypt')"
                          :disabled="!selectedAlgorithm?.supportsDecrypt">
                          解密
                        </el-button>
                      </el-button-group>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
  
            <!-- 密钥生成选项卡 -->
            <el-tab-pane label="密钥生成" name="keygen">
              <key-generator @generated="handleKeyGenerated"/>
            </el-tab-pane>
          </el-tabs>
  
          <!-- 历史记录 -->
          <div class="history-section">
            <h4>操作历史 <el-button size="mini" @click="clearHistory">清空</el-button></h4>
            <el-timeline>
              <el-timeline-item
                v-for="(record, index) in history"
                :key="index"
                :timestamp="record.timestamp">
                {{ record.description }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>

  import CryptoJS from 'crypto-js'
  
  export default {
    components: {
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
        ]
      }
    },
    methods: {
      selectAlgorithm(algo) {
        this.selectedAlgorithm = algo
        this.resetForm()
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
        const { input, key, iv, mode, padding } = this.form
        
        switch(this.selectedAlgorithm.value) {
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
  </style>