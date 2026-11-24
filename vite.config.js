import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import topLevelAwait from 'vite-plugin-top-level-await';
import nodeStdLibBrowser from 'vite-plugin-node-stdlib-browser';

const base = process.env.VITE_BASE || '/';

function precompressGzipPlugin() {
  const compressibleExts = new Set(['.js', '.css', '.html', '.wasm', '.svg', '.json', '.fnt']);
  function walkAndCompress(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkAndCompress(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!compressibleExts.has(ext)) continue;
        const stat = fs.statSync(fullPath);
        if (stat.size < 1024) continue;
        const raw = fs.readFileSync(fullPath);
        const gz = zlib.gzipSync(raw, { level: 9 });
        if (gz.length < raw.length * 0.95) {
          fs.writeFileSync(fullPath + '.gz', gz);
        }
      }
    }
  }
  return {
    name: 'precompress-gzip-static',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      walkAndCompress(outDir);
      console.log('[precompress-gzip] Generated level-9 .gz assets in dist/');
    },
  };
}

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
    vue(),
    precompressGzipPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    chunkSizeWarningLimit: 3000,
  },
});
