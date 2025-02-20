import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/api':{
      target: 'http://localhost:8006',
      secure: false,
      },
    },
  },
  plugins: [react()],
})
