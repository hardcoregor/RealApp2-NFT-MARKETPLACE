
// const hre = require('hardhat');

// async function main() {
//   const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
//   const nftMarketplace = await NFTMarketplace.deploy();

//   await nftMarketplace.deployed();

//   console.log('NFTMarketplace deployed to:', nftMarketplace.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await NFTMarketplace.deploy();

  console.log('NFTMarketplace deployed to:', nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
