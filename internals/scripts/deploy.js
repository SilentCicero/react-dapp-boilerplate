
require('shelljs/global');
const deploy = require('ethdeploy');
const base = require('../ethdeploy/ethdeploy.base.js');
const testnet = require('../ethdeploy/ethdeploy.testnet.js');
const livenet = require('../ethdeploy/ethdeploy.livenet.js');
const testrpc = require('../ethdeploy/ethdeploy.testrpc.js');
const fs = require('fs');

// deployment modules
const deploymentModules = {
  testnet: testnet,
  livenet: livenet,
  testrpc: testrpc,
};

// environments file path
const environmentsFilePath = './app/contracts/build/environments.json';

// wait for testrpc to load, this is a hack until something better is discovered
// testrpc should wait, or deployment staged in sequence somehow
setTimeout(function(){
  deploy(deploymentModules[process.env['ENVIRONMENT']], function(deployError, deployResult){
    if (deployError) throw err;

    fs.writeFile(environmentsFilePath, JSON.stringify(deployResult, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('Contracts deployed!');

      exit(0);
    });
  });
}, 4000);
