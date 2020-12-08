pragma solidity ^0.6.12;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

contract PuppyFactory {
    Puppy[] internal allPuppies;
    
    mapping(address => Puppy[]) internal userToPuppy;
    
    function createNewPuppy(string memory name) public {
        Puppy newPuppy = new Puppy(name, msg.sender);
        userToPuppy[msg.sender].push(newPuppy);
        allPuppies.push(newPuppy);
    }
    
    function getAllPuppies() public view returns(Puppy[] memory) {
        return allPuppies;
    }
    
    function getAllMyPuppies() public view returns(Puppy[] memory) {
        return userToPuppy[msg.sender];
    }
    
}

contract Puppy {
    // Make use of SafeMath to do calculation that will not be result in overflow / incorrectness
    using SafeMath for uint;
    
    // Constants
    uint reviveRate = 0.01 ether;
    uint levelUpFee = 0.005 ether;
    
    string public name;
    uint public level;
    // uint public state;
    // uint public puppy_type;
    address public owner;
    
    constructor(string memory _name, address _owner) public {
        // Create Puppy
        name = _name;
        owner = _owner;
        level = 5;
    }
    
    modifier restrictedToOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function levelUp() public payable restrictedToOwner {
        require(msg.value == levelUpFee);
        level++;
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