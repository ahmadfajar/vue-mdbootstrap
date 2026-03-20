import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { bannerText } from './banner';

export default defineConfig({
  mode: 'library',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/framework.ts'),
      formats: ['es', 'cjs'],
      name: 'VueMdb',
      fileName: (format) => {
        switch (format) {
          case 'es':
          case 'esm':
            return 'vue-mdb.esm.mjs';
          case 'cjs':
          case 'commonjs':
            return 'vue-mdb.cjs';
          default:
            return 'vue-mdb.mjs';
        }
      },
    },
    emptyOutDir: false,
    cssMinify: false,
    minify: false,
    rolldownOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['axios', 'fast-xml-parser', 'lodash-es', 'luxon', 'vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      // preserveEntrySignatures: 'strict',
      output: {
        // Provide global variables to use in the ES build for externalized deps
        globals: {
          axios: 'axios',
          lodash: 'lodash-es',
          luxon: 'luxon',
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
