import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

/**
 * @title Counter Test
 * @author nazii.eth
 * @notice This test suite verifies the functionality of the Counter contract.
 * @dev Tests the deployment, increment, decrement, and error handling of the counter.
 */
describe("Counter", function () {
  /**
   * @notice Tests the deployment of the counter contract with an initial value.
   * @dev Deploys the counter contract with an initial value of 5 and checks if the count is set correctly.
   */
  it("deploys with initial value", async function () {
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();
    expect(await counter.count()).to.equal(5n);
  });

  /**
   * @notice Tests the increment function of the counter contract.
   * @dev Increments the counter and checks if the count is set correctly.
   * @test Starts at count = 5, increments to 6, verifies emitted event data and new count.
   */
  it("increments and emits event", async function () {
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();

    await expect(counter.increment())
      .to.emit(counter, "Incremented")
      .withArgs(signer.address, 6n);

    expect(await counter.count()).to.equal(6n);
  });

  /**
   * @notice Tests the decrement function of the counter contract.
   * @dev Decrements the counter and checks if the count is set correctly.
   * @test Starts at count = 6, decrements to 5, verifies emitted event data and new count.
   */
  it("decrements and emits event", async function () {
    const [signer] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter", [6n]); // start at 6 to check 5
    await counter.waitForDeployment();

    await expect(counter.decrement())
      .to.emit(counter, "Decremented")
      .withArgs(signer.address, 5n);

    expect(await counter.count()).to.equal(5n);
  });

  /**
   * @notice Tests the decrement function of the counter contract when the count is zero.
   * @dev Decrements the counter and checks if the count is set correctly.
   * @test Throws an error if the counter is already at 0.
   */
  it("reverts on decrement when count is zero", async function () {
    const counter = await ethers.deployContract("Counter", [0n]);
    await counter.waitForDeployment();
    await expect(counter.decrement()).to.be.revertedWith("Underflow");
  });
});
