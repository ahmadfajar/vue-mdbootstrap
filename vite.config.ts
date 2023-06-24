import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { bannerText } from './banner'

export default defineConfig({
  mode: 'development',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueMdb',
      // the proper extensions will be added
      fileName: 'vue-mdb',
      formats: ['es']
    },
    emptyOutDir: false,
    cssMinify: false,
    minify: 'terser',
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      input: path.resolve(__dirname, 'src/index.ts'),
      output: {
        // Provide global variables to use in the ES build for externalized deps
        globals: {
          vue: 'Vue',
        },
        assetFileNames: "vue-mdb.[ext]",
      },
      plugins: [
        terser({
          compress: false,
          ecma: 2020,
          keep_classnames: true,
          keep_fnames: true,
          format: {
            comments: false,
          },
        })
      ]
    },
  },
  esbuild: {
    banner: bannerText,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
