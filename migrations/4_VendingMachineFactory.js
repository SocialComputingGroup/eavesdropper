const vendingMachineFactory = artifacts.require("./VendingMachineFactory.sol");

module.exports = function(deployer, _, accounts) {
    const account = accounts[0];
    deployer.deploy(vendingMachineFactory, {from : account});
};