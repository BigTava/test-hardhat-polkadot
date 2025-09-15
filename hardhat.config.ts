import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@parity/hardhat-polkadot";

import "./tasks";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      polkadot: false,
      nodeConfig: {
        nodeBinaryPath: "/Users/tiago/Projects/scc-testing/bin/revive-dev-node",
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath: "/Users/tiago/Projects/scc-testing/bin/eth-rpc",
        dev: true,
      },
    },
    localNode: {
      polkadot: { target: "evm" },
      url: `http://127.0.0.1:8545`,
      polkadotUrl: `ws://127.0.0.1:8000`,
      accounts: [
        "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133",
        "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5b0000a702133",
        "0x5fb92c48bebcd6e98884f76de468fa3f6278f880713595d45af5b0000a702133",
        "0x5fb92d6de468fa3f6278f8807c48bebc13595d45af5b000e98884f760a702133",
        "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc130a702133595d45af5b000",
        "0x5fb92d6e98884f76de468fa3f6275af5b0000a7021bc338f8807c48be13595d4",
        "0x521338f8807c48befb92d6e98884f76de468fa3f6275af5b0000a70bc13595d4",
        "0x5fb92d6e9884f768de468fa3f6275af5b0000a7021338f8807c48bebc13595d4",
        "0x5fb92d6de468fa3f6275af5b0000a7021338f8807c48bebc13595d46e98884f7",
        "0x5fb92d6e98884f76de468fa3f6275af5b0000a7021338f8807c48be3595d4bc1",
      ],
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
};

export default config;
