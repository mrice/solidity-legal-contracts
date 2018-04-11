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
