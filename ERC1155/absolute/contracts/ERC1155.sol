// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IERC1155 {
  function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external;

  function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external;

  function balanceOf(address owner, uint256 id)
        external
        view
        returns (uint256);

  function balanceOfBatch(address[] calldata owners, uint256[] calldata ids)
        external
        view
        returns (uint256[] memory);

  function setApprovalForAll(address operator, bool approved) external;

  function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
  
}

interface IERC1155TokenReceiver {
    
}