var BillOfSale = artifacts.require("./BillOfSale.sol", 1);

contract('Bill of Sale...', async (accounts) => {

  it("deploy and assert to true", async () => {
     let bos = await BillOfSale.deployed();
     assert.isTrue(true);
  });

  it ("should have a contractOwner set at deployment", async () => {
    let bos = await BillOfSale.deployed();
    let contractOwner = await bos.contractOwner();
    assert.isTrue(contractOwner == accounts[0], "expected: " + accounts[0] + " got: " + contractOwner);
  });

  it ("should have seller set at deployment", async () => {
    let bos = await BillOfSale.deployed();
    let seller = await bos.seller();
    assert.isTrue(seller == accounts[0], "expected: " + accounts[0] + " got: " + seller);
  });

  it ("should have buyer set at deployment", async () => {
    let bos = await BillOfSale.deployed();
    let buyer = await bos.buyer();
    assert.isTrue(buyer == accounts[1], "expected: " + accounts[1] + " got: " + buyer);
  });

  it ("should have additionalTerms set at deployment", async () => {
    let bos = await BillOfSale.deployed();
    let additionalTerms = await bos.additionalTerms.call();
    assert.isOk(additionalTerms, "expected ok; got: " + additionalTerms);
  });

  it ("should have sale price set at deployment", async () => {
    let bos = await BillOfSale.deployed();
    let salePrice = await bos.salePrice.call();
    var expectedPrice = 10;
    assert.isTrue(salePrice == expectedPrice, "expected salePrice to equal 10");
  });

  it ("should allow the seller to define the chattel", async() => {
    let bos = await BillOfSale.deployed();
    let sellerAccount = accounts[0];
    await bos.setPersonalProperty("solidity legal forms", {from: sellerAccount});
    let assignedPersonalProperty = await bos.personalProperty.call().valueOf();

    assert.isTrue(assignedPersonalProperty == "solidity legal forms", "personalProperty not set correctly (got: " + assignedPersonalProperty + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("should not let the buyer define the chattel", function() {
    let buyerAccount = accounts[1];
    return BillOfSale.deployed().then(function(bos) {
        return bos.setPersonalProperty.call("chattel", {from:buyerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should allow seller to define the delivery method", async() => {
    let bos = await BillOfSale.deployed();
    let sellerAccount = accounts[0];
    await bos.setDeliveryMethod("fedex overnight", {from: sellerAccount});
    let assignedDM = await bos.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  it ("should allow buyer to define the method of delivery", async() => {
    let bos = await BillOfSale.deployed();
    let buyerAccount = accounts[1];
    await bos.setDeliveryMethod("fedex overnight", {from: buyerAccount});
    let assignedDM = await bos.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("should fail if a stranger to the contract tries define delivery method", function() {
    let strangerAccount = accounts[2];
    return BillOfSale.deployed().then(function(bos) {
        return bos.setDeliveryMethod.call("fedex", {from:strangerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should allow the buyer to declare that the property was received", async() => {
    let bos = await BillOfSale.deployed();
    let buyerAccount = accounts[1];
    await bos.confirmPropertyReceived({from: buyerAccount});
    let propertyReceived = await bos.propertyReceived.call().valueOf();

    assert.isTrue(propertyReceived , "the propertyReceived flag was not set even though it should have been")
  });

  it ("should fail if a another account tries to set the property received flag", function() {
    let strangerAccount = accounts[2];
    return BillOfSale.deployed().then(function(bos) {
        return bos.confirmPropertyReceived.call({from:strangerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

});

//TODO test for performance by inputting eth
//TODO test for seller performance by setting the propertyDelivered flag

//TODO test for fullPerformanceReadiness

//TODO test for withdrawing eth

//TODO (backlog) do not let the delivery method changed once defined
