/* eslint-disable */
/* globals describe, it, before */

const contracts = require('../build/classes.json');
const chaithereum = require('chaithereum');

before(() => chaithereum.promise);

describe('SimpleStore', () => {
  let simpleStore;

  it('successfully instantiates with blank params', () => {
    return chaithereum.web3.eth.contract(JSON.parse(contracts.SimpleStore.interface)).new.q({ data: contracts.SimpleStore.bytecode }).should.eventually.be.contract.then((_simpleStore) => {
      simpleStore = _simpleStore;
    }).should.eventually.be.fulfilled;
  });
});
