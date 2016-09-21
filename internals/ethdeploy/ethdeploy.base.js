/* eslint-disable */
const contracts = require('../../app/contracts/build/classes.json');
const environments = require('../../app/contracts/build/environments.json');

// new entry point
var entry = {
  testrpc: contracts,
  testnet: contracts,
};

// use environments
if (typeof environments !== 'object') {
  if (Object.keys(environments).length !== 0) {
    entry = environments;
  }
}

// main module export
module.exports = {
  output: {
    environment: 'testrpc',
  },
  entry: entry,
  module: function(deploy, contracts){
    deploy(contracts.SimpleStoreRegistry).then(function(simpleStoreRegistry){
      deploy(contracts.SimpleStoreFactory, simpleStoreRegistry.address);
    });
  },
  config: {
    defaultAccount: 0,
    defaultGas: 3000000,
    environments: {
      testrpc: {
        provider: {
          type: 'http',
          host: 'http://localhost',
          port: 8545,
        },
      },
    },
  },
};
