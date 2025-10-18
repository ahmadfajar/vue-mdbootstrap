import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';
import { bannerText } from './banner';

export default defineConfig({
  mode: 'library',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/types/index.d.ts'),
      formats: ['es'],
    },
    emptyOutDir: false,
    cssMinify: false,
    minify: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['axios', 'body-scroll-lock', 'fast-xml-parser', 'lodash-es', 'luxon', 'vue'],
    },
  },
  esbuild: {
    banner: bannerText,
  },
  plugins: [
    dtsPlugin({
      declarationOnly: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
