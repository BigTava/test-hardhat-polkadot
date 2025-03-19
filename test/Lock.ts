import "@nomicfoundation/hardhat-ethers";
import { ethers } from 'hardhat';
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Lock, Lock__factory } from "../typechain-types";

describe("Lock", function () {
  let lockFactory: Lock__factory;
  let lock: Lock;
  let accounts: HardhatEthersSigner[];
  let deployer: HardhatEthersSigner;
  const unlockTime = 365 * 24 * 60 * 60 + Math.floor(Date.now() / 1000);
  const ONE_GWEI = 1_000_000_000;

  describe("Deployment", function () {
    
    before(async () => {
      accounts = await ethers.getSigners()
      deployer = accounts[0]
      lockFactory = await ethers.getContractFactory("Lock", deployer);
      lock = await lockFactory.deploy(unlockTime, { value: ONE_GWEI });

    });

    it("Test chai matchers", async function () {
      // to.equal
      expect(await lock.unlockTime()).to.equal(unlockTime);
      expect(await lock.owner()).to.equal(deployer.address);
      expect(await ethers.provider.getBalance(lock.getAddress())).to.equal(ONE_GWEI);

      // to.be.revertedWith
      const other_address = accounts[1]
      await expect(lock.connect(other_address).withdraw()).to.be.revertedWith("You aren't the owner");

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
        .withArgs(ONE_GWEI, blockTimestamp + 6);

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
