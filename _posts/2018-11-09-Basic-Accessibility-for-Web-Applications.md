---
layout: post
title: Basic Accessibility for Web Applications
description: Basic accessibility when developing web applications.
author: [daiseygiles]
category: Accessibility
tags: [Web, Frontend, Development, Accessibility]
comments: true
---

As frontend developers, it's not enough to know how to build the applications, you also need to know how to build applications for everyone to be able to use.

With the number of web users continuously growing, it's important that as developers we do our best to reduce alienation of individuals that can occur if we don't develop our applications in a manner that is accessible and usable by as many people as possible.

Accessibility could be tied with unit tests to a developer. To some, it's an afterthought. Something that we can just quickly do at the end of the development cycle and no one will know. Yet, when you reach the end of the development cycle, suddenly you have this mass of untested and often, untestable code. So you’re faced with the decision of just ignoring tests or refactoring and making it testable.

Accessibility is no different. That’s why it’s important to have a consideration and a strategy for accessibility during the development phase of the application. You don't want to find yourself nearing completion of a project when the accessibility audit happens, only to find that there's a huge number of issues that need to be resolved, with each change bringing the potential to introduce regressions, as markup and implementation may need changing in order to facilitate these accessibility requirements.


## Why it’s a problem

When we don’t follow best practice for accessibility we alienate and prevent users from being able to interact and use the applications that we have developed. From a business perspective, that can mean a loss of potential sales due to restricting the amount of people that can use the application. Ultimately it's the users that suffer, as they are unable to effectively use applications and services that they may be required to.

Just looking at UK statistics, the [UK Government Family Resources Survey][UKGovernmentFamilyResourcesSurvey] has reported that 1 in 5 people have reported a disability, in raw numbers that's 13.9 million individuals, a rise from 11.9 million in 2013/14.  These numbers include individuals with mobility, visual, and auditory disabilities. With such an increase just in the UK, there is a higher demand for accessible applications and websites. For some disabilities, access to the web is done through assistive technologies, and it’s important we take these into consideration whilst we build and develop our applications.

## Tackling the problem

Accessibility is a broad topic and it's important that applications and websites are thoroughly audited for any major accessibility short falls, but it's important to tackle the problem at the source, which is during the design and development phase. I want to focus on the development phase in this post. This list is in no means a complete fix, but it's a step in the correct direction to encourage developers to be more considerate about the people who will be using the application. Here are some initial things that developers could take on board which would begin to tackle the issue.

### Semantic markup

> Good CSS can make bad markup invisible to the average website visitor. However, no amount of styling will make bad markup more meaningful to a computerized visitor such as a search engine web crawler, browser translation tools, or assistive technologies such as screen readers.
> <cite> [html.com][htmlQuote]

This quote is an important one to have in consideration when building web applications. For the average user, they won't be able to tell the difference between use of non-semantic tags such as `<span>` to display a label and using the correct `<label>` tag, but for those who use assistive technologies, such as a screen reader, the `<span>` tag conveys no meaning or purpose, where as the `<label>` tag offers various attributes that build meaning that the screen reader can understand and relay.

A major starting point in accessibility, is ensuring that the HTML that you are writing for your web applications is as semantic as possible. For example, using  the `<button>` tag instead of a `<div>` for a button, not only makes the markup clearer for developers, but also introduces a bunch of built in accessibility features for the button.

With HTML5, we also have access to different layout tags, this helps define areas of the page, without having a tonne of nested `<div>` tags to create the layout. Tags such as `<article>` and `<nav>` provide clear descriptions of their regions, for example, a `<nav>` would contain navigation, a `<main>` would be used once to declare the focal content of the page.

### ARIA tags & Roles

Accessible Rich Internet Applications (ARIA), are a set of attributes that are available to provide better accessibility to web content and applications.  When developing applications, it’s not always possible to use a semantic markup, for example, if you were to create and display a chart in HTML, there isn’t a tag that would fit. Using the correct ARIA tags, you can transform this markup to be useful to assistive technologies.

