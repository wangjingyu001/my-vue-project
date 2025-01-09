import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus); // 使用 Element-Plus
app.mount('#app');

// 移除加载动画
document.getElementById('loading').style.display = 'none';
