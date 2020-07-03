import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js',
  output: {
    format: 'es',
    file: './dist/index.js'
  },
  plugins: [
    babel({
      exclude: /node_modules/,
      configFile: './babel.config.js',
    })
  ]
};
