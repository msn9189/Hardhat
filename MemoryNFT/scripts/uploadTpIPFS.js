// Import Infura SDK for IPFS uploads.
const { Infura } = require("@infura/sdk");

async function uploadToIPFS(memoryText, infuraProjectId, infuraProjectSecret) {
    // Initialize Infura client with project credentials.
    const infura = new Infura ({
        projectId: infuraProjectId,
        projectSecret: infuraProjectSecret,
    });

    // Create metadata object for NFT.
    const metadata = {
        name: "Diary Entry",
        description: "A personal memory",
        content: memoryText,
        data: new Date().toISOString(),
    };

    // Upload metadata to IPFS and return CID.
    const result = await infura.add(JSON.stringify(metadata));
    return result.cid.toString();
}

// Export function for use in other scripts.
module.exports = { uploadToIPFS };