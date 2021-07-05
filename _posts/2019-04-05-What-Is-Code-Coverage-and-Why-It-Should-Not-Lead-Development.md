---
layout: post
title: What is Code Coverage and Why It Should Not Lead Development
subtitle: A proposal to why code coverage should not lead development
description: This article describes the downsides to using code coverage as a metric of code quality and offers a solution to better measure it.
category: Testing
tags: [Testing,Development]
author: [cburns]
comments: true
share: true
---

Within the world of software development and delivery there are not only thousands of tools, frameworks and principles, but there are also many terms that have no concrete definition that tend to fluctuate depending on who you're talking to. In my experience, it's critical that everyone is on the same page when it comes to definitions – whether they agree or not. One of the hardest challenges about solving a problem or trying to implement a solution is the initial discussion of how it will be done, and this can be made even harder if the definitions of the terms being discussed are understood differently by everyone involved. For easier reading of this article, I will outline concrete definitions of included terms - it does not matter if you agree or disagree with these definitions, the key factor is that you understand the principles this article outlines. 

## What is code coverage?
Code coverage is essentially what it sounds like - the amount of code that is covered in execution by a single test or collection of tests. As the word “tests” is an umbrella term for so many different types, for this article when the word “test” is used, it will refer specifically to [unit tests](http://softwaretestingfundamentals.com/unit-testing/). This is because with unit tests you get quick feedback and it is very easy to identify what lines of code are covered, but when you start venturing further up the [testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) you will find it not only harder to see the lines covered but your feedback isn’t as fast. Having said that, the overarching principle that this article puts forward can also be somewhat applied to the different kinds of tests higher up the pyramid.

## Why do we measure code coverage?
So, why do people care about code coverage? In a nutshell, because they feel it offers an assurance on the reliability of the code. In other words, if you know a line of code has been covered by a test, you may feel that you can safely assume that the code isn’t doing something quite naughty like logging request details and sending them to a private server somewhere in Switzerland. Although you would think and hope someone would spot that during a review, you would even more so hope that a test has been written to verify that behaviour is not expected or wanted. I mean how many times has a developer said *"Ahhh I didn’t even see that, oops"*. Even in a scenario like logging request details and sending them to Switzerland, you wouldn’t want a mistake like that being made by a developer because when your company stock has fallen and customers are abandoning ship, the last thing you want to hear from a developer is *“oops, I must have missed my morning coffee haha”*. 

Also, slightly off topic, but this is another reason why Test Driven Development (TDD) is a popular testing approach, it makes you write the tests first as it follows a kind of *“I expect it to do this, so let’s write the code to make it do just that”* approach rather than a *“so the code does this, how do I write the tests to make them pass”* approach. The key thing to note is the tests and code are to be refactored and changed to evolve together rather than the old approach which is that the code cannot change, but the tests must be hacked to pass as *“the code works fine when I test it manually”*. Additionally, the expectation of what you want the code to do and what it actually does are very tightly coupled throughout its development so it removes the chances of compromising test and code quality as after all, you wouldn’t normally go back to a Product owner and say *“my code doesn’t work with your requirements, so I’ve decided to change the requirements to fit the code”*. Funny, but it’s kind of the same thing. Now that being said, code coverage is certainly something you should strive for when writing tests, because as said above you’d ideally want code verification – however, only striving for it may mean you are missing something crucial; whether the code meets the functional requirements. This can often be lost when writing tests, you get so caught up in trying to get a line covered that you forget that this line isn’t related to the scenario you are writing the test for. This is where the crucial point of this post is centred around. Code coverage does not equal test coverage. In fact, let me repeat and possibly rephrase. __HIGH CODE COVERAGE DOES NOT EQUAL HIGH TEST COVERAGE__ .

## Code Coverage vs Test Coverage
As said in the abstract, there are normally many definitions and understandings people have relating to terms within the industry. So, in efforts to get everyone on the same page, lets ditch all what we know and say the following. Test coverage and code coverage are not the same.
Test coverage can be measured by the following:
-	Mapping requirements to actual test cases
-	The status of the test cases
-	Code coverage (Includes code that directly or indirectly implements a requirement)

As you see test coverage and code coverage aren’t competing things and are often confused but it isn’t an either-or question, in fact they aren’t even synonymous. Code coverage exists under the test coverage umbrella. For an effective testing strategy, you need to primarily strive for test coverage which will include code coverage as one of its components. If you aim for a more complete test coverage, naturally, the code coverage will follow suit. However, according to the requirements. It’s a good rule of thumb to write tests that not only cover the code, but verifies them against the expected and wanted behaviour (requirements). This with the addition of testing each branch of code (branch coverage) should ensure that there is no stone left unturned in regards to the code paths. This then avoids the act of writing tests to cover code just for the sake of covering code and making the metrics look good. It is worth noting, I am not here to dictate how you structure your unit tests i.e. testing functions or features, how you arrange your unit tests is up to you. What I am suggesting is that in your tests, make sure that you are at least ticking off the other two criteria under the test coverage umbrella. This can be assured by verifying or asserting the codes behaviour against requirements and verifying that the tests pass. As a sub-comment, if you follow this approach, the assertions and verification will naturally occur as its one of the only ways you can verify that the code is doing what it is supposed to do in accordance to the requirements.

## Example time...
Let’s look at an example in somewhat pseudo code, let’s say you have a service that retrieves data from a database and depending on the content type flag, returns data in a JSON format or an xml format. Here is the code.

    public String retrieveData(String contentTypeFlag) {
        String data;
    
        if (contentTypeFlag.equals("JSON")) {
            data = getJSONnDataFromDatabase();
        } else if (contentTypeFlag.equals("xml")) {
            data = getXMLDataFromDatabase();
        }
    
        return data;
    }
    
Now the code in general seems straight forward, there is a method called `retrieveData` that depending on its passed parameter, calls two different methods called `getJSONDataFromDatabase` and `getXMLDataFromDatabase`. Now for the time being, the inner workings of those methods do not matter because we are only focused on the testing of the `retrieveData` function.

So now let’s declare two tests, `testDataIsJSON` and `testDataIsXML`:

    void testDataIsJSON() {
        String data = retrieveData("JSON");
    }
    
    void testDataIsXML() {
        String data = retrieveData("xml");
    }

Now developers worth their salt could instantly pick up the problems with these tests but let’s just all look at it through the eyes of a beginner for a moment. These tests both test the `retrieveData` function and do so to 100% coverage. Try it, run the equivalent in your favourite language and you’ll find that 100% of the `retrieveData` code is covered. Now if we were to take the mentality of *“if it's covered, we are good”*, then we could commit this and feel safe because all tests pass and all code is covered, right? Not exactly. Remember when we said the inner workings of `getJSONDataFromDatabase` and `getXMLDataFromDatabase` didn’t matter? Well, they may not matter to the developer who would write those tests, but they sure as hell matter to the person who’s got to fix the bug in the code because the tests didn’t take into consideration that those two child methods may return null. Let’s say someone was to do some code changes to one of the child methods (`getJSONDataFromDatabase` and `getXMLDataFromDatabase`) and accidentally introduced a bug that 
always made the methods return null? I mean, technically, according to the code coverage metrics, the code is covered and the tests pass, so there's no problem, right? This is exactly why I said code coverage should not lead development, because now, if someone was to introduce a null bug, the tests would still pass correctly, and coverage also wouldn’t drop, resulting in a false sense of reassurance that nothing has gone wrong. This is also an example of [assertion free testing](https://martinfowler.com/bliki/AssertionFreeTesting.html). 

Another problem with this is that these tests do not act as a regression net. As mentioned above, if someone introduced a bug that broke production code, your tests would not fail therefore giving the sense that nothing bad has happened. There is where test coverage comes in. If you look at these tests, a scenario has been covered - to some degree, but where is the verification? You have no way of knowing if the tests test whether data is returned at all, and if it is returned, is it the correct data type. A valid test would be something like *“when data from a database is requested in JSON format, validate there is a response and it is the response you expected”*. Now if we were to write valid tests with verification, we would do something like:

    void testDataIsJSON() {
        String data = retrieveData("JSON");
        assertNotNull(data);
        assertValidJSON(data);
    }

Now with that code the new assertions correctly verify the code is performing the way we want it to perform, the tests pass, and the code is covered, therefore meaning we have full test coverage (all three components of the tests coverage criteria has been met). 
So, the crucial thing learnt here is code coverage does not automatically fulfil all test coverage criteria, as we have seen, it is possible that 100% code coverage can be attained without having any verification against requirements. However, with the second test, with 100% test coverage, 100% of the code is covered too. Now that was a simple example of how code coverage can give false security. 
I know there are developers reading this thinking *“who would commit such atrocity”*, but I can say, if an application has a lot of code, when things get messy and very complex, if correct testing principles have not been applied at the start, it becomes very hard to track current test coverage and the simple example above will present itself in a more complex way and it won’t be until you stay late on a Friday night that you finally realise that the tests don’t cover any valid scenarios further resulting in a decline in confidence in your testing suite. I have also seen in the past a test class that was hundreds of lines long, that had tests that were describing what they were testing – and not only were they not fully testing what they were saying, but they were actually testing other bits of functionality that other tests said they were testing, so it became some sort of a spaghetti codified test class that covered a high 90s percent of the class under test but had a very low number of real scenarios covered with verification. Scary stuff.

### Closing comments
Please don’t walk away from this article thinking that I am trying to dictate to you about how you should write good unit tests, the overarching principle I am trying to convey here is to simply approach testing slightly differently. This can be achieved by trying to avoid aiming solely for high code coverage metrics and instead trying to aim more for high test coverage metrics by covering all 3 of its components. The examples I have laid out in this post are very simple scenarios where code coverage can be misleading whilst in parallel test nothing. For a more detailed breakdown of how code coverage metrics can be misused, please read [Brian Marick's paper on this exact topic](http://www.exampler.com/testing-com/writings/coverage.pdf). My additional advice would be that, in future, if you ask someone if they have written the unit tests (assuming TDD wasn’t followed) and they reply with *“Yep, all tests have been written and 100% of the code is covered”* reply with *“is the test coverage 100%?”* if they look back at you with a confused face, this may reveal a bigger problem that needs to be addressed because the real kicker is that if you haven’t got 100% code coverage, you can live with that because more often than not it is just the somewhat harmless conditional statements that prevent 100% code coverage – some would even argue that aiming for 100% may indicate that someone is writing the tests to make the numbers look good and not actually thinking what they are doing. However, if you have even missed or not properly ticked off one of the three critical components of the test coverage criteria listed above, you are committing code that:
-	Is not tested and verified against the requirements
-	Isn’t successfully passing the tests
-	Hasn’t been covered by any tests

I hope that this article has presented a hard and solid proposition as to why code coverage 
shouldn’t lead development and instead has presented a safer and more reassuring approach on how you can use the test coverage metric to help verify your solutions implementation.
Any questions or queries please feel free to contact me on any of the socials.
