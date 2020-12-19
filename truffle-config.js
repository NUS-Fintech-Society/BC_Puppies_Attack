const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider("action door dinner city adjust supply raise review idle crater envelope canal", "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/27f271414b50445d929e7e13d5687c05", AccountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
};
