---
layout: post
title: "DCX React Library v1.0.0 is with us and we’re proud of it"
description: "DCX React Library reached its first big milestone"
category: Development
author: daniele_zurico
tags: [Engineering, React, Library]
comments: true
share: true
---

In 2022 we announced a new style-agnostic React library called [dcx-react-library](https://capgemini.github.io/development/dcx-react-library/) and today, after almost 3 years of hard work and 14 releases, we happy to share that version [1.0.0](https://www.npmjs.com/package/@capgeminiuk/dcx-react-library) is finally available.

## What’s new

We've built more than 35 components organised in 3 different categories: forms, utilities and typography, keeping in mind our main principles:

- fewer dependencies
- small bundles
- fully tested
- AA accessible

I'm pretty sure the main question you'll be asking yourself is: “why did you decide to make a [major release version](https://semver.org/)?”
After using the library on our projects, we realised that we sped up the development process as we promised but being style agnostic by nature our development team was spending too much time making our components look pixel perfect and exactly how our UX/UI team designed. We asked ourselves: “now that we have got the foundations, can we do better?” Yes we can! So we decided to implement a design system for most of our components.
Most of our components have been redesigned without introducing any breaking change adding the usage of tokens. We improved our documentation adding a new section called design system:
![Documentation](/images/2024-04-03-dcx-react-library-v1-is-here/dcx-react-library-v1-storybook.jpg)

If the use of tokens has piqued your interest and you are curious to understand how it works, we have created a quick video that illustrates how to start using it:

<div class="small-12 medium-8 large-4 small-centered columns">
   <div class="flex-video">
      <iframe width="640" height="360" src="https://www.youtube.com/embed/KjYL9fzxdxw" title="dcx-react-library-design-system.mp4" frameborder="0" allowfullscreen></iframe>
   </div>
</div>

## What’s next?

Now that version 1.0.0 is finally available we will focus on implementing the design system for our remaining components, we’ll continue to implement new component (if your project needs components that we don’t have yet, please don’t be shy, create a request on our [github repository](https://github.com/Capgemini/dcx-react-library) and stay tuned… something else is cooking in the Capgemini labs.

## You want to know more?

- If you’d like to know more about the library, feel free to contact [Daniele Zurico](https://capgemini.github.io/authors/#author-daniele-zurico).
- If you curious to give it a try, it’s publicly available on [npm](https://www.npmjs.com/package/@capgeminiuk/dcx-react-library).
- If you’d like to contribute, you will need to request access from our [public repository](https://github.com/Capgemini/dcx-react-library).
- If you want to familiarise with all the components we built, take a look at our [storybook documentation](https://main--6069a6f47f4b9f002171f8e1.chromatic.com/).
