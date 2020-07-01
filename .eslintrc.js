const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  "parser": "babel-eslint",
  "extends": ["prettier"],
  "ignorePatterns": ["*.test.js","*.spec.js", "**/dist/*",  "**/node_modules/*"],
  "plugins": ["prettier"],
  "rules": {
      "prettier/prettier": ["error", prettierOptions]
    }
};
