const fs = require('fs');
const path = require('path');

const exportPackage = async packageJsonContent => {
  try {
    const exportedPackageJsonPath = path.join(
      process.cwd(),
      'dist',
      'package.json',
    );
    const blacklist = [
      'scripts',
      'devDependencies',
      'lint-staged',
      'pre-commit',
    ];

    console.log('exporting package.json');
    const parsedPackageJson = JSON.parse(packageJsonContent);
    parsedPackageJson.main = './index.js';
    const exportedPackageJson = Object.keys(parsedPackageJson).reduce(
      (result, key) => {
        if (!blacklist.includes(key)) {
          result[key] = parsedPackageJson[key];
        }
        return result;
      },
      {},
    );

    console.log('writing package.json');
    await fs.writeFileSync(
      exportedPackageJsonPath,
      JSON.stringify(exportedPackageJson),
    );

    await fs.copyFileSync(
      path.join(process.cwd(), 'README.md'),
      path.join(process.cwd(), 'dist', 'README.md'),
    );

    console.log('successfully exported package.json');
  } catch (e) {
    console.error('an error occurred', e);
  }
};
module.exports = exportPackage;
