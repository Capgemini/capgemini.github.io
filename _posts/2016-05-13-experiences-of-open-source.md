---
layout: post
title: The ramblings of an open source newbie
category: Open source
author: gareth_sullivan
description: Some thoughts and opinions on a first foray as an open source contributor
summary: Some thoughts and opinions on a first foray as an open source contributor
tags: [Development, Open source]
comments: true
share: true
---

As with most developers, I've used open source software.  As with most developers I expect to find this free, well documented, easy to use software within a few clicks and I expect it to perform and to deliver the advertised functionality.

Having never contributed back to any open source projects, I was lured into helping with the newly created [spring-boot-capgemini](https://github.com/Capgemini/spring-boot-capgemini) project that would provide some useful common spring boot starters.  With Spring (and I still don't know how this happened) being very new to me, it seemed a useful and effective way for me to put some of the theory into practice.

I'm no writer, so some bullet points with some of my thoughts, experiences and perhaps some prompts for discussion will have to suffice.

## "I think I'm alone now"

Joining the project opened up multiple lines of communication via github issue tracking, emails, & [slack](https://slack.com/).

I missed the face to face contact and the quick "can you just look at this over my shoulder, it's bound to be something stupidly obvious".  Slack was bamboozling me with too much detail - commits, builds and IMs notification were popping up continuously.

I suggested a few changes to minimise the noise, but this resulted in a longer than expected discussion and debate, which again I felt could have just been sorted quickly had we sat down and discussed.

I struggled when I got stuck with things - this wasn't like my day job, I couldn't tap up the many experts available to me.  The usual suspects (Google, StackOverflow) were useful to a point, but i did spend some time staring at slack, waiting for one of the other guys to come on line!

## Learning curves

As previously mentioned, being new to Spring and Spring Boot I expected to struggle - but there were far more hurdles in the way than I expected.

Gradle? Where's Maven?  GitHub? Where's SVN? Jenkins....where are you?

I see this as a plus - being dragged out of your comfort zone and learning new technologies because you need to.  You have some context and specific goals, so you are more driven and focused to get past specific and relevant hurdles, rather than picking up something new, getting "Hello World!" out of the way and then wondering where to go now.

## "What's the number for the guys in support?"

I took on the task of integrating the repo with a build system.  I realised how spoiled I was on my day to day project work, with Jenkins a click away and someone else to fix and maintain it.

Finding a solution compatible with our private repo was a challenge, but [circleci.com](https://circleci.com/) was chosen,	and again, configuring it, picking up YAML and getting it all working seamlessly, was down to me.  

On the flip side, you're not bogged down with someone else's choices - your project can have what you like as long as you sort it out and maintain it, although I imagine on an open source project of any serious scale, democracy and/or mob rule and even a [dictatorship](http://www.theatlantic.com/technology/archive/2014/01/on-the-reign-of-benevolent-dictators-for-life-in-software/283139/) decides the technology and infrastructure.

## Quality Control

Checkstyle issues breaking the build! I wasn't expecting that, but at its inception it was the right time to make decisions like this.

No time or cost considerations, no imminent deadlines - why not strive for the highest quality software? I have heard horror stories of simple pull requests turning into scathing attacks on people's work, warring factions and even submitters not toeing the line being banned!  

This [story](http://www.theregister.co.uk/2015/11/01/linus_torvalds_fires_off_angry_compilermasturbation_rant/), seemingly one of many examples of the Linux guru Linus Torvalds	 throwing his toys out of the pram, are testament to the "keyboard warrior" culture present in some open source environments.

Every line of submitted code being reviewed, every checkin requiring a test - this is how it should be done. Does this discourage contributors, or does it just weed out the bad/lazy ones?

## Documentation is King

"The code is the best documentation" - a quote I've heard several times, but in open source, surely the README.md file is the most important file in the repo? This is the project's marketing, sales, and support, all in a file which will get rapidly scanned and form the basis of an opinion or decision - is this worth looking at let alone forking? Is it a serious contender compared to the competition? Is this project still even active and how well will it be supported if I choose to use it?

## Longevity

The spring-boot-capgemini repo started off strong, enthusiasm was high and activity was sustained and productive. It tailed off however, day to day account work is always higher priority, and I wonder perhaps this was inevitable?

When someone is paying for software, expecting features on a certain date, there is a drive to deliver, deadlines to hit, functionality to provide. On larger, more established open source projects I imagine this is the same, but how does a small open source project get to that point?

## Conclusion

In conclusion, I think I have ended up with more questions than answers.

The more I write the more I realise that the spring-boot-capgemini project is too small, too early in its lifecycle on which to base anything than a first impression of open source. I don't feel I can make any firm opinions or judgements until I have looked into and/or contributed to a number of open source products, and that goes beyond just pulling in the jar as a dependency.

That's the great bit - the transparency, clue's in the name, "open" source ! I can find how the libraries I use day to day are written, tested, documented, versioned, and released. I don't need to be an active contributor, until I feel ready, and I choose what I contribute.

I'm sure in time I'll look back on this as a bit of a naive blog entry, and hopefully come back with some answers, backed up with experience.
