var BillOfSale = artifacts.require("./BillOfSale.sol", 1);

//TODO - convert this to aync/await pattern

contract('BillOfSale', function() {
  it("deploy and assert to true", function() {
    var bos = BillOfSale.deployed();
    assert.isTrue(true);
  });

  it("contract owner should be set (technical)", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.contractOwner.call();
    }).then(function(contractOwner) {
      assert.isNotTrue(contractOwner==0, "contract owner should not be 0x000...");
    });
  });

  it("seller should be set (technical)", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.seller.call();
    }).then(function(seller) {
      assert.isNotTrue(seller==0, "seller should not be 0x000...");
    });
  });

  it("buyer should be set (technical)", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.buyer.call();
    }).then(function(buyer) {
      assert.isNotTrue(buyer==0, "buyer should not be 0x000...");
    });
  });

});

//TODO add the description of the personalProperty (chattel) (short string)
//TODO add the method of delivery (short string)

//TODO add test for setting the ifps contract (additionalTerms field) 

//TODO test for getting the status and list of seller terms
//TODO test for getting the status and list of buyer terms

//TODO test for seller performance

//TODO test for performance by inputting eth
//TODO test for seller performance by setting the propertyDelivered flag

//TODO test for fullPerformanceReadiness

//TODO test for withdrawing eth
