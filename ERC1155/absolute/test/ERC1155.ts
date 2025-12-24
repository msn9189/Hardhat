import { expect } from "chai";
import { Contract } from "ethers/contract";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("ERC1155", function () {
  let ERC1155: any;
  let erc1155: Contract;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addr3: any;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    ERC1155 = await ethers.getContractFactory("ERC1155");
    erc1155 = await ERC1155.deploy("https://token-cdn-domain/{id}.json");
    await erc1155.deployed();
  })
}) 
