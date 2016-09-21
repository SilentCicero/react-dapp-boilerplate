/* eslint-disable */
require('shelljs/global');

// Commit the changes
if (exec('node ./node_modules/solium/bin/solium.js test').code !== 0) {
  echo('\nError: Solium solidity linting has failed..');
  exit(1);
} else {
  exit(0);
}
