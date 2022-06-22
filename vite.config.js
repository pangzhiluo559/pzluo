import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    // open: false,
    // base: './',
    // proxy: {
    //   '^/api': {
    //     target: 'https://test.api.huatangtea.com/trace',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    assetsDir: 'assets',
    publicDir: 'public',
  }
})
