import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      polkavm: true,
      adapterConfig: {
        adapterBinaryPath:
          "/Users/tiago/Projects/polkadot-sdk/target/release/eth-rpc",
        dev: true,
        buildBlockMode: "Instant",
      },
      nodeConfig: {
        nodeBinaryPath:
          "/Users/tiago/Projects/polkadot-sdk/target/release/substrate-node",
        rpcPort: 8000,
        dev: true,
      },
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
    },
  },
  resolc: {
    version: "1.5.2",
    compilerSource: "npm",
  },
};

export default config;
