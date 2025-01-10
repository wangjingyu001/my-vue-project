import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    topLevelAwait(),
    vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 确保 @ 映射到 src 目录
    },
  },
  build: {
      target: 'esnext', // 支持顶层 await
      outDir: `C:/Users/Admin/Desktop/spidertools界面/build`, 
  },
  // esbuild: {
  //   supported: {
  //     'top-level-await': true //browsers can handle top-level-await features
  //   },
  // },
})
