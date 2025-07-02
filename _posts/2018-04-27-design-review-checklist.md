---
layout: post
title: A design review checklist for non&#8209;designers 
description: Some ideas to help developers review designs
summary: If we can't entirely break down the wall that designs are thrown over, let's at least put a gate in it.
comments: true
author: malcolm_young
category: Development
tags: [Design, Ways Of Working, Agile, Frontend]
---

The world of web design and [development has changed enormously over the course of my career so far][funerals], and mostly for the better. In some ways, building websites has become much easier. In others, it's become far more complex. While browser support for web standards has improved, the range of device sizes out there makes aiming for pixel perfection a fool's errand. Thankfully, it's no longer such a common aim - there’s a more widespread acceptance, largely since the responsive design revolution, that websites won’t look the same in every browser. 

In some ways, though, things haven’t changed that much. Sketch may have largely replaced Photoshop, and design deliverables are more likely to be Invision prototypes, but the process is often similar. The industry may have largely adopted agile, at least [superficially][cargo cult], but projects can sometimes feel like a series of mini-waterfalls, with a set of gates to pass through. Things will generally go something like this: After some research, a designer creates a mock-up, and shares it with the client (perhaps sharing some of the thinking that has gone into it). The client gives feedback, which may or may not be based on something more scientific than "I like it" or "I don't like it". Then the designer takes it back for a round of revisions, which is then presented to the client. This continues for a few iterations until the design is signed off, and then the developers build it. Once the developers think it's ready, it's tested, compared to the designs, and any discrepancies are logged as bugs to be fixed.

In an ideal world, this sign-off from the product owner would be an ongoing collaborative activity, based on looking at a web page, rather than a mock-up. Designing in the browser would be quick and easy enough that there'd be no need to throw designs over a wall, and the line between designer and developer would become more blurred, perhaps even disappear. For small projects, or minor changes, that can often be the case, but on large complex projects, there's still usually a handover from designers to developers, and the design deliverables are often held up as the target for the developers to hit. In that series of waterfalls, there's a danger that the designs will be viewed as stone tablets handed down from on high, so it's vital that those designs are reviewed thoroughly before they're signed off.

It's always good to get another pair of eyes to sense-check your work - that's why [I'm so keen on code reviews][code reviews], and the same principle applies to design work. It's easy to be so focused on one aspect of what you're doing that you miss something else, and modern web design has so many facets to bear in mind that it's difficult for one person to think of everything.

Perhaps the biggest reason for developers to review designs is to ensure that it will be technically feasible to build whatever it is that's being designed. In the past, a big part of this might have been about persuading the design team not to use quite so many gradients, drop shadows and rounded corners, or at least to accept that [they wouldn't be present in all browsers][rounded corners]. These days, as with so many aspects of our jobs, things have evolved, and developers need to think of the bigger picture beyond the code. Developers may also have valuable insights into how best to build the designs into a working system. For instance, if you're building with a particular framework, it may give you some components out of the box that might meet the needs of the client. If the design can incorporate these existing components, rather than needing everything to be custom-built, the project is likely to proceed much more efficiently. 

We’re often building new functionality on existing websites, and our clients may work with multiple design agencies, which means that the person designing the new elements may not have been involved in previous phases, and may not be aware of the decisions that have been made in the past, or the discussions that informed them. Ideally there's some kind of style guide to help ensure consistency, but design decisions from the past shouldn't be set in stone. If the new designer is going off-piste, either through oversight or deliberate choice, it's important to make sure that the decision is given due consideration, based on sufficient knowledge of those past choices. Often the code is the best source of information about past decisions.

Even on "greenfield" projects, it's good to have developers involved as early as possible, partly because they might be able to suggest minor changes that can lead to major efficiencies, and partly because developers tend to approach things with a fairly modular way of thinking.

At Capgemini, developers collaborate closely with our colleagues from the user experience design team. On my current project, I'm lucky to be able to sit with our design team,  so we can talk things through very easily every step of the way. On other projects, the design work might be done by an external agency, or perhaps even in another country. One of the most important factors in the success of these projects has been getting developers and designers talking to each other as early as possible. 

