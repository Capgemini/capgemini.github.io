---
layout: post
title: "Answering: How long will it take?"
description: "Estimation, a developer perspective"
category: Agile
author: tom_phethean
tags: [Development, Agile, Estimation]
summary: "How long will it take?"
comments: true
share: true
---
> "How long will it take to build my [thing]?"

A seemingly simple question that can strike fear into the heart of many developers,
estimation is both essential and thankless at the same time. As a developer, you might
feel you can never win - always asked to do things quicker - whilst a project manager
usually wonders why developers estimates are inaccurate. In this post I hope to share
some techniques that have helped me along the way, and might help reduce the pressure 
on justifying your estimates!

#### It's only an estimate

The first thing to remember, is that an estimate is:

> "an approximate calculation or judgement of the value, number, quantity, or extent of something...
Synonyms: approximation, evaluation, **guess**"
[The Oxford Dictionary](http://www.oxforddictionaries.com/definition/english/estimate)

So, estimate equals guess. Done properly, it should be at lease be an educated guess but your estimate
is always going to be
flawed in some way, something will change, be discovered, or interfere and mean you're not going to
be 100% correct. In fact, we can go further and say: you'll almost always be wrong.

Getting it wrong doesn't matter, it's part of the learning process and feeds back into making future
estimates better.

Simply take note of why your estimate was wrong, and make sure that the next time you are coming up with
an estimate you consider whether the factors that de-railed your previous ones will apply in your new scenario.
The aim should to be "less wrong" next time.

<!-- break -->

#### Never answer right away

How many times have you been asked how long something would take, maybe
in your daily stand-up, and quickly responded "by the end of the day" or "end of the week",
without really thinking the estimate through? Sometimes you might get lucky and things pan out ok,
but many times these instinctive estimates don't think through the problem properly and
often take longer than first given.

Now that's fine, it was only an estimate after all, but you've set an expectation and in all likelihood
you're going to end up working extra hours to make it happen to avoid disappointing someone.

The best tip I ever read, came from reading [The Pragmatic Programmer](http://pragprog.com/the-pragmatic-programmer),
and went something like:

> "You almost always get better results if you slow the process down... Estimates given at the coffee
machine will come back to haunt you."

Step away from the discussion, ask for time to analyse the problem, even if its half an hour to organise your thoughts,
before giving an estimate and ensuring it's an answer you believe in.

#### Break down the task

For small tasks, arriving at an estimate can be pretty straightforward, but usually we're not being asked for small
task estimates. People want to know how long adding a new feature, or building a new website, will take. The trouble with
this is that seemingly simple high level tasks can hide a multitude of traps that could inflate (or deflate) your estimate.

When faced with problems like this, the only way we can process enough information to give anything like an accurate
estimate is by breaking the task down into as many constituent sub-tasks as necessary until each sub-task can easily be
envisaged and estimated.

Break down the feature into components you're comfortable estimating. As a hint, if the estimate for any one sub-task
is longer than 3 or 4 days, you probably need to break it down further. But having said that, don't make any task smaller than
half a day in your estimates - even that trivial one line code change will need regression testing, unit tests tweaking,
functional tests updating, and code review performing, so it's never "just a 10 minute change".

One word of warning though - you're not trying to do a detailed design here, just trying to get tasks or stories at a
level granular enough for you to know roughly what you're going to need to do.

#### List your assumptions

Every estimate is based on some assumptions you've made, so make sure you share these when presenting your
estimate back to whoever asked for it. If you think there are no assumptions, then have a look through the list
below and see if any would apply:

My estimate is accurate as long as ...

* ...I get uninterrupted time to focus on it
* ...the environments are configured correctly
* ...I can re-use component X that we built last time, without significant refactoring
* ...the interface specification is accurate

Also, make sure you define "done". Will done mean that you've committed the code and run some tests locally, or that
you'll have followed the change through various environments and its ready to be pushed into the next Production release?
Regardless of how you define "done", this is one of your key assumptions, so make sure you and the person you're
giving the estimate to have the same definition of done and therefore share the assumptions.

#### Add inflation

We've covered this a little bit when saying not to estimate any sub-task at less than half a day, in order to factor in
all the things we forget about when estimating. However, even when you add up all your sub-tasks (or put them into groups for
adding up) we should pad our larger estimates to reflect the inherant uncertainty in the longer term estimate.

For example, if your estimate is around 3-4 days, call it a week. If it's 3 weeks, then its a month, and so on. Using
larger values of time helps set expectations with your stakeholders and also lets you have contingency for the
inevitable unforseen delays that will arise. The longer the road, the more likely you'll find a pot-hole.

The other way to approach uncertainty in your estimates is to provide a timescale range rather than a fixed number,
with the size of the range depending on your confidence. For example, if you're very confident you could answer "6-8 days"
but if you're not certain of your estimate you could say "20-30 days".

#### Offer to re-estimate

Often the estimates we give, even when following the guidance above, will be padded out to reflect our uncertainty and
unknown complexities. There might be new technologies or approaches, uncertainty over the level work that will be required
 to meet a performance target, or anything else that you have little experience in on which to base your estimate.

In these cases, and to reflect the uncertainty, you could offer to re-estimate your tasks once you've completed a portion
of the work. This could be at the end of a first iteration, or initial exploratory phase, during which you're likely (again,
if following good agile practices) to have started to tackle the things which had the highest risk, uncertainty or potential complexity.

Taking this approach allows you to give an estimate, and then use new found experience to re-baseline after a short period
in order to adjust your estimates (up or down!) based on what you've learnt. It also demonstrates to a project manager
that you are mindful of trying to reign in estimates to as much accuracy as possible, but also gives an opportunity to
flag areas which turn out more complex that first thought.

Even better would be regular backlog grooming of as much of the backlog as is practical, re-visting estimates and updating
them as you progress through your project and factor in lessons learnt as you go along.

#### Look back

The number one criticisms of developer estimation is that we never learn from our bad estimates,
and so never improve our accuracy. In many ways, this is a false accusation because as we've
seen no estimate is created equal and the things that trip us up this time might not arise in future tasks,
however there is definite value in looking back and comparing your estimate with your actual,
making note of the reasons you either missed or achieved your estimate.

If nothing else, this kind of retrospective helps you identify some more assumptions that you made without
realising, and will give you a useful tool for future tasks.

#### Conclusion

Estimates are unfortunately a necessary part of being a developer, and being able to give confident, accurate
estimates breeds confidence from the rest of your project team.

If at all possible, never estimate alone - make it part of a team activity. If you're following good agile
practices then you should be doing team planning at the start of each iteration. This can be a great opportuntity to
try out the principles in this post, and learn from the things other people in your team consider for their
estimates.

I hope these suggestions are useful, if you've got more tips to share please post in the comments.

##### Further reading

- [The Pragmatic Programmer](http://pragprog.com/the-pragmatic-programmer) by Andrew Hunt and David Thomas - particularly Chapter 13: Estimating.
