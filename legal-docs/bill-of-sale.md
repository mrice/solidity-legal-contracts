
# Bill of Sale

// STILL **A LOT** TO DO HERE!!!

**NOTICE:** The following instrument is an open source document freely available on the internet.  Important notes and conditions on its use are stored at https://github.com/mrice/solidity-legal-contracts. Any users of this document or the Solidity smart contract code agree to those terms of use.

## 1. Composition

This agreement ("**Agreement**") is comprised in part through this document ("**Document**") and in part through a smart contract ("**Smart Contract**") which will be deployed on the Ethereum network ("**Blockchain**") to an address known to the Agreement's parties.  Both the Document and the Smart Contract are integral to the Agreement.

## 2. Parties

There are two parties ("**Parties**") to this Agreement, a buyer ("**Buyer**") and a seller ("**Seller**").  The Parties will be identified by their respective public addresses on the Ethereum network.  Buyer's address will be stored in the buyer field of the Smart Contract; Seller's will be stored in the seller field.

## 3. Agreement

Seller agrees to sell an item (the "**Item**") to be described in the personalProperty field of the Smart Contract by either Buyer or Seller for sum of Ethereum cryptographic currency to be transmitted by Buyer to the Smart Contract.

The Item will be transferred by a method documented in the Smart Contract in the methodOfDelivery field and title shall pass to Buyer when this Agreement is fully performed.

If Seller delivers the Item and Buyer fails to set the *propertyDelivered* field of the Smart Contract as explained in section 5(7) infra within a reasonable time then the Seller may demand return of the Item.

## 4. No Warranty

BUYER FURTHER AGREES THAT THE ITEM IS SOLD IN AN "AS IS" CONDITION AND THAT SELLER MAKES NO GUARANTEES OR WARRANTIES, EXPRESS OR IMPLIED, FOR THE CONDITION OF THE ITEM OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.

## 5. Performance

The Agreement will be performed when the Item has been transferred and the following functions have been called and/or fields populated by the Parties to the Smart Contract:

1. *seller* field is set;
2. *buyer* field is set;
3. a copy of this Document has been stored on an immutable file system and its location stored in the *additionalTerms* field;
4. *personalProperty* and *deliveryMethod* fields are set;
5. Buyer funds the contract;
6. Seller transfers the Item physically or by other means to Buyer;
7. Buyer confirms delivery of the Item by setting the *propertyDelivered* field to true; and
8. Seller withdraws the funds from the Smart Contract.

To the extent permitted by local law, the sequence of events of the Smart Contract or physical delivery of the Item is not important to the Agreement.

## 6. Additional Terms

A. In the event there is a conflict between this Document and the Smart Contract, the terms of the Smart Contract will control.

B. Each of the Parties is responsible for the his or her own costs (e.g., "gas" on the Ethereum network) for executing transactions against the Smart Contract.

C. This Agreement constitutes the entire agreement between Parties.

D. If any provision of this Agreement is held to be unenforceable, the Parties wish that the remaining provisions of the Agreement continue to be enforced.

E. The terms of this Agreement shall be interpreted by the local laws of the Seller's jurisdiction.  Any disputes shall be resolved in a tribunal local to the Seller.  Venue shall be at a location determined by Seller within the jurisdiction.
