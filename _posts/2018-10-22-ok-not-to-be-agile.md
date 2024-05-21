---
layout: post
title: It's OK Not to be Agile
description: Our take on Agility at Scale
category: Agile
tags: [Agile, SAFe, Learning, Teams, Leadership]
author: [sasaunde]
comments: true
---

I love messaging platforms. [Slack][slack] has made a real difference to the way we can work with remote teams and keep our disparate engineers sharing thoughts and mindsets. We're also experimenting with [Teams][teams], which is proving great, but all these tools sure do make it easy to become distracted from the day job!

This week's distraction at Capgemini Engineering HQ revolves around a number of [new takes on Agile][notagile] which are being posted to explain why "Agile does not Scale", and how this or that new and exciting version of Agile can change things. The big beef for me with these articles is that they do not define the problem domain before launching into a solution. So let's start with the problem!

## What is Agile?

I know we do this a lot, but no harm in going back to basics and redefining what we mean by Agile first of all. At Capgemini, when we say "Agile", we refer to ways of working and methodologies including Scrum, XP, Kanban, DSDM, Lean, possibly including DevOps - which are facilitators to us adhering to the [Agile Manifesto][manifesto]. These ways of working enable our customers to better understand how technology can help them, and, in a timely way, produce and improve useful business applications.

## What Doesn't Scale?

### Autonomy

Drilling down to what it means to be Agile according to the Manifesto, a big part of this is to enable a team to be autonomous, so that they can deliver software iterations faster. These iterations can then be evaluated and improved. Why faster? Well, they don't need to wait for some other team / person to approve their decisions. So much time is spent waiting for various forms of signoff; if you can get the decision-maker in your agile team you can move forward so much quicker. This is great for small business units or small companies, where you can easily identify this decision-maker and get their commitment to a project. It is, however, something which does not scale easily. Imagine if the project is something along the lines of: "bring new technology and modern ways of working to the justice system". This spins out across multiple projects, sites, funding streams, technologies, and may or may not involve software development - how on earth can you maintain autonomy in that kind of environment? And, in fact, should you even be trying?
It seems to me that in some scenarios, talking about the project as Agile is really not the right approach. This doesn't mean in any way that I'm changing my stance as an Agile Evangelist, but more that we should use it in the right place. Agile is a software development methodology; if you're not developing software - ie you're not that far along the digital reform path, or you're installing a custom software package which needs configuring rather than developing, then maybe an agile methodology is not right for you. And redefining your approach as "new Agile" whilst moving away from the Agile manifesto is certainly not helpful.

### Dependencies

There are a couple of project types to discuss here:

#### Integration projects

This is an area I've been working in for the last couple of years. Agile doesn't really provide benefit here for very interesting reasons - the development phase is really tiny, basically a few minutes linking bits of "pipe" together if you're using a product such as [MuleSoft][mulesoft], [IBM API Connect][apiconnect], or even Camel (especially the exciting new [Camel K][camelk]). With these platforms, it can take significantly longer to write your Jira task than to actually complete the development phase!

Secondly, there is the fact that an integration project has at least two extra parties (if not more) involved, the source (API caller(s)) and the target(s). These parties are very often different companies, or at least very separate divisions within a company. So again, the decision making process is more complex than the build process and a specific stakeholder / product owner is hard to identify. What if an API caller wants a certain field to be present in their response, which does exist in the target system but is only provided in a convoluted way? Or if it exists in another system? Does the integration layer accommodate this change? Does the target system change for it? Who decides? Who provides the test data / test cases? This multi-party uncertainty often results in the formation of a RACI matrix - cue Agile purists berating the death of their [creativity][stopracism], possibly rightly so - for here, what benefit does the integration team have in being Agile? We are always going to need at least two product owners (source, target) and then of course some kind of mediator when they inevitably disagree... and hence we are unlikely to be able to have all three decision-makers in our sprint team.

Our recent project's take on Agile for Integration involved, again, going back to the manifesto, and taking the pieces that really helped. In this case, "Individuals and Interactions over Processes and Tools", "Customer Collaboration over Contract Negotiation". Despite being split-site and multi-party, we strove to build up a relationship across the integration by getting people together and talking. We were open and honest about the speed at which we could develop on our integration platform, we were open to building disposable pieces. We didn't wait for requirements documents to be signed off before we built an integration, we were iterative; we built a best-effort flow and then we tested it with the end systems to see whether it provided what they needed. We had standups and also scrum-of-scrum style meetings. This flushed out issues much quicker than if we'd have worked in a more waterfall pattern and forced our parties to try and fully document their API requirements. So yes, we had a RACI matrix and no, we weren't autonomous; no, I wouldn't call it Agile, but I feel we were still being true to our roots!

#### Company-wide Software Installations

Here is a second scenario where Agile is misused, and one with which you are probably familar:

**Programme director:** Where is the project plan?

**Project manager:** We don't have one, we're Agile.

**Programme director:** What is this team doing?

**Project manager:** They're configuring the Employee Benefits system.

**Programme director:** And when will that be live?

**Project manager:** When we get the data feed from the new payroll system.

**Programme director:** Well, when do the employees start using the new payroll system?

