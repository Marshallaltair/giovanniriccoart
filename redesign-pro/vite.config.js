import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// La versione "Pro" usa gli stessi contenuti e le stesse immagini del sito:
// i dati arrivano da ../src/data e le immagini da ../public, nessun duplicato.
const parent = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: '../public',
  resolve: { alias: { '@data': `${parent}src/data`, '@lib': `${parent}src/lib` } },
  server: { fs: { allow: [parent] } },
  build: { target: 'es2022', assetsInlineLimit: 0 },
})
