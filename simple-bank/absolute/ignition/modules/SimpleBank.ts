import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpleBankModule", (m) => {
  const SimpleBank = m.contract("SimpleBank");

  return { SimpleBank };
});
