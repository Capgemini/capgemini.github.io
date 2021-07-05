---
layout: post
title: How We Work
description: Defining how we define ourselves as engineers
category: Development
tags: [Development, Engineering, Learning, Culture]
author: [andrew_harmel-law, malcolm_young]
comments: true
---

Recently within the various Capgemini UK software engineering teams we've been looking at our approach to learning and development. Capgemini is a big corporation, and in the past there has been a focus on certification. Like many people in the industry, we're currently not entirely convinced by that direction, and yet we very much want to help our colleagues grow as engineers - key to that is to develop an engineering mindset.

This consideration has made us take seriously the question "what does it mean to be a software engineer"?  Answers to such questions are important. So what are the values that we share, despite being a diverse group of engineers, and what do these mean in practice?

## Our Manifesto

* As Software Engineers we build things using technology. We build complex things, but we aim for simplicity.
* We focus on the details, and on the bigger picture.
* We know that software is almost never built in isolation, and we value the benefits that wide collaboration brings.
* We continually adapt to the evolving and emerging requirements of our clients.
* We care about quality, whether that means the security of the applications we build, the performance and user experience, or the things that the end user doesn't see, like coding standards and maintainability.
* We believe that automation is essential to making our work reliable, efficient and repeatable, so we keep it at the heart of everything we do.
* We believe that the best way of learning is by doing, and by sharing what we've learned.
* We value our colleagues as human beings and as engineers, in that order.

## What Does this Actually Mean?
It's all very well talking about grandiose concepts, but how does this translate to our everyday work? What are the ideas we put into practice to become more effective in our day-to-day work?

The fundamental element which runs through the team's culture is one which was made famous by Netflix, that of "Freedom with Responsibility" (you can read their [entire "Culture" deck on Slideshare][netflix deck]). As colleagues we all work to ensure we have the right amount of autonomy, are enabled to work as effectively as possible, delivering valuable outcomes to our clients while staying within the boundaries of the contract, and learning and developing as we go. We like to think that this fits with [Capgemini's corporate values][capgemini values], while making more sense to people like us.

This manifests itself in the following directives:

### [Admit When You're Stuck / Worried / Unsatisfied][admit it]
This area is key, but may also sometimes be the hardest. We are experts, but [we don't know everything, and we're not all the same][different]. One of the most important elements of having responsibility is to know when to raise your hand and point out problems or things you don't like or are not sure of. As an engineer you are expected to look out for these problems, process-glitches and knowledge gaps. Remember, by being both humble and courageous you are far more likely to learn quickly. Allow yourself to be mentored. Don't be afraid to ask questions.

There is a flipside to this responsibility - when others who have the guts to admit they are uncomfortable, don't make them feel bad about their admission. If we punish openness and honesty then we will all suffer in the long run.

Finally, bear in mind that this is not a license to simply be a [Cassandra figure][cassandra]. Try and get to the root of problems – find the owner, or the stakeholders. Additionally question if / when something needs to be fixed. Record it, so when spare time does come up it can be re-investigated and re-evaluated.

### Learn to Cope with a Degree of Uncertainty
On many occasions you will be presented with a situation where the course of action is unclear - and as you progress this will become more frequent. As a member of the team you are expected to be able to [cope with this uncertainty][uncertainty], and still make wise decisions. Sometimes there's too much ambiguity – [don't ignore it, and don't see it as a failure][admit].

You are expected to deal with these situations by identifying root causes rather than treating symptoms, and smartly separating what needs to be done now from what can be done later.

### Use Your Judgment
Don't just give the client what they want. They're paying us for our expertise, and sometimes our job involves telling them that they're wrong, or helping them to realise that there's a better way of doing things. Trust in your own abilities. Ask lots of questions, and try to understand the reasons why decisions have been made. Learn when to disagree with those decisions, and when to go along with them even if you disagree.

### Do The Right Thing
Think about [the impact of your work][ethics], and don't assume that it's someone else's job to care. The team shares responsibility for its work, and success or failure isn't just measured by how many deadlines you meet.

