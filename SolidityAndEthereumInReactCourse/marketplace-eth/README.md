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
# https://solidity-smart-contracts-e6qdwsibr-kersic.vercel.app/#