In my experience, the closer the working relationship between designers and developers, the more likely the project is to be successful - we've had much better results when we've been able to co-locate the teams and remove barriers to communication. It's important to avoid a "them and us" scenario, where designers come up with ambitious ideas, and [developers are always saying no][grumpy].

## A checklist for developers reviewing designs
The reality is that there will always be changes as the project moves forwards. That's the whole point of agile. During the project, and after go-live, we'll discover reasons why a design will need to be tweaked, perhaps for technical feasibility, perhaps because we've realised that it would improve user experience. While a digital product may never be truly finished, it's a lot easier to make changes when you're still looking at prototypes and mockups than once you've built a large system. 
So if a developer has objections to a design, or suggestions for improvements, the earlier you raise them the better. All too often, I've realised that a design needs changes only after it's been presented to the client for sign-off. 

With that in mind, here's an attempt at a checklist of things for developers to think about when reviewing proposed designs.

### Is the design consistent?
If (as is so often the case) we're building on top of something that already exists, we need to make sure that our new features follow any styles and conventions already established in the existing product. Even if we're starting from scratch, it's important to ensure that there's internal consistency within our designs. 

Are shared components, such as menus and branding, the same across all screens or pages? If there are different designs for different breakpoints or platforms, is there consistency between them?

I’ve bought into the ethos of [style guides, component libraries and design systems][component-based], but it's natural that people want to see what those components will look like in context, so it can be difficult to escape from full page comps. The more that the designers have approached things from a component-based way of thinking, the more likely it is that the design will be consistent, but there's always the possibility of typos or other errors.

Even if there's not a component library, with large organisations, you'll probably be working within a set of brand guidelines. If so, do the designs follow them? If not, is this project an opportunity to start building a style guide?

#### Do all the relevant elements appear? (and no irrelevant ones)
Have we missed out anything important? Or has anything crept into one of the designs, perhaps a leftover from a previous iteration? This shouldn't generally be a deliberate choice: ["If content is relevant to users on one device, it should also be available on other devices and not hidden away"][hide].

#### Are elements in a consistent order?
For instance, if there's a login form with a "forgotten password" link, does the link appear before or after the form submit button? Whatever the 'right' answer is from a user experience point of view, it usually makes sense to keep the same answer throughout the project.

#### Are sizes consistent?
If there's a grid system in use, does the new design follow it? Do the image sizes and aspect ratios match what's there already? Are the aspect ratios the same at different breakpoints, or will there be a need to art direct responsive images? If so, does that cause extra complexity?

#### Are the colours in the existing palette?
Hopefully you're working with a set of brand guidelines, where the colour palette has been explicitly defined, and you have a list to reference. If not, perhaps the next best thing is a Sass variable list from the current codebase. Wherever your colours are defined, it makes sense to refer back to a list, and consider whether additions to that list are justified.

#### Is the typography consistent?
How many font sizes, weights, and variants are you using? Do you really need all of them? Is there a reason that the heading on this page is 1px bigger than an apparently equivalent heading on that page? 
Again, ideally this would follow an existing style guide, but it's the kind of area where it's easy for inconsistencies to creep in, especially if multiple designers are working on a project, unless someone has taken the time up front to define the ground rules.

### How accessible are the designs?
Where developers are often guilty of sacrificing end users' needs to their own convenience, designers can sometimes focus too closely on the aesthetics of their work, and risk neglecting inclusivity.

This is a big subject, and I won't be able to do it justice here, but a few things to keep an eye out for include:

* [colour contrast][colour contrast]
* [text size][fonts]
* [form labels][labels]
* [excessive motion][animation]

### Is the wording appropriate?
For some designers, it might be tempting to think that the words don't matter in mock-ups, but [designs shouldn't use Lorem ipsum][real content]. The words used should be consistent with the current site, consistent between designs, and consistent with the organisation's tone of voice. They should also be inclusive, avoiding jargon or unnecessarily complex vocabulary. They should also be checked for spelling and grammar - sloppy mistakes may seem trivial, but they can make a terrible impression with clients that can damage the project.  
 

