---
layout: post
title: Specialism Constrains Throughput
description: Specialist practitioners are often in demand and can become a bottleneck for work.
category: Agile
author: john_shaw
tags: [Agile, Engineering]
comments: true
share: true
featured: false
---



### Why Specialisms Within a Team Leads to Constraints on Productivity

Tim, a good developer, has been working on a story. "Fred, I need the build configuration changed to pick up the new component I've added."

Fred responds, "okay, I can fit that in next week."

"Oh, it's the demo on Tuesday and we need to deploy to test it before then."

"Well I'm busy with other tasks at the moment, perhaps you should have planned ahead."

--

This sounds reasonable on behalf of Fred, the Build Engineer. He has limited availability and needs his work planned out.

But that is _exactly_ the sort of behaviour agile practices are trying to move away from. We want to move towards shorter cycles and faster feedback. We want to be able to do things now. This is the kind of problem the DevOps mentality is _supposed_ to resolve.

### Staff Liquidity

I had the privilege to hear [Chris Matts speak at Agile Cambridge](http://agilecambridge.net/ac2013/sessions/index.php?session=75) a couple of years ago. He was talking about options and availability of people. How do we make people available? Get them to do _less_. This is counter-intuitive - how do we get more done by doing less? Surely we want to give our best people (our specialists) the _most_ work?

It turns out high utilisation doesn't necessarily lead to high productivity. Plans are fragile as estimates are a guess; plans are fragile as unexpected work arises; plans are fragile as people aren't always available. Delays lead to blocked work.

Chris's suggestion was to resolve this by _not_ assigning work to the specialist. Better to get them to mentor and guide others to raise their skill level and to leave the specialist free to tackle emergency issues when they arise. Over time this resolves the dependency on key individuals and, overall, makes them available for high value work.

### Expert Level

[The Dreyfus Model of Skill Acquisition](https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition %22Dreyfus Model of Skill Acquisition%22) describes a few levels of skill, with "expert" being the top level.

It is these experts that are in short-supply. It is these experts we want to work on the critical aspects of our work. But it is also these experts that we build dependencies on.

A better model is to raise the level of the team, over time, and only consult "the expert" when needed. Of course this doesn't mean the expert cannot help out day-to-day, they can even take on some important but lower-priority work. They can also add a lot of value by reviewing work output of others and helping improve quality and technique.

Generally speaking, I've found that experts "go their own way" anyway. It's very difficult to tie-down an expert to a rigid plan. They are best off deciding for themselves where best they can add value.

### Skills Matrix

There may of course be a few areas of specialist knowledge. Chris's suggestion was to have a skills matrix and try to bring everyone up to a certain level. This won't necessarily be even across the team as people have different interests and skills, but the idea is for everyone to have a broad level of competency and one or two stronger areas.

Let's say each skill for each person is ranked 1 (novice) to 5 (expert). We probably want to bring everyone up to level 2 for all skills and have a few team members at level 4 for all skills. I haven't heard the term "generalising specialist" used for a while now (some people thought it an oxymoron!), but I like the term and I think this is what it meant. Not quite "Jack of all trades, master of none", more good at everything, but great at some.

But note I didn't suggest anyone at level 5, expert. I think such people are rarely good across the board (how would they have time?) and are in so much demand that it's difficult to tie them into a team. Better to treat them as an advisor or a consultant.

I do know one person who is actually a specialist-generalist. By this I mean he specialises in being able to pick things up quickly, being flexible, being adaptable, being approachable and most of all a great problem solver. It is this broad range of skills mixed with great soft-skills (which are underrated in his case, even by himself) which mean he is always in demand.

### Trust

Part of the problem described in my fictional (!) conversation above is a lack of trust between the build engineer and the developer.

Of course there needs to be a certain level of control, but better to trust people to do the right thing and address the occasional problem rather than never do the task and never learn.

### Restarting the Conversation

So how might that conversation go? Perhaps something like:

Tim, a good developer, has picked up a story. "Fred, I've changed the build configuration to pick up the new component I've added. It's built and deployed to the test environment so it looks okay."

Fred responds, "ah, I had noticed the build was taking a little longer than usual, I'll see if I can do something to speed it up."

"It's the demo on Tuesday so we need some stability around then."

"I'm busy with other tasks at the moment, the build should run okay for now but if there's a problem give me a shout."
