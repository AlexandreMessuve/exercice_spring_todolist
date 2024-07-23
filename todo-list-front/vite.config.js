import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  watch: {
    usePolling: true
  },
  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    origin: "http://0.0.0.0:5173",
  },
});
