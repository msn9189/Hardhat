// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DiaryNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    event DiaryMinted(uint256 indexed tokenId, address indexed recipient, string ipfsHash);

    constructor() ERC721("DiaryNFT", "DIARY"){}

    function mintDiary(address recipient, string memory ipfsHash) public returns (uint256){
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safemint(recipient, newTokenId);
        _tokenURIs[newTokenId] = ipfsHash;
        emit DiaryMinted(newTokenId, recipient, ipfsHash);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}