---
layout: post
title: "Will this Meteor hit?"
description: "A look at the potential impact of Meteor to typical website development."
category: Development
author: henry_white
tags: [Engineering, Meteor, JavaScript, Open source, React, Angular, Architecture]
comments: true
share: true
---

Over the past few years, the use of JavaScript as a full-stack web technology has increased through the use of libraries such as React and Angular. As a result, the open-source platform [Meteor](http://meteor.com) was created. This post looks at the potential of Meteor to change the landscape of website development as we know it today.

## What in the universe is Meteor?
> Meteor is a full-stack JavaScript platform for developing modern web and mobile applications.

Looking at the platform's website, it claims to be the "fastest way to build JavaScript apps". Being the logically-minded individual that I think I am, it appears to be rather difficult to prove/disprove that idea. Regardless, I have gathered that Meteor is currently marketed as the quickest platform to work with from inception to implementation for producing a full-stack JavaScript engineered web solution which can be deployed once for multiple devices (web/mobile).

### _"Fastest"_ is claimed to be achieved by Meteor through:

#### Reduced code bloat
> Accomplish in 10 lines what would otherwise take 1000.

It is true that through the power of minification, the number of lines in a JavaScript file can be reduced by a signficant amount. With a full-stack JavaScript application, I can imagine this being quite effective. But maybe instead of that, they're claiming that JavaScript is a more lightweight language than the likes of PHP and Java, which is indeed possible - but let's not go into that.

#### One repository, multiple devices
> Use the same code whether you’re developing for web, iOS, Android, or desktop.

This is very appealing and would obviously save a lot of time, but should we consider how many solutions actually require an application to be consistent across web and mobile? Would this feature be redundant for those clients seeking a mobile-enhanced solution?

#### A powerful, large ecosystem of packages
> Use popular frameworks and tools, right out-of-the-box.

As an open-source platform, Meteor does have a collaborative community base. As we'll discuss later, the package system implemented in every Meteor installation provides a simple and effective way of incoporating modules, addons, plugins (or whatever else you would like to call them) into a site by using a simple CLI. I'm always in favour of not having to re-invent the wheel everytime I write code.

## Application Structure
With Meteor being a full-stack JavaScript platform, one would imagine there is code to manage both front-end and back-end requests/responses. Now how is this achieved? Let's take a look at the typical file structure a Meteor application must follow:

### Three top-level directories
* `client` - all code used by the client/browser/user
* `server` - all code used by the server
* `imports` - all other code/assets/files including the important `startup` (bootstrap) directory

#### A typical Meteor installation file structure

{% highlight yaml %}
imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point
  api/
    posts/                     # a unit of domain logic
      server/
        publications.js        # all post-related publications
        publications.tests.js  # tests for the post publications
      posts.js                 # definition of the Posts collection
      posts.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to posts
      methods.tests.js         # tests for those methods
  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router
client/
  main.js                      # client entry point, imports all client code
server/
  main.js                      # server entry point, imports all server code
{% endhighlight %}

## JavaScript and data, together in harmony?
I wouldn't say that exactly - Meteor uses MongoDB to hold a persistent data layer which exists as long as the server is running. If you are unfamiliar with MongoDB, "collections" (tables) are used to hold "documents" (records).

### Collections
Here's where it get's interesting, a collection can either be created for use on the server or use on the client. Client collections are used to store local data for yes you guessed it, the client! These collections act as cached versions of the server side collections. Server collections represent stored data in the MongoDB database and act the same as a standard table.

{% highlight bash %}
Posts = new Mongo.Collection('posts');
{% endhighlight %}

### Publications
> Meteor is built from the ground up on the Distributed Data Protocol (DDP) to allow data transfer in both directions. Building a Meteor app doesn’t require you to set up REST endpoints to serialize and send data. Instead you create publication endpoints that can push data from server to client.

By defining a publication in the `api` directory (see above), a list of documents stored in a collection is available for the client to subscribe to and receive real-time results. This allows Meteor applications to be reactive and adapt to ever changing data immediately.

{% highlight javascript %}
// Server side
Meteor.publish('posts.all', function() {
  return Posts.find({}, {limit: 10});
});

// Client side
const postsHandle = Meteor.subscribe('posts.all');

if (postsHandle.ready()) {
  console.log("My subscription is ready!");
}
{% endhighlight %}

## Reactive Nature
> Meteor officially supports three user interface (UI) rendering libraries, Blaze, React and Angular.

### Blaze
[Blaze](https://guide.meteor.com/blaze.html) was created as part of Meteor when it launched in 2011, and hence is claimed to be most integrated among the three with  Meteor architecture. It uses a [handlebarsJS](http://http://handlebarsjs.com/)-like templating syntax with HTML known as [Spacebars](http://blazejs.org/api/spacebars.html).

{% highlight html %}
<template name="myPage">
  <h1>{{pageTitle}}</h1>
  {% raw %}{{> nav}}
  {{#each posts}}{% endraw %}
    <div class="post">
      <h3>{{title}}</h3>
      <div class="post-content">
        {% raw %}{{{content}}}{% endraw %}
      </div>
    </div>
  {% raw %}{{/each}}{% endraw %}
</template>
{% endhighlight %}

### React
[React](https://guide.meteor.com/react.html) with Meteor can be achieved simply by adding the npm React dependency to the installation. This allows you to write React components in JSX as with any other React application.

{% highlight javascript %}
import React from 'react';
export default class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
{% endhighlight %}

### Angular
[Angular](https://guide.meteor.com/angular.html) with Meteor is officially supported and there is even a separate dedicated community at [Angular-Meteor.com](http://angular-meteor.com). Although it seems to be a lot more work (bootstrapping) to get both working together effectively than with React or Blaze.

{% highlight javascript %}
import { Component } from '@angular/core';

@Component({
  templateUrl: 'posts.html'
})
export class PostsPage {
  constructor() {

  }
}
{% endhighlight %}

## When does a Meteor become an Asteroid?
As mentioned before, Meteor employs its own fantastic packaging system known as [AtmosphereJS](http://atmospherejs.com), previously developed as an NPM package known as Meteorite ([you can read their full story here](http://blog.percolatestudio.com/engineering/the-atmosphere-story/)).

### AtmosphereJS
> Atmosphere packages are written specifically for Meteor and have several advantages over npm when used with Meteor.

As you can imagine, this makes Meteor a pretty powerful platform, and encourages the open-source community to collaborate and improve on the platform over time.

One can simply browse the [AtmosphereJS website](https://atmospherejs.com) and use the Meteor CLI to install packages:

{% highlight bash %}
meteor add react-meteor-data
{% endhighlight %}

## Mobile
> Meteor integrates with Cordova, a well-known Apache open source project, to build mobile apps from the same codebase you use to create regular web apps. With the Cordova integration in Meteor, you can take your existing app and run it on an iOS or Android device with a few simple commands.

Cordova wraps HTML/CSS and JS into a native container to target multiple platforms. As a web app in itself, it means the Meteor application can simply be wrapped to support mobile devices immediately. However, as mentioned before - what if the client wants to expand on the mobile version of an application? Fortunately, there are neat conditionals that can be used to identify the user's device:

{% highlight javascript %}
if (Meteor.isServer) {
  console.log("Printed on the server");
}
if (Meteor.isClient) {
  console.log("Printed in browsers and mobile apps");
}
if (Meteor.isCordova) {
  console.log("Printed only in mobile Cordova apps");
}
{% endhighlight %}

However, depending on how different the mobile version is desired to be, one could argue that keeping both together with countless device conditionals would be counter-intuitive. It may make more sense to split the code into two applications and use some funky routing - but that's for another discussion.

## Community Support
It's rather easy to find a wide range of resources, tutorials and even books for learning how to use Meteor effectively. It's great to see that a fairly new platform already has such a large and passionate community.

### IDE's & Tools
Many Integrated Development Environments (IDE) have started to incorporate working with Meteor with new plugins and tools. You can see some of these below:

#### JetBrains Webstorm 9
WebStorm 9 [integrates with Meteor](https://www.jetbrains.com/webstorm/help/using-meteor.html) including automatic recognition of Meteor projects, coding assistance, running and debugging apps.

#### Atom
There are several packages available in the Atom ecosystem to assist Meteor development. [Meteor API](https://atom.io/packages/meteor-api) offers autocomplete, code snippets, color-coded grammar and syntax highlighting, while [Meteor Helper](https://atom.io/packages/meteor-helper) enables launching and killing Meteor within Atom.

### Books and Learning Resources
Do you like reading? Then look no more, there's as many as 4 books available for you to digest - if that takes your fancy:

#### [Discover Meteor](https://www.discovermeteor.com/)
> Learn Meteor and build faster & simpler web apps, as we teach you how to build a real-time Meteor app from scratch.

#### [Your First Meteor Application](http://meteortips.com/)
> An online book about the Meteor JavaScript framework that helps beginning web developers build their first real-time web application with Meteor in a matter of hours.

#### [Meteor In Action](http://www.meteorinaction.com/)
> Let us show you how to make the most of this amazing platform to impress users, reduce development time, and turn your ideas into code.

#### [Getting Started with Meteor.js JavaScript Framework - Second Edition](https://www.packtpub.com/web-development/getting-started-meteorjs-javascript-framework-second-edition)
> An easy to follow, step-by-step approach to learning how to build modern web applications with Meteor.

## Conclusion
To conclude, I believe that Meteor will most certainly increase in popularity and is in a very good position to push JavaScript to start to replace other technologies for website development. Meteor is extendable, it has countless packages to choose from, or the opportunity to create your own. Meteor is fast, an application can be deployed for multiple platforms at one time. Meteor is efficient, using only JavaScript code the application can be minified to increase performance and improve user experience. No doubt, there are other platforms suitable for developing your application, but it is the fast nature of Meteor development that really stands out.

Try Meteor out [by installing it from their website](https://www.meteor.com/install) - it may just be a game changer.
