---
layout: post
title: "Modern Frontends live"
subtitle: "a summary of ‘uncut gems’"
summary: "Take aways worth knowing for frontend developers"
category: Frontend development
tags: [Frontend, Browser, Web, Open Source]
author: [julie_vaccalluzzo]
comments: true
share: true
---

![modern frontends live main stage](/images/2022-11-17_Modern_frontends_live.jpg)

It wasn’t the best conference that I have been to. A lot of the speakers complained in public about the lack of organisation. The event was not live streamed as promised, some speakers pulled out, none of it recorded and although at the Excel Centre, the location in the Excel Center was at the very end and poorly sign posted. Coffee was super gross, but I didn’t drag myself away from my comfy home office for the free lunch.  The content was great. It can be hard to keep up with what is going on, unless you are knee deep in the cesspool Twitter feeds on a daily basis. Attending conferences and meetups are a great place to play catch up.
I am not sure what this post pandemic world holds for conferences. It’s nice to see a slew of conferences streaming live, although, I find it too easy to not attend or pay attention when you are not physically there.

Here a list of ‘uncut gems’ and people I think are well worth a follow providing Twitter doesn't turn into a giant sink hole. Enjoy!

## Things we should stop using JavaScript for

### Native browser elements
[Stop using JavaScript for that: move features from JS to CSS and HTML](https://speakerdeck.com/init/stop-using-js-for-that-by-kilian-valkhof-init-2022)

[Kilian Valkhof](https://twitter.com/kilianvalkhof)

Using native [colour picker](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) and use `<input type="color">` instead.

I never thought I would see a 'pop up' become native after Google gave the idea the axe because it takes the user away from the content.  The modal or dialogue lost favour from a UI perspective. Things change, so it’s always a good thing to know that this native colour picker exists. I can certainly see this native feature for browser based software.
[HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)

## CSS How Does CSS Work?

[Elad Shechter](https://twitter.com/eladsc)

### Reinventing the reset.

[CSS all](https://developer.mozilla.org/en-US/docs/Web/CSS/all)

`all: unset;`

Un-sets everything except the Unicode setting. No more overriding overrides of overrides. I wish I had this when I was forced to use Bootstrap for all site development.

Without using *before* and after *elements*, using *all:unset* to build a custom [checkbox that looks more like a mobile UI interface](https://codepen.io/elad2412/pen/jOymRJy).

`display: revert;`

Rolls back the cascaded value to the user agent's default style.

Using this as a launch point may I introduce the new [CSS reset](https://elad2412.github.io/the-new-css-reset/). Like Reset and Normalise, *CSS reset* does a similar thing with half the code. We no longer need to specifically override every property.

If you want to find out more about where it came from and how it’s put together read [The new CSS Reset](https://elad.medium.com/the-new-css-reset-53f41f13282e)

## The Four Principles of Accessibility

[Homer Gaines](https://twitter.com/xirclebox), Certified #A11y Professional

[Twitter accessibility communities](https://twitter.com/i/communities/1470900050029072386)

Refreshing perspective from across the pond. You can [watch the presentation on YouTube](https://www.youtube.com/watch?v=RUxx_sq2QdY&ab_channel=UXDX).

Tab index should never be less than 1. Negative numbers are not reachable with keyboard navigation but can be useful should you wish to make this element visible on another action.

HTML Semantics can sometimes be a pain. Design may want to give weight to copy when semantically it does not make sense and can hurt your SEO and page rankings not mention make a mess of your accessibility and CSS overhead.

Welcome [ARIA presentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role). This means that these elements and all their children are not exposed to assistive technologies.

## Beyond the browser – how to talk with robots

[Nico Martin](https://twitter.com/nic_o_martin)

It is now possible to use the browsers’ native [Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) to connect with things to do stuff.

Nico used the browser to communicate via [Bluetooth to his raspberry pi driven LED matrix](https://slides.nico.dev/221118-robots-modern-frontends-live/#/). The feature is experimental and needs to have the flag turned on, but this is a good indicator of the direction of how the internet of things may interact with the browser, or any browser.

## The Web's Next Transition

[Kent C. Dodds](https://twitter.com/kentcdodds)

If you haven't heard of Kent C Dodds, what rock have you been living under? This next bit makes me feel like we're going back to table design with CSS grid.

### Progressively Enhanced Single Page Apps (PESPA)

This is the idea that we progressively enhance our web pages to work with JS.
So where there is no JS…  we show a submit button, if JS is available, use the fetch API.

[Remix](https://remix.run/) is a web stack that follows this model. I can’t say I am not a fan, even if JS is pretty much ubiquitous.

Find out more from Kent's [article](https://www.epicweb.dev/the-webs-next-transition).

## Gotta Go FAST: Use Web Components with FAST

[Waller Goble](https://twitter.com/WallerGoble)

I love Web Components, it’s a standard that that is native to the browser, but like most new browser based technologies, is still not fully supported by browsers that are not evergreen (browsers that are automatically upgraded to future versions, rather than being updated by distribution of new versions from the manufacturer). Web Component base frameworks I am familiar with, include, [Lit](https://lit.dev/docs/v1/lit-html/introduction/) (Google) which is a polyfill to help bridge this gap, Salesforce [Lightning](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_introduction), which does that same thing under the hood. If you are familiar with the Big Commerce platform, it too uses Web Components [Stencil](https://stenciljs.com/docs/introduction) for most it's components.  [FAST](https://www.fast.design/), is the new kid on the block and a nice surprise. It’s also a surprise that this library has been developed by Microsoft.

Find out more about [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components#see_also) and its web component libraries available.

Having been burnt by ActionScript as a Flash development, I worry that as Meta and Facebook become less popular platforms, Meta and it’s community support for React might fade and I would rather invest in tech that is browser standard… Like JS, it’s not perfect, but everyone uses it. Having said this, because web components are standard, they can also be integrated with your preferred framework.

## What my browser can do

[Francesco Leardini](https://twitter.com/paco_ITA)

The [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) provides events you can watch for to know when a document becomes visible or hidden, as well as features to look at the current visibility state of the page.

Instead of sniffing for unreliable devices that date, have a look at the [Media Capabilities API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capabilities_API)

The [WakeLock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) prevents device screens from dimming or locking when an application needs to keep running.

This is done by reading luminance around the host application with the Ambient light sensor.

[File system access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) only available with HTTPS. I see applications for this in combination with Web Machine Learning. keeping personal information local, secure and decentralised.

[Native Web share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) will allow users to share data with other sites without the need for horrible 3rd party APIs.

Access to contacts with the [Contact Picker API](https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API).

[WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) individual frames of a video stream and chunks of audio
Enables hardware encoders/decoders via a WebCodec API. Codecs have always been a pain having to accommodate for different proprietary codecs only available to users of certain OS or software, so this is a nice advancement. Video codecs supported are AV1, AVC1, VP8, VP9 and HEVC.

See Francesco Leardini’s [GitHub project for examples](https://github.com/pacoita/modern-web).


## Beyond the web of today

[Kenneth Christiansen](https://twitter.com/kennethrohde)

Web apps should be able to do anything iOS, Android, or desktop apps can. The members of the cross-company [Capabilities Project](https://www.chromium.org/teams/web-capabilities-fugu/) want to make it possible for you to build and deliver apps on the open web that have never been possible before. See [Fugu API Tracker](https://fugu-tracker.web.app/) for current and future API in development for the browser
For fun, checkout [VS Code for the Web](https://vscode.dev/).



Some of the features that are worth note in browser technology.
[Web Assembly and WASM](https://developer.mozilla.org/en-US/docs/WebAssembly) – Web Assembly is a new type of code that can be run in modern web browsers — it is a low-level assembly-like language with a compact binary format that runs with near-native performance.

[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) has been around for a while but is very much underutilised. As browsers are increasingly evergreen, using webGL is becoming more viable. WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. Kinda makes me angry knowing what Flash was able to do 20 years ago!

While I have been aware of WebGL I was not aware of [WebGPU](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features), is the working name for a future web standard and JavaScript API for accelerated graphics and compute, aiming to provide "modern 3D graphics and computation capabilities"

[Web Machine Learning](https://webmachinelearning.github.io/). Arguably the most exciting thing coming to the future of the browser, or is it here now. Web Neural Network brings machine learning to the browser natively. Some interesting uses include machine translation, detecting fake video, facial recognition and emotion analysis. There are a lot of ethical considerations for this technology, and its uses, however, the there are some very good use cases for assistive technology and accessibility for disabilities.

Overall, conferences are good to find out where you would like to get your toes wet and there is no better time than now to start playing around and learning a new skill.

I think that if AI is not outlawed outright, using browser technology to enhance if not completely automate user journeys and interactions is on the cards. How will the web interact with virtual assistants to make holiday bookings and cobots (collaborative robots) to provide medication in our senior years? The future is definitely interesting. Let's see.














