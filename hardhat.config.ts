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
      // forking: {
      //   url: "https://sepolia.gateway.tenderly.co",
      // },
      // nodeConfig: {
      //   nodeBinaryPath:
      //     "/Users/tiago/Projects/polkadot-sdk/target/debug/revive-dev-node",
      //   rpcPort: 8000,
      //   dev: true,
      // },
      // adapterConfig: {
      //   adapterBinaryPath:
      //     "/Users/tiago/Projects/polkadot-sdk/target/release/eth-rpc",
      //   dev: true,
      // },
      forking: {
        url: "https://testnet-passet-hub.polkadot.io",
      },
      // accounts: [
      //   {
      //     privateKey:
      //       "271ad9a5e1e0178acebdb572f8755aac3463d863ddfc70e32e7d5eb0b334e687",
      //     balance: "10000000000",
      //   },
      // ],
      docker: true,
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
      polkadotUrl: `ws://127.0.0.1:8000`,
    },
    polkadotHubTestnet: {
      polkavm: true,
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [
        "271ad9a5e1e0178acebdb572f8755aac3463d863ddfc70e32e7d5eb0b334e687",
      ],
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
