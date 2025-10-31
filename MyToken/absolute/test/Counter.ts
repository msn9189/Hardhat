import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Counter", function () {
  it("deploys with initial value and increments/decrements with events", async function () {
    const [signer] = await ethers.getSigners();

    const counter = await ethers.deployContract("Counter", [5n]);
    await counter.waitForDeployment();

    expect(await counter.count()).to.equal(5n);

    await expect(counter.increment())
      .to.emit(counter, "Incremented")
      .withArgs(signer.address, 6n);

    expect(await counter.count()).to.equal(6n);

    await expect(counter.decrement())
      .to.emit(counter, "Decremented")
      .withArgs(signer.address, 5n);

    expect(await counter.count()).to.equal(5n);
  });

  it("reverts on decrement when count is zero", async function () {
    const counter = await ethers.deployContract("Counter", [0n]);
    await counter.waitForDeployment();
    await expect(counter.decrement()).to.be.revertedWith("Underflow");
  });
});
