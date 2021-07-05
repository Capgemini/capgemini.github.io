---
layout: post
title: "Defining a Minimum Viable Redesign"
description: "How do you know when an incomplete new thing is more valuable than a complete old thing?"
category: "Drupal"
author: malcolm_young
tags: [Development, Design, Agile, Drupal]
comments: true
share: true
---

These days, it's pretty rare that we build websites that aren't some kind of redesign. Unless it's a brand new company or project, the client usually has some sort of web presence already, and for one reason or another, they've decided to replace it with something shiny and new.

In an ideal world, the existing system has been built in a sensible way, with a sound content strategy and good [separation of concerns][separation of concerns], so all you need to do is re-skin it. In the Drupal world, this would normally mean a new theme, or if we're still in our dream [Zen Garden][zen] scenario, just some new CSS.

However, the reality is usually different. In my experience, redesigns are hardly ever _just_ redesigns. When a business is considering significant changes to the website like some form of re-branding or refresh, it's also an opportunity to think about changing the content, or the information architecture, or some aspects of the website functionality. After all, if you're spending time and money changing how your website looks, you might as well try to improve the way it works while you're at it.

So the chances are that your redesign project will need to change more than just the theme, but if you're unlucky, someone somewhere further back along the chain has decided that it's 'just a re-skinning', and therefore it should be a trivial job, which [shouldn't take long][dates at random]. In the worst case scenario, [someone has given the client the impression][not enough information] that the site just needs a new coat of paint, but you're actually inheriting some kind of nasty mess with unstable foundations that should really be fixed before you even think about changing how it looks. Incidentally, this is one reason why sales people should always consult with technical people who've seen under the bonnet of the system in question before agreeing prices on anything.

Even if the redesign is relatively straightforward from a technical point of view, perhaps it's part of a wider rebranding, and there are associated campaigns whose dates are already expensively fixed, but thinking about the size of the website redesign project happened too late.

In other words, for whatever reason, it's not unlikely that redesign projects will find themselves behind schedule, or over budget - what should you do in this situation? The received agile wisdom is that [time and resources are fixed][triangle], so you need to flex on scope. But what's the minimum viable product for a redesign? When you've got an existing product, how much of it do you need to rework before you put the new design live?

This is a question that I'm currently considering from a couple of angles. In the case of [one of my personal projects][gallery], I'm upgrading an art gallery listings site from Drupal 6 to Drupal 8. The old site is the first big Drupal site I built, and is looking a little creaky in places. The design isn't responsive, and the content editing experience leaves something to be desired. However, some of the contributed modules don't have Drupal 8 versions yet, and I won't have time to do the work involved to help get those modules ready, on top of the content migration, the new theme, having a full-time job and a family life, and all the rest of it.

In my day job, I'm working with a large multinational client on a set of sites where there's no Drupal upgrade involved, but the suggested design does include some functional changes, so it isn't just a re-theming. The difficulty here is that the client wants a broader scope of change than the timescales and budget allow.

When you're in this situation, what can you do? As usual with [interesting questions][kent beck], the answer is 'it depends'. Processes like [impact mapping][impact mapping] can help you to figure out the benefits that you get from your redesign. If you've looked at your burndown rates, and know that you're not going to hit the deadline, what can you drop? Is the value that you gain from your redesign worth ditching any of the features that won't be ready? To put it another way, how many of your existing features are worth keeping? A redesign can (and should) be an opportunity for a business to look at their content strategy and consider rationalising the site. If you've got a section on your site that isn't adding any value, or isn't getting any traffic, and the development team will need to spend time making it work in the new design, perhaps that's a candidate for the chop?

We should also consider the [Pareto principle][pareto] when we're structuring our development work, and start by working on the things that will get us most of the way there. This fits in with an important point made by scrum, which can sometimes get forgotten about: that each sprint should deliver "a potentially shippable increment". In this context, I would interpret this to mean that we should make sure that the site as a whole doesn't look broken, and then we can layer on the fancy bits afterwards, similar to a progressive enhancement approach to dealing with older browsers. If you aren't sure whether you'll have time to get everything done, don't spend an excessive amount of time polishing one section of the site to the detriment of basic layout and styling that will make the whole site look reasonably good.

Starting with a [style guide][style guides] can help give you a solid foundation to build upon, by enabling you to make sure that all the components on the site look presentable. You can then test those components in their real contexts. If you've done any kind of content audit (and somebody really should have done), you should have a good idea of the variety of pages you've got. At the very least, your CMS should help you to know what types of content you have, so that you can take a sample set of pages of each content type or layout type, and you'll be able to validate that they look good enough, whatever that means in your context.

There is another option, though. You don't have to deliver all the change at once. Can you (and should you) do a partial go-live with a redesign? Depending on how radical the redesign is, the attitudes to change and continuous delivery within your organisation and client, and the technology stack involved, it may make sense to deliver changes incrementally. In other words, put the new sections of the site live as they're ready, and keep serving the old bits from the existing system. There may be brand consistency, user experience, and content management process reasons why you might not want to do this, but it is an option to consider, and it can work.

On one previous project, we were carrying out a simultaneous redesign and Drupal 6 to 7 upgrade, and we were able to split traffic between the old site and the new one. It made things a little bit more complicated in terms of handling user sessions, but it did give the client the freedom to decide when they thought we had enough of the new site for them to put it live. In the end, they decided that the answer was 'almost all of it'.

So what's the way forward?

In the case of my art gallery listings site, the redesign itself has a clear value, and with Drupal 6 being unsupported, I need to get the site onto Drupal 8 sooner rather than later. There's definitely a point that will come fairly soon, even if I don't get to spend as long as I'd like working on it, where the user experience will be improved by the new site, even though some of the functionality from the old site isn't there, and isn't likely to be ready for a while. I'm [my own client][own client] on that project, so I'm tempted to just put the redesign live anyway.

In the case of my client, there are decisions to be made about which of the new features need to be included in the redesign. De-scoping some of the more complex changes will bring the project back into the realm of being a re-theming, the functional changes can go into subsequent releases, and hopefully we'll hit the deadline.

A final point that I'd like to make is that we shouldn't fall into the trap of thinking of redesigns as big-bang events that sit outside the day-to-day running of a site. Similarly, if you're thinking about painting your house, you should also think about whether you also need to fix the roof, and when you're going to schedule the cleaning. Once the painting is done, you'll still be living there, and you'll have the opportunity to do other jobs if and when you have the time, energy, and money to do so.

Along with software upgrades, redesigns should be considered as part of a business's long-term strategy, and they should be just one part of a plan to keep making improvements through continuous delivery.

[separation of concerns]: https://philipwalton.com/articles/decoupling-html-css-and-javascript/
[own client]: http://www.red-route.org/articles/hooray-hackywood-joy-side-projects
[zen]: http://www.csszengarden.com/
[dates at random]: http://www.red-route.org/quotes/ellen-ullman-dates-chosen-random
[style guides]: https://capgemini.github.io/drupal/component-based-design/
[triangle]: https://www.atlassian.com/agile/agile-iron-triangle
[kent beck]: https://twitter.com/kentbeck/status/596007846887628801
[gallery]: http://red-route.org/articles/the%20gallery%20guide
[impact mapping]: https://www.impactmapping.org/
[pareto]: https://en.wikipedia.org/wiki/Pareto_principle
[not enough information]: https://capgemini.github.io/learning/how-not-to-lead/#not-enough-information
