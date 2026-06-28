import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("SimpleVaultModule", (m) => {
  const simpleVault = m.contract("SimpleVault");

  return { simpleVault };
});
