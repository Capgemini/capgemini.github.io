---
layout: post
published: true
title: Risk Burndown
category: Agile
author: john_shaw
date: 2015-03-12
tags: [Agile, Risk]
mathjax: false
featured: false
comments: true
---

Few Agile approaches actively manage risk. There are some tools to help with risk, such as sprints, Definition of Done, etc. but there are few tools that are _explicit_ about risk.

Risk burndown is an approach I have used to visualise risk.

## Risk Value Lifecycle

A key part of Rational Unified Process (and other similar unified processes) is the concept of risk-value lifecycle. It's not a tool as such, more a thought process alluding to how project engagements should discover and analyse risk.

In RUP, this is an overlay to the phases, especially Inception and Elaboration.

Inception deals with discovery of requirements, or exploring the problem space. The end of the Inception phase is when it is agreed that risks have been discovered and evaluated.

Elaboration deals with the mitigation of risks, or exploring the solution space. The end of the Elaboration phase is when the risks have been mitigated. This is usually when a candidate architecture has been agreed and proven through working software.

To relate this to the risk-value lifecycle, the end of Inception is when all the risks have been discovered and the end of Elaboration is when all risks have been mitigated.

(Of course this is an _ideal_ view. Further risks may be identified after the end of Inception and risks may not be completely mitigated at the end of Elaboration. These are guidelines and are not to be taken too rigidly - it just has to be a consensus view that the project can proceed _knowing_ the level of risk.)

The phase after Elaboration is Construction. By actively discovering risks and mitigating them the project team have built a good foundation for the remainder of the project. This phase deals with scaling and the team can now concentrate much more on delivering value.

## Types of Risk

Donald Rumsfeld gave a famous [known knowns speech](http://en.wikipedia.org/wiki/There_are_known_knowns) a few years ago. This was largely derided as incomprehensible rhetoric, but he actually made a good point. There are risks out there that we know about, but there are risks out there that we do not know about. Projects must take deliberate action to discover these risks. This action must not be based solely on discussion, it must be based on trying out aspects of the solution.

That said, how does one know the problem space has been explored? Unfortunately I do not have a definitive answer to this, but some pointers are:
- Define the boundary of scope. This will determine the space to be explored. (Anything outside the boundary is waste!)
- Define the entire space within the boundary. This is likely to be in high level stories (or themes, epics) on the backlog.
- Be precise about the boundary of each of these stories to prevent items slipping between the gaps.
- Estimate the stories. This is likely to be imprecise for high-level stories, but should drive out some risks. E.g. t-shirt sizing may be good enough.
- Assign a risk to all stories. This should be a number, very much in the way stories points are used. The higher the number, the higher the risk. It might be enough to use the estimate itself and a flag to indicate the story carries risk. A risk-matrix approach of balanced severity/likelihood could be used too.

Until this space is explored thoroughly, the project might be carrying a large _unidentified_ risk.

Of course that only identifies risk. The next step is to mitigate risk. In traditional project management this means assigning some sort of action to reduce the impact or a pointer to some other action that will lower that impact. In the Product Backlog risk is lowered by delivering that story, or more likely, extracting the risky parts of the high level story into a smaller story to be delivered high up in the backlog. In some cases this may be a spike or an experiment of some sort. (RUP aims to mitigate features that are identified as _architecturally significant_ - again by taking an action to deliver part or all of that feature.)

## Risk Burndown

Applying the method described above would result in a backlog with stories broken down with risky elements extracted into smaller stories.

**Warning: Product Owners like to order the backlog by business priority.**

Fair enough, let's deliver the most important features first. Of course what I'm driving at is that business priority isn't the only important factor, especially early on in the development. Early on we need to perform experiments to prove the architecture. Equally we may explore user experience and other important aspects - but these are usually more obvious than the abstract concepts of architecture and non-functional requirements. Product Owners need assistance here; the Architect is an obvious source of help but a visualisation may help too.

The Risk Burndown is simply a plot of the sum of the risk in the Product Backlog. It is analogous to the Product Burndown, a plot of the sum of story points remaining in the backlog (which _might_ equate to value???).

This gives the Product Owner a visualisation of the risk, an important tool for discussion with the Architect and engineers. Of course the Product Owner may have good reason to prioritise on factors other than technical risk - but at least they are armed to make an informed decision.

![Risk burndown](/images/2015-03-12-risk-burndown/Risk-burndown.png)

The chart above is an example I used on a previous engagement. The vertical scale was number of stories (but could easily have been story points). Risk was marked as count of stories carrying significant risk (in this case marked as "architecturally significant" in the backlog) multiplied by 10 (weighted so the plot line would show up as significant compared to the other lines). (Applying the 80:20 rule, a factor of 5 would be expected: as a rule of thumb about 20% of the backlog carries risk. In our case a factor of 10 seemed to work.)

The risk-value crossover was somewhere around the 10th April, though don't read too much into this. It's not a milestone in itself (especially as an arbitrary weighting of 10 was applied to risk in this case!) it just indicates a good time to hold conversations around mitigation of risk vs speed of delivering value.

## Conclusion

Lightweight frameworks (e.g. Scrum) are not explicit about managing risk. Backlogs and project management techniques may not cover the detail that the delivery teams themselves require.

The Risk Burndown approach described in this article is one such technique, allowing the current risk level to be visualised. This allows the right questions to be asked during the lifecycle of the project. Very early in the project the trend would be for risk to increase as the risks are uncovered. As the development starts to gain pace the risks should plateau and start to drop.

As always, transparency allows us to inspect. Inspection allows up to adapt.
