var BillOfSale = artifacts.require("./BillOfSale.sol");

contract('BillOfSale', function(accounts) {
  it("should assert true", function(done) {
    var bill_of_sale_test = BillOfSale.deployed();
    assert.isTrue(true);
    done();
  });
});
