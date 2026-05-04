import dts from 'rollup-plugin-dts';

const config = {
  input: './src/framework.ts',
  output: [
    {
      file: 'dist/vue-mdb.d.ts',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [dts({ tsconfig: './tsconfig.dts.json', sourcemap: false })],
  external: ['axios', 'fast-xml-parser', 'lodash-es', 'luxon', 'vue'],
};

export default config;
