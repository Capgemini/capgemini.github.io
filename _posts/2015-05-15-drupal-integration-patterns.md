---
layout: post
title: "Drupal integration patterns"
category: Drupal
author: tom_phethean
tags: [Architecture, Development, Drupal]
date: 2015-05-15
comments: true
share: true
---

As Drupal has evolved, it has become more than [just a CMS](http://www.palantir.net/blog/drupal-not-cms). It is now a fully
fledged Web Development Platform, enabling not just sophisticated content
management and digital marketing capabilities but also any number of use cases
involving data modelling and integration with an endless variety of applications and
services. In fact, if you need to build something which responds to an HTTP
request, then you can pretty much find a way to do it in Drupal.

> "Just because you can, doesn't mean you should."

However, the old adage is true. Just because you can use a sledgehammer to
crack a nut, that doesn't mean you're going to get the optimal nut-consumption-experience
at the end of it.

Drupal's flexibility can lead to a number of different integration approaches,
all of which will "work", but some will give better experiences than others.

On the well trodden development path of Drupal 8, giant steps have been taken in
making the best of what is outside of the Drupal community and "getting off the island", and exciting things are happening in making Drupal less of a sledgehammer, and more
of a finely tuned nutcracker capable of cracking a variety of different nuts with ease.

In this post, I want to explore ways in which Drupal can create complex systems,
and some general patterns for doing so. You'll see a general progression in
line with that of the Drupal community in general. We'll go from doing everything in Drupal,
to making the most of external services. No option is more "right"
than others, but considering all the options can help make sure you pick the
approach that is right for you and your use case.

## Build it in Drupal

One option, and probably the first that occurs to many developers, is to
implement business logic, data structures and administration of a new applications or services using Drupal and its APIs. After all, [Entity API](https://www.drupal.org/project/entity) and the schema system give
us the ability to
model custom objects and store them in the Drupal database; [Views](https://www.drupal.org/project/views) gives us
the means to retrieve that data and display it in a myriad of ways. Modules
like [Rules](https://www.drupal.org/project/rules); [Features](https://www.drupal.org/project/features) and [Chaos Tools](https://www.drupal.org/project/ctools) provide extensive options for implementing
specific business rules to model your domain specific data and application needs.

This is all well and good, and uses the strengths of Drupal core and the wide range of community [contributed modules](https://www.drupal.org/project/project_module) to enable
the construction of complex sites with limited amounts of coding required, and little
need to look outside Drupal. The
downside can come when you need to scale the solution. Depending on how the functionality
has been implemented you could run into performance problems caused by large numbers
of modules, sub-optimal queries, or simply the amount of traffic heading to
your database - which despite caching strategies, tuning and clustering is always
likely to end up being the performance bottleneck of your Drupal site.

It also means your implementation is tightly coupled to Drupal - and worse, most
probably the specific version of Drupal you've implemented. With Drupal 8 imminent
this means you're most likely increasing the amount of re-work required when you
come to upgrade or migrate between versions.

## It's all PHP

Drupal sites can benefit hugely from being part of the larger PHP ecosystem. With
[Drush make](http://www.drush.org/en/master/make/), the [Libraries API](https://www.drupal.org/project/libraries), [Composer Manager](https://www.drupal.org/project/composer_manager), and others providing
the means of pulling external, non-Drupal PHP libraries into a Drupal site, there
are huge opportunities for building complexity in your Drupal solution without
tying yourself to specific Drupal versions, or even to Drupal at all. This could
become particularly valuable as we enter the transition period between Drupal 7 and 8.

In this scenario, custom business logic can be provided in a framework agnostic PHP
library and a [Naked Module](https://capgemini.github.io/open%20source/symfony-live)
approach can be used to provide the glue between that library and Drupal - utilising
[Composer](https://getcomposer.org) to download and install dependencies.

This approach is becoming more and more widespread in the Drupal community with Commerce Guys (among others) taking a [libraries first approach](https://drupalcommerce.org/blog/16864/commerce-2x-stories-addressing)
to many components of Commerce 2.x which will have generic application outside of
Drupal Commerce.

The major advantage of building framework agnostic libraries is that if you ever come to re-implement something in another framework, or a new version of Drupal, the effort of
migrating should be much lower.

## Integrate

Building on the previous two patterns, one of Drupal's great strengths is how
easy it is to integrate with other platforms and technologies. This gives us
great opportunity to implement functionality in the most appropriate technology
and then simply connect to it via web services or other means.

This can be particularly useful when integrating with "internal" services - services
that you don't intend to expose to the general public (but may still be external in
  the sense of being SaaS platforms or other partners in a multi-supplier
  ecosystem). It is also a useful way to start using Drupal as a new part of your
  ecosystem, consuming existing services and presenting them through
  Drupal to minimise the amount of architectural change taking place at one time.

Building a solution in this componentised and integrated manner gives several advantages:

* Separation of concerns - the development, deployment and management of the
service can be run by a completely separate team working in a different [bounded
context](http://martinfowler.com/bliki/BoundedContext.html). It also ensures logic is nicely encapsulated and can be changed without
requiring multiple front-end changes.
* Horizontal scalability - implementing services in alternate
technologies lets us pick the most appropriate for scalability and resilience.
* Reduce complex computation taking place in the web tier and let Drupal focus on delivering
top quality web experience to users. For example, rather than having Drupal publish
and transform data to an external platform, push the raw data into a queue which can be consumed by "non-Drupal" processes to do the transform and send.
* Enable re-use of business logic outside of the web tier, on other platforms or with
alternative front ends.

## Nearly-Headless Drupal

[Headless Drupal](https://github.com/davidhwang/horseman) is a phrase that has gained a lot of momentum in the Drupal
community - the basic concept being that Drupal purely responds with RESTful
endpoints, and completely independent front-end code using frameworks such as Angular.js
is used to render the data and completely separate content from presentation.

Personally, I prefer to think of a "nearly headless" approach - where Drupal is
still responsible for the initial instantiation of the page, and a framework like
Angular is used to control the dynamic portion of the page. This lets Drupal manage
the things it's good at, like menus, page layout and content management, whilst
the "app" part is dropped into the page as another re-usable component and only
takes over a part of the page.

For an example use case, you may have business requirements to provide data from a service
which is also provided as an API for consumption by external parties or mobile apps.
Rather than building this service in Drupal, which while possible may not provide
optimal performance and management opportunities, this could be implemented as a
standalone service which is called by Drupal as just another consumer of the API.

From an Angular.js (or _insert frontend framework of choice_) app, you would then talk
directly to the API, rendering the responses dynamically on the front end, but
still use Drupal to build everything and render the remaining elements of the page.


## Summing up

As we've seen, Drupal is an incredibly powerful solution, providing the capability
for highly-consolidated architectures encapsulated in a single tool, a perfect enabler
for projects with low resources and rapid development timescales. It's also able to
take its place as a mature part of an enterprise architecture, with integration
capabilities and rich programming APIs able to make it the hub of a Microservices or
Service Oriented Architecture.

Each pattern has pros and cons, and what is "right" will vary from project to
project. What is certain though, is that Drupal's true strength is in its ability
to play well with others and do so to deliver first class digital experiences.

New features in Drupal 8 will only continue to make this the case, with [more tools
in core](https://www.drupal.org/node/1283408) to provide the ability to build rich applications, [RESTful APIs for entities
out of the box](https://www.drupal.org/documentation/modules/rest) allowing consumption of that data on other platforms (or in a headless front-end), improved HTTP request handling with [Guzzle](http://docs.guzzlephp.org/en/latest/) improving options for
consuming services outside of Drupal, and much more.
