import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NFTMarketplaceModule", (m) => {
  const NFTMarketplace = m.contract("NFTMarketplace");

  return { NFTMarketplace };
});
