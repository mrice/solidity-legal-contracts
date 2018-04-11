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

  function BillOfSale(address _contractOwner, address _seller, address _buyer) public {
    contractOwner = _contractOwner;
    seller = _seller;
    buyer = _buyer;
  }

  function kill() public {
    if (msg.sender == contractOwner) {
      selfdestruct(contractOwner);
    }
  }

}
