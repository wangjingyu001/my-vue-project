import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import topLevelAwait from 'vite-plugin-top-level-await'
import nodeStdLibBrowser from 'vite-plugin-node-stdlib-browser'; // Or import polyfills from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  base: '/my-vue-project/',
    define: {
        'process.env': {}, // 模拟空的 process.env
         // 'process.cwd': '"/"',  // 修改为字符串, // 模拟返回根路径
    },
  plugins: [
      topLevelAwait(),
      nodeStdLibBrowser(),
    vue()],
  resolve: {
    alias: {
          "@": path.resolve(__dirname, "src"), // 确保 @ 映射到 src 目录
        // 'process': 'process/browser'
    },
  },
    build: {
      
      target: 'esnext', // 支持顶层 await
      outDir: `dist`, 
  },
  // esbuild: {
  //   supported: {
  //     'top-level-await': true //browsers can handle top-level-await features
  //   },
  // },
})
