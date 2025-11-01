// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Counter Contract
 * @author nazii.eth
 * @notice This contract allows users to increment and decrement a simple counter.
 * @dev Demonstrates basic Solidity concepts: state variables, events, and functions.
 */
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

  function decrement() public {
    require(count > 0, "Underflow");
    count -= 1;
    emit Decremented(msg.sender, count);
  }

}
