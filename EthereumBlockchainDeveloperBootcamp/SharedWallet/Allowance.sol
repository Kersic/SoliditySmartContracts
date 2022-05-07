pragma solidity ^0.8.1;

import "./Owned.sol";

contract Allowance is Owned {

    event AllowanceChanged(address indexed _forWho, address indexed _fromWho, uint _oldAmount, uint _newAmout);

    mapping(address => uint) public withdrawAllowance;

    modifier ownerOrAllowed(uint _amount) {
        require(isOwner() || withdrawAllowance[msg.sender] >= _amount, "Not allowed");
        _;
    }

    function setAllowance(address _address, uint _amount) public onlyOwner{
        emit AllowanceChanged(_address, msg.sender, withdrawAllowance[_address], _amount);
        withdrawAllowance[_address] = _amount;
    }

    function reduceAllowance(address _address, uint _amount) public {
        emit AllowanceChanged(_address, msg.sender, withdrawAllowance[_address], withdrawAllowance[_address] - _amount);
        withdrawAllowance[_address] -= _amount;
    }
}
