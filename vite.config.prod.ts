import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { bannerText } from './banner';

export default defineConfig({
  mode: 'production',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueMdb',
      fileName: (format) => {
        switch (format) {
          case 'umd':
            return 'vue-mdb.umd.min.js';
          default:
            return 'vue-mdb.esm.min.js';
        }
      },
    },
    emptyOutDir: false,
    cssMinify: false,
    minify: 'oxc',
    rolldownOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        // Provide global variables to use in the ES build for externalized deps
        globals: {
          vue: 'Vue',
        },
        comments: false,
        postBanner: bannerText,
        minify: true,
        assetFileNames: 'bundle.min.[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
