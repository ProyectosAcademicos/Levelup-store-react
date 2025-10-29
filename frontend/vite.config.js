import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige todas las peticiones que empiecen con /api
      '/api': {
        target: 'http://localhost:8080', // backend Spring Boot
        changeOrigin: true, // Necesario para la redirección
        secure: false,      // backend corre en http
      }
    }
  }
})