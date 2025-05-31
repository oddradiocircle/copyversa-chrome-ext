import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { copyFileSync, mkdirSync } from 'fs'

import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      crx({ manifest }), 
      react(),
      // Custom plugin to copy content script CSS
      {
        name: 'copy-content-css',
        generateBundle() {
          mkdirSync('dist/src/contentScript', { recursive: true })
          copyFileSync(
            'src/contentScript/styles.css',
            'dist/src/contentScript/styles.css'
          )
        }
      }
    ],
    legacy: {
      skipWebSocketTokenCheck: true,
    },
  }
})
