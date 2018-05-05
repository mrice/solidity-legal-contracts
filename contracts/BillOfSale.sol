/**
Copyright 2018 Michael Rice <michael@michaelricelaw.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
USAGE NOTES: this is not intended to be a stand alone contract. There are additional
terms intended to be stored in an immutable form on IPFS but available for download
here:
https://github.com/mrice/solidity-legal-contracts/blob/master/legal-docs/bill-of-sale.md
**/

pragma solidity ^0.4.21;

contract BillOfSale {
  address public contractOwner;
  address public seller;
  address public buyer;
  uint public salePrice;
  string public additionalTerms;
  string public personalProperty;
  string public deliveryMethod;
  bool public sellerAssent = false;
  bool public buyerAssent = false;
  bool public propertyReceived = false;
  bool public fullyPerformed = false;

  constructor(address _contractOwner, address _seller, address _buyer,
              string _additionalTerms) public {
    contractOwner = _contractOwner;
    seller = _seller;
    buyer = _buyer;
    additionalTerms = _additionalTerms;
  }

  event TransactionPerformed();

  function setSalePrice(uint _salePrice) public sellerOnly {
    salePrice = _salePrice;
  }

  function setPersonalProperty(string _personalProperty) public sellerOnly {
    personalProperty = _personalProperty;
  }

  function setDeliveryMethod(string _deliveryMethod) public buyerOrSellerOnly {
    deliveryMethod = _deliveryMethod;
  }

  function recordSellerAssent() public sellerOnly {
    sellerAssent = true;
  }

  function recordBuyerAssent() public buyerOnly {
    buyerAssent = true;
  }

  function confirmPropertyReceived() public buyerOnly performanceReviewed preventIncompleteAssent {
    propertyReceived = true;
  }

  function () public payable performanceReviewed preventIncompleteAssent {
    require(msg.value == salePrice);
  }

  function sellerWithdraw() public sellerOnly preventIncompleteAssent {
    require(fullyPerformed, "contract must be fully performed before seller withdrawal");
    seller.transfer(address(this).balance);
  }

  function kill() public {
    if (msg.sender == contractOwner) {
      selfdestruct(contractOwner);
    }
  }

  /**
  m o d i f i e r s - cross cutting concerns for the bill of sale contract
  */

  modifier sellerOnly() {
    require(msg.sender == seller, "only seller can send this message");
    _;
  }

  modifier buyerOrSellerOnly() {
    require(msg.sender == buyer || msg.sender == seller, "only buyer or seller can send this message");
    _;
  }

  modifier buyerOnly() {
    require(msg.sender == buyer, "only buyer can send this message");
    _;
  }

  modifier preventIncompleteAssent() {
    require(sellerAssent == true && buyerAssent == true);
    _;
  }

  /**
  functions with this modifier could change contract state to fully performed
  */
  modifier performanceReviewed() {
    _;
    if (propertyReceived && address(this).balance == salePrice) {
      fullyPerformed = true;
      emit TransactionPerformed();
    }
  }

}
