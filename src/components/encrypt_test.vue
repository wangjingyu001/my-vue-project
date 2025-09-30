<!-- <template>
  <div class="cyberchef-wrapper">
    <iframe
      :src="cyberchefUrl"
      class="cyberchef-iframe"
      title="CyberChef"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'CyberChefEmbed',
  data() {
    return {
      cyberchefUrl: 'https://gchq.github.io/CyberChef'
    }
  },
  mounted() {
   
  },
}
</script>

<style scoped>
.cyberchef-wrapper {
  width: 100%;
  height: 100vh; /* 或者使用 calc(100vh - 其他元素高度) */
  position: relative;
}

.cyberchef-iframe {
  width: 100%;
  height: 90%;
  border: none;
  display: block;
}
</style> -->


<template>
  <div class="app-layout">
    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="cyberchef-section">
        <iframe
          :src="cyberchefUrl"
          class="cyberchef-iframe"
          frameborder="0"
          title="CyberChef"
          @load="onIframeLoad"
          @error="onIframeError"
        ></iframe>
        <div v-if="loading" class="loading">加载CyberChef中...</div>
        <div v-if="error" class="error">
          加载失败: {{ error }}
          <button @click="retry">重试</button>
        </div>
      </div>
    </main>
    
    
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
    this.adjustIframeHeight();
    window.addEventListener('resize', this.adjustIframeHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustIframeHeight);
  },
  methods: {
    setCyberChefUrl() {
      // 使用本地CyberChef文件
      this.cyberchefUrl = './cyberchef/CyberChef_v10.19.4.html';
      console.log('CyberChef URL:', this.cyberchefUrl);
    },
    
    adjustIframeHeight() {
      const iframe = this.$el.querySelector('.cyberchef-iframe');
      if (iframe) {
        const header = this.$el.querySelector('.app-header');
        const footer = this.$el.querySelector('.app-footer');
        const headerHeight = header ? header.offsetHeight : 0;
        const footerHeight = footer ? footer.offsetHeight : 0;
        const windowHeight = window.innerHeight;
        
        const availableHeight = windowHeight - headerHeight - footerHeight - 40;
        iframe.style.height = `${Math.max(availableHeight, 400)}px`;
      }
    },
    
    onIframeLoad() {
      this.loading = false;
      this.error = null;
      console.log('CyberChef loaded successfully');
    },
    
    onIframeError() {
      this.loading = false;
      this.error = '无法加载本地CyberChef文件';
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
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: 60px;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
}

.cyberchef-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
  min-height: 500px;
}

.cyberchef-iframe {
  width: 100%;
  border: none;
  display: block;
}

.app-footer {
  height: 50px;
  background: #34495e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
}

.error {
  color: #e74c3c;
}

.error button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

