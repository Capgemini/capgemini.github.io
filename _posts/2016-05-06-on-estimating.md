---
layout: post
title: "Musings on estimation"
category: Agile
author: tom_phethean
tags: [Estimation, Agile]
comments: true
share: true
description: "Thinking about writing a blog post about estimating but not sure how long it will take."
summary: "Thinking about writing a blog post about estimating but not sure how long it will take."
---
<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Thinking about writing a blog post about estimating but not sure how long it will take.</p>&mdash; Tom Phethean (@tsphethean) <a href="https://twitter.com/tsphethean/status/702920932508246016">February 25, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I knew when I posted that tweet that I wanted to write a blog post about estimating. After all, I've [written on the topic before](https://capgemini.github.io/agile/estimation/), but wasn't sure exactly what form the post would take or what message I really wanted to get across. What I did know was that estimation is an important theme, and that I could create some value for both myself and others by putting my thoughts on a page.

## Blast from the past

Seeking inspiration, I looked back at a sample of past blog posts I've written, measuring word count of posts and looking at time from first commit to when the pull request to publish was opened:

| Blog post                          	| Number of Words 	| Days taken to write 	| Words/Day 	|
|-----------------------------------|----------------|--------------------|----------|
| [Reflections of Symfony Live London](https://capgemini.github.io/open%20source/symfony-live/) 	| 860             	| 7                   	| 122       	|
| [Keeping Drupal Secure](https://capgemini.github.io/drupal/securing-drupal/)                    	| 1303            	| 7                   	| 186       	|
| [Drupal Integration Patterns](https://capgemini.github.io/drupal/drupal-integration-patterns/)        	| 1409            	| 25                  	| 56        	|
| [The Lead Developer Conference](https://capgemini.github.io/learning/lead-developer/)      	| 1129            	| 2                   	| 564       	|
| [New Year, New Career](https://capgemini.github.io/blog/capgemini-hiring-fatjil/)               	| 230             	| 1                   	| 230       	|
| **Average:**                      	| **986**          	| **8.4**              	| **231**   	|

## Come back in a week

Looking at the data, it appears I can write a couple of hundred words a day. I am likely to turn out a blog post in just over a week. In other words, if you asked me to write a blog post, I could think about blog posts I've written before and tell you I'll take about a week to do it. I'll mostly meet expectations, but will disappoint you 20% of the time.

Simple, right? If you come back in a week's time, there should be a fully formed blog post ready for your reading pleasure.

Well... not exactly. There's some pretty big variances in the details of even that small data set. Let's explore.

## Productivity factors

The data includes one post, written in a day, which was very short and was heavily influenced by a press release which we'd released through another channel. This meant that the amount of thought that had to go into the content was limited because someone else had already done the hard work for me. I could just tweak it a little bit for my intended audience and away we go. Excluding that post lifts the averages to over 10 days for a post, and raises the average word count to about 1200.

*This means I'm reducing my average effort by about 20% if I incorporate re-use of work that's done before.*

Let's look at the other end of the scale. My post on [Drupal Integration Patterns](https://capgemini.github.io/drupal/drupal-integration-patterns/) was longest in both word count and duration to write. That's because it was a topic I was wrestling with, and I wasn't sure how I wanted to get the message across. In writing it, I was referring to a lot of other content and inputs. It was also (relatively) original thought. My perspective on something. <span class="pullquote">I needed to stop and consider what I really did think about the topic, which obviously adds to the effort.</span> It was also written at a time I had a lot of other things going on. Excluding this post drops my days per post to about 5, without substantially altering the average word count.

*This means I'm roughly 60% less efficient if I'm not focused on the task, or if I'm creating something I've not done before.*

Even looking at two posts that should be very similar, "[Reflections of Symfony Live London](https://capgemini.github.io/open%20source/symfony-live/)" and "[The Lead Developer Conference](https://capgemini.github.io/learning/lead-developer/)", both about experiences at conferences, we can see quite significant differences in productivity. I'll be honest:

*I have no idea why one took longer than the other - or why I was 460% more efficient writing one post than the other.*

## Writing is only half the job

Of course, the other factor in all of this is that I'm only estimating the things that I'm in control of. I can control the topic I'm writing about. I can decide when it's done. I'm responsible for organising my time and focusing on getting it done.

What I'm not looking at is the uncontrollable factors. Our publishing process is to open a pull request on our blog Github repository. Other authors then review the posts, make suggestions, ask for clarifications, highlight grammatical errors or places the content doesn't flow. We go through this cycle of review and amend until the post is in a publishable state, agreed by at least two of the reviewers. This keeps quality high (and shout out time - they all do an amazing job) but does mean that the review cycle can vary from a couple of hours to... longer... depending on who is around and available to provide feedback.

Then we have to wait for a publishing spot. We try not to overload our readers with too many posts in a short space of time, and will often have a small queue of posts ready to go just to give us a buffer in case we have a period of low inspiration (touch wood, not so far!). This can mean there's a few items ahead waiting to be published. For time critical posts, we might jump the queue - if something is related to a specific event or hot topic.

Finally, there's the act of publishing. Fortunately, we use [Jekyll](https://jekyllrb.com/) and [Github Pages](https://pages.github.com/), which means our publishing process is very simple. Carry out a final preview of the branch locally, merge the pull request and wait a minute or so whilst the magic happens. However, this isn't a zero time activity, and we have a smaller number of people with permissions to publish new posts, so this is another factor that could influence how long the new blog post is ready.

So, back to the original question - did you want to know how long it would take to get my post in draft form, or how long it would take to be published?

## What's your point?

I imagine a number of people will be wondering what I'm waffling on about. Fortunately, I do have a point. Everything we have looked at so far has direct parallels to the question we all get on a regular basis - "How long is this piece of work likely to take?". Hopefully, we can draw some lessons from this:

### "did you want to know how long it would take to get my post in draft form, or how long it would take to be published?"

In agile practices, this would be your definition of done. What exactly are you being asked to estimate, and what will it look like when it is done? The time to produce some working code in your local development environment can be vastly different to the time taken to get through code review, testing cycles, user acceptance and deployment. Make sure you know what it is you're being asked to estimate and what the person asking is expecting.

### "I'm only estimating the things that I'm in control of"

We talked about cycles outside your control - like getting peers to look at your code, arranging users to test it. Even once these are in place, you're losing control of the duration. At best you can time box the activity, but you can't guarantee what is going to be found. Testing might uncover one bug or one hundred, just like I've had blog posts published with an "all OK" as often as I've written terribly and had loads of comments to address.

In reality, your best bet for predictability is [keeping items small](https://en.wikipedia.org/wiki/Subitizing) and automating as much as possible. Why wait for someone to point out ten spelling mistakes when you could run a spell-checker? In the same way, automate your code checks - whether through unit tests, code style checks or test environment deployments. <span class="pullquote">The smaller the item under inspection, the less likely something will crop up that will delay things</span>, but if it does then the queue of other things can carry on past it in a steady flow.

The other factor is that developers tend to only estimate for the bit that they think of as "actual dev work" and forget about including time for meetings, documentation, testing, and all the general bits and pieces around the project. The pieces that tend to turn "it'll take 2 hours" into a full day task, or longer. All of these are [forms of waste](https://capgemini.github.io/agile/understanding-and-addressing-our-waste/), all of which can extend the duration of our work, and influence the time to get to "done".

Remember to think in terms of both effort (or time spent on the activity) and elapsed time that it's likely to take to complete that effort.

### I have no idea why one took longer than the other

We saw, in the blog post examples, evidence of being quicker at things where "prior art" already exists, or things we've done before. We also saw that doing something for the first time takes longer. Finally, we observed that <span class="pullquote">sometimes there is no explaining why some things take longer than others even when they appear similar.</span> We've all had that bug that crops up in the middle of something routine that sends us down a rabbit hole and expends valuable time.

In software engineering, we often come across all three scenarios and think we can get a feel for how long things can take. However, don't get too comfortable with this, as focusing on the high level "it's just another blog post" can quickly make us over confident. Focus on the details, the nuances of this particular scenario, to make sure you challenge yourself to think about how long it will take.

### Past performance is not a guarantee of future success.

Finally, we see that looking back at past projects to feed your estimates can be misleading. It only takes one hugely successful project (or one truly disastrous one) to skew your numbers. The numbers alone also don't take into account the circumstances around them. Did the project take place over a holiday season? Were the team working on multiple things at once? Was the problem domain completely new to the team?

Every blog post, like every project, every feature, every block of code is different. There are similarities, and opportunities for us to learn from what we've done before, but making sure we focus on what we're doing now can we build an accurate picture of what we need to do, and create an appropriate estimate.

Of course, that leads on to the question of [whether we should even bother to estimate at all](http://neilkillick.com/2012/04/12/do-not-estimate-software-projects-at-all/), but I'll leave that for another time...
