/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a Ethereum Solidity contract',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of contract',
    default: 'Stateless Function',
    choices: () => ['Contract', 'Library'],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'SimpleStore',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A contract or library already exists with that name' : true;
      }

      return 'The name is required';
    },
  }],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../app/contracts/{{properCase name}}.sol',
      templateFile: data.type === 'Contract' ? './contract/contract.sol.hbs' : './contract/library.sol.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/contracts/tests/test.{{properCase name}}.sol',
      templateFile: './contract/test.contract.sol.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/contracts/tests/test.{{properCase name}}.js',
      templateFile: './contract/test.contract.js.hbs',
      abortOnFail: true,
    }];

    return actions;
  },
};
