---
layout: post
title: "There isn't a module for that already?"
description: "Working with the grain of web technology to give clients what they need, rather than struggling against it to try and give them what they want. Along the way, introducing two new Drupal modules: CKEditor Datetime and Image Styles Display"
category: Drupal
tags: [Development, Open Source]
author: malcolm_young
comments: true
share: true
---

Sometimes clients ask for the wrong thing. Sometimes developers build the wrong thing, because they didn't ask the right questions. If you're solving the wrong problem, it doesn't matter how elegant your solution is.

One of the most important services that we as developers and consultants can provide is being able to help guide our clients to what they need, rather than simply giving them what they want. Sometimes those two things are aligned, but more often than not, figuring out the right thing to build takes some discovering.

Why don't wants and needs match? It might be because the client hasn't spent enough time thinking about the question, or because they haven't approached it from the right angle. If that's the case, we can help them to do that, either by asking the right questions or by acting as their [rubber duck][duck], providing a sounding board for their ideas. Alternatively, it might be because, as a marketing or content specialist, they lack sufficient awareness of the potential technological solutions to the question, and we can offer that.

Once you've properly understood the problem, you can start to look for a solution. In this article, I'll talk about some examples of problems like this that we've recently helped clients to solve, and how those solutions led us to contribute two new Drupal modules.

## There must be a module for that
Sometimes the problems are specific to the client, and the solutions need to be bespoke. Other times the problems are more general, and there's already a solution. One of the great things about open source is that somebody out there has probably faced the same problem before, and if you're lucky, they've shared their solution.

In general, I'd prefer to avoid writing custom code, for the same [reasons that we aren't rolling our own CMS][custom CMS]. There are currently [over 43,000 contributed modules available for Drupal][modules], some of which solve similar problems, so sometimes the difficult part is deciding which of the alternatives to choose. 

 Sometimes there isn't already a solution, or the solution isn't quite right for your needs. Whenever that's the case, and the problem is a generic one, [we aim to open source][open source] the solutions that we build. Sometimes it's surprising that there isn't already a module available. Recently on my current project we came across two problems that felt like they should have been solved a long time ago, very generic issues for people editing content for the web - exactly the sort of thing that you'd expect someone in the Drupal community to have already built.

## How hard could it be?
One area that sometimes causes friction between clients and vendors is around [estimates][estimates]. Unless you understand the underlying technology, it isn't always obvious why some things are easy and others are hard. 

