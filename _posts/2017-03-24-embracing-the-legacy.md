---
layout: post
title: "Embracing the Legacy"
description: "A post looking at how we can embrace working on legacy projects"
category: Legacy
author: greg_wolverson
tags: [Legacy, Engineering, Best practices]
comments: true
share: true
---

>“Wait what! You’re still using that version of X?!”

We’ve all been there. You’re on a new project and the first thing you’re made painfully aware of is that it is a ‘legacy’ project.

*Legacy*…

That single word is often enough to send many a developer into panic mode, followed by hot sweats and the bitter taste of disappointment. Out of reach slides the dream of a nice ‘green field’ project, where you can design, innovate and build beautiful fresh *new* code. In turn, leading to a much fuller development experience, and being safe in the knowledge that you’re going to come away with some nice shiny new skills.

I think the comic below sums up how it can feel to work on legacy projects sometimes...

![How it feels to work on legacy systems](/images/2017-03-24-embracing-the-legacy/how-it-feels-to-work-on-legacy.jpg){: .centered }

[Source](http://deathbulge.com/comics/360){: .image-source }

Okay okay, I’m painting a pretty bleak picture here, but it’s true! As developers we often get disheartened (*not quite to the point of hot sweats though I’d hope*…), when we find ourselves on a legacy project that seems frighteningly out-of-date. What’s more, we find ourselves working on some form of legacy code base more often than we do on brand new ‘[green field](http://www.donnfelker.com/software-development-greeenfield-vs-brownfield/)' systems. In addition, this isn’t likely to change anytime soon, as [legacy systems still play a large role in the enterprise workplace](http://www.computerweekly.com/feature/Legacy-systems-continue-to-have-a-place-in-the-enterprise). The thing is, legacy code isn’t going anywhere, but neither is the disappointment of coming across badly written code that’s ages old, and the drab realisation that we’re not getting to use the latest shiny software stack. However, it’s not all doom and gloom, there are ways of making working on legacy code a bit less painful and a bit more enjoyable!

It’s time to *Embrace the Legacy*…

## Embracing the Legacy

I know what you’re thinking;

‘How can you embrace legacy, it’s old and boring!’

Yes, legacy code can be *very* old and legacy systems can be somewhat boring to work with at times, there aren’t many developers who will argue that fact. However, embracing legacy projects isn’t about trying to remain emotionally stable whilst you try to make it through to the end of the project. It’s about embracing the concept and mindset that allows us as developers to utilise our skills and best practices, in order to leave any legacy project we might work on, much better than we found it.

So how do we do it?

I believe there are several important aspects to ‘Embracing the Legacy’ and I know there are many more that could be added to this list, but these are the ones I believe can really have an impact on both developer and project when it comes to working on legacy systems.

## Small Wins Count

From personal experience this is a biggie. I joined a project recently and got landed with a role that involved the transformation of an old legacy system. Did I get slightly disappointed when I knew how old the system was and the technology stack it utilised? Yes. However, I looked at the technology stack, the requirements of the Proof of Concept (*PoC*) we were tasked with, and thought to myself; ‘I could instil some change here for the better’. One key aspect of the PoC was to move away from proprietary software and go open source.

*Open Source*...

Those two words immediately open up the door for change and the chance to bring in some new technologies that could not only mean fresh skills, but also a more up-to-date tech stack to work with. Moreover, the first win I had was to move away from using Rational ClearCase for our version control system (*I did tell you it was an old legacy system*...), and start using Git.

Win number 2 came shortly after, as part of the transformation work (*moving from Weblogic 10 to JBoss EAP 7*) I posed the idea and migration plan for moving from an old Ant build system to Maven – already thinking ahead into automated builds and deployments – and that was taken on board and adopted. So already, within a few weeks I’d gone from the initial ‘legacy’ reaction of disappointment, to ‘this could actually shape up to be quite a good opportunity’.

More to the point, when we’re working on legacy code or projects it’s easy to get caught up in the initial disappointment of what can *seem* like the prospect of a bleak project, but it doesn’t have to be that way.

[*Small wins count*]( https://blog.gitprime.com/stop-comparing-individual-developer-productivity-and-start-focusing-on-daily-progress).

Even if you can modernise and introduce change into small pieces of a legacy project, it’s already one more thing that you will have improved on and left in a better place than you found it. Clock those up and before you know it, you’ll have made an ‘old, boring’ project, into something a little more ‘interesting and modern’.

## Refactor the Code

One of the biggest gripes I have with working on legacy projects is the mentality of ‘copy and paste’. Whenever I come across duplication in the code I always think to myself it didn’t start off this way, somewhere down the line someone fell into the copy and paste trap. What’s more, it’s an easy trap to fall into. You’re tasked with writing a new function, but it’s the same as something that already exists in the codebase, so you just think; *‘it’ll be easy to just copy this and I can refactor it later...’*. Only *later* never comes around and it’s one more piece of duplication to be added to the pile that is picked up by the code analytics software you’re using.

*You are using [code analytics software]( http://www.codeexcellence.com/2012/05/what-is-static-analysis-and-why-is-it-important-to-software-testing/) aren’t you?*

Building code should **not** follow that age old mantra of; why do today what I can leave for tomorrow, it should be the opposite! In fact even if you spot code duplication and you haven’t introduced it yourself, treat it as your responsibility to refactor it! A good way to think about this is by following a principle very similar to the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule), *always check a module in cleaner than you found it*. If you can’t refactor it at that moment in time, then add it to a [technical debt]( https://martinfowler.com/bliki/TechnicalDebt.html) page somewhere **visible**. However, be careful; technical debt can easily build up if not addressed, so it’s important to keep it to a minimum if you have to add any at all. After all, as developers we want to [build technical *wealth* not technical *debt*](http://firstround.com/review/forget-technical-debt-heres-how-to-build-technical-wealth/)!

## Rejuvenating the Tests

The one hope you have as a developer when working on legacy code is that there is a good testing foundation in place. In fact, coming from the previous point about refactoring, a lack of tests seriously hinders any refactoring work you want to do, as with legacy systems it’s hard to make changes without being safe in the knowledge that the existing tests will catch any problems you may create. Sometimes, when there are no tests - or at least very little - it becomes hard to justify to the business that actually spending time to build up a good regression test base will yield further rewards down the line, and the short term hit in project time is worth the long term gain going forward.

Furthermore, I was deployed on a project last year where I was tasked in designing and building a new regression testing framework. Firstly, I’d like to point out yes, it was another legacy project (*although not as old as some that I’ve worked on*), but the technology stack wasn’t super out-of-date – which made a nice change. There was a poor regression framework in place already, but it needed to be replaced, so we ended up running with a cucumber BDD style, functional testing framework, utilising selenium web driver for driving the browser style tests. For me this was cool; a nice opportunity to design and innovate, work with some new technologies and learn some new skills. Remember those *small wins*...

Moving swiftly on, we made the conscious decision to take the hit in project time to build up a good foundation of regression tests that would give us much more value in the long term, compared to the time ‘lost’ on building it in the first place. Moreover, we were able to tie these tests into our Jenkins builds which lead to eventually having nightly builds and deployments, followed by a complete run of our regression suite on a fresh database build. In turn, this meant that each morning we were able to routinely check the test runs, safe in the knowledge that if any failed it was quick and easy to find the ~~culprit~~ reason (*no blame culture of course*).

It’s not only about building new test frameworks for legacy projects, or introducing new testing concepts such as functional browser tests for web applications. It’s also about rejuvenating existing tests; maybe refactoring test code, updating the version of the test framework and updating the test code to reflect the new features available. What’s more, it’s important to realise that just because the system is legacy, it doesn’t mean you have to put up with bad tests, or a lack of tests. There are always ways to improve coverage, or introduce new testing methods in order to add further value to the project – and make it that bit nicer to work with.

## Embrace Automation

Legacy projects don’t have to mean legacy methodologies as well. Gone are the days of manual processes ruling the roost, it’s time to automate!

In the last few years, [DevOps](https://theagileadmin.com/what-is-devops/) has really come into its own, and a part of DevOps is to automate stuff; automate builds, tests, processes and deployments. If nothing else, automating those manual projects saves time and effort. Time and effort that could be utilised on much more important things (*remember that technical debt list?*). Of course, it’s not just about automation, and if you’re following a DevOps based approach, there’s sometimes a [limit to how much automation you need](https://techbeacon.com/devops-automation-best-practices-how-much-too-much).

Allowing time and planning in automation tasks can make a huge different to any project, but especially legacy projects where automation hasn’t been a priority before. Linking back to my earlier point about rejuvenating the tests, having [test automation in place is a real benefit](https://blog.red-badger.com/blog/2013/02/01/benefits-of-automated-testing) to all projects, but with legacy projects it can give you that extra assurance and safety net when doing all the other goods things like introducing new features and refactoring code.

Gone should be the days when manual builds and deployments rule legacy ways of working. It should be almost *mandatory* for projects to embrace automated builds and deployments nowadays, because there are a [host of benefits to doing so](https://www.red-gate.com/blog/database-lifecycle-management/5-big-benefits-automated-deployment). Besides bringing a bit more life into an older, legacy project, the time it can save in the long term can be utilised to address of areas of the project in need of attention. More importantly, it allows us to do one of the things we love doing as engineers, [innovate](https://capgemini.github.io/development/how-we-work/#innovate-and-industrialise)! Although DevOps might be considered a more modern practice in software projects, it can very much [be part of legacy projects too](https://capgemini.github.io/devops/devops_legacy/).

##  Conclusion

At this point you're probably wondering what to take away from all this. I hope that when you were reading through this post, you noticed that the points I’ve raised don’t just apply to legacy projects.

This post could be about any style of software project, the reason for writing about legacy projects in particular, is that we can get so hung up on the word *legacy*, we often forget that we’re still building software, we can still design and innovate, and yes, it *is* still possible to write beautiful code.

For me, *Embracing the Legacy* is a way of thinking and a way of working that allows us to move past the fact we might not be on the most interesting projects, utilising the most cutting edge technology. However, we can still bring our breadth of experience to the table as engineers, and use our skills and knowledge to transform legacy projects into something truly worth working on.


