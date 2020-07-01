const input = './src/index.js';
const formats = ['cjs', 'umd', 'es', 'esm'];
export default {
  input,
  output: formats.map(format => ({
    name: 'reactActionValidation',
    file: `./dist/index.${format}.js`,
    format,
  })),
};
