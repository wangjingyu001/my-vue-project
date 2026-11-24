<template>
  <div class="cyberchef-container">
    <iframe
      ref="cyberchefIframe"
      :src="cyberchefUrl"
      class="cyberchef-iframe"
      frameborder="0"
      title="CyberChef"
      @load="onIframeLoad"
      @error="onIframeError"
    ></iframe>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <span>正在初始化 CyberChef 加解密引擎...</span>
    </div>
    <div v-if="error" class="error">
      加载失败: {{ error }}
      <button @click="retry" class="retry-btn">重试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CyberChefPage',
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cyberchefUrl: '',
      loading: true,
      error: null
    };
  },
  watch: {
    isDark(val) {
      this.syncThemeToCyberChef(val);
    }
  },
  mounted() {
    this.syncThemeToStorage(this.isDark);
    this.setCyberChefUrl();
  },
  methods: {
    syncThemeToStorage(isDark) {
      try {
        const raw = localStorage.getItem('options');
        const opts = raw ? JSON.parse(raw) : {};
        opts.theme = isDark ? 'dark' : 'classic';
        localStorage.setItem('options', JSON.stringify(opts));
      } catch (e) {}
    },
    syncThemeToCyberChef(isDark) {
      this.syncThemeToStorage(isDark);
      try {
        const doc = this.$refs.cyberchefIframe?.contentDocument;
        if (doc && doc.documentElement) {
          doc.documentElement.className = isDark ? 'dark' : 'classic';
        }
      } catch (e) {}
    },
    setCyberChefUrl() {
      this.cyberchefUrl = './cyberchef/CyberChef_v10.19.4.html';
    },
    onIframeLoad() {
      this.loading = false;
      this.error = null;
      this.syncThemeToCyberChef(this.isDark);
    },
    onIframeError() {
      this.loading = false;
      this.error = '无法加载本地 CyberChef 文件';
    },
    retry() {
      this.loading = true;
      this.error = null;
      this.cyberchefUrl = '';
      this.$nextTick(() => {
        this.setCyberChefUrl();
      });
    }
  }
};
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

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--layout-bg, #ffffff);
  font-size: 13px;
  color: var(--text-muted, #6b7280);
  z-index: 5;
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(79, 70, 229, 0.15);
  border-left-color: var(--primary-color, #4f46e5);
  border-radius: 50%;
  animation: cc-spin 0.75s linear infinite;
}

@keyframes cc-spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: #e74c3c;
  z-index: 6;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: var(--primary-color, #4f46e5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
