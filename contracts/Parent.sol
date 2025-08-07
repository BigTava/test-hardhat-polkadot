// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "./Child.sol";

contract Parent {
    function deployChild(uint val) external {
        // Only works if Child is pre-uploaded!
        Child c = new Child(val);
    }
}
