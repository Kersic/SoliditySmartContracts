pragma solidity ^0.8.1;

import "./Allowance.sol";

contract SharedWallet is Allowance {

    event MoneyReceived(address indexed _from, uint _amount);
    event MoneyWithdrawn(address indexed _from, uint _amount);
    
    uint balance;

    fallback() external payable {
        emit MoneyReceived(msg.sender, msg.value);
        balance += msg.value;
    }

    function receiveMoney() public payable {
        emit MoneyReceived(msg.sender, msg.value);
        balance += msg.value;
    }

    function getBalance() public view returns(uint) {
        return balance;
    }

    function withdrawMoney(uint _amount) public ownerOrAllowed(_amount) {
        require(balance >= _amount, "Not enough funds");
        address payable _address = payable(msg.sender);

        if (!isOwner()) {
            reduceAllowance(_address, _amount);
        }
        balance -= _amount;
        _address.transfer(_amount);
        emit MoneyWithdrawn(msg.sender, _amount);
    }
}