// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title NFT Marketplace
 * @author nazii.eth
 * @notice A simple and secure marketplace for listing and buying ERC721 NFT.
 * @dev Uses ReentrancyGuard to prevent reentrancy attacks.
 */
contract NFTMarketplace is ReentrancyGuard {

    /**
     * @dev Represents a listed NFT with seller and price information.
     */
    struct Listing {
        address seller;
        uint256 price;
    }

    /**
     * @dev Mapping of NFT contract address => tokenId => Listing
     * Each NFT can have at most one active listing.
     */
    mapping(address => mapping(uint256 => Listing)) public listings;

    /// @notice Emitted when an NFT is listed for sale
    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);

    /// @notice Emitted when an NFT is purchased by the seller.
    event NFTBought(address indexed nftContract, uint256 indexed tokenId, address buyer, uint256 price);
    
    /// @notice Emitted when a listing is canceled by the seller.
    event NFTCancelled(address indexed nftContract, uint256 indexed tokenId, address seller);

    /**
     * @notice Lists an NFT for sale on the marketplace
     * @dev The caller must be the owner and must have approved the marketplace.
     * @param nftContract The address of the ERC721 contract.
     * @param tokenId The token ID of the NFT to list.
     * @param price The sale price in wei (must be greater than 0).
     */
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        IERC721 nft = IERC721(nftContract);

        // Ensure the caller owns the NFT
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");

        // Ensure the marketplace contract is approved to transfer the NFT
        require(
            nft.getApproved(tokenId) == address(this) ||
            nft.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );

        listings[nftContract][tokenId] = Listing(msg.sender, price);
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    /**
     * @notice Allows a user to buy a listed NFT by sending ETH.
     * @dev Uses nonReentrant modifier to prevent reentrancy attacks.
     * The listing is deleted before funds are transferred to seller.
     * @param nftContract The address of the ERXV721 contract.
     * @param tokenId The token ID of the NFT to buy.
     */
    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listedItem = listings[nftContract][tokenId];
        require(listedItem.price > 0, "NFT not for sale");
        require(msg.value >= listedItem.price, "Not enough ETH sent");

        // Delete the listing before transferring ETH to prevent reentrancy
        delete listings[nftContract][tokenId];

        // Transfer the NFT to the buyer.
        IERC721(nftContract).transferFrom(listedItem.seller, msg.sender, tokenId);

        // Send ETH to the seller
        (bool success, ) = payable(listedItem.seller).call{value: msg.value}("");
        require(success, "ETH transfer failed");

        emit NFTBought(nftContract, tokenId, msg.sender, listedItem.price);
    }

    /**
     * @notice Cancels an active listing.
     * @dev Only the original seller can cancel their own listing.
     * @param nftContract The address of the ERC721 contract.
     * @param tokenId The token ID to the NFT to cancel.
     */
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listedItem = listings[nftContract][tokenId];
        require(listedItem.seller == msg.sender, "Not seller");

        delete listings[nftContract][tokenId];
        
        emit NFTCancelled(nftContract, tokenId, msg.sender);
    }

}   