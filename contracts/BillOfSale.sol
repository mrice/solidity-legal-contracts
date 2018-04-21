/**
USAGE NOTES: this is not intended to be a stand alone contract. There are additional
terms intended to be stored in an immutable form on IPFS but available for download
here:
https://github.com/mrice/solidity-legal-contracts/blob/master/legal-docs/bill-of-sale.md
**/

pragma solidity ^0.4.19;

contract BillOfSale {
  address public contractOwner;
  address public seller;
  address public buyer;
  string public additionalTerms;
  string public personalProperty;
  string public deliveryMethod;
  bool public propertyReceived;

  function BillOfSale(address _contractOwner, address _seller, address _buyer,
                      string _additionalTerms) public {
    contractOwner = _contractOwner;
    seller = _seller;
    buyer = _buyer;
    additionalTerms = _additionalTerms;
  }

  function setPersonalProperty(string _personalProperty) public {
    require(msg.sender == seller);
    personalProperty = _personalProperty;
  }

  function setDeliveryMethod(string _deliveryMethod) public {
    require(msg.sender == buyer || msg.sender == seller);
    deliveryMethod = _deliveryMethod;
  }

  function confirmPropertyReceived() public {
    require(msg.sender == buyer);
    propertyReceived = true;
  }

  function kill() public {
    if (msg.sender == contractOwner) {
      selfdestruct(contractOwner);
    }
  }

}
