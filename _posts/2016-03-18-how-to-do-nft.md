---
layout: post
title: "How to do NFR Testing (Non Functional Testing)"
description: ""
category: Testing
author: sanjay_kumar
comments: true
share: true
tags: [Testing, NFR, NFT, Non Functional Requirements]
---

On my current project I'm working as an Integration developer (using among other things [Camel](http://camel.apache.org/), [Hystrix](https://github.com/Netflix/Hystrix) and [MongoDB](https://www.mongodb.org/)).

_This post is based on a series of conversations with [Andrew Harmel-Law](https://capgemini.github.io/authors/#author-andrew-harmel-law) ([@al94781](http://twitter.com/al94781))._

I've recently been involved in Non Functional Requirement (NFR) testing of some [microservices](https://en.wikipedia.org/wiki/Microservices) which were developed as part of microservice architecture for Integration layer.

This was my first experience with NFR testing, and while doing it I realized its importance and the difficulties it can bring. In this post I'll share some of my key learnings around how to do NFR testing (providing examples where possible to back my points).

## What is NFR testing?

NFR testing serves to validate that your system meets all the non-functional requirements (e.g concurrent requests, transactions per second, response times, sub-service failures etc) expected of it.

## Why is NFR testing so important?

Today, applications and the eco-systems in which they run have changed drastically. Older applications used to run in closed, barely-distributed, named-(pet)-system environments where everything was most probably largely within your control. Now, with the arrival of clouds and microservices the eco-system has changed drastically, and the importance of testing NFRs has risen considerably.

## Why should you care?

I think you should care because:

1) **It's important - actually very important** : Its importance can simply be understood from the point of view that if a system can fulfill all its functional requirements, but not fulfill is just one critical NFR (be it related to capacity, speed, security, availability, scalability etc.), then that system will soon get outdated or fail to deliver at all in today's fast-paced digital world.

2) **It's free** : Its free in the sense that you don't have to invest heavily (for tools or manpower) to do NFR testing. It's best done by the developers themselves, with freely available open source tools.

3) **It's fun** : It is fun for the developers to test the system they build; to see how it performs in the actual world and fine tune, improve and re-engineer their code before it's too late.

## NFR testing steps
Now you know what NFR testing is as well as its importance and why you should care about it, let me explain how you might do it.

### 0) Be Agile - Don't wait till the end.

NFR testing should be planned from the beginning of the project as NFRs can have a big effect on the coding/architecture of your application.

Suppose you have an NFR which states that your application should handle very high traffic of say 1000 requests per second. Now, if you start NFR testing from the beginning of the project, you may come to know early in the development cycle that your application architecture can or can't handle it. This may lead to changes in the code or design or adoption of some coding practice which allows you to achieve this. For example, you may have to use thread pools to minimize the time in creating and spawning new threads. You may also use multi casting and aggregation patterns, or even swap out one framework for another to achieve better response times.

