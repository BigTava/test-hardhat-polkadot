import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { keccak256 } from "ethers";
import fs from "fs";

// npx hardhat run ./scripts/hash-factory-dependencies.ts --network localNode
async function main() {
  const childArtifact = JSON.parse(
    fs.readFileSync("artifacts-pvm/contracts/Factory.sol/Child.json", "utf8")
  );
  const bytecode = childArtifact.bytecode.object || childArtifact.bytecode;
  const hash = keccak256(`${bytecode}`);
  console.log(hash); // → put this as the key
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
