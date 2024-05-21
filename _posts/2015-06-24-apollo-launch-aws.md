---
layout: post
title: "Demo: Launching an Apollo cluster on AWS"
description: "A how-to guide for getting started with Apollo on AWS"
category: "DevOps"
author: graham_taylor
date: 2015-06-24
tags: [Development, DevOps, Microservices, Big Data]
comments: true
share: true
---

This post aims to show how you can get up and running with an [Apollo](https://github.com/Capgemini/Apollo)
cluster on AWS inside 5 minutes.

For more background information on Apollo see [our GitHub repo](https://github.com/Capgemini/Apollo)
or the [original post](https://capgemini.github.io/devops/apollo/) which gives an insight into the various
components.

In short, Apollo is a fully open-source PAAS built on primarily on Apache Mesos and Docker as well as [some other components](https://github.com/Capgemini/Apollo/tree/master/docs/components).

For the purposes of the demo we will spin up a 5 node cluster on AWS public cloud in the eu-west-1 region.

The final deployment architecture will be -

- 3 Mesos master nodes running [Mesos](https://mesos.apache.org) (in master mode), [Marathon](https://github.com/mesosphere/marathon), [Consul](https://github.com/hashicorp/consul) (in server mode), [Docker](https://github.com/docker/docker), [Weave](https://github.com/weaveworks/weave) and [Weave Scope](https://github.com/weaveworks/scope).
- 2 Slave nodes running Mesos (in slave mode), Consul (in agent mode), Docker, Weave, Weave Scope and HAProxy.

If you want to short-cut the text and [skip straight to the video](#video) feel free.

## Prerequisites

It's worth reading through our [getting started guide for AWS public cloud](https://github.com/Capgemini/Apollo/blob/master/docs/getting-started-guides/aws-public.md), but essentially, you will need -

  - An active account setup on [Amazon AWS](http://aws.amazon.com/)
  - An account setup on [Hashicorp Atlas](https://atlas.hashicorp.com)
  - An SSH key created, ready for pushing to AWS:
```bash 
cd ~/.ssh
ssh-keygen -P "" -t rsa -f id_rsa_aws -b 4096 -C "email@example.com"
openssl rsa -in ~/.ssh/id_rsa_aws -outform pem > id_rsa_aws.pem
chmod 400 id_rsa_aws.pem
eval `ssh-agent -s`
ssh-add id_rsa_aws.pem
```
  - [Terraform](https://terraform.io) installed and in your $PATH
  - [Python](https://www.python.org/) >= 2.7.5 installed along with [pip](https://pip.pypa.io/en/latest/installing.html).

## Get the code

To start, lets clone the repo and install some dependencies -

```bash 
git clone https://github.com/Capgemini/Apollo
cd Apollo
pip install -r requirements.txt
```

## Set some configuration variables

Next, we need to set some environment variables in our shell. Usually I like to keep a little script that i can ```source``` to bring those into my current shell environment, but its up to you, you can simply ```export``` the variables on the command-line if you wish.

To create the file containing the environment variables ```vi aws-public.env``` and the contents of this file should look similar to this -

```bash 
export APOLLO_PROVIDER=aws-public
export TF_VAR_access_key=$AWS_ACCESS_KEY_ID
export TF_VAR_secret_key=$AWS_SECRET_ACCESS_KEY
export TF_VAR_slave_size=c3.large
export TF_VAR_key_file=~/.ssh/id_rsa_aws.pub
export TF_VAR_key_name=capgeminiapollo
export TF_VAR_slaves=2
export ATLAS_INFRASTRUCTURE=capgemini/apollo-aws-public
```

Lets just step through and explain what each of these variables do -

```APOLLO_PROVIDER``` - This notifies the bootstrap scripts that we want to deploy on to AWS public cloud. Valid providers are 'vagrant', 'digitalocean', 'gce', 'aws' (private VPC).

```TF_VAR_access_key``` - This is the Access Key ID for AWS

```TF_VAR_secret_key``` - This is the AWS secret key

```TF_VAR_slave_size``` - (Optional) This is the size of image we want to use. I'm using c3.large here because
I want a bit more grunt in my slave nodes. The default setting is m1.medium (if you leave this omitted)

```TF_VAR_key_file``` - This is the AWS key we generate (part of prerequisites) that we want to upload to AWS

```TF_VAR_key_name``` - This is the name we want to give that key. This must not clash with any keys
you already have in your AWS account.

```TF_VAR_slaves``` - (Optional) This is the number of slaves we want to provision. The default is 1. Turn this up depending on how large you want your cluster to be.

```ATLAS_INFRASTRUCTURE``` - This is the name of the space in [Atlas](https://atlas.hashicorp.com) you want to use to monitor your infrastructure. This will give you a dashboard in Atlas allowing you to view the state of your infrastructure and services directly from Atlas. The dashboard will be available in Atlas at (for example) https://atlas.hashicorp.com/capgemini/environments/apollo-aws-public

## Launch the cluster

To launch the cluster execute -

```bash 
source aws-public.env && sh bootstrap/apollo-launch.sh
```

This will bring the environment variables into your shell and kick off the launch process
which should start bootstrapping the cluster on AWS.

The bootstrapping process does the following -

- Runs [Terraform](https://terraform.io) to provision the instances, security groups, SSH keys, etc... inside AWS cloud
- After that, runs [Ansible](https://www.ansible.com) on those provisioned instances to bring up the cluster configuration
- Finally, once Ansible has completed it should open the web interfaces in the browser to the following -
  - Mesos master UI
  - Marathon UI
  - Consul UI
  - Weave scope UI

## <a name="video"></a> Lets see the video

<div class="small-12 medium-8 large-4 small-centered columns">
  <div class="flex-video">
    <iframe width="640" height="360" src="https://www.youtube.com/embed/Xhqv9b05HmI" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

You should now have a fully working [Apollo](https://github.com/Capgemini/Apollo) cluster ready for you to start deploying your applications to.

In a more real world scenario you might want to look at using [the VPC set up we have](https://github.com/Capgemini/Apollo/blob/master/docs/getting-started-guides/aws.md)
to provide a bit more security around the cluster. We are aiming to add more features around
security and cloud provisioning/providers to the platform soon, so stay tuned to [our GitHub repo](https://github.com/Capgemini/Apollo) for more info.

If you want to try this out for yourself, head on over to [https://github.com/Capgemini/Apollo](https://github.com/Capgemini/Apollo) and get cloning!

Look out for more posts coming soon on how to deploy applications to the cluster and further insight into how we use tools such as [Weave](https://github.com/weaveworks/weave) to improve the developer experience around deploying and managing Docker containers.
