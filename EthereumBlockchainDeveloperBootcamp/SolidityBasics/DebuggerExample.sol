pragma solidity ^0.8.1;

contract DebuggerExample {
    uint public myUint;

    function setMyUint(uint _myuint) public {
        myUint = _myuint;
    }
}
// debug button in cosole after interacting with contract
// input example after calling the function
// 0xe492fd840000000000000000000000000000000000000000000000000000000000000005
// frist is function signature, last is the number we have send in the function 
// se function hashes under Solidity compiler -> Compilation Details -> FUNCTIONHASHES