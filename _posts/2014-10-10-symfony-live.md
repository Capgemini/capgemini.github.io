---
layout: post
title: "Reflections on Symfony Live London 2014"
description: "A Drupal developer finds out the island is just a peninsula"
category: "Open source"
author: tom_phethean
date: 2014-10-10
tags: [Development, Symfony, Drupal, Conferences]
comments: true
share: true
---

At the end of September, I went to my first "non-Drupal" PHP event,
[Symfony Live London 2014](http://london2014.live.symfony.com/). With Symfony components
becoming a large part of Drupal 8 it was an excellent opportunity to learn a bit about
what it all means, and meet the Symfony community. I've dabbled with Drupal 8,
and we use some Symfony components in our existing Drupal 6 and 7 projects, so I
wasn't coming in completely cold.

### Decoupling for re-use

Throughout the conference, I was struck by how much focus there was on re-use,
decoupling and framework interoperability. It was the most common thread running
through both days - from a workshop diving [into the depths of the HTTPKernel](http://london2014.live.symfony.com/workshops/#into-the-kernel-and-back),
talks on avoiding [The Dependency Trap](https://speakerdeck.com/jakzal/the-dependency-trap)
 and [building composable HTTP middlewares using Stack](http://ddd.io/sflive-london14-stack) -
 as well as one I couldn't make it to, which covered [Decoupling with design patterns](http://www.slideshare.net/everzet/decoupling-with-design-patterns-and-symfony2-dic) -
 all driving home a message of using frameworks to give you power, but to ensure
 your code has minimal dependencies and maximum opportunity for re-use.

> "Decoupled code is easier to maintain, easier to re-use, easier to read"
>
<cite>[Jakub Zalas](https://twitter.com/jakub_zalas)</cite>


### The Naked Bundle

Top among these presentations for me though, was [The Naked Bundle](http://london2014.live.symfony.com/speakers/#matthias-noback)
presented by [Matthias Noback](https://twitter.com/matthiasnoback). Matthias focused on how the bundle (Symfony's equivalent
of a module) could be stripped back to the minimum Symfony specific code, and merely
act as a bridge between the framework and your business logic (which, he asserted,
  has no place belonging in a framework specific implementation, and should be in
  its own standalone, interoperable library).

> "The framework is for you, but your code doesn't need it"
>
<cite>[Matthias Noback](https://twitter.com/matthiasnoback)</cite>

The short summary of The Naked Bundle was the premise that it should be easy to take
your business logic and expose it to a Symfony bundle, a Laravel package, a Drupal
module - it's all PHP after all. Rather than repeat the talk here, I'll direct you to
the [excellent slides](http://www.slideshare.net/matthiasnoback/the-naked-bundle-symfony-live-london-2014)
describing a number of approaches to meet this goal.

### Drupal modules

The concept of a Naked Bundle has some direct relevancy for the Drupal world. We're
in the middle of the Drupal 7 lifecycle, many of us still supporting or evolving
Drupal 6 sites, and most of us looking forward to Drupal 8 and the changes that it
will bring to the Drupal ecosystem. It's therefore not unreasonable that a large number
of Drupal developers are building functionality which may be in use on three versions of Drupal,
or maybe more, not to mention the liklihood of Drupal developers looking at
other solutions for some sites, whether it be Symfony, Laravel or something different.

### The Naked Module?

So then, is the Naked Module a concept worth considering? Why not move as much
business logic as possible into interoperable PHP libraries which get pulled into
Drupal via a bridge module? There's obviously a fine line to tread in ensuring
you don't throw out all the benefits of Drupal's core and contrib functionality, but
if building something specific to your domain then there's a lot to be said for
this approach:

* Portability - PHP libraries are more easily moved between Drupal versions, or to
other frameworks altogether. Migrating functionality from one version of Drupal to another
therefore becomes much less of an issue, as your custom code is now less coupled to
specific versions.
* Testability - a standalone PHP library is more easily unit testable, regardless of
whether it's going to be used in Drupal or not.

### How?

In projects at Capgemini, we're already using several approaches which lets us get
some way towards this concept:

* Writing domain specific logic in standalone libraries, for example, code to handle
 creation, validation and manipulation of business objects implemented in PHP classes,
 and called out to from Drupal hooks
* Integrating with internal or external remote services via a service wrapper which can again
be called from within the Drupal module
* Using the [Composer Manager](https://www.drupal.org/project/composer_manager) to
include these PHP libraries in our Drupal installations so that they can be managed separately to
site or module repositories
* Using a shared ORM and DBAL such as Doctrine to access custom database objects consistently
regardless of Drupal version or framework, particularly when they don't need to be
Entities

Most, if not all, of these approaches are already in use in the community, for example [Commerce Guys
recently released a generic PHP addressing library](https://github.com/commerceguys/addressing)
to handle creating, manipulating and formatting postal addresses for shipping or billing
across different countries. Providing this as a generic library rather than hiding it in a
Drupal module means the support for this logic can benefit the entire PHP community.

### Libraries first

As Matthias stated in his Naked Bundle talk, it's only sensible to seek **practical
reusability**. In the case of Symfony bundles an example of an allowed dependency would be
the HTTPFoundation classes and trusting the HTTPKernel.

In Drupal, we'd want to take advantage of existing hooks, and well defined, well tested APIs 
rather than re-inventing things. However, with a libraries first approach, modules can be
made smaller, slimmer, avoid framework specific conventions and dependencies,
and simply expose resources to add rich domain specific functionality for easier
porting to other versions or frameworks.
