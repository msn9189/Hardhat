// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract SimpleVault {
  mapping(address => uint256) public balances;

  function deposit(uint256 amount) public {
    balances[msg.sender] += amount;
  }

}
