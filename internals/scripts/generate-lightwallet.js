/* eslint-disable */
require('shelljs/global');

const path = require('path');
const fs = require('fs');
const zxcvbn = require('zxcvbn');
const prompt = require('prompt-sync');
const lightwallet = require('eth-lightwallet');
const keyStore = lightwallet.keystore;
const inquirer = require('inquirer');
const async = require('async');
const chalk = require('chalk');
// const curl = require('node-curl');

// echo start message
echo(`


  Ethereum Wallet Generation Process:
  via eth-lightwallet


  You are about to begin generating an Ethereum light wallet, please follow the steps below. You will need a wallet for deploying to the Ethereum testnet, livenet and any custom networks.
  Note, this wallet will be generated in the folder outside this repository. Please ensure that location is secure.

  ------------------------------------
`);

// new password
var password = null;
//
// Get two properties from the user: email, password
//var inquirer = require('inquirer');
inquirer.prompt([{
 type: 'password',
 name: 'password',
 validate: function(input) {
   const checkPassword = zxcvbn(input);

   const scores = ['very weak', 'weak', 'medium', 'strong', 'very strong'];

   // If your password score is not 4
   if (checkPassword.score >= 2) {
     return `Your password is too weak (strength: ${scores[checkPassword.score]} [${checkPassword.score}/4]), please select a stronger passphrase..`;
   }

   password = input;
   return true;
 },
 message: 'Please type your new Ethereum wallet passphrase here: '
},
{
 type: 'password',
 name: 'password-retype',
 message: 'Please re-type your passphrase here: ',
 validate: function(input) {
   if (input !== password) {
     return "Your re-typed password does not equal your original passphrase.. please enter the right passphrase.."
   }

   return true;
 },
}
]).then(function (answers) {

 keyStore.createVault({
  password: answers.password,
  // seedPhrase: seedPhrase, // Optionally provide a 12-word seed phrase
  // salt: fixture.salt,     // Optionally provide a salt.
                             // A unique salt will be generated otherwise.
  // hdPathString: hdPath    // Optional custom HD Path String
 }, function (err, ks) {

  // Some methods will require providing the `pwDerivedKey`,
  // Allowing you to only decrypt private keys on an as-needed basis.
  // You can generate that value with this convenient method:
  ks.keyFromPassword(answers.password, function (err, pwDerivedKey) {
    if (err) throw err;

    // generate five new address/private key pairs
    // the corresponding private keys are also encrypted
    ks.generateNewAddress(pwDerivedKey, 5);
    var addr = ks.getAddresses();

    // set wallet path
    const walletPath = path.resolve('../ethereum-wallet.json');

    // generate file sync
    fs.writeFileSync(walletPath, ks.serialize());

    // faucet ether to the account created
    /* curl('www.google.com', {address: addr}, function(err) {
      console.info(this);
    }); */

    // echo generation message
    echo(`

  ${chalk.green('Ethereum wallet file generated!')}
  via eth-lightwallet

  ------------------------------------

  Generation path:
  ${walletPath}

  Ethereum Accounts:
  ${addr.map(function(item){ return `${item}`; })}


  A wallet has been generated for you outside the project folder called 'ethereum-wallet.json'
  This is where your testnet wallet will exist for this project.

  **Please ensure this file is not committed to github or anywhere on the internet.

  ------------------------------------

  Ethereum Testnet Faucets:

  https://zerogox.com/ethereum/wei_faucet


  Note, you can faucet testnet Ether to these accounts (namely the first one), by going to this link and filling in these addresses.

    `);
  });
 });
});
