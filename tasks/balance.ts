import "@nomicfoundation/hardhat-ethers";
import { task, scope } from "hardhat/config";

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const balance = await provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
  });

const myScope = scope("my-scope", "Scope description");
myScope.task("my-task", "Do something")
  .setAction(async () => { console.log("Doing Something") });