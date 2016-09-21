
require('shelljs/global');
const deploy = require('ethdeploy');
const base = require('../ethdeploy/ethdeploy.base.js');
const fs = require('fs');

setTimeout(function(){
  console.log(`Deploying contracts...`);

  deploy(base, function(deployError, deployResult){
    if (deployError) throw err;

    fs.writeFile('./app/contracts/build/environments.json', JSON.stringify(deployResult, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('Contracts deployed!');

      exit(0);
    });
  });
}, 4000);
