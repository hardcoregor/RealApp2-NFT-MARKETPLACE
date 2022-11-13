require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');

const fs = require('fs');

const privateKey = fs.readFileSync('.secret').toString().trim();
const privateApi = fs.readFileSync('.secret1').toString().trim();

const ALCHEMY_API_KEY = privateApi;

const GOERLI_PRIVATE_KEY = privateKey;

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
