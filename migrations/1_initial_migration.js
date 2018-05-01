/**
Copyright 2018 Michael Rice <michael@michaelricelaw.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Migrations = artifacts.require("./Migrations.sol");
var BillOfSale = artifacts.require("./BillOfSale.sol");

var additionalTermsIpfsHash = "QmZfwvbQQJzHScguKPPPNLe2Bff9mnTJAFS7w37CqdqwPN";
var saleAmount = 10000*10000*10000*10000;

//TODO figure out how to use this to at least deploy to rinkeby

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
  // in this case the seller and contract owner are the same
  //TODO - declare what these are so it's more readable
  deployer.deploy(BillOfSale, accounts[0], accounts[0], accounts[1], saleAmount,
    additionalTermsIpfsHash);
};
