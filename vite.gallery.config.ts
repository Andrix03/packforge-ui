// The component gallery (gallery/): `npm run gallery` to work on it, `npm run gallery:build` for
// GitHub Pages (relative paths, so it works under /packforge-ui/).
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'gallery',
  base: './',
  plugins: [react()],
  build: { outDir: '../gallery-dist', emptyOutDir: true, assetsInlineLimit: 0 }
})
