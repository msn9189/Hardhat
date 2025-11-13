import { expect } from "chai";
import { network } from "hardhat";
import { parseEther } from "ethers";
import { it } from "mocha";

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
  
  it("Should allow buyer to purchase the NFT and emit NFTBought event", async function () {
    const nft = await ethers.deployContract("MockNFT");
    await nft.mint(seller.address, 1);

    const marketplace = await ethers.deployContract("NFTMarketplace");

    const marketplaceAddress = await marketplace.getAddress();
    const nftAddress = await nft.getAddress();

    await nft.approve(marketplaceAddress, 1);
    await marketplace.listNFT(nftAddress, 1, ethers.parseEther("1"));

    await expect(
      marketplace
        .connect(buyer)
        .buyNFT(nftAddress, 1, { value: ethers.parseEther("1") })
    )
      .to.emit(marketplace, "NFTBought")
      .withArgs(nftAddress, 1, buyer.address, ethers.parseEther("1"));

    expect(await nft.ownerOf(1)).to.equal(buyer.address);
  });


  it("Should cancel listing correctly", async function () {
    const nft = await ethers.deployContract("MockNFT");
    await nft.mint(seller.address, 1);

    const marketplace = await ethers.deployContract("NFTMarketplace");

    const marketplaceAddress = await marketplace.getAddress();
    const nftAddress = await nft.getAddress();

    await nft.approve(marketplaceAddress, 1);
    await marketplace.listNFT(nftAddress, 1, ethers.parseEther("1"));

    await expect(marketplace.cancelListing(nftAddress, 1))
    .to.emit(marketplace, "NFTCancelled")
    .withArgs(nftAddress, 1, seller.address);

    const listing = await marketplace.listings(nftAddress, 1);
    expect(listing.price).to.equal(0n);
    expect(listing.seller).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
});
