## Run the development server:
# development mode (Ganache)
npm run dev
# production mode (Goerli)
npm run build 
npm start 

## Deploy smart contracts locally
truffle migrate
truffle migrate --reset

## Deploy smart contracts goerli
truffle migrate --network goerli

## Run truffle unit tests
truffle test

## Getting owner of smart contract
truffle console --network goerli
const instance = await CourseMarketplace.deployed()
await instance.getContractOwner()

## Deployed version
### https://solidity-smart-contracts-e6qdwsibr-kersic.vercel.app/#

<div style="display:flex">
  <img src="https://github.com/Kersic/SoliditySmartContracts/blob/main/SolidityAndEthereumInReactCourse/marketplace-eth/screenshots/Screenshot%20at%20Jan%2005%2018-33-51.png" width="300">
  <img src="https://github.com/Kersic/SoliditySmartContracts/blob/main/SolidityAndEthereumInReactCourse/marketplace-eth/screenshots/Screenshot%20at%20Jan%2005%2017-59-34.png" width="300">
</div>
<div style="display:flex">
 
  <img src="https://github.com/Kersic/SoliditySmartContracts/blob/main/SolidityAndEthereumInReactCourse/marketplace-eth/screenshots/Screenshot%20at%20Jan%2005%2018-00-39.png" width="300">
  <img src="https://github.com/Kersic/SoliditySmartContracts/blob/main/SolidityAndEthereumInReactCourse/marketplace-eth/screenshots/Screenshot%20at%20Jan%2005%2018-02-30.png" width="300">
</div>
