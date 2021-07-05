---
layout: post
title: "Thoughts on SkillsMatter Meetup: Plugin Architecture"
subtitle: "Uncle Bob describes plugin architecture and why it's so powerful"
description: "Some thoughts, reactions and highlights on Uncle Bob's explanation of plugin architecture"
category: Design 
author: phil_hardwick
tags: [Architecture, Design]
comments: true
share: true
---

I attended a [SkillsMatter meetup](https://skillsmatter.com/meetups/10171-clean-architecture-drawing-lines) the other day where [Uncle Bob (Robert C. Martin)](https://en.wikipedia.org/wiki/Robert_Cecil_Martin) explained some key features of clean architecture. It was a new talk and the content was taken from his new book ["Clean Architecture"](https://www.goodreads.com/book/show/18043011-clean-architecture). It was an insightful evening and a good reminder to be more purposeful in designing and structuring components - especially since writing more JavaScript recently I've found it much easier to not follow good design patterns. Below are some of the highlights of the talk which stuck out to me.

## Plugin Architecture
In this talk Bob advocates the use of plugin architecture and making use of good modularisation to enable swapping out of components whenever requirements change. He used the example of [ReSharper](https://www.jetbrains.com/resharper/) plugging in to [Visual Studio](https://www.visualstudio.com/) (VS). VS defines the interface for plugins and ReSharper implements that. ReSharper depends on VS - ReSharper knows about VS but VS doesn't know about ReSharper.

This can then be applied to any application - it can have a core which defines the interface and plugins which extend and add extra functionality. Plugin architecture is a powerful way to keep components separated and allow for extension and changes in the future but the core of the application has to be designed specifically to allow plugins.

## Databases and UIs are low level
Bob made the distinction between UI and database access code being low level and the business use cases and business entities being high level. The low level components should depend on the high level components, resulting in the high level components being independent of how the data is shown or how it is stored.

It was good to be reminded that databases are low level. So often I think of the database as tied to the business entities because I use an ORM (Object Relational Mapper) and the database tables are mapped 1-to-1 to the entities.

He also laboured that objects and data structures are different. Objects are a collection of methods which operate on some data. That data is hidden and we don't know where it comes from. By contrast, data structures simply hold data rather have functions which operate on it. By this definition ORMs (Object Relational Mappers) don't exist - it should be "data structure relational mappers". Either way, ORMs are fine to use but they're low level, they should be part of the database plugin and they shouldn't be tied to the business entities.

## Marrying your framework
One key point Bob made, which I thought very pertinent, was that we have a tendency to marry the frameworks we use. The framework authors don't care about whether you have good architecture, they care about you using the framework. They haven't promised you anything but you have promised to use their classes and annotations all throughout your code. We have committed to them but they haven't committed to us - a one way relationship. 

Is it possible to abstract away the use of a framework rather than using it throughout the code - can it be made as a plugin to serve a purpose? I would suggest that framework use should be kept out of the business logic and should be moved to a lower level component.   

## Direction of dependencies 
You need to be aware of the direction of your dependencies, and also be aware that you can change the direction if they start flowing in the wrong direction.

Because there is this distinction between low level components (UI, data access) and high level components (business entities), with low level components plugging in to and extending the functionality of the high level, the low level always depends on high level, i.e. the UI should depend on the objects and interfaces provided by the business rules and entities. This is shown on the diagram at the top of this [blog post by Bob from 2012](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html). The outer layers depend inwards and the real important components are the ones towards the centre: they can be coded without any external dependencies or mocks because they are what the rest of the application depend on.

When designing an application he suggested making a high level drawing of the components and dependencies between them but not going into too much detail. He then encouraged continuous refactoring to make sure dependencies keep on flowing in the right direction. If they don't, take control of the dependency directions and put an interface between the components so that lower levels always depend on higher.

## Are your business rules separate?
Bob made a good argument for separating business logic from the way data is shown and stored. This is a challenge: is your business logic clearly separated from your framework, the way it's shown to the user and the way it's stored? Can you point to a package and say, "those are all of the use cases and business entities and there's no SQL or HTML in there"?

He suggested that the business entities, the business use cases, the UI and the database access layer should each be a separate JAR/DLL or package. This means you can swap them out easy, deploy them independently (so you don't have to redeploy the whole application) and you can develop on them independently, allowing more teams to work on the same application. 

## Conclusion
I took away a lot to think on from this talk so I'll end with some good questions we should ask to make sure our architecture is clean.

* Is your business logic clearly defined and separated from the rest of the application code? 
* Can you swap out your UI without any change to the rest of the application? 
* Could you swap out your framework for another one that provides the same functionality? 
* Is your application structured in a way that can provide a new way of presenting the data e.g. chat bot, by just deploying (plugging in) a new package, or would you have to change the whole application?
