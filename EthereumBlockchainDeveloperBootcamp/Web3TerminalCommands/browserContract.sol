pragma solidity ^0.8.1;

contract BrowserContract {

    uint public value = 10;

    function setValue(uint _value) public {
        value = _value;
    }
}