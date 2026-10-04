import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// three.js and react-three-fiber are only imported from the lazily loaded
// StageCanvas module, so Rollup keeps them out of the first-paint bundle on its own.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
