// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleVault {
  mapping(address => uint256) public balances;

  function deposit(uint256 amount) public {
    balances[msg.sender] += amount;
  }

  function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
  }

  function getBalance() public view returns (uint256) {
    return balances[msg.sender];
  }
}
