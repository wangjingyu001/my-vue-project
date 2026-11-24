import { createApp } from 'vue';
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElButton,
  ElIcon,
  ElRow,
  ElCol,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCheckbox,
} from 'element-plus';

import 'element-plus/es/components/base/style/css';
import 'element-plus/es/components/container/style/css';
import 'element-plus/es/components/aside/style/css';
import 'element-plus/es/components/main/style/css';
import 'element-plus/es/components/menu/style/css';
import 'element-plus/es/components/menu-item/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/icon/style/css';
import 'element-plus/es/components/row/style/css';
import 'element-plus/es/components/col/style/css';
import 'element-plus/es/components/dropdown/style/css';
import 'element-plus/es/components/dropdown-menu/style/css';
import 'element-plus/es/components/dropdown-item/style/css';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/message/style/css';

import './style.css';
import App from './App.vue';

const components = [
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElButton,
  ElIcon,
  ElRow,
  ElCol,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCheckbox,
];

try {
  const app = createApp(App);
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
  app.mount('#app');
} catch (err) {
  console.error('[App] Mount error:', err);
} finally {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  }
}
