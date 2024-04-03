---
layout: post
title: "DCX React Library v1.0.0 is with us and we’re proud of it"
description: "DCX React Library reached his first big milestone"
category: Development
author: daniele_zurico
tags: [Engineering, React, Library]
comments: true
share: true
---

In 2022 we announced a new style agnostic react library called (dcx-react-library)[https://capgemini.github.io/development/dcx-react-library/] and today, after almost 3 years of hard work and 14th releases, we happy to share that version (1.0.0)[https://www.npmjs.com/package/@capgeminiuk/dcx-react-library] is finally available.

## What’s new

In these years we built more then 35 components organised in 3 different categories: forms, utils and typography, keeping in mind our main principles:

- few dependencies
- small bundles
- fully tested
- AA accessible

I'm pretty sure the main question you'll be asking yourself is: “why you decided to make a (major release version)[https://semver.org/]?”
After using the library on our projects, we realised that we speedup the development as we promised but being style agnostic by nature our developer team was spending an incredible amount of time on making our component good looking and pixel perfect exactly how our UX/UI team designed. We asked ourselves: “now we got the foundations can we do better?” Yes we can! so we decided to implement a design system for most of our components.
Most of our components has been redesigned without introducing any breaking change adding the usage of tokens. We improved our documentation adding a new section called design system:
![Documentation](/images/2024-04-03-dcx-react-library-v1-is-here/dcx-react-library-v1-storybook.jpg)

And if we made you curious to understand how it work we created a quick video that will explain how to start using it:
[how to use design system](https://capgemini.sharepoint.com/:v:/r/sites/SoftwareEngineeringBlog/Shared%20Documents/General/dcx-react-library-design-system.mp4?csf=1&web=1&e=snkrTv)

## What’s next?

SNow that version 1.0.0 is finally available we will focus to implement the design system for our remaining components, we’ll continue to implement new component (if your project need some that we don’t have yet, please don’t be shy, create a request on our (github repository)[https://github.com/Capgemini/dcx-react-library] and stay tuned… something else is cooking in the Capgmemini labs.

## You want to know more?

- If you’d like to know more about the library, feel free to contact (Daniele Zurico)[https://capgemini.github.io/authors/#author-daniele-zurico].
- If you curious to give it a try, it’s publicly available on (npm)[https://www.npmjs.com/package/@capgeminiuk/dcx-react-library] .
- If you’d like to contribute, you will need to request access from our (public repository)[https://github.com/Capgemini/dcx-react-library].
- If you want to familiarise with all the components we built, take a look at our (storybook documentation)[https://main--6069a6f47f4b9f002171f8e1.chromatic.com/].