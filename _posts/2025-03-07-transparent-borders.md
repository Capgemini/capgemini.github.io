---
layout: post
title: Transparent borders for element states
description: An old-fashioned CSS trick
category: Frontend
tags: [Development,CSS]
author: [malcolm_young]
comments: true
---

It’s quite a common design requirement to have a border on some states of an element but not others. For example a set of tabs where the currently active tab is highlighted with a top border, or a button where a border is added on hover.
 
The problem is that if you add a border to an element, that changes its size, so if you add a border on one state of a component, then the size will change when the state changes, as you can see from these examples:

<div class="row">
    <div class="column small-12 medium-6 small-centered medium-uncentered">
        <div class="flex-video">
            <iframe src="https://codepen.io/malcomio/full/abrmwjd"></iframe>
        </div>
    </div>
    <div class="column small-12 medium-6 small-centered medium-uncentered">
        <div class="flex-video">
            <iframe src="https://codepen.io/malcomio/full/oNRzwqY"></iframe>
        </div>
    </div>
</div>
 
One simple and elegant solution is to use a transparent border on the other versions of that element, and only change the border colour when the state changes.

This feels like a very old and quite basic piece of advice, so I assumed it must have been written about before, but the only example I’ve found is in [this stack overflow answer](https://stackoverflow.com/questions/39385180/css-adding-border-to-button-on-hover-how-avoiding-a-shifting-of-the-following). 

<div class="row">
    <div class="column small-12 medium-6 small-centered medium-uncentered">
        <div class="flex-video">
            <iframe src="https://codepen.io/malcomio/full/GRajEXy"></iframe>
        </div>
    </div>

    <div class="column small-12 medium-6 small-centered medium-uncentered">
        <div class="flex-video">
            <iframe src="https://codepen.io/malcomio/full/MWdjQyv"></iframe>
        </div>
    </div>
</div>

There are other ways to approach this, like using an inset box-shadow, or changing the padding to offset the size of the border, but to me that feels unnecessarily complex, and unintuitive enough that I’d want a comment in the code to [explain why](https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/).
