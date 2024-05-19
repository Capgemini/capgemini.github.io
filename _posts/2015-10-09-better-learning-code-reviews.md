---
layout: post
title: "Better Learning Through Code Reviews"
description: "The hows and whys of making code review part of a development workflow"
category: Learning
author: malcolm_young
tags: [Learning, Development, Workflow, Code Review]
comments: true
share: true
---

One of the main reasons I wanted to join a big company was the opportunity to learn. I wanted the chance to work on bigger projects with colleagues who've been there and done that, and to benefit from their experience.

In the 4 years I've been at Capgemini, I've been lucky enough to get those opportunities, and for me, the thing that has been the most helpful in terms of my own learning has probably been code reviews - both other people reviewing my code, and me reviewing other people's code.

## Why?

Some people say [code reviews are a waste of time](https://ihofmann.wordpress.com/2012/10/12/five-reasons-why-structured-code-reviews-are-waste-of-money/), and if they're talking about what code reviews used to be, I'd be inclined to agree. The idea of scheduling [a set of formal meetings](https://en.wikipedia.org/wiki/Fagan_inspection) where a bunch of developers get together and go through a file line by line seems ludicrous nowadays.

Thankfully, it doesn't have to be like that any more. With modern tools, code reviews are far more efficient. They're an integral part of our workflow at Capgemini, and are [vital in improving the quality of our code](http://www.tsphethean.co.uk/blog/2013/11/28/Reviewing-code-reviews/).

### More haste, less speed
Velocity is a term that gets used a lot, and it's generally agreed that high velocity is a good thing. But sometimes, when a team of developers gets into their stride, they can resemble a team of galloping horses. Too much change in a short space of time can be overwhelming, and it can sometimes be good to create a bottleneck to slow down the pace of change and make sure that the change is appropriate. Besides, code reviews and the improvement in quality they bring about can actually [increase productivity](http://blog.codinghorror.com/code-reviews-just-do-it/).

### Keep it clean
Once bad code has entered the code base, it can be very difficult to get rid of it. You may think that you can take care of coding standards and unit tests once you've got a few more high-priority tickets out of the way, and got your project manager off your back, but the truth is that [you probably won't get round to tidying up later](http://on-agile.blogspot.co.uk/2007/04/why-you-wont-fix-it-later.html).

Code reviews are the ideal place to ask questions like:

* Does this code actually solve the right problem?
* Does it solve the problem in an appropriate way?
* Is there unit-test coverage?
* Is the code secure?
* Is it likely to introduce any bugs?
* Does it comply with relevant standards?
* Are there any relevant accessibility considerations?

Don't imagine that you can rely on the QA team to catch any bugs that might be lurking, or that the developers are too busy for this sort of thing. The test team have got enough to do already, without devs deploying shoddy code onto the test environment.

### Pour encourager les autres
Code reviews are an ideal place to encourage a mindset of [caring about quality](http://tech.trivago.com/2015/08/31/culture_of_quality/). They're an opportunity to reinforce positive values within the development team, and get everyone thinking about how the code base can be improved.

The code review can also be a springboard for conversation, and an opportunity to explain the thinking behind a code change (although beware of the temptation to [bikeshed](https://en.wikipedia.org/wiki/Parkinson%27s_law_of_triviality)).

For these reasons, the reviewers shouldn't just be the senior devs - quality is everybody's responsibility. Similarly, the senior members of the team shouldn't imagine that [their code doesn't need to be reviewed](http://blog.8thcolor.com/en/2014/04/5-reasons-you-are-not-doing-code-reviews/). Reviewers don't need to be the subject matter experts for that feature. Even if the review comments are "I don't understand this code" - that's a sign that the code may need more comments. In fact, code reviews are a great way to ease people into learning about new areas of your codebase.

### Lessons learned
Everyone makes mistakes, and if you don't realise that it's a mistake, you'll never be able to learn.
For junior developers, or even those with more experience, it's easy to get into bad habits, especially if you're used to working on your own. Pull requests can be a fantastic learning resource - a chance to see the workings of your colleagues' minds, to consider alternative approaches to solving problems, and to ask why a particular approach has been chosen.

## How?
Hopefully you see the value of doing code reviews, and either they're part of your workflow already, or you're planning to start doing them. So I'd like to share a few ideas about improving the quality of the code reviews, and hopefully that will help to improve the quality of the code itself.

### The right tool for the job
When we moved from SVN to Git a couple of years ago, we had the opportunity to put a system in place. By using a feature branch workflow, pull requests become part of the process, and in theory no piece of code should go live unless it's been reviewed. So it's important that your tools support you.

GitHub pull requests are good as far as they go, but code review tools like [Bitbucket](https://www.atlassian.com/software/bitbucket) provide more advanced features, which we've found to be really useful. For example:

#### Approvals
Reviewing isn't just a case of looking at code, but of signing off that you're happy for it to go live. Bitbucket includes the notion of approvals, and allows you to require a certain number of approvals before the pull request can be merged.
One important thing to check is whether the repo is set up so that approvals are cancelled when more changes are pushed to the branch - annoyingly, this doesn't seem to be the default.

#### Granular permissions
Per-branch permissions can be set up so that only certain members of the team can merge to the main branches - this helps to keep team leads aware of what changes are going to go live.

#### Tasks
Another nice feature of Bitbucket is tasks - you can add a checkbox to a comment, and set your repo up so that pull requests can't be merged while they have tasks outstanding. For instance, you can approve the pull request with the caveat that something needs to be fixed before it gets merged.

#### Comments
One of the drawbacks of GitHub pull requests is that when someone pushes changes, the diff view will no longer show comments from previous versions, whereas Bitbucket will still show comments on lines that haven't changed since the comment was made. The other nice thing is that you can easily see which changes you've already viewed - especially useful in pull requests that go through a lot of iterations. A useful feature that was in Crucible (Atlassian's SVN code review tool) but not in Bitbucket, is an indicator of what percentage of the review each reviewer has viewed, so you could get an idea of whether you need to chase up the reviewers. Nice, but not enough to make me want to go back to SVN.

#### Integration and automation
The other good thing about Bitbucket is that it plays nicely with our issue tracker. We have quite a granular workflow set up in Jira, and a lot of the transitions are automated. For example, when a pull request is created, the relevant ticket goes into "Code Review" status, and when the pull request is merged or declined, the status is updated again. We also have integration between Jenkins and Jira so that when the test environments are built, it updates the status of tickets pending build, and the QA team can see which tickets are ready for testing.

This is great, because it means no more nagging people to update the status of their tickets - it's easy to see the current state of play for any of our projects, and to trust that the status reflects the truth.

[Computers are better at boring jobs than humans](http://www.cgpgrey.com/blog/humans-need-not-apply). Boring jobs like checking that code comments are correctly punctuated and indented. I've written before about [the importance of coding standards](http://www.red-route.org/articles/keeping-clean-why-coding-standards-are-important), and while it may come across as pedantic, when code is written according to standards, it's much easier to debug.

Tools like [overcommit](https://github.com/brigade/overcommit) make it simple to integrate code linters into your workflow, and in our [standard Vagrant box]({% post_url 2015-10-02-developer-automation %}), there are pre-commit hooks in place to prevent commits which violate Drupal coding standards. So hopefully this saves reviewers (and the author of the code) from the dispiriting experience of dozens of comments about indentation - much better to get the machine to do the nagging for you.

More importantly, you can set up a continuous integration server to make sure that the change isn't breaking any tests. For example, whenever a developer pushes to our repos, it triggers Jenkins to run unit test builds on that branch. If your pull request has failed builds, it can't be merged.

### Check yourself before you wreck yourself
When (or even before) you create a pull request, look at the diff in the code review tool. Before your colleagues look at the change, you should be your own first reviewer. The context switch from editing to reviewing can help you to see the code you've written in a different light, and this can sometimes highlight errors or omissions.

### Little things please little minds, while bigger fools look on
Ideally, pull requests are small - [attention fatigue](https://twitter.com/iamdevloper/status/397664295875805184) means it's almost impossible to thoroughly review large changes. When the diff view is a sea of red and green, it's really hard to be sure that you've got your head around everything. In extreme cases in Bitbucket, you'll see "This pull request is too large to render. Showing the first 1000 files." Seeing that message gives me the fear.

When a pull request is bigger than a couple of files, it can be a sign that you might not be splitting your tasks into small enough units. Sometimes it can help if developers create a feature branch, and branch off that for smaller tasks, so that when you come to do the big merge into the main branch, the code has already been reviewed in small chunks.

### Don't just look at the code
If in doubt, check out the branch and test it yourself. It's a really good habit to get into, especially for larger changes that may need a bit more consideration. It may seem time-consuming, but it's much quicker to find problems *before* they get into a code branch that will be going live.

### It's good to talk
Sometimes online comments aren't the best way to communicate. Especially when changes are complex, or if a pull request needs a lot of work, talk them through together. Nobody wants to be on the receiving end of a big pile of negative comments. If it seems like someone needs a lot of guidance, maybe [pair programming]({% post_url 2014-11-21-pair-programming-budo %}) would be a better approach.

### Sharing is caring
When you're making a comment, don't just tell your colleague that their code is bad. It's really helpful to give examples of how it could be improved, or link to useful articles that will help people understand why you're making that comment. For instance, when I'm reviewing CSS by junior developers, I very often find myself linking to the [Drupal coding standards](https://www.drupal.org/node/1887862), or an explanation of [why hover styles should be accompanied by focus styles](http://www.456bereastreet.com/archive/201004/whenever_you_use_hover_also_use_focus/).

### Love the sinner, hate the sin
Some developers dread code reviews. I think we're lucky in that the atmosphere within our team is very supportive, but I can imagine in some organisations a code review could feel like a trial by fire. It should go without saying, but code review comments should never get personal. The aim is to improve the quality of the team's code, not prove that you're cleverer than your colleagues.

The other thing to remember is that criticism isn't just about pointing out things that are wrong. It can have a really beneficial effect on morale to make positive comments about something someone has done well.

## We're getting there
Over the last few years, code reviews have really helped our team to improve and learn a lot, and we've come a long way towards a culture of quality, but there's always room for improvement. There are more quality checks that we can automate, but top of my wish list would be to [spin up a test environment for each pull request](https://www.lullabot.com/articles/github-pull-request-builder-for-drupal). I'd also like to get more front-end quality checks automated, perhaps including performance metrics using a tool like [devperf](https://github.com/gmetais/grunt-devperf), or visual regression testing using [Wraith](https://github.com/BBC-News/wraith) or [Backstop](http://garris.github.io/BackstopJS/).

But even if you don't have robots doing all that clever stuff, if code review is part of your process, you're going in the right direction. And besides, no matter how much you automate, you'll still need someone to use their judgement.
