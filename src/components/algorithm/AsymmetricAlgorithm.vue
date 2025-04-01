<template>
  <el-form>
    <el-form-item label="公钥">
      <el-input v-model="publicKey" type="textarea" :rows="2" />
    </el-form-item>
    <el-form-item label="私钥">
      <el-input v-model="privateKey" type="textarea" :rows="2" show-password />
    </el-form-item>
    <el-input 
      v-model="input" 
      type="textarea" 
      :rows="2" 
      placeholder="输入要加密/解密的内容" 
      @input="handleInput"
    />
    <div class="algorithm-result">
      <span>结果：</span>
      <el-tag type="info">{{ result }}</el-tag>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    algorithm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      input: '',
      publicKey: '',
      privateKey: '',
      result: ''
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', { 
        input: this.input, 
        publicKey: this.publicKey, 
        privateKey: this.privateKey, 
        result: this.result 
      })
    }
  }
}
</script>
