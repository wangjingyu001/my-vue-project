<template>
  <el-card :class="['algorithm-card', `algorithm-${algorithm.value}`]">
    <div class="algorithm-header">
      <span>{{ algorithm.label }}</span>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="onRemove" />
    </div>
    
    <component :is="algorithmComponent" :algorithm="algorithm" @input="onInput" />
  </el-card>
</template>

<script>
import HashAlgorithm from './algorithm/HashAlgorithm.vue'
import SymmetricAlgorithm from './algorithm/SymmetricAlgorithm.vue'
import AsymmetricAlgorithm from './algorithm/AsymmetricAlgorithm.vue'

export default {
  props: {
    algorithm: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    algorithmComponent() {
      if (this.algorithm.value.includes('sha') || this.algorithm.value === 'md5') {
        return HashAlgorithm
      } else if (['aes', 'des', '3des'].includes(this.algorithm.value)) {
        return SymmetricAlgorithm
      } else {
        return AsymmetricAlgorithm
      }
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    onRemove() {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style scoped>
.algorithm-card {
  margin-bottom: 15px;
  padding: 15px;
}

.algorithm-md5,
.algorithm-sha1,
.algorithm-sha256,
.algorithm-sha512 {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.algorithm-aes,
.algorithm-des,
.algorithm-3des {
  background-color: #f0f4ff;
  border-color: #d9e7ff;
}

.algorithm-rsa,
.algorithm-ecc {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
</style>
