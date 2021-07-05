---
layout: post
title: "An Introduction to VirtualBox"
category: Infrastructure
author: geoff_lawrence
tags: [Virtualisation, Infrastructure, DevOps]
comments: true
share: true
---

What is my aim with this post? It is to give you a good introduction to [Oracle's VirtualBox](https://www.virtualbox.org) so you know all about it and what it can do. This is not a tutorial on how to install it and do things with it, more of an introductory overview with enough detail to whet your appetite.

## What?

So, what is VirtualBox? Well, it is an open source virtualization solution suitable for most laptop and desktop computers. Some people may ask what virtualization is. It is the ability to run one or most virtual computers on your physical computer. They are "virtual" because they do not exist physically but rather software is used to emulate the hardware. So let's say you turn your laptop on and it boots into Windows 8.1, which is fairly normal. If you now download an ISO image (the file equivalent of a CD/DVD) of Linux and start VirtualBox you can create a new Virtual Machine, or VM and start it up, booting off the ISO. This VM can then launch off the ISO and install Linux, however the screen is just a window or application running on Windows 8.1 and the hard drive of the VM is just a single but big file on your laptop. Now you have Windows 8.1 running, as normal which is known as your host and it is running a guest, Linux. It's quite simple on the surface, but brilliantly powerful and it works and works well.

## Why?

I guess the next question is why? Why would you use VirtualBox? That will get clearer after we have covered the "When" but for now, let's consider Why VirtualBox. There are several virtualisation products available depending on what operating system you use. If you have a Mac, you might prefer [Parallels](http://www.parallels.com/), or if you need lots of VMs in a production environment with good management you might choose [VMWare](http://www.vmware.com/), or you might be a Microsoft user and prefer Hyper-V (found in Windows Server 2008 onwards or Windows 8 - but not all editions). There are several options in the Linux world and that is all before you touch on cloud based solutions or container solutions like [Docker](https://www.docker.com/).

Personally I have a couple of reasons for using VirtualBox. Your personal preferences might be different and that's fine. I like the fact that VirtualBox works well, is robust, fast, [open source](https://en.wikipedia.org/wiki/Open-source_software) and cross platform. Performance is the reason I first switched to VirtualBox and since then it has been my solution of choice, doing everything I need it to, including running preview versions of Windows 8 and Windows 10. The other reason is that it is open source. Does this mean that I downloaded the source, customised it and compiled it? No. However it is great to know I can. I also like the fact it is free, which is very nice, so, thank you Oracle for keeping it this way.

## When?
So, when might you use VirtualBox? I believe there are several good use cases which fall into a couple of groups.

### Less Hardware
Firstly you might choose to run a number of VMs instead of physical machines, this might be for some kind of virtual desktop solution or a virtual server solution, either way, you are running a small farm of virtual machines. Large organisations often choose VMWare for this but VirtualBox is very capable and excellent value for money.

### Isolation
Secondly you might run VirtualBox on your laptop or desktop, and in this scenario it is most likely for reasons of isolation. For example you might be doing network related things like installing Active Directory Domain Services, DHCP servers and so forth, you really don't want this on your main network! Another example is keeping your main machine clean and doing software installations in a VM. Sometimes this is useful for developing in a different operating system or just trying something out.

### Testing Software
A virtual machine is a great place to test software, whether that is trying out different install options to see what they do or just running software in a VM to keep your main machine clean, either way it is a good choice. You can do this assessment without interference from the software on your main machine. You can also see how software behaves if you reduce the amount of physical memory or slow its processor speed.

### Browser Testing
Sometimes you just have to test a website with an old browser. Thankfully this is becoming less of an issue than it used to be but even so it is still handy to try your site from Linux as well as Windows for example.

### DevOps
This is where you want to deploy your software to a consistent, known platform and a VM is ideal for this as you can either start from a clean OS, a known appliance or a good snapshot. VirtualBox supports [Python](https://www.python.org/) and has a comprehensive command line toolset, so you can automate/script some tasks. Alternatively you can use something like [Vagrant](https://www.vagrantup.com/) to help automate the process and get a consistent platform to deploy your solution to. So whether this is part of your nightly build/test cycle or just regular development lifecycle, VirtualBox will support the way you work.

### Test builds
Once you have your DevOps automated deployments running then automated testing is the next logical step and is arguably part of DevOps.

## Who?
Originally VirtualBox was developed by a company called [innotek](https://www.virtualbox.org/wiki/innotek) and they produced a no cost edition and then made it [open source](https://en.wikipedia.org/wiki/VirtualBox#History). They were bought by [Sun Microsystems](http://www.oracle.com/sun/) in 2008, who in turn were bought by [Oracle](http://www.oracle.com/) in 2010. So today it is officially known as [Oracle VM VirtualBox](http://www.oracle.com/us/technologies/virtualization/virtualbox/overview/index.html). Whilst Oracle have continued with the original [www.virtualbox.org](https://www.virtualbox.org/) website and kept it mostly open source, they have created a number of pre-built VMs that you can download and they are configured with Oracle technology, very handy.

## Where?
So, where can we install VirtualBox? Well, as long as you have an Intel  x86, Intel64 or AMD64 based processor and you are running Windows, Linux or Mac OS - or even [Solaris](http://www.oracle.com/solaris) - then you can install VirtualBox and host some virtual machines. Clearly your computer will need enough performance to do this but most modern computers have enough processor power to do this, it is more often a case of having enough physical memory.

## Features to Note

### Shared Folders
These are a nice easy way to get files in and out of your VM and they can be automatically mounted. They are though I little trickier with Linux compared to Windows.

### Snapshots
This is a standard virtual machine feature, where you take a snapshot of a VM state, you can then make some changes, as many as you like over several days and then revert back to the snapshot and everything you did since taking the snapshot is undone. It is more accurate to say that the VM state is reverted and it is as if you have never changed it, very handy.

### Appliances
Sometimes you need to take a working VM from one host machine to another. The recommended way to do this is to create an appliance, copy the generated file to the new machine and import it as an appliance. It copies all the VM stuff into a single, portable file. Just copying the virtual disk file misses the virtual machine configuration.

### Networking
This could be a whole article in itself! However I would recommend configuring your VM with two network adapters, the first using NAT for access to the outside world and the second as Host-Only so you can access its services from your host.

### Duplicating/Cloning
If you clone a VM you can have a second copy of the same guest VM running, which is an easy and quick way to build a cluster. However care does have to be taken about the stage of the cluster build process that you do this!

### USB
Sadly VirtualBox does not yet support USB 3, however any USB 2 device can be used within the VM. Note this is one area where you might need to license VirtualBox but read https://www.virtualbox.org/wiki/Licensing_FAQ and you will see exactly when. In summary there are very few situations where a license is needed.

### Multi Monitor
This is brilliant if you only have 1 screen but need to test a multi-monitor system. Yes, you do run out of screen space but it does make software testing easy. If you have two physical screens you can get VirtualBox to display 3 or more virtual monitors for testing.

## Extra
Being an open source solution often means people starting building on top of things like VirtualBox and this indeed has happened.

### Vagrant
Well, this is really a whole other blog post but if you need rapid VM creation, management and deployment for development work or DevOps style work then Vagrant can save a lot of time. The nice thing is you don't have to stop using VirtualBox, you can just add Vagrant based VMs into your mix.

## Conclusion
I have become a fan of VirtualBox since first installing it and have had very few problems with it. Some features take a bit more learning about than others but fundamentally it does the job and works very well for me. If you want more posts on VirtualBox then please add a comment and if I get enough interest maybe I will write another post.....

## Useful websites
* Official Web Site - <https://www.virtualbox.org/>
* Oracle Product Page - <http://www.oracle.com/us/technologies/virtualization/virtualbox/overview/index.html>
* Oracle Pre-Built VMs - <http://www.oracle.com/technetwork/community/developer-vm/index.html>
* Handy Blog - <https://blogs.oracle.com/fatbloke/>
