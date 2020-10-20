var TokenFactory = artifacts.require("TokenFactory");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TokenFactory);
};
