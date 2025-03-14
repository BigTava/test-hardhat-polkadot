describe("Lock", function () {
  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;

      const lockedAmount = ONE_GWEI;
      const unlockTime = ONE_YEAR_IN_SECS;

      const accounts = await ethers.getSigners()
      const deployer = accounts[0]
      const Lock = await ethers.getContractFactory("Lock", deployer);
      const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    });
  });
});
