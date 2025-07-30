// Import Chai's expect function for assertion in tests.
const { expect } = require("chai");
// Import Hardhat's ethers library to interact with the Ethereum blockchain and contracts.
const { ethers } = require("hardhat");

// Import loadFixture for reusble test setup.
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// Describe block defines a test suite for the DiaryNFT contract.
describe("DiaryNFT", function () {

  // Fixture to deploy DiaryNFT contract and setup signers.
  async function deployDiaryNFTFixture() {

    // Get owner and add1 signers for testing.
    const [owner, addr1] = await ethers.getSigners();
    // Deploy DiaryNFT contract.
    const diaryNFT = await ethers.deployContract("DiaryNFT");
    // Wait for deployment to complete.
    await diaryNFT.waitForDeployment();

    return { diaryNFT, owner, addr1 };
  }

  // Test suite for deployment and functionality.
  describe("Deployment", function () {

    // Test case : verify minting, IPFS hash storage and DiaryMinted event emission.
    it("Mints NFT, stores IPFS hash, and emits DiaryMinted event", async function () {
      // Load Fixture to get contract and signers.
      const { diaryNFT, owner, addr1 } = await loadFixture(
        deployDiaryNFTFixture
      );
      // Check initioal tokenIds is 0.
      expect(await diaryNFT.tokenIds()).to.equal(0);

      // Define a sample IPFS hash for testing.
      const ipfsHash = "QmTestHash123";

      // Mint NFT with addr1 as caller(mints to msg.sender).
      const tx = await diaryNFT.connect(addr1).mintDiary(ipfsHash);
      // Get current tokenId after minting.
      const Id = await diaryNFT.tokenIds();
      
      // Verify DiaryMinted ecevt with tokenId, addr1, and ipfsHash.
      await expect(tx)
        .to.emit(diaryNFT, "DiaryMinted")
        .withArgs(Id, addr1.address, ipfsHash);

      // Check tokenId is 1 after first mint.
      expect(Id).to.equal(1);

      // Verify token ownership is addr1.
      expect(await diaryNFT.ownerOf(Id)).to.equal(addr1.address);
      // Verify tokenURI returns IPFS hash.
      expect(await diaryNFT.tokenURI(Id)).to.equal(ipfsHash);
    });

    // Test case: Verify tokenURI reverts for nonexistent token.
    it("Fails for nonexistent token URI", async function () {
      // Load fixture to get contract.
      const { diaryNFT } = await loadFixture(deployDiaryNFTFixture);

      // Expect tokenURI(999) to revert with ERC721InvalidOwner custom error.
      await expect(diaryNFT.tokenURI(999)).to.be.revertedWithCustomError(
        diaryNFT,
        "ERC721NonexistentToken"
      ); // Fixed from ERC721NonexistentToken.
    });
  });
});
