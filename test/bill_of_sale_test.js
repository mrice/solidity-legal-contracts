/**
Copyright 2018 Michael Rice <michael@michaelricelaw.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var BillOfSale = artifacts.require("./BillOfSale.sol", 1);

contract('Bill of Sale...', async (accounts) => {

  var billOfSale;
  var contractOwnerAccount = accounts[0];
  var sellerAccount = accounts[0];
  var buyerAccount = accounts[1];
  var strangerAccount = accounts[2];
  var saleAmount = 5 * 1000000000000000000; //5eth, right?
  var additionalTermsIpfsHash = "QmZfwvbQQJzHScguKPPPNLe2Bff9mnTJAFS7w37CqdqwPN";

  //deploys a new contract on each test to try to keep the tests isolated
  beforeEach('get reference to bill of sale before each test', async() => {
    billOfSale = await BillOfSale.new(contractOwnerAccount, sellerAccount,
      buyerAccount, additionalTermsIpfsHash);
  });

  it("deploys and asserts to true", async () => {
     let bos = await BillOfSale.deployed();
     assert.isTrue(true);
  });

  it ("has a contractOwner set at deployment", async () => {
    let contractOwner = await billOfSale.contractOwner();
    assert.isTrue(contractOwner == sellerAccount, "expected: " + sellerAccount + " got: " + contractOwner);
  });

  it ("has seller set at deployment", async () => {
    let seller = await billOfSale.seller();
    assert.isTrue(seller == sellerAccount, "expected: " + sellerAccount + " got: " + seller);
  });

  it ("has buyer set at deployment", async () => {
    let buyer = await billOfSale.buyer();
    assert.isTrue(buyer == buyerAccount, "expected: " + buyerAccount + " got: " + buyer);
  });

  it ("has additionalTerms set at deployment", async () => {
    let additionalTerms = await billOfSale.additionalTerms.call();
    assert.isOk(additionalTerms, "expected ok; got: " + additionalTerms);
  });

  it ("does not let the someone other than seller define salePrice", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.setSalePrice.call(saleAmount, {from: buyerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows the seller to define the salePrice", async() => {
    await billOfSale.setSalePrice(saleAmount, {from: sellerAccount});
    let assignedSalePrice = await billOfSale.salePrice.call().valueOf();

    assert.isTrue(assignedSalePrice == saleAmount, "sale price should have been set");
  });

  it ("allows the seller to define the chattel", async() => {
    await billOfSale.setPersonalProperty("solidity legal forms", {from: sellerAccount});
    let assignedPersonalProperty = await billOfSale.personalProperty.call().valueOf();

    assert.isTrue(assignedPersonalProperty == "solidity legal forms", "personalProperty not set correctly (got: " + assignedPersonalProperty + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("does not let the buyer define the chattel", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.setPersonalProperty.call("chattel", {from: buyerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows seller to define the delivery method", async() => {
    await billOfSale.setDeliveryMethod("fedex overnight", {from: sellerAccount});
    let assignedDM = await billOfSale.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  it ("allows buyer to define the method of delivery", async() => {
    await billOfSale.setDeliveryMethod("fedex overnight", {from: buyerAccount});
    let assignedDM = await billOfSale.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("fails if a stranger to the contract tries define delivery method", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.setDeliveryMethod.call("fedex", {from: strangerAccount})
    }).then(function (noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows the seller to manifest asset", async() => {
    await billOfSale.recordSellerAssent({from: sellerAccount});
    let sellerAssent = await billOfSale.sellerAssent.call().valueOf();
    assert.isOk(sellerAssent, "seller assent should be recorded");
  });

  it ("throws error if someone other than seller tries to assent for seller", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.recordSellerAssent.call({from: strangerAccount});
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows the buyer to manifest asset", async() => {
    await billOfSale.recordBuyerAssent({from: buyerAccount});
    let buyerAssent = await billOfSale.buyerAssent.call().valueOf();
    assert.isOk(buyerAssent, "buyer assent should be recorded");
  });

  it ("throws error if someone other than buyer tries to assent for buyer", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.recordBuyerAssent.call({from: strangerAccount});
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("fails if someone tries to declare the property was received without full assent", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.confirmPropertyReceived.call({from:buyerAccount});
    }).then(function (noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("throws error if seller tries to withdraw before buyer confirms receipt", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.sellerWithdraw.call({from: sellerAccount})
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows the buyer to declare that the property was received", async() => {
    await billOfSale.setSalePrice(saleAmount, {from: sellerAccount});
    await billOfSale.recordSellerAssent({from: sellerAccount});
    await billOfSale.recordBuyerAssent({from: buyerAccount});
    await billOfSale.confirmPropertyReceived({from: buyerAccount});
    let propertyReceived = await billOfSale.propertyReceived.call().valueOf();

    assert.isTrue(propertyReceived , "the propertyReceived flag was not set even though it should have been")
  });

  it ("fails if anyone other than buyer account tries to set the property received flag", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.confirmPropertyReceived.call({from:strangerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("fails if the wrong amount gets paid to the contract", function() {
    return BillOfSale.deployed().then(function(bos) {
      var wrongAmount = saleAmount + 2; //TODO - someday figure out why adding only one doesn't work. mind blown
      return bos.sendTransaction({from: buyerAccount, value: wrongAmount});
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("allows anyone to fund the contract", async() => {
  await billOfSale.setSalePrice(saleAmount, {from: sellerAccount});
    await billOfSale.recordSellerAssent({from: sellerAccount});
    await billOfSale.recordBuyerAssent({from: buyerAccount});

    //first the contract has to be in a state where the buyer received the property
    await billOfSale.confirmPropertyReceived({from: buyerAccount});

    await billOfSale.sendTransaction({from: buyerAccount, value: saleAmount});
    let bosAddress = await billOfSale.address
    assert.isTrue(web3.eth.getBalance(bosAddress).toNumber() == saleAmount);
  });

  //TODO - research whether test cases always perform in order
  it ("indicates whether the parties performed", async() => {
    await billOfSale.setSalePrice(saleAmount, {from: sellerAccount});
    await billOfSale.recordSellerAssent({from: sellerAccount});
    await billOfSale.recordBuyerAssent({from: buyerAccount});

    // first condition is confirmation of property received
    await billOfSale.confirmPropertyReceived({from: buyerAccount});

    // second is payment of ether
    await billOfSale.sendTransaction({from: buyerAccount, value: saleAmount});

    let fullyPerformed = await billOfSale.fullyPerformed.call();
    assert.isTrue(fullyPerformed, "contract should be fully performed at this point");
  });

  it ("throws an error if someone other than seller tries to withdraw", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.sellerWithdraw.call({from: strangerAccount})
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("lets the seller withdraw the funds if the contract is fully performed", async() => {
    await billOfSale.setSalePrice(saleAmount, {from: sellerAccount});
    await billOfSale.recordSellerAssent({from: sellerAccount});
    await billOfSale.recordBuyerAssent({from: buyerAccount});

    // first condition is confirmation of property received
    await billOfSale.confirmPropertyReceived({from: buyerAccount});

    // second is payment of ether
    await billOfSale.sendTransaction({from: buyerAccount, value: saleAmount});

    let sellerOldAccountBalance = web3.eth.getBalance(sellerAccount).toNumber();

    await billOfSale.sellerWithdraw({from: sellerAccount});
    let sellerNewAccountBalance = web3.eth.getBalance(sellerAccount).toNumber();

    assert.isTrue((sellerNewAccountBalance > sellerOldAccountBalance), "seller's account should increase");
    //TODO - to do this right we'd be accurately predicting and testing the new balance after gas cost

    let bosAddress = await billOfSale.address
    let bosBalance = web3.eth.getBalance(bosAddress).toNumber();
    assert.isTrue(bosBalance == 0, "smart contract balance should be zero");

  });

  //TODO - add the case where someone other than the seller tries to withdraw
  //TODO - add case whether seller tries to withdraw w/o fullyPerformed flag set (higher up)

});

//TODO (backlog) do not let the delivery method change once defined

//TODO - missing a test case where description, price, and delivery method need to be defined before assent!!
