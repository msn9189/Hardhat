import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("SimpleVault", function () {
  it("Should depostit ETH in contract when calling deposit function", async function () {
    const simpelVault = await ethers.deployContract("SimpleVault");
    const [user1, user2] = await ethers.getSigners();
    await simpelVault.connect(user1).deposit({ value: ethers.parseEther("1")});
    await simpelVault.connect(user2).deposit({ value: ethers.parseEther("2")});

    const balance1 = await simpelVault.connect(user1).getBalance();
    const balance2 = await simpelVault.connect(user2).getBalance();

    expect(balance1).to.equal(ethers.parseEther("1"));
    expect(balance2).to.equal(ethers.parseEther("2"));
  });
  it("Should withdraw ETH from contract when calling withdraw function", async function () {
    const simpleVault = await ethers.deployContract("SimpleVault")
    const [user1] = await ethers.getSigners()
    await simpleVault.connect(user1).deposit({ value: ethers.parseEther("2")});
    await simpleVault.connect(user1).withdraw(ethers.parseEther("1"));
    const balance = await simpleVault.connect(user1).getBalance();
    expect(balance).to.equal(ethers.parseEther("1"))
  });
  it("Should revert when withdrawing more than the balance", async function () {
    const simpleVault = await ethers.deployContract("SimpleVault")
    const [user1] = await ethers.getSigners()
    await simpleVault.connect(user1).deposit({ value: ethers.parseEther("2")});
    await expect(simpleVault.connect(user1).withdraw(ethers.parseEther("3"))).to.be.revertedWith("Insufficient balance");
  })
});
