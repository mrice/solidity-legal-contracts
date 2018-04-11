var Migrations = artifacts.require("./Migrations.sol");
var BillOfSale = artifacts.require("./BillOfSale.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(BillOfSale, 1, 2, 3);
};
