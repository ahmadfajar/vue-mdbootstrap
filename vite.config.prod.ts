import terser from '@rollup/plugin-terser';
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
          case 'es':
          case 'esm':
            return 'vue-mdb.esm.min.js';
          case 'umd':
            return 'vue-mdb.umd.min.js';
          default:
            return 'vue-mdb.min.js';
        }
      },
    },
    emptyOutDir: false,
    cssMinify: true,
    minify: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      treeshake: {
        preset: 'smallest',
      },
      output: {
        // Provide global variables to use in the ES build for externalized deps
        globals: {
          vue: 'Vue',
        },
        generatedCode: {
          constBindings: true,
          preset: 'es2015',
        },
        interop: 'auto',
        // banner: bannerText,
        assetFileNames: 'bundle.min.[ext]',
        plugins: [
          terser({
            compress: true,
            ecma: 2020,
            format: {
              comments: /^\/*!/,
            },
          }),
        ],
      },
    },
  },
  esbuild: {
    banner: bannerText,
    treeShaking: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
