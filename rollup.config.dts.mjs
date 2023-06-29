import dts from 'rollup-plugin-dts';

const config = {
    input: './src/types/index.d.ts',
    output: [{ file: 'dist/vue-mdb.d.ts', format: 'es' }],
    plugins: [dts()]
};

export default config;
