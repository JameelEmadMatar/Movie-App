import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'compression'

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'terser',
    rollupOptions: {
      treeshake: true, // إزالة الكود الغير مستخدم
    },
    sourcemap: true, // فعّل source maps
  },
  server: {
    middleware: [compression()],
  },
})
