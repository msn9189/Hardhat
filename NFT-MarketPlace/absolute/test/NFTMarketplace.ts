import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("NFTMarketplace", function () {
  let seller: any;
  let buyer: any;

  beforeEach(async function () {
    [seller, buyer] = await ethers.getSigners();
  });

  it("Should list an NFT for sale and emit NFTListed event", async function () {
    const nft = await ethers.deployContract("MochNFT");
    await nft.mint(seller.address, 1);

    const marketplace = await ethers.deployContract("NFTMarketplace");

    await nft.approve(marketplace.address, 1);

    await expect(marketplace.listNFT(nft.address, 1, parseEther("1")))
      .to.emit(marketplace, "NFTListed")
      .withArgs(nft.address, 1, seller.address);
  });
});
