---
layout: post
title: How to write effective bug reports 
description: The anatomy and life cycle of good and bad bug reports, and the value of learning to use your issue tracker for clearer communication between testers, developers, and clients
comments: true
author: malcolm_young
category: Testing
tags: [Testing, Development]
---

Unfortunately, [software will always have bugs][always_bugs], and those [defects need to be tracked][joel_test]. Whether you’re doing [automated or manual testing][robot], when that testing finds a problem, you need to communicate that problem to the development team. The way to communicate it is by writing a bug report. Opening an issue, raising a ticket, whatever you want to call it - the issue tracker should be the main channel for persistent communication about any project, so it's important that the message is clear.

Incidentally, I’ve never understood why we say “raise a ticket” - is it like raising a toast to someone? Perhaps it's more like raising a flag. You might wonder why I’m quibbling over language here, but language matters, especially when we're talking about bug reports.

## Why is this important?
The main output of testing is bug reports, and unfortunately far too many teams suffer from the consequences of badly written bug reports. Badly written requirements are often a problem too, but that's another story. If bug reports are unclear, it's easy for details to get lost along the way, or confusion to arise. Confusion takes time to clear up, and causes friction and frustration on the team.

Ideally testers and developers should be co-located, have a friendly relationship, and [see themselves as a single team who share responsibility for quality][everybody]. If there's any confusion, they can clear it up with a quick chat while looking at the issue together. However, in large companies, QA is often one of the first functions to be offshored or outsourced. Even if everyone speaks the same language, and even with recent advances in communication technologies, [face-to-face conversations are far more effective than remote communication][remote]. When you add differences in time zone, culture and language into the mix, clear and concise communication becomes even more valuable. 

Incidentally, one of the lessons I've learned from working with offshore QA teams is the value of having at least one member of that team onshore, so that face-to-face conversations can still happen, mitigating the risk of cross-cultural miscommunication, and reducing the number of conference calls carried out in people's second language.

In my experience, the main sources of badly written bug reports are bored, inexperienced manual testers, and clients who are in a big rush because they need to fit in UAT alongside their day job, and are annoyed because the software _should just work_. In short, people who don't appreciate the value of well-written bug reports, and don't want to be spending time writing them anyway.

## Anatomy of an issue
There are [lots of different issue trackers][trackers], each with their own strengths and weaknesses, but most of them share a few things in common. An issue usually contains the following components:

### The summary (or title)
This should stand alone to let the reader understand and identify the issue quickly. Remember that the summary will often be viewed in a big list of other issues, so it should be meaningful and unique, to help you quickly recognize the relevant issue.

Think about the signal to noise ratio of your issue summaries. If you see a big list that's full of similar summaries like “Cosmetic issues”, you'll end up wasting more time looking for the right issue.

### The description
This is the main meat of the issue. It should include everything that you need to know in order to fix it, and to test that the fix is successful. For web projects, this should always include the URL where the bug happened. 

#### Steps to reproduce
Does the bug happen immediately, or does it only happen in a specific set of circumstances? 

#### Expected result
How will we know if the bug has been fixed?

#### Actual result
What have you observed? How does it differ from the expected result? A screenshot usually helps.

### Issue Types, Labels and Categories
Most issue trackers have at least one way of grouping issues. Invest a little time in learning how this works in your system, and then you can use it, instead of writing things like “Bug” or “Regression" in the title of a bug, or prefixing titles with words like "accessibility" or "performance". 
 
This reduces the amount of noise in your summaries, making them much easier to read. The other benefit of using labels is that it's easier to query your issue list, and build specific boards or reports.

### Status
The whole point of having an issue tracker is so that you know whether things have been fixed yet. It's really important to make sure that the status of issues reflects reality, to prevent wasted time. It's worth investing some time in configuring your issue tracker to match your workflow. That way you can have a board   with relevant columns to give you a quick overview of how the project is doing, and where any bottlenecks are building up. Ideally you can also [integrate your issue tracker with your code review and build process to automate status updates][code review].

