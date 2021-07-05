---
layout: post
title: "Reflections on Drupalcon Amsterdam"
category: Drupal
author: chris_how_kin_sang
date: 2014-10-23
tags: [Development, Drupal, DrupalCon, Conferences]
comments: true
share: true
---


Along with [Malcolm and other colleagues from the Capgemini Drupal team](https://capgemini.github.io/drupal/component-based-design/), I attended the recent [Drupalcon in Amsterdam](http://amsterdam2014.drupal.org).
And as well as admiring the Dutch attitude to cycling and its integration in the 
city (btw London, blue paint on the road != a cycle superhighway), we also caught
up on the state of Drupal and its future. So here a few reflections from
Drupalcon Amsterdam.

## Drupal In The Enterprise - A Key Component In The Wider Web

I've been to a few Drupalcons now, and compared to previous years, use of Drupal
in the enterprise (or more generally at scale) seems much more commonplace.
Dries Buytaert's (Drupal founder) [keynotes](https://www.youtube.com/watch?v=4NN5EM4CYVE) have made reference to Drupal’s ability to integrate with other 
systems as a key strength, and in these types of projects, Drupal is not used as
the all-in-one solution that maybe was more commonplace a few years ago.

Partly this is also due to the way the web has moved far 
beyond the idea of ‘a thing you use on your desktop computer’, and Drupal has 
shown itself to be adaptable to this. For example, the idea of
[Headless Drupal](https://amsterdam2014.drupal.org/session/turbocharging-drupal-syndication-nodejs.html) was a well covered topic this year. Of course, previous ‘cons 
have had talks on uses of Drupal with other technologies ([e.g. node.js talk from London 2011](http://london2011.drupal.org/conference/sessions/nodejs-and-drupal.html)) but whereas 
it seemed more an interesting edge case then, now there are many successful 
real-world projects adopting these ideas.


## The Sessions

Based on my not-entirely-comprehensive 
memory of the subset of sessions I attended from past Drupalcons, this year
there seemed to be many more talks which could have easily been at a frontend or
PHP specific conference. [Drupal 8's](https://www.drupal.org/drupal-8.0) use of [Symfony 2](http://symfony.com/) components and shift to making use of
components Proudly Found Elsewhere is part of this.

A few talks that those of us who attended would recommend (not an exhaustive list).
I won't go into too much detail (that's all in the slides and the video) but these
are worth checking out.

### [Automated Frontend Testing](https://amsterdam2014.drupal.org/session/automated-frontend-testing.html)
The types of frontend testing which can be automated, covering performance ([Phantomas](https://github.com/macbre/phantomas)),
CSS ([Wraith](https://github.com/BBC-News/wraith)) and end-to-end ([CasperJS](http://casperjs.org/)) and integrating this into your build workflow.
[Slides](http://rupl.github.io/frontend-testing/)
[Video](http://youtu.be/qhA6O1u97PE)

### [Models & Service Layers; Hemoglobin & Hobgoblins](https://amsterdam2014.drupal.org/session/models-service-layers-hemoglobin-hobgoblins.html)
I think the PHP track is a welcome addition to Drupalcon. When developing custom functionality
on projects here at Capgemini, we often write the business models and logic as
separate classes to Drupal which are then 'glued' via hooks which implement those
classes. That kind of separation has advantages with portability, testability and
some amount of simplification in that Drupal isn't a dependency.
[Video](http://youtu.be/ajhqScWECMo)

### [Cory Doctorow's Keynote](https://amsterdam2014.drupal.org/keynote-cory-doctorow.html)
Very interesting talk on how open-source is (in some ways) critical to our individual freedom
in the modern world. In an age where "a modern house is a computer that you co-inhabit",
if a system went down - or arguably worse, were controlled by overzealous authorities -
it can become uninhabitable. What do we do in this case? Is the Apple iTunes/U2
debacle merely the thin end of the wedge? Interesting viewing for
anyone who contributes or uses open source.
[Video](http://youtu.be/iaf3Sl2r3jE)


## Drupal 8 And The Future

As Drupal 8 entered beta during the conference, it was an opportunity to check
out the changes. The plugin system for extending functionality looks interesting.
In Drupal projects at Capgemini we have adopted approaches such as abstracting 
business logic and objects into standalone libraries and classes, called from 
hooks and callbacks where we need integration with Drupal. This approach allows us
easier unit-testing and portability of classes. D8's plugin system looks like a
good way of achieving those advantages while implementing a Drupal API. 
 
Having spent a lot of time on projects wrestling with the various methods of deploying
and updating configuration, [the CMI (Configuration Management Initiative)](http://drupal8cmi.org/), which
imports and exports YAML files to update and dump site configuration is a
very welcome addition.

In the frontend, I'm looking forward to using the Twig templating. The idea of having cleaner PHP-free templates yet still with the flexibility
to have filters and basic logic is going to help improve separation between the
theme and module layer. It'll be new to me ([as will other things](http://chapterthree.com/blog/5-hurdles-adopting-drupal-8))
but as with other components, they have been successfully used in other PHP projects
so there is documentation and examples already out there. There are some
smaller changes too - removing drupal.js's dependency on jQuery (thereby gently encouraging
use of native JS), updating the versions
of included libraries (and committing to keeping them up-to-date during D8's lifetime)
and including no JavaScript by default are good steps to optimising the frontend.

Where things may be more challenging is the APIs which have both new object-oriented
components and retain the hook and callback system in some combination (for example, 
declaring widgets via hook_element_info). To take an example from a core module,
the file module's managed_file widget functionality is spread across a number of 
callbacks as well as its own FileWidget class. It's not the most straightforward
development flow to follow. Where this has some advantages is that existing modules will not need
a complete OO rewrite just to be compatible with D8 - a module author could do
a simple port at first before rewriting to take advantage of the new APIs. But some
care is need to ensure that the advantages of encapsulation, increased unit-testability
and extendability that the OO patterns introduce are not compromised by dependencies
on a particular hook or callback.

## Taking The Leap

Finally, as Drupal 8 progressed from alpha to beta during Amsterdam Drupalcon, 
it does seem now that it can be realistically considered for projects coming up 
on the horizon. Obviously there will a lot more work going into the project to 
fix bugs and improve performance and so forth. But now the major API decisions and 
changes have been made. But with this iteration of Drupal incorporating many more 
features from the contrib world (Views, WYSIWYG, etc) and PHP (Symfony2 components),
it looks to be a healthy position for use when that 8.0.0 finally lands.
