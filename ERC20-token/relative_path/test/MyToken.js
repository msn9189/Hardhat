const { expect } = require("chai");
const { ethers } = require("hardhat");

const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyToken", function () {

  async function deployMyTokenFixture() {
    const MyToken = await ethers.deployContract("MyToken");
    const [owner, alice, bob, carol] = await ethers.getsigners();
    const initialSupply = "1000";
    await MyToken.waitForDeployment("MyToken", "MTK", initialSupply);
    return { MyToken, owner, alice, bob, carol, initialSupply };
  }

  describe("Deployment", function () {
    it("Has correct name, symbol and decimals", async function () {
      const MyToken = await loadFixture(
        deployMyTokenFixture
      );

      expect(await MyToken.name()).to.equal("MyToken");
      expect(await MyToken.symbol()).to.equal("MTK");
      expect(await MyToken.decimals()).to.equal(18);

    })
  })
})