### Priority and Severity
Some trackers treat these as a single field, others split them up. However you record it, it's important to remember that there's nothing to be gained by slipping into [the political games of severity inflation][squeaky]. If all the issues are top priority, nothing can be prioritised, unless you go [one louder][11].

## How?
The aim when writing a bug report is that they will get closed quickly. As [Cem Kaner puts it][kaner], "The best tester isn't the one who finds the most bugs or embarrasses the most programmers. The best tester is the one who gets the most bugs fixed.” Well-written bug reports are quicker for developers to fix, and quicker to re-test. Over the last few years, I've noticed some patterns in what makes a good bug report, and picked up some useful points from articles, particularly by [Joe Strazzere][quality] and [Adam Zimmerman][chromatic]. Here are some ideas that it's good to bear in mind when reporting defects and testing bug fixes.

### Atomic bugs
Each defect should have its own issue. If you’ve observed multiple small bugs on the same page, don’t be tempted to create a single issue with a list of problems. 
Similarly, don’t be tempted to let bugs evolve. If a bug report says that a button doesn't work, and the developer makes it work but in the meantime the colour has changed, that's a different issue. Unless your issue tracker is badly configured, it shouldn't cost much more effort to create a new issue than it does to include both problems in the same ticket.

The more facets an issue has, the more likely it is that the developers won’t fix all of them the first time round, and you'll end up failing the ticket again. Pretty soon, the issue history will be cluttered with comments and edits, and it'll become hard to see what the problem actually is any more. This will slow everything down, forcing the team to spend more time looking at the issue tracker than they do looking at the product. Not only that, but issues ping-ponging between developers and testers is a sure-fire way to damage team cohesion and morale.

### Assume that the reader is ignorant
This isn’t the same as [assuming that they are stupid][cleverer]. Imagine that the person is new to the project, or the company. They don't necessarily know what you mean when you use jargon or refer to things by names that aren't known by the outside world.

Ideally, a ticket should stand alone, including all the information needed to reproduce the bug. For instance, rather than saying “the sign-in page”, include the URL. If there's a complex set of configuration steps or other dependencies, link to the documentation. You do have documentation, don't you? Incidentally, having a lot of manual steps in test cases is a warning sign that you're probably not doing enough work on automating your deployments.

### The right tool for the job
Learn about the features of your bug tracker. Being able to link tickets together is a very powerful tool. Learn the markdown format - most systems have all sorts of neat little tricks. For example, you can enormously improve readability by writing steps to reproduce the issue as an ordered list, including image thumbnails in the relevant place, or formatting error messages as quotes.

### A picture is worth a thousand words, but only if it has words to go with it
Bug reports should (almost) always have a screenshot. But they should (almost) never just be a screenshot. With just a screenshot, it isn't necessarily obvious where the problem is. If it was that obvious, the developer probably would have spotted it before saying that the component was ready for testing.

Whatever you do, please don't paste screenshots into a Word document before attaching it to the ticket. This just adds to the time it takes for developers and testers to figure out what the issue actually is, as they have to download and open the file before they can start reading it. If you attach files as an image (like JPEG or PNG), most issue trackers will display it as a thumbnail image.

If you’re referencing the original design, include a link to it. Ideally, your designs will have a single source of truth, so linking to the design is better than uploading another image.

Don't make the developers play spot the difference - highlighting where the problem is can be really helpful. A lot of tools, like [JIRA Capture][capture] and [Skitch][skitch], make it easy to annotate screenshots with circles, arrows, and text.

### Just the facts
A ticket needs to include all the necessary information, and nothing else. Providing too much information can be almost as bad as not enough information. Writing concisely is a valuable skill, and as Raymond Carver put it, “Everything is important in a story, every word, every punctuation mark."

Only include what's relevant. Of course, the difficult bit is knowing what's relevant. As with most things, the answer is "[it depends][depends]".

For example, if the bug appears any time you navigate to a certain page, there's no need to include any prior steps like going to home page, navigate using the menu to page 2 then page 3. Just say "go to `http://example.com/page`". On the other hand, if the bug only appears after a certain sequence of events, then that list of events is important.

