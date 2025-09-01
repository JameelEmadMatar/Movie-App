import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'compression'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
    },
  },
  server: {
    middleware: [compression()],
  },
})