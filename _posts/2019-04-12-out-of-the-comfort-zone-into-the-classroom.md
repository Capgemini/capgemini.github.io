---
layout: post
title: Out of the Comfort Zone and into the Classroom
description: A post detailing the experiences of an engineer running a learning series
tags: [React, Engineering, Learning, Soft Skills, Technology]
category: Learning
author: [greg_wolverson]
comments: true
share: true
---

Last year I decided to run a React ([a frontend JavaScript Technology for building user interfaces](https://reactjs.org/docs/getting-started.html)) course within the account I'm working on. This year, I decided to do the same thing again, except to a wider audience with much better planning and structure. 

I've finally got round to writing something down about my experiences over the past year or so. Hopefully it's useful for anyone thinking whether or not to run a course/series themselves.

## Starting Out

I don't like speaking in front of people. Fact. 

I generally get very nervous, and often I prefer to be the person in the back quietly listening in, as opposed to being at the front leading the conversation. 

So why did I decide to run a course? A few reasons:

- I enjoy frontend development, and React in particular, and I wanted to see if others would be interested as well
- We wanted to try and build a capability within the account in this area, and I know a bit about React as a technology and wanted to try and share that knowledge
- I thought it would be a good idea to get out of my comfort zone

With enough 'solid' reasons behind my thinking, I decided to just go for it, what's the worst that could happen, right? 

## Going For It

Mid 2018 I decided to start running the first 'Learn React' series. I'd put together a chunk of content, which aimed to give a basic grounding in React, split down in weekly bitesize pieces. The turnout was fairly small at first; over the course of several months, we probably averaged less than 10 attendees. 

Being the first time I'd ever ran a course/series, I had no experience to draw on regarding how to run things; should I live code everything? Read through slides? Show video content? 

I had lots of ideas of how to do things, so in the end I just mixed it up and tried them all - which worked to a degree, but I often found myself going off-topic and talking around concepts I hadn't planned in the session content. Sometimes I'd be talking around how to render multiple components from a map function (like a todo list for example) and end up explaining how the JavaScript [map function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) works. This was a common trend throughout the series and a definite learning point from my perspective - next time, keep things simple and on point. If you touch on areas outside of the technology you're focusing on, provide a link or brief overview, don't let it detract from the content you're trying to deliver. There were several challenges I found such as this throughout the delivery of the course. 

## Challenges

### It's All In The Detail

One of the major struggles I found, as I alluded to above, was choosing the right level of detail to go to when trying to cover a certain subject. I'd be explaining a topic such as React state and how [setting state is asynchronous](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly), and suddenly find myself going down a rabbit hole about the asynchronous nature of JavaScript. At first I didn't realise that I was actually adding more confusion to the conversation, rather than keeping it simple. 

Sometimes it's good, and much needed, to explain how key aspects of the JavaScript language are key to how React works, however I found it important to keep those explanations to a high level, so as not to cause confusion or detract from the main points. 

### Live coding is tricky

I guess if you're normally cool, calm and collected, live coding probably isn't an issue for you. However, if you're anything like me, and usually hold none of the aforementioned traits whilst in front of an audience, live coding can be tough. 

I learnt this the hard way. Last year when I first started running the course, I was live coding quite a lot. It wasn't necessarily the typing of the code that was an issue. I'm convinced that live coding in front of an audience is a recipe for turning a perfectly working laptop into a cataclysm of failures. Suddenly your IDE stops working, the WiFi dies, you're trying to zoom in for those in the back and end up closing the IDE altogether. Before you know it, writing a routine `Hello World` app has turned into solving the [Travelling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) in front of an audience under tight time constrictions. Less than ideal.

Live coding also takes time, often more time than you realise when you're also trying to explain a topic for the first time. You quickly run out of time and find you've only half explained something, and the half you did explain was all over the place because you were trying to build it at the same time!

### Winging It

Just don't. 

Don't convince yourself that *you've got this* or *it's only explaining X, that's easy*. 

There were a few times where I did exactly the above, and as soon as I was in front of people, that idea of *you've got this* quickly turned to *you should have prepped for this*. 

Reason being (for me) was two fold. Firstly, you're potentially teaching a technology or aspect of a technology to people for the first time, they're going to take on board what you say - so it's only right that you prepare and deliver that content as correctly and factually as you can. You've made the effort to teach the course, do it justice.

Secondly, explaining a concept casually to a friend is a lot different to standing in front of a (hopefully) captivated audience. You can quickly forget something or go off point if you've not prepared anything, it also gives you that safety net if you do *freeze* or forget something you've gone over a hundred times before. 

## Lessons Learnt

After the first run of the series last year, I did come across a lot of challenges, but I also learnt a lot as well.

### Be Prepared

You don't have to go overboard, but doing a little prep work pays dividends in the long run. This year for the course, I actually created a [sample application](https://github.com/gwolverson/learn-react) first, split up into topical chunks in different Git branches. This was a nice way of splitting the content up and allowed me to cover certain aspects more easily. I could still live code to showcase particular things, but it gave me that safety net of 'here's one I did earlier'. 

### Don't Wing It

Again, similar to above, don't try and wing it. You'll only do yourself and the audience a disservice if you do. That little bit of extra effort into preparing for each session definitely makes a big difference to both your experience of teaching, and the audiences experience of learning. 

### The Devil's In The Details

The level of detail you need to go too will depend on your audience. For me, the audience was very new to React, front end development and JavaScript, so my explanations of certain aspects of React differed between sessions. Ultimately, I found it was about striking the right balance between just enough extra detail to support the React content, but not too much that it would overload people or add more confusion than clarity.


## Final Thoughts

I *actually* enjoyed running the series (and still do) much more than I thought I would. 

As I mentioned at the start, standing up in front of an audience is definitely not my thing and pushes me out of my comfort zone quite a bit. However, the process of running the course(s) has benefited me in several ways;

- I know a lot more now about React than I did at the start, because I wanted to ensure I was crystal clear on the aspects I was teaching
- I've gained more confidence now in speaking up in front of people, and sharing the things I've learnt
- I was able to share my knowledge with a lot of new people, introducing them to new technologies and helping them up-skill

If you're anything like me, and the idea of standing up in front of people and teaching a course scares you, you'd be surprised at how much you'll learn from it. Not only from the content that you're going through, but also about yourself.

One of the great things about our team and Capgemini in general is you get the freedom to try new things. Knowledge sharing and teaching new content is great, all of us will have been that knowledge sponge throughout our careers, so it's nice to give back, and even better when your supported in doing so.

So if you're sitting there thinking you'd like to run a learning series, but you're not sure how it will pan out. Go for it, you might surprise yourself.
