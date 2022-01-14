const path = require("path");

const HDWalletProvider = require('@truffle/hdwallet-provider');
// const privateKeys = ['0x + PRIVATE_KEY'];
const privateKeys = ['0x5e8669fc6c73339b385550fa46e533039091bdf0190a56411b434895e3e608bf']; // for local test

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    eth: {
      provider: () => new HDWalletProvider(
        privateKeys,
        'ETH_NODE_URL'
      ),
      network_id: 1,
      skipDryRun: true
    },
    ethTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys,
        'ETH_NODE_URL'
      ),
      network_id: 5,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(
        privateKeys,
        'https://bsc-dataseed.binance.org/'
      ),
      network_id: 56,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys,
        'https://data-seed-prebsc-1-s1.binance.org:8545/'
      ),
      network_id: 97,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
