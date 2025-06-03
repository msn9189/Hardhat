const { expect } = require("chai");

const { 
    loadFixture,
} =  require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Token contract', function () {

    async function deployTokenFixture() {

        const [owner, addr1, addr2] = await.ethers.getSigners();
    
        const hardhatToken = await ethers.deployContract("Token");
        await hardhatToken.waitForDeployment();

        return { hardhatToken, owner, addr1, addr2 };
    }
    

});
