---
layout: post
title: "Microservices Like Change"
description: "Caution! Change Ahead"
category: "Architecture"
author: nick_walter
tags: [Development, Microservices, Java, Camel, NetflixOSS, Spring]
comments: true
share: true
---
## Do we always need to be scared of change?
I got kind of excited the other day, I got told the client wanted a change. I know, weird, right? To make matters worse it was just a month before the project was going live. So you would expect the team and I to be perhaps a bit upset and to say, 'No that change would be too much' or 'That means changing the API'. To generally behave like my 6 year old does, when I tell him he can't have chocolate before bed. 

But in fact we were the exact opposite; we wanted the change! Why? Because our design could accommodate it. Our design was paying dividends. We could see this change being implemented with a small amount of work and minimal (or in fact no) effect to the users of our existing API. Actually we could even use this as an opportunity to produce a better and cleaner API for our customers.

### Bring it on!
In my previous post [Microservices Gotchas](https://capgemini.github.io/architecture/microservices-gotchas/) I talked about how we were implementing a suite of Microservices; using Java, Apache Camel, Spring Boot, backed by MongoDB. The services were split into varying roles; Adapter services, calling dumb pipelines which called smart data services. If you've read or been to talks on Microservices, one of the benefits that always gets mentioned is the ability to accommodate change. Microservices are not all that easy to build from scratch; there is a perceived overhead in the splitting up of the functionality. So the benefit won't always appear straight away. 

In our design we only had to make changes to any affected services, which in our case was only one. We added a new API to an existing service which would consume an already implemented downstream service. And finally the big win was we could move this into production by releasing just one Microservice, with tools like [Apollo](https://github.com/Capgemini/Apollo) the change could be made with no downtime in production. 

I'm sure not all changes will be like this, but with the right upfront design of your services there is no reason why they can't be. Using great design tools like the [Life Preserver](http://www.simplicityitself.com/public/latest-news/what-the-life-preserver-tool-does-an-intro/) you can model services around components that change together, reducing the impact of those last minute change requests.

### Extra Reading
Some additional reading if you get time:

* [Vivek Juneja - Microservices: Four Essential Checklists when Getting Started](http://thenewstack.io/microservices-four-essential-checklists-getting-started/)
* [Russ Miles - Building Adaptable Software With Microservices](https://leanpub.com/antifragilesoftware/)
* [Tony Mauro - Adopting Microservices at Netflix: Lessons for Architectural Design](http://nginx.com/blog/microservices-at-netflix-architectural-best-practices/)
