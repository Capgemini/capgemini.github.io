---
layout: post
title: "My take on Capgemini University's recent DevOps Hackathon"
category: Cloud
author: gayathri_thiyagarajan
tags: [Hackathon, PaaS, Bluemix, IoT, Leadership]
comments: true
share: true
description: "Hackathon experience on DevOps, BlueMix and Leadership model"
---

Recently, I took part in a DevOps Hackathon organised by our [Capgemini University](https://www.capgemini.com/gb-en/careers/why-join-capgemini/learning-and-development/) in Les Fontaines. It was part of the overall Talent Week program which had an underlying theme "Leading All the Way".
Twenty four Capgemini Engineers with different technology backgrounds from six countries took part. We were to come up with an innovative solution for a real-life challenge faced by one of our clients, not unlike the unfortunate event in [Nice](http://www.bbc.com/news/entertainment-arts-36802565), and implement it with a DevOps mindset using [IBM Bluemix Platform](http://www.ibm.com/cloud-computing/bluemix/).
The teams were assessed based on several criteria such as Approach, Innovation, Fitness for Purpose and Level of Engagement.

## The Challenge

The challenge was to create a standalone, real-time, situational awareness system for a luxury corporate jet manufacturer, designed to secure the jets and their VIP passengers when they are on the ground.  
The system could make use of a variety of physical and virtual information streams such as IoT sensor feeds, camera feeds and other publicly available data. The solution was then put through a real-time-simulation round which assessed the systems response to hypothetical security threats.  
The overall assessment included several jury rounds at different stages of the Hackathon. Finally, each team had to pitch their solution to the stakeholders and Capgemini architects for the account and scores awarded based on the business viability of the solution.

## The REAL Challenge

1. Platform: The solution had to be implemented on IBM Bluemix. A pre-requisite for the Hackathon was to complete online training for the platform. There were two flavours of the same thing - One from IBM and another from our internal MyLearning site. The eight hours worth of training included videos and exercises. Unfortunately, this just was not enough to give us a decent head start.  
Consequently, the first day of the Hackathon was pretty much spent on playing with the platform and figuring out why our application crashed for apparently no reason.
Bluemix also provides some boilerplate code, but any hope of using them to make a quick start was soon dashed.  (My colleague Ant has written about this in more depth in his post about the same hackathon - [Hacking on Bluemix](https://capgemini.github.io/cloud/hacking-on-bluemix/).)

2. Team: We were not teamed up based on country but instead mixed up apparently randomly. (I couldn't figure out any pattern.)
At the start of the Hackathon we were all taught the different stages of forming a high-performing team based on [Bruce Tuckman's model]( https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development) - Forming, Storming, Norming, Performing.
I realize now that these are so true. Especially when you have to be high-performing in a _very_ short span of time. These stages have a massive impact on the outcome.

## Our Solution
Our solution used the Mobile App builder to develop a personalized Android app for displaying alerts and push notifications to the VIP users.

As well as the IoT sensor feeds made available, our backend consumed and analyzed a Twitter stream using [Node-RED](http://nodered.org/). This is a browser based tool for quickly building applications using "nodes" through drag & drop. Underneath, it uses Node.js to construct and store these flows as JSON. With Node-RED, device interfaces were quick and simple to develop.
We then used the Bluemix Sentiment Analyzer to analyze the Twitter feed. I have to say, this aspect was disappointing for example, it failed to detect gunfire at an airport as a major threat. We had to add some logic on top of it to adjust the sentiment scores based on our keyword criteria.  However, this did mean that all alerts we generated were then personalized, meaning threats were detected based on a list of keywords that would be most relevant to the VIP for e.g paparazzi, military coup etc.

Our ultimate intention was to use [IBM's Alchemy API](https://console.ng.bluemix.net/catalog/services/alchemyapi) or Watson's Tone Analyzer or Natural Language Analyzer to make our app more intelligent by analyzing news feeds etc. It would have been nice if we had managed to deduce a threat from the analysis output. For example, Loud noise from the sound sensor + Fire alarm + Smoke alarm = Bomb went off at the airport.

## The Demo
For our demo, a set of simulated security scenarios were run and our app was scored based on how many threats we effectively detected.
This solution went down very well with our client for two reasons - their customers i.e. the VIPs are absolutely paranoid about security (for good reasons) and quoting the client, "Technology is more a risk than a solution for them" they said. Secondly, the jet is pretty much customized for them to be indulgent and personal, so why not a personalized app too?
I know it goes against the grain to develop something that works for a single user but this solution aligns perfectly with the client’s business model and let's face it, their customers are not your everyday Joe Bloggs!

## Conclusion 
Security is a top threat not just for this client but to almost everyone. It was amazing to develop a solution which has applications in a real-life scenario and present it to real clients based on real-time information in such a short period of time. Although my degree was on Instrumentation Engineering some ten years ago, technology has come a long way and I never imagined I would be re-visiting my old grounds this way.

Finally, I went to this Hackathon hoping someone in my team would take the leadership mantle and just tell me what to do. But I came out realizing that I am the person I was looking for and this Hackathon has helped me find skills within myself that I was not aware of before. For me this experience was more a Leadership Hackathon than a DevOps one, and a very exciting one at that.
