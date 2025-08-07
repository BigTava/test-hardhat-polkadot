import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import { keccak256, parseUnits, Wallet } from "ethers";
import fs from "fs";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";

// npx hardhat run ./scripts/simple-tx.ts --network localNode
async function main() {
  const [signer] = await ethers.getSigners();
  const provider = ethers.provider;
  const privateKey =
    "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";
  const wallet = new Wallet(privateKey, provider);
  const artifact = JSON.parse(
    fs.readFileSync(
      "/Users/tiago/Projects/test-hardhat-polkadot/artifacts-pvm/contracts/Child.sol/Child.json",
      "utf8"
    )
  );

  const bytecode = artifact.bytecode;
  const bytecodeBuf = Buffer.from(bytecode.replace(/^0x/, ""), "hex");
  // const prefix = Buffer.from("3c04", "hex");
  const encodedBytecode = scaleEncodeBytes(bytecodeBuf);
  //   const storageLimit = compactU128(10_000_000_000n);
  //   let payload = Buffer.concat([prefix, encodedBytecode, storageLimit]);

  const ws = new WsProvider("ws://localhost:8000");
  const api = await ApiPromise.create({ provider: ws });
  await api.isReady;
  const storageLimit = api.createType("Compact<u128>", 0);
  const call = api.tx.revive.uploadCode(bytecode, storageLimit);
  const payload = call.method.toU8a();

  const tx = await wallet.sendTransaction({
    to: "0x6d6f646c70792f70616464720000000000000000",
    data: u8aToHex(payload),
  });

  console.log("tx:", tx);
  console.log("✅ Tx sent:", tx.hash);
  await tx.wait();
  console.log("⛏️  Mined");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function scaleEncodeBytes(buf: Buffer): Buffer {
  const len = compactU128(BigInt(buf.length));
  return Buffer.concat([len, buf]);
}

/**
 * SCALE Compact<u128> encoding (up to 2^536)
 */
function compactU128(value: bigint): Buffer {
  if (value < 1n << 6n) {
    return Buffer.from([Number(value << 2n)]);
  } else if (value < 1n << 14n) {
    const shifted = Number(value << 2n) | 0x01;
    return Buffer.from([shifted & 0xff, (shifted >> 8) & 0xff]);
  } else if (value < 1n << 30n) {
    const shifted = Number(value << 2n) | 0x02;
    return Buffer.from([
      shifted & 0xff,
      (shifted >> 8) & 0xff,
      (shifted >> 16) & 0xff,
      (shifted >> 24) & 0xff,
    ]);
  } else {
    const buf = Buffer.alloc(9);
    buf[0] = 0x03;
    Buffer.from(value.toString(16).padStart(32, "0"), "hex").copy(buf, 1);
    return buf;
  }
}
