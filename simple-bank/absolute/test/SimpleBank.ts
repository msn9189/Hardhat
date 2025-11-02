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
)};
