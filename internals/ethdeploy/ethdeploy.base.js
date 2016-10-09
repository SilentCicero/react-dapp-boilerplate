/* eslint-disable */
const contracts = require('../../app/contracts/build/classes.json');
const environments = require('../../app/contracts/build/environments.json');

// new entry point
var entry = {
  testrpc: contracts,
  testnet: contracts,
  livenet: contracts,
};

// use environments
if (typeof environments !== 'object') {
  if (Object.keys(environments).length !== 0) {
    entry = environments;
  }
}

// main module export
module.exports = {
  entry: entry,
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
      testnet: {
        provider: {
          type: 'zero-client',
          getAccounts: function(cb) {
            cb(null, ['0x2233eD250Ea774146B0fBbC1da0Ffa6a81514cCC']);
          },
          signTransaction: function(rawTx, cb) {
            const privateKey = new  Buffer('', 'hex');

            const tx = new Tx(rawTx);
            tx.sign(privateKey);

            cb(null, ethUtil.bufferToHex(tx.serialize()));
          },
          host: 'https://morden.infura.io',
          port: 8545,
        }
      },
      livenet: {
        provider: {
          type: 'zero-client',
          getAccounts: function(cb) {
            cb(null, ['0x2233eD250Ea774146B0fBbC1da0Ffa6a81514cCC']);
          },
          signTransaction: function(rawTx, cb) {
            const privateKey = new Buffer('', 'hex');

            const tx = new Tx(rawTx);
            tx.sign(privateKey);

            cb(null, ethUtil.bufferToHex(tx.serialize()));
          },
          host: 'https://livenet.infura.io',
          port: 8545,
        }
      },
    },
  },
};
