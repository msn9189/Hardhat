const { expect } = require("chai");
const { ethers } = require("hardhat");

const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyToken", function () {

  async function deployMyTokenFixture() {
    const [owner, alice, bob, carol] = await ethers.getSigners();
    const initialSupply = "1000";
    const MyToken = await ethers.deployContract("MyToken",["MyToken", "MTK", initialSupply]);
    await MyToken.waitForDeployment();
    return { MyToken, owner, alice, bob, carol, initialSupply };
  }

  describe("Deployment", function () {
    it("Has correct name, symbol and decimals", async function () {
      const { MyToken } = await loadFixture(
        deployMyTokenFixture
      );

      expect(await MyToken.name()).to.equal("MyToken");
      expect(await MyToken.symbol()).to.equal("MTK");
      expect(await MyToken.decimals()).to.equal(18);

    });
  });
});