### Know Your Scope, Intimately
As an engineer in the team you should always know what it is you are working on now, and what you are going to work on next.
You should know what the pertinent requirements are (both [functional][functional] and [non-functional][non-functional]) and who owns them. You should never [gold-plate][gold-plate] or over-deliver, but neither should you turn a blind eye to gaps or potentially unmitigated risks. When such elements are identified they should be recorded and communicated with the requirement owner. If this individual is not identifiable, then you should make the project manager aware as soon as possible.
 
Generally the scope of work will be recorded as stories in JIRA. Make sure you know where your scope is recorded, and keep up to date with it as it changes. Ideally stories will have their interdependencies flagged as "links". If not, make sure you are aware at least at a basic level how things are inter-related. This will help you know when you are straying beyond the scope of an individual story in your work.

### Estimate with Honesty and Commit
As an engineer you will be involved in estimation at the very least during the [sprint planning ceremonies][sprint planning]. These meetings happen at the start of every sprint, and you are expected to participate fully – disagreeing when you do not feel comfortable, asking questions to find out why others think differently from yourself, and always being ready to both fight your corner and change your mind. By taking part in estimation of a story or task you are committing to it.

Always bear in mind that [estimation is guessing][guessing], and as you learn the guessing gets better. Also bear in mind that estimates are based on _your_ knowledge – both of the technical platform and the business domain. As you learn your estimates will change. They may go up or down. Don't be afraid to communicate either change.

### Know Your Tools and Automate
We have an extensive tool chain available to us, both installed on our personal machines and running on servers. Make sure you know what each of these tools are, what role(s) they play in the delivery of our software, and how they can help make your life easier.

When possible, when you have performed a task twice manually, [consider automating it][innovate].

### Follow the Standard Workflow
Although it will be different from one project to another, there will be a standard workflow on every project. It's there for a reason. Make sure you know what it is, and how to follow it. Then follow it. Always. It will mean people are less surprised when you try and communicate with them. If you see scope to improve the workflow by making a change, suggest it.

### Deliver Clean, Tested and Documented Code which meets the Definition of Done
Likewise every team you work in will have a "definition of done" as well as coding standards for all our languages, and static analysis checks built into the standard build script templates. Ensure you know what each of these entail. Bear in mind that individual projects may change / evolve this standard. Make sure you apply the correct definition to the work you undertake.

### Work the Patterns
We, the team, are constantly creating patterns to prevent wheel-reinvention. Before you build something new, check the relevant wikis; someone may have been there before you.
 
If they've not, or the pattern you find doesn't quite fit, add more – either as an update, or a new pattern flavour, or a completely new pattern. Make sure that before you have a new pattern you've tried it out in more than one place. Otherwise it's merely implementation.

### [Track Your Progress, Visibly][transparency]
As mentioned above, our backlogs are typically kept in JIRA, captured as Stories, Epics and Technical Tasks and owned and maintained by our Business Analyst colleagues and our clients. This is where the Sprints are planned, reports are generated and it is the home of the standard workflow. Consequently you have no excuse to not plan your work and track it. This shared record should never be more than 24 hours out of sync with reality. Be disciplined; aim for far less.

### Keep the Plan in Mind and Deliver
Everything you work on will be mapped out and have a planned delivery date against it. Keep this in mind as you work. Know how many Sprints there are left to go until the next release, and what work is planned for it. This information will allow you to know when it is time to flag missing requirements and scope creep, or to keep your focus.

Remember, the most important thing is the release of running tested code which has demonstrable business value. Anything else is just a side effect or a distraction.

### Share Knowledge
The more we know, the easier all our lives become. We are all bright people in the team, with a lot to contribute. Consequently, you should try to share your knowledge as much as you can. The ideal places for this are on the wiki, in code, or on the engineering blog. Don't be afraid of updating the wiki, or adding new sections or pages. Don't be afraid to comment, and learn to use the power-user elements such as "@-naming", etc.

