// const fs = require('fs');
// require('@nomiclabs/hardhat-waffle');

// const privateKey = fs.readFileSync('.secret').toString().trim();

// module.exports = {
//   networks: {
//     hardhat: {
//       chainId: 1337,
//     },
//   },
//   solidity: '0.8.4',
// };

require('@nomicfoundation/hardhat-toolbox');
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");



module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
