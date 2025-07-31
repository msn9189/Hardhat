const { ethers } = require("hardhat");

const { uploadToIPFS } = require("./uploadTpIPFS");

async function main(memoryText) {
    const contractAddress = "";
    const infuraProjectId = "";
    const infuraProjectSecret = "";

    const ipfsHash = await uploadToIPFS(memoryText, infuraProjectId, infuraProjectSecret);
    console.log("IPFS Hash:", ipfsHash);

    const DiaryNFT = await ethers.getContractFactory("DiaryNFT");
    const diaryNFT = await DiaryNFT.attach(contractAddress);

    console.log("Current tokenIds:", (await diaryNFT.tokenIds()).toString());

    const tx = await diaryNFT.mintDiary(ipfsHash);

    const receipt = await tx.wait();

    const diaryMintedEvent = receipt.events.find(e => e.event === "DiaryMinted");

    console.log("Minted NFT, Token ID:", diaryMintedEvent.args.tokenId.toString());

    console.log("Updated tokenIds:", (await diaryNFT.tokenIds()).toString());
}

const memoryText = process.argv[2] || "Sample diary entry";
main(memoryText).catch(console.error);