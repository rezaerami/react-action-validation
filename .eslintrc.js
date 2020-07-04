const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  'parser': 'babel-eslint',
  'env': {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  'extends': [
    'prettier',
    'plugin:import/errors',
    'plugin:jest/recommended'
  ],
  'ignorePatterns': ['*.config.js', '**/dist/*',  '**/node_modules/*'],
  'plugins': ['prettier', 'import', 'jest'],
  'rules': {
    'prettier/prettier': ['error', prettierOptions],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
};
