import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '#v1': path.resolve(__dirname, './src'),
      '#v1': path.resolve(fileURLToPath(new URL('./src', import.meta.url))),
      // Add more aliases as needed
    },
  },
})
