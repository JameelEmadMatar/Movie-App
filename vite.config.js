import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'compression'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'terser',
    sourcemap: true, // فعّل source maps
  },
  server: {
    middleware: [compression()],
  },
})