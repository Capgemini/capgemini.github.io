---
layout: post
title: "ffconf 2017 - Conference review"
description: "An entertaining and intimate conference offering a good balance of future of the web philosophy and technical detail."
category: Engineering
author: [simon_conway]
tags: [Conferences, Learning, Skills, Frontend, JavaScript]
share: false

---
![ffconf logo](/images/2017-12-06-ffconf/ffconf-logo.png){: .centered.medium-8}

[ffconf](https://ffconf.org/) is a JavaScript conference which is held in Brighton each year. This post provides a brief summary of ffconf 2017 (held on 9 and 10 November) and links to the talks posted by the organisers.

The day offered a good balance of future-of-the-web philosophy and technical detail. ffconf is fairly small - the 8 sessions are run back to back in a single cinema auditorium - which gives the event an intimate and friendly vibe. The event is held in [The Duke of York’s Picturehouse](https://www.picturehouses.com/cinema/Duke_Of_Yorks/), a quirky cinema which lays claim to being the oldest in Britain and, in 2012, was also voted the best.

![Duke of York's Picturehouse](/images/2017-12-06-ffconf/512px-Duke_of_York_Cinema.jpg){: .centered.medium-8}
[Image By Hassocks5489 at en.wikipedia (Transferred from en.wikipedia) [Public domain], via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Duke_of_York_Cinema.jpg){: .image-source }

The organisation of the event was excellent... we were treated to coffees, pastries, cakes and ice cream during the day. Signing in at the start was a breeze. Staff were friendly and happy to help. There was plenty of opportunity to talk to the speakers who were hanging around the event all day and were happy to share their views.

The ffconf talks are repeated on each day of the two day conference. So attendees have a bit of flexibility to choose the day that suits them. This year, on 8 November there were also workshop sessions on Angular and React. (Which I did not attend.)

For me, this was enjoyable day with plenty of useful content. Here are some highlights from the day (My favourites listed first):

---

## [Lessons Learnt Sciencing the Web – Addy Osmani](https://www.youtube.com/watch?v=d2VffguHkt4&index=4&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ)

[Addy](https://addyosmani.com/) is a Google engineer and he has spent the last couple of years focussed on how to get progressive web apps to run really quickly on mobile devices.

This was a fantastic session packed with practical hints, tips, tools and resources to improve time to interactive on mobile.

Well worth watching for anyone building mobile first progressive web apps.

---

## [If you’re going out of San Francisco, be sure to wear web standards in your hair - Bruce Lawson](https://www.youtube.com/watch?v=jhJGs2MUTb4&index=2&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ)

A light hearted, entertaining and humorous session with two clear parts:

**Part 1**
[Bruce](http://www.brucelawson.co.uk/) introduced Stylable his component styling project. [(stylable.io)](https://stylable.io/)

Stylable is a CSS pre-processor that allows you to write style rules in CSS syntax, with some extensions that adhere to the spirit of CSS. It provides the following features:

* Allows component level styling while maintaining well understood CSS features (declarative, familiar, static and fast)
* Allows CSS macros with JavaScript that can be used at build time.
* Language validation and code completion.
* Errors are reported at build time so there is no need to run the app to find out that CSS has silently failed

Stylable is in Beta and they are currently working towards rolling it out into production at Wix, the website hosting platform. This means it will underpin the styling for 10 million websites, which is a pretty good test set.

**Part 2**
[Bruce](http://www.brucelawson.co.uk/) then talked a bit of web philosophy; What is the web? What forces are shaping the web? Why is important for developers to engage in this process? How can we get involved?

An interesting and thought provoking session.

---

## [How the Web Sausage Gets Made – Monica Dinculescu](https://www.youtube.com/watch?v=326SIMmRjc8&index=3&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ)

A well presented talk on web standards and web components; what they are, what they are not and why they matter.

[Monica](https://meowni.ca/) works for the [Polymer Project](https://www.polymer-project.org/), which creates a library and apps to allow users to apply web components to create custom elements and facilitates separating your app into components.

Monica covered what makes a good web standard, what makes a poor web standard, what is a polyfill and how does this lead to development of new browser features.

Then she briefly described the web component specifications that were introduced in 2012 and ran through how these have developed over the last 5 years. In 2017 the web component spec has now been adopted by all browsers so it sounds like they might really take off in 2018.

There is a lot of buzz around web components in the JavaScript community at the moment so, for me, this was a useful talk to improve my understanding.

---

## [My Password Doesn’t Work! - Blaine Cook](https://www.youtube.com/watch?v=xSf5FuwyhB0&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ&index=5)

[Blaine](https://en.wikipedia.org/wiki/Blaine_Cook_(programmer)) works in cyber security and was the lead developer in the [OAuth project](https://oauth.net/). In previous lives he was a lead architect at Twitter and Yahoo.

Blaine is as interested in usability as ensuring top level security. In fact, he points out that as soon as usability is compromised, the workarounds that users take are often the cause of the biggest security issues.

He takes a light hearted and humorous look at the failures of the current systems for logging in. He offers some suggestions about how login can be implemented to improve the user experience, leading to large improvements in click through rates.

---

## [Rethinking the Web – James Kyle](https://www.youtube.com/watch?v=UO6SD-7XDQg&index=1&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ)

[James](http://thejameskyle.com/) had a number of ideas around education in front end development and the importance of web standards. His key ideas are:

* We should teach front end developers by doing rather than by teaching theory and people can develop a working knowledge of coding quickly. (this was the thinking behind a successful book he wrote)
* Tooling is here to stay and is an important part of the web. Tooling configuration is tricky because tools need to work for everyone so need to be highly configurable. We should to include tooling in our web standards and give tooling a seat at the table when deciding web standards.
* Accessibility is important. Reducing the size of the apps will make apps in regions with low internet speeds.
* A small number of companies effectively own the web and this is not good.

His ideas seemed solid and he was passionate about how important it will be for the future of the web get these things right.

The end of his talk had the slightly downbeat message that there are now so many well-funded, vested interests controlling the direction of the web that James struggled to see how he could even get his ideas on the agenda for discussion in a meaningful way. (I think he was looking to recruit supporters at the event.)

---

## [Memory: Don’t Forget to Take Out the Garbage – Katie Fenn](https://www.youtube.com/watch?v=espDYUPBYJo&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ&index=6)

Memory management is pretty much handled automatically by JavaScript. But how does it work?

A back to basics lesson in how garbage collection works in JavaScript. this is useful for people (like me) that have only worked with more recent front end tools and have never had to manage memory manually and would like to know the basics of how it works.

---

## [Abstract art in the time of minification - Jenn Schiffer](https://www.youtube.com/watch?v=LK5e1kRpzrE&index=7&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ)

[Jenn Schiffer](http://jennmoney.biz/) is a developer at [Fog Creek Software](http://www.fogcreek.com/), as well as a pixel artist and philosopher.

Firstly she ran through the latest Fog Creek project, [Glitch](https://glitch.com/). This is a community that helps create apps in a simple way. By providing app examples, a code editor, instant hosting and deployment Glitch aims to allow anyone to build a web app.

Then she discussed a wide range of philosophical ideas including expression, inclusion, bias, intellectual property theft and accountability in the tech industry. She paints a picture of the tech industry heading towards a crisis and has some advice about how we should all act as developers.

---

In summary I enjoyed ffconf! The speakers were engaging, the content was useful and relevant to me as a front end developer and the organisers did a great job of hosting and making everyone feel welcome. They've also done well with the quality of the video produced from the event.
