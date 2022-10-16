pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

    address[] public funders;

    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getAllFunders() external view returns (address[] memory) {
        return funders;
    }
}


//const instance = await Faucet.deployed()
// instance.addFunds({value: "2000000000000000000", from: accounts[0]})