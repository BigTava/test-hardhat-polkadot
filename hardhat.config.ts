import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-resolc";
import "hardhat-revive-node";

import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      polkavm: true,
      adapterConfig: {
        adapterBinaryPath: '/Users/tiago/Projects/polkadot-sdk/target/release/eth-rpc',
        dev: true,
        buildBlockMode: 'Instant',
      },
      nodeConfig: {
        nodeBinaryPath: '/Users/tiago/Projects/polkadot-sdk/target/release/substrate-node',
        rpcPort: 8000,
        dev: true,
      }
    },
  },
  resolc: {
    version: '1.5.2',
    compilerSource: 'remix',
    settings: {
      optimizer: {
        enabled: false,
        runs: 600,
      },
      evmVersion: 'istanbul',
    },
  },
};
  
export default config;
