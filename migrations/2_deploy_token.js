// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const NEXXO = artifacts.require('./nexxo.sol');

module.exports = async function (deployer) {
  const instance = await deployProxy(NEXXO, { deployer });
  console.log('Deployed', instance.address);
};