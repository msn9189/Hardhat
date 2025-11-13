import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("NFTMarketplace", function () {
    let seller: any;
    let buyer: any;

    beforeEach(async function () {
        [seller, buyer] = await ethers.getSigners();
    });
})
