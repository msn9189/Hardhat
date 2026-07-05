// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleVault {
  mapping(address => uint256) public balances;

  function deposit() public payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Transfer failed");
  }

  function getBalance() public view returns (uint256) {
    return balances[msg.sender];
  }
}
