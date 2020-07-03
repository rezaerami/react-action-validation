module.exports = {
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  },
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-object-assign',
  ],
};
