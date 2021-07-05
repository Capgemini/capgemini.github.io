---
layout: post
title: The Conservation of Complexity in Software
subtitle: How you can never remove complexity in a system, you can only move it
description: This article describes the tradeoffs that you are making when you simplify solutions
category: Architecture
tags: [Architecture,Development,Deployment,Choices,Microservices,Patterns]
author: [nhamer]
comments: true
share: true
---

In physics, the law of **conservation of energy** states that the total **energy** of an isolated system remains constant—it is said to be conserved over time. **Energy** can neither be created nor destroyed; rather, it transforms from one form to another. In IT I postulate that there is another similar law that we all should get familiar with:

> The **_conservation of complexity_** states that the total **_complexity_** of an isolated _business / IT_ system remains constant – it is said to be conserved over the lifetime of the solution. Complexity can neither be created nor destroyed; rather, it transforms from one form to another.

If energy is the ability to do work, or the ability to move or elicit change, then complexity (in this context) is the resistance to change in a system. This resistance causes the effort and time to implement a change to increase which in turn increases the cost of sustaining and enhancing a system. How do I come to that conclusion? 

## Complexity in Architecture 
The following diagrams model the way in which system architecture has developed over the last few decades. Each diagram represents the same generic business problem solved through differing architectural styles. Monolithic systems have given way to client/server or tiered designs which have in turn fallen out of favour to be replaced by service architectures whether the [SOA](http://www.opengroup.org/soa/source-book/soa/p1.htm) or the Microservices kind.

<figure>
<img src="/images/2019-03-13-The-Conservation-of-Complexity-in-Software-Architecture/complexity-model1.png" alt="Comparison of various architectural styles" />
<figcaption>Figure 1</figcaption>
</figure>

Each progression above can be classed as simpler than its predecessor. Components and then services have been introduced as a means to compartmentalise business logic in order for it be reused or replaced altogether. The drive to Microservices takes this further. It is the manifestation of the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) at architectural level. Building a service that does exactly one thing well is much easier than trying to weave that code into a monolith. There are no distractions and it is straightforward to articulate the acceptance criteria or what done looks like. However, one service does not make a solution, so what is the impact to the overall system complexity?

<figure>
<img src="/images/2019-03-13-The-Conservation-of-Complexity-in-Software-Architecture/complexity-model2.png" alt="Client Service vs Microservices" />
<figcaption>Figure 2</figcaption>
</figure>

Layering on inter-component or inter-service interaction on to the client/server and Microservices models above highlights that the complexity has shifted to the networks and communication channels between the components that make up the system. It seems that the client and server components are complex to build but simple to connect, whereas Microservices are simple(r) to build but more complex to interconnect. 

Building communication networks between components adds another layer of complexity. Nodes in the network need wiring together and managing. Security becomes more of a concern as the traffic travelling on the network needs protecting. More network hardware is introduced, and someone has to manage it. It may be easier to test each component individually but how do you know that the system in its entirety is working? When things go wrong how do you pinpoint the cause? 

The complexity has simply been relocated from the software and code into the network and solution management. 

## Complexity in People 
People have roles to play in complexity, after all in many software architectures, people are a fundamental part of the system. 

In the early days of automating business processes using computers, the software often played the part of a glorified filing cabinet. Records are accessed in the system, they are reviewed, changed if necessary and then pushed back. The users and the software are working together to achieve some business activity, often with users holding relatively complex processes in their heads. Sometimes the people using the system act as an integration layer. Data is read from one system and keyed in manually to another. 

As activities are automated and the burden on people is reduced the complexity moves into the system. New user interface styles are designed and built so users can be more efficient. Workflow systems are introduced that allow humans and systems to communicate more effectively. 

In essence complexity has been moved into the software to make life easier for the users. The complexity of the complete system has not changed.

## Complexity in Phasing
Even in a world where DevOps is gaining popularity, it is still typical for software to be born in a large-scale delivery project, at the end of which it is transitioned into support where it is run until it is no longer required. In my experience these large delivery projects are where large-scale investment takes place and where attention is focused. However even the best plans need to be changed and scope is often reduced. Business functionality is prioritised over operational requirements and before you know it the software is in support, but it is complex to operate.

The complexity of the system has not changed. We have simplified the delivery timeline, but all the complexity has moved to the support team. More people are needed to run the system, more telemetry is required to understand what is going on and the solution is more expensive to operate.

## In Conclusion
As people responsible for the successful delivery of software we need to be aware of the consequences of our choices. Our jobs can be pressurised and it's natural to try to make life simpler but the choices we make can have a wide impact. When we consider the complexity of the entire system, we can assert whether our simplifications are positive. We might be making life worse for the people who have to run our software or for the people using our software, or even our future selfs when we are called back to fix our software. 



