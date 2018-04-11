var BillOfSale = artifacts.require("./BillOfSale.sol", 1);

contract('Bill of Sale unit tests', async () => {

  it("deploy and assert to true", async () => {
     let bos = await BillOfSale.deployed();
     assert.isTrue(true);
  });

  it ("contract owner should be set", async () => {
    let bos = await BillOfSale.deployed();
    let contractOwner = await bos.contractOwner();
    assert.isTrue(contractOwner != 0, "contract owner should not be 0x000...");
  });

  it ("seller should be set", async () => {
    let bos = await BillOfSale.deployed();
    let seller = await bos.seller();
    assert.isTrue(seller != 0, "seller should not be 0x000...");
  });

  it ("buyer should be set", async () => {
    let bos = await BillOfSale.deployed();
    let buyer = await bos.buyer();
    assert.isTrue(buyer != 0, "buyer should not be 0x000...");
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