However, make sure it doesn't become a mess. Badly structured information, or duplicated information, or out-of-date information is probably worse than no information. Don't be afraid to update, delete, or re-structure. [Don't ask for permission][hopper] unless it seems like it will be needed.

### Fix Problems Quickly
We're working in a creative-inventive market, not a safety-critical one. We'll make mistakes. Don't waste time trying to get it right first time – but make sure you make it better the second time, and iterate rapidly to get to that second pass as quickly as possible.
Furthermore, don't take this as a license to be sloppy. Look out for mistakes (both yours and those of others) and fix them quickly when you find them. Never make a code change without a JIRA ticket.

### Continuously Seek Feedback & Improve
There is always scope to be better. Whenever you do something take time to look back and see what you would change next time. Ask others for feedback (and look all around you, not just your lead / project manager / reviewer). Perhaps the "next time" is right now.  
Make the changes small and incremental. Be prepared to be wrong - some "improvements" will actually make things worse.

Experiment.

### Don't Fear Failure
Failure is inevitable so be aware that you will at some stage fail. Don't be afraid of this; and instead face it and learn all the lessons you can from it.  

However, don't be reckless.  Never be willfully destructive.

### Mentor / Lead Others
It is the aim of the team to have as little additional bureaucratic overhead as possible. Consequently there is little / no hierarchy. "What do you think?" will be a reply you will hear a lot when you ask questions.

This means that we are all responsible for looking after each other. This works well because in all areas there will be always be one or more of us who know more than everyone else (be it a business or technical area) regardless of seniority / time in grade / time on project / time in the company. In the circumstances where you do know more, try and share that knowledge / experience to develop others.

Beyond this, look for opportunities to lead – it may be on a specific project, a piece of common functionality, an area of the tool-chain requiring improvement, or in the adoption of a new technology or pattern. Or it may be something else. If you see something is lacking, add it.

### Share Knowledge Even Wider
We know that there are developers beyond our team, country and company who could benefit from what we have learned, captured and produced. The team encourages you capture information in a way that is easily reusable by all of us.

If you have time, take it to the next level (but remember, this takes time, and this may be personal time) and produce a blog post or slide deck and present it to an internal or external user group / community of interest / conference.

### Innovate and Industrialise
The best form of sharing is via executable code. All of this must be invented. As a member of the team, when you spot something which could be abstracted out to an industrialized, reusable component (either in the business code, framework code, or even in the toolchain that we use to build these components) log it. When you get a chance discuss it with another member of the team.

When you think you have something worth industrialising you can take the code and internally "open source" it via a private repository on github. Other team members will help you get this up and running and manage the community / contributions that hopefully result. When we get really happy with it we'll help you really [open source][open source] it.

One thing you must bear in mind when doing either of these – don't break client confidentiality, or our contract with them. If in doubt, ask.

### Develop Yourself
The team isn't for life. You will be given the opportunity to develop yourself. It is our responsibility to do this by giving you great team members and challenging pieces of work.
 
But beyond this we're not going to formalise your development - that's up to you. We expect you to manage your own career path, learning from experience, observation, introspection, reading and discussion. But if you want to get help from the team in this, ask.
 
## Like the sound of this? Come and join us!
If this sounded like kind of place you'd like to work, we're glad.  There's a link at the bottom of this page to go to our job board. Alternatively you can contact either of us on Twitter.  We'd love to hear from you.

[capgemini values]: https://www.uk.capgemini.com/careers/working-at-capgemini/our-values-culture
[transparency]: https://capgemini.github.io/devops/transparency-of-things/
[culture]: https://capgemini.github.io/development/techniques-for-a-better-culture
[admit it]: https://capgemini.github.io/development/its-sometimes-clever-to-admit/
[netflix deck]: http://www.slideshare.net/reed2001/culture-1798664
[uncertainty]: http://www.red-route.org/quotes/ellen-ullman-ignorance
[cassandra]: https://en.wikipedia.org/wiki/Cassandra_(metaphor)
[admit]: #admit-when-youre-stuck--worried--unsatisfiedadmit-it
[innovate]: #innovate-and-industrialise
[ethics]: https://capgemini.github.io/development/making-ethical-development-choices/
[functional]: https://en.wikipedia.org/wiki/Functional_requirement
[non-functional]: https://en.wikipedia.org/wiki/Non-functional_requirement
[gold-plate]: https://en.wikipedia.org/wiki/Gold_plating_(software_engineering)
[guessing]: https://capgemini.github.io/agile/estimation/
[sprint planning]: https://www.mountaingoatsoftware.com/agile/scrum/sprint-planning-meeting
[open source]: https://capgemini.github.io/tags/#Open%20source
[hopper]: https://en.wikiquote.org/wiki/Grace_Hopper
[different]: https://twitter.com/tvaziri/status/743154209957285888
