// Import Chai's expect function for assertion in tests.
const { expect } = require("chai");
// Import Hardhat's ethers library to interact with the Ethereum blockchain and contracts.
const { ethers } = require("hardhat");

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// Describe block defines a test suite for the DiaryNFT contract.
describe("DiaryNFT", function () {
  async function deployDiaryNFTFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const diaryNFT = await ethers.deployContract("DiaryNFT");

    await diaryNFT.waitForDeployment();

    return { diaryNFT, owner, addr1 };
  }

  describe("Deployment", function () {

    // Test case : verify minting, IPFS hash storage and DiaryMinted event emission.
    it("Mints NFT, stores IPFS hash, and emits DiaryMinted event", async function () {
      const { diaryNFT, owner, addr1 } = await loadFixture(
        deployDiaryNFTFixture
      );
      expect(await diaryNFT.tokenIds()).to.equal(0);

      // Define a sample IPFS hash for testing.
      const ipfsHash = "QmTestHash123";

      
      const tx = await diaryNFT.mintDiary(addr1.address, ipfsHash);
      const Id = await diaryNFT.tokenIds();
      await expect(tx)
        .to.emit(diaryNFT, "DiaryMinted")
        .withArgs(Id, addr1.address, ipfsHash);

      expect(Id).to.equal(1);

      expect(await diaryNFT.ownerOf(Id)).to.equal(addr1.address);
      expect(await diaryNFT.tokenURI(Id)).to.equal(ipfsHash);
    });

    // Send a nonexistent tokenId. the Function will return false and revert with a custom error.
    it("Fails for nonexistent token URI", async function () {
      const { diaryNFT } = await loadFixture(deployDiaryNFTFixture);

      await expect(diaryNFT.tokenURI(999)).to.be.revertedWithCustomError(
        diaryNFT,
        "ERC721NonexistentToken"
      );
    });
  });
});
