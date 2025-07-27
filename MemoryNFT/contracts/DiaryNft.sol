// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import Openzeppelin's ERC721 contract for standard NFT functionality.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Define th DiaryNFT contract, inheriting from ERC721 to create NFTs.
import "hardhat/console.sol";

contract DiaryNFT is ERC721 {

    // Private counter to track the next available token ID for minting.
    uint256 public tokenIds;

    // Private mapping to store IPFS hashes (metadata URIs) for each tokenID.
    mapping(uint256 => string) private _tokenURIs;

    // Event emitted when a new diary NFT is minted, including tokenID, recipient and IPFS hash.
    event DiaryMinted(uint256 indexed tokenId, address indexed recipient, string ipfsHash);

    // Constructor initializes the ERC721 contract with name "DiaryNFT" and symbol "DIARY'
    constructor() ERC721("DiaryNFT", "DIARY"){
        tokenIds = 0; // Initialize the token ID counter to 0;
    }

    // Mints a new NFT to the recipient address with the provided IPFS hash as metadata.
    // Public function, anyone can call it. Returns the new token ID.
    function mintDiary(string memory ipfsHash) public returns (uint256){
        // Increment the token ID counter;
        tokenIds++;
        // The address that call this function is the recipient of the minted NFT.
        address recipient = msg.sender;
        // Get the current (newly incremented) token ID.
        uint256 newTokenId = tokenIds;
        // Mint the NFT to the recipient with the new token ID, ensuring safe transfer.
        _safeMint(recipient, newTokenId);

        console.log(
            "The new token Id is %s .",
            newTokenId
        );
        
        // Store the IPFS hash in the tokenURIs mapping for the new token ID.
        _tokenURIs[newTokenId] = ipfsHash;
        // Emit the DiaryMinted event to log.
        emit DiaryMinted(newTokenId, recipient, ipfsHash);

       
        // Return the new token ID to the caller.
        return newTokenId;
    }

    // Overrides ERC721's tokenURI function to return the IPFS hash for a given token ID.
    // View function, does not modify state, retuns string.
    function tokenURI(uint256 tokenId) public override view returns (string memory) {
        // Check if the token exists by calling ownerOf; it reverts if the token doesn't exist.
        ownerOf(tokenId); // Reverts with "ERC721: invalid token ID" for nonexistent tokens.
        // Return the IPFS hash associated with the token ID.
        
        return _tokenURIs[tokenId];
        }
}