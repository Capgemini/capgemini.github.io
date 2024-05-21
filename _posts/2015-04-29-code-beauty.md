---
layout: post
published: true
title: Code Beauty
mathjax: false
featured: false
comments: true
category: Development
tags: [Development,Programming,Psychology]
author: john_nash
share: true
---

When was the last time you or a colleague looked at some code and made a comment about its attractiveness? You may have said that some code was “ugly” or, if you were more fortunate, you might have called it “neat” or “elegant”. What is it about code that makes us say and think these things and why should we care, after all our compilers, interpreters and computers generally don’t care?

This is a topic that Adam Tornhill covered, amongst other things, in his DevWeek 2015 talk “Code that fits your brain”. It’s an interesting lecture and Adam is an entertaining speaker so I recommend it to you (you can find the [DevWeek slides here](http://devweek.com/uploads/event/slides/194/Adam_Tornhill_-_Code_That_Fits_Your_Brain.pdf) and [an earlier presentation of the talk here](https://vimeo.com/97471514)).

## Why Should We Care About Code Beauty?
When all other factors are equal, humans prefer attractiveness or beauty and we instil subjects that we find attractive with additional positive qualities. For example, we perceive people who are more attractive to be more intelligent and competent. It seems that this bias is something that is hard-wired into us. Even new born babies, who haven’t had time to develop any other preconceptions, exhibit this behaviour, as shown by their tendency to prefer to stare at more attractive faces (Slater, et al - Newborn Infants Prefer Attractive Faces). It’s clear that there is some deep seated psychology at work here.

The theory is that we use beauty subconsciously as an approximation for good health. From a survival and evolutionary point of view this makes a lot of sense. In the past you couldn’t medically tell the health of a new potential ally or mate, but if they looked attractive there was a good chance that they weren’t suffering from any detrimental illnesses. That was probably a good enough measure to use when deciding if you wanted to hunt sabre tooth tigers together.

So if people see your code as attractive, they should be more inclined to trust it and want to work with it. Code beauty is a proxy for code quality that we can immediately and intuitively make use of, without any deep analysis work or tools. That’s not to say those tools and techniques aren’t useful, just that people will form an opinion of a code base without them.

## What Is Code Beauty?
How do we go about making our code attractive? What does attractiveness even mean when we talk about code?

![Faces](/images/2015-04-14-code-beauty/Faces.png)

Back in 1995, psychologists working on a study made a discovery. They found that the majority of people rated the face on the top left as the most attractive. That’s interesting because the face doesn’t belong to a real person. It is a composite that is made up of the average of other faces.

It turns out that the more faces you take an average from, the more attractive the face becomes and this suggests that beauty is in fact a negative concept. It is the absence of imperfections, that got averaged out, that make the face more attractive. We can use this idea to help us decide what beautiful code is.

Code is beautiful when it has all the imperfections removed. For code an imperfection is unnecessary distraction and noise that prevents us from seeing and reasoning about the problem domain and its solution. Anything that puts an additional mental load on the reader can be considered to fall into this category. For example:

* Inconsistencies that draw attention where it isn’t needed, 
* Large code blocks that don’t fit easily into our brain’s working memory, 
* Special cases (such as error handling),
* Code that is written in language that is at a lower level than the problem domain.

In fact the effects of these sorts of distractions and noise can mount up over time to such an extent that a code base can become unreadable and impossible to maintain. You only have to read the opening chapter of Robert Martin’s book Clean Code (a book that I highly recommend if you haven’t already read it) to get a sense of how big an issue this can become and how it can kill projects.

I could stop here, but there’s one last gotcha regarding code beauty that I think I should flag. We all prefer (and find attractive) familiar things. This is called the [Mere-exposure effect](http://en.wikipedia.org/wiki/Mere-exposure_effect) and it can make you select styles or techniques purely because you’ve used them before and this in turn makes you reluctant to adopt new styles or techniques.

As an example, you might prefer this code, written in C# in an imperative style.

```c# 
int sum = 0; 
foreach (int i in mylist)
{
   sum += (i + 1);
}
```

Or you might prefer this code, written in Clojure in a functional style.

```clojure 
(reduce + (map inc mylist))
```

They both do the same thing and your preference probably depends on what sort of code style and language you usually use.

## You’re not done when the Code Works!
So, next time you’re writing some new code, or updating some existing code; don’t stop once you’ve got it working. Spend a little bit of extra time asking yourself:

* "Could I make this code a bit more beautiful?"
* "Could it read a little more clearly?"
* "Could it be a little less cluttered?" 

If the answer is yes, make that change. Making your code a little bit more attractive reflects well on you and the extra time will pay your team back tenfold by reducing further development and maintenance costs.