![tasks comic](/images/2019-05-24-modules/tasks.png)
[XKCD -tasks](https://xkcd.com/1425/){: .image-source }


Even experienced developers sometimes fail to grasp this - here's a recent example where I did exactly that.

We're building a site in Drupal 8, making heavy use of the [Paragraphs module][paragraphs]. When adding a webform to a paragraph field, there's a select list with all forms on the site, sorted alphabetically. To improve usability for the content editors, the client was asking for the list to be sorted by date, most recently created first. Still thinking in Drupal 6 and 7 mode, I thought it would be easy. Use a view for selection, order the view by date created, job done - probably no more than half an hour's work. Except that in Drupal 8, webforms are no longer nodes - they're configuration entities, so there is no creation date to order by. What I'd assumed would be trivial would in fact require major custom development, the cost of which wouldn't be justified by the business value of the feature. But there's almost always another way to do things, which won't be as time-consuming, and while it might not be what the client asked for, it's often close enough for what they need.

## What's the real requirement?
In the example above, what the content editors really wanted was an easy way to find the relevant piece of content. The creation date seemed like the most obvious way to find it. If you jump to a solution before considering the problem, you can waste it going down blind alleys. I spent a while digging around in the code and the database before I realised sorting the list wouldn't be feasible. By enabling the [Chosen module][chosen], we made the list searchable - not what the client had asked for, but it gave them what they needed, and provided a more general solution to help with other long select lists. As is so often the case, it was five minutes of development work, once I'd spent hours going down a blind alley.

This is a really good example of why it's so important to validate your assumptions before committing to anything, and why we should [value customer collaboration over contract negotiation][agile] - for developers and end users to be able to have open conversations is enormously valuable to a smooth relationship, and it enables the team to deliver a more usable system.

## Do you really need square pegs?
One area where junior developers sometimes struggle is in gauging the appropriate level of specificity to use in solving a problem. [Appropriate specificity][specificity] is particularly relevant when working with CSS, but also in terms of development work more generally. Should we be building something bespoke to solve this particular problem, or should we be thinking about it as one instance of a more generic problem? As I mentioned earlier, unless your problem is specific to your client's business, somebody has probably already solved it.

With a little careful thought, a problem that originally seemed specific may actually be general. For example, try to avoid building CMS components for one-off pieces of a design. If we make our CMS components more flexible, it makes the system more useful for content editors, and may even mean that the next requirement can be addressed without any extra development effort.

Sometimes there can be a sense that requirements are immutable, handed down from on high, carved into stone tablets. Because a client has asked for something, it becomes a commandment, rather than an item on a wish list. Requirements should always be questioned
The further the distance between clients and developers, the harder it can be to ask questions. Distance isn't necessarily geographical - with good remote collaboration, and open lines of communication, developers in different time zones can build a healthy client relationship. Building that relationship enables developers to ask more questions and find out what the client really needs, and it also helps them to be able to push back and say no.

## Work with the grain 
It can be tempting to imagine that the digital is infinitely malleable; that because we're working with the virtual, anything is possible. When clients ask “can we do X?, I usually answer that it's possible, but the more relevant question is whether it's feasible.

Just as [the web has a grain][grain], most technologies have a certain way of working, and it's better to work with your framework rather than against it. Developers, designers and clients should [work together to understand what's simple and what's complicated][design review] within the constraints. Is the extra complexity worth it, or would it be better to simplify things and deliver value quicker? 

Sometimes that can feel like good cop, bad cop, where the designers offer the world, and [developers say no][grumpy]. But the point isn't that I don't want to do the work, or that I want to charge clients more money. It's that I would much rather deliver quick wins by using existing solutions, rather than having developers spend time on tasks that don't bring business value, like banging their heads against the wall trying to bend a framework to match a "requirement" that nobody actually needs. It's better for everyone if developers are able to work on more interesting things.

## Time is on my side 
As an example of an issue where a little technical knowledge went a long way, we were looking at enabling client-side sorting of tables. Sometimes those tables would include dates. We found [an appropriate module][tablesorter], and helped to get the Drupal 8 version working, but date formats can be tricky. What is readable to a human in one cultural context isn't necessarily easy for another, or for a computer, so it's useful to add some semantic markup to provide [the relevant machine-readable data][time].

Drupal has pretty good facilities for managing date and time formats, so surely there must be a module already that allows editors to insert dates into body text? Apparently not, so I built [CKEditor Datetime][CKEditor Datetime].

With some helpful tips from the community on [Drupal Slack][Drupal Slack], I found some CKEditor examples, and then started plumbing it in to Drupal. Once I'd got that side of things sorted, I got [some help from the plugin maintainer][github issue] to get the actual sorting sorted. A really nice example of open source communities in action.

## Every picture tells a story 
Another challenge that was troubling our client's content team was knowing what their images would look like when they're rendered.
Drupal helpfully generates image derivatives at different sizes, but when the different styles have different aspect ratios, it's important to be able to see what an image will look like in different contexts. This is especially important if you're using responsive images, where the same source image might be presented at multiple sizes depending on the size of the browser window.

To help content editors preview the different versions of an image, we built the [Image Styles Display][Image Styles Display] module. It alters the media entity page to show a preview of every image style in the site, along with a summary of the effects of that image style. If there are a lot of image styles, that might be overwhelming, and if the aspect ratio is the same as the original, there isn't much value in seeing the preview, so each preview is collapsible, using the [summary/details element][summary], and a configuration form controls which styles are expanded by default. A fairly simple idea, and a fairly simple module to build, so I was surprised that it didn't already exist.

I hope that these modules will be useful for you in your projects - please give them a try:

* [CKEditor Datetime][CKEditor Datetime]
* [Image Styles Display][Image Styles Display]
 
If you have any suggestions for improvement, please let me know using the issue queues.

[agile]: https://agilemanifesto.org/
[modules]: https://www.drupal.org/project/project_module
[custom CMS]: https://hackernoon.com/how-i-built-a-cms-and-why-you-shouldnt-daff6042413a
[paragraphs]: https://drupal.org/project/paragraphs
[chosen]: https://drupal.org/project/chosen
[Drupal Slack]: https://www.drupal.org/slack
[CKEditor Datetime]: https://www.drupal.org/project/ckeditor_datetime
[Image Styles Display]: https://www.drupal.org/project/imagestyles
[Spalp]: https://capgemini.github.io/drupal/spalp/
[duck]: https://en.wikipedia.org/wiki/Rubber_duck_debugging
[grain]: https://www.frankchimero.com/writing/the-webs-grain/
[grumpy]: https://humanwhocodes.com/blog/2012/06/12/the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy/
[estimates]: https://capgemini.github.io/agile/estimation/
[open source]: https://capgemini.github.io/tags/#Open%20source
[specificity]: https://css-tricks.com/specifics-on-css-specificity/
[design review]: https://capgemini.github.io/development/design-review-checklist/
[tablesorter]: https://www.drupal.org/project/tablesorter
[summary]: https://www.drupal.org/node/1852020
[github issue]: https://github.com/Mottie/tablesorter/issues/1657
[time]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