For example, if you're using SVG, you could add an ARIA tag in order to portray to a screen reader what a user can visually see, by doing the following:  `<g aria-label="Item 1: 40%, 108"><path></path></g>`. This will tell the assistive technologies the information about the section of the chart (in this example, the item name, its percentage and raw value).

ARIA tags can also be used to describe the application to users of assistive technologies, tags such as `aria-hidden` or `aria-expanded` describe the state of the application, or using tags such as `aria-describedby` to provide assistive technologies with the correct content that goes with another piece of content on the page. When developing an interface, it's always useful to ask yourself, if this needs and if this could be enhanced through the use of relevant ARIA tags

Roles are attributes that can be added to an element, for example, you could have a `<li>` tag, that is sitting inside a menu, adding a role to make it `<li role="menuitem">` will show that this element is intended to be a menu item. Attaching roles onto any element will provide assistive technologies with information on how to handle a specific element.

[Further reading for more information on roles and supported ARIA tags.][globalAriaAndRolesTags]


### Keyboard Usage

At [UpFrontConf this year][upFrontConf], there was an insightful talk on accessibility given by [Laura Carvajal][lauraTwitterLink], which discussed the concept of keyboard testing during the development stage of an application.  The process is quite simple, it involves unplugging a mouse from the device so you’re forced to navigate and use the application using only the keyboard. This encourages thought into page layout and flow during the development phase, to ensure a concise and natural feel for those who rely on a keyboard to interact with the application.

Other should-do's for developers to help keyboard users include; adding `:focus` styles in order to convey feedback to those using keyboards for when they are focusing elements that are tied to actions inside the applications, for example, if you have an element that would have a `:hover` state, then the `:focus` state should mimic the feedback that the `:hover` state conveys. In addition to this, custom elements that are created for the applications that are intended to be interacted with, should have a `tabindex` property, this will ensure that the element has the ability to be focused via a keyboard.

### Audio Captions

With the immense and ever-growing amount of content thats available on the web, it's important that this content can be accessed by as many people too. One of the major types of content consumed on the web is video. Just looking at YouTube, [over 1.9 billion users visit YouTube every month globally, and every day, over a billion hours of content is consumed by users.][ytStats] That is a massive amount of content, just on one platform.

If you are creating or displaying video on your application or website, adding captions should be of top priority. Platforms like YouTube offer tools directly to add them to your video, but it's also extremely easy to add captions if you are showing video that is self hosted and embedded via `<video>`tags.

First, you need to create a webVTT (`.vtt`) file, a basic webVTT file looks a bit like the following:

```
1
00:00:01.000 --> 00:00:10.000
Character1: Here is an example of using closed captions,

2
00:00:10.250 --> 00:00:15.000
that are displayed via various timestamps.
```

In order to get these into your video, you should upload them with your video, and then add them to your video markup like this:

```html
<video>
    <source type="video/mp4" src="/video/my_awesome_video.mp4" >
    <track src="/video/my_awesome_video_captions.vtt" label="English" kind="captions">
</video>
```

Following this simple step will allow your video to be accessible to those who are hard of hearing or deaf, you can also style captions in order to adapt them to the style of your application, should you wish. For more information on webVTT, check out the [w3 specification.][w3vtt]

## In closing

There is so much more to delve into for accessibility, and these four topics I've mentioned can be explored with so much more depth, but what I want readers to take away from this post is a mindset that will start to question how their applications are developed so that they can make improvements that incorporate thoughts and considerations for accessibility, and using the above aspects as a starting point. The web is a fantastic and connected place to share knowledge, entertainment and so much more, let's ensure that this content is available to as many as possible.



[UKGovernmentFamilyResourcesSurvey]: https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/692771/family-resources-survey-2016-17.pdf
[lauraTwitterLink]: https://twitter.com/lc512k
[globalAriaAndRolesTags]: https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties
[w3vtt]: https://w3c.github.io/webvtt/#introduction-caption
[htmlQuote]: https://html.com/semantic-markup/
[ytStats]: https://www.youtube.com/intl/en-GB/yt/about/press/
[upFrontConf]: http://2018.upfrontconf.com
