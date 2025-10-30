// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
  uint256 public count;

  event Incremented(address indexed by, uint256 newValue);
  event Decremented(address indexed by, uint256 newValue);

  constructor(uint256 initial) {
    count = initial;
  }

  function increment() public {
    count += 1;
    emit Incremented(msg.sender, count);
  }

}
