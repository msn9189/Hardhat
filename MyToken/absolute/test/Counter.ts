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

  it("deploys with initial value", async function () {
    const { counter} = await loadFixture(deployCounterFixture);
    expect(await counter.count()).to.equal(5n);
  });

  it("increments and emits event", async function () {
    const { counter, signer } = await loadFixture(deployCounterFixture);
    await expect(counter.Increment()).to.emit(counter, "Incremented").withArgs(signer.address, 6n);
    expect(await counter.count()).to.equal(6n);
  });

  it("decrements and emits event", async function () {
    const {counter, signer} = await loadFixture(deployCounterFixture);
    await expect(counter.Decrement()).to.emit(counter, "Decremented").withArgs(signer.address, 4n);
    expect(await counter.count()).to.equal(4n);
  });

  it("reverts on decrement when the count is zero", async function () {
    const {counter} = await loadFixture(deployZeroCounterFixture);
    await expect(counter.Decrement()).to.be.revertedWith("Underflow");
  });
})
