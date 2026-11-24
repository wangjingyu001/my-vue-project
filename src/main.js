
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

console.log('[App] Initializing Vue app...');
try {
  const app = createApp(App);
  app.use(ElementPlus);
  app.mount('#app');
  console.log('[App] Mounted successfully!');
} catch (err) {
  console.error('[App] Mount error:', err);
} finally {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  }
}
