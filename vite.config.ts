import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pagesConfig = JSON.parse(readFileSync('./pages.config.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isPages = mode === 'pages'

  return {
    plugins: [react()],
    base: isPages ? pagesConfig.base : '/',
    build: {
      outDir: isPages ? pagesConfig.outDir : 'dist',
      emptyOutDir: true,
    },
  }
})
