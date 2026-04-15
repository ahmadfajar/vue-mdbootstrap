import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { bannerText } from './banner';

export default defineConfig({
  mode: 'development',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.ts'),
      // formats: ['es', 'umd', 'cjs'],
      name: 'VueMdb',
      fileName: (format) => {
        switch (format) {
          case 'umd':
            return 'vue-mdb.umd.js';
          default:
            return 'vue-mdb.esm.js';
        }
      },
    },
    emptyOutDir: false,
    cssMinify: false,
    minify: false,
    rolldownOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        // Provide global variables to use in the ES build for externalized deps
        globals: {
          vue: 'vue',
        },
        comments: false,
        postBanner: bannerText,
        minify: {
          compress: false,
          codegen: { removeWhitespace: false },
          mangle: { keepNames: true },
        },
        assetFileNames: 'bundle.[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
