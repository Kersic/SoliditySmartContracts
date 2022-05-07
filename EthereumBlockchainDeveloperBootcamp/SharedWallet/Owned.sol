pragma solidity ^0.8.1;

contract Owned {

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}