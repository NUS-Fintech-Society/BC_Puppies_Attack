var Puppy_Contract = artifacts.require("Puppy_Attack.sol");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    await deployer.deploy(Puppy_Contract);
}