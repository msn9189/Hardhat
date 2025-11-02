import { expect } from "chai";
import { network } from "hardhat";

const {ethers} = await network.connect();

describe("SimpleBank", function () {

  it("Should allow deposits", async function () {
    await bank.deposit({value: ethers.parseEther("1")});
    const balance = await bank.getBalance
  });
})
