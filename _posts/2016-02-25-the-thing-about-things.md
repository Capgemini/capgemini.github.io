---
layout: post
title: "The Thing about Things"
category: Infrastructure
author: sasaunde
tags: [IoT, Compatibility, Protocols, Culture]
comments: true
share: true
description: "A review of the (im)maturity of the Internet of Things, and a debate about where the robots are taking us"
---

This article looks at two sides of the Internet of Things – the emerging technologies and the cultural impacts.

The other week I attended a talk by [Mat Henshall](https://www.thoughtworks.com/profiles/mat-henshall), Head of Things at Thoughtworks, San Francisco. I went along hoping to get some insight into the development of IoT interface standards, and was blown away when the contents of the talk were deep, philosophical, dire warnings of the consequences of IoT on our cultural wellbeing.

## Wild Frontiers

To go back to interfaces and standards, I first delved into the Internet of Things at Devoxx UK in June. The team who make the Honeycomb platform that run British Gas’s [Hive](https://www.hivehome.com/) home central heating controls gave a presentation about their product and how it used the ZigBee protocol to send messages between the thermostat and the router. My IoT knowledge was currently stalled at Bluetooth so I went home to do a little research, and was in for a few surprises. Firstly, I was surprised at how immature the concept of IoT actually is.

Earlier last year I found myself [denouncing](https://voxxeddays.com/bristol16/2016/01/18/technical-archaeology-unearthing-antipatterns-in-modern-distributed-technology-stacks/) the development of heavyweight standards and specifications in the Java world. Here in IoT we are at the other end of the spectrum, there is no standardisation at all.

The special thing about the internet, the tower-of-Babel thing that got it to take off and the thing which raised Tim Berners-Lee to godlike status was not the cable network stretching round the world or the connected software on the computers, it was the simple and powerful internet protocol stack which allowed everybody to communicate. IoT has no such unifying concept, and it can’t just steal what the internet has laid down because the drivers are very different.

A key difference between Internet and IoT is the requirement for secure, short-range, low-power network protocols to allow small devices to communicate, both with each other and with a hub device. This hub device is then responsible for the easy bit, the translation of the device messages to the internet. 

## Vendor Marketplace

Let's start with transport protocols.

Bluetooth was probably the first high-uptake IoT protocol. It's not used much these days in its original form as its power consumption is just too high, and it was really designed for point-to-point, master-slave configuration rather than network communication over star or hub topologies. There is a new version, Bluetooth Low Energy, which addresses both of these weaknesses, but it may possibly have come a little too late.

As I mentioned, Hive is based on [ZigBee](http://www.zigbee.org), which is a fairly common protocol. ZigBee made its appearance just as Bluetooth was reaching popularity, but is much more forward-thinking in its definition. For instance, ZigBee devices can be networked in a star, mesh or other generic topologies.

There are other players in other market areas. The [AllJoyn](https://allseenalliance.org/) framework is backed by LG and other hardware vendors in the Allseen Alliance, and has made good headway in that it will be deployed with all LG smart TVs from 2014 onwards. It provides an open source framework for IoT communication, abstracting the underlying protocol. Sounds powerful to me; and a great marketing strategy to get into the hardware market.

Then there is [Thread](http://www.threadgroup.org), acquired into the Google empire when they bought Nest Labs. With the power of Google behind it and many of its backers coming from traditional ZigBee backgrounds, perhaps this will be the new standard? Only time will tell. Thread one-ups ZigBee by being based on IPv6, allowing longer and therefore more IP addresses – I guess when you think about it this is quite a big deal if we intend to massively increase the number of connected devices! The question mark is whether within the IoT we really want the overhead of IP addressing, or whether we want to stick to the current hub model with a local network connecting to the internet at a single point. Seems even Google are hedging their bets, as Android has built in support for BLE...

## Compatibility

The engineers have built up our hopes for compatibility and then let us down here. Despite Bluetooth, ZigBee, Thread and others being compliant with IEEE specification 802.15 wireless protocol, they are actually completely incompatible at network level and require a bridge to communicate. The protocol seems to have been defined a little too loosely to be of much use.

Most IoT suppliers are, understandably, not necessarily interested in interoperability between themselves and other vendors. The Apple style lock-in strategy of creating your own bespoke hardware/protocols to encourage consumers to stick with your own products has worked before and is surely tempting for IoT suppliers. 
Even within the protocols, there is trouble. For instance, ZigBee applications may all be compatible at the network layer but each implements a software "profile" on top of this. The profiles are developed independently by ZigBee users and aren't necessarily compatible.

AllJoyn claims to be OS and protocol agnostic; allowing it to float over Zigbee, and Bluetooth. Great, in one way; but in another way this allows for a whole second layer of incompatibilities!

Let us take a moment to reflect on and appreciate the wonder that is the TCP/IP stack.

## New York in the 1900s, and the End of the World

As I sat down at the talk ready to ask my ZigBee questions, Mat was begging us all to think about the consequences of our actions. Hang on! What consequences?

It was a sit-up moment for the room full of developers; did we really have enough power to need to be aware of the consequences of our actions? Mat believes so. He said he really felt that IoT was reaching the maturity where it could, and would, have an equally large (or greater) impact on our society as the mechanisation of farming. He was incredibly serious about the consequences of IoT on all of our lives. I think his talk may be slightly more relevant out in San Francisco where concepts like robot chefs and connected fridges are more widely available to consumers, but I was surprised by the strength of his conviction that we are on the cusp of a new age.

He used self-driving cars as his example, comparing their possible impact on the automotive industry to the arrival of the car in 1900s USA. In 1900 there were in the region of 200,000 horses in New York City, with all the associated industries – forage provision, manure removal, farriers, harness makers, carriage maintenance. Within twenty years the entire industry had gone and the economic and social impact was enormous, as the figures suggest. 
Will it really happen that way with self-driving cars, can they replace car ownership entirely? Will we see such a massive impact on the automobile industry? Mat points out that even taking Uber as the cheapest way to run a taxi firm, 75% of the cost of the ride is in the driver. He had some other great statistics – the average family car spends 90% of its time on your driveway, and 30% of time spent driving in a city is in looking for a parking space! All convincing arguments for replacing city cabs and car ownership with a fleet of self-driving cars - with the resulting massive reduction of demand on the car production industry and its dependents.

## Overworked, and ... well, just overworked

I must admit I am not completely convinced by all of Mat’s arguments. Job losses due to mechanisation have happened before and in comparable numbers – mechanisation of farming since the industrial revolution has freed people up to work in other industries (and, sadly, create new and pointless industries such as estate agency and suing each other.. amusingly even these industries are becoming automated! I have a beautiful utopian vision of the future where robots are merrily trading houses to each other for ever-increasing prices whilst the phone networks are jammed with automated call centres communicating with smart houses...) I do, however, completely agree with his overall opinion that the onset of IoT will require a cultural change for humanity. I think that Western cultures will be particularly vulnerable, because of their intrinsic belief that success and happiness are linked to hard labour. With mechanisation should have come reduced working hours – and indeed, in some Northern European countries it has done so, with the EU introduction of the 35 hour working week and then the Swedes trialling the 30 hour week last year.

Most UK employees opt out of the 35-hour week, however, and I don't think such a thing exists in the US - we are all working as many hours as ever before. How will we cope as capitalists when there is nothing to do? I still don’t see this as the armageddon that Mat is hinting at, though. We can look to the East for a philosophy of living, we can focus on medicine and understanding disease, we can turn to art and music for accomplishment. But will we? Or will we just work longer and harder hours finding legal niches that allow us to sue the programmer of our automated car because its algorithm placed the value of the life of a dog above our neck muscle structure and swerved to avoid the dog, giving us whiplash? Come on humanity, don’t let me down!

## Another Legal Bubble

We touched on the ethical dilemmas of the Internet of Things. No new ground, Isaac Asimov had documented the famous three rules of robotics and discussed their consequences in novels such as ‘I, Robot’ decades ago, in 2016 we can see a real need to understand the debate. Capgemini's Rob Kerr [blogged on this recently](https://capgemini.github.io/development/making-ethical-development-choices) and it's very relevant to IoT. There was the first instance of a [self-driving car getting a speeding ticket](http://www.autoblog.com/2015/10/20/tesla-autopilot-first-speeding-ticket/) in Florida recently, apparently because it failed to recognise a temporary speeding sign. 

Imagine you are a programmer in charge of the algorithms controlling a self-driving car. If something falls in the road in front of you, [how do you choose the correct action to take](http://www.theguardian.com/technology/2015/dec/23/the-problem-with-self-driving-cars-who-controls-the-code)? If the item is a hay bale, it may be safer to just hit it. But what if the item is a child? Or what if swerving to avoid the item pushes you up onto a busy pavement? We briefly discussed the upcoming trend for programmers to take out insurance that will pay their legal bills should they end up in court over a decision algorithm they had created.

That old sci-fi idea that robots would out-compete humans and replace them was raised in the talk. No, said Mat, of course not – but we will become shepherds of robots. I love that metaphor.

## Burning Bridges

I managed to get in my question about interoperability. Mat reckons we are a good five years off convergence on a standard or a single protocol. He argued that a bridge is no big deal; and that as long as you have application layer compatibility your devices can communicate. 

For me, I'm not so sure that bridges are as hassle-free as Mat makes out. In current home networks, it is theoretically possible to get many of your devices to communicate – TVs, stereos, laptops and personal computers, phones... but the ones that really work are the ones based on bespoke protocols or common vendors. A pure Apple home network is a lot easier to manage than a combination of vendor technologies, and you’ll struggle to get a sound system as effective as Sonos without using their proprietary technology. Maybe he’s right though and the "home ESB" is just around the corner.

## What could Possibly Go Wrong?

Mat covered another fascinating and super-important area in his talk - security. In IoT world, maybe ultra-compatibility is not a good thing. Some of the most amazing bugs and disasters have come from the fact that everybody is driving their Things from the same cloud. Similar, I suppose, to having just one giant internet banking system for everybody. Great when it works – owners of Tesla cars wake up to find new and exciting changes to their automobiles such as the sudden ability to self park! But. There are bound to be some security issues and leaks, and the impact of these is huge. Mat talked about how many hotels use connected devices with no security whatsoever, so if you have the right transmission device you can randomly unlock doors and change heating settings to your heart’s content. Might not seem like much of an intrusion, but how many times do you have to flick a heater on and off before it catches fire?
Another example Mat mentioned was that of Nest, which is the US equivalent of British Gas Hive, rolling out an automatic update to everybodys’ heating systems which resulted in every system in Minnesota failing to work for FOUR DAYS. In the depths of winter. It’s probably simply a factor of the low uptake of Nest amongst the elderly that prevented many, many deaths from occurring. 

Seems a wise choice to follow Mat’s advice when architecting an IoT solution, and to use your own secure cloud. 

## Wrapping up (and locking up)

As I stated, I ([and others](http://www.theregister.co.uk/2016/02/18/andrew_battle_talk_part_one_robots/)) don't really buy Mat's argument that the culture changes the IoT will introduce are apocalyptic. I am just old enough to remember similar dire warnings in the early 1980s, before [the proliferation of personal debt](https://libcom.org/library/politics-debt-werner-bonefeld) and the expansion of offshore teams  made us all so tied to our jobs that it sadly became cheaper to employ humans to do menial work than to develop robots to build them. Maybe this time we will finally see the proposed labour reductions and it will be no bad thing. We are all [working too hard as it is](http://www.theguardian.com/society/2016/feb/14/workplace-stress-hans-selye). 

I did, however, take away a lot of great lessons from Mat's talk and the big one for me was how important and underestimated the **security** of IoT systems is. Many live systems are being [exposed](http://www.pcworld.com/article/3031218/security/flaws-in-trane-thermostats-underscore-iot-security-risks-cisco-says.html) as having [security holes](http://www.extremetech.com/computing/133448-black-hat-hacker-gains-access-to-4-million-hotel-rooms-with-arduino-microcontroller), and the first thing on your mind when you boot up your robot chef is probably not "how secure is my data", but it should be! So next time you fill in a hotel feedback form, be sure to query the ability of passing hackers to set off the sprinkler systems. And when you're architecting for the Internet of Things, ensure you use a private cloud and address security FIRST. 
