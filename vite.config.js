import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const src = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@data': `${src}/data`, '@lib': `${src}/lib` } },
  build: { target: 'es2022', assetsInlineLimit: 0 },
})
