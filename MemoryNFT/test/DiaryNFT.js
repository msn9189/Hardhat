// Import Chai's expect function for assertion in tests.
const { expect } = require("chai");
// Import Hardhat's ethers library to interact with the Ethereum blockchain and contracts.
const {  ethers } = require("hardhat");

// Describe block defines a test suite for the DiaryNFT contract.
describe("DiaryNFT", function() {
    // Declare variables to hold the contract instance and signers (accounts).
    let diaryNFT, owner, addr1;

    // beforeEach hook runs before each test, setting up a fresh environment.
    beforeEach(async function () {
        // Get the DiaryNFT contract factory to deploy or interact with the contract.
        const DiaryNFT = await ethers.getContractFactory("DiaryNFT");
        // Get two signers: owner (deployer) and addr1 (another account) for testing.
        [owner, addr1] = await ethers.getSigners();
        // Deploy a new instance of the DiaryNFT contract.
        diaryNFT = await DiaryNFT.deploy();
        // Wait for the contract deployment to complete.
        await diaryNFT.deployed();
    });

    // Test case: Verify that minting an NFT works, stores the IPFS hash, and emits the DiaryMinted event.
    it("Mints NFT, stores IPFS hash, and emits DiaryMinted event", async function () {

        // Define a sample IPFS hash to the test.
        const ipfsHash = "QmTestHash123";
        // Call the mintDiary function to mint an NFT to addr1 with the IPFS hash.
        const tx = await diaryNFT.mintDiary(addr1.address, ipfsHash);
        // Wait for the transaction to be mined and get the receipt.
        const receipt = await tx.wait();
        // Extract the tokenId from the first event (Transfer on DiaryMinted) in the receipt
        const tokenId = recipient.events[0].args.tokenId;

        // Assert that the owner of the minted token is addr1.
        expect(await diaryNFT.ownerOf(tokenId)).to.equal(addr1.address);

        // Assert that the tokenURI for the tokenId matches the provided IPFS hash.
        expect(await diaryNFT.tokenURI(tokenId)).to.equal(ipfsHash);

        // Assert  that the transaction emitted two events: Transfer (from the ERC721) and DiaryMinted.
        expect(receipt.events).to.have.lengthOf(2);

        // Find the DiaryMinted event in the receipt's events.
        const event = receipt.events.find(e => e.event === "DiaryMinted");

        // Assert that the DiaryMinted event exists.
        expect(event).to.exist;

        //Assert that the event's tokenId matched the minted token ID.
        expect(event.args.tokenId).to.equal(tokenId);
        
        // Assert that the event's recipient matches addr1's address.
        expect(event.args.recipient).to,equal(addr1.address);

        // Assert that the event's ipfsHash matches the provided IPFShash.
        expect(event.args.ipfsHash).to.equal(ipfsHash);
    });

    // Test case: Verify that querying the tokenURI for a nonexistent token fails.
    it("Fails for nonexistent token URI", async function () {

        // Expect the tokenURI function to revert when called with a nonexistent token ID (999).
        await expect(diaryNFT.tokenURI(999)).to.be.revertedWith("ERC721: invalid token ID");
        
    });
    
    
});