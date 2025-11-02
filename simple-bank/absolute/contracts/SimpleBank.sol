// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title SimpleBank
 * @author nazii.eth
 * @notice This contract is a simple bank that allows users to deposit and withdraw funds.
 */
contract SimpleBank {
  /**
   * @dev Mapping to store the balances of the users.
   */
  mapping(address => uint) private balances;
  address public owner;

/**
 * @dev Constructor to set the owner of the contract.
 * @notice The owner of the contract is the account that deployed the contract.
 */
  constructor() {
    owner = msg.sender;
  }

  /**
   * @dev Modifier to only allow the owner to call a function.
   */
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  /**
   * @dev Function to deposit funds into the bank.
   * @notice The function allows users to deposit funds into the bank.
   */
  function deposit() external payable {
    require(msg.value > 0, "Amount must be greater than 0");
    balances[msg.sender] += msg.value;
  }

  /**
   * @dev Function to withdraw funds from the bank.
   * @notice The function allows users to withdraw funds from the bank.
   * @param amount The amount of funds to withdraw.
   */
  function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
  }

  /**
   * @dev Function to get the balance of the user.
   * @notice The function allows users to get the balance of their account.
   * @return The balance of the user.
   */
  function getBalance() external view returns (uint) {
    return balances[msg.sender];
  }

  /**
   * @dev Function to get the total balance of the bank.
   * @notice The function allows the owner to get the total balance of the bank.
   * @return The total balance of the bank.
   */
  function getTotalBankBalance() external view onlyOwner returns (uint256) {
    return address(this).balance;
  }
}