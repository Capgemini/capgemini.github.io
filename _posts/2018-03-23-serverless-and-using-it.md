---
layout: post
title: "Serverless, and the challenges using it"
subtitle: "Developing a serverless application in Azure with Functions"
description: "The benefits and challenges of adopting a serverless architecture in the software development life cycle"
category: .NET
author: jatwal
tags: [Azure, Serverless, Azure Functions]
comments: true
share: true
---

Recently I have been taking a look at serverless computing, trying to go beyond the headlines of why serverless is a good thing. Those headlines are something like "create your first serverless application in minutes". While this isn't untrue, there is more to consider when using a serverless architecture. For one, there is a server somewhere. It's just that you don't have to worry about it. All you worry about is your code, and your credit card. Your software is out there and it will scale as long as you can pay for it.

It's worth noting that when you "go" serverless it's a very different way to develop applications. This type of approach is very tightly coupled to the cloud. While this might seem like an obvious statement, there are some implications. This post isn't about describing what serverless is. Instead, here I am noting down some of my initial observations of using serverless and what some of those implications are. The serverless application that I refer to throughout this post was developed as an [Azure Function](https://azure.microsoft.com/en-gb/services/functions/), but [AWS Lambda](https://aws.amazon.com/lambda/) is another option.

## It's about more than just development

So one benefit of serverless is the time taken to code up and make your software available. And it really does take minutes. A bit of code, a couple of clicks and your software is up and available on the internet. At this point you are being charged on a consumption model, so you only get billed for the compute you consume. Also, because it's so quick to create, if it doesn't work as you expect (for whatever reason) it's easy to re-create.

But for me it's about more than just the development. It's setting up a automated, repeatable process that gives me assurance what I have done is correct and the ability to push changes across development, testing and production environments. So while I agree the coding is easy, I found the testing and some of the deployment to be a little tricky (more on this to follow). And while it took me a half hour to create the Function itself, it took me a week to look at options and come up with a solution that met my testing and deployment requirements. To make matters worse sometimes there is very little documentation to support what you are trying to achieve. Or the documentation is out of date because it's a bit of a moving target.

The point is this - some of these things are very new. And that means you may need an innovative approach to achieve what you need. In the end that may cost you time.

## Unit testing is difficult

Let's put this into context. My Function App has two RESTful routes, and dependencies in the form of a NoSQL data store and a Queue. The Queue is used when calling one of those routes, so a message is published for some long background processing to happen without blocking the original call. [The code was taken from another post on Azure Storage for Serverless](https://blogs.msdn.microsoft.com/webdev/2018/01/25/azure-storage-for-serverless-net-apps-in-minutes/). What's very nice is that the Azure Function does the hard work for me so that the interface into the storage and queue are passed in as input parameters to my method:

```C#
        [FunctionName(name: "Go")]
        public static async Task<HttpResponseMessage> Go(
            [HttpTrigger]HttpRequestMessage req,
            [Table("urls")]CloudTable inputTable,
            string shortUrl,
            [Queue(queueName: "counts")]IAsyncCollector<string> queue,
            TraceWriter log)
        {
        }
```

Here I am getting `Table` and `Queue` without doing anything. But when it comes to testing, some of these interface are not easy to mock (`Table`), and others can't be mocked at all (`Queue`). In other words, I am in the Cloud, I have dependencies in the Cloud, some I can mock and some I can't. But I still need the rigor that I would normally put around the software that I develop. This becomes even more important if you need to change or even re-create your microservice and then test it with a known baseline to ensure functionality doesn't regress.

For me, I was really limited as to what I could do for the unit testing and while I did do a little, I got much better code coverage with my functional testing. This might not always be the case. You may have a simple serverless function and it might be quite easy to unit test it (is it just a `static` method). But I feel my example plays out a realistic scenario and it took a bit of thinking to come to a solution that worked for me.

## Functional testing is much better

