import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m) => {
  const Counter = m.contract("Counter");

  return { Counter };
});
