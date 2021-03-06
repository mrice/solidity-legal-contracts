/**
Copyright 2018 Michael Rice <michael@michaelricelaw.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

pragma solidity ^0.4.24;

contract Will {
  address public contractOwner;
  address public testator;
  address public administrator;
  mapping(address => uint) public beneficiaries; //uint = share of 100 (no percentages)

  constructor(address _contractOwner) public {
    contractOwner = _contractOwner;
  }

  function designateTestator(address _testator) public contractOwnerOnly {
    testator = _testator;
  }

  function appointAdministrator(address _administrator) public testatorOnly {
    administrator = _administrator;
  }

  function addBeneficiary(address beneficiary, uint share) public testatorOnly {
    beneficiaries[beneficiary] = share;
  }

  modifier contractOwnerOnly() {
    require(msg.sender == contractOwner, "only contract owner may call this function");
    _;
  }

  modifier testatorOnly() {
    require(testator != address(0), "testator must be defined first");
    require(msg.sender == testator, "only testator may call this function");
    _;
  }

}
