---
layout: post
title: Rearing Good Design Ideas in the Wild
description: >-
  Thoughts on group design sessions, presenting ideas constructively and
  fostering healthy team conversation to ensure good engineering
category: Development
author: phil_hardwick
tags: [Engineering, Ways Of Working]
share: true
published: true
mathjax: false
featured: false
---

Imagine you're in a design session for a new component. The conversation is going back and forth between developers and architects but as they talk you discover the feeling of uneasiness in the current plan. It seems inflexible and prone to far-reaching modifications if change comes. You put out your idea: "I think we should... (insert your master plan here)". Some people pause but then discussion continues without giving your idea a second thought, leaving you to continue feeling uneasy. Was it a good idea? Was it a bad idea? Why did it not catch on?

## Pitching Ideas
I sometimes come across good ideas that gain no traction in a design discussion. I more often come across ideas in my own mind that I feel are better than the current solution but which I can't articulate. It's infuriating to have an idea formed which *feels* better but which can't be substantiated by your current level of technical eloquence.

Part of the key to good design is being able to articulate "why". You owe it to the team and your engineering practice to defend and pitch your ideas properly so that good ideas don't get swept away. The truth is, it's your responsibility to start a discussion and encourage conversation about ideas rather than simply throwing it out into the group and hoping someone catches on.

## Why You Need To Back It Up
Defending an idea is essential to giving it a fighting chance of survival out in the design discussion wilderness. Without backing it up, people may not understand why it's a good idea. They may have missed something you've recognised or, by explaining it, [you may realise you've missed something](https://en.wikipedia.org/wiki/Rubber_duck_debugging) in your considerations. Without backing it up, a good idea is not recognised for its merits and it's useless to the team - it's just another possibility, not a solution.
 
## When Presenting
To give yourself the best chance of creating discussion, make sure you prepare. Initially this seems like overkill, but this is practice, and in time you'll no longer need to prepare but will be able to evaluate designs on the spot. Question your thinking and play devil's advocate with your own idea: what will be the first counter argument?

To start you could talk about the possible problems of continuing with the current design. This sets people up to hear a solution, which they otherwise may not have been ready for, especially if they didn't believe there was a problem to begin with.
 
Make sure it's clear why you think your solution solves the problem of the current design, otherwise why is it better than what's currently there? If you're suggesting some refactoring it's good to give the other developers in your team a shared reason for the extra effort required.

Question your design and encourage others to question it. It might just be a bad idea and you need to be willing to find that out. However, simply the act of raising the issue could lead to other better solutions. It's better to present the problem and any solution you have even if you're not sure it's the right one.

## The Follow Up Discussion
In the discussion that follows it's essential to keep a few things at the forefront of your mind. Just as everyone else is respecting you by listening to your idea and giving it the once over, it's good to listen to and find some appreciation of their counter-arguments. If someone doesn't understand, appreciate the opportunity to improve your articulation of ideas to someone from a different background

If the team aren't feeling the idea then don't force it. It might be that the reason you're giving doesn't represent enough value in the minds of the team.

A common pitfall is to push your views because of historical reasons but no practical or functional reason to follow it: "it's how it's always been done", or "it's how I've seen others do it". This is also known as [cargo cult programming](https://en.wikipedia.org/wiki/Cargo_cult_programming), a practice where, because of inexperience or misunderstanding, code is added which serves no purpose. Allow others to question your actions and you might learn why it's a good practice or that it's simply tradition. The other pitfall is to push your views too hard and therefore endanger future design discussions - who wants to be involved in another awkward telling of what's right and what's wrong? It can also remove the shared purpose of the team. Pushing your own view promotes yourself rather than the team coming to the conclusion of a good design. Ultimately, a team working together and collectively owning a design is more important than any single design idea.

## Good Practice
Lastly, here are a few practical tips:

 - When someone makes a decision, ask why - you get to understand their articulation and their ideas. Their reasons will usually be universally applicable good reasons for design decisions so you can use them to inspect your own ideas.
 - These are universally good reasons which can be used to examine your own ideas, if they fit it's worth pointing that out to the team:
    - Is it good for isolating change?
    - Is it good for simplicity?
    - Does it increase reusability?
 - These are universally recognised bad reasons for design or refactoring and therefore questions which you should ask of yourself:
    - Is it [gold plating](https://en.wikipedia.org/wiki/Gold_plating_(software_engineering))?
    - [Are you going to need it](http://martinfowler.com/bliki/Yagni.html)?
 - When you have an idea, gather the team round for a quick informal discussion (no meeting invites necessary, just a white board will do) and present the problem and your solution.
 - As mentioned above, get a white board and draw your idea - it creates better discussion and makes it easier for anyone in the team to articulate their thinking because they can point at any part and the whole team will know what they are talking about.
    
Consider how you present your ideas. It's important to back up your suggestions, but also be aware of the team interactions and the discussion happening when a team solutionises. Lastly, question your own way of working: Do you find people easily buy into your ideas? How do you get everyone on board? How do you get the best out of the team so they learn to create other ideas and build on your own through discussion? Fostering a culture of healthy debate and openness will always lead to better engineering and solutions. 