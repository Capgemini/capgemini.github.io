---
title: "How To Ask For Help"
description: "Helping other people to help you by asking the right questions in the right place in the right way"
summary: "Helping other people to help you by asking the right questions in the right place in the right way"
category: Development
author: malcolm_young
tags: [Development, Culture]
---
So you have a difficult problem to solve, and you’ve decided to ask for help with it. Congratulations! Recognising you’ve got a problem is the first step to solving it. Nobody knows how to solve every problem, so [you shouldn't feel bad about needing to ask for help][clever to admit]. The next step, which a lot of people find difficult, is to do the asking in a way that helps people to help you. This article aims to help you with that.

A lot of what I want to say here is already covered in Eric Raymond's classic essay [How To Ask Questions The Smart Way][the smart way], and I'd recommend reading it. Having said that, it was written in 2001, with open source hackers in mind, and isn’t the easiest read (not least because of the aggressive tone, which hints at some of the [troubling aspects of the author's worldview][ESR]), so I want to write a newer, kinder version, with some of my own ideas added.

## What's your problem?

Before anyone can solve a problem, they need to know what the problem is. If you want people to help you, help them by providing a clear and concise explanation of what it is that you need help with.

Being able to explain things clearly is one of the most important skills a developer needs in my view, both when dealing with clients, and when [helping teammates to learn][how we work]. When I interview developers, one of the things I want to know is whether they can explain concepts clearly and without assuming prior knowledge.

## What have you done for me lately?

Most people generally want to be helpful, but [context switching is a big problem for anyone who needs to solve complex problems][Context switching], so when somebody is trying to help you, they’re already giving you a big piece of their attention and energy - don’t make it harder than it needs to be to help you.

Hopefully you haven’t just given up at the first hurdle and asked for help before at least trying a few different things, searching, or asking your AI tool of choice. Before other people can help you, you should do some work for yourself. If all you’re saying is “please help me with this”, you may as well be saying "please do my job for me".

## Before you ask the question

I can't say this any better than [Randall Munroe of XKCD][xkcd], so I'll share his advice here:

![flowchart of how to solve computer problems](https://imgs.xkcd.com/comics/tech_support_cheat_sheet.png)

This article is basically a more advanced version of that flowchart for software engineers.

## Why is it important to ask in the right way?

When I was at university I worked on the student union stage crew, doing sound and light for gigs and discos. We were volunteers, but as I’ve written elsewhere, [being amateurs didn’t diminish our levels of professionalism][amateurs]. We were trained and supported by a full time technician.

At the end of the night, if any of the equipment wasn't working, we had to report it to the technician, so that he could work on it the next day. One of his pet peeves was if someone reported a problem, but didn't give him any more details beyond saying "it's not working". He was a busy man, and the more information we could give him, the less time he would have to spend figuring out what the problem was, and the more time he could spend on fixing it. The people reporting the problem already knew what the problem was, so for us to spend a few moments explaining it to him would save him from having to diagnose it.

How is it not working? For example with a disco light, does it completely fail to turn on, or does it flicker intermittently? Is it dimmer than it should be?

He was happy to help, but like Eric Raymond and his fellow hackers, if we were wasting his time, he would call us out for it publicly, and his criticism would sting.

The lessons I learned there have stayed with me for a long time, and some of them are very relevant to software development. In particular, there is a lot of value in [clear and effective bug reports][bug reports], which can save developers a lot of time. When a developer needs to ask for help, you could think of it as a bug report on work in progress, and a thoughtful question will save time for the person helping.  

## Where should you ask?

Your first instinct might be to ask your team lead. After all, they’re more experienced, they’re familiar with the code, and it’s part of their job to help you. A quick message to them and they'll surely solve your problem in no time. The trouble is that they're busy, and they're not the only person on the team who can help.

You might feel shy about asking for help in your team’s chat channels, but please don’t ask for help in private messages. It’s almost always better to [ask in the channel][channel] - that way you increase the chances of somebody answering, and the rest of the team will benefit from the answer.

If it's a problem with open source code, ask in the relevant support forums for that project. For more general queries, Stack Overflow and its siblings might be more appropriate. 

Wherever you ask, it's always best to search before asking - don't waste people's time by asking a question that has already been answered.

## R(&W)TFM

You have read the documentation, haven't you? If not, then please do. The people who seem to know more than you aren't magical gurus with every answer - they've just spent time learning things. If you've read the documentation, and you don’t understand how to do something basic on your project, it's probably a sign that the documentation needs to be improved - once you've found an answer, apply the [boy scout rule][boy scout rule] to your documentation and share what you've learned.

## A picture isn't always worth a thousand words

If you have an error message, don't screenshot it - copy and paste the text. That makes it a lot easier to search for, either online or in the source code.

Similarly, a picture of some code isn't an easy way to read and understand it, and nor is chat software like Teams and Slack. If you’ve got some partly working code, or even just an idea, and you need a few pointers, please don’t dump the code into a chat. Create a pull request with your work in progress, and make it clear that it isn't ready to be merged - most code repositories have a way to [mark a pull request as draft][github draft] or [create tasks that will prevent it from being merged][bitbucket tasks].

## What are you trying to achieve?

It’s useful to know the context of your question. Sometimes it might not be the right question to ask - there may be a better way to approach the problem. The context can help other people to understand the actual problem you’re trying to solve, not just the problem that you’ve got stuck on.
If you’re halfway down the road, you might need to think about whether it’s the right path - there may be a complete different approach that you haven’t thought of.
Perhaps you're finding things difficult because you're not [working with the grain][grain] - maybe the problem can be avoided altogether.

## Isolate the problem

When trying to solve a problem, it's very easy to get distracted by other things. Is it possible to create a minimal test case that demonstrates the problem? For example, if it's a front end problem, can you create a [CodePen][codepen] that has only the elements you need to demonstrate it?

This is also a good idea for debugging generally: Be scientific. Experiment with what might fix the problem by changing one thing at a time and seeing what happens. Take notes about the experiment so that you know what made a difference, and which variables were important.

## Help yourself

If you take the time to formulate a good question, often you find that you're able to answer the question yourself. This is the basis of [rubber duck debugging][rubber duck] - the act of preparing the question helps you to understand the problem more clearly, and that can often help you to solve it without needing someone else to help. I’ve lost count of the number of times I’ve got part way through asking for help and answered the question myself, leaving the other person with nothing to do beyond accepting my thanks for their time.

If you’ve taken the time to do all that, and you haven’t solved the problem, then by all means ask for help, but remember that other people don’t owe you their time. Whether they're strangers on the internet or colleagues on your team, be respectful of the time that they are giving you, and help them to help you by asking good questions. If you ask a good question, you're much more likely to get a good answer.

I hope that this is useful, but if it isn’t clear, please ask for help (in the right way).

[clever to admit]: https://capgemini.github.io/development/its-sometimes-clever-to-admit/
[ESR]: https://en.wikipedia.org/wiki/Eric_S._Raymond
[the smart way]: http://www.catb.org/~esr/faqs/smart-questions.html
[how we work]: https://capgemini.github.io/development/how-we-work/
[Context switching]: https://contextkeeper.io/blog/the-real-cost-of-an-interruption-and-context-switching/
[xkcd]: https://www.xkcd.com/627/
[amateurs]: https://red-route.org/articles/close-enough-side-project-how-know-when-things-are-good-enough
[bug reports]: https://capgemini.github.io/testing/effective-bug-reports/
[channel]: https://capgemini.github.io/culture/ask-in-the-channel/
[boy scout rule]: https://snappify.com/blog/boy-scout-rule
[github draft]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request
[bitbucket tasks]: https://support.atlassian.com/bitbucket-cloud/docs/review-code-in-a-pull-request/#Create-tasks
[grain]: https://capgemini.github.io/drupal/module-already/
[codepen]: https://codepen.io/
[rubber duck]: https://rubberduckdebugging.com/
