---
layout: post
title: "I Test, Therefore I Am"
description: >-
  A process for testing software using an iterative cycle which encourages simple designs and inspires confidence.  
category: Development
author: az_madujibeya
tags: [TDD, Unit tests, Testing, Engineering, Best practices]
comments: true
share: true
---
The three laws of TDD, as espoused by [Robert C. (Uncle Bob) Martin](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd) state:

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

These laws form the basis for [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development), a design approach to writing clean code.

This topic is not new (Uncle Bob has been teaching it for a number of years) but it's helpful to keep raising it.  It should always be present in the mind of all developers when they embark on any new project so they can ask the obvious questions: Can I use it effectively on this project? Will it be useful? Will it help improve productivity? Does the system being designed lend itself to TDD?   

There are a myriad questions already posed about the usefulness of TDD to a project and they are quite pertinent and should be taken seriously so that you don't waste time writing tests for something that needs no tests, or cannot be tested in a test first approach.

Using TDD should lead to a well developed system with unit tests which are very specific to the particular piece of functionality, and the corresponding production code being more generic. There should be little or no coupling between production code and unit tests so future modifications and updates to the code can be developed quickly and effectively, especially if this design approach is followed where possible. This helps in the overall design of the system and can lead to exposing flaws early that otherwise might not have appeared till late in the development cycle.  These are two benefits of a test first approach: maintainability and good design, which gives confidence that the system being developed functions as per its stated test objectives. 

## A leap into the unknown?
Often, developers jump right in and start writing code first leaving any unit tests till the end, but this can be counterproductive and could waste more time than is often thought is being saved by not following a test first approach, or any approach at all for that matter.      

Some experienced developers choose not to use TDD and instead and prefer to approach the design of the system using [Domain Driven Design](http://ryantablada.com/post/we-are-complicating-things-a-bit-too-much-(tdd-and-ddd)).  DDD is the process of being informed about the Domain before each cycle of writing any code!  Behaviour Driven Development [(BDD)](https://www.agilealliance.org/glossary/bdd/) is an implementation of TDD and uses aspects of DDD.  It also lends itself to testing certain conditions for a user story or feature.
In either case, using any approach, whether structured like TDD, or nothing at all is fine and having the flexibility to choose is a good thing, so long as the reason for for doing so is clear and the objective is kept foremost in one's mind. 

## Take small steps
Knowing when to use TDD and doing it well can be a stumbling block to those not acquainted with the process initially as it takes some getting used to following the 'red, green, refactor' steps that protagonists of TDD espouse.  However, after the initial hurdle and some time following these small steps, because that is the only way to approach this, the benefits are apparent to anyone that does it for the first time. 

Following the test first approach of TDD sounds easy but it isn't.  Writing tests depends on how clearly defined any acceptance criteria is for a particular story, and if you do have this then definitely make use of it to define any test scenarios that need to be developed. Also, if you're just beginning to learn TDD then pair programming is the best way to start, especially if you can do so with someone that has experience.  You can decide who writes the first test and accompanying code, then switch when you're both happy with the result.  

In my experience, pairing with a colleague who also knew the process was the best way of improving. We were able to take it in turns to define a test, run it to see failure, then implement code to make that test to pass.  We went through this process iteratively until we were complete, swapping between writing the test and the implementation so that when finished we knew that our implementation was what we wanted and that it was backed up by our successful test. We continued this process until the whole user story was completed and it was no surprise that running a build at the end of the process was successful, as our process had given us confidence along the way. 

## Do Androids Dream of Electric Sheep
Failure to follow the three rules of TDD can lead to breaking existing code, as I found out to my cost on a recent user story.  I can hear Uncle Bob saying "suffer the consequences all who fail to follow the [red, green, refactor process](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html)" and laughing maniacally.  However, as with any methodology you get out what you put in and even if the community shifts towards something newer or more shiny, that won't mean that time has been wasted doing what's currently the flavour of now!  I believe quite the opposite because when new things do crop up (and they always do), being able to adhere to the 'methodology' will be in no small part due to having followed a prior one.  

Flexibility is always a good thing to employ when embarking on any new framework or methodology so bear that in mind when, like me, you're an ardent supporter of TDD, and try to recognise the good and bad in any framework and adapt it to your own specific needs.

## Conclusion
There's much to take on board with TDD, but with anything new just take small steps and try to follow the process strictly.  Only once you're confident and comfortable should you allow yourself the luxury of flexibility. With your knowledge it doesn't matter that you hadn't refactored a common field into a class variable before or after a certain point because you can defer certain things till later.  It also doesn't matter that you start with your `setup()` method because more than likely you'll need one at some point.  Just allow time to do the refactoring at some point, and try not to break what was already working and you'll be just fine. 

## Further Reading
[Uncle Bob's Three Rules](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd)

[When TDD Does Not Work](https://8thlight.com/blog/uncle-bob/2014/04/30/When-tdd-does-not-work.html)

[Is Unit Testing or TDD Worthwhile](http://softwareengineering.stackexchange.com/questions/140156/is-unit-testing-or-test-driven-development-worthwhile)

[Test Driven Development](http://agiledata.org/essays/tdd.html)

[Don't Complicate Things](http://ryantablada.com/post/we-are-complicating-things-a-bit-too-much-(tdd-and-ddd))



