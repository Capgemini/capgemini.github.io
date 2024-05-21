---
layout: post
title: "Cypress, isn’t that a popular holiday location?"
description: "An overview of the Cypress end-to-end testing framework, and comparison against other testing frameworks"
category: Testing 
author: paul_monk
tags: [Testing, JavaScript, Automation]
comments: true
share: true
---

## Overview
Cyprus is a nice sunny island and is the third most popular of the Mediterranean islands. However, as I can’t go to Cyprus right now due to COVID-19, I have had to settle for something that sounds similar instead, that is [Cypress](https://docs.cypress.io) 😉

![Cypress not Cyprus](/images/2020-05-09-cypress-testing-framework/cypress-not-cyprus.jpg)

Cypress is not a sunny island, but it is a relatively new end-to-end testing framework that is creating fireworks in the testing world. It has been dubbed a *[Selenium](https://www.selenium.dev) killer*, and given my experience of it I must agree with that statement. I’m sure most people have experienced flaky and unreliable UI tests, and if you haven’t then you have been very lucky! Cypress goes a long way towards solving the issues Selenium and other testing frameworks have.

Do you want easy-to-write, reliable and fast automated tests? If the answer is yes then Cypress is the tool for you!
 
## How it Works
Selenium is a well known testing tool that has typically been the go-to for automated UI testing. It interacts with the browser using a web driver which allows Selenium to interact with the browser like it was a user. See the diagram below:

![Selenium Architecture](/images/2020-05-09-cypress-testing-framework/selenium-architecture.jpg)

This architecture allows Selenium to easily support multiple browsers, but it also creates a large amount of complexity. Due to the unpredictability of how browsers load a webpage Selenium tests end up being very unreliable. To counteract this, you have to add in the dreaded `wait`, to pause the test until you can be sure the browser has loaded all the webpage elements you need, eventually these waits end up everywhere! This leads to tests that are slow and unreliable.

Cypress in comparison has none of the above complexity. Many other frameworks just use Selenium underneath, but Cypress has been written from scratch. All the tests are written in JavaScript, and these run directly in the browser, so say goodbye to the web drivers. As such Cypress can see exactly what is happening in the Browser, so it is more successful in knowing when a webpage has loaded. Additionally, this also makes it much faster. Cypress tests happen in a blur of activity, as it can interact with elements as soon as they have loaded. Cypress doesn’t have any of the restrictions that the Selenium architecture entails. Behind the scenes Cypress is designed like this:

![Cypress Architecture](/images/2020-05-09-cypress-testing-framework/cypress-architecture.jpg)
 
There are lot more features over just reliable tests as well. It has a great UI for developing and running the tests, as well as a headless mode for use with continuous integration tools. By default it takes screenshots and videos of all your tests, so you can easily debug any issues. There are hundreds of plugins offering additional functionality, including support for REST/API integration testing and Cucumber/Gherkin integration. Cypress even bypasses CORS for you! All of this turns Cypress into a full end-to-end testing framework, not just a UI testing tool.

## How it Compares
We spent a day trying out various testing frameworks when looking for an alternative to our unreliable Selenium tests. This involved writing 5 tests for *happy path* cases of a basic search page (much like Google). See our results below:

### 1st: [Cypress](https://docs.cypress.io)
**Languages supported**: JavaScript  
**Ease of setup**: 10/10  
**Development speed**: 9/10  
**Test execution time**: 10s (7 tests)  
**Cucumber/Gherkin Support**: Yes  
#### Overall assessment: 
Cypress is extremely easy to setup and use. The team developing the tests wrote an additional 2 tests, and still finished about an hour before everyone else. The tests were easy to read, fast to run, and reliable.

### 2nd: [Robot](https://robotframework.org) (uses Selenium)
**Languages supported**: Has a bespoke keyword test syntax, with additional libraries written in Python or Java  
**Ease of setup**: 5/10  
**Development speed**: 7/10  
**Test execution time**: 60s  
**Cucumber/Gherkin Support**: No (own test syntax)  
#### Overall assessment: 
Robot was a little difficult to setup due to the custom syntax and the team having issues configuring the settings correctly. Once up and running however the tests were fast to write, and when used in the correct way the syntax is very effective. Due to the slow setup this team only just finished their 5 tests in time, and the tests were slow to run.

### 3rd: [Karate](https://github.com/intuit/karate)
**Languages supported**: Has its own cucumber like test syntax, with Libraries written in Java, and support for executing JavaScript functions  
**Ease of setup**: 8/10  
**Development speed**: 6/10  
**Test execution time**: 55s  
**Cucumber/Gherkin Support**: No (own test syntax)  
#### Overall assessment: 
Karate is a good framework, and the only other framework we tested that is written from scratch like Cypress. The setup was quick, with this team finishing the writing of their tests only a little after the Cypress team. The syntax took a little bit of time to learn and the tests ended up looking a little complex. Our assessment is that a tester without programming experience would struggle to write tests. The tests were also fairly slow to run. 

### 4th: [Selenium](https://www.selenium.dev) (in Java)
**Languages supported**: Java, Python, Ruby, C#, JavaScript, Perl, PHP  
**Ease of setup**: 7/10  
**Development speed**: 5/10  
**Test execution time**: 60s  
**Cucumber/Gherkin Support**: Yes  
#### Overall assessment: 
Selenium has been the go-to testing framework for years and it is very comprehensive. There is lots of documentation which made the setup fairly smooth. However the tests are fairly verbose and it is fiddly to get the timings correct. Overall selenium did not fair well in our tests against the other frameworks.

### 5th: [Waitr](http://watir.com) (built on Selenium)
**Languages supported**: Ruby (also a Python version)  
**Ease of setup**: 2/10  
**Development speed**: 5/10  
**Test execution time**: 20s (only 2 tests)  
**Cucumber/Gherkin Support**: Yes  
#### Overall assessment: 
Despite having Ruby experience, when starting from scratch the framework was difficult to install and setup, hence this team only managed to write 2 tests. The tests written were quite clean and ran reliably, however the complexity of the setup discounted this framework for us.

## Cypress Cons
While Cypress faired well against the other frameworks, there are a few disadvantages that should be considered for a fair comparison:
*	Tests must be written in JavaScript, no other languages are supported
*	Lack of browser support, it only supports Chromium browsers and has beta support for Firefox
*	Framework is still fairly new, meaning plugins for integration with CI tools can be limited

However overall for me the benefits have outweighed the minor disadvantages. The biggest selling point of Cypress is the reliability, it is so nice to write a test framework where you can see the green tick on your CI builds over and over again! 

## Working Example
Being a NodeJS library Cypress is super easy to get started with. The JavaScript syntax is based off [Mocha](https://mochajs.org) so it is easy to read and already familiar to a lot of developers.

#### 1.	Install with npm
```javascript 
npm install cypress --save-dev
```

#### 2.	Launch the test runner
```shell 
$(npm bin)/cypress open
```

#### 3.	Add a test
Launching the test runner has conveniently created the directory structure Cypress needs, so just add a `test.spec.js` file under the cypress/integration folder. Cypress will immediately display it in the list of integration tests.

#### 4.	Write your first test
In your `test.spec.js` file enter the following:

```javascript 
describe('My First Test', () => {
  it('Runs a Google search', () => {
    cy.visit('https://google.com');
    cy.get('input[name=q]').type('cypress').type('{enter}');
    cy.contains('cypress.io');  
  });
});
```

The above should be fairly self-explanatory due to Cypress’s simple syntax. However to summarise the above runs a google search for *Cypress* and verifies *cypress.io* appears in the search results.

#### 5.	Run the test
Click on the `test.spec.js` test at the bottom of your Cypress dashboard to run the test. This should something like the screenshot below, which a nice green bar on the left showing the test passed! 

![Cypress Google Test Screenshot](/images/2020-05-09-cypress-testing-framework/cypress-google-test-screenshot.jpg)

You can click on each step that ran to see a screenshot of each step. Additionally, you can re-run the test by pressing the reload button, see if you can beat my fastest run of 2.22 seconds (as shown in the screenshot) 😉

### Conclusion
The example shows how simple it is to get up and running with Cypress, so hopefully you are now ready to try out Cypress yourself, and finally write some reliable end-to-end tests! There are many other example tests included with the default Cypress installation, as well as lots of online resources. For further reading see [the various guides on the Cypress website](https://docs.cypress.io/guides/overview/why-cypress.html).
