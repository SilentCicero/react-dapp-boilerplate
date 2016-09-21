/* eslint-disable */
/* globals describe, it, before */

const contracts = require('../build/classes.json');
const chaithereum = require('chaithereum');

before(() => chaithereum.promise);

describe('SimpleStoreRegistry', () => {
  let simpleStoreRegistry;

  it('successfully instantiates with blank params', () => {
    return chaithereum.web3.eth.contract(JSON.parse(contracts.SimpleStoreRegistry.interface)).new.q({ data: contracts.SimpleStoreRegistry.bytecode }).should.eventually.be.contract.then((_simpleStoreRegistry) => {
      simpleStoreRegistry = _simpleStoreRegistry;
    }).should.eventually.be.fulfilled;
  });
});