Say another NFR states that the system should not be overloaded in case of failure in any one components of the system. Again, if you test this NFR from the beginning you can find whether your system can cope with this requirement or not. You may decide to build your application to fail fast in case of any error using the [hystrix](https://github.com/Netflix/Hystrix) circuit breaker from Netflix.

The above example clearly show that if we are Agile (and early) with our NFR testing then it can assist in verifing the coding approach / architecture of our application and help us to change if required early in the development cycle; thereby saving us a lot of time and money later.

### 1) Plan

Being Agile in your NFR testing is not enough - you have to plan for it properly. Planning is important as will help to decide which NFR tests to run when you get constrained by time or resources. _Believe me - you will_. When Planning your NFR testing, you should consider the following points to get the most out of your NFR testing:

#### a) Be requirement-driven - Locate all NFRs and map them to your tests.

To better understand this, when creating an NFR test plan make sure you map all your NFR tests with the corresponding NFRs.

Suppose you created a test in which you are going to verify that in the circumstance where one of your sub-services fails, your system fails fast without overloading. This is a really important and good test as it validates your system resilience in case of failures and also how your system resources are used in such a scenario.

But if you can map this with a corresponding NFR which states 'Failure to connect or receive a response from the Sub-Service is handled gracefully, logged, and reported back to the consuming application within X seconds of the call' then not only will this achieve the above said goals, it will also help you to provide your stakeholders with statistics and data for the corresponding NFR and boosting their confidence in the system being built.

#### b) Be fear driven too -- If something is new, test the hell out of it

Suppose you have a system which uses [MongoDB 2.6](https://www.mongodb.org/) as the database and now you're told to upgrade to [MongoDB 3.0](https://www.mongodb.org/). In this scenario [MongoDB 3.0](https://www.mongodb.org/) is new to your solution and may impact you in unknown ways - most probably in a positive way, but you don't know. There will be always be concern/fear about the effect of this change. You should address this concern/fear with high priority. It is therefore better to run all NFR tests which are related to your Database as compared to other NFR test which are non related such as sub-service failure.

#### c) Prioritize

When you define your NFR tests, make sure you prioritize them too, as you may/will be constrained by time and manpower.

Let say you have three NFR tests:

1. DB failover and recovery
2. Handling transaction at 100tps
3. Graceful handling of Sub service failure.

Now, taking the above example, since your last test you have recently changed your Database from [MongoDB 2.6](https://www.mongodb.org/) to [MongoDB 3.0](https://www.mongodb.org/). Suppose when the system was built all the NFRs were "MUST", but in this scenario you may not have enough time to re-run them all, so you have to prioritize them. In this example, it is clear that we "MUST" run NFR 1 and 2 as they specifically depend on the Database. NFR 3 can be termed as nice-to-have, as the system has not changed this test is less likely to be affected.

NFRs can also be prioritized with respect to an environment you are running them. Suppose you have three Database related NFRs:

1. DB failover and recovery
2. DB Handling transaction at 100tps
3. Data center failure and recovery.

Now NFR 1 and 2 were already tested on the Dev and Test environments, but NFR 3 was not tested, as these environments don't have the infrastructure to support it. Well, Pre-prod does have this infrastructure, so when doing NFR testing on pre-prod, you should prioritize the NFR 3 as this is the one which you have never tested before and has a high significance in production.

### 2) Setup

Setting up the proper environment for the your NFR testing is very important as it may nullify/invalidate your testing or create doubt around the test results.
Consider the points below when setting up your NFR test environment.

#### a) Only prod-like truly counts - in Config, Data, Platform and Monitoring

When setting up your NFR test environment you should make sure it has the same configuration, physical architecture and monitoring as you will have in production. (Or as close to it as you can get to tell you what you want to know.)
If any aspect of this (CPU, RAM, network settings / config) deviates from the production configuration, then results which you will get by running your test will be skewed in some way and be less valid when you present them to your stakeholders.

Take the example of NFR where your system is supposed to handle 100tps. Perhaps you set up your environment with 2 CPU with 4 cores. But, your production haS 4 CPUs and 8 cores. In this circumstance, any test which you will run could have two outcomes:

1. you will get good results (system meets or exceeds your NFR target)
2. you will get bad results (system fails to meet your NFR target).

In the case of a good result, you should be happy that you have written very optimized code which is working good on limited hardware. But, if get a bad result you may unnecessarily suspect that there is some issue with your application. You may waste time and manpower in optimizing code which is already optimized, but the result is skewed due to hardware limitation.

Also, if you reverse the scenario and use a more superior configuration in your test environment than the production box you might gain a false sense of security. You can easily understand the impact.

#### b) N.b. Run-state - Normal? Peak Load? Failure/DR scenario? Latency?

A system can operate under different conditions and loads. You _ideally_ set up your test environment to simulate all possible conditions (normal load, peak load, failure scenario and n/w latency etc). Environment setup may also include creating data, tests and scripts to simulate these conditions.
You should note down the run-state as part of NFR result. Run your NFR tests in all such environments to prove the predictable functioning of the system.

#### c) Be repeatable - config, dataset, request load, and scenario steps

You should ensure that test environment setup should be easily configurable and repeatable. If your test requires some data to be preloaded into the system, then that data should be easy to re-create and should be available to anyone going to run the test. All configuration files should be stored in a central repository so that anyone running the tests can access them as and when required.

### 3) Perform - Run your NFR tests

The next obvious thing after planning, prioritizing your test runs and setting up the test environment is to actually run them. Again there are several aspects to this:

#### a) Request Mix - Use case & background,  success & failure

When running your NFR tests make sure they reflect the real use cases as closely as possible.
Suppose, your system caters for four types of request (add, update, delete and read). As we can see the nature of each of these requests are different, and can have a significant effect on overall response times.
Now suppose your test is to validate the NFR that you must support 100tps, then your NFR test should not just send one type of request at 100tps, but it should send a request mix of all four request types. You should also take care of the percentage of each request type to be sent for proper request mix (e.g. 20% add, 5% update, 1% delete and 74% Read. You can get this info from your product owner, a user or a business analyst). You should also consider sending bad and invalid requests mixed into your test load to simulate the real life scenario where not everything is going according to plan elsewhere.

There may also be a test to just send successful requests, in such scenario also you should pass all the four types of request with agreed percentage for each type.

This brings up a key point. Request mix is very important, as it doesn't just validate that your system can handle all sorts of requests, but also how your system behaves when all sorts of requests come at the same time.
A lack of request mix can skew your request and give a false impression of high performance. For example, if you just send *read* requests, the response time will be quick, but if you send all *add* requests the response time will be longer than the read. And if you add in some bad requests, resultant error handling and compensatory transactions, then you get a very different picture.

So, take care of the request mix when creating test case for your NFRs.

#### b) Load - N.b Req/sec & number of users

Again the transactions per second and the number of concurrent users have a huge impact on the performance of the system, hence take care with it and make sure your run your test with the same transactions per second specified in NFRs or what you expect in Production.
Suppose you are aware that your system will at max hit with 6tps in Production (tps being controlled by your load balancer), then you should run your test at 6tps only.

#### c) Events - Fail/Slow down & Recover/Speed up.

You will have NFRs related to system failure/recovery or slowdown/speedup. So, your tests should be run under conditions of sub-system failure and recovery, system slow down and speed up to cover these NFRs.

### 4) Record
So you've run your tests and have your results - you're done right?  Well not really. Recording your NFR test results is a must, without it you will never be able to prove your system performance and go back to it in the future when you learn something new. The following are some basic guidelines about what you should record in your NFR findings and how.

#### a) Measure - Throughput and Response time (inc. the percentiles).

The key elements to measure in your NFR testing are most usually throughput and response time, and to view these in relation to the 95th and 99th percentiles.
Percentiles are important too (especially in a microservice based system) so its important you know about how they work.  A good introduction can be found on [Wikipedia](https://en.wikipedia.org/wiki/Percentile#The_normal_distribution_and_percentiles).

#### b) Write up using templates - Recording the same thing, in the same way, every time

The best way to record test results is to use templates. Create a generic template which covers what what you want to capture and use it whenever recording the results.
Templates gives many benefits, a few of them are:
* create once, use many times
* they help to easily compare the results
* you get consistency
* they are easy to understand

Recording your NFR test results is important, and it is most important to record the measured variables and environment settings used after each run (e.g throughput, response time, JVM and CPU usage, http and tomcat thread pool and response codes).
If you don't record the same set of parameters in each run it will become hard to validate the test result and see any improvement or side effect after each new release of code.

A practical example will be, for NFR test of 1000req/sec you ran a first test and capture the throughput, response time and CPU and Memory usage and got values of 70tps, 2000ms per request average, and with an average CPU usage of 30% and average Memory usage of 20%.
Now to improve the throughput you decided to use more http and tomcat threads. This time you captured only the throughput and response times (100tps and 1800ms). This seems to be good and you have achieved your NFR of 100tps. But you have not captured the CPU or Memory related information. To your surprise the CPU usage was very high 90% and Memory use was almost 100%, which is not desirable state of system are normal load. Therefore, your approach to increase the thread pool was not effective as you expected.  This can trip you up later on when you scale even more.

So remember to capture the same set of data every time and have a fixed template to captured it.

#### c) Save Evidence - logs, Graphs etc.

It is also important to capture the NFR test results in the raw, as this is the data used to validate your findings. There is no point in just writing on a wiki page saying that you ran the test and achieved the throughput of 100tps with response time being less then 1 sec with no errors, until you can back it up with some sort of data (logs, graphs, etc.).

If you can capture logs and graphs from a test tool such as JMeter, this is strong evidence that can be very helpful in supporting your conclusions.

#### d) Summarise - For the TL;DR crew

In the end, you should summarise the NFR test result to your TL;DR crew. If they can understand and agree with the NFR test results then most probably your stakeholders will too.

### 5) Investigate

One of the most important tasks of NFR testing is not just to run the tests and capture the data, but also to capture all failures and errant behaviours of the system and attribute explanations to each of them.

#### a) Attribute all errors - write them up too

Every system is supposed to throw errors, but if we don't have an explanation for each, then the system is unreliable. So you should make sure that not only do you capture the errors, but also that you attribute them each with a proper explanation. Without a valid explanation for failures your NFR testing becomes invalid.
If you don't have any explanation for the error or errant behaviour of the system, then you'll need to investigate. This may lead to code changes, documentation updates or simply a deeper understanding of the system. More importantly it can lead to finding bugs in system or at least tuning of the logs being captured.
Again, going back to the example of the 100tps NFR. When running this test, one of your requests failed. If you don't provide any explanation for this error, your NFR test becomes invalid. But if you check the logs and you find an error related to "tcp connection timeout", then you can attribute that failure to this error and can proceed.

#### b) Re-run - only changing one thing at a time

If your investigation requires, you should re-run your test to validate your findings. It is good practice to level up the logging when investigating.
When it comes to configuration changes, make sure you change only one parameter at a time, to verify the effect of the changes made.
To raise the capacity from an observed 75tps to 100tps, suppose you changed the default thread pool size of 10 to 20 and also modified the memory setting from 200mb to 500mb; here you have modified two things. Now, suppose after his change you were able to get 100tps. So, what will you do? will you keep 20 as default thread pool size or memory size to 500mb. You can't decide until you know the effect of each change individually.
So the best way is to make one change at a time and re-run your test to verify the effect of the change made.

### 6) Improve

NFR testing is not just to check that your application meets NFR specification but also to improve your application. NFR testing always leads to finding bottlenecks in a system and help to improve it. When improving the system we should use the helpers below.

#### a) Tune - pool sizes, timeouts, queries, caches, indexes etc.

When improving/tuning the system to meet NFRs specification, you should start with configurable settings such as thread pool size, timeouts, queries, caches etc. A code change should be amongst your last options unless you can clearly associate an issue with it.

#### b) N.b Run the slowest step.

When it come to tuning, it is always good to find the slowest bit and tune that. If you are able to fine tune this then most probably other bits too will improve. This is not a universal law - sometimes this can lead to a flood cascading on downstream elements which in turn has an even more detrimental effect on performance.
The best way to find the slowest bit is to view the response time graphs for each request. Through it you can easily figure out which service is taking more time and you can start tuning it.

#### c) Fix - Bugs, slowness, weakness etc.

When running NFR tests, if you find any error either there will be a valid explanation for it or there will be some bug which is causing it. In the latter case, fix it.
Similarly, if your system is slow and does not meet your NFR specification, then to look for improving the system as explained in 6.a.

#### d) N.b your NFR target - Don't get carried away if NFRs == met, break

The key thing to note when improving the system is, if your system is able to meet your NFRs, we should not over-optimize it. Suppose, when you were running a NFR test at 30tps you were getting Hystrix thread denied for thread group size of 10. Then, you changed it to thread group size to 15 and it was working fine. Now there is no need to over optimize and test it whether it works with thread group size of 11, 12, 13 -that is unnecessary.

### 7) Goto 0

If there are still some NFRs to be run, repeat the cycle.

## Further Reading
We hope you've enjoyed this deep dive into NFR Testing. But there is far more. If you enjoyed this, have a look at:

* [Applying the Universal Scalability Law to Organisations](http://blog.acolyer.org/2015/04/29/applying-the-universal-scalability-law-to-organisations/) - not actually about software, but a very good explanation of this key concept
* [Scalability! But at what cost?](http://blog.acolyer.org/2015/06/05/scalability-but-at-what-cost/) - A bit of contrarian thinking to get you thinking
