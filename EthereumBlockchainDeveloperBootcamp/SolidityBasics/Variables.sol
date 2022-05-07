pragma solidity ^0.8.1;

contract WorkingWithVariables {
    uint256 public myUnit;
    bool public myBool;
    uint8 public myUint8;
    address public myAddress;
    string public myString;

    function setMyUint(uint _myUint) public {
        myUnit = _myUint;
    }

    function setMyBool(bool _myBool) public {
        myBool = _myBool;
    }

    function incrementUint() public {
        myUint8++;
    }

    function decrementUint() public {
        myUint8--;
    }

    function setAddress(address _myAddress) public {
        myAddress = _myAddress;
    }

    function getBalanceOfAddress() public view returns(uint) {
        return myAddress.balance;
    }

    function setMyString(string memory _myString) public {
        myString = _myString;
    }
}