---
layout: post
title: "A Hippocratic Oath for Software Engineers"
description: "What developers and doctors might have in common - towards a professional code of conduct for the tech industry"
category: "Development"
tags: [Development, Culture, Engineering]
author: malcolm_young
comments: true
share: true
---

It may initially seem that doctors and web developers don't have that much in common, but [an episode of Freakonomics Radio looking at the Hippocratic oath][Freakonomics] a while ago got me thinking about what a general code of good practice for the software industry might look like. 

Particularly given the state of the tech industry over the past few years, the idea of members of a profession vowing to uphold a specific code of ethics is one that we could learn from, even in a field that initially seems unrelated. Some people are already considering the need for [an ethical framework for data science][data ethics], and there's clearly a need for developers to think about more than just the technical aspects of the software that we build.

It isn’t the first time that [the subject of ethics][ethics] has come up on this blog, although there's more to the idea of an oath than ethics. A few years ago, Andrew Harmel-Law and I were trying to write [a manifesto for the right way to approach software development and build an engineering culture][how we work], and I want to revisit that theme, viewing our profession through the lens of some extracts from [the Hippocratic Oath][hippocratic].

## "I will respect the hard-won scientific gains of those physicians in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow."
As so many of us would testify, we stand on the shoulders of giants, particularly when we build systems using open source software. By using tools and knowledge shared by others, we can achieve things that wouldn't otherwise be feasible, and by sharing our own tools and knowledge, we can do our bit to keep that virtuous circle going. Within our team, we strongly encourage open source contribution, mentoring and knowledge sharing - the whole point of this blog is to share what we have learned.


## "I will apply, for the benefit of the sick, all measures [that] are required, avoiding those twin traps of overtreatment and therapeutic nihilism."
I'm not entirely sure what a software equivalent of therapeutic nihilism might be, but I would definitely draw a parallel between medical overtreatment and the tendency often displayed by engineers for [over-engineering solutions][YAGNI], or being [distracted by technology for its own sake][boring]. There's often a danger that developers get sucked in by the new toys that all the cool kids are playing with, whether that's a front end framework or an esoteric language or a build process. As developers, we like to build things, and if we're not careful, we can find ourselves in thrall to the activity of building itself, rather than stepping back and asking whether we are actually solving a problem that needs to be solved.


## "I will remember that there is art to medicine as well as science"
As much as we like to talk about being engineers, what we do isn't purely cold and logical. Yes, there are aesthetic considerations to code, a pursuit of elegance as well as efficiency, but there’s more to it than that. Sometimes when we're solving problems, we go by hunches. Code somehow _feels_ right, or [smells wrong][code smells]. But more importantly, we need to communicate. We need to ensure that the next developer who maintains our system can understand it.


## "warmth, sympathy, and understanding may outweigh the surgeon’s knife or the chemist’s drug."
Writing code is only a small part of what we do. Something that keeps coming up again and again in our industry is that so-called ["soft skills"][soft skills] are as valuable as technical knowledge, not least because ["all Computer Science problems are people problems"][people problems]. So much of our jobs are about talking to people to understand the problem, rather than jumping into solutions. 

Building relationships with clients and other delivery partners is vital - before we can even think about building the thing right, we need to understand the problem area enough to be confident that we're building the right thing. On top of that, within a team it's important to build a supportive atmosphere to give colleagues the psychological safety that we all need to do our best work.


## "I will not be ashamed to say "I know not," nor will I fail to call in my colleagues when the skills of another are needed"
When I'm recruiting, I'd much rather hire someone who admits that they don't know the answer than someone who tries to bluff their way through a difficult question. As we've mentioned before on this blog, it’s important to [acknowledge our own limitations][not clever] - I'm proud that we're not too proud to ask for help, not so arrogant as to think that we know it all. The technologies we work with are so complex, and their use cases are so diverse, that no single person could ever have the breadth and depth of knowledge to be able to answer all possible questions.  

