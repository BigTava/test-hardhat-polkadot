import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Lock, Lock__factory } from "../typechain-types";

describe("Lock", function () {
  let lockFactory: Lock__factory;
  let lock: Lock;
  let accounts: HardhatEthersSigner[];
  let deployer: HardhatEthersSigner;
  const unlockTime = 365 * 24 * 60 * 60 + Math.floor(Date.now() / 1000);
  const ONE_GWEI = ethers.parseUnits("1", "gwei");

  describe("Deployment", function () {
    before(async () => {
      accounts = await ethers.getSigners();
      deployer = accounts[0];
      const block = await ethers.provider.getBlock("latest");
      const unlockTime = block!.timestamp + 365 * 24 * 60 * 60;

      lockFactory = (await ethers.getContractFactory(
        "Lock",
        deployer
      )) as Lock__factory;

      const lockUnsigned = await lockFactory.getDeployTransaction(unlockTime, {
        value: ONE_GWEI,
      });

      // TODO: throws errord
      // const estimatedGas = await ethers.provider.estimateGas({
      //   from: deployer.address,
      //   data: lockUnsigned.data!,
      // });

      lock = await lockFactory.deploy(unlockTime, {
        value: ONE_GWEI,
      });
    });

    it("Test chai matchers", async function () {
      // to.equal
      // expect(await lock.unlockTime()).to.equal(unlockTime);
      expect(await lock.owner()).to.equal(deployer.address);
      expect(await ethers.provider.getBalance(lock.getAddress())).to.equal(
        ONE_GWEI
      );

      // to.be.revertedWith
      const other_address = accounts[1];
      await expect(lock.connect(other_address).withdraw()).to.be.revertedWith(
        "You aren't the owner"
      );

      // to.be.a.properAddress
      expect(await lock.owner()).to.be.a.properAddress;

      // to.changeEtherBalances
      // await expect(() => lock.withdraw()).to.changeEtherBalances(
      //   [lock, deployer],
      //   [-ONE_GWEI, ONE_GWEI]
      // );

      // to.emit
      const latestBlock = await ethers.provider.getBlock("latest");
      const blockTimestamp = latestBlock!.timestamp;
      const tx = await lock.withdraw();
      await expect(tx)
        .to.emit(lock, "Withdrawal")
        .withArgs(ONE_GWEI, blockTimestamp + 3);

      // to.be.a.properPrivateKey
      const testPrivateKey =
        "0x7d577b1408e8d19a24ba3f0a0a79aa5b9f2858e8d63f5e3b8c9a1b9f07e407e5";
      expect(testPrivateKey).to.be.a.properPrivateKey;

      // to.be.a.properHexString
      expect("0x1234").to.be.properHex(4);

      // to.hexEqual
      expect("0x00012AB").to.hexEqual("0x12ab");
    });
  });
});

describe("Deployment", function () {
  // it("Should set the right unlockTime", async function () {
  //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
  //   expect(await lock.unlockTime()).to.equal(unlockTime);
  // });
  // it("Should set the right owner", async function () {
  //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);
  //   expect(await lock.owner()).to.equal(owner.address);
  // });
  // it("Should receive and store the funds to lock", async function () {
  //   const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);
  //   expect(await ethers.provider.getBalance(lock.target)).to.equal(
  //     lockedAmount
  //   );
  // });
  // it("Should fail if the unlockTime is not in the future", async function () {
  //   // We don't use the fixture here because we want a different deployment
  //   const latestTime = await time.latest();
  //   const Lock = await ethers.getContractFactory("Lock");
  //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //     "Unlock time should be in the future"
  //   );
  // });
});

describe("Withdrawals", function () {
  describe("Validations", function () {
    // it("Should revert with the right error if called too soon", async function () {
    //   const { lock } = await loadFixture(deployOneYearLockFixture);
    //   await expect(lock.withdraw()).to.be.revertedWith(
    //     "You can't withdraw yet"
    //   );
    // });
    // it("Should revert with the right error if called from another account", async function () {
    //   const { lock, unlockTime, otherAccount } = await loadFixture(
    //     deployOneYearLockFixture
    //   );
    //   // We can increase the time in Hardhat Network
    //   await time.increaseTo(unlockTime);
    //   // We use lock.connect() to send a transaction from another account
    //   await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
    //     "You aren't the owner"
    //   );
    // });
    // it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    //   // Transactions are sent using the first signer by default
    //   await time.increaseTo(unlockTime);
    //   await expect(lock.withdraw()).not.to.be.reverted;
    // });
  });

  describe("Events", function () {
    // it("Should emit an event on withdrawals", async function () {
    //   const { lock, unlockTime, lockedAmount } = await loadFixture(
    //     deployOneYearLockFixture
    //   );
    //   await time.increaseTo(unlockTime);
    //   await expect(lock.withdraw())
    //     .to.emit(lock, "Withdrawal")
    //     .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    // });
  });

  describe("Transfers", function () {
    // it("Should transfer the funds to the owner", async function () {
    //   const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //     deployOneYearLockFixture
    //   );
    //   await time.increaseTo(unlockTime);
    //   await expect(lock.withdraw()).to.changeEtherBalances(
    //     [owner, lock],
    //     [lockedAmount, -lockedAmount]
    //   );
    // });
  });
});
