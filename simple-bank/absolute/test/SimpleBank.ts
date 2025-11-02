import { expect } from "chai";
import { network } from "hardhat";

/// @notice Establish connection to Hardhat network and get ethers instance
const {ethers} = await network.connect();

/**
  @title Test Suite for SimpleBank Smart Contract
  @notice This test file validates deposit, withdrawal, ownership restrictions, and total balance logic
 */
describe("SimpleBank", function () {
  let bank: any;

  /// @notice Deploys a fresh SimpleBank contract before each test
  beforeEach(async function () {
    const Bank = await ethers.getContractFactory("SimpleBank");
    bank = await Bank.deploy();
    (await bank.waitForDeployment) && (await bank.waitForDeployment());
  });

  /// @notice Test if users can successfully deposit Ether into the bank
  it("Should allow deposits", async function () {
    const [owner, user1] = await ethers.getSigners();
    await bank.connect(user1).deposit({ value: ethers.parseEther("1") });
    const balance = await bank.connect(user1).getBalance();
    expect(balance).to.equal(ethers.parseEther("1"));
  });

  /// @notice Test if users can withdraw a portion of their deposited Ether correctly
  it("Should allow user to withdraw deposited value", async function () {
    const [owner, user1] = await ethers.getSigners();
    const depositAmount = ethers.parseEther("2");
    await bank.connect(user1).deposit({ value: depositAmount });

    const withdrawAmount = ethers.parseEther("1");
    await bank.connect(user1).withdraw(withdrawAmount);

    const remaining = await bank.connect(user1).getBalance();
    expect(remaining).to.equal(depositAmount - withdrawAmount);
  });
  /**
   *  @notice Test that only the owner can access the total bank balance
   *  @dev This test ensures access control is enforced properly
   */
  it("should revert if non-owner tries to get total bank balance", async function () {
    const [owner, user] = await ethers.getSigners();
    await expect(bank.connect(user).getTotalBankBalance()).to.be.revertedWith(
      "Only owner can call this function"
    );
  });

  it("should have correct total balance in contract", async function () {
    const [owner, user1, user2] = await ethers.getSigners();

    await bank.connect(user1).deposit({ value: ethers.parseEther("1") });
    await bank.connect(user2).deposit({ value: ethers.parseEther("3") });

    const total = await bank.connect(owner).getTotalBankBalance();
    expect(total).to.equal(ethers.parseEther("4"));
  });
});