On Slack, we have a bot that keeps a karma points ranking - it's no coincidence that "team" is way out in front, with twice as many points as any individual. When we work together, we can achieve far more than any single person could. 


## "I will respect the privacy of my patients"
It's impossible to overstate the importance of keeping user and client data secure on the internet, but beyond that we also need to recognise that our clients trust us to help them solve their problems, and we need to respect that trust.


## "I will remember that I do not treat a fever chart, a cancerous growth, but a sick human being, whose illness may affect the person’s family and economic stability. My responsibility includes these related problems"
Our job as software engineers is not just to build the thing that we’ve been told to, or fix the bug that is described in the ticket we’ve been assigned. We need to [see the bigger picture][bigger picture], which might mean lots of different things. As well as the code we’re working on, we should consider the system as a whole, whether that’s in terms of security, accessibility, performance, user experience, maintainability, or any number of related considerations.

As well as the system itself, we should bear in mind the wider business goals of our clients, and the society in which it operates. The ticket that one developer works on is part of a sprint, which is part of a project. The project is (or at least should be) part of the overall strategy of the business. The business is part of the wider world. All of these deserve consideration.


## "I will prevent disease whenever I can, for prevention is preferable to cure"
Most developers have a favourite war story about the time they had to pull an all-nighter to figure out some obscure bug or get their project out of some mess. Just as there's a certain strange glamour attached to epic surgery, there’s a perverse kind of glory associated with these supposedly heroic feats of virtual firefighting. There’s an intensity, a sense of vitality, a buzz, but it’s not healthy. We congratulate ourselves for pulling out all the stops to get ourselves through a crisis, but that crisis should never have been allowed to happen. 

What is less exciting, but far more valuable, is making sure that the project never gets into a mess in the first place - vaccinating our project against crisis through solid processes like testing and automation, or the simple expedient of not trying to do too many things too quickly. If we can prevent problems from occurring, we're all much likelier to enjoy our weekends.


## "I will protect the environment which sustains us, in the knowledge that the continuing health of ourselves and our societies is dependent on a healthy planet." 
More and more, we need to consider the [environmental impact of technology][environment], and we can no longer ignore the contribution to climate change made by what we do, whether that's in what we build, the data centres where it's hosted, or how we go about our business. We should be doing more to aim for sustainability, and let's not get onto the subject of [blockchain][blockchain].


## "I will remember that I remain a member of society, with special obligations to all my fellow human beings"
Sometimes there can be [a division between 'technical people' and ‘normal people’][xkcd], a sense that the technology team are somehow separate from 'the business'. Developers can sometimes be guilty of fostering that sense of division, perhaps by speaking in jargon or misjudging the level of detail that's appropriate to the audience, or behaving as if considerations of business needs are somehow beneath us. 

It’s too easy for developers to [imagine that technology can solve all the problems][moral economy of tech], or to think that normal rules don't apply to technology or technologists. We need to remind ourselves that we don't exist in some separate sphere where we can devote ourselves to the loftier pursuit of solving technical problems, outside of the messy realities of human interaction - like it or not, we're all in it together.


## "May I always act so as to preserve the finest traditions of my calling and may I long experience the joy of healing those who seek my help."
It may be overstating things to describe what software engineers do as a calling, but we should regard it as a profession. That doesn’t just mean that we get paid for it, but that working with software should be ["a vocation founded upon specialized educational training, the purpose of which is to supply disinterested objective counsel and service to others"][profession]. We should maintain professional standards, and we should take our responsibilities seriously.

That’s not to say that there should be high barriers to entry - speaking as [someone who evolved into a web developer][career], one of the things I like about building websites is that you can start (and continue) by tinkering. The technology world as a whole, and the open source software movement in particular, needs enthusiastic amateurs, people without formal training, people who are coming at things from a different direction - people who remain members of society. 

The tech industry may not have been around long enough to have such well-established traditions as medicine, but it’s vital that we don’t get distracted by the new and shiny, or neglect the fundamentals. Just because computers are more powerful than they used to be, it doesn't mean that we can ignore the basic principles of efficient computation. Web developers building things with JavaScript frameworks need to be aware of the basics of semantic HTML and accessibility.

