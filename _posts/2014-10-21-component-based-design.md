---
layout: post
title: "Component Based Development for the Enterprise"
description: "On the importance of systems-based thinking in design and development for large projects"
category: Drupal
author: malcolm_young
tags: [Development, Design, Workflow, Drupal, DrupalCon, CSS, Frontend, Conferences]
comments: true
share: true
---

Recently 10 members of the Drupal development team at Capgemini went to [Drupalcon Amsterdam](https://amsterdam2014.drupal.org). Having been to two Drupalcons before, I more or less knew what to expect, but something I hadn't previously given much thought to was how big an event it is. [Compared to most other web conferences](http://www.smashingmagazine.com/2014/10/14/taking-a-closer-look-at-tech-conferences/), it's a beast. For me personally, I wonder if it's getting too big and too impersonal, and I think that I'll be more interested in going to smaller events.

Some of the more interesting sessions for me were the BoFs - in particular a discussion of [open source training material and apprenticeships](http://www.opendrupal.org/) provided a lot of food for thought, and hopefully we can get involved at some level. Capgemini already does a lot of work [getting graduates and apprentices into our engineering practice](http://www.uk.capgemini.com/blog/capgemini-news-blog/2014/02/award-success-for-our-apprenticeship-programme), and with such a big Drupal team, I hope we can benefit from and contribute to the Open Drupal initiative in 2015.

Whenever I go to an event, I come back with a to-do list, and this was no exception. I'll definitely be digging further into CasperJS following Chris Ruppel's session on [Automated Frontend Testing](https://amsterdam2014.drupal.org/session/automated-frontend-testing.html). I was also very interested to hear about the way that Lullabot spin up [test environments for pull requests](https://amsterdam2014.drupal.org/session/github-pull-request-builder-drupal.html) - it will be good to investigate the feasibility of incorporating this into our workflow.

The other talk that stood out for me was John Albin Wilkins on [Styleguide-Driven Development](https://amsterdam2014.drupal.org/session/styleguide-driven-development-new-web-development.html). For a long time, I've had a bee in my bonnet about the value of component libraries over Photoshop comps, and it was good to be reminded that I'm not alone. In an interesting session, John outlined an approach to integrating component-based design and automated style guides to agile development projects.

It's been said many times before, but it's worth remembering that all too often, people are still [thinking in terms of pages, rather than systems](http://bradfrost.com/blog/post/atomic-web-design/).

In the context of the work that we do, this is even more important. We're a large development team, building CMS-driven sites for large corporate clients, where the design is done by a team working for another company. We've made some inroads into building a more collaborative process, but it's still too easy to end up with the designers throwing things over the wall to the developers. Very often the designer isn't closely involved during the build phase, and design tweaks are agreed between the client and the developer without the opportunity to go back to get the designer's opinion.

This is the whole point of living style guides - component libraries that stay in sync with the code as it evolves. As [Shay Howe has discussed](https://speakerdeck.com/shayhowe/modern-style-guides-for-a-better-tomorrow), component libraries help everyone on the project.

Designers are reminded of the visual language of the project, and it's easier for them to see when they're about to reinvent the wheel.

Style guides help developers by defining and documenting standards, and make it easier to dig in and find the way you solved some problem six months ago.

The projects we work on are large and complex, with a long lifecycle, and as developers we need to value maintainability of the front end code. Part of John's approach to this was his class-naming convention. Having seen Jonathan Snook present on [SMACSS](https://smacss.com/) I'd thought it was interesting, but to a certain extent it felt like a fancy name for something that was basically common sense. John's presentation brought the concept to life well, and persuaded me that there's more to it than that, with an impressive display of [flower power](http://johnalbin.github.io/flower-power/).

The other interesting aspect was splitting up SASS files into components, and using [KSS](https://github.com/kss-node/kss-node/) to create the style guide - this is something I definitely intend to do on my next project.

Modularity makes sense - it's how the back-end is going, it's how JavaScript is going, so why shouldn't design and CSS go the same way?


*UPDATED 3rd December 2014: Unfortunately we got Chris Ruppel's name wrong in the original version of this post. Sorry Chris.*
