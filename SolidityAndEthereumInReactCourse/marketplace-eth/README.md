## Run the development server:
npm run dev

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