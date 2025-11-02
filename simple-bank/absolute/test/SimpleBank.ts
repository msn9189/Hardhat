import { expect } from "chai";
import { network } from "hardhat";

const {ethers} = await network.connect();

describe("SimpleBank", function () {
  let bank;
  let owner;

  before(async function () {
    const [deployer] = await ethers.getSigners();
    owner = deployer;
  });

  beforeEach(async function() {
    bank = await ethers.deployContract("SimpleBank");
    await bank.waitForDeployment();
  });

})