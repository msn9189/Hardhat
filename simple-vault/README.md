# SimpleVault

A simple Solidity smart contract that keeps record of the balance of each address.
Users can deposit ETH, check their balance, and withdraw a portion or the whole amount of their deposited ETH.

## Setup

Install dependencies:
```bash
npm install
```

Create a hardhat project:
```bash
npx hardhat --init
```

## Usage

Compile the contract:
```bash
npx hardhat build
```

Run tests:
```bash
npx hardhat test
```

Deploy on local network:
```bash
npx hardhat ignition deploy ignition/modules/SimpleVault.ts --network localhost
```

## Contract Functions

- `deposit()` - Deposit ETH into the vault
- `withdraw(uint256 amount)` - Withdraw a specific amount of ETH
- `getBalance()` - View your current balance