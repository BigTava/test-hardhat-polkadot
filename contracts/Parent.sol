// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "./Child.sol";

contract Parent {
    constructor(){
        // Not works
        Child c = new Child(0);
    }
    function deployChild() external {
        // Works
        Child c = new Child(0);
    }
}
