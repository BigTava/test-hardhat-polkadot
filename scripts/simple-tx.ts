import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import { Wallet } from "ethers";

// npx hardhat run ./scripts/simple-tx.ts --network localNode
async function main() {
  const [signer] = await ethers.getSigners();
  const provider = ethers.provider;
  const privateKey =
    "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";
  const wallet = new Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: signer.address, // self-transfer
    value: ethers.parseEther("0.01"),
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
