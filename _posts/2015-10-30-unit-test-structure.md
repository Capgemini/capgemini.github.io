---
layout: post
published: true
title: Stylish Unit Tests
mathjax: false
featured: false
comments: true
category: Development
tags: [Development,Programming,Testing]
author: john_nash
share: true
---

Back in March I went to [DEVWEEK 2015](http://devweek.com/ "DEVWEEK")  and listened to a talk by [Kevlin Henney](http://kevlin.tel/ "Kevlin Henney") called [Programming with GUTs](http://devweek.com/agenda#programming-with-guts "Programming with GUTs"). (You can watch the video behind the link. It's a good talk.)

Since then I've been trying to write my unit tests in a different style.

I'm not talking about **[TDD](https://en.wikipedia.org/wiki/Test-driven_development "Test Driven Development")** here (although that's good too and if you're not doing TDD, you should try it). This is a naming and structural style that I think has brought my unit tests closer to a readable specification of my production code.

## Naming Test Classes##

The first thing I've changed is what I call my test classes. 

Let's say I had a class to test called **Foo**. In the past I'd create a test class called **FooTests** (or more likely I'd ask my IDE to create it for me). 

I don't think that tells the reader very much. We know the class contains tests because it's probably in a test project or folder and, just in case there was any doubt, it will also appear in our test report or the IDE's test report window.

Instead I now create a class called **AFoo** or, if the class was static or a Singleton I'd call it **TheFoo**. That tells you something about the class under test (how many instances of it are expected to exist) and it also ties nicely into the way I've changed my test methods (more on that in a below).

## Breaking the One to One Method Mapping##

The next thing I've changed is the relationship between production class methods and test methods.

In the past I'd let my IDE create a test method for each public method in my production class. That lead to a lot of repetition in my unit tests as testing one method invariably required that I call a different method to set up the test.

Imagine I'm testing a Cache class.

{% highlight java %}
class Cache {
  public void put(String key, Object value) {...}
  public boolean contains(String key) {...}
}
{% endhighlight %}

I could write a test for the `put` method. It would add a value and then check that the cache contains it.

{% highlight java %}
@Test public void putTest() {
  Cache cache = new Cache();
  cache.put("key", "value");
  Assert.assertTrue(cache.contains("key");
}
{% endhighlight %}

That works, but now when I move on to write a test for the `contains` method I realise that I've already tested that it can tell me if the cache contains a value. I did that in the test I just wrote.

I could ignore this and carry on, but if I do I'll need to write a test that puts a value into the cache so I can check that the `contains` method works. That's an exact repeat of the earlier test.

What I need to do is test the behaviours of the class and behaviours often span multiple methods. Once I accepted this, it didn't make sense to name my test methods after the production methods, so I started to name them after the behaviour.

{% highlight java %}
@Test public void cacheHoldsCachedValuesByKey() {...}
{% endhighlight %}

Combine this with the earlier change in test class naming and you get something like this.

{% highlight java %}
class ACache {
  @Test public void holdsCachedValuesByKey() {...}
}
{% endhighlight %}

I think that reads pretty nicely, not just in the source code, but even better in the test report.

![Test Report](/images/2015-09-11-stylish-unit-tests/Test_Report.png "Test Report")

As you add unit tests you build up a specification of the Production code.

(Of course this all assumes that you aren't using JUnit 3. In JUnit 3 you need to prefix your test method name with `test` otherwise it won't be run.)

## Breaking the One to One Mapping (again)##

Sometimes, as I write my tests in this new style, I find it hard to think of the correct name for a test method.
Imagine I've got a service that doesn't accept bad configurations. What I want to write is something like this.

{% highlight java %}
class AService {
  @Test public void rejectsInvalidConfigurations() {...}
}
{% endhighlight %}

But there are lots of different ways that a configuration can be invalid. If I write a test for each configuration corruption I'd end up with something like this.

{% highlight java %}
class AService {
  @Test public void rejectsConfigurationsWithoutASetting() {...}
  @Test public void rejectsConfigurationsWithBlankASetting() {...}
  @Test public void rejectsConfigurationsWithWhitespaceASetting() {...}
  @Test public void rejectsConfigurationsWithoutBSetting() {...}
  ...
}
{% endhighlight %}

That's going to swamp any other tests I write for the service, making it harder for the reader to see the service's specified functionality.

I could put all those test cases inside the single **rejectsInvalidConfigurations** method, but that would create a very large, difficult to maintain method. It would also make it less obvious which test case was broken when the test fails and it would miss the opportunity to tell the read what constitutes a valid or invalid configuration.

What if I break the one to one mapping between production class and test class? Then I'm free to write tests about concepts other than the production classes.

{% highlight java %}
class AConfigurationIsInvalid {
  @Test public void ifItHasNoASetting() {...}
  @Test public void ifItHasABlankASetting() {...}
  @Test public void ifItHasAWhitespaceASetting() {...}
  @Test public void ifItHasNoBSetting() {...}
  ...
}
{% endhighlight %}

Even though the concept of configuration validity lives in the Service class (that's where it is checked) I can name my tests as if it lived in another non-existent entity, an **invalid configuration**.

Now that I've specified what an invalid configuration is, I'm free to use my original test name that I wanted to use all along (`rejectsInvalidConfigurations`).

## Conclusion##

I've been using this test style for six months now, on both my own code and client projects and I'm pretty happy with it. I haven't come across a scenario where this approach makes the tests less readable.

More importantly, colleagues who have reviewed my code have started to adopt this style too. I find that a reassuring endorsement.

Give it a try and see if it works for you.
