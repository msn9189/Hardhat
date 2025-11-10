// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listing;

    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event NFTBought(address indexed nftContract, uint256 indexed tokenId, address buyer, uint256 price);
    event NFTCancelled(address indexed nftContract, uint256 indexed tokenId, address seller);

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");
        require(
            nft.getApproved(tokenId) == address(this) ||
            nft.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );

        listings[nftContract][tokenId] = Listing(msg.sender, price);
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listedItem = listings[nftContract][tokenId];
        require(listedItem.price > 0, "NFT not for sale");
        require(msg.value >= listedItem.price, "Not enough ETH sent");

        delete listings[nftContract][tokenId];

        IERC721(nftContract).transformFrom(listedItem.seller, msg.sender, tokenId);

        (bool success, ) = payable(listedItem.seller).call{value: msg.value}("");
        require(success, "ETH transfer failed");

        emit NFTBought(nftContract, tokenId, msg.sender, listedItem.price);
    }

    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listedItem = listings[nftContract][tokenId];
        require(listedItem.seller == msg.sender, "Not seller");

        delete listings[nftContract][tokenId];
        
        emit NFTCancelled(nftContract, tokenId, msg.sender);
    }

}   