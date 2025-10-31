const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Counter", function () {
  async function deployCounterFixture() {
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();
    return { counter, signer };
  }

  async function deployZeroCounterFixture() {
    const counter = await ethers.deployContract("Counter", [0n]);
    await counter.waitForDeployment();
    return { counter };
  }
})
