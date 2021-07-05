---
layout: post
title: "Making ethical development decisions"
description: "Taking arms against a sea of change requests"
category: Development
author: rob_kerr
date: 2015-06-04
tags: [Development, Ethics, Choices, Decision-making]
comments: true
share: true
---
We are moral agents.  Each of us makes countless choices throughout the course of a day, and many of these choices have ethical parameters and ramifications.  We seldom, if ever, stop to think about those choices and their impact on ourselves and on others.  It's my aim in this blog post to redress that lack, and hopefully to help us think more clearly about the moral choices that face us as developers.

In order to illustrate my points, first let me introduce you to Getchure Widgets Co.  Getchure Widgets have a business model selling widgets to unsuspecting customers, and they have hired our team at CleanTeam to create their website.  We here at CleanTeam have many projects on the go, and the Getchure Widgets site is only one of our current projects &#8212; but an important one, a flagship project.  So the relationship is important not just reputationally, but monetarily.

Our team for the Getchure Widgets project is a few developers (of which you, dear reader, are one, as am I); a designer; a project manager; and our usual DevOps colleagues.  We meet with representatives from Getchure Widgets every week, and have a good relationship.  We are just about to start a series of sprints that will result in the release of some important new functionality for the Getchure Widgets site, featuring a brand new line of widgets, and we're all excited about the work.


## Ethics in the workplace
Balancing decision-making is a juggling act. Often it's the people who shout the loudest that get decisions to go their way, and of course, we must be aware of the [hippo in the room](http://www.uxforthemasses.com/tips-for-handling-a-hippo/). Unfortunately, this often means that users, whose voices are not loud, and whom we must seek out in order to hear their voices, can become the smallest part of the equation, when ideally (to some) they would be the largest.

We are moral creatures, and we have moral instincts. But in order to gain access to those instincts (having had them atrophy due to disuse) we need to trigger them by asking the right questions. Start asking yourself moral questions: the answers might lead you in surprising directions.

In our last meeting with Getchure Widgets, they mentioned a feature they've asked for which they're quite keen to get live as early as possible.  They want to encourage customers to sign up for updates and news items related to widgets they have purchased in the past.  They've seen a pattern in use on the web which they think will lead to more people signing up, and they'd like us to implement that pattern.  We have some concerns....


## Question 1: Whom does my decision affect?
Every decision that we make will affect someone, either directly or indirectly.  Therefore, when we make decisions that have moral parameters, it behooves us to trace the chain of impact as far as we need to, so that we can know on which side of the fence the angels would fall.  A useful start to this process is asking who will be affected by your decision.  