If the issue occurs on every browser you've tried, don't bother listing them all individually.

There’s no need to say please, or explain why it's important that the defect be fixed. Don't copy and paste whole emails, including the signature, into the issue tracker.

The issue description isn't the place for theories about how to fix the problem - it ["should explain the problem, not your suggested solution."][mozilla]. Comments are a more suitable place for notes on investigating the root cause. Some bug trackers allow for private comments, only visible to developers. There's something to be said for not making clients read a load of technical notes, but I think I'd prefer to [encourage a culture of transparency between the team and the client][transparency].

### Be scientific
If a defect is intermittent, try to isolate the circumstances where it can be reproduced. Change one thing at a time until you can rule things out.
   
### Don't be afraid of the browser tools
Learn [how to use the browser console][devtools] so that you can include details of any JavaScript errors. Browser incognito mode can be your friend. Learn how to clear cookies and flush the browser cache. Make sure that you've refreshed the page if you're re-testing something. 

### Search first
Before you spend time creating a ticket, check that nobody's already done the job for you. If all new issues are funnelled through one person to be [triaged][triage], that person will quickly be able to spot any duplicates, but ideally you'll have access to a list of existing known defects and their status. If you're constantly creating defects, the developers will be cursing you for the time they have to spend rejecting the ticket.

Once upon a time, I worked on a project which used an issue tracker called Rational Quality Manager. It was generally pretty terrible (or at least the version we were using was), but it did have one excellent feature - a button on each issue that allowed you to search for similar issues. Some issue trackers even automate that search on the issue creation form, presenting you with some existing issues that might match yours.

## TL;DR version
Some of my suggestions may seem pedantic, but all of them are born of the same motivation - investing a little time when creating issues, in order to save more time later on. Well-written bug reports will help to keep the team sane as things get closer to go-live, and the time savings will really add up, especially on a large project. So in the spirit of saving time, I think it’s worth summarising my points about what makes a well-written bug report:

- Search before creating a ticket
- One ticket per defect
- Meaningful summary
- Screenshot, as an image file, ideally with annotations
- URL
- Steps to reproduce
- Expected result
- Actual result
- All relevant information
- No irrelevant information

[always_bugs]: https://m.signalvnoise.com/software-has-bugs-this-is-normal-f64761a262ca#.x32zafipj
[joel_test]: http://www.joelonsoftware.com/articles/fog0000000043.html
[robot]: http://www.red-route.org/articles/2013-08-14/how-do-web-testing-be-better-robot
[everybody]: https://twitter.com/RebeccaSlatkin/status/758787507010035712
[remote]: http://www.fastcompany.com/3051518/the-future-of-work/the-science-of-when-you-need-in-person-communication
[trackers]: https://en.wikipedia.org/wiki/Comparison_of_issue-tracking_systems
[code review]: https://capgemini.github.io/learning/better-learning-code-reviews/#integration-and-automation
[squeaky]: http://www.red-route.org/articles/panic-weapon-squeaky-bum-time
[11]: https://www.youtube.com/watch?v=KOO5S4vxi0o
[kaner]: http://sqa.stackexchange.com/questions/1920/best-guidelines-for-bug-reporting/1930#1930
[chromatic]: http://chromatichq.com/blog/anatomy-good-ticket
[quality]: http://www.allthingsquality.com/2010/04/writing-issue-reports-that-work.html
[cleverer]: http://www.red-route.org/articles/you-are-not-cleverer-everyone-else-world 
[capture]: https://www.atlassian.com/software/jira/capture
[skitch]: https://evernote.com/skitch/
[depends]: https://twitter.com/kentbeck/status/596007846887628801
[mozilla]: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines
[transparency]: https://capgemini.github.io/devops/transparency-of-things/
[devtools]: https://developer.mozilla.org/en-US/Learn/Common_questions/What_are_browser_developer_tools
[triage]: https://docs.moodle.org/dev/Bug_triage

