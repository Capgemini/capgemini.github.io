---
layout: post
title: "How Apollo uses Weave and Weave Scope"
description: "An in-depth look at how we use Weave and Weave Scope for Docker networking"
category: "DevOps"
author: graham_taylor
date: 2015-06-30
tags: [Development, DevOps, Microservices, Networking]
comments: true
share: true
---

In my previous post we [launched an Apollo cluster on AWS in under 5 minutes](https://capgemini.github.io/devops/apollo-launch-aws/).

Some of the magic around how we enable an easier developer experience around deploying and managing the communication between Docker containers is hidden in the provisioning of the cluster, so let's take a deeper look at how that works.

To enable networking for Docker containers we use [Weave](https://weave.works). The Weave guys
have built a fantastic product that allows developers to hook into it with ease and simplicity.
This really is the killer feature for me, it is just so easy to get up and running with Weave.

## The Docker problem - Cross-host networking

#### The default Docker way

By default, Docker uses host-private networking. It creates a virtual bridge, called docker0 by default, and allocates a subnet from one of the private address blocks defined in RFC1918 for that bridge. For each container that Docker creates, it allocates a virtual ethernet device (called veth) which is attached to the bridge. The veth is mapped to appear as eth0 in the container, using Linux namespaces. The in-container eth0 interface is given an IP address from the bridge's address range.

The result is that Docker containers can talk to other containers only if they are on the same machine (and thus the same virtual bridge). Containers on different machines can not reach each other - in fact they may end up with the exact same network ranges and IP addresses.

In order for Docker containers to communicate across nodes, they must be allocated ports on the machine's own IP address, which are then forwarded or proxied to the containers. This obviously means that containers must either coordinate which ports they use very carefully or else be allocated ports dynamically.

We use Weave to get around these problems. This means -

- All containers can communicate with other containers via the container IP address and
port inside the Weave network
- All nodes can communicate with containers via the container IP address and
port inside the Weave network
- Containers do not have to be statically linked to each other to be able to communicate
- Forwarding / co-ordinating ports from the host machine is not required

## How we provision Weave

We use [Ansible](https://www.ansible.com) to provision the configuration on to the [Apollo](https://github.com/Capgemini/Apollo) cluster for Weave.
Our [Ansible role for Weave is here](https://github.com/Capgemini/Apollo/tree/master/roles/weave).

### Step 1 - configure the Weave interface

We configure ```/etc/network/interfaces.d/weave.cfg``` with the following -

```bash 
auto weave
iface weave inet manual
  pre-up /usr/local/bin/weave create-bridge
  post-up ip addr add dev weave WEAVE_BRIDGE
  pre-down ifconfig weave down
  post-down brctl delbr weave
```

```WEAVE_BRIDGE``` is a dynamic Ansible variable that changes for each host in the Weave network. For example on HOST1 the WEAVE_BRIDGE would be ```10.2.0.1/16``` but on HOST2 it would be
```10.2.0.2/16.```, and so on.

### Step 2 - bring up the Weave interface

Next, we bring up the Weave network by executing

```bash 
ifup weave
```

This gives us a network bridge on the host for the Weave network.

### Step 3 - Upload the Weave service template

The next step is to upload an upstart service file to ```/etc/init/weave.conf```.
This allows us to enable Weave as a service.

Inside that file we have -

```bash 
start on started docker
stop on stopping docker
```

This ensures that when the Docker service is started, Weave is also started, and similar behaviour occurs on stop.

When the Weave service starts it will launch Weave with the following command -

```bash 
${WEAVE} launch ${PEERS}
```

Where ```${WEAVE}``` is the path to the Weave binary and ```${PEERS}``` are the other peer nodes in the cluster to join on launch.

``${PEERS}``` is a dynamic variable in Ansible which changes based
on the size of the cluster. This is to accommodate potential differing sizes of clusters (e.g. if you spin up a cluster with 10 slaves instead of 1).

### Step 4 - Configure Docker to use the Weave bridge

Finally we set the ```DOCKER_OPTS``` in ```/etc/default/docker``` to run with  ```--bridge=weave --fixed-cidr=weave_docker_subnet```

This means that any containers being started up via Docker will be started on the Weave bridge. This enables Docker to allocate an IP address for that container inside the Weave network.

```weave_docker_subnet``` will be different for each host in the Weave network. For example
on HOST1 the weave docker subnet would be ```10.2.1.0/24``` but on HOST2 it would be
```10.2.2.0/24```, and so on. This ensures that containers started on HOST1 do not clash IP
addresses with containers started on HOST2. This gives the ability for up to 256 containers per host.

As an example, if a container was started on HOST1 its IP address might be 10.2.1.1.
If a container was started on HOST2 its IP address might be 10.2.2.1.

Both containers would be able to have services running on the same port (e.g. 80) without any IP address/port clashes because they are using a different network subnet.

The only thing left to do is to start up the Docker service on the host (which will in turn start the Weave service, bringing up the Weave containers).

## Additional goodies - Weave Scope

As part of [Apollo](https://github.com/Capgemini/Apollo), we've also bundled in [Weave Scope](https://weave.works/scope). This provides a nice visual interface showing the current hosts, containers and applications in the cluster. We think it could provide a useful tool for developers trying to debug issues with containers in the cluster, as well as providing a helpful bridge between Operations and Engineering teams.

![Weave Scope]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/weave-scope.png){: .small-8 .small-centered .columns}


## Let's take a look at it all in action

Let's launch a simple Docker container with a NodeJS REST API. You can fire up this example yourself
if you want - its in our repository [https://github.com/Capgemini/Apollo/tree/master/examples/nodejs-rest-api](https://github.com/Capgemini/Apollo/tree/master/examples/nodejs-rest-api).

To launch it we are going to use [marathonctl](https://github.com/shoenig/marathonctl) a CLI for Marathon.

We do that by executing -

```bash 
marathonctl -h=MARATHON_IP:MARATHON_PORT app create nodejs-rest-api-v1.json
```

This calls the Marathon REST API to initiate the deployment. When its up you should see something like this in the Marathon web interface, showing that we have 2 instances of our service container running -

![NodeJS service running]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/marathon-nodejs-running.png){: .small-8 .small-centered .columns}

If we look in the Consul web interface, we can see that we have 2 service containers registered in Consul, and that Mesos has distributed the containers across 2 nodes.

![Consul NodeJS services]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/consul-nodejs.png){: .small-8 .small-centered .columns}

If we drill into the node view of Consul, we can see that one of the service containers has been given an IP address of ```10.2.5.2:8080```. This is inside the Weave network.

![Consul Node view]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/consul-node.png){: .small-8 .small-centered .columns}

Let's go back to Marathon and scale the number of instances to 4 -

![Marathon scale]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/marathon-scale.png){: .small-8 .small-centered .columns}

In Consul we can now see that we have 4 services, with 2 each across 2 nodes -

![Nodejs 4 instances]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/nodejs-4-services.png){: .small-8 .small-centered .columns}

If we drill into one of the nodes here we see the magic of [Weave](https://weave.works) -

![Nodejs weave]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/nodejs-weave.png){: .small-8 .small-centered .columns}

We now have 2 nodejs-rest-api service containers both running on the node ```54.171.137.140``` both exposed on port 8080 with different IP addresses.

If we jump on to that machine, we can see that we are able to resolve the address of the containers via [Consul DNS](https://www.consul.io/docs/agent/dns.html)

![Consul DNS]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/consul-dns.png){: .small-8 .small-centered .columns}

This is pretty neat as it means we can just use DNS to resolve the address of the containers internally, so we don't need any IP addresses. So if we called ```nodejs-rest-api.service.consul:8080``` We would get a response.
By default this would Round-Robin DNS between the actual containers. This is pretty handy if you're doing service discovery, because it means you can rely on SERVICE_NAME.service.consul being available to you (if you want to do inter-container communication).

Finally if we look at Weave Scope we can see that the container has appeared and you can inspect it through the web interface -

![Weave Scope NodeJS]({{site.baseurl}}/images/2015-06-30-how-apollo-uses-weave/weave-scope-nodejs.png){: .small-8 .small-centered .columns}

This only starts to scratch the surface of the things we can do with [Apollo](https://github.com/Capgemini/Apollo). There are much more advanced deployment techniques you can take advantage of with service discovery, DNS and the Weave networking just working out of the box.

Check out the video below to see all of the above in action:

<div class="small-12 medium-8 large-4 small-centered columns">
  <div class="flex-video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/FHKdWFsoEPk" frameborder="0" allowfullscreen></iframe>
  </div>
</div>


**NOTE**: we have manually added an entry to our hosts file for ```nodejs-rest-api.example.com```. This is for the purposes of the demo because we have not set up proper DNS. In a production setup you would have DNS routing for your applications. ```nodejs-rest-api.example.com``` points to an HAproxy instance on the Mesos Slaves. The HAProxy config is built completely dynamically based on [Consul template](https://github.com/hashicorp/consul-template). This is also a core part of [Apollo](https://github.com/Capgemini/Apollo)

Although we've chosen to use Consul for DNS here, Weave can actually do DNS as well, through Weave DNS. See [http://blog.weave.works/2014/11/04/have-you-met-weavedns/](http://blog.weave.works/2014/11/04/have-you-met-weavedns/) for more information on that.

## The future

With the [announcement of the Weave fast datapath](http://blog.weave.works/2015/06/12/weave-fast-datapath/) just in the last week, we want to look into providing that as part of Apollo to enable faster underlying networking for containers. We're [tracking this issue](https://github.com/Capgemini/Apollo/issues/337) as part of the progress on that one.

We're really excited to see how [Weave Scope](https://weave.works/scope) evolves as well, as we think it provides valuable insight for engineers regarding the current state of containers in the cluster.

Additionally with the [release of Docker 1.7 and the announcement of a plugin system](https://blog.docker.com/2015/06/announcing-docker-1-7-multi-host-networking-plugins-and-orchestration-updates/), which gives initial support for Network and Volume plugins it will be interesting to see what unfolds in the community over the next few months around this ecosystem. This should allow much richer (and nicer) integration with Docker itself for things like Weave for which work is already well underway. [Check out the Weave blog](http://blog.weave.works/2015/06/22/weave-as-a-docker-network-plugin/) to find out more information on how they are progressing with the Weave network plugin for Docker. For more information on experimental networking and services in docker [see this page on the Docker GitHub repo](https://github.com/docker/docker/blob/master/experimental/networking.md).

If you want to give any of this a try or help us improve the project, [head on over to our GitHub repo](https://github.com/Capgemini/Apollo) to get started!
