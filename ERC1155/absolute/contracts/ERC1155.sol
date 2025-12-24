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

    
}