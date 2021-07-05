---
layout: post
title: "Techniques to improve Application Design"
category: Architecture
author: gayathri_thiyagarajan
tags: [Application design]
comments: true
share: true
description: "This article suggests ways to simplify the design process"
---

Design is important because it gives an application a vision; a vision that can be shared amongst the team.

It gives the team a direction; a foundation on which to build the code. It is not a means to make the implementation easy but to make it efficient.

There are several ways to design an application. I am by no means an expert but I would like to share my experience that can make application design a little bit easier.

## Start small

Start the design with something that gives the team the best possible start with coding. It is not necessary to design the entire application in one go. It's all about [microservices]( https://capgemini.github.io/tags/index.html#Microservices) now. But before that it was (it still is) modules, services, interfaces etc.
However you decide to break down the application in question, start with the smallest logical part. Start building a mental picture of how this all fits together.
Address the functional complexities first, making sure not to lose track of the domain principles.
Add the additional but essential features later on. For e.g. you do not want to start the design by worrying about incorporating configuration, logging, monitoring or metrics stuff into your design.

## Keep it simple

Simple designs are usually the most powerful, efficient and also the most difficult to conceive.

I once designed a screen which would allow a developer/support person to configure the UI for various modules of the application, a settings screen, if you like. I was just finding my new talent in design, so in all the excitement I started off with the vision that my configuration screen will be totally configurable - Yes, a configurable configuration screen. The intention behind this was to make it utterly flexible for the user which in my case was probably another developer or someone with an IT background. It had asynchronous front end loading and all the hot stuff (at that time). But developing that screen was a nightmare. I managed to finish it but a couple of months down the line, even I couldn’t make head or tail of the configurations. The lesson for me was to keep things simple. It doesn’t have to be the Superman of the design world - the one that Flies, Saves the World and looks nice and handsome doing it.

Delegate the complexity if it is bearable elsewhere. In my case, the user would have been perfectly capable of handling that extra bit of work. Knowing the audience really helps.

## A practical design not an ideal one

You have a reasonable design - what next? Here comes the difficult part. Implementing it. This is when the design is put to actual test.

All designs work well on paper. You have to navigate through a myriad of technological challenges before the design actually works. More often than not, you might need to rethink parts of it.
Trade-offs are an unavoidable part of designing an application. Sometimes, a better user experience will call for a trade off in the design.

The important thing to keep in mind is not to forget why the decisions were made in the first place. It might have been done in a certain way to represent an important domain concept or parts of it. The challenge is to make a trade off without sacrificing on the things that really matters such as core domain principles,  performance etc.

## Feedback

Look for constant feedback from the implementation cycle. Keep an open mind and never hesitate to go back to the drawing board if required. Some of the best designs on paper may end up being the least efficient ones. Agile delivery methodologies and some recent architectural patterns such as microservices can help us in this regard. Find out the trip ups early on in the cycle and fix it.

Starting small, as mentioned above, really helps in this regard. I prefer doing my design on a whiteboard because it is easy to accommodate changes, instead of drawing endless number of UML diagrams using tools and redrawing them when a tiny thing changes. It also helps me be disciplined about the scale of the design.

## Foresee

I have found in my experience that adding a bit of flexibility in the design really helps. It could as small as having switches to turn things on and off - these are tiny little things that don’t get mentioned in the requirements but really helps when the code rolls out to production. It does need a bit of foresight, but it is important not to get carried away.

## The Unbreakable Design - There is no such thing

It is absolutely essential to make the application as fault tolerant as possible. Think about all possible scenarios however unlikely or brief they may be while designing the application. Now, that is not enough. Because in the real world there is always something lurking in the dark corners (a.k.a edge cases), that will break the code. The best possible thing to do is to build a cushion to protect your application when the inevitable happens. Let it break, but make sure it recovers gracefully.

To sum up, while designing an application it is good to follow three A’s:

* Accept - that the design is not prefect and strive for constant improvement. It is not a one-off activity, otherwise it runs the risk of becoming stale.
* Accommodate changes to the design if it means improvement elsewhere. A rigid design can easily compromise the usability of an application.
* Be Agile. Start small and iterate. Be sure to incorporate the feedbacks in the subsequent iterations.
