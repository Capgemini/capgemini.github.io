---
layout: post
title: "Microservices Gotchas"
description: "You're implementing Microservices? You may want to think about a few things first."
category: "Architecture"
author: nick_walter
date: 2015-04-16
tags: [Development, Microservices, Java, Camel, NetflixOSS, Spring]
comments: true
share: true
---
Don't get me wrong, I'm not anti Microservice, far from it. 

Come and ask me and I'll give you a lot of reasons why they can benefit any development project. And there are plenty of posts on the web and on this blog that talk about the very good points of implementing a system using Microservices.

However after getting one implementation into production, and now being the majority of the way through a second, I have some observations from the other side of the coin that you may not have thought about.

### You're Airing Your Laundry in Front of Everyone
Yep, there it is everybody, my implementation of your requirements ... it's all there, go ahead take a look. Once upon a time you would implement the "system" and to everyone it would be that box on the diagram that did stuff. Something went in, and things happened and something popped out the other end. That was the "monolith" and in the new world you have multiple services running that make up that "system" with lines of communication draw between them. And that's great. It means you have a flexible architecture, you can make changes to your services and not affect the whole system. 

But it does have a side effect, now everyone sees your implementation and it can turn into something like a mass code review with people you wouldn't expect pointing things out. You may have noticed I didn't say "dirty" laundry in the title, as sharing the actual implementation isn't a bad thing. But managing the message is something you should be ready for. I don't think I was ready to talk about such low level implementations of our code to everyone. 

Think about how you talk and document your system, pitch it at the right level for the audience. Drawing lots of boxes with a spaghetti of overlapping lines can scare the hell out of some people.

### That's Going To Be A Bit Chatty Isn't It?
Microservices have to talk to each other; That is pretty obvious right? Or is it? When as a developer you're implementing a single requirement it may not be. Take a step back and look at the bigger picture, and it can become very obvious that lots of small conversations are starting to give you a major headache. 

In our implementation we're communicating with REST over HTTP, which is pretty light-weight, but given high volumes it did cause us some issues. We had to re-think one of our design decisions to resolve it. Luckily we found this out before it went into production and fixed it with very little fuss. How? Performance Testing that's how. 

I can't stress how important Performance Testing your Microservices is. If you can get an understanding of your volumes and expected performance early on, then you can get on testing it as soon possible. Other "gotchas" to bare in mind:

* Make the tests realistic. Is hitting every API at the maximum TPS at the same time the right thing? 
* Use as real a dataset as possible. 
* With real volumes.
* Push it through as close to a realistic production setup as possible. 

This will flush out something that you may not have expected. Usually a piece of hardware or a restriction that's outside of your domain. Doing Performance Testing early on gives you the time to make the necessary changes in time. And given you're using Microservices the change is going to be nice and contained, right? Watch this space for a future blog on Performance Testing Microservices.

### So How Do I Test These?
You're writing good code, and you're writing unit tests. You feel confident. But you still need external testing, the question I got asked a lot by our testing team was how do I test this story, where do I do that? And you can understand why. 

We had built a suite of integration Microservices, that you could put into 2 groups; "smart services", which exposed APIs that do specific jobs and "pipeline services", which glued together calls to the different smart services (usually in a very specific order) in order to a complete a business task. Despite this, we still found at certain points we got swamped by the amount of test effort required to test every single Microservice. It created a lot of noise within the team. 

What helped us was to identify the right Microservices that could be externally tested. Helping to focus the teams effort and reducing the noise of defects that may never occur.

### It's Broken ... Somewhere
By their very nature Microservices are a distributed architecture. This brings its challenges when debugging issues; Where do you look? You get told one of your APIs is throwing an error. With the Java "monolith" you had a had a stacktrace that you could work your way down and find the line of code that caused the error. But with Microservices it could be anywhere, especially when your service calls multiple down-stream services, and in some cases in parallel. 

### So where do you start? 
Something simple that developers can overlook is logging and logging the right details, you need to be able to trace a message from it's entry point to everywhere it gets routed, so having some key data that makes a message unique and "searchable" is a major plus point. Additionally don't just log on errors, you want to know to where it went and how it got to be there. Monitoring is also a big winner for us; knowing if services are running and performing within norms helps identify issues. We're using [Codahale metrics](http://godoc.org/github.com/codahale/metrics) outputting to [Graphite](http://graphite.wikidot.com/start) and [Graphana](http://grafana.org/), but to get a runtime view we're moving towards implementing [Netflix's Hystrix](https://github.com/Netflix/Hystrix/wiki) Dashboard with [Turbine](https://github.com/Netflix/Turbine/wiki) in order to see how all our Microservices and their dependencies are behaving.

### Extra Reading
Some additional reading if you get time:

* [Martin Fowler - You Must Be This Tall To Use Microservices](http://martinfowler.com/bliki/MicroservicePrerequisites.html)
* [Russ Miles - Building Adaptable Software With Microservices](https://leanpub.com/antifragilesoftware/)
* [Tony Mauro - Adopting Microservices at Netflix: Lessons for Architectural Design](http://nginx.com/blog/microservices-at-netflix-architectural-best-practices/)
