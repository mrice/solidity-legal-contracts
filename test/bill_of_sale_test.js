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
  var saleAmount = 10000*10000*10000*10000; //TODO - works, but I cleary don't understand the scale of the values

  //TODO - this doesn't quite seem right to me. seems like we should be starting fresh with each test
  beforeEach('get reference to bill of sale before each test', async() => {
    billOfSale = await BillOfSale.deployed();
  });

  it("deploy and assert to true", async () => {
     let bos = await BillOfSale.deployed();
     assert.isTrue(true);
  });

  it ("should have a contractOwner set at deployment", async () => {
    let contractOwner = await billOfSale.contractOwner();
    assert.isTrue(contractOwner == sellerAccount, "expected: " + sellerAccount + " got: " + contractOwner);
  });

  it ("should have seller set at deployment", async () => {
    let seller = await billOfSale.seller();
    assert.isTrue(seller == sellerAccount, "expected: " + sellerAccount + " got: " + seller);
  });

  it ("should have buyer set at deployment", async () => {
    let buyer = await billOfSale.buyer();
    assert.isTrue(buyer == buyerAccount, "expected: " + buyerAccount + " got: " + buyer);
  });

  it ("should have additionalTerms set at deployment", async () => {
    let additionalTerms = await billOfSale.additionalTerms.call();
    assert.isOk(additionalTerms, "expected ok; got: " + additionalTerms);
  });

  it ("should have sale price set at deployment", async () => {
    let salePriceState = await billOfSale.salePrice.call();
    assert.isTrue(salePriceState == saleAmount, "expected salePrice to equal " + saleAmount);
  });

  it ("should allow the seller to define the chattel", async() => {
    await billOfSale.setPersonalProperty("solidity legal forms", {from: sellerAccount});
    let assignedPersonalProperty = await billOfSale.personalProperty.call().valueOf();

    assert.isTrue(assignedPersonalProperty == "solidity legal forms", "personalProperty not set correctly (got: " + assignedPersonalProperty + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("should not let the buyer define the chattel", function() {
    return BillOfSale.deployed().then(function(bos) {
        return bos.setPersonalProperty.call("chattel", {from:buyerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should allow seller to define the delivery method", async() => {
    await billOfSale.setDeliveryMethod("fedex overnight", {from: sellerAccount});
    let assignedDM = await billOfSale.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  it ("should allow buyer to define the method of delivery", async() => {
    await billOfSale.setDeliveryMethod("fedex overnight", {from: buyerAccount});
    let assignedDM = await billOfSale.deliveryMethod.call().valueOf();

    assert.isTrue(assignedDM == "fedex overnight", "deliveryMethod not set correctly (got: " + assignedDM + ")")
  });

  //TODO - couldn't figure out how to make assert.throws() work here; went with this
  it ("should fail if a stranger to the contract tries define delivery method", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.setDeliveryMethod.call("fedex", {from: strangerAccount})
    }).then(function (noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should throw error if seller tries to withdraw before buyer confirms receipt", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.sellerWithdraw.call({from: sellerAccount})
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should allow the buyer to declare that the property was received", async() => {
    await billOfSale.confirmPropertyReceived({from: buyerAccount});
    let propertyReceived = await billOfSale.propertyReceived.call().valueOf();

    assert.isTrue(propertyReceived , "the propertyReceived flag was not set even though it should have been")
  });

  it ("should fail if anyone other than buyer account tries to set the property received flag", function() {
    return BillOfSale.deployed().then(function(bos) {
        return bos.confirmPropertyReceived.call({from:strangerAccount})
    }).then(function (noErrorThrown) {
      assert.isTrue(false, "should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should fail if the wrong amount gets paid to the contract", function() {
    return BillOfSale.deployed().then(function(bos) {
      var wrongAmount = saleAmount + 2; //TODO - someday figure out why adding only one doesn't work. mind blown
      return bos.sendTransaction({from: sellerAccount, value: wrongAmount});
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should allow anyone to fund the contract", async() => {
    await billOfSale.sendTransaction({from: sellerAccount, value: saleAmount});
    let bosAddress = await billOfSale.address
    assert.isTrue(web3.eth.getBalance(bosAddress).toNumber() == saleAmount);
  });

  //TODO - research whether test cases always perform in order
  it ("should indicate whether the parties performed", async() => {
    let fullyPerformed = await billOfSale.fullyPerformed.call();
    assert.isTrue(fullyPerformed, "contract should be fully performed at this point");
  });

  it ("should throw error if someone other than seller tries to withdraw", function() {
    return BillOfSale.deployed().then(function(bos) {
      return bos.sellerWithdraw.call({from: strangerAccount})
    }).then(function(noErrorThrown) {
      assert.fail("should have failed");
    }, function (errorThrown) {
      assert.isTrue(true, "failure caught");
    });
  });

  it ("should let the seller withdraw the funds if the contract is fully performed", async() => {

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
