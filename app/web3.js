import Web3 from 'web3';

// instantiate new web3 instance
const web3 = new Web3();

// providers
export const providers = {
  livenet: web3.setProvider(new web3.providers.HttpProvider('https://livenet.infura.io/')),
  testnet: web3.setProvider(new web3.providers.HttpProvider('https://morden.infura.io/')),
  testrpc: web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')),
};

// if window provider exists
if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
  providers.window = web3.setProvider(window.web3.currentProvider);
}

// get current provider
export function getCurrentProvider() {
  return web3.currentProvider;
}

// set provider abstraction
export function setProvider(provider) {
  if (typeof provider === 'string') {
    web3.setProvider(providers[provider]);
  } else {
    web3.setProvider(provider);
  }
}

// Abstraction:
// The web3 object may change in the future
// it is best to abstract the critical methods
// so we dont get hung up on object design that may change in the future

// abstract the getBalance object
export function getBalance() {
  return web3.eth.getBalance.apply(web3.eth, arguments); // eslint-disable-line
}

// abstract the contract object
export function contract() {
  return web3.eth.contract.apply(web3.eth, arguments); // eslint-disable-line
}

// export web3 object instance
export default web3;
