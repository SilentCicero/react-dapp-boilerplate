/* eslint-disable */
const base = require('./ethdeploy.base.js');

// main module export
module.exports = Object.assign(base, {
  output: {
    environment: 'testrpc',
  },
  module: function(deploy, contracts){
    deploy(contracts.SimpleStoreRegistry).then(function(simpleStoreRegistry){
      deploy(contracts.SimpleStoreFactory, simpleStoreRegistry.address);
    });
  },
});
