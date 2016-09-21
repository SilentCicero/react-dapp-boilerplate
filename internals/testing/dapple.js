/* eslint-disable */
require('shelljs/global');

const chalk = require('chalk');

echo(`

${chalk.underline('DAPPLE TESTING STARTED:')}

`);

// Commit the changes
if (exec('cd ./app && node ../node_modules/dapple/cmd/main.js test').code !== 0) {
  echo('\nError: Dapple test failed');
  exit(1);
} else {
  exit(0);
}
