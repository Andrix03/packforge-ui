// Library build: dist/index.js (ESM, React and Base UI left to the app) + dist/styles.css, which
// carries the fonts inside (library mode inlines them, about 100 KB: one file, no paths for the app
// to resolve). Type declarations come from tsc (tsconfig.build.json).
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles'
    },
    sourcemap: true,
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@base-ui\/react($|\/)/]
    }
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.mjs']
  }
})