So, how does functional testing work with Serverless? [There is some documentation as to how a function can be tested](https://docs.microsoft.com/en-us/azure/azure-functions/functions-test-a-function). But when it comes to how you can do this in an automated way, there doesn't seem to be much in the form of guidance. So I set myself the following goals; I wanted to have a automated Dev Ops process to deliver my software and I wanted to have a continuous integration and continuous deployment process where functional tests could serve as a gate prior to promoting to other environments. I came up with:

![serverless functional testing](/images/2018-02-21-serverless-and-using-it/serverless.png){: .centered.medium-8 }

This is a different model to conventional software testing because in that world everything probably exists on the build server. But here, I am putting my software out into a representative environment and then seeing how it behaves. In fact as a developer this proves to be quite useful because my feedback cycles are much tighter. I can identify and fix quicker than having to wait for a tester to feedback.

There is also the argument that if you can achieve good test coverage in a representative runtime environment with representative data, then why mock and unit test at all? The lesson learnt is that although I know that unit testing can be used for functionality in isolation, functional testing seems more natural and a much better fit for serverless.

## DevOps works well

Serverless and DevOps are made for each other. Lets take a look at how the serverless function is deployed. Note that this was achieved using [Visual Studio Team Services Release Management](https://www.visualstudio.com/team-services/), but I have also heard that [Octopus deploy](https://octopus.com/) is very good although I haven't used it personally.

![deploying the function to a resource group](/images/2018-02-21-serverless-and-using-it/deployment.png){: .centered.medium-8 }

So the process removes what was there before (which is optional), creates a clean environment and then deploys the software to it. I have four environments; 

![environments](/images/2018-02-21-serverless-and-using-it/env.png){: .centered.medium-8 }

To expand on development:

![what happens in development](/images/2018-02-21-serverless-and-using-it/dev.png){: .centered }

As well as deleting what was there prior to deployment, I as the developer take responsibility for the automated functional tests as part of the release. I like the way I can recreate from scratch and test in a clean environment. If it succeeds then the release system will automatically move forward and deploy to test. I don't remove the test environment because testers may need to go in and inspect what is there.

How long does the development release take? In total ~ 4 minutes. That's not that bad (even though I do try and aim for between 2-3 minutes). Most of the time is taken deleting the environment (~ 1 minute 30 seconds) and creating the environment (~ 1 minute 20 seconds). The deployment and testing takes ~ 1 minute (which is about right for my test environment where things are not recreated). This is a relative measure, as the components and complexity of your environment increase, so will your CI/CD time. But then this is an argument to not bundle too much in and keep resource groups simple (a benefit of the microservice).

## Expect things to go wrong if this is working in the cloud

One of the most frustrating things about this process is that intermittently the CI/CD process fails, for no reason other than it being in the cloud. Or, it takes a long time to complete (for example, a recent development release took ~ 14 minutes). It seems that these issues are mostly around the deletion and creation of the resource groups. But I like a consistent CI/CD process because I know that if it fails, it's because of my code. Yes, over time I have learnt to identify what is the build and deployment system and what is me, but it still means I have to kick off another build. Again this all adds up in the form of time taken on failed builds. Also factor in collaborative working, where another developer comes to check in code and finds the build is broken, they spend some time investigating what could be wrong, kicks off another build and it just works! 

[Its worth pointing out that Frameworks like Serverless provide an additional layer of abstraction for managing serverless applications](https://serverless.com/learn/). I haven't used it myself but it could be worth investigating if this type of framework could be used to help out with deployment.

## Summary

Serverless has some great benefits, one of which is that it accelerates application development. Functional testing is well suited to this architecture and the Dev Ops process works well. Your CI/CD system can create whole environments to meet your requirements. It's worth going beyond just the application development effort for different types of serverless applications and cloud providers to consider things like how will you test the application, or what you will need to deploy.

The [source code](https://github.com/jsacapdev/serverless-n-storage) associated with this is available including the [ARM template](https://github.com/jsacapdev/serverless-n-storage/blob/master/src/AzureResourceGroup/Templates/ShortLink.json) that is used to create the release environment. If you have any questions around the Visual Studio Team Services build process raise it here or create issue in the repository and I will be happy to help.
