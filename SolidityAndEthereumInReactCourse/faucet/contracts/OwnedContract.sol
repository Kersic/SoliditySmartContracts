pragma solidity >=0.4.22 <0.9.0;

contract Owned {

    address public owner;

    modifier onlyOwner {
        require(owner == msg.sender, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}