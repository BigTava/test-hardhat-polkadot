import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

// npx hardhat run ./scripts/deploy-parent.ts --network localNode
async function main() {
  const signer = await ethers.provider.getSigner();
  const Parent = await ethers.getContractFactory("Parent", signer);
  const parent = await Parent.deploy();
  await parent.waitForDeployment();
  const contractAddress = await parent.getAddress();
  console.log(`deployed to ${contractAddress}`);
  await parent.deployChild(1);

  console.log(`deployed child`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
