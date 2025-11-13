import { expect } from "chai";
import { network } from "hardhat";
import { parseEther } from "ethers";

const { ethers } = await network.connect();

describe("NFTMarketplace", function () {
  let seller: any;
  let buyer: any;

  beforeEach(async function () {
    [seller, buyer] = await ethers.getSigners();
  });

  it("Should list an NFT for sale and emit NFTListed event", async function () {
    const nft = await ethers.deployContract("MockNFT");
    await nft.mint(seller.address, 1);

    const marketplace = await ethers.deployContract("NFTMarketplace");

    const marketplaceAddress = await marketplace.getAddress();
    const nftAddress = await nft.getAddress();

    await nft.approve(marketplaceAddress, 1);

    await expect(marketplace.listNFT(nftAddress, 1, parseEther("1")))
      .to.emit(marketplace, "NFTListed")
      .withArgs(nftAddress, 1, seller.address, parseEther("1"));
  });
});
