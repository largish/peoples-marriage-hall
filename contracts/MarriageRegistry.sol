// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract MarriageRegistry {
    address[] public registeredMarriages;
    address public newMarriage;
    event ContractCreated(address contractAddress);

    function createMarriage(
        string memory _leftName, 
        string memory _leftVows, 
        string memory _rightName, 
        string memory _rightVows, 
        uint _date
    ) public returns (address) {
        newMarriage = address(new Marriage(msg.sender, _leftName, _leftVows, _rightName, _rightVows, _date));
        emit ContractCreated(newMarriage);
        registeredMarriages.push(newMarriage);

        return newMarriage;
    }

    function getDeployedMarriages() public view returns (address[] memory) {
        return registeredMarriages;
    }
}

/**
 * @title Marriage
 * @dev The Marriage contract provides basic storage for names and vows, and has a simple function
 * that lets people witness their wedding to celebrate
 */
contract Marriage {

    event weddingBells(address witness, uint256 count);

    // Owner address
    address public owner;

    /// Marriage Vows
    string public leftName;
    string public leftVows;
    string public rightName;
    string public rightVows;
    // date public marriageDate;
    uint public marriageDate;
    
    // Bell counter
    uint256 public witnessCounter;

    /**
    * @dev Throws if called by any account other than the owner
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Constructor sets the original `owner` of the contract to the sender account, and
    * commits the marriage details and vows to the blockchain
    */
    constructor(
        address _owner, 
        string memory _leftName, 
        string memory _leftVows, 
        string memory _rightName, 
        string memory _rightVows, 
        uint _date
    ) {
        // TODO: Assert statements for year, month, day
        owner = _owner;
        leftName = _leftName;
        leftVows = _leftVows;
        rightName = _rightName;
        rightVows = _rightVows;
        marriageDate = _date; 
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) private pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }

    /**
    * @dev witness is a payable function that allows people to celebrate the couple's marriage, and
    * also send Ether to the marriage contract
    */
    function witness() public payable {
        witnessCounter = add(1, witnessCounter);
        emit weddingBells(msg.sender, witnessCounter);
    }

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by bell witnesses
    */
    function collect() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by bell witnesses
    */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
    * @dev returns contract metadata in one function call, rather than separate .call()s
    * Not sure if this works yet
    */
    function getMarriageDetails() public view returns (
        address, string memory, string memory, string memory, string memory, uint, uint256) {
        return (
            owner,
            leftName,
            leftVows,
            rightName,
            rightVows,
            marriageDate,
            witnessCounter
        );
    }
}