Clearly, any change to functionality on the site will affect users of the site.  However, the choices we make have much wider effects than the merely obvious.  The first person to be affected by any choice is the person making the choice.  [Reinforcement Theory](http://en.wikipedia.org/wiki/Reinforcement_theory) suggests that once we make a choice, of any sort, we are subsequently far more likely to make the same choice in the future in similar situations.  We should therefore make certain that we are making the best choice we can; and further, we should ensure that we have the best information to inform us about our choice.  If we make choices based on information, then new information will permit us to make different choices, where we might otherwise have been swayed by our beliefs, attitudes, or prejudices.

Decisions we make also affect our team.  If we implement the pattern Getchure Widgets have asked without asking any questions, that sets a precedent for our client interactions that the rest of the team can see and use as a model.  Is that the kind of model we want to be putting in front of them?  

Our team also have their own moral intuitions.  We need, when making choices that affect the product (particularly in an Agile environment), to be certain that the team has visibility of all changes, and the opportunity to argue against them.

Clearly, decisions that we make will also affect our client: both directly and indirectly, propagated to them via the direct effects we have on the piece of work we are undertaking on their behalf.  As ethical developers, therefore, we should strive to make sure that the effects of our decisions that pertain to the immediate task do not propagate adversely to the client.  All of us have likely been involved in discussions about proposed changes where we argued that the net effect of the change would be damaging from a reputation point of view.  In these cases, we are clearly arguing from an ethical position.  However, the decisions that we make on a day-to-day basis can also have this kind of damaging effect on reputation.  When we kludge a fix for a bug and push it live; when we fail to complete our target test coverage; when we choose the easy option over the more correct but also more time-consuming option; in these situations our choices adversely affect the reputation of the owner of our site, because while the end user may not know it, _their experience could have been better_.


## Question 2. [Cui bono](http://en.wikipedia.org/wiki/Cui_bono)?  (Who gains?)
Decisions that we make as developers clearly redound to the benefit of some parties, as otherwise, no decision would be necessary.  Often, though, we fail to look beyond the immediate beneficiaries, and thus our weighing of the pros and cons of any given decision may be biased.  We might choose a path based on the immediate beneficiaries without considering another option whose immediate beneficiaries were not as compelling, but whose more remote beneficiaries could have been a much stronger selling point, did we only take them into account.  How can we fix this?  Here are some points to consider.

*Proximate benefits versus ultimate benefits*<br />
In the case of Getchure Widgets's new requirements, clearly the immediate benefit of acceding to their demands is a satisfied client, the ability to start work straight away, and a sense of progress.  However, if we look beyond the short term, we might see that those benefits are illusory, and the long-term benefits of arguing the right thing with Getchure Widgets could be a better product, more trust between Getchure Widgets and its customers, and more trust between Getchure Widgets and us as developers.  Sometimes we can be our clients' best advocates in the marketplace, and save them from themselves.

*Short-term benefits versus long-term benefits*<br />
If we focus on the short-term when making decisions, we store up problems for our future.  This can most clearly be seen when making architecture decisions, or when deciding what technology to use to solve a problem.  It is also seen in questions around the benefit of refactoring, and it is here that we as developers can really sell refactoring to clients.  Building trust with a client entails transparency about decisions, and [sometimes creating technical debt is unavoidable](http://www.infoq.com/articles/managing-technical-debt)  We know that in the short-term, clients prefer new functionality to invisible improvements in old code.  But as developers, we should be able to sell refactoring as a _reduction in time to market_ for future features, building on the trust we establish by looking beyond proximate benefits.  For every development decision we make, then, we should be asking ourselves, are we creating technical debt?  Is it necessary?  Are we kidding ourselves, and actually creating [technical waste](http://devblog.avdi.org/2011/08/15/the-coding-wasteland/)?  These questions may not be answerable by one person, and some developers will draw the line in different places.  Peer review, but more usefully, pre-implementation discussion, can be valuable in making these decisions.

*Effect size*<br />
Fairly simple, this one: it is merely to point out that close inspection of any decision can uncover repercussions that are well beyond what might have been thought on a cursory inspection.  It therefore behooves us as conscientious developers to think clearly and thoroughly about the effect that changes introduced by our decisions might have.  Which leads us to...

*Ripple effect*<br />
The effect of our decisions ripples beyond our immediate circle of influence.  Being aware of this ripple effect can help us to make better decisions that are more engaged with the entire effect size of our decision.


Who suffers?  (Cui patitur?)
----------
While modern commerical transactions (in the main) are mandated on the idea that commerce is not a [zero-sum game](http://en.wikipedia.org/wiki/Zero-sum_game), for any decision that we make there is an opportunity cost to us the decision maker, and potentially to some other party or parties.  In our Getchure Widgets question, deciding to value the long-term benefits over the short-term gains might mean that the person in favour of the short-term decision at Getchure Widgets loses face.  Our question then becomes, can we eliminate this loss?  If we can't, can we minimise it?  Can we spread the risk of loss for any decision so that its impact doesn't fall solely on one person (or organisation)?  Can we apportion potential loss to those best equipped to deal with it?  And if we can, is it a moral choice to do so?

When we make a decision to remove or change functionality, or reduce scope, recognise that we are adversely affecting some hypothetical person's experience of our product.  Conversely, we may be enhancing someone else's experience.  Is the balance of harms equally weighted?  Questions of accessibility are clear examples here, where the harm done to a user by removing accessible features clearly outweighs the harm to a user of ignoring or disabling accessible options they do not need.  If the loss of functionality, and therefore the harm, is temporary, then we can say that the loss is mitigated, and thereby potentially justifiable.  But we need to ensure that we are not facilely attributing mitigations to actual features lost (and harms done thereby).  We must be sure that any mitigation of losses is real and not imagined before we make a decision to proceed.


## Can I minimise losses?
When we make decisions that negatively impact people, we should clearly try to minimise those losses.  But then our question becomes, what does that mitigation cost us?  There is a trade-off in resource usage between mitigation of loss and development of new features, between time used and cognitive load of switching between different requirements, and between all of the above and their perceived benefit.  In general, it is better to focus on maximising gains rather than reducing losses, as users (and clients) value gains more than reductions in negative impacts.  But this will vary from user to user, and our point above about long term benefits of refactoring will also play a part in deciding when to draw a line under minimising losses created by the decisions that we make.


## How do I ~~(live without you)~~ anticipate effects?
This may be the crucial question, certainly for new developers.  The answer lies in empathy and understanding, in experience of the effects of previous decisions, and in the nature of being human.  To be human is to be able to imagine what the consequences of a decision will be without having to actually go through with the decision (and thereby find out exactly what the effects might be through hard-won experience).  In philosophy, this is known as [higher-order thinking](http://www.iep.utm.edu/consc-hi/) where we think about what we might think should a certain state of affairs come to pass.  We do this naturally in social situations.  This quote clearly demonstrates that it is natural for us to do this kind of thinking:

> I know you think you understand what you thought I said, but I'm not sure you realize that what you heard is not what I meant.
> 
> <cite> Alan Greenspan

But aside from this natural anticipatory sense that we all share to one degree or another, there are specific things we can do to aid our native senses.

*Put yourself in the user's place*<br />
Be empathic.  Understand how actual users use your product, and how your decisions might affect their experience.  Talk to actual users, watch them use the product and gain a real-life understanding of how your decisions might change their experience.  Do this again and again.  Over time, build up a picture of how users interact with your decisions, and how they react to changes.  Gain experience of how users behave in general.  *BUT* remember to check your assumptions!

*Prototype and test*<br />
One of the best ways to anticipate changes and their effect on users (and others) is to trial them quickly, and gauge reaction, and then to feed that back into the decision-making process.  It is essential when doing this to be timely, and to make efforts to avoid sources of bias.  There is a great deal of research on avoiding bias in testing with users (and in making decisions) out there, and I urge you to seek it out.  http://alistapart.com/article/collaborative-user-testing-less-bias-better-research is a good starting point.  Understanding your own biases can help you to avoid them, though this is always difficult, and you will generally be better off relying on others to point out your own biases while you point out theirs.  This can be painful, but also a source of fun in office-based teams ;)

*Beta feedback*<br />
If it is possible for your product, releasing beta versions and getting feedback from early adopters and other users can be invaluable, _so long as the feedback is genuine, the user sample is random (well, as random as it can practically be), and the feedback reaches the decision makers unfiltered_.

*Follow the chain*<br />
Don't be satisfied with uncovering the immediate impacts of decisions that you make.  Follow the logical consequences as these propagate outwards.  The ripple effect of our decisions can be anticipated, but only with a cost in time and structured thinking.


## Where is the guidance?
As I said at the outset, we are moral agents, and we make moral decisions all the time in our lives.  However, it is much rarer that we formally decide on a moral pathway having considered fully the alternatives.  Where can we see examples of this process, and where can we get advice on how to process moral quandaries?

Our peers, colleagues, and life in general are rich sources of moral choices that need to be made.  If you have children, you will have made moral decisions regarding your care of them, and these decisions will often have been carefully considered.  Each time you are faced with a choice in your life outside work, you can choose to inspect the moral ramifications of that choice at your leisure.  This can then become a framework for how you approach the same kinds of choices in your working life.

You could choose to adopt a specific ethical framework or guiding principle.  Philosophy has been concerned with ethical choices from the time of Aristotle and before, and a great deal of careful thought has passed under the bridge, the conclusions of which are available for all to consume.  Thought experiments like the [trolley problem](http://en.wikipedia.org/wiki/Trolley_problem) can help to shed light on what your ethical intuitions are, and understanding these will help you to align the choices you make with your own moral instincts.


## Universalise
I'd like to close by giving an example of the foregoing, using the [Kantian ethical principle](http://en.wikipedia.org/wiki/Kantian_ethics) of universalising choices.  This principle requires that, when a moral choice is extended to all people, a contradiction does not occur.  I like to think of this as asking, for any choice I make, whether I would want to live and work in a world where everyone made the same choice I make.  For Getchure Widgets, if everyone simply acceded to the demands of the client without any argument, that would quickly contribute to a working environment where developers were not empowered to argue decisions they did not agree with, and eventually to developers becoming simply machines for executing the commands of management.  That would not be a world I would wish to live in, and so the moral choice from a Kantian point of view would be _not_ to accede to those demands without arguing for a better way.

Finally, you need to inspect your choices.  If you make every choice as though it were independent of the others, you cannot gain any understanding of yourself as an agent of change.  Decisions we make as developers contribute to an environment where moral considerations are at the forefront of people's thinking.  If we ignore our contributions to that enviroment, we can fail to adjust our understanding sufficiently to incorporate new influences and new agents also making choices in the same space.  As moral agents making choices, it behooves us _if we are making good moral choices_ to enable ourselves to continue to influence the moral atmosphere in which choices are made.  Sometimes that will mean that the very best choices are not available to us.  (The kinds of choices where, in protest at a decision whose morality one doesn't agree with, one resigns.) The difficulty of making ethical choices lies not in the easy decisions, but in the hard ones.  Ultimately, making the most moral choice can mean making the hard choice, because it is the _most right_ of the choices available to us.
