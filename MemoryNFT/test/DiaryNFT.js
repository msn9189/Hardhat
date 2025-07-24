// Import Chai's expect function for assertion in tests.
const { expect } = require("chai");
// Import Hardhat's ethers library to interact with the Ethereum blockchain and contracts.
const { ethers, loadFixture } = require("hardhat");

// Describe block defines a test suite for the DiaryNFT contract.
describe("DiaryNFT", function () {
  async function deployDiaryNFTFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const DiaryNFT = await ethers.getContractFactory("DiaryNFT");

    const diaryNFT = await DiaryNFT.deploy();

    await diaryNFT.deployed();

    return { diaryNFT, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Mints NFT, stores IPFS hash, and emits DiaryMinted event", async function () {
      const { diaryNFT, owner, addr1 } = await loadFixture(
        deployDiaryNFTFixture
      );

      const ipfsHash = "QmTestHash123";
      const tx = await diaryNFT.mintDiary(addr1.address, ipfsHash);
      const receipt = await tx.wait();
      const tokenId = receipt.events[0].args.tokenId;

      expect(await diaryNFT.ownerOf(tokenId)).to.equal(addr1.address);

      expect(await diaryNFT.tokenURI(tokenId)).to.equal(ipfsHash);

      expect(receipt.events).to.have.lengthOf(2);

      const event = receipt.events.find((e) => e.event === "DiaryMinted");

      expect(event).to.exist;

      expect(event.args.tokenId).to.equal(tokenId);
      expect(event.args.receipient).to.equal(addr1.address);
      expect(event.args.ipfsHash).to.equal(ipfsHash);
    });

    it("Fails for nonexistent token URI", async function () {
      const { diaryNFT } = await loadFixture(deployDiaryNFTFixture);
      await expect(diaryNFT.tokenURI(999)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });
  });
});
