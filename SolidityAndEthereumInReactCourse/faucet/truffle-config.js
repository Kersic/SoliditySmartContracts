
//const Web3 = require("web3")
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
const QUICKNODE_PROVIDER = "https://delicate-virulent-pallet.ethereum-goerli.discover.quiknode.pro/f85263da988e5750a3ed984484031b08af368d3a/"

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    goerli: {
      provider: () => new HDWalletProvider(privateKey, QUICKNODE_PROVIDER),
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
