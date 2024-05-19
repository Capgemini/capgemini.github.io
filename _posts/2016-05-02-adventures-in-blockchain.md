---
layout: post
title: Adventures in Blockchain
description: Sharing some thoughts, tips and lessons learned building a Blockchain Application
category: Blockchain
tags: [Development, Ethereum, JavaScript, Meteor, React, Blockchain]
author: graham_taylor
comments: true
share: true
published: true
---

I've recently been engaged with the [Capgemini Applied Innovation Exchange](https://www.capgemini.com/applied-innovation-exchange) (AIE) where I've been experimenting and working with emerging technologies in conjunction with our business and our clients.

As part of that we've been looking to leverage blockchain technology for a number of potential use cases. The ideas led on to developing a proof of concept application to explore blockchain around identity management and smart contracts.

If you're thinking about dabbling with blockchain and you are unsure if you actually need the benefits of a distributed ledger or not, chances are you probably don't need it!
I found this as a simple, great starting reference to question the use case:

![do you even need Blockchain?](https://pbs.twimg.com/media/CXJOb_CWsAA5Bvv.png:large)

[Source: [https://twitter.com/FDorleans/status/680692738275282944/photo/1](https://twitter.com/FDorleans/status/680692738275282944/photo/1)]

For our use case we settled on building our application around the open-source [Ethereum blockchain application platform](https://www.ethereum.org/).

Choosing a blockchain platform is no easy task; there are several out there. I won't go into too many details or comparisons (perhaps one for a future blog post) but our main reasons behind choosing Ethereum were:

* It's open source with a strong community behind it
* Good support for Smart Contracts via [Solidity](http://solidity.readthedocs.io/en/latest/) (a programming language for smart contracts)
* The APIs are pretty well documented and there are a range of API [clients in different languages](http://www.ethdocs.org/en/latest/ethereum-clients/)
* There are a bunch of tools, compilers, libraries etc. already out there to help with development

After settling on an underlying blockchain platform, now what? Where do we go from here?

Since it was a proof of concept build of a web application we thought it would make sense to use [Meteor](https://www.meteor.com/) as the main application development framework. This gives us a full-stack JavaScript framework and out of the box support for MongoDB as well as access to a huge number of plugin modules to get going quickly with things like OAuth authentication via [https://atmospherejs.com/](https://atmospherejs.com/).

There are also a couple of Meteor boilerplate examples for Ethereum out there that we could learn from (See [meteor-dapp-boilerplate](https://github.com/SilentCicero/meteor-dapp-boilerplate), [meteor-dapp-wallet](https://github.com/ethereum/meteor-dapp-wallet), and [meteor-boilerplate](https://github.com/Differential/meteor-boilerplate).

I've also been using a lot of [ReactJS](https://facebook.github.io/react/) lately. Not being a huge fan of Meteor's default templating option Blaze, I decided I wanted to use React primarily for the view layer in combination with [Redux](https://github.com/reactjs/redux/).

Again, there's some work in the community that we could borrow for a Meteor + React boilerplate ([meteor-webpack-react](https://github.com/jedwards1211/meteor-webpack-react)). At the time of development React support was in preview for Meteor, since the release of Meteor 1.3 it has been integrated fully, see [https://www.meteor.com/tutorials/react/creating-an-app](https://www.meteor.com/tutorials/react/creating-an-app).

The entire application used the following -

- Ethereum as the underlying Blockchain platform / infrastructure
- Meteor for frontend/backend code as the main development framework
- ReactJS + Redux for the view layer and actions
- [React Bootstrap](https://react-bootstrap.github.io/) for theming
- [Webpack](https://github.com/webpack/webpack) as a build system
- [Karma](https://karma-runner.github.io) + [Mocha](https://mochajs.org/) for testing

In addition I added the following Meteor packages (from atmosphere.js) especially for Ethereum:

- [silentcicero:solc](https://atmospherejs.com/silentcicero/solc) - Contract compilation for Solidity contract files
- [ethereum:web3](https://atmospherejs.com/ethereum/web3) - Exposes the [web3.js](https://github.com/ethereum/web3.js) API to the Meteor app
- [ethereum:accounts](https://atmospherejs.com/ethereum/accounts) - Synchronises the Ethereum accounts with a collection in Meteor, persisted in browser local storage

And for local Solidity contract compilation and testing we used [Truffle](https://github.com/ConsenSys/truffle).

Finally, for development purposes - the application was integrated with [testRPC](https://github.com/ethereumjs/testrpc) to spin up a single Ethereum node (pre-populated with accounts + Ether) on our machine to connect the web application to Ethereum via the [JSON RPC APIs](https://github.com/ethereum/wiki/wiki/JSON-RPC).

As a result we were successfully able to build an Ethereum blockchain application and learn a great deal along the way.

As is often the benefit of hindsight if I were to start another blockchain project today I'd probably approach it slightly differently. Here's a bunch of thoughts, tips and lessons learned which hopefully might help anyone trying to get started:

1. If you embark on a project, start at the smart contract level and map out your domain model, relationships, events and get your smart contract design as good as possible from the start. Make sure the contract maps properly on to the real business problem. If you have to change all your contracts down the line, its possible but you could end up have to re-architect your entire application as a result.

2. Be prepared for some hiccups and allow yourself time to deal with them. If you are using some of the open-source code and libraries, don't expect them all to be bug free. Contribute back to help improve those projects if you can (e.g. Here's a [couple](https://github.com/ConsenSys/hooked-web3-provider/pull/7) of [pull requests](https://github.com/SilentCicero/ethereumjs-accounts/pull/14) I had to open along the way to fix issues I ran into).

3. Be ready to update your dependencies at pace. Related to #2 - A lot of the open-source libraries are moving very fast and new features and fixes are being merged every day. If you're running into issues it's always worth checking if it has been fixed upstream.

4. Do your homework on which blockchain platform you want to use. If you want a public or private blockchain, permissioned or permissionless. Consider using cloud-based solutions if that fits your needs (for example [Azure blockchain as a service](https://azure.microsoft.com/en-gb/blog/ethereum-blockchain-as-a-service-now-on-azure/), or something like [IBM Blockchain](http://www.ibm.com/blockchain/)).

5. You'll need to deal with eventual consistency and distributed systems problems (since transactions are not necessarily mined immediately on the blockchain). This is tricky to deal with in applications. Be prepared to make heavy use of [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) if you are building a JS based application. If you have a chain of transactions that depend on each other things get hard. [ether-pudding](https://github.com/ConsenSys/ether-pudding) looks like a promising solution in this space to simplify things a bit.

6.  Don’t be fooled into thinking that because you are building a blockchain application you won’t need a database. You probably will need a database (we used a hybrid of storing data in the blockchain itself and in MongoDB). 90% of the time you're probably going to need to store stuff off-chain as well.

7.  Related to #6 - Decide exactly what you are going to store on the blockchain (In Ethereum there's no fixed block size limit, but larger payloads require more gas, and there is a [gas limit](http://ethdocs.org/en/latest/contracts-and-transactions/account-types-gas-and-transactions.html)) versus what you are going to store in your database. Map out your data model and flow accordingly.

8.  Storing documents on the blockchain (integrated with technology like [IPFS](https://ipfs.io/) is still incredibly young and not that easy. There are some specific cloud-based solutions out there attempting to solve a similar problem (e.g. [Factom](http://factom.org/) and [Storj](https://storj.io/)) and some promising early work being done with [Swarm](https://github.com/ethereum/go-ethereum/wiki/Swarm---distributed-preimage-archive) in the Ethereum community.

9. Having to deal with the proof-of-work model and gas limits as well as having enough Ether in accounts to send transactions can get painful at times. There's some interesting community work being done to switch from proof-of-work to proof-of-stake ([see here for a comparison of the two](https://www.coinpursuit.com/pages/proof-of-work-proof-of-stake-bitcoin-mining/)) for Ethereum, going by the name [Casper](https://blog.ethereum.org/2015/08/01/introducing-casper-friendly-ghost/).

10. I agree with [@ChrisLundkvist](https://twitter.com/ChrisLundkvist/status/703740976456671232) when he says:

> Making #blockchain usable for normal people is an unsolved UX problem. End-user key management with great UX is biggest challenge in blockchain

Be prepared to deal with some difficult UX/DX around wallets and accounts and the general technology.

If I was to embark on a project like this again, I would probably start out with a framework more closely aligned to smart contract development, like [Truffle](https://github.com/ConsenSys/truffle) and then build out from there. At the time of development Truffle was only at 0.3.0, and was fairly rigid in its approach to a JavaScript build pipeline. It has since hit 1.0.0 and contains [a lot more features](https://github.com/ConsenSys/truffle/releases) and flexibility for integrating different build tools. Truffle also has good integration for [ether-pudding](https://github.com/ConsenSys/ether-pudding). Combining Truffle and ether-pudding would potentially have saved me some pain I encountered trying to integrate different tools from different development houses.

Lastly, I'd just like to emphasise, if you're planning to use distributed ledger technology, make sure you're using it for the right reasons. Make sure the business case is sound and the technology plays to the advantage of the use case you are looking at.

I had fun (and a little pain) along the way but stay tuned for hopefully more posts and adventures in blockchain. It's really interesting to see what the community is going to come up with next in this fast moving space.
