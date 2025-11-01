// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Counter Contract
 * @author nazii.eth
 * @notice This contract allows users to increment and decrement a simple counter.
 * @dev Demonstrates basic Solidity concepts: state variables, events, and functions.
 */
contract Counter {
  /**
   * @notice Store the current count value.
   * @dev This variable is publicly accessible and automatically generates a getter function.
   */
  uint256 public count;

  /**
   * @notice Event emitted when the counter is incremented.
   * @param by The address of the caller who incremented the counter.
   * @param newValue TThe new count value after incrementing.
   */
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
