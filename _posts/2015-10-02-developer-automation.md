---
layout: post
title: "Developer Automation"
description: "One line developer setup!"
category: DevOps
author: broomyocymru
tags: [DevOps, Automation, Vagrant, Virtualbox]
comments: true
share: true
published: true
---

## The Problem
As software engineers we've all experienced the steps below when joining an established project:

1. Walk in first day, excited at the prospect we can change the world!
2. Get told task one is to read the documentation :/ followed by task two get a development environment up and running (*sigh as reality hits, you won't be changing the world today*).
3. Spend many hours searching for documentation on file shares, wikis and random machines sitting under desks. You now piece together all this information and let battle commence to get things up and running.
4. You're three days in, have a shaky local development environment that's just about hanging together, there were a few scripts you found online and some dependencies you've copied over from someone else's machine that got you over some hurdles and you tell yourself you'll update the documentation for the next new joiner. 
5. Some weeks later a new joiner starts, they're attempting to setup a developer environment, you smile, wish them luck and the process begins again (including your additional notes in yet another place).

This of course is an exaggeration, however some elements of the story can still be found in many projects! There is also the problem of implementing changes to existing developer environments, often an error prone scary process. What we need is a way of source controlling this process .....

## The Solution 
Automation is the solution and in particular an awesome tool called Vagrant. Vagrant is a wrapper around virtualisation tools allowing you to script your environment setup. This information is held in a 'vagrantfile' so we can version control this along with our source code and update it as changes occur. This then solves the two problems mentioned above, new joiners need only be pointed to the source code and run a single command and existing developers feel safe to 'destroy' and recreate their environment as changes are made. The scripts we use to 'provision' our vagrant virtual machines can even be re used further down the delivery pipeline. 

Below I outline the steps taken to automate a basic environment, I've used VirtualBox and simple bash scripts to provision a virtual machine. However vagrant offers many alternative providers (what it hosts the virtual machine on) and provisioners (how we set-up the virtual machine once its running).

### An Example
The flow below is aimed at getting a basic environment set-up, more complex scenarios re-use much of the example below. 

### Pre-requisites
Before we can begin we need to install [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com).
	
### Create Vagrant file and Provisioning Scripts
**In the root of your project run the following commands:**
```bash 
 vagrant box add hashicorp/precise64
 vagrant init hashicorp/precise64
```
The first line will download a base image, in this case a 64-bit ubuntu image. The second creates a default vagrantfile.

**Open the vagrantfile and replace the contents with the following:**
```ruby 
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|  
  # Dev Setup
  config.vm.define "MyServer", primary: true do |dev|
    dev.vm.box = "hashicorp/precise64"
	dev.vm.box_check_update = false

	#Port Forwarding
	dev.vm.network "forwarded_port", guest: 80, host: 8080

	# Network IP
	dev.vm.network "private_network", ip: 192.168.0.1

	# VM specific settings
	dev.vm.provider "VirtualBox" do |vb|
		vb.name = "dev"
		vb.customize ["modifyvm", :id, "--memory", "1024"]
	end
	
	dev.vm.provision "file", source: "provisioning/example.jar", destination: "~/example.jar"
	dev.vm.provision :shell, path: "provisioning/java.sh"
    dev.vm.provision :shell, path: "provisioning/mysql.sh"
	dev.vm.provision :shell, path: "provisioning/bootstrap.sh"
  end
end

```
The file outlines the virtual machine requirements and the scripts to run for set-up. It'll create a 64-bit Ubuntu virtual machine with 1024mb of memory running on the IP with port forwarding. This is all very familiar if you've worked with a virtual machines before or read our [previous blog post on VirtualBox]({% post_url 2015-02-11-an-introduction-to-virtualbox %}). 

The provisioning steps are the automation of what we as developers would normally do manually. In the example I'm copying a jar file into the machine and then running some bash scripts to install Java and MySQL followed by some additional specific bootstrapping. There's nothing stopping you provisioning in a single script but personally I like to keep things re-usable. For more advanced provisioning you could use puppet or chef. 

**Create a provisioning file for MySQL:**
```bash 
export DEBIAN_FRONTEND=noninteractive
apt-get -q -y install mysql-server
```
p.s. remember to run "mysqladmin -u root password myPrivatePassword" later on to secure the database. This is a non interactive install script.

**Create a provisioning file for Java:**
```bash 
#!/usr/bin/env bash

echo 'Setting Up Java'
apt-get update
apt-get install -y default-jre
```

**Create a provisioning file for bootstrapping:**
```bash 
#!/usr/bin/env bash

echo 'Create directory structure'
mkdir ~/MyDir
mkdir ~/MyDir2
```

### Vagrant Up
This may take a while first time, it's setting up the virtual machine and applying the provisioning scripts. After that you'll have a build fully configured. You'll be able to ssh into this machine and manually modify it if you wish. 

### Vagrant Destroy
Running vagrant destroy will delete the virtual machine. When you need the environment again re run vagrant up.  

## Summary
Hopefully this post will inspire you to give automation a go and get started changing the world a lot sooner!


