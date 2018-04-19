var Migrations = artifacts.require("./Migrations.sol");
var BillOfSale = artifacts.require("./BillOfSale.sol");

var additionalTermsIpfsLoc = "QmTmP9ey8FuEtMrmqneCijLCjWV3riZdsRbcc3eRyAtE62";

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
  // in this case the seller and contract owner are the same
  deployer.deploy(BillOfSale, accounts[0], accounts[0], accounts[1], additionalTermsIpfsLoc);
};
