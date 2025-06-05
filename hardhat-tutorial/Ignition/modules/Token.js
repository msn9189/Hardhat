const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {
    const token = m.contract("Token");
    return {token};
});

TokenModule.exports = TokenModule;