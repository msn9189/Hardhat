import { expect } from "chai";
import ethers from "hardhat";
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Counter", function () {
  async function deployCounterFixture() {
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();
    return { counter, signer };
  }
})