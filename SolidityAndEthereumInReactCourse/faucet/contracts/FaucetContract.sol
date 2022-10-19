pragma solidity >=0.4.22 <0.9.0;

import "./OwnedContract.sol";
import "./LoggerContract.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {

    uint public numOfFunders;
    mapping(address => bool) public funders;
    mapping(uint => address) public lutFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(withdrawAmount <= 100000000000000000, "Can not withdraw more than 0.1 ether");
        _;
    }

    receive() external payable {}

    function emitLog() public override pure returns(bytes32) {
        return "Hello World";
    }

    function addFunds() override external payable {
        address funder = msg.sender;
        if(!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function withdraw(uint withdrawAmount) override external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function manage1() external onlyOwner {
        //some managing stuff that only adim shoud have access to
    }

    function manage2() external onlyOwner {
        //some managing stuff that only adim shoud have access to
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);
        for(uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }
}


// const instance = await Faucet.deployed();

// instance.addFunds({from: accounts[0], value: "2000000000000000000"})
// instance.addFunds({from: accounts[1], value: "2000000000000000000"})

// instance.withdraw("500000000000000000", {from: accounts[1]})

// instance.getFunderAtIndex(0)
// instance.getAllFunders()
// instance.manage1({from: accounts[0]})