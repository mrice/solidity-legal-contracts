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
  bool public propertyReceived;

  constructor(address _contractOwner, address _seller, address _buyer,
              uint _salePrice, string _additionalTerms) public {
    contractOwner = _contractOwner;
    seller = _seller;
    buyer = _buyer;
    salePrice = _salePrice;
    additionalTerms = _additionalTerms;
  }

  function setPersonalProperty(string _personalProperty) public sellerOnly {
    personalProperty = _personalProperty;
  }

  function setDeliveryMethod(string _deliveryMethod) public buyerOrSellerOnly {
    deliveryMethod = _deliveryMethod;
  }

  function confirmPropertyReceived() public buyerOnly {
    propertyReceived = true;
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

}
