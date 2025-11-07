import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpleBank", (m) => {
  const SimpleBank = m.contract("ُSimpleBank");

  return { SimpleBank };
});
