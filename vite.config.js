// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Flower-Shop-UI/',   // MUST match GitHub repo name exactly
  plugins: [react()],
})
