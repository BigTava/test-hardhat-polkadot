import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

// npx hardhat run ./scripts/deploy-parent.ts --network localNode
async function main() {
  const Parent = await ethers.getContractFactory("Parent");
  const parent = await Parent.deploy(); // error Token(FundsUnavailable)
  await parent.waitForDeployment();

  await parent.deployChild(2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
