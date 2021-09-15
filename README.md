# For fresh install
1. install VS Code or your favourite IDE
2. install [NodeJS](https://nodejs.org/en/)
3. install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

# Set up Truffle
1. Create project folder with mkdir or OS GUI
2. cd _project folder_ / open project folder with IDE
3. `truffle init` 
4. `npm i --save-dev @openzeppelin/contracts` or `npm install @openzeppelin/contracts-upgradeable`
5. for upgradable contract, run `npm install --save-dev @openzeppelin/truffle-upgrades`
6. `npm install @truffle/hdwallet-provider`
7. `npm install --save-dev dotenv`
8. Set up .env file in project directory with code as example. File a sample from previous deployment.
  ```
  INFURA_PROJECT_ID="xxx"
  MAINNET_MNEMONIC="xxx"
  ETHERSCAN_API_KEY="xxx"
  ```
8. Set up .gitignore file in project director with code as example
  ```
  # Dependency directory
  node_modules

  # local env variables
  .env

  # truffle build directory
  build
  ```
10. reconfig truffle-config.js 
  - remove quotation in the js file to activate hdwallet-provider and input the following code block  
  ```js
  require('dotenv').config()

  const HDWalletProvider = require('@truffle/hdwallet-provider');
  const infuraProjectId = process.env.INFURA_PROJECT_ID;
  ```
  - add network configuration
  ```js
  rinkeby: {
    provider: () => new HDWalletProvider(process.env.MAINNET_MNEMONIC, "https://rinkeby.infura.io/v3/" + infuraProjectId),
    network_id: 4,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  ```
  or
  ```js
  mainnet: {
      provider: () => new HDWalletProvider(process.env.MAINNET_MNEMONIC, "https://mainnet.infura.io/v3/" + infuraProjectId),
      network_id: 1,       // Mainnet's id
      gas: 5500000,        // Mainnet has a lower block limit than mainnet
      gasPrice: 250000000000,  // check https://ethgasstation.info/197000000000
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false     // Skip dry run before migrations? (default: false for public nets )
      },
  ```    
  
  + solc version ^0.8.0 (note: check OpenZeppelin for compatibility)
11. Add 2_deploy_token file -> input the following code
```js
var MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
```
13. If presented with json-lock error, comment the entire code block in the path shown in terminal
```js
            const isMtimeOurs = lock.mtime.getTime() === stat.mtime.getTime();

            if (!isMtimeOurs) {
                return setLockAsCompromised(
                    file,
                    lock,
                    Object.assign(
                        new Error('Unable to update lock within the stale threshold'),
                        { code: 'ECOMPROMISED' }
                    ));
            }
```
# Migration
1. Use Ganache and Truffle console
2. truffle migrate --network rinkeby
3. truffle migrate --network mainnet

# Verification
https://kalis.me/verify-truffle-smart-contracts-etherscan/

run `npm install -D truffle-plugin-verify`

add the following code to the end of the module.exports block
```
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
```
run `truffle run verify [contractName] --network rinkeby`
