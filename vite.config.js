import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages deployment at /annurgroup/
  base: '/annurgroup/',
  plugins: [react(), tailwindcss()],
})
