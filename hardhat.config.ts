import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // resolc: {
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //       parameters: "3",
  //     },
  //   },
  // },
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
      forking: {
        url: "https://testnet-passet-hub.polkadot.io",
      },
      docker: true,
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
      chainId: 420420422,
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

// Before
// nodeCommandArgs: [
//   '@acala-network/chopsticks@latest',
//   '--endpoint=https://testnet-passet-hub.polkadot.io',
//   '--build-block-mode=Instant'
// ]
// adapterArgs: [ '--node-rpc-url=ws://localhost:8006', '--rpc-port=8545', '--dev' ]

// After
// Command Args: [
//   'npx',
//   '@acala-network/chopsticks@latest',
//   '--endpoint=https://testnet-passet-hub.polkadot.io',
//   '--build-block-mode=Instant'
// ]

export default config;
