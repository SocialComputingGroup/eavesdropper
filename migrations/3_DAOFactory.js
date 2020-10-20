var DAOFactory = artifacts.require("DAOFactory");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(DAOFactory);
};