**Project manager:** We'll train them two weeks before the system goes live

**Programme director:** And when is that?

**Project manager:** I can't tell you, as we only plan 2 weeks ahead

The point here is that in large-scale technology programmes, in particular [ERP][erp] system installations or similar, there is tight coupling between disparate workstreams. The teams can only be autonomous to a certain extent, and can only move so far, before they are blocked by other workstreams. These dependencies are built in to the software package being installed, and the development team have little flexibility to adjust them. Without a long-term project plan forecasting and mapping interdependencies, (which implies rigid requirements), this kind of project can't succeed. Frameworks like [SAFe][safe] are designed to give programmes the courage to call themselves Agile, to use an Agile methodology; but how far from the manifesto are they moving? Too far to call themselves Agile? Probably.

## What Do We Do About It?

Our take on Agile at Scale within Capgemini Engineering is manifold. We endorse and promote SAFe, partly as a way to reassure our clients that (a) Agile at Scale is possible and (b) a lot of scholarly thinking went into creating the SAFe framework. When we are on the ground, there are a couple of proven foundations that we would encourage. We love the Scrum of Scrums whereby a daily standup, containing a member of each sprint team, is held to communicate important updates. Then there are some architectural paradigms which really help:

### Domain Driven Design

We have long been [advocates of DDD][dddpresentation] and it really does help to allow autonomy at a sprint team level if you have put in the effort to identify and reduce dependencies earlier on. How does DDD help? Well, by encouraging a team to define bounded contexts, to get the development and architecture teams closely involved with the business so that they get a proper understanding of the business domains, and getting a focus on continuous integration so that conflicts are identified and resolved constantly - rather than in a big, painful bang at irregular intervals. The focus on defining a Ubiquitous Language; a common, business-wide dictionary of terms, is also essential for cross-communication when developing at scale.

### Microservices

A microservice architecture also helps to grant autonomy to the teams building those service(s). It's a great way to divide up development ito pieces that are, as our blogger [Gayathri][gayathri] puts it beautifully, "people-sized". Using interfaces as the contracts between microservices, and understanding _who owns the interface definition_ (clue: it's not the implementor) can help get the right product owner, able to make the right decisions, in place to autonomise the microservice dev teams. And microservices should also by definition be independently deployable, so you won't tread on any toes at a platform/environment level either.


### DevOps Tooling

We always advocate an early focus on code deployment mechanisms when working at scale. For a start, it's often where big bottlenecks can be found. You can streamline deployment down to minutes, but if you have to wait 2 months for a heavy CAB process to grind out a release date, is there any point?! This is often something that gets overlooked by companies who wish to be agile and work at scale, so we point it out as early as possible. And again, it's fine if you wish to stick to your CAB schedule, but don't label your project as agile.

Having a standard continuous delivery process across a large-scale project can really help disparate teams to undestand how each other works. A single Jira instance can easily scale, although it may well require a dedicated and skilled resource to make sure it remains legible! And it's OK to have multiple source control systems, repositories, dashboards and build automation tools, as long as they follow the same basic rules (branching techniques, scheduling i.e. "build on commit", number and purpose of environments, red dashboard = bad etc).


## In Conclusion

It's easy to struggle to work in an agile way when working at scale. And it's great to find ways to get large-scale projects moving forwards successfully, but we need to be careful with our use of language and terms. If "Agile" simply comes to mean "Software Development with Sticky Notes", we will start to lose the understanding of why we wanted to change the way we develop software in the first place. So, it's fine not to be agile, it's great to shout about your ways of working, but just don't feel the need to say that you are, don't use the term.

Agile is a recognition that, in software development, _things will change_. We won't get it right first time because nobody knows what "right" is at the start, and we need to develop ways of working to embrace and absorb that change by granting development teams the freedom to decide how to cope with it. Any references to "fully define", "controlled schedule" cannot by definition be agile ways of working. Be wary!


[recruitment]: https://www.capgemini.com/gb-en/careers/
[gradeladder]: https://capgemini.github.io/culture/our-grade-ladder/
[opensource]: https://github.com/capgemini/
[notagile]: https://www.zdnet.com/google-amp/article/mckinsey-time-to-rethink-agile-in-complex-digital-environments
[culture]: https://capgemini.github.io/development/how-we-work/
[teams]: https://en.wikipedia.org/wiki/Microsoft_Teams
[manifesto]: http://agilemanifesto.org/
[racif]: https://www.scrumalliance.org/community/articles/2012/june/the-raci-f-matrix/
[stopracism]: https://skepticalagile.com/stop-racism-a4d0539964e/
[dddpresentation]: https://capgemini.github.io/presentations/devoxx-domain-driven-distributed-systems/
[camelk]: https://github.com/apache/camel-k/
[apiconnect]: https://developer.ibm.com/apiconnect/
[mulesoft]: https://www.mulesoft.com/
[gayathri]: https://capgemini.github.io/authors#author-gayathri-thiyagarajan
[slack]: https://slack.com/
[safe]: https://www.scaledagileframework.com/
[erp]: https://en.wikipedia.org/wiki/Enterprise_resource_planning
