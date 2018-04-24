var Migrations = artifacts.require("./Migrations.sol");
var BillOfSale = artifacts.require("./BillOfSale.sol");

var additionalTermsIpfsLoc = "QmZfwvbQQJzHScguKPPPNLe2Bff9mnTJAFS7w37CqdqwPN";

//TODO figure out how to use this to at least deploy to rinkeby

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
  // in this case the seller and contract owner are the same
  deployer.deploy(BillOfSale, accounts[0], accounts[0], accounts[1], 10,
    additionalTermsIpfsLoc);
};
