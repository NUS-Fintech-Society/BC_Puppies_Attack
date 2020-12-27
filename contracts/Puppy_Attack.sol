pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Puppy_Attack {
    // Make use of SafeMath to do calculation that will not be result in overflow / incorrectness
    using SafeMath for uint256;

    // Constants
    uint256 reviveRate = 0.01 ether;
    uint256 levelUpFee = 0.005 ether;

    struct Puppy {
        uint256 id;
        string name;
        uint256 level;
        address owner;
    }

    mapping(address => uint256[]) public userToPuppy; //mapping (address -> uint[puppyId])

    Puppy[] public allPuppies;

    function getAllPuppiesNumber() public view returns (uint256) {
        return allPuppies.length;
    }

    function getMyPuppiesLevel(uint256 puppyId) public view returns (uint256) {
        return allPuppies[puppyId].level;
    }

    function getMyPuppiesName(uint256 puppyId)
        public
        view
        returns (string memory)
    {
        return allPuppies[puppyId].name;
    }

    modifier restrictedToOwner(uint256 puppyId) {
        require(
            msg.sender == allPuppies[puppyId].owner,
            "Please make sure that you are the owner of the puppy."
        );
        _;
    }

    function _create(string memory puppyName) public {
        Puppy memory newPuppy =
            Puppy(allPuppies.length, puppyName, 5, msg.sender);
        allPuppies.push(newPuppy);
    }

    function _levelUp(uint256 puppyId)
        public
        payable
        restrictedToOwner(puppyId)
    {
        require(
            allPuppies[puppyId].level > 0,
            "Your puppy needs to be revived before you can level it up."
        );
        require(
            msg.value == levelUpFee,
            "Please pay the exact level up fee of 0.005 ether."
        );
        allPuppies[puppyId].level = allPuppies[puppyId].level.add(1);
    }

    function _changeName(uint256 puppyId, string memory newName)
        public
        restrictedToOwner(puppyId)
    {
        Puppy storage toBeChanged = allPuppies[puppyId];
        toBeChanged.name = newName;
    }

    event FailAttack(uint256 _attackingPuppyId, uint256 _targetedPuppyId);
    event SuccessAttack(uint256 _attackingPuppyId, uint256 _targetedPuppyId);
    event PuppyCreated(uint256 _puppyId);

    function _attack(uint256 _attackingPuppyId, uint256 _targetedPuppyId)
        public
        restrictedToOwner(_attackingPuppyId)
    {
        require(allPuppies[_targetedPuppyId].level > 0);
        Puppy storage attackingPuppy = allPuppies[_attackingPuppyId];
        Puppy storage targetedPuppy = allPuppies[_targetedPuppyId];

        uint256 rand = randMod(100);
        if (
            (attackingPuppy.level > targetedPuppy.level && rand > 70) ||
            (attackingPuppy.level == targetedPuppy.level && rand > 50) ||
            (attackingPuppy.level < targetedPuppy.level && rand > 30)
        ) {
            emit FailAttack(_attackingPuppyId, _targetedPuppyId);
        } else {
            attackingPuppy.level = attackingPuppy.level.add(1);
            targetedPuppy.level = targetedPuppy.level.sub(1);
            emit SuccessAttack(_attackingPuppyId, _targetedPuppyId);
        }
    }

    function randMod(uint256 _modulus) internal view returns (uint256) {
        uint256 randNonce = 0;
        randNonce = randNonce.add(1);
        return
            uint256(keccak256(abi.encodePacked(now, msg.sender, randNonce))) %
            _modulus;
    }

    function revive(uint256 puppyId) public payable restrictedToOwner(puppyId) {
        require(
            allPuppies[puppyId].level == 0,
            "Your puppy does not require reviving."
        );
        require(
            msg.value == reviveRate,
            "You will need to pay 0.01 ether to revive your puppy."
        );
        allPuppies[puppyId].level = allPuppies[puppyId].level.add(1);
    }
}
