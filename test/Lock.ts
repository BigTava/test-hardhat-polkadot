import { expect } from "chai";
import hre from "hardhat";
// time in pallet-revive returns in miliseconds
// time should be some place in the future. 
// change deploy time

describe("Lock", function () {
  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;

      const lockedAmount = ONE_GWEI;
      const unlockTime = ONE_YEAR_IN_SECS;

      const Lock = await hre.ethers.getContractFactory("Lock");
      const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });
  });
});
