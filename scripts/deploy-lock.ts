import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

// npx hardhat run ./scripts/deploy-lock.ts --network localNode
async function main() {
  // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await ethers.provider.getSigner();
  const balance = await ethers.provider.getBalance(await signer.getAddress());
  console.log(`Signer balance: ${ethers.formatEther(balance)} ETH`);
  const Lock = await ethers.getContractFactory("Lock", signer);
  const lock = await Lock.deploy(365 * 24 * 60 * 60 * 1000);
  await lock.waitForDeployment();
  const contractAddress = await lock.getAddress();

  console.log(`deployed to ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
