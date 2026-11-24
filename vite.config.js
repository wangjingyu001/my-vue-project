import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import topLevelAwait from 'vite-plugin-top-level-await'
import nodeStdLibBrowser from 'vite-plugin-node-stdlib-browser'; // Or import polyfills from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base: base,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.BASE_URL': JSON.stringify(base),
    'process.env.PUBLIC_URL': JSON.stringify(base),
  },
  plugins: [
    topLevelAwait(),
    nodeStdLibBrowser(),
    vue()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: 'esnext',
    outDir: `dist`,
    chunkSizeWarningLimit: 6000,
  },
})
