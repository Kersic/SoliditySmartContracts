
//const Web3 = require("web3")
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
const infuraKey = fs.readFileSync(".infuraKey").toString().trim();
const INFURA_PROVIDER = "https://goerli.infura.io/v3/"

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    goerli: {
      provider: () => { return new HDWalletProvider(privateKey, INFURA_PROVIDER+infuraKey)},
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 95683766192,
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
