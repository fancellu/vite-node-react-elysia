import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@backend': path.resolve(__dirname, './backend/src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173, // Your frontend URL
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
})
