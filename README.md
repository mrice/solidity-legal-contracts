# solidity legal contracts

## Open source smart contracts with legal terms that you can take and use

This project's goal is to make a collection of open source Ethereum-based smart contracts combined with traditional, court-tested terms to fill in the legal gaps left behind by the [Solidity](http://solidity.readthedocs.io) code. Put differently, goal is to create fully **legally binding smart contracts**.

The first example contract is a bill of sale with additional terms. I hope to add many more in the future.

## EXPERIMENTAL

**Keep in mind** they're just models and ideas right now. Even though I'm a lawyer and I think I'm on the right track, I'm not necessarily convinced of their legal effectiveness and certainly can't possibly know if they're the right tools for you.

**No warranties!** This is open source software that has not been tested. Use at your own risk.

## Contact me with ideas

Please contact me if you have any questions: [michael@michaelricelaw.com](mailto:michael@michaelricelaw.com) or submit issues here on Github.

Would love to hear your feedback or learn from your ideas.

## Requirements

The project was set up using the [Truffle Framework](http://truffleframework.com). Make sure you have it installed locally (also, it requires Node). You'll like it. Truffle is good.

Also, the test suite uses the newer async/await features of node so you'll need version 9x installed. Check your version first:

```
node --version
```

## Running Locally

If you want to play around with the contracts, make sure you run the tests.

First start up the local test network

```
ganache-cli
```

Then run the tests:

```
truffle test
```

## Notes

### Regarding the property received flag:

One of the features of the contract as written is that the buyer has to declare when he or she received the property. I think it's necessary to prevent the funds from being withdrawn without the buyer confirming receipt, yet it could create a situation where the buyer never sets the flag and the seller is never able to receive his or her funds. Seems to me this could be solved with an oracle service to, say, a check a shipment confirmation from UPS or Fedex (or whatever our locality uses) or some kind of smart property IoT connection.

For now, instead of doing all that, I tried to solve it with by adding additional legal terms in the [bill_of_sale.md](../blob/master/legal-docs/bill-of-sale.md) to declare that title did not formally pass until property is received and the the contract could be "unwound" if the buyer doesn't perform by setting the field within a reasonable period of time. As I write this, I'm not sure it's actually legally effective but I think it's the right direction.

The technical problem I have, as I write this, is that I'm not yet sure how to safely return the funds to the buyer in that instance from the smart contract. Added GitHub issue [no. 3](https://github.com/mrice/solidity-legal-contracts/issues/3) if you wnt to help out!!
