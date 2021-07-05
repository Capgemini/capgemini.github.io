---
layout: post
title: "Some Details on the Subtleties of Scala and the Uniform Access Principle"
category: Scala
author: andrew_harmel-law
tags: [Scala, Development]
comments: true
share: true
---
Lets start off by taking a really simple function, `f`, which simply makes and returns a 5-value tuple which can be captured in a `val` or `var`:

`def f = (1, 3.14, “Mouse”, false, “Altitude”)`

The first element of this tuple is an `Int`, the second a `Double`, the third and fifth are `Strings` and the fourth is a `Boolean`. In short, `f` is a very simple tuple-builder. That means we can take it and allocate the resulting tuple to a `val`:

`val (n, d, a, b, h) = f`

Brilliant. Here, in microcosm, we have with an example of the [uniform access principle](https://en.wikipedia.org/wiki/Uniform_access_principle) in action. That is to say, as functions are first-class, I should be able to do with a function what I would do with any other object, and it should be transparent. It was this transparency that pulled me up short.

Now this is a great kick-off, but it doesn't tell the whole story. Luckily the [Atomic Scala](http://www.atomicscala.com) Atom: “Uniform Access and Setters” is there to bring us fully up to speed.

Once you’ve seen it, it makes perfect sense, but when I came upon this chapter-ette, I’d been under the misapprehension that you could swap `def`s for `val`s or `var`s as you pleased. However, it soon became clear that there was more to think about, and this thinking comes down to contracts; contracts that the language makes with us, and which it (and we) can’t break.

For this discussion, the relevant Scala contracts are:

* `val`s are immutable
* `var`s aren't
* functions (`def`) can return different values and so Scala can’t guarantee the result will always be the same

This means that you can’t just implement fields and methods from an abstract base type in a subtype using any old variable or function. You must make sure you don’t break the contract that was made already in the parent. Explicitly:

* an abstract `def` can be implemented as a `val` or a `var`
* an abstract `var` can be implemented as a `def` as long as a you also provide a setter as well as a getter

You’ll note that abstract `val`s can’t be implemented with `def`s. That makes sense if we think about it. A `def` could return various things – Scala can’t guarantee it’ll always be the same (especially if you consider overriding), whereas `val`s are immutable. Broken contract? Denied.

## An Added Subtlety

But wait a minute, we missed a fourth contract. That second bullet mentioned setters. The contracts in play here are actually four-fold:

* `val`s are immutable
* `var`s aren’t
* functions (`def`) can return different values and so Scala can’t guarantee the result will always be the same
* `vars` require getters and setters`

But we can still roll with that if we add another little piece of Scala sugar, we can supply a setter method in the subtype:
`def d3 = n
def d3_=(newVal:Int) = (n = newVal)`

Here, the “`def d3_=...`” line adds the setter Scala needs to fulfill the contracts and we’re back in action.

## Does This Also Stand For Non-Abstract Overrides?

One final thing to consider is how uniform really is the Scala implementation of the principle? Pretty well universal as far as I can see, because going beyond the scope of the Atom, what happens when the superclass and it’s methods and fields aren’t `abstract`? It turns out it’s exactly the same as above, as long as you remember your `override` keywords. Predictable. Nice.

## Posting Note
This post originally appeared on the ["Scala Eye for the Java Guy" blog](http://scalaeyeforthejavaguy.blogspot.co.uk/) as [two](http://scalaeyeforthejavaguy.blogspot.co.uk/2013/09/simple-tuples-for-tired-plus-lesson-in.html) [separate](http://scalaeyeforthejavaguy.blogspot.co.uk/2013/09/more-on-subtleties-of-scala-and-uniform.html) posts.
