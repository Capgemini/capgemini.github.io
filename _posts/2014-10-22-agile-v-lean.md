---
layout: post
title: "Agile and Lean"
category: Agile
author: john_shaw
tags: [Agile, Lean, Scrum, Kanban]
comments: true
share: true
---

__Or should that be Scrum and Kanban?__

I was in a short conversation a few days ago around whether we, in the business of software development, want to raise the profile of Lean. Perhaps even create some formal training materials.

The message I was getting was that Agile doesn't need Lean. This is because Agile practices are built on Lean - especially Scrum!

This is true. Scrum especially is not really a software engineering practice at all. It's an approach to organising people to deliver something that initially is not very well defined.

I think the fear is that Lean is a process improvement technique for processes that are already reasonably steady state. Software development is NOT steady state. It is unstable all through the lifecycle, especially during the beginning when there are many risks, possibly many unmitigated risks. Lean doesn't really address risks. Lean is focussed on improvement of an established process.

### What Does Lean Bring?

Having reflected on the conversation, this view misses the point somewhat. Often the barriers we face are not in the software development portion of the delivery: rather gathering timely requirements, planning & estimation, testing/QA and cut-over present the challenges. Often these are not addressed as they're not in our immediate field of view, snowball and present even bigger challenges.

Lean can help here. Lean can map this "process" end to end. It can then help establish metrics to demonstrate where the problems lie.

Lean can also help by bringing a meeting structure to all levels and promote the idea of [servant leadership](https://greenleaf.org/what-is-servant-leadership/).

A conflict, or perhaps even a paradox, is that the customer is often the supplier too! Maybe we need to redefine this: the customer must set clear parameters for performance (the goal), then the project need to convert these into requirements themselves by consulting the stakeholders on the changes that will bring about positive impacts.

For example, an analysis I performed a while ago on a series of project releases is shown in the the charts in the image.

![Example of a Cumulative Flow Diagram](/images/2014-10-22-agile-v-lean/CFD.png)

The top image is a [Cumulative Flow Diagram](http://www.slideshare.net/yyeret/explaining-cumulative-flow-diagrams-cfd) (CFD) for a number of releases into production of a product. Each band shows the user stories that were queued or in in-progress at that time. The large steps are where the process was outside of the project team's direct control. The thinner red stripe was where the team were working in an incremental way to develop and test the software within sprints. The green band after the red stripe shows the software "sitting on the shelf" for the next phase.

Restrospectives would centre on the "red stripe". Blockers, knowledge transfer, skills, planning, estimates, etc, etc.

### Wider Improvement

Perhaps we should have been looking at the larger steps.

At the time there was some thinking around improving the process. The driver was the desire for automated testing, but I had a look a little wider. I speculated what the same delivery might have looked like by addressing the larger steps, resulting in the second chart shown.

There is a clear difference. Immediately there is a noticeable change in the amount of "green" on the chart. This is because the software is not sat on the shelf for so long: it is "released" quicker!

Because the releases are more frequent, less goes into them. This reduces the demand in requirements coming through. Instead of having to define a good proportion of the stories for a large release up front, the number of stories needed is much lower and therefore with a lower lead-time. This is reflected in the thinning of the first dark blue band.

The example demonstrates the potential for using Lean tools, KanBan and CFD, to inspect and analyse the pipeline. Embracing Lean further may well reveal further opportunities for improvement.