### How flexible is the design?
What happens when a section has longer or shorter text than the designer has used? Will the CMS automatically resize images to the desired size, or can editors control the size of the image that is displayed? In short, is there a danger that editors (or other users) could break the design? While it may or may not be feasible to train content editors to follow guidelines about content (or even set hard limits in the CMS), end users will always do their own thing, and the design should be able to adapt to them. For example, if your system shows the logged-in user's name in an effort to be more friendly, you'd better be confident that the design can cope with long names, and as Karen McGrane puts it, ["truncation is not a content strategy"][truncation].

### Does the data actually exist in the system? 
A big reason for having developers (both front end and back end) involved as early as possible in the design process is to be able to apply knowledge of the internals of the system. For example, I recently worked on a project where the designer wanted to include a profile picture in the user details page. It looked great, but the system didn't have a facility to add images to user profiles, and building it would have been too complex, given the intended project timelines. On another project, we wanted to show users the contact details of their account manager, but there wasn't any feasible way that the website could get access to that information.

### Are there any legal implications to consider?
This is another enormous and complex subject area, and one that will only become more important with the introduction of GDPR. For instance, if you're creating a marketing sign-up form, you'll need to consider [how to appropriately confirm consent][GDPR].

### Will it be feasible to build these designs into a performant system?
CSS is far more powerful than it used to be, and improved browser support for modern features means that we can create much more adventurous and ambitious designs than was possible a few years ago, without needing to resort to some of the hacks that used to be widespread. Having said that, we need to be careful not to forget that ["performance is user experience"][performance], as Lara Hogan put it so effectively.

These early conversations are the time to think about setting a [performance budget][performance budget] - once the client has fallen in love with the high-resolution fullscreen images, it's too late.

While images usually have the biggest impact on performance, adding more fonts (or variants of the same font) is a very quick way of slowing down page load. How many fonts does your design actually *need*? Sometimes [embracing constraints][constraints] can help designers to do their best work.

## Signing off
I've only briefly touched on a few points here, and some of them are big enough to merit whole books, but hopefully this list will be useful to you in your projects. I'm sure that there are review points I haven't thought of. After all, that's the whole point of reviewing things. So if you have any suggestions, please let me know via Twitter or the comments section.

[funerals]: https://capgemini.github.io/learning/knowledge-funerals/
[cargo cult]: http://www.jamesshore.com/Blog/Cargo-Cult-Agile.html
[component-based]: https://capgemini.github.io/drupal/component-based-design/ 
[labels]: https://www.filamentgroup.com/lab/a11y-form-labels.html
[rounded corners]: http://boagworld.com/design/where-are-my-rounded-corners/
[code reviews]: https://capgemini.github.io/learning/better-learning-code-reviews/
[GDPR]: https://www.econsultancy.com/blog/69253-gdpr-10-examples-of-best-practice-ux-for-obtaining-marketing-consent
[SVG]: https://capgemini.github.io/frontend/jekyll-svg-icons/
[truncation]: https://mark.ie/blog/a-conversation-i-have-with-nearly-every-designer/
[grumpy]: https://www.nczonline.net/blog/2012/06/12/the-care-and-feeding-of-software-engineers-or-why-engineers-are-grumpy/
[hide]: https://thenextweb.com/dd/2015/10/28/9-responsive-design-mistakes-you-dont-want-to-make/
[real content]: https://www.creativebloq.com/features/design-with-real-content-for-a-better-ux
[performance]: http://designingforperformance.com/
[performance budget]: https://timkadlec.com/2013/01/setting-a-performance-budget/
[animation]: https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity
[colour contrast]: https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/
[fonts]: https://webaim.org/techniques/fonts/
[constraints]: https://designshack.net/articles/graphics/designing-with-constraints-thinking-inside-the-box/
