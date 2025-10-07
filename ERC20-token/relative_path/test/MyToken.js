import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("MyToken", function () {
  async function deployMyTokenFixture() {
    const [owner, alice, bob, carol] = await ethers.getSigners();
    const initialSupply = "1000";

    let token;
    try {
      token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      initialSupply,
    ]);
    await token.waitForDeployment();
  } catch {
    const Factory = await ethers.getContractFactory("MyTokne");
    token = await Factory.deploy("MyToken", "MTK", initialSupply);
    await token.deployed();
  } 
    
    return { MyToken, owner, alice, bob, carol, initialSupply };
  }

  describe("Deployment", function () {
    it("Has correct name, symbol and decimals", async function () {
      const { MyToken } = await loadFixture(deployMyTokenFixture);

      expect(await MyToken.name()).to.equal("MyToken");
      expect(await MyToken.symbol()).to.equal("MTK");
      expect(await MyToken.decimals()).to.equal(18);
    });
  });
});
