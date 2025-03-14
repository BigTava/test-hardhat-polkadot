import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers"

import "hardhat-resolc";
import "hardhat-revive-node";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
        chainId: 31337,
    },
    hardhat: {
      polkavm: true,
      forking: {
        url: 'wss://westend-asset-hub-rpc.polkadot.io',
      },
      accounts: [{
        privateKey: '271ad9a5e1e0178acebdb572f8755aac3463d863ddfc70e32e7d5eb0b334e687',
        balance: '10000000000'
      }],
      adapterConfig: {
        adapterBinaryPath: '/Users/tiago/Projects/polkadot-sdk/target/release/eth-rpc',
        dev: true
      }
    },
  },
  resolc: {
      compilerSource: 'remix',
      settings:
      {
        optimizer: {
          enabled: true,
          runs: 400
        },
        evmVersion: "istanbul"
      },
  },
};
  
export default config;
