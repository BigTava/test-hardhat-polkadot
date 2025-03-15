import { ethers, network } from 'hardhat';
import "@nomicfoundation/hardhat-ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();
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