---
layout: post
title: "Docker Continuous Delivery Workflows"
description: "The different ways to do Continuous Delivery with Docker"
category: "DevOps"
author: cam_parry
tags: [Development, DevOps, Microservices, Docker, Continuous Delivery]
comments: true
share: true
---

So this big new world of containers has come along, and with it we are solving a lot of problems we previously had with virtual machines, and we are developing much more elegant solutions to problems as a community. One thing that really is amazing is the Docker Continuous Delivery workflows that are being brought out by all the different SaaS continuous integration tools e.g. [TravisCI](https://travis-ci.org/), [CircleCI](https://circleci.com/), [Wercker](https://app.wercker.com/) etc. 

Then there is the automated build workflow offering by DockerHub. A lot of these tools are covering one major use case, that is you merge changes into a branch, usually the master branch and the CI tool will automatically build your latest or tagged Docker image and then deploy to a cloud service for you. While this is brilliant, lately I have been wanting to make the containers as slim as possible, so I don't want to be building my containers inside the container I will be deploying, I also don't want to have to make massive remove statements at the end of my image to remove any superfluous packages or directories that aren't needed or that could cause unnecessary attack vectors. Even though we are removing these directories and packages, often they will still be in the image, in one of the layers making it up. I also do not want development packages in my container if I can help it.

So let's cover the different workflows and some possible use cases.

- Automated [DockerHub](https://hub.docker.com/) Build, [Tutum](https://www.tutum.co/) automatically picks up new image and deploys it to run functional tests.
  Use Case: 
  - Small open source projects that you want to make sure are working and are as hands off as much as possible

- Build in CI SaaS service, deploy to Docker private or public registry, pull down and deploy to cloud. Run functional tests.
  Use Case:
  - Small to large teams coming from virtual machine ecosystem, as it will match most closely to a CI process to what they are used to.

- Build in Hosted CI service, deploy to cloud service. Run functional tests.
  Use Cases:
  - Large team with high frequency of commits. Must pass acceptance tests. Only final artifact to be put in registry.
  - High frequency commits with small team, but with a lot of deploys based on features. Only signed off artifact to be put into registry.
  

These are the main use cases for build and deploy but what about setting some quality gates and security. [Project Nautilus](http://www.slideshare.net/Docker/official-repos-and-project-nautilus) will scan your containers for vulnerabilties, but is this too late, if its already in your registry or running on a machine somewhere or a new piece of functionality didn't work as you abandoned all those years of testing your application for this wonderful world of containers.

So here is an opinionated workflow for docker, let's say we are developing a NodeJS application with Angular frontend. We make a change in the application, run any linting, style and unit checks locally, as part of some githooks, then we commit to a branch. This then runs the same linting, style and unit checks just in case we missed anything locally, this shall be our first quality gate. We then want to check to see if any of the code or node modules are vulnerable, for this we can use [retire.js](http://retirejs.github.io/retire.js/). We should then make sure the application tests have good code coverage, one of the better tools for this is [codeclimate](http://codeclimate.com/). 

We now want to make sure my application works end to end as well, so we run the grunt:e2e task we have setup to run my [protractor](https://angular.github.io/protractor/#/) tests against [saucelabs](http://saucelabs.com/). If that passes, we can then build the container, but first we might want to run a [docker lint](https://github.com/lukasmartinelli/hadolint) test to make sure this won't throw any errors, as well as a [Docker Label Validator](https://github.com/garethr/docker-label-inspector) test to make sure that any labels we have included are valid. So now we are ready to build the container but what if we have unnecessarily added some vulnerable packages to the application, we can't be responsible for keeping up with all the security warnings that come out these days. So we run a vulnerability scanner which checks the container against OWASP and CVE databases for any vulnerabilties, much the same as the [Project Nautilus](http://www.slideshare.net/Docker/official-repos-and-project-nautilus), [CoreOS Clair](https://github.com/coreos/clair), [TwistLock](https://www.twistlock.com/product/vulnerabilitymanagement/) and many other companies and open source projects are doing these days. For now we have decided to use [Lynis](https://cisofy.com/lynis/). This article [Docker Security Tools: Audit and Vulnerability Assessment](http://blyx.com/2015/12/01/docker-security-tools-audit-and-vulnerability-assessment/), covers off most of the toolset out there in this space.

So we have gone through a Docker quality gate and can breathe easier now we have a greater sense of confidence our container is both tested and secure. But let's take this a bit further because we want a seriously secure and performant container. So we run something like [docker-slim](https://github.com/cloudimmunity/docker-slim) over it, to minimise the container size, as a bonus it will also generate a apparmor and seccomp profile for your container.

Okay so now we have a slim, secure, performant container that we can now either tag and push to [DockerHub](https://hub.docker.com/) or a private registry. Now we want to deploy this release of this new container, so now we can setup an automatic hook from tutum to deploy or get a CI SaaS tool to deploy it to a cloud of our choice via a webhook from my registry. Hooray the application is live.

Here is a diagram of the CI flow we have just undergone.

![Fig 1. CI Flow](/images/2016-01-20-docker-ci-workflows/CIFlow.jpg)

Now the container is running, we want to put some checks in to make sure it stays secure, so we make sure the apparmor or seccomp profile are implemented, we also want to make sure we am running something that is going to check for security updates such as the tools mentioned earlier e.g. Clair or libsecurity. 

Now we want to test the performance of our container from the point of view of security and load, so we can see if this has changed over time and if we are regressing our application. For this we are going to use our [Vegeta](https://github.com/tsenart/vegeta) test harness, but something like [Bonesi](https://github.com/markus-go/bonesi) will do the job. While running load we are going to be running chaos monkey at our applications and hosts, to make sure they behave correctly and don't do anything we are not expecting, when they move hosts or restart. We are also going to be running [Minion](https://github.com/mozilla/minion). Looks to be a fairly good security framework from Mozilla. Minion will aggregate all our security tools reporting, issues and scans. This will be our final security and performance quality gate. 

At this point we have a pretty high degree of confidence in our new container. We then deploy to production and start on our next brilliant idea. As a side note, we need to make sure our host OS is secure as well, so using many of the [CoreOS principles of trusted computing](https://coreos.com/blog/coreos-trusted-computing) or running [DockerBench](https://github.com/docker/docker-bench-security), over your host, you will go along way to securing your host, hardware and all the way up to your application.

By no means am I suggesting use one tool over another, or that this is the best workflow. It is more of an example of how to integrate these set of tools into your CI workflow and more of a call to arms for people to start utilise these security tools in their day to day development.

For a full working example see [our MEAN stack shopping cart demo](https://github.com/Capgemini/angular-cart-demo).

