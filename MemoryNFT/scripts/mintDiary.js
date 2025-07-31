// Import Hardhat's ethers for contract interaction.
const { ethers, vars } = require("hardhat");

// Import uploadToIPFS function from the uploadToIPFS.js.
const { uploadToIPFS } = require("./uploadTpIPFS");

// main function accepts memoryText as input.
async function main(memoryText) {
    // Define contract address and Infura credentials.
    const contractAddress = ""; // Replace with deployed address.

    // Get Infura credentials from Hardhat vars.
    const infuraProjectId = await vars.get("INFURA_PROJECT_ID");
    const infuraProjectSecret = await vars.get("INFURA_PROJECT_SECRET");

    // Upload metadata to IPFS and get hash.
    const ipfsHash = await uploadToIPFS(memoryText, infuraProjectId, infuraProjectSecret);
    console.log("IPFS Hash:", ipfsHash);

    // Get contract factory and attach to deployed contract.
    const DiaryNFT = await ethers.getContractFactory("DiaryNFT");
    const diaryNFT = await DiaryNFT.attach(contractAddress);

    // Log current tokenIds.
    console.log("Current tokenIds:", (await diaryNFT.tokenIds()).toString());

    // call mintDiary to mint NFT to msg.sender with ipfshash.
    const tx = await diaryNFT.mintDiary(ipfsHash);

    // wait for transaction and get receipt.
    const receipt = await tx.wait();

    // Find DiaryMinted event and log token Id.
    const diaryMintedEvent = receipt.events.find(e => e.event === "DiaryMinted");
    console.log("Minted NFT, Token ID:", diaryMintedEvent.args.tokenId.toString());

    // log updated tokenIds
    console.log("Updated tokenIds:", (await diaryNFT.tokenIds()).toString());
}

// Execute script with memoryText from command-line argument or default.
const memoryText = process.argv[2] || "Sample diary entry"; // Use first argument or default.
main(memoryText).catch(console.error);