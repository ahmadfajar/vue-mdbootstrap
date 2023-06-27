import terser from '@rollup/plugin-terser'
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
            // formats: ['es', 'umd', 'cjs'],
            name: 'VueMdb',
            fileName: (format) => {
                switch (format) {
                    case 'es':
                    case 'esm':
                        return 'vue-mdb.esm.js';
                    case 'umd':
                        return 'vue-mdb.umd.js';
                    default:
                        return 'vue-mdb.js';
                }
            }
        },
        emptyOutDir: false,
        cssMinify: false,
        minify: false,
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled into your library
            external: ['vue'],
            treeshake: {
                preset: 'recommended'
            },
            output: {
                // Provide global variables to use in the ES build for externalized deps
                globals: {
                    vue: 'Vue',
                },
                generatedCode: {
                    constBindings: true
                },
                interop: 'auto',
                assetFileNames: 'vue-mdb.[ext]',
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
    // plugins: [
    //   vue(),
    // ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
