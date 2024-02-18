import terser from '@rollup/plugin-terser'
// @ts-ignore
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
// @ts-ignore
import { bannerText } from './banner'

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
            }
        },
        emptyOutDir: false,
        cssMinify: false,
        minify: false,
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled into your library
            external: [
                'axios', 'body-scroll-lock', 'fast-xml-parser',
                'luxon', 'resize-observer-polyfill', 'vue',
            ],
            // treeshake: false,
            treeshake: {
                preset: 'smallest'
            },
            // preserveEntrySignatures: 'strict',
            output: {
                // Provide global variables to use in the ES build for externalized deps
                globals: {
                    axios: 'axios',
                    lodash: 'lodash',
                    luxon: 'luxon',
                    vue: 'Vue',
                },
                generatedCode: {
                    constBindings: true
                },
                interop: 'auto',
                assetFileNames: 'bundle.[ext]',
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
        treeShaking: true,
    },
    resolve: {
        alias: {
            // @ts-ignore
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
