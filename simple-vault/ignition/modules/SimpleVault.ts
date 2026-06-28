import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpleVaultModule", (m) => {
  const simpleVault = m.contract("SimpleVault");

  return { simpleVault };
});
