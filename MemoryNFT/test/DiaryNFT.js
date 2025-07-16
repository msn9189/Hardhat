const { expect } = require("chai");
const {  ethers } = require("hardhat");

describe("DiaryNFT", function() {
    let diaryNFT, owner, addr1;

    beforeEach(async function () {
        const DiaryNFT = await ethers.getContractFactory("DiaryNFT");
        [owner, addr1] = await ethers.getSigners();
        diaryNFT = await DiaryNFT.deploy();
        await diaryNFT.deployed();
    });

    it("Mints NFT, stores IPFS hash, and emits DiaryMinted event", async function () {

        const ipfsHash = "QmTestHash123";
        const tx = await diaryNFT.mintDiary(addr1.address, ipfsHash);
        const receipt = await tx.wait();
        const tokenId = recipient.events[0].args.tokenId;

        expect(await diaryNFT.ownerOf(tokenId)).to.equal(addr1.address);
        expect(await diaryNFT.tokenURI(tokenId)).to.equal(ipfsHash);

        expect(receipt.events).to.have.lengthOf(2);

        const event = receipt.events.find(e => e.event === "DiaryMinted");

        expect(event).to.exist;

        expect(event.args.tokenId).to.equal(tokenId);
        
        expect(event.args.recipient).to,equal(addr1.address);

        expect(event.args.ipfsHash).to.equal(ipfsHash);
    });

    it("Fails for nonexistent token URI", async function () {
        await expect(diaryNFT.tokenURI(999)).to.be.revertedWith("ERC721: URI query for nonexistent token");
        
    });
    
    
});