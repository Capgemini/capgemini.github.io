---
layout: post
title: "Considerations for a Drupal 8 upgrade"
description: "When should enterprises move to the latest and greatest version of Drupal?"
category: "Drupal"
tags: [Drupal, Development, Agile, Open source]
author: malcolm_young
comments: true
share: true
---

If you're migrating from a different CMS platform, the [advantages of Drupal 8][advantages] seem fairly clear. But what if you're already on Drupal? There has been a lot of discussion in the Drupal community lately about upgrading to Drupal 8. When is the right time? Now that the contributed module landscape is [looking pretty healthy][tracker], there aren't many cases where I'd recommend going with Drupal 7 for a new project. However, as I've previously discussed on this blog, [greenfield projects are fairly rare][MVR]. 

## Future proofing
One of the strengths of an open source project like Drupal is the level of support from the community. Other people are testing your software, and helping to fix bugs that you might not have noticed. Drupal 7 will continue to be supported until Drupal 9 is released, which should be a while away yet. However, if your site is on Drupal 6, there are security implications of remaining on an [unsupported version][d6 eol], and it would be wise to make plans to upgrade sooner rather than later, even with the option of [long term support][lts]. While the level of support from the community will no longer be the same, sites built on older versions of Drupal won't [suddenly stop working][brick], and there are [still some Drupal 5 sites out there in the wild][stats].  

## Technical debt
Most big systems could do with some refactoring. There's always some code that people aren't proud of, some decisions that were made under the pressure of a tight deadline, or just more modern ways of doing things.

An upgrade is a great opportunity to start with a blank piece of paper. Architectural decisions can be revisited, and Drupal 8's improved APIs are ideal if you're hoping to take a more [microservices-oriented approach][microservices], rather than ending up with another MySQL monolith. 

Drupal's [policy of backward incompatibility][backward] means that while you're upgrading the CMS, you have the chance to refactor and improve the existing custom codebase (but don't be suckered in by [the tempting fallacy that you'll be able to do a perfect refactoring][refactoring]).

## There are no small changes
Don't underestimate how big a job upgrading will be. At the very least, every custom module in the codebase will need to be [rewritten for Drupal 8][rewritten], and custom themes will need to be rebuilt using the [Twig templating system][twig]. In a few cases, this will be a relatively trivial job, but the changes in Drupal 8 may mean that some modules will need to be rebuilt from the ground up. [It isn't just about development][no small changes] - you'll need to factor in the time it will take to define requirements, not to mention testing and deployment. If it's a big project, you may also need to juggle the maintenance of the existing codebase for some time, while working on the new version. 

The sites that we tend to deal with at Capgemini are big. We work with [large companies with complex requirements][tom], a lot of third party integrations, and [high traffic][alex]. In other words, it's not just your standard brochureware, so we tend to have a lot of custom modules.

## If it ain't broke, don't fix it
Given the fact that an upgrade is non-trivial, the question has to be asked - <span class="pullquote">what business value will an upgrade bring?</span> If all you're doing is replacing a Drupal 7 site with a similar Drupal 8 site, is it really a good idea to spend a lot of time and money to build something that is identical, as far as the average end user can tell? 

If the development team is focused on upgrading, will there be any bandwidth for bug fixes and improvements? An upgrade will almost certainly be a big investment - maybe that time, energy and money would be better spent on new features or incremental improvements that will bring tangible business value and can be delivered relatively quickly. Besides, some of the improvements in Drupal 8 core, such as [improved authoring experience][spark], are also available in the [Drupal 7 contrib ecosystem][contrib].  

On the other hand, it might make more sense to get the upgrade done now, and build those improvements on top of Drupal 8, especially if your existing codebase needs some TLC.

Another option (which we've done in the past for an upgrade from Drupal 6 to 7) is to [incrementally upgrade the site][incremental], releasing parts of the new site as and when they're ready.  

The right approach depends on a range of factors, including how valuable your proposed improvements will be, how urgent they are, and [how long an upgrade will take][estimating], which depends on how complex the site is. 

## The upside of an upgrade
Having said all of that, <span class="pullquote">the reasons to upgrade to Drupal 8 are compelling</span>. One big plus for Drupal 8 is the possibility of improved performance, especially for authenticated users, thanks to modern features like [BigPipe][big pipe]. The improved authoring experience, accessibility and multilingual features that Drupal 8 brings will be especially valuable for larger organisations.

Not only that, improving Developer Experience (DX) was a big part of the community initiatives in building Drupal 8. Adopting Symfony components, migrating code to object-oriented structures, improving the APIs and a brand new configuration management system are all designed to improve developer productivity and code quality - after the initial learning curve. These improvements will [encourage more of an engineering mindset][ethos], and drive modern development approaches. The net benefit will be more testable (and therefore more reliable) features, easier deployment and maintenance methods and increase speed of future change.

## Decision time
There is no one-size-fits-all answer. Your organisation will need to consider its own situation and needs.

<span class="pullquote">Where does upgrading the CMS version fit into the organisation's wider digital roadmap?</span> Is there a site redesign on the cards any time soon? What improvements are you hoping to make? What functionality are you looking to add? Does your site's existing content strategy meet your needs? Is the solution architecture fit for your current and future purposes, or would it make sense to think about [going headless][headless]?

In summary, while an upgrade will be a big investment, it may well be one that is worth making, especially if you're planning major changes to your site in the near future.

If the requirements for your upgrade project are "build us the same as what we've got already, but with more modern technology" then it's probably not going to be worth doing. Don't upgrade to Drupal 8 just because it's new and shiny. However, if you're looking further forward and planning to build a solid foundation for future improvements then an upgrade could be a very valuable investment.

[advantages]: https://www.drupal.org/8/
[tracker]: https://contribkanban.com/board/contrib_tracker
[MVR]: https://capgemini.github.io/drupal/minimum-viable-redesign
[d6 eol]: https://www.drupal.org/drupal-6-eol
[lts]: https://www.drupal.org/project/d6lts
[stats]: https://www.drupal.org/project/usage/drupal
[brick]: https://arlogilbert.com/the-time-that-tony-fadell-sold-me-a-container-of-hummus-cb0941c762c1#.drzyoyydv
[microservices]: https://capgemini.github.io/tags/#Microservices
[refactoring]: http://onstartups.com/tabid/3339/bid/2596/Why-You-Should-Almost-Never-Rewrite-Your-Software.aspx
[no small changes]: https://blog.intercom.io/there-are-no-small-changes/
[backward]: https://www.drupal.org/node/2613652
[rewritten]: https://www.drupal.org/update/modules/7/8
[twig]: https://www.drupal.org/docs/8/theming/twig
[spark]: https://www.drupal.org/project/spark
[contrib]: https://drupalize.me/blog/201407/drupal-8-has-all-hotness-so-can-drupal-7
[tom]: https://youtu.be/zsUi_C_MP0Q
[alex]: https://twitter.com/alexpott/status/279314344502784000
[estimating]: https://capgemini.github.io/agile/on-estimating 
[big pipe]: https://www.drupal.org/documentation/modules/big_pipe
[headless]: https://www.ostraining.com/blog/drupal/what-is-headless-drupal/
[ethos]: https://capgemini.github.io/development/how-we-work/
[incremental]: http://activelamp.com/videos/incrementally-upgrading-to-drupal-8/
