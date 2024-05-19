---
layout: post
title: Building private Ethereum networks with Docker Compose
description: How to get up and running with Ethereum development and test networks using Docker
category: Blockchain
tags: [Development, Ethereum, Docker, Blockchain]
author: graham_taylor
comments: true
share: true
published: true
---

In [my previous article about building a blockchain application]({% post_url 2016-05-02-adventures-in-blockchain %}), I shared some of the tools, tips and techniques I used to create an end-to-end blockchain web application.

Let's hone in on a specific part of that and explain in more depth how I built an underlying [Ethereum](https://www.ethereum.org/) private blockchain for testing purposes.

I mentioned that I predominantly used [testrpc](https://github.com/ethereumjs/testrpc) to stand up a simple, single-node Ethereum instance which had the APIs exposed and some accounts pre-filled with Ether for testing.

Testrpc is a great tool, super simple and fast to get started, which makes it ideal for development and if you are new to the tech. However there are some situations where you might want some extra flexibility or you need to test different scenarios where you require a more "production like" setup. These include -

* Testing the effects of a network of nodes (e.g. a multi-node Ethereum cluster with each node in sync with other nodes via the P2P protocol)
* Access to other Ethereum APIs, for example the [management API](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)
* Access to the [Ethereum JavaScript Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console)
* The confidence of developing against a full [Geth node](https://github.com/ethereum/go-ethereum/wiki/Geth)
* Easier integration with or ability to test alongside other tools or technology such as [IPFS](https://ipfs.io/)

If you find yourself having to set up a private Ethereum cluster (as I did) you'll find that it's not actually a straightforward process.

While there are [one](https://github.com/ethereum/go-ethereum/wiki/Setting-up-private-network-or-local-cluster) or [two](https://souptacular.gitbooks.io/ethereum-tutorials-and-tips-by-hudson/content/private-chain.html) pretty clear tutorials out there as well as [some scripts](https://github.com/ethersphere/eth-utils) both for me had some problems. The scripts prefer that you are running Ubuntu, the preferred/recommended platform for Ethereum and the tutorials contain anywhere between 5-20 steps.

I wanted a simple, repeatable and cross platform way to bring up and tear down my clusters. Enter [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

Today I'm announcing our open-sourced [ethereum-docker](https://github.com/Capgemini-AIE/ethereum-docker) which contains a bunch of Dockerfiles and Docker Compose scripts for bringing up standalone full Geth Ethereum nodes or multi-node clusters along with the very nice [eth-netstats](https://github.com/cubedro/eth-netstats) web dashboard for viewing the status of your cluster.

Let's take it for a spin.

## Starting up a single Ethereum node

Grab the repo -

```
git clone https://github.com/Capgemini-AIE/ethereum-docker.git
cd ethereum-docker
```

To run a single node do:

```
docker-compose -f docker-compose-standalone.yml up -d
```

If you are using Docker-machine with the "default" box you can do:

```
open http://$(docker-machine ip default):8545
```

Otherwise on Docker for Mac you can just ```open http://localhost:8545``` this will give you a connection to the JSON RPC API.

To get attached to the geth JavaScript console on the node you can run the following -

```
docker exec -it bootstrap geth --datadir=~/.ethereum/devchain attach
```

From there you should have access to the full [JavaScript runtime environment](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) where you can execute commands against the node.

To perform tasks like starting and stopping mining you can run:

```
docker exec -it bootstrap geth --datadir=~/.ethereum/devchain --exec 'miner.stop()' attach
```

## Starting up an Ethereum cluster

To bootstrap the cluster run:

```
docker-compose up -d
```

This will create 3 nodes: 2 Ethereum nodes + 1 netstats node. To access netstats UI you can do:

```
open http://$(docker-machine ip default):3000
```

Or on Docker for Mac:

```
open http://localhost:3000
```

And you should see something that looks like:
![netstats ui](/images/2016-05-16-ethereum-docker-compose/netstats.png)

You can scale the number of Ethereum nodes by doing:

```
docker-compose scale eth=3
```

There you go, you have a private Ethereum cluster you can scale up, down and test your applications with.

This provides basic support at the moment for Docker and Docker compose, as always there are [a bunch of open tickets](https://github.com/Capgemini-AIE/ethereum-docker/issues) on GitHub for improvements. We would like to add things like support for deploying on top of [Kubernetes](https://kubernetes.io) and [Marathon](https://mesosphere.github.io/marathon), support for deploying a cluster with IPFS enabled and ability to interact with the cluster nodes and APIs in an easier way.

If you want to give it a try or help out [head on over to the GitHub repository](https://github.com/Capgemini-AIE/ethereum-docker).
