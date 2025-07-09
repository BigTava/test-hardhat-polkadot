import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      polkavm: true,
      // nodeConfig: {
      //   nodeBinaryPath:
      //     "/Users/tiago/Projects/polkadot-sdk/target/debug/substrate-node",
      //   rpcPort: 8000,
      //   dev: true,
      // },
      // adapterConfig: {
      //   adapterBinaryPath:
      //     "/Users/tiago/Projects/polkadot-sdk/target/production/eth-rpc",
      //   dev: true,
      // },
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
    },
  },
  // resolc: {
  //   compilerSource: "binary",
  //   settings: {
  //     compilerPath:
  //       "/Users/tiago/Projects/test-hardhat-polkadot/resolc-universal-apple-darwin",
  //   },
  // },
};

export default config;
