pragma solidity ^0.8.1;

contract Ownable {
    address payable _owner;

    constructor() public {
        _owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "You are not allowed");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }
}