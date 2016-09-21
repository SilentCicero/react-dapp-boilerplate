/* eslint-disable */
/* globals describe, it, before */

const contracts = require('../build/classes.json');
const chaithereum = require('chaithereum');

before(() => chaithereum.promise);

describe('SimpleStoreFactory', () => {
  let simpleStoreFactory;

  it('successfully instantiates with blank params', () => {
    return chaithereum.web3.eth.contract(JSON.parse(contracts.SimpleStoreFactory.interface)).new.q({ data: contracts.SimpleStoreFactory.bytecode }).should.eventually.be.contract.then((_simpleStoreFactory) => {
      simpleStoreFactory = _simpleStoreFactory;
    }).should.eventually.be.fulfilled;
  });
});
