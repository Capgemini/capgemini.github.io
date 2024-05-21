---
layout: post
title: Why Microservices Are Right For Us
description: Further reasons why the Microservices approach works well.
category: Architecture
author: "andrew_harmel-law"
date: 2015-03-06
tags: [Development,Microservices,Java,Camel,NetflixOSS,Spring]
comments: true
share: true
published: true
mathjax: false
featured: false
---

I [posted previously](https://capgemini.github.io/architecture/microservices-reality-check/) about the fact we're "doing" Microservices.  At that time I was hedging pretty extensively (as various commenters pointed out). This was predominantly because we we're pathfinding (or at least broadening the paths for the rest of us that had already been exposed and marked by others just ahead of us).

Well, time has moved on; and while we're still not fully paid-up cult members, unwilling to drop our skeptical, one-step-at-a-time, always-check-this-is-right-for-us-in-our-specific-situation approach, we are increasingly happy with the path we've taken.  Why?  Let me lay it out for you.

## Microservices are Human-Sized
First up, it's been overwhelmingly noticeable that by adopting Microservices, we've allowed ourselves to work on things that are the right size for a single developer to grapple with.  By this I mean you can work on them quickly and in isolation, and you can consume them easily too.  

What's more, you can reason about their internals really simply; their cognitive load feels "just right".  Their granularity feels good too - you know when they "do one thing, and do it well" because it's patently obvious; or more accurately, you know when they're not, and when its time to split them down. ([Others have already written](http://de.slideshare.net/ewolff/micro-services-smaller-is-better) far more eloquently about this than I ever could, but I'd like to add ourselves as a data point which bears this out.)

What is more, not only are they human-sized for us as developers, they are also human-sized for that ["auld enemy"](http://en.wiktionary.org/wiki/Auld_Enemy) of ours - testers.  By this I mean that they (Microservices, not testers) can initially be tested quickly, and in isolation - the test work gets a lot closer to our unit tests and, because we're all REST-based in our APIs, these tests are nice and simple to automate with a myriad of free and well-known and well-CI-CD-chain-integrated tools.

But perhaps even better than both these is the fact that Microservices are also consumer-sized.  We write all ours so that with only a Java and Maven dependency installed you can check them out and have them running locally with two commands:

```php 
git clone
mvn spring-boot:run
```

We set up our code so that, when the Microservice starts up, it's automatically in stub-mode, by which I mean it's downstream Microservice and other dependencies are stubbed out. The range of requests you can send in, and the various valid and failure states you'll mimic as a result are specified in standard README.md files at the top of each Microservice git repo.  

This, plus the bundled and served [Swagger](http://swagger.io/) docs, [Hystrix Dashboard](http://github.com/Netflix/Hystrix/wiki/Dashboard) and [Spring Boot](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-metrics.html) / [Codahale Metrics](http://dropwizard.github.io/metrics/3.1.0/) monitoring JSON feeds, means everyone is a lot more self-supporting and doesn't need to depend upon shared server environments with the associated time-slicing and wait for the next release.

## Microservices are Laptop-Sized
Picking up right where our last point left off is our next benefit; adopting Microservices has allowed us to throw out a lot of the heavyweight-and-rarely-used shared development infrastructure, allowing us to get a lot more as individual developers out of the grunt of our development and test machines.  Running [Tomcat](https://tomcat.apache.org/) (we're not on [Jetty](http://eclipse.org/jetty/) yet, but we will be eventually - its inevitable) and possibly an in-memory-db (or even a local [Redis](http://redis.io) or [MongoDB](http://www.mongodb.org/)) is a LOT lighter on resources and quicker to turnaround after a change than a traditional Java EE app server.  Despite this, we've lost none of the monitoring or configurability we've come to expect from the more "full-featured" EE cousins; none that we're missing anyway (see above).  And if we do need to run up more than one Microservice locally? Nae bother.

And before we move on, it's worth us pointing out that this is all without the much-discussed [Docker](http://www.docker.com/) currently being in the mix. (We're looking at moving to using this in Dev but its not imminent, though our minimal platform-dependencies should make it very simple once we find the time to do it properly.)

## Microservices are Team-Sized
Still on the sizing, here's our penultimate benefit of this post: Teams of 3-5 folks typically work on a Microservice together.  This is a good fit for us - we typically [Pair Program](https://capgemini.github.io/development/pair-programming-budo/), or review all of each others code, which keeps it [clean](http://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), focussed and legible.  We've also found that a right-sized Microservice is a great size for a productive team-discussion, with collectively-owned outcomes. When there is disagreement - and there is occasionally - then quick spikes of a few days max produce great results.

One thing we've not tried, but which appeals to us, would be to take this approach one step further and let developers outside of the service-team make changes to a Microservice's code via an OSS-like pull request model.  Of course this is predicated on each service having its own git repository - but we have that - and a PR / code review model approach to working - but we have that too.

## Microservices are Truly "Agile"
Last benefit time. For this one, let's push beyond the "size" theme. I know I'm walking into a minefield here (hence the inverted commas) but I mean Microservices are "agile" in the true sense in that they:

- keep the humans at the centre (see everything in this post up to now)
- help keep the focus on running, tested (TDD'd?) code
- absorb change well (multiple parallel versions and refactoring!)

The first bullet we've already done to death. The second we've mentioned and I won't go into any more.  The third however, bears a little exposition.  

From the start we knew that we'd be in the situation at some point where we'd have to run multiple versions of a Microservice.  Fine, we versioned the URLs (major number only if you're wondering).  We soon afterwards extended this so that multiple instances of a given service (even the same version) could be run alongside each other.  To do this we had to ensure they didn't use each others port(s), config, output directories, and we had to add an instanceId to all the metrics we shipped else they looked like one big instance in things like [Graphite](http://graphite.wikidot.com/) / [Grafana](http://grafana.org/).  With this in place, and a [backwards-compatibility policy](http://wiki.apidesign.org/wiki/BackwardCompatibility) set out we were good to grow.  But that's growth in the large, external to each Microservice. What about change internally?  It turns out, that's pretty great too.

Because they are by their very nature self contained and "simple", and exist behind cleanly defined interfaces we've found our Microservices a _lot easier_ to refactor.  Changes are smaller as the codebase is smaller.  The changes are easier to grok for a similar reason.  And because of this, most forms of debt accrete a lot more slowly.  Beyond this, because you're in a completely separate codebase, looked after by a smaller team, experiments are easier to undertake, and are hidden from everyone else.  That helps free folks from the tyranny of "that's not how we do it", and lets them make decisions based on their requirements, and their requirements alone.  Now, in my opinion, that's agile.

## Conclusions?
That's it for this post - we have other potential benefits that we're tracking as I write, and rest-assured, I'll post them as and when we're sure they really are "beneficial".

In the meantime, if you have any comments / questions, please share them in the comments section below, or tweet we on [@al94781](https://twitter.com/al94781).  I'd love to hear from you.

## Want to Work With Us?
Fancy working as part of the team I'm talking about, or on any other number of exciting Digital projects?  Let us know because, [we're _always_ hiring](http://www.uk.capgemini.com/careers/job-opportunities).