Solving problems can be fun. It's satisfying not just because it feels good to help people, but it also brings its own rewards. Being able to solve problems with technology brings with it some power, and with power comes responsibility, which brings us back to the need for some principles to work by.

So having looked at some parallels with the medical oath, perhaps this could be a first iteration of a new oath for software engineers: 


## A developer's oath
I swear to fulfil, to the best of my ability and judgment, this covenant:

I will respect the hard-won scientific gains of those developers in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow.

I will apply, for the benefit of the project, all measures that are required, avoiding those twin traps of over-engineering and therapeutic nihilism.

I will remember that there is art to code as well as science, and that readability, clarity, and maintainability may outweigh brevity and complexity.

I will write appropriate comments in my code to help the next developer who maintains it to understand why the system has been built the way it has.

I will not be ashamed to say "I know not", nor will I fail to call in my colleagues when the skills of another are needed for a project's progress.

I will not take code review comments personally, and I will use code review as an opportunity to support and help my colleagues.

I will respect the privacy of my clients and users of my software, for their problems are not disclosed to me that the world may know. Most especially must I tread with care in matters of personally identifiable information.
 
I will remember that code should always be in service of solving a problem, and will not apply new technology just because it is interesting to me.

I will consider the needs of users ahead of developer convenience and considerations of theoretical purity.

I do not build a method or an object, but a system, which may affect the client's employees, users, and economic stability. My responsibility includes these related problems, if I am to care adequately for the system.

I will prevent problems whenever I can, for prevention is preferable to cure.

I will protect the environment which sustains us, in the knowledge that the continuing health of ourselves and our societies is dependent on a healthy planet.

I will remember that I remain a member of society, with special obligations to all my fellow human beings, not just the technologically privileged but also those who have less expensive devices and those who find computers difficult to use.

If I do not violate this oath, may I enjoy life and art, respected while I live and remembered with affection thereafter. May I always act so as to preserve the finest traditions of my calling and may I long experience the joy of solving interesting problems.

[Freakonomics]: https://freakonomics.com/podcast/bad-medicine-part-1-story-98-6/ 
[how we work]: https://capgemini.github.io/development/how-we-work/
[hippocratic]: https://en.wikipedia.org/wiki/Hippocratic_Oath
[career]: https://red-route.org/articles/how-i-got-here-there 
[not clever]: https://capgemini.github.io/development/its-sometimes-clever-to-admit/ 
[people problems]: https://www.thoughtworks.com/en-gb/insights/blog/tech-not-problem-people-are 
[soft skills]: https://itsyourturnblog.com/lets-stop-calling-them-soft-skills-9cc27ec09ecb#.lzcyril4q
[moral economy of tech]: https://idlewords.com/talks/sase_panel.htm 
[profession]: https://en.wikipedia.org/wiki/Profession 
[code smells]: https://martinfowler.com/bliki/CodeSmell.html
[YAGNI]: https://martinfowler.com/bliki/Yagni.html
[first do no harm]: https://en.m.wikipedia.org/wiki/Primum_non_nocere
[diversity]: https://capgemini.github.io/engineering/Capgemini-Engineering-Diversity-Manifesto/
[ethics]: https://capgemini.github.io/development/making-ethical-development-choices/
[boring]: https://mcfunley.com/choose-boring-technology
[data ethics]: https://www.wired.co.uk/article/data-ai-ethics-hippocratic-oath-cathy-o-neil-weapons-of-math-destruction
[bigger picture]: https://capgemini.github.io/agile/bigger-picture-smaller-details/
[xkcd]: https://xkcd.com/627/
[environment]: https://www.capgemini.com/2021/05/sustainability-cloud-computing-with-microsoft-azure/
[blockchain]: https://www.investopedia.com/tech/whats-environmental-impact-cryptocurrency/
