<template>
  <el-card>
    <el-col :span="12">
        MD5
    </el-col>
    <el-col :span="12">
        这里准备放几个按钮例如：禁止，暂停到这里。
    </el-col>
</el-card>
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
      result: ''
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', { input: this.input, result: this.result })
    }
  }
}
</script>
