---
layout: post
title: "Drupal, Symfony and friends"
author: alex_moreno
category: Drupal
tags: [Development, Symfony, Drupal, Composer]
date: 2015-02-27
comments: true
share: true
---

There are thousands of situations in which you do not want to **reinvent the wheel**. It is a well known principle in **Software Engineering**, but not always well applied/known into the Drupal world.

Let’s say for example, that you have a url that you want to convert from relative to absolute. It is a typical scenario when you are working with Web (but not just Web) crawlers. Well, you could start building your own library to achieve the functionality you are looking for, packaging all in a **Drupal module format**. It is an interesting challenge indeed but, unless for training or learning purposes, why wasting your time when someone else has already done it instead of just focussing on the real problem? Especially if your main app purpose is not that secondary problem (the url converter).

What's more, if you **reuse libraries and open source** code, you'll probably find yourself in the situation in which you could need an small improvement in that nice library you are using. **Contributing your changes 
back** you are closing the circle of the **open source**, the reason why the open source is here to stay and conquer the world (diabolical laugh here).

That's another one of the main reasons why lot's of projects are moving to the Composer/Symfony binomium, stop working as isolated projects and start working as global projects that can share code and knowledge between many other projects. It's a pattern followed by Drupal, to name but one, and also by projects like [phpBB](https://www.phpbb.com/), [ezPublish](http://ez.no/), [Laravel](http://symfony.com/projects/laravel), [Magento](http://magento.com/),[Piwik](http://piwik.org/), ...

## Composer and friends

Coming back to our crawler and the de-relativizer library that we are going to need, at this point we get to know [Composer](https://getcomposer.org/). Composer is a great tool for using third party libraries and, of course, for contributing back those of your own. In our web crawler example, [net_url2](https://github.com/pear/Net_URL2) does a the job just beautifully.

Nice, but at this point you must be wondering... What does this have to do with **Drupal**, if any at all? Well, in fact, as everyone knows, **Drupal 8** is being (re)built following this same principle (**DRY or don't repeat yourself**) with an strong presence of the great **Symfony 2 components** in the core. Advantages? Lots of them, as we were pointing out, but that's the purpose of another discussion

The point here is that you don't need to wait for **Drupal 8**, and what's more, you can start applying some of this principles in your **Drupal 7 libraries**, making your future transition to Drupal 8 even easier.

## Let's rock and roll

So, using a **php library or a Symfony component in Drupal 7** is quite simple. Just:

  1. Install **[composer manager](https://www.drupal.org/project/composer_manager)**
  2. Create a composer.json file in your custom module folder
  3. Place the content (which by the way, you'll find quite familiar if you've already worked with Symfony / composer yaml's):
```
"require": {
  "pear/net_url2": "2.0.x-dev"
 }
```
  4. enable the custom module

And that's it basically. At this point we simply need to tell drupal to generate the main composer.json. That's basically a composer file generated from the composer.json found in each one of the modules that include a composer themselves.

Lets generate that file:

```
drush composer-rebuild
```

At this point we have the main composer file, normally in a vendor folder  (if will depend on the composer manager settings).

Now, let's make some composer magic :

```
drush composer update
```

At this point, inside the vendors folder we should now have a classmap, containing amongst others our newly included library.

Hopefully all has gone well, and just like magic, the class net_url2 is there to be used in our modules. Something like :

```
$base = new Net_URL2($absoluteURL);
```

Just remember to add the library to your class. Something like:

```
use Net_URL2;
```

In the next post we'll be doing some more exciting stuff. We will create some code that will live in a php library, completely decoupled but at the same time **fully integrated with Drupal**. All using **Composer magic** to allow the integration.

Why? Again, many reasons like:

1. Being ready for **Drupal 8** (just lift libraries from D7 or D6 to D8), 
2. Decoupling things so we code things that are ready to use not just in Drupal, and
3. [Opening the door to other worlds to colaborate with our Drupal world](https://capgemini.github.io/open%20source/symfony-live/), ...
4.  Why not use [Dependency Injection](http://martinfowler.com/articles/injection.html Dependency Injection) in Drupal ([as it already happens in D8](http://www.webomelette.com/drupal-8-dependency-injection-service-container-and-all-jazz))? What about using the [Symfony Service container](http://symfony.com/doc/current/book/service_container.html Symfony Service container)? Or something more light like [Pimple](http://pimple.sensiolabs.org/ Pimple)?
5.  Choose between many other reasons...

See you in my next article about **Drupal, Composer and friends**, on the meantime, be good :-).

Updated: Clarified that we are talking about PHP Libraries and / or Symfony components instead of bundles. Thanks to @drrotmos and @Ross for your comments.
