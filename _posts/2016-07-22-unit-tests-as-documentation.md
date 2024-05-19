---
layout: post
title: Unit Tests are the Best Documentation
description: >-
  When there's no documentation for the exciting new open source project you
  want to use, where do you turn?
category: Development
author: phil_hardwick
tags: [Unit tests, Testing, Documentation, Engineering, Best practices]
comments: true
share: true
published: true
mathjax: false
featured: false
---

As a relatively new developer (I've only been writing code and learning for just over 3 years) this has been a bit of a revelation for me. I'm sure for most seasoned developers this is old news but it's improved my productivity no end and it's worth making a habit of it.

So you've found this new library and it looks really cool, nice syntax, good abstractions and you want to try it. But after doing their "hello world", you want to do something more "real world" and you find you don't know how to do what you want from the README.md. Working with Open Source projects I increasingly find myself looking at sparse documentation thinking, "I'm sure it said it could do this, but there's not an example of it here". So what do you do when there's no documentation for your idea, but you know it can be done?

When in this situation, I start a process of looking through a number of places that I haven't before. This is not just googling for the answer for hours until I find some obscure forum post of someone who's done the same.

## Use the Source, Luke
Some of the best documentation is on the methods you're trying to use. Having the documentation next to the code it's talking about *usually* means it's up to date and relevant. However, there isn't always extensive documentation in code so, failing that some looking through the source code is gold compared to looking at a wiki page or usage page. The source code will tell you how things are implemented. Reading method names you will be able to find out the full public API of a class whilst also understanding its internal processes. For example, recently I wanted to use `MultipartEntity` to send a multipart-form upload in Camel - an HTTP POST with a file attached. I happily added this code to IntelliJ:

    MultipartEntity multipartEntity = new MultipartEntity()
    
However, I promptly realised this was deprecated because of IntelliJ's strikethrough. I looked at the source of `MultipartEntity` and it told me it was deprecated in favour of MultipartEntityBuilder. So I tried to instantiate one of those:

    MultipartEntityBuilder multipartEntityBuilder = new MultipartEntityBuilder();
    
A compile error and a check of the source for `MultipartEntityBuilder` informs me that the constructor is private, however, I can also see a static create method. So I use that and everything compiles nicely. Then I wonder if I need to add the Content-Type header and how can I get a hold of the boundary it generates randomly? Again, I go to the source of `MultipartEntityBuilder` and see that it builds the entity with a boundary and the correct Content-Type as part of the object so I can assume Camel uses that and sure enough it all works fine.

Looking at the source saved me looking for the documentation and how to use it. It also prevented me from writing unnecessary code like adding the Content-Type with my own hand-generated boundary and setting that on both the MultipartEntityBuilder and the Camel exchange.
 
## Unit Tests are Better
Looking at source code is good but the real secret weapon recently has been looking at the unit tests. In my opinion, they are the best form of documentation - even better than developer written wiki pages.

Unit tests are a working example of how to use the library or framework: full, *executable* examples with all the necessary set up, tear down and dependencies specified.

Unit tests tell you how the original authors intended their code to be used. There's usually a good way and a bad way to use library code and the people who wrote it know how to use it best. Read the unit tests and you can learn how the authors consume their own produce.

Unit tests are never out of date, they are always using the latest functionality and demonstrating all the functionality possible. On a par of unhelpfulness with no documentation is documentation that is wrong and out of date. Units tests are the one source of truth and can even be used to verify that the documentation is correct.

Lastly, if there are no unit tests for the framework you're using then it's a good indicator to not use it.

A good example of this is when I wanted to use the Camel Mail Component to parse incoming emails, but I had no idea how to mock an email server or how to send in-memory emails. I was quickly able to find out how the Camel authors tested their component, how they used the Java MockMail dependency and how to use the configuration correctly all just by looking at the unit tests in the camel-mail project. It saved me a huge amount of time.

## Write readable tests
It follows that our tests should be highly readable, with clear indication of the features and functionality implemented. Writing tests that are readable like documentation is a whole other subject but, for starters, [this post](https://capgemini.github.io/development/unit-test-structure/) talks about an excellent technique which goes a long way to producing feature-descriptive tests.

## Make it a Habit
 - Look in the source by getting your editor to download the file
 - Checkout (literally, using git or other VCS) the project you're working with
 - Look at the unit tests to discover all the features of the framework and how to use each and every one
 
This should be a normal habit of ours. Not only does it help cut the time taken to use the framework it helps us get more familiar with how others write, how others unit test and how the frameworks we use everyday are structured and created. With this depth of knowledge we are far better placed and more likely to be using the libraries correctly and efficiently just as the authors intended them to be used.
