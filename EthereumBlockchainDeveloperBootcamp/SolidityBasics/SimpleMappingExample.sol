pragma solidity ^0.8.1;

contract SimpleMappingExample {
    mapping(uint => bool) public myIntMapping;
    mapping(address => bool) public myAddressMapping;

    function setValue(uint _index) public {
        myIntMapping[_index] = true;
    }

    function setMyAddressToTrue() public {
        myAddressMapping[msg.sender] = true;
    }
}