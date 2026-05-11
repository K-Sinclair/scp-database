import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for SCP-React project
export default defineConfig({
  plugins: [react()],
  base: '/scp-database/',
})