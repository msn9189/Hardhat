// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import Openzeppelin's ERC721 contract for standard NFT functionality.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Imort OpenZeppelin's Counters utility for safe, incremental token Id management.
import "@openzeppelin/contracts/utils/Counters.sol";

// Define th DiaryNFT contract, inheriting from ERC721 to create NFTs.
contract DiaryNFT is ERC721 {

    // Enable Counters library functions for the Counters.counter type.
    using Counters for Counters.Counter;
    // Private counter to track the next availabe token ID for minting.
    Counters.Counter private _tokenIds;
    // Private mapping to store IPFS hashes (metadata URIs) for each tokenID.
    mapping(uint256 => string) private _tokenURIs;

    // Event emitted when a new diary NFT is minted, including tokenID, recipient and IPFS hash.
    event DiaryMinted(uint256 indexed tokenId, address indexed recipient, string ipfsHash);

    // Constructor initializes the ERC721 contract with name "DiaryNFT" and symbol "DIARY'
    constructor() ERC721("DiaryNFT", "DIARY"){}

    // Mints a new NFT to the recipient address with the provided IPFS hash as metadata.
    // Public function, anyone can call it. Returns the new token ID.
    function mintDiary(address recipient, string memory ipfsHash) public returns (uint256){
        // Increment the token ID counter to generate an unique ID.
        _tokenIds.increment();
        // Get the current (newly incremented) token ID.
        uint256 newTokenId = _tokenIds.current();
        // Mint the NFT to the recipient with the new token ID, ensuring safe transfer.
        _safemint(recipient, newTokenId);
        // Store the IPFS hash in the tokenURIs mapping for the new token ID.
        _tokenURIs[newTokenId] = ipfsHash;
        // Emit the DiaryMinted event to log.
        emit DiaryMinted(newTokenId, recipient, ipfsHash);
        // Return the new token ID to the caller.
        return newTokenId;
    }

    // Overrides ERC721's tokenURI function to return the IPFS hash for a given token ID.
    // View function, does not modify state, retuns string.
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Ensure the token exists, revert if it doesn't.
        require(_exists(tokenId), "ERC721: URI query for nonexistent token");
        // Return the IPFS hash associated with the token ID.
        return _tokenURIs[tokenId];
    }
}