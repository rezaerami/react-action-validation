const fs = require('fs');
const path = require('path');

const run = async () => {
  try {
    const args = process.argv.slice(2);
    const [version] = args;
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    console.log('reading package.json');
    const packageJsonContent = await fs.readFileSync(packageJsonPath, 'utf-8');

    console.log('upgrading package.json');
    const updatedPackageJson = packageJsonContent.replace(
      /"version": "(.*)",/,
      `"version": "${version}",`,
    );

    console.log('writing package.json');
    await fs.writeFileSync(packageJsonPath, updatedPackageJson);

    console.log('successfully updated package.json');
  } catch (e) {
    console.error('an error occured', e);
  }
};

run();
