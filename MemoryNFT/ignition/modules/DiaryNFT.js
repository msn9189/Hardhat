// Import the buildModule function from Hardhat Ignition to define a deployment module.
// A module is a reusable, declarative script that specifies how to deploy contracts
// and manage their dependencies.
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Export a Hardhat Ignition module named "DIaryNFTModule" for deploying the contract.
// A callback function with a module builder (m) that defines the deployment logic.
module.exports = buildModule("DiaryNFTModule", (m) => {
    // Deploy the DiaryNFT contract using the module builder (m).
    // The contract is referenced by its name ("DiaryNFT") as defined in contracts/DiaryNFT.sol
    const diaryNFT = m.contract("DiaryNFT");

    // Return an object containing deployed contract instance for use in other modules or scripts.
    // The key "diaryNFT" allows access to the contract's address and instance after deployment.
    return { diaryNFT };
});