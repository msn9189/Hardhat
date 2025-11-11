// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title MockNFT
 * @dev Simple ERC721 token used for testing NFTMarketplace.
 */
contract MockNFT is ERC721 {
    constructor() ERC721("MockNFT","MNFT"){}

    /**
     * @notice Mint a new NFT to a specific address.
     * @param to Address to receive th NFT.
     * @param tokenId ID of the NFT to mint.
     */
    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}