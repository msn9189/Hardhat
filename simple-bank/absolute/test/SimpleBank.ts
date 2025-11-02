import { expect } from "chai";
import { network } from "hardhat";

const {ethers} = await network.connect();

describe("SimpleBank", function () {

  let bank: any;

  beforeEach(async function () {
    const Bank = await ethers.getContractFactory("SimpleBank");
    bank = await Bank.deploy();
    await bank.waitForDeployment && await bank.waitForDeployment();
  });

  it("Should allow deposits", async function () {
    const [owner, user1] = await ethers.getSigners();
    await bank.connect(user1).deposit({ value: ethers.parseEther("1") });
    const balance = await bank.getBalance();
    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("Should allow user to withdraw deposited value", async function(){
    const [owner, user1] = await ethers.getSigners();
    const depositAmount = ethers.parseEther("2");
    await bank.connect(user1).deposit({value: depositAmount});

    const withdrawAmount = ethers.parseEther("1");
    await bank.connect(user1).withdraw(withdrawAmount);

    const remaining = await bank.connect(user1).getBalance();
    expect(remaining).to.equal(depositAmount-withdrawAmount);
  });

  it("should revert if non-owner tries to get total bank balance", async function () {
    const [owner, user] = await ethers.getSigners();
    await expect(bank.connect(user).getTotalBankBalance()).to.be.revertedWith("Not the owner");
  });
});
