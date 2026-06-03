<template>
  <div class="cyberchef-container">
    <iframe
      :src="cyberchefUrl"
      class="cyberchef-iframe"
      frameborder="0"
      title="CyberChef"
      @load="onIframeLoad"
      @error="onIframeError"
    ></iframe>
    <div v-if="loading" class="loading">加载 CyberChef 中...</div>
    <div v-if="error" class="error">
      加载失败: {{ error }}
      <button @click="retry" class="retry-btn">重试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CyberChefPage',
  data() {
    return {
      cyberchefUrl: '',
      loading: true,
      error: null
    }
  },
  mounted() {
    this.setCyberChefUrl();
  },
  methods: {
    setCyberChefUrl() {
      // 使用本地 CyberChef 文件
      this.cyberchefUrl = './cyberchef/CyberChef_v10.19.4.html';
      console.log('CyberChef URL:', this.cyberchefUrl);
    },
    onIframeLoad() {
      this.loading = false;
      this.error = null;
      console.log('CyberChef loaded successfully');
    },
    onIframeError() {
      this.loading = false;
      this.error = '无法加载本地 CyberChef 文件';
      console.error('Failed to load CyberChef');
    },
    retry() {
      this.loading = true;
      this.error = null;
      this.setCyberChefUrl();
    }
  }
}
</script>

<style scoped>
.cyberchef-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--layout-bg, #ffffff);
  overflow: hidden;
}

.cyberchef-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: var(--text-color, #1f2937);
  z-index: 5;
}

.error {
  color: #e74c3c;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: var(--primary-color, #3498db);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: opacity 0.2s;
}

.retry-btn:hover {
  opacity: 0.9;
}
</style>
