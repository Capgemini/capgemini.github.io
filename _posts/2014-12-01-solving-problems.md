---
layout: post
title: "Solving problems being technology agnostic"
category: Architecture
author: alberto_lamela
tags: [Architecture, Development]
date: 2014-12-01
comments: true
share: true
---

We are used to building systems and solving problems under high quality requirements as developers.

When you are creating a whole system with its own behaviour and idiosyncrasy your solution is probably going to have some specific characteristics due to your requirements, your particular priorities and the context that you build it to.

There are many factors that matter when creating new architecture. Maybe the scalability of your system is a key factor for you. Maybe the requirements of your system can change frequently, so flexibility would be crucial. Maybe you have legacy code dependencies. Maybe you need to give priority to readability over performance. Depending on the capacity that your system needs to support, you could make different decisions. Valid approaches for monolith systems could not apply for decentralised or distributed systems.

Talking now about a lower level of abstraction, you will try to make the most of the language, technology stack and programming paradigm (imperative, functional, OOP, etc) that you choose or that you have to use.
So this will yield some peculiarities to your creation.

All this being said I find that we can identify some principles and techniques applicable for shaping almost any solution so sometimes we should think in a more "technology agnostic" way to make the right moves. Our system could be a "Drupal module", an "Automated Deployment Pipeline" or an "Enterprise Web Application". I think there are principles generic enough for applying to such different systems and that can help us to ensure quality and good results regardless of the nature of the problem when building a solution:

1. Choose the most appropriate form of separation for your problem and divide the system into reusable pieces in order to reduce the coupling between parts with different purposes. A piece is something that is able to interact with other components using a given protocol or "idiom" but that can work by itself (e.g. you will usually want to decouple your business logic from the framework, the back-end from the front-end, the database technology from the application, you could want to decouple the physical deployment in the form of a n-tier architecture). [SoC.](http://en.wikipedia.org/wiki/Separation_of_concerns)

2. Fewer components are better. Humans are not good at understanding complexity.

3. Create abstractions of complexity. [Abstraction Principle.](http://en.wikipedia.org/wiki/Abstraction_principle_(computer_programming))

4. Keep it simple. [KISS.](http://en.wikipedia.org/wiki/KISS_principle)

5. Isolate details.

6. Define a clear boundary for responsibilities. One thing for doing just one thing. [Single responsibility principle.](http://en.wikipedia.org/wiki/Single_responsibility_principle)

7. More frequent small changes are better than big occasional changes.

8. Don´t duplicate things. Reuse everything that can be reused. [DRY.](http://en.wikipedia.org/wiki/Don't_repeat_yourself)

9. Use meaningful names but without involved and unnecessary commitments. 

10. Choose conventions. Be consistent. Use the same approach for solving the same small problem several times.

11. Don´t procrastinate. Don´t increase debt. Do it now.

12. "Yes" is forever. If you're not sure about something new, say no. You can change your mind later, otherwise you will probably be technically committed forever.

13. [Automate everything that can be automated.](https://capgemini.github.io/open%20source/automation)

So having these principles in mind can be a helpful reference for driving your decisions when solving problems being technology agnostic. Here is a list with some resources that drove me to embrace these principles:

* [Codemanship](http://www.codemanship.co.uk)
* [Libcontainer principles](https://github.com/docker/libcontainer/blob/master/PRINCIPLES.md)
* [GoF](http://en.wikipedia.org/wiki/Design_Patterns)
* [Martin Fowler blog](http://martinfowler.com/)
* [Code complete](http://en.wikipedia.org/wiki/Code_Complete)
* [Continuous Delivery](http://martinfowler.com/books/continuousDelivery.html)
* [Patterns of Enterprise Application Architecture](http://www.martinfowler.com/books/eaa.html)
* [The Clean Coder](http://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073/ref=sr_1_1?s=books&ie=UTF8&qid=1326135682&sr=1-1)
* [Clean Code](http://www.barnesandnoble.com/w/clean-code-robert-c-martin/1101628669?ean=9780132350884&itm=1&usri=9780132350884)
