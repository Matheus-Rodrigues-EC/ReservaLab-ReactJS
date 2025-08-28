import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false, // Desabilitado para ambiente Docker
    proxy: {
      // Proxy para a API - evita problemas de CORS
      '/api': {
        target: 'http://localhost:4000', // URL do seu backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
