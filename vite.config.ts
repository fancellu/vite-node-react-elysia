import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'frontend/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173, // Your frontend URL
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        // Optional: rewrite the path if your Elysia routes don't include /api
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
