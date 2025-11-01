require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

const { vars } = require("hardhat/config");

// Environment variables (you can define them with `npx hardhat vars set NAME VALUE`)
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },

  networks: {
    // Base mainnet
    base: {
      url: `https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },

    // Base Sepolia testnet (for safe testing before mainnet)
    baseSepolia: {
      url: `https://base-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },

    // Optional: Ethereum Sepolia testnet
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      base: ETHERSCAN_API_KEY, // For Base mainnet verification
      baseSepolia: ETHERSCAN_API_KEY, // For Base Sepolia verification
    },
  },
};
