const { buildModule } = require("@nomicfoundation/hardhat-ignition");

module.exports = buildModule("DiaryNFTModule", (m) => {
    const diaryNFT = m.contract("DiaryNFT");

    return { diaryNFT };
});