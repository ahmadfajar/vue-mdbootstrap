import dts from 'rollup-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';

const config = {
    input: './src/types/index.d.ts',
    output: [{ file: 'dist/vue-mdb.d.ts', format: 'es' }],
    plugins: [nodeResolve(), dts()]
};

export default config;
