---
layout: post
title: "Automation as a way of thinking... and docker"
category: Open source
author: alberto_lamela
date: 2014-11-10
tags: [Docker, Fig, Puppet, Behat, DevOps, Testing, Automation]
comments: true
share: true
---

Automation is a key and essential fact when solving problems and assembling pieces together. By automating you only need to do the same thing once, reducing the possibility of human errors so it helps to increase quality, efficiency and productivity with less effort.

### The everyday life
It doesn't matter what programming language, technologies or tools you use. It doesn't matter what sector of Software Engineering you are focused on and it doesn't really matter which discipline you work on. I would say automation can be more of a way of thinking that could even be applied to almost everything in your everyday life.

When you automate a process you are creating and increasing productivity whether the process is "a virtual machine provision", "the steps you follow since you wake up until you get into the office" or "flirting with somebody". You are giving an automatic solution to a problem by creating a system with the ability for saving, reading and reproducing a series of steps for achieving an objective that is going to save you time in the future.

When you face and solve the same or similar problems again and again you soon realise patterns and known techniques (e.g: [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself), [Information hiding](http://en.wikipedia.org/wiki/Information_hiding), [Open/closed principle](http://en.wikipedia.org/wiki/Open/closed_principle), etc.) that will help you create a better design. Once you identify a regular pattern for solving a problem, you can then reuse this pattern every time you are building an automatic solution with common characteristics. But these patterns are not magic, they are always dependent to the context so you will need to suit them for fitting in your context. (E.g: There is no universal way to "break the ice with" a person as the reaction can be different depending on who you are approaching...)

### Going back to the IT world
Going back to the IT world, we are always trying to find, create and contribute to the best tools for automating our processes and ensuring high quality, reliable and scalable solution delivery to any users and clients we work with.
In this [repo you can see the technical details](https://github.com/enxebre/fig-docker-uat) of one solution that fits together a traditional Virtual Machine, [puppet](https://docs.puppetlabs.com/), [docker](https://docs.docker.com/installation/), [fig](http://www.fig.sh/) and a behaviour-driven development framework ([E.g. Behat](http://docs.behat.org/en/v2.5/)) for automating the creation and execution of an **ephemeral User Acceptance Testing environment.**

We use the power of the [dockerfiles](http://docs.docker.com/reference/builder/) for reusing the "uat_environment" puppet module (a wrapper over [selenium module](https://forge.puppetlabs.com/jhoblitt/selenium) and its dependencies) and create a docker image with selenium running.

A "behat service" will be created to check if the selenium container is ready using the script inspired by [docker-wait](https://github.com/aanand/docker-wait) so it will run behat, which code is passed as a volume to the container.

We use  [fig](http://www.fig.sh/) for running the [containers](https://github.com/docker/docker/blob/master/README.md) and managing our basic UAT environment.
You can add as many selenium services as you need to your fig.yml and run different behaviour-tests projects simultaneously because as we are [linking containers](http://docs.docker.com/userguide/dockerlinks/) we don't have to worry about port collision troubles.
```bash 
selenium:
 build: dockerfiles/selenium-image
behat:
 build: dockerfiles/behat-image
 volumes:
  - behat/:/behat/
 links:
  - selenium:selenium
```

Run “fig up” or any other fig command for automating and orchestrating your services.

#### Here is a list to summarise some of the benefits:

- As we only need to run processes in isolation here docker containers will be fast and less consuming than traditional Virtual Machines.
- By using "fig" you can easily scale your UAT environment.
- As we are passing the BDD Framework as a volume, the environment is totally decoupled from the code.
- The environment can be recreated and destroyed as many times as you need without being consuming resources unnecessarily in the meantime.
- Everything is under version control system and is reusable.
- You can now run "fig" from Jenkins or any other Continuous Integration tool.
