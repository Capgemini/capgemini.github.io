---
layout: post
title: Understanding and Addressing our Waste
description: "Waste in software, what is it and what can we do about it?"
published: true
category: Agile
author: satvinder_hullait
tags: [Development, Agile]
comments: true
share: true
---

How often do you find yourself having to wait for an event to happen so you can progress what you are trying to do?

* Waiting for your application to build?
* Waiting for someone to code review so you can commit?
* Waiting for a new deployment in the test environment so you can test new functionality?
* Awaiting a response from a client?
* People cancelling attendance to workshops so you need to reschedule?

These are all types of waste, why should we suffer from them?

## Understanding our Waste

What I mean when talking about waste is the time we are taken away from being fully focused on a task. When we give full attention to a task we start to get in to [the flow](http://psygrammer.com/2011/02/10/the-flow-programming-in-ecstasy/), being focused becomes difficult if for example you are constantly being pulled into lots of meetings or your computer keeps crashing and your waiting for it to catch up.

Now I'm not saying this is the case all of the time but normally there are areas of waste in most projects in some way, shape or form. Off the top of my head some examples of waste:

### A problem that is out of our hands (Even though we might have a solution):

* The client desktops we need to use are slow and crash frequently, inhibiting our ability to work efficiently.
* Restrictions on what tools we can use to communicate with our team (this problem is more prevalent in a distributed team)

### A problem that may be within our control:

* It takes 4 hours to deploy to an environment so testers can start testing newer functionality (which means either you stop all testers for 4 hours during the working day or make one wait until the next day to test), possible solutions are;
	* Set up a CI environment with a streamlined deployment process
	* Analyse why your deployment takes so long and start working on a fix for it.

* Stand ups are too long or not focused enough, possible solutions are;
	* Have the right number of people who are relevant to the stand up
	* Ensure people turn up on time
	* Try to keep it time boxed so each speaker must be succinct
	* Take things offline

These are just a few possible areas of waste on a project, each project is different and  will have its own set of challenges and external influences. However for the most part there is always something we can do to improve our projects, thus improving our working day, by reducing waste. People who are familiar with Lean may have heard of the 7 types of waste or Muda (if you haven't heard of it before, here are a few links for reading: [the 7 types of waste](http://leangenie.com/7-wastes/), [Muda](http://en.wikipedia.org/wiki/Muda_(Japanese_term)), [Seven Wastes Software](http://agile.dzone.com/articles/seven-wastes-software). I'm keen not to cover it here as I believe it's deserving of a separate post.)

## How do we address our Waste?

### Working out what the Waste is

Firstly before we start trying to address our waste we need to work out what exactly it is, for the most part we all love a good moan, so it's not difficult to get the ball rolling in this area. The important part is to have a team environment where we have a willingness to change and adapt our processes (be 'Agile') and create a safe collaborative environment so people aren't scared to suggest improvements to process.

Trying to work out what our waste is can be a struggle if we don't have the right focus; luckily most projects that we work on these days tend to be some flavour of Agile. So we have the ability as a team to ask ourselves in a retrospective, what has been inhibiting our productivity or causing us to be frustrated during our work day.

Ultimately it is the project team who know what the areas of waste are; this is due to the fact the team has to face it, day in day out. We tend to know what the solution is but we are a little hazy on how we go about implementing it, hence why it's beneficial having the time in retrospectives to discuss.

### How do we deal with it?

Talking about waste can kick start the thought process on how we could deal with it. Writing down our issues is good practice, as we start to get visibility of them, it's important to make sure we commit to actually addressing them. There is no point in having a wiki page with 100 issues on and just adding to them each retrospective without tackling any of them.

A key part of looking at a solution is to ensure the action we decide to take, is achievable and measureable. By getting feedback quickly and frequently we can make several small adjustments (but that is also dependent on what the problem is). We need to set a timescale in which we can say if our experiment has been a success, we need more time to judge or we need a different solution (I believe one 2 week iteration is an ideal timeframe). We don't always have to fix something in one iteration either, it may take a few to mitigate an issue. That is because dealing with waste can be the team adopting a slightly different way of working and that doesn't happen overnight. We should look to always look to break down the solution we come up with into small, achievable and measureable tasks.

Just because we deal with some of our waste it does not mean we will all start working at 100% all of the time every day, we still need that level of slack in a team where people are not being overworked. An analogy I once read was _"you wouldn't want your CPU working at 100% so why would you want your team doing that?"_

When thinking about an area of waste we need to run it through a thought process, see below for an example workflow:

#### 1.) What is the "real" problem?

  * Identifying what the problem actually is before we think about how to solve it
  * This is probably the most difficult part of the process as a lot of the time we tend to see symptoms of a problem and not the root cause.

#### 2.) Is the problem within our remit/interest to fix?

  * There are times when our areas of waste are caused by external influences. Our first port of call should be to attempt to resolve things by speaking to the right people about this issue, however communication channels aren't always in place to allow these discussions to happen. There will also be situations in which our hands are tied, so we instead capture metrics and attempt to create a well reasoned case.
  * It is normally in our interest to fix these problems, but the timescale in which they are done can vary. Sometimes it could be better to leave and monitor an issue over a longer period of time, due to the fact it can expose wider issues, again this is normally caused by external influences.
  * If we can fix a problem and it adds value to the team we should always try to do it, provided it's not to the detriment of a successful delivery or cost too much.

#### 3.) What is the driver for doing this?

  * What value will we get out doing this, why do we want to do it? This is perhaps the most important question. We always strive to 'add value' in terms of technical stories, it's the same for improving the way in which we work.

#### 4.) How feasible is this to tackle?

  * What is the solution to this problem?
     * Cost versus benefit (If cost is too high, alternate workflow?)
     * Have we got the people to do it?

#### 5.) Is there any risk to implementing the solution?

  * We need to understand the effects of what we do, if fixing one thing breaks several others is it worthwhile? For instance, if we are updating a class that effects the way a web page works, have we got a comprehensive set of both unit and automated regression tests we can run, to ensure we have not caused any unwanted side effects?

It's also a good idea but not always practical to run a root-cause analysis on why these problems have occurred as well. (If you are unfamiliar: [5 whys wiki](https://en.wikipedia.org/wiki/5_Whys), [5 whys](https://www.mindtools.com/pages/article/newTMC_5W.htm))

### Scenario:
An application takes 20 minutes to build and deploy locally and you need to do this to see any change you make (even if it's a HTML change - bit of a dramatisation as there are normally workarounds).

#### What is the "real" problem?
The problem may feel like a number of things e.g. a redesign of our system is needed (this may be our root cause), the symptom we see is that when a developers makes a change, it takes 20 minutes to see if it renders as expected on the UI. However the real problem here is that the developer keeps getting disrupted, so they are likely to get frustrated if this happens constantly as it's delaying them completing a task.

#### Is the problem within our remit/interest to fix?
Yes, both within in our remit and interest to fix.

#### What is the driver for doing this?
Reduce the turnaround time for developers to be able to complete the coding for a story and allow developers to get into a flow for a longer period of time, without constant breaks, whilst waiting to redeploy. By reducing this turnaround time it means our testers can get started quicker, meaning we get closer to delivering value quicker.

#### How feasible is this to tackle?
A solution is to upgrade a core part of the system.
However the cost of doing this whilst implementing business critical stories is just not feasible, despite the time we could save.
So an alternative solution is to use a tool like [JRebel](http://zeroturnaround.com/software/jrebel/) which reloads changes instantly. Whilst this doesn't actually fix the problem with the application, it does mitigate needing to redeploy for every change. However there are some changes that will require a redeploy and rebuild but this won't be as frequent. The cost here is a need for licenses and a slight learning curve on how to use the tool, but the benefit outweighs the cost of a license. Also the cost of a license is less than the cost of upgrading the system.
We only need one person to understand the tool and then transfer knowledge to the rest of the team.

#### Is there any risk to implementing the solution?
Little risk, only a bit of a learning curve and knowledge sharing is required for how to use it.


### How do we measure the success of our solution?

So, once we've worked out what our waste is and we've started to address it, the next step is to track our progress. It's important we capture metrics on this. There are a few ways in which this can be done:

* An opinion poll in the stand up 'How are you feeling about issue X' and get a rating off each person - this can be a little to repetitive though.
* Capture it in the retrospective say, 'Since our last retrospective has issue X become less of an issue?' and dedicate sometime in the retrospective to for this issue.

Too often we get bogged down into the "what went well, what didn't go so well, what can be done better" style of retrospective, I feel like it isn't always the best format as  it is difficult to get the valuable feedback we need from it. Especially when we have a focus on improving our productivity.

It's also a good idea to keep sight of the issue, even if we feel it has been mitigated, as sometimes it's easy to fall back into old habits unless we remind ourselves why we made a change.
We need to be able to define a state of done for improving our process and addressing the waste. This can be done in a similar fashion to how we create a Definition of Done for our software tasks; it just requires us to think about what our desired outcome should be when we are addressing something, by keeping our tasks small and measurable it becomes easier for us to say when we've achieved something.


## Conclusion

Ultimately time is a valuable commodity, which we can't get back, so why should we waste it? Time is money, time that we spend waiting for stuff to happen so that we can be productive is wasting the clients money and our time. This also applies to our own personal lives and processes, even stuff as simple as how we commute to work and making some small, incremental changes can add great benefit.

I believe that we have lots of examples of waste around us in our day to day lives; it's about being able to identify them and trying to fix them in order to increase the quality of our day. Personally I feel good about a day's work when I've been able to crack on and be productive, however when I've just been caught up and not been able to deliver value I find that I leave work feeling frustrated.

At the very least we need to be able to identify our areas of waste, as a result of doing that we can start to work on fixing them iteratively and measuring our progress as our iterations go by. We don't always need to focus on the big issues either, sometimes it's just as good getting several small wins. Whilst writing this blog, I was put on to the concept of ['marginal gains'](http://www.bbc.co.uk/sport/olympics/19174302), which was a major factor in the success of the 2012 British Olympic Cycling Team: "The whole principle came from the idea that if you broke down everything you could think of that goes into riding a bike, and then improved it by 1%, you will get a significant increase when you put them all together"

We should be able to apply this concept to developing our software, everything from gathering requirements, writing code, system testing functionality through to our deployment process (each of these area's comprise of several smaller things but just for a high level example). If we improved each area by just 1% we would be well on our way to getting rid of some of our waste, delivering value to our customer quicker and improving our working day.
