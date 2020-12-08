pragma solidity ^0.6.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

contract User {
    // Make use of SafeMath to do calculation that will not be result in overflow / incorrectness
    using SafeMath for uint;
    
    // Constants
    uint reviveRate = 0.01 ether;
    uint levelUpFee = 0.005 ether;
    
    struct Puppy {
        string name;
        uint dna;
        uint level;
        uint state;
        uint puppy_type;
    }
    
    address public owner;
    
    Puppy[] public puppies;
    
    constructor() public {
        // Create User
        owner = msg.sender;
    }
    
    modifier restrictedToOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function createPuppy() public restrictedToOwner {
        
    }
    
    function levelUp(uint puppyId) public payable restrictedToOwner {
        require(msg.value == levelUpFee);
        puppies[puppyId].level = puppies[puppyId].level.add(1); 
    }
    
    function revive() public restrictedToOwner {
        
    }
    
    function changeName() public restrictedToOwner {
        
    }
    
    // Function to call to attack the user
    function attackUser() public restrictedToOwner {
        
    }
    
    // Function to call when the user has been attacked
    function userAttacked() public {
        
    }
    
    
}