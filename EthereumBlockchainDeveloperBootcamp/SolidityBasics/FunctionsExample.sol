pragma solidity ^0.8.1;

contract FunctionExample {

    address payable owner;

    constructor () public {
        owner = payable(msg.sender);
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function destroySmartContract() public {
        require(owner == msg.sender, "You are not the owner");
        selfdestruct(owner);
    }

    function convertWeiToEther(uint _amountInWei) public pure returns(uint) {
        return _amountInWei / 1 ether;
    }

    mapping(address => uint64) public balanceReceived;

    function receiveMoney() public payable {
        assert(balanceReceived[msg.sender] + uint64(msg.value) >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += uint64(msg.value);
    }

    function withdrawMoney(address payable _to, uint64 _amount) public {
        require(balanceReceived[msg.sender] >= _amount, "Not enough funds");
        assert(balanceReceived[msg.sender] - _amount <= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    //fallback function
    fallback () external payable {
        receiveMoney();
    }
}