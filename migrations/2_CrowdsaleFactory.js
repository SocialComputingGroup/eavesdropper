var CrowdsaleFactory = artifacts.require("CrowdsaleFactory");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(CrowdsaleFactory);
};