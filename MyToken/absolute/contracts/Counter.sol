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

  /**
   * @notice Event emitted when the counter is decremented.
   * @param by The address of the caller who decremented the counter.
   * @param newValue The new count value after decrementing.
   */
  event Decremented(address indexed by, uint256 newValue);

  /**
   * @notice Constructor that initializes the counter with a given value.
   * @dev This function is called when the contract is deployed and cannot be called again.
   * @param initial The initial value of the counter.
   */
  constructor(uint256 initial) {
    count = initial;
  }

  /**
   * @notice Increment the counter by 1.
   * @dev This function is public and can be called by any address.Emits an {Incremented} event after the count increases.
   */
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
