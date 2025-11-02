import { expect } from "chai";
import { network } from "hardhat";

const {ethers} = await network.connect();

describe("SimpleBank", function () {

  let bank: any;

  beforeEach(async function () {
    const[owner, user] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("SimpleBank");
    bank = await Bank.deploy();
    await bank.waitForDeployment && await bank.waitForDeployment();
    return {owner, user, bank};
  });

  it("Should allow deposits", async function () {
    await bank.deposit({ value: ethers.parseEther("1") });
    const balance = await bank.getBalance();
    expect(balance).to.equal(ethers.parseEther("1"));
  });
