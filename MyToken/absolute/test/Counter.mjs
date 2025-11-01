import { expect } from "chai";
import { network } from "hardhat";

/**
 * @title Counter Test
 * @author nazii.eth
 * @notice This test suite verifies the functionality of the Counter contract.
 * @dev Tests the deployment, increment, decrement, and error handling of the counter.
 */
describe("Counter", function () {
  it("deploys with initial value", async function () {
    const { ethers } = await network.connect();
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();
    expect(await counter.count()).to.equal(5n);
  });

  it("increments and emits event", async function () {
    const { ethers } = await network.connect();
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();

    await expect(counter.increment())
      .to.emit(counter, "Incremented")
      .withArgs(signer.address, 6n);

    expect(await counter.count()).to.equal(6n);
  });

  it("decrements and emits event", async function () {
    const { ethers } = await network.connect();
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [6n]); // start at 6 to check 5
    await counter.waitForDeployment();

    await expect(counter.decrement())
      .to.emit(counter, "Decremented")
      .withArgs(signer.address, 5n);

    expect(await counter.count()).to.equal(5n);
  });

  it("reverts on decrement when count is zero", async function () {
    const { ethers } = await network.connect();
    const counter = await ethers.deployContract("Counter", [0n]);
    await counter.waitForDeployment();
    await expect(counter.decrement()).to.be.revertedWith("Underflow");
  });
});
