---
layout: post
title: How Not To Lead A Team
description: "Some common mistakes by project managers and lead developers"
comments: true
author: malcolm_young
category: Learning
tags: [Teams, Leadership, Psychology, Culture]
---

In [my previous article about good lead developers]({% post_url 2016-02-09-seniority-serendipity %}), I said that there was another story, about some of the bad leaders I've worked with. Well, it's time to tell that story.

Initially I was reluctant to focus on the negatives, but it's just as instructive to look at what has gone wrong in the past, and hopefully we can learn from the mistakes of others. Here are a few of the leadership anti-patterns I've seen.

## Not enough information
Knowledge is power, and some misguided leaders try to hold on to their power by keeping things hidden from the team or the client. Perhaps their project is behind schedule, and they try to save face by covering that fact up through dishonesty, misdirection, or being economical with the truth. This is almost never a good idea. As [Mark Twain suggested](http://www.brainyquote.com/quotes/quotes/m/marktwain133066.html), the truth is much easier to remember, and openness is easier to manage.

I once had a very awkward weekend in the office during a particularly stressful UAT period, being asked difficult questions by a client who had been kept in the dark by the project manager about the state of the project. Because I wasn't sure what the official position was, I had to walk a diplomatic tightrope between annoying the client and dropping my manager in it. It's much healthier to build [a culture of transparency](/devops/transparency-of-things), and develop longer-term relationships (with both clients and colleagues) based on trust.

## Too much information
Sometimes information should be shared on a need-to-know basis. Don't drag everyone and anyone into endless meetings, and remember that a stand-up should be short. Don't waste everyone's time by going into minute detail on every little issue.

Don't forget [how expensive meetings are](https://medium.com/next-blog/meetings-are-expensive-and-wasteful-7df05d0c9f71#.fpsuzy4js), especially for people who work on [the maker's schedule](http://www.paulgraham.com/makersschedule.html) - do you really need to talk through that document, or can you just send it to people and ask them to read it and get back to you? Don't underestimate the value of a proper [responsibility matrix](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix), and always think about whether information is relevant or valuable before you clutter up someone's inbox with it.

You don't always need to get consensus, and [you don't always need a meeting](http://johnpoelstra.com/are-your-meetings-toxic/). For instance, why bother with a conference call to give a status update when the status should be available to everyone at any time by looking at your issue tracker? It can be really valuable to spend a bit of time setting up some dashboards and making sure that everyone knows where they are and understands them.

## Panic
Sooner or later, things will go wrong. They might go wrong in a big way or a small way, but they will go wrong. When they do, it's important [not to turn the problem into a big drama](https://deardesignstudent.com/don-t-adopt-anxiety-6662515d2416#.pah9ypnje). Even if the problem is a big one, flapping around and talking about escalations is generally not the most efficient way of solving it.

The leader sets the tone, not just for the team but for the client. Panic is infectious, and can inhibit the whole team from making good decisions or performing to the best of their ability. If the leader stays calm, they can project a healthy sense of calm and defuse most situations by helping to calm other people down.

## Promising the world
Far too many times, I've been part of a development team who have found themselves committed to delivering something by an unrealistic deadline over which they had no influence. All too often, [delivery dates seem to have been decided on a whim](http://www.red-route.org/quotes/ellen-ullman-dates-chosen-random) before projects have been properly estimated, and bear little or no correlation with the project scope. At the very least, before making any promises on behalf of the team, you should check (and ideally document) your assumptions regarding feasibility, availability, and capability.

Building an effective relationship with clients isn't just about saying yes all the time. Quite apart from the question of what the client *wants* and what the client *needs*, sometimes you need to say no. It's been said that "[design is much more about saying ‘no’ than it is about saying ‘yes’. Even when it’s painful. *Especially* when it’s painful.](https://ar.al/notes/design-is-not-veneer/)" I'd say the same is true of most client relationships. Being able to say no is what protects you from scope creep and unrealistic expectations, and it can help you to [under-promise and over-deliver](http://thenextweb.com/lifehacks/2014/03/30/always-promise-deliver/). The tricky part is when you need to say no to someone who's already said yes to someone else. Especially in large organisations, there's often a chain of stakeholders and a chain of promises made. Saying no is difficult, especially when the relationship is new or unstable - you may need to earn the respect that means people will listen when you say no, and sometimes the only way to earn that respect is to say yes and slog through the consequences.

## Micromanaging
I once worked with a manager who had a nasty habit of leaning over a developer's shoulder and telling him which lines of code to change. Thankfully he never tried doing that with me, probably because my body language made it pretty clear that I wouldn't tolerate backseat driving.

Designers suffer from this more than developers, and most of them have got horror stories about clients who want to [push pixels back and forth](http://clientsfromhell.net/post/102528264229/client-can-you-move-it-5-pixels-to-the-right). That tends to be less of a problem for developers, probably [because of the more specialised subject matter](http://theoatmeal.com/comics/design_hell), but it can happen. Your team members have been hired because they (hopefully) know what they're doing - you need to trust them to get on with their jobs.

## Responding too quickly
We've probably all had the experience of hitting send on an email, and immediately noticing something wrong with the message we've just sent. So many times I've seen someone desperate to get something off their desk, and by rushing their response they cause extra confusion, setting off a vicious circle of more emails. It can be a problem for everyone, but it's especially harmful when it comes from the person who's supposed to be setting the tone for the team, and even more so when you're in the planning stages of a project.

The best way to prevent that problem is to take the time to read emails carefully and make sure you understand them before starting your reply, and to slow down and read your own message through before sending it.

## Not responding quickly enough
Some people I've worked with have taken a perverse pride in the number of unread emails in their inbox. It's not healthy, and it's generally unnecessary. It isn't difficult to set up rules to get rid of the automated notifications.

If you're going to be unable to get back to people for a while, let them know. Whether that's setting up an out-of-office reply, or just a Slack message to tell people not to expect an answer straight away, it's helpful to set expectations.

Incidentally, it may seem obvious, but I've worked with a surprising number of leaders who absent themselves from their team's preferred communication channel. If your team is using Slack, you should be using Slack. You may want to mute some of the channels so that you're not driven mad by the noise, but you should at least be checking in from time to time to make sure you don't miss anything important.

Especially if you're in charge, don't let yourself become a bottleneck for the project.

## Not delegating enough
Sometimes people don't respond because they've got too much on their plate. Perhaps they don't trust their colleagues enough to do the job right, or perhaps they see themselves as some kind of hero. Whatever the reason, it's not a good idea. They become a single point of failure, and their junior colleagues never get the opportunity to learn.

## Delegating too much
Some leaders seem to have sloping shoulders, with an almost pathological unwillingness to take responsibility for anything. To me, this doesn't really count as leadership - sooner or later you need stand up and be counted, even if it's just to justify your salary.

## Divide and conquer
Creating a 'them and us' mentality is harmful. When walls are constructed between participants in a project, whether that's between vendor and client, developers and testers, or particular individuals, something is lost. The most effective projects I've worked on have been the ones where everyone involved shares a common goal, and feels [invested in the project's success](http://www.danpontefract.com/defining-a-leaders-duty-of-care/).

I once worked with a project manager who had the remarkable knack of persuading the client that all the problems were the fault of another team. It made us popular with the client for a while, but it also made our colleagues unpopular with them, which made us unpopular with our colleagues. Eventually, and inevitably, it came back to bite us.

## High horses and ivory towers
A team shouldn't work *under* a leader, they should work *with* them. There's probably no quicker way to make people resent you than to behave as if you consider yourself more important than them, or your time more valuable than theirs. It's unlikely that you'll get the best out of people if they don't respect you, and it's unlikely that people will respect you if they think that you don't respect them. Every member of the team deserves to be treated with respect, no matter what their pay grade.

One key element in treating people with respect is listening to them. As has been previously noted, there's a reason we have [two ears and one mouth](https://www.goodreads.com/quotes/738640-we-have-two-ears-and-one-mouth-so-that-we). Don't talk over people, and don't treat meetings as your opportunity to tell the team how things are. If your team has concerns, pay attention. If they're struggling with something, remember that [what seems trivial to you may not be trivial to others](http://bradfrost.com/blog/post/just/). 

If there's dirty work to be done, don't dump it on the juniors. If the team ends up needing to work on a weekend (and [this should almost never happen](http://blog.smartbear.com/sqc/an-agile-pace/)), it shouldn't just be the developers and testers who get lumbered with it. Even if all he or she is doing is making tea and ordering pizza, the manager should be there. After all, we're all in this together...

## Lack of planning
One project manager I worked with put great store in "setting yourself up for success". It's an admirable idea, but for him, in practice it meant making sure that the early sprints were full of easy targets that the team would hit without problems, with the intention of keeping the client happy. The trouble was that there were dragons lurking in the long grass of the later sprints, and we all knew it.

"Failing to plan is the same as planning to fail" may be a cliché, but there's a lot of truth in it - without sufficient preparation, you're doomed to be perpetually reacting to events, lurching from one crisis to the next, and always playing catch-up.

## Excessive planning
Without wanting to get into re-hashing the benefits of agile over waterfall, it seems fairly uncontroversial to say that requirements change, and when they do, the plan will need to change. If nothing can happen until you've amended your Gantt chart, the team is in trouble.

Writing this, I've noticed a couple of common threads running through a lot of these points. The first is short-sightedness. When a leader is only focussed on their immediate goals, and the problems that are officially their responsibility, it's likely that they'll fail to see potential problems. The second is lack of respect for colleagues and clients. So maybe this can be summed up by saying that leaders need to slow down and think a bit more about how their behaviour affects other people.