---
layout: post
title: "React-ing to change"
description: "A high level, upbeat post comparing two big front end JavaScript technologies; ReactJS and AngularJS"
category: React
author: greg_wolverson
tags: [React, Angular, Frontend]
comments: true
share: true
---

With the recent release of the [‘The State of JavaScript’](http://stateofjs.com/) the clear big gainer of 2016 is ReactJS. So what's all the fuss about? I’m going to look at the two big boys in the front end space. Angular and React!

## The Fairy Tale

Cast your mind back to 2010 when users started to demand interactive web applications. Back then the only real solution was jQuery, and I’d love to know how many of us have sat debugging 1000+ lines of jQuery at some point in our careers.

Cue Google announcing the release of a framework [AngularJS](https://angularjs.org/) to solve all our problems. Bringing [MVC](https://blog.codinghorror.com/understanding-model-view-controller/) to our JavaScript. It sounded a bit mad, the uptake was slow. But wait a minute, we can write unit tests, we can modularise, and we can relate our backend practices to our front end code.

Then Node/npm came along making it easier for us to use third party libraries. So we installed some tools; bower, grunt, gulp (really just things that made npm easy at the time) and we automated everything. Our pages became a bit bloated, our code started to look messy and over time we ended in a tangled web of dependencies and our beautiful Angular code was well... no longer beautiful anymore.

In 2013 Facebook joined the JavaScript party, with their first release of [ReactJS](https://facebook.github.io/react/)! *sigh* What’s that, another JS framework I hear you say? *Huh* they write HTML in JavaScript? No chance is this going to go anywhere, all my best practices say this is bad. Before you click away from this post in despair, bear with me, firstly, it’s not a framework, but a library, and a comparably small one at that. With its virtual DOM, one-way data flow and the introduction of [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) (more on this later), you’ll soon see why it’s so popular amongst front end developers. Not to mention that ReactJS does not use the typical MVC architecture, React only provides the View layer, which actually works really well! However with the introduction of [ES6](http://exploringjs.com/es6/ch_overviews.html), and fantastic tooling it seems ReactJS could well have changed the game.

It’s clear that the JS world is changing, the question is; is React taking over, or has the Angular bubble burst? Both technologies have or do provide a solid approach to front end development, we are going to take a very high level view and try to help provide some clarity on the following question *“I’m starting a new project what should I use?”*

Enough of the small talk, how do we go about comparing these two goliaths? In reality this can’t be a true comparison, as Angular is a framework and React a library; but we will be looking at some of the important aspects we look at when considering technologies for our projects:

*	Abstraction – Can we represent complex things in ways that are understandable?
*	Performance – Does it scale well, with fast response times? In my browser? In my code?
*	Integration – Can I use libraries/frameworks I’m already familiar with? Can I get help if I have a problem?
*	Simplicity - What is the learning curve? Does it follow relatable architectural principles? How quickly can a new developer become productive?
*	Testability - How easy is it to test?
*	Debugging – Problems occur, how easy is it to understand what happened?
*	State Management – Does it handle state correctly and efficiently?

## The Face Off

So, the stage is set, the big guns are out and it’s time to put each of our contestants' mettle to the test…

![REACT vs ANGULAR](/images/2016-11-25-reacting-to-change/react-vs-angular.png){: .centered }
[Source](https://medium.freecodecamp.com/angular-2-versus-react-there-will-be-blood-66595faafd51#.l40ssuc6e){: .image-source }

## Abstraction

Firstly, we look at how well both technologies achieve levels of abstraction. Any good technology should strive to achieve a high level of abstraction, by ensuring only the essential details of its API are exposed; it allows the developer to focus on the key concepts, whilst being able to build upon that foundation, leading to [achieving a higher level of abstraction]( http://www.yusufaytas.com/achieving-abstraction-in-javascript/) in their own applications.
When learning or beginning to use Angular, one gripe people can have is that you need to understand the underlying model fully, and the framework as a whole, in order to build efficient apps. It can be quite easy to get into a mess of cross dependencies in your application. It can be said that [Angular suffers from poor abstraction in places]( http://www.fse.guru/angular-bad-parts-part-1/), and when working with a technology which doesn’t have good abstraction levels in place, it can [hold developers back](https://simpleprogrammer.com/2013/10/14/leaky-abstractions-holding-us-back/).

 Angular is opinionated, but that’s [not necessarily a bad thing](http://anandmanisankar.com/posts/angularjs-best-parts/). In one way, it can prove more difficult to bring in external dependencies if you don’t like the way Angular does something in particular. On the other hand, sometimes having an opinionated framework helps steer you in the right direction, and for new developers especially, it can take away the difficulty of learning lots of additional libraries, and can lead to finding the best solution quickly. Furthermore, you could argue that React provides great freedom in being able to choose whichever libraries fit best with your design and application, but that can be a burden, sometimes meaning that finding the best fit solution takes longer.

As a technology, React is a *just* a library, at its core it’s made up of functional components, with clear direction on how to manage state properly. In reality there isn’t a great deal to React at its core, but what is there, is done very well. It follows well known development principles; you **D**on’t **R**epeat **Y**ourself ([DRY](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161)), React encourages modularisation and stateless components. Things are kept simple, components are programmed with functions and objects just like you would in OO or functional programming, which both keeps with solid language practices and lowers the learning curve. That’s not to say however, that Angular doesn’t follow the DRY principles and modularisation, but React employs simpler mechanisms to achieve them.


However, React can suffer from loss of flexibility; you can’t add attributes to HTML tags, or single tags per components. Although, React solves this through the fact that *everything is a component*, and they all benefit from a simple life cycle, as well as being [*first class citizens*](http://www.jasimabasheer.com/posts/on-react.html). In turn, by React ensuring its abstraction doesn’t leak, you don’t find yourself needing to read React code under the hood to understand things, which is a huge bonus for both new and veteran developers.


### Performance

Onto one of the most important aspects of any JS framework: *performance*. This is where users are often won or lost. When it comes to load times, [more than 1 second from page load to being able to interact with a page is too long](https://blog.kissmetrics.com/loading-time/).

Angular uses fast looped dirty checking to monitor scope; when the scope changes, Angular re-renders the UI. As a result of this, you need to be careful of how the scope grows, and the impact this will then have on performance. There is also a recommended [limit of 2000 data-bound objects](https://chrisrng.svbtle.com/using-angular-compile-to-escape-watcher-hell), which isn't that difficult to hit with a large scale application, so as a developer, you have to be conscious about the way you bind data objects, and how many. Of course, one-way data binding helps avoid this issue, but as point 7 in [this article](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make) points out, creating too many watchers is a mistake Angular developers often make. Although Angular does have in built performance optimisations, it also comes down to developer awareness to avoid some of the pitfalls of the framework.

Now, take the traditional JS application model; you need to look at what data has changed and imperatively force the DOM to change, so you can keep your view up to date. React takes a different approach. On component initialisation, the *render* method is called, generating a lightweight representation of your view to be injected into the DOM. Now each subsequent call to *render* allows React to compare what’s changed between this update and the last, making updates fast and efficient – only updating what has *actually* changed (more here: [Why React](https://facebook.github.io/react/blog/2013/06/05/why-react.html)).

As mentioned above, React will automatically decipher what’s changed and update it efficiently, each time *render* is called. React’s functional model gives us two simple, but powerful features to bolster performance; firstly, it allows us to specify if a component should be re-rendered, and secondly, when said component should be re-rendered. These two principles coupled together can lead to huge performance savings when dealing with lots of data, giving us a big tick in the *scalability* box.

Alongside its functional model, React employs a Virtual DOM; in a nutshell, it’s a virtual JavaScript implementation of the physical DOM structure. Its beauty lies in its simplicity; React captures snapshots of the DOM, when an underlying data change occurs, React re-renders the UI in a Virtual DOM, this new copy is then compared with the previous ‘snapshot’ to see what’s *actually* changed, the change is then applied to the actual DOM – almost like a patch.

![REACT virtual dom](/images/2016-11-25-reacting-to-change/virtual-dom.png){: .centered }
[Source](http://madhukaudantha.blogspot.co.uk/2015/04/reactjs-and-virtual-dom.html){: .image-source }


### Integration

This one is tricky to do a true comparison, Angular being the opinionated framework, vs. React the small library (David vs Goliath anyone?). That aside, Angular is feature rich from the get go, and through its use of directives, it provides the likes of packaging, modules, server communication and form validation up front – what’s not to like! However, it’s not all sunshine and rainbows. Due to Angular’s opinionated nature it can prove difficult to integrate other external libraries. For example, take Bootstrap, being a well used library itself, often developers like to integrate it into their projects, to save re-inventing the wheel with regards to existing front end components. However, with [Angular this can prove challenging]( https://scotch.io/tutorials/how-to-correctly-use-bootstrapjs-and-angularjs-together). On the up side, Angular provides a lot of functionality out-of-the-box, so you don’t find yourself needing too many external libraries or dependencies. The benefits of having an opinionated framework shine through when everything you need is ‘supplied in the box’.

React on the other hand naturally plays well with others. Being a small library itself, it uses Node’s module system, meaning any Node module is easily integrated, but the downside is due to React’s relatively small size, and only providing the View layer, you kind of need to integrate with a lot of other libraries to fill in the gaps – especially if you’re in need of a full MVC model.

### Simplicity

Confucius once said, *‘Life is really simple, but we insist on making it complicated’*. The same can be said of web development to an extent, and especially JavaScript frameworks. Learning JavaScript in 2016 can be a major headache; [How it feels to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.k8ph9qehb) (cue the lulz).

![Learning new JS frameworks](/images/2016-11-25-reacting-to-change/new-js-frameworks.png){: .centered }
[Source](http://curtis.lassam.net/comics/cube_drone/76.gif){: .image-source }


On a serious note, why does it have to be so challenging to both learn and implement new JS frameworks? Take Angular for instance, it’s a full blown framework, with an extensive API, leading to a steep learning curve when first getting to grips with it. [This article]( http://ruoyusun.com/2013/05/25/things-i-wish-i-were-told-about-angular-js.html) nicely highlights the learning curve change between starting out with Angular and writing serious apps.  React on the other hand, is a small library, it’s JavaScript centric and is made up of components which have a [simple life cycle]( https://facebook.github.io/react/docs/react-component.html).

A downfall of Angular is that it tries to empower HTML, by injecting JavaScript into it. If that’s not enough, it also utilises both one and two-way binding systems, with both being different to boot! As a developer it’s important to be aware of the impacts on both performance and complexity when utilizing two-way binding, as [there can be various nuances with it](https://blog.sourceclear.com/nuances-of-two-way-data-binding-in-angularjs/).

React on the other hand keeps it simple, through its use of JSX; a pre-processor which injects XML style syntax into your JavaScript code. See the *HelloWorld* example below:

```
ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById(‘app’)
);
```

Or, with a more common ES6 approach;

```
class HelloWorld extends React.Component {
   render() {
      return <h1>Hello World</h1>
   }
}

React.render(<HelloWorld />, document.getElementById(‘app’));
```

As you can see from the above; React components are just code, and as components they are composed the way normal functions and objects work in the development world, [React feels like *normal* programming]( http://noelwelsh.com/programming/2014/08/17/angularjs-vs-react/), not a confusing JavaScript library. React also sticks to one-way data binding, which makes life much simpler, it also ensures binding is handled in the same way in all cases, making it a lot simpler to both write and debug.

Simply put;

<p align="center"><i>To learn Angular: Learn a long list of Angular-specific syntax</i></p>
<p align="center"><i>To learn React: Learn JavaScript</i></p>


### Learning Curve

This actually flows nicely on from simplicity, the simpler the technology, surely the less of a learning curve? In a nutshell, the answer is usually yes. Looking at Angular, it’s a full blown, opinionated framework, which in turn means a lot of up front learning before you’re truly comfortable writing it. However, having said that, I’m sure people have gotten up to speed with Angular quickly, and it is slightly unfair to compare with React, as Angular is a fully fledged framework, whereas React is *just* a library. Angular comes with more baggage, more to learn, and more to get to grips with in order to become productive, whereas React benefits from just being a View UI layer, having a small library at its core and being pure JavaScript at heart.

As a result, React is very quick to get up to speed with. Yes it might feel slightly strange at first getting used to one-way data binding, or injecting HTML into JS through the use of JSX, but in reality, a web developer new to React could realistically get a basic ‘grounding’ within a week. On the other hand, React itself maybe quick to get up to speed with, so you can start writing components and building out your application fairly quickly and to a good standard, but soon enough you’ll need to start bringing in more libraries and then the learning curve increases by the difficulty of the frameworks and libraries you use. Besides their size and the ‘framework vs library’ argument, when you strip both technologies back, you get Angular’s custom syntax and forced coding style, against React’s use of JSX.

### Testability

Testing of JS based framework and libraries has vastly improved over the last few years, and it’s important to choose a front end framework with testability in mind.

Angular comes with good documentation and libraries in order to test its components in isolation, which is great. With Angular being a full MVC framework, there is lots more to it than to React’s simple library, there is also more to think about when it comes to design and testing. One of the main features in Angular is dependency injection, which amongst other benefits, aims to make testing easier. Angular allows for good unit testing of business logic, which is great, however, it [encourages putting business logic into the UI](http://www.letscodejavascript.com/v3/blog/2015/01/angular_review), within controllers and services, which could be viewed as bad practice in relation to the [*Separation of Concerns*](http://www.letscodejavascript.com/v3/blog/2015/01/angular_review) principle.  When designing any application or API it’s important to ensure that each key functional area isn’t tightly coupled to another.

Furthermore, Angular doesn’t support the testing of browser driven events at its core, which doesn’t allow the developer to test how your HTML renders in response to interactions and events, which is a key goal of testing a front end framework. However, Angular mitigates this though the use of [Protractor]( http://www.protractortest.org/#/), an end-to-end testing framework. The testability section in [this article](http://www.letscodejavascript.com/v3/blog/2015/01/angular_review) addresses some of the issues highlighted above.

On the other hand, React components contain pure functions, which in themselves are [much easier to test](http://blog.agiledeveloper.com/2015/12/benefits-of-pure-functions-easier-to.html). Combine this with [*Shallow Rendering*](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering), and you can test components in true isolation, allowing for greater separation of concerns when unit testing. Yes, you still have to pump data in and check function hooks act as expected, but due to its simplified structure and functional component patterns, you don’t need extra scaffolding to put solid unit tests together. Another benefit is due to the strong emphasis on modularisation and small components, React naturally encourages a design which incorporates the [*Single Responsibility Principle*](https://www.toptal.com/software/single-responsibility-principle), which also helps with testability.

On the end-to-end front, both technologies allow for good end to end testing through uses of external libraries such as WebDriver, and Protractor with Angular. React’s advantage lies in its functional component design, which leads to natural testability. It makes it a lot simpler to test and less of a headache – providing front end developers with a clean, simplistic approach to unit testing, which is an ever-growing importance as the emphasis on performant, reliable front ends increases.

### Debugging

We all find ourselves debugging code from time to time, but JavaScript code has always been a pain in the neck when trying to decipher what went wrong, where and why. Angular uses an event driven architecture - easy to develop, a challenge to debug! Another headache is trying to debug Angular’s directives, there’s so much wizardry going on behind the scenes, that more often than not, you find yourself debugging Angular code – abstraction anyone?!

Debugging JavaScript has normally been a challenge, but [Angular adds to this by its design]( https://medium.com/@mnemon1ck/why-you-should-not-use-angularjs-1df5ddf6fc99#.je3czfjwe). Take bindings for example;
```
<div ng-repeat=”name in user.names”>{{ name }}</div>
```
If name is undefined, an error won’t fire and you can’t put a breakpoint in there due to the fact it’s not plain JavaScript. Furthermore, the JavaScript errors are caught up in the Angular interceptor, meaning the browser will interpret those errors as caught errors, which in turn leads to running through all the internal Angular exceptions. In addition, because the digest cycle fired the error, it could of been caused anywhere in the app – meaning it’s near impossible to track down via the debugger.

So how does React stand up to the challenge? Well due to React’s good use of abstraction, you end up debugging your own code, rather than React’s, and its Virtual DOM transformation into the physical DOM is kind of like a black box, which requires less debugging! However, there is a niggle with React; JSX transformations. When debugging React code (providing you’re using JSX, which you are, right?), because it converts JSX to plain old JavaScript, you find you’re not always debugging the code you’ve actually written, which can prove tricky. However, it’s worth noting, and a big bonus as well, is that [React fails at compile time]( https://medium.com/@housecor/react-s-jsx-the-other-side-of-the-coin-2ace7ab62b98#.m0myqjh68), meaning you find errors quickly, its time-to-find vs time-to-fix is much lower as a result!

### State Management

*‘Look at the State of that!’* said many a front end developer when trawling through reams of procedural JavaScript code. However, we’re not talking about that kind of state; here we’re talking about application state, the state of what’s currently displayed and the underlying data that supports that.

Angular manages state through scope and services; what is displayed will only ever be data bound to the scope, but what is stored should be held in services. The most important part of state management is ensuring consistency! When something changes the state, can I guarantee the right things have been updated, re-rendered and restored in the View? With the introduction of Redux, the ability to [implement simplified one-way data flow]( http://blog.rangle.io/managing-state-redux-angular/) into your Angular apps has made developing predictable systems a lot easier. A problem previously with Angular apps has been the questions of ‘what’s the current state of my application’, and two-way data binding has often exacerbated the issue. With Redux, it helps you to derive the UI from the application state and also see how actions affect that state.

Looking at React on the other hand, it employs unidirectional data flow, and components re-render when state is updated. With React you also have the option to make full use of other architectural libraries such as [Flux](http://thenewstack.io/flux-overview-react-state-management-ecosystem/) and [Redux](http://redux.js.org/), which both help wrap up state management nicely, as mentioned above with Angular. The fact that React has a lot less going on - due to only being the ‘View’ aspect of MVC, and also a small component library at heart – makes it easier to monitor and be aware of your applications state, and how updates to components and user interactions affect that state.

## Happily Ever After?

So, is it happily ever after for the tale of these two technologies? Both are still going strong; at my last check, Angular had 53,170 stars on Github, compared with React’s 53,395. Now you could say that with React further ahead, and with it being a much newer framework in comparison to Angular, that it’s being used more. However, although this post has been a kind of ‘face-off’, there isn’t any reason why you can’t use [React and Angular together](https://blog.logentries.com/2016/02/combining-angularjs-and-reactjs-for-better-applications/), although I’m yet to see this in practice.

The purpose of this post was to look at the question of; *“I’m starting a new project what should I use?”* In reality, some of this comes down to personal preference, there will be those of you reading this that have been, or still are firmly on the Angular side of fence. There will also be those of you who are big React fans, either way, I hope this post has provided you with a better understanding of Angular and React from a high level, and hopefully peaked your interest enough to go and learn a new technology!

From my own perspective, I believe React has provided a refreshing take on the sometimes chaotic, ever changing JavaScript world. It’s ideal for developing performant, highly scalable, reliable front end applications. Along with its relatively short learning curve and simplistic JavaScript centric nature, whilst also encouraging and implementing functional patterns and closely encapsulated state management.

Of course with the [release of Angular 2](http://blog.thoughtram.io/angular/2016/09/15/angular-2-final-is-out.html), it’s yet to be seen whether React will be challenged on the JavaScript front, or has the Angular bubble burst and a new JS flagship come to town. Ultimately, with JS frameworks being released at an ever increasing pace, the real test of React’s credentials will be time...

