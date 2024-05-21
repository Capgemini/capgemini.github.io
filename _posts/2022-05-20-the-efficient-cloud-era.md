---
layout: post
title: "The Efficient Cloud Era"
subtitle: "The latest developments in Java and Cloud Hosting are allowing tech teams to make an impact on sustainability"
category: Development
tags: [Cloud, Java, Sustainability]
author: [sasaunde]
comments: true
share: true
---

The main theme at [Devoxx UK](https://devoxx.co.uk) this year was all about getting Java to be fast and lean in the cloud.

From improving startup time to allow serverless Java apps, to enabling scale-to-zero, to ensuring your application is running efficiently, many of the talks at the Devoxx UK 2022 conference were really focussing on a net outcome of reducing cost, which in turn will reduce power requirements for IT estates and aid sustainability.

## Back to the Buzz
After a nervous 2-day hybrid conference last year, Devoxx was back to its buzzing self this year with speakers delighted to be back in front of audiences and the sponsors' booths once again bursting with free gifts and chat. Capgemini were gold sponsors this year, with engineers [Kevin Rudland](https://capgemini.github.io/authors/#author-kevin-rudland) and [Chris Burns](https://capgemini.github.io/authors/#author-chris-burns) giving their talk "How to get Hacker Kids to Max Out your AWS account in 10 hours, and other reasons to focus on your Secure Software Supply Chain" (more on that later).

![Capgemini's stall at Devoxx 2022](/images/2022-05-17-the-efficient-cloud-era/stand.jpg)

Our T shirt and mug freebies flew off the shelf, and our vegan, palm-oil free pick 'n' mix was popular in the post-lunch lull. Fantastic Capgemini AIE artist [Jack Ambrose](https://uk.linkedin.com/in/jack-ambrose) was once again on hand to help people visualise "Getting the future they want".
![Jack Ambrose art](/images/2022-05-17-the-efficient-cloud-era/art.jpg)

## Efficiency at the Fore
There isn't time to go to all the talks at Devoxx so this article is skewed by my choices, however there were many talks around similar themes: improving the efficiency and speed of Java applications, deploying to the cloud with Kubernetes and Knative being prevalent. I've listed here some strong themes and great facts from the talks that I attended over the three days.

### Kubernetes by Default
Everyone but everyone was talking about deploying with [Kubernetes](https://kubernetes.io/). This may have been directly or using [KNative](https://knative.dev/). I attended "[Fantastic Java apps and how to kubefy them with Dekorate](https://www.youtube.com/watch?v=1_sJVbabBgk)", a live coding demo showing how the Dekorate annotations could be used to generate your Kubernetes manifest files, allowing Java devs to reduce the number of languages and syntaxes they need to get their heads around to create a Kubernetes runtime. Our Capgemini talk also suggests Kubernetes-as-a-service as the best abstraction layer between your own deployment artifacts (ie containers) and your cloud provider platform. There were talks specifically focussing on improving the sustainability of Kubernetes clusters using schedulers - for example "[Sustainability in software engineering - today and tomorrow](https://www.youtube.com/watch?v=MzaMBfYbvss)". In this talk, speaker Martin Lippert refers to a [2019 report](https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf) suggesting a quarter of data centre servers are "zombie servers" - running and using electricity but hosting no active applications. Unfortunately it seems the same applies to virtual mchines; suggesting that if we really want to reduce our power footprint for our estates, we NEED an auto-scaling platform such as Kubernetes, and we probably need a hyperscaler capable of managing the underlying machines when not in use.

### Speed up your Start Time

There has been a real buzz around [GraalVM](https://www.graalvm.org) in recent years at Devoxx and the wider Java industry, looking at how it can improve the startup time of your Java application. This year the speakers drilled even deeper into how to speed up an app's start time, without losing its efficiency. My favourite talk in this area, the catchily-named "[Java on CRaC](https://www.youtube.com/watch?v=0evEs_3yaEI)" (CRaC = Co-Ordinated Restore at Checkpoint, I rather suspect the initials were chosen first...) looked into how we could start applications with the speed of a native image without losing the efficiency savings which come from running the Just-in-Time (JIT) compiler. In summary, Java bytecode runs on a JVM - Java virtual machine - which, at startup of the application, compiles frequently-executed code to native machine code. This takes a while, and to speed things up it's possible with GraalVM to use Ahead-of-Time (AOT) compilation and run this slow process of creating a native image BEFORE the application starts. A great use-case for this is serverless functions - to be as efficient as possible with our compute time, we'd like a serverless function to scale down to zero instances in production until it's called, then spin up in a timely manner and execute our call when we want it. 
There is, of course, a downside to AOT. Creating your native image before startup means the application can't be as effectively profiled to identify "hot-spots" so overall performance is typically lower. According to the talk, applications started from an AOT image are about 0.6 times the speed of a JIT-compiled application; although you can raise this to about 0.8 times the speed with some extra performance evaluation during compilation.

The answer suggested by this talk was to start an application with the JIT compiler, but then "freeze" it once it was running and save that frozen state. Future starts of the application could use the frozen state kind of like an AOT image, meaning you get all the benefits of JIT compliation and also instant start-up. The statistics shown in the talk were impressive to say the least. Java apps on CRaC start up 2 orders of magnitude faster.
![CRaC 2 orders of magnitude faster to start](/images/2022-05-17-the-efficient-cloud-era/slide.jpg)

### Shrinking your Apps

[Quarkus](https://quarkus.io/) was even more omnipresent at Devoxx - with the "Quarkus World Tour" on the RedHat stand and numerous talks - including "Integrating systems in the age of Quarkus, serverless and Kafka", "Migrating a Spring Boot app to Quarkus, challenge accepted". The message is clear, the modern focus is on improving the speed and footprint of your application; being in the cloud is a given, the next stage is being the best cloud app that you can.
There is a warning though about blindly focussing on your applications. I attended a [very interesting talk](https://www.youtube.com/watch?v=q4Fd3_u_kXw) on how to tune your Java virtual machine (JVM) to better support a container runtime - have you ever thought about how Kubernetes allocates CPUs to the container where your JVM is running? Kubernetes allocates a time slice of a physical CPU to the container, and the JVM translates these "minicores" into processes. Assumptions about the best garbage collection model to use (serial or parallel? C1 or C2?) are made by the JVM based on its perception of how many CPUs it has available - and when this is abstracted by a container and Kubernetes, the JVM often gets this wrong. The consequences of this are, for example, serial garbage collection freezing your entire application instead of utilising the multiple processors you may be paying for. For more information on JVM tuning for Kubernetes, the speaker recommended checking out [Monika Beckwith's tuning video on InfoQ](https://www.infoq.com/interviews/beckwith-garbage-collection/). You can also use the [Java Flight Recorder](https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm#JFRUH170) to better understand what your JVM is doing.

### Minimising your Estate

Another angle to cloud efficiency that came through strongly at Devoxx was the serverless model; the ability to scale applications to zero when not in use. And this doesn't just include business applications - support applications were also considered. In his  talk on [Java observability](https://www.youtube.com/watch?v=SYO-LmA647E), RedHat's [Ben Evans](https://developers.redhat.com/author/ben-evans) talked about how some companies could have, for example, 200 servers just for analysing log data! Think about it - you need storage active all the time to capture your log data, sure, (and of course not on the machines that generate the log messages - hard to investigate an outage if your logs were on the machine that went down!) and you need listeners ready to send monitoring/alerting messages, but for complex log analysis you should be able to just spin up the data-reading machines when you need them.
Many of the talk demos used KNative to demonstrate apps scaling up/down from zero instances based on load. Our Capgemini talk discusses our CREATE accelerator which spins up the whole development environment - pipelines and all - on checkin of a change. Think about it - do you have Jenkins/Concourse build servers sitting there and eating expensive CPU time when they're not being used? Not necessary!

### More than just a nod to security

As expected, especially with [Snyk](https://snyk.io) as platinum sponsors, there were several talks focussing on application security. I went to one detailing some interesting but unlikely ways that, given an unfortunate series of events, deserialization of Java objects or even of JSON could lead to injection attacks allowing hackers to launch applications on your machine. 
[Our own talk](https://www.youtube.com/watch?v=qJfDh00c6fs) focussed on ensuring a secure software supply chain. It's worthy of a blog in itself, and indeed the talk could have been several talks. 

To summarise: 

-  Ensure minimum permissions for every communication 
-  Ensure the provenance of your artifacts, 
-  Aim for zero-trust but be aware it's idealistic and you may not be able to achieve it, 
-  Be aware that the biggest security threat to your system is YOU!

Capgemini Software Engineering have done it all for you with our cloud accelerator, a series of open-source products tied into an architecture which will spin you up an entire cloud-based secure software supply chain for your development needs - and allow you to tear it all down whenever it's not in use. [Get in touch with us](mailto:sarah.saunders@capgemini.com) for more information!

### And, just... Better Apps!

Another talk I really enjoyed was [Functional Programming in Kotlin - exploring Arrow](https://www.youtube.com/watch?v=eFheAErqJzA). I'd seen a little of Kotlin before but this talk came in from the angle of problem-solving: Have you been bitten before by support issues involving NullPointerExceptions or ArrayIndexOutOfBoundExceptions? Of course you have! Speaker Ties van de Ven had, too. It was in search of a solution to this pain that he discovered Kotlin's Arrow library and how it can find these exceptions - at compile time! Yes, really. Using monads (Quote: "If you know what a monad is, you can't describe it"...) to define a return type that is EITHER an exception OR the value you were looking for as a starting point, you are then forced to deal with the two circumstances. Or you can go a step further and use [Arrow Analysis](https://arrow-kt.io/docs/analysis/) library to run pre/post condition checks at compile time. 

So, if you built precondition checks that n>0 into your divide(n) function, this code will compile:
```java 
if(a>0) {
 divide(a);
}
```
But, this code won't:
```java 
divide(a);
```
Wow! And there was me thinking Kotlin was all syntactic sugar and writing less code. I'm a convert.

