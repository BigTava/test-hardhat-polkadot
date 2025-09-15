import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

// npx hardhat run ./scripts/top-up-alice.ts --network localNode
async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Topping up account:", await owner.getAddress());

  await ethers.provider.send("hardhat_setBalance", [
    owner.address,
    "0x" + ethers.parseEther("99999999999999999999").toString(16),
  ]);
  console.log(
    "Current balance:",
    ethers.formatEther(await ethers.provider.getBalance(owner.address)),
    "ETH"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
