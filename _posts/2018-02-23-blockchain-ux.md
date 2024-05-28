---
layout: post
title: "Non functional requirements and Blockchain"
description: "What considerations are needed to put a Blockchain application into production?"
category: Blockchain 
author: phil_hardwick
tags: [Blockchain, UX, Non Functional Requirements, NFR]
comments: true
share: true
---

Here in the [Applied Innovation Exchange](https://appliedinnovationexchange.com/) we get to be part of some pretty excellent events. One notable example is ["Capgemini Week of Innovation Networks"](https://medium.com/applied-innovation-exchange/capgeminis-week-of-innovation-networks-cwin-kick-off-at-the-aie-ase-london-dda138951833), which happened in November 2017 on the 8th floor of our Holborn office. As part of this 5 start-ups were invited to pitch their businesses to the attendees, set up stands, demo their application or work and be involved with a round table/panel question time.

I loved hearing about the innovations and the way they were using technology to solve old problems such as payroll, inaccessible banks for the developing work and privacy in big data. I had a great conversation with one start-up about the challenges of rolling out a [Blockchain](https://en.wikipedia.org/wiki/Blockchain) platform, which got me thinking: what's the most difficult thing about putting some Blockchain in production?

## Blockchain is not that hard to implement
[A quick example](https://github.com/lhartikk/naivechain/blob/master/main.js) shows that a Blockchain implementation is possible in one page of javascript. Indeed theres an [explosion of different Blockchains](https://blog.acolyer.org/2018/02/13/sok-research-perspective-and-challenges-for-bitcoin-and-cryptocurrency-part-i/) using a variety of different consensus algorithms, with varying levels of [byzantine fault tolerance](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) and throughput. [Hyperledger](https://www.hyperledger.org/) and other well supported open source projects are getting better and better developer tools to improve the developer experience and to make it quicker to implement new features. So developing Blockchain applications is not in itself difficult.

I've found that through using [Hyperledger Composer](https://www.hyperledger.org/projects/composer) in my final year project at university that modelling the business domain, creating smart contracts and generally developing new features is actually very easy. I'm sure others using [Truffle Framework](http://truffleframework.com/) for [Ethereum](https://www.ethereum.org/) would agree, the developer experience is getting better and better.

The difficult stuff is everything around that. Non-functional requirements.

## UX
One particular barrier to Blockchain development is designing the user experience. The question is, how much of Blockchain, as the underlying technology, should you reveal to your users?

Should people know their actions on the app are interacting with a Blockchain somewhere? Should they know about public and private keys? What if people don't realise their private keys should be kept private? Should they know about tokens and that they need them to be able to interact with the application (write something to the Blockchain)?

These questions are important because people may be trusting your Blockchain application with their money. The value of assets on the Blockchain are usually backed by the value of a cryptocurrency coin, given value by an [initial coin offering](https://en.wikipedia.org/wiki/Initial_coin_offering) (ICO). If user's assets are linked to the value of that coin then how do you inform them that their net worth is increasing and decreasing as the cryptocurrency value increases and decreases? If they use your platform are they now cryptocurrency investors?

It's also important from a user experience perspective. Applications should be easy to use. That first impression is very important for a new user. Launching a platform and cluttering it with Blockchain related jargon is sure to put off the majority of users. But dumbing it down may reduce the "cool" factor or the visibility of the key benefits of Blockchain which differentiate your application from the non-Blockchain competition.

## Scalability
If your platform is tied to a Blockchain implementation such as Ethereum then it is also tied to the scalability of that underlying platform. Ethereum currently runs at [4 transactions a second](https://blog.acolyer.org/2018/02/08/chainspace-a-sharded-smart-contracts-platform/), up to a theoretical maximum of 25 (based on proof of work). If the next Ethereum game took off, generating a lot of transactions like [crypto kitties did](http://www.bbc.co.uk/news/technology-42237162), would this affect your users? Would they be able to get their assets out immediately if they needed them? Users will want to know they're not being tied down to anything and they can return to the non-digital world at a point of their choosing. Choosing the right underlying platform (or choosing to roll your own) is essential for this.

## Development Operations
Projects like [Hyperledger Cello](https://www.hyperledger.org/projects/cello) are aiming to make Blockchain network administration easier. However, I found it was still difficult to set up a "production" [Hyperledger Fabric](https://www.hyperledger.org/projects/fabric) cluster and there's a lot of manual steps to get Hyperledger Composer running on it. It takes time to integrate these things and improve the DevOps experience, so until then, allocate a good amount of time to provisioning and automating cluster deployment.

## Managing Stakeholders
There's a tendency when selling the advantages of a Blockchain application to oversell the benefits to governance. Arguably the governance stakeholders (e.g. police, government, auditors) receive the most benefits from being able to track what everyone is doing and use it to regulate or check compliance. This is important but other stakeholders need incentive to join in with the network otherwise there will be no users and no transactions to regulate or check.

Then there's the problem of persuading all the stakeholders to get involved so you can do business analysis and requirements gathering. The modelling and smart contract definitions require understanding of the business domains of all the different types of stakeholders. Answering the question of what should be stored in the Blockchain requires the views of a variety of stakeholders.

Lastly, who begins the Blockchain platform initiative and pays for the development of it? A key advantage of Blockchain is that it can enable business and collaboration between organisations which have never met. This will attract a lot of organisations during the lifetime of the platform but one organisation needs to take the initial step, see the value and build the platform for everyone else to use. 

## Take away
Blockchain is still finding its feet in being implemented in consumer facing applications. As application developers we need to design, as part of the customer experience, hiding the complexities of the implementation from people without putting them at risk. There should be a journey into learning Blockchain little by little, when the consumer wants to, in order to make sure they don't wander blindly into a cryptocurrency faux pas.
