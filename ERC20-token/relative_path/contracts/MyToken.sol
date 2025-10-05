// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken - Simplified ERC20 token for learning
/// @author nazii.eth
/// @notice Includes mint and burn functions
/// @dev Based on Openzeppelin's ERC20 and Ownable contracts

contract MyToken is ERC20, Ownable {
    /// @notice Deploy token with name, symbol and initial supply to the owner
    /// @param name_ The token name (e.g, "MyToken") 
    /// @param symbol_  The token symbol (e.g., "MTK")
    /// @param initialSupply Initial token supply (without decimals)
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
        ) ERC20(name_, symbol_) Ownable(msg.sender){
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Mint new tokens to an address
    /// @dev Only owner can call this function
    /// @param to Recipient address
    /// @param amount Amount of tokens to mint (without decimals)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    /// @notice Burn tokens from an address
    /// @param from A address which tokens will be burned by th Owner
    /// @param amount Amount of tokens to burn (without decimals)
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount * 10 ** decimals());
    }

}