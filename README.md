# solidity legal contracts

This project is a playground to explore how to create **legally binding smart contracts** with [Solidity](http://solidity.readthedocs.io) and targeting the Ethereum network.

The first example contract is a bill of sale with additional terms. I hope to add many more in the future.

Please contact me if you have any questions: [michael@michaelricelaw.com](mailto:michael@michaelricelaw.com) or submit issues here on Github.

Would love to hear your feedback or learn from your ideas.

## Take and Use

Once these things are fully baked I hope you'll take them and use them.

**But keep in mind** they're just models and ideas right now. Even though I'm a lawyer I'm not necessarily convinced of their legal effectiveness and certainly can't possibly know if they're the right tools for you.

**No warranties!** This is open source software that has not been tested. Use at your own risk.

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
