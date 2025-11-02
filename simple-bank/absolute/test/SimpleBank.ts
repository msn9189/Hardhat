import { expect } from "chai";
import hre from "hardhat";

describe("SimpleBank", function () {
  let bank;
  let owner;

  before(async function () {
    const [deployer] = await hre.ethers.getSigners();
    owner = deployer;
  });

})