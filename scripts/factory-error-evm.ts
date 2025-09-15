import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

// npx hardhat run ./scripts/factory-error-evm.ts --network localNode
async function main() {
  let endpoint: any;
  let localEid: number;
  let owner: any;
  let receiver: any;
  let remoteEid: number;

  [owner, receiver] = await ethers.getSigners();
  await ethers.provider.send("hardhat_setBalance", [
    owner.address,
    "0x" + ethers.parseEther("9999999999999").toString(16),
  ]);
  // Set EIDs
  localEid = 1;
  remoteEid = 2;

  // Deploy EndpointV2
  const EndpointV2 = await ethers.getContractFactory(
    "contracts/layer-zero/EndpointV2.sol:EndpointV2"
  );
  const addr = await owner.getAddress();

  endpoint = await EndpointV2.deploy(localEid, addr);
  await endpoint.waitForDeployment();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
