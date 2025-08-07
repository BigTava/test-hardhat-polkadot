import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Lock, Lock__factory } from "../typechain-types";
import { factory } from "typescript";

// npx hardhat test --grep "Parent" --network localNode
describe("Parent", function () {
  describe("Deployment", function () {
    it("Should deploy", async function () {
      const Parent = await ethers.getContractFactory("Parent");
      const parent = await Parent.deploy();
      await expect(parent.deployChild(1)).to.not.be.reverted;
    });
  });
});
