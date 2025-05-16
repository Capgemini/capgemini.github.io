---
layout: post
title: "Is your company ready for AI?"
description: We discuss an AI capability matrix with a checklist of considerations before you begin to use AI in your company 
category: AI
tags: [Development, AI]
author: [sasaunde]
comments: true
share: true
---

As a consultancy, we are expected to have strong and well-formed opinions on all new technologies arriving on the market. So we often get asked, "What should I be doing with AI? Should I be using it? What should I do and what should I avoid?" And the answer is, of course, "It depends"! There are so many factors behind whether or not AI solutions are right for a business. So, a good place to start before trying to answer this question is to be goals-oriented; to know where you are, as a business, and to know where you want to go. Then you can figure out whether any form of AI can be beneficial.

To this end, we are creating a Capability Matrix to help companies check they have the necessary prerequisites in place to benefit from AI. This post will consider Generative AI in the Software Development Lifecycle; as this is my personal speciality. So, to begin, a couple of definitions:

## Generative AI
[Wikipedia](https://en.wikipedia.org/wiki/Generative_artificial_intelligence) says Generative AI is "a subset of artificial intelligence that uses generative models to produce text, images, videos, or other forms of data. These models learn the underlying patterns and structures of their training data and use them to produce new data based on the input, which often comes in the form of natural language prompts." Digging into this a bit deeper, "new data" is slightly misleading; in reality the model will return a sort of "word salad" (or picture salad) of data it has seen before, mixed up according to a probability algorithm that will judge whether this is a highly likely answer its data might provide to this prompt. The more you know about how Gen-AI works, the more impressive it is that it ever comes up with anything useful! But, come up with useful things it does. Sometimes.

## The Software Development Lifecycle
This means the end-to-end process of creating software, from identifying where technology could assist or improve a process, to designing an application to fulfil this business need, to building and testing that application, to deploying, monitoring and supporting the application. Since the adoption of [Agile](https://en.wikipedia.org/wiki/Agile_software_development) and [DevOps](https://en.wikipedia.org/wiki/DevOps) processes, this is an iterative and automated process that is becoming better understood the more software we build.

## Where to Start

As with any new or disruptive tooling, evaluation and introduction of Gen AI into the software development lifecycle must be approached in a logical and structured way, and must have provable results. We have identified five vectors to consider within an organisation when considering Gen AI tooling:

![AI Capability Matrix](/images/2025-05-16-ai-capability-matrix/matrix.jpeg)

### 1. The Metrics vector: Capture your starting point

There is a lot of sales pressure on companies to purchase tools such as Github Copilot, which integrates into a developer's IDE and gives them "useful" autocomplete suggestions for the code they are writing - these suggestions can be contextual based on the files the developer has open and the history of what the developer has been up to recently. There is also a chat window, to save the developer context-switching out to a browser or other tool if they want to search for help. Github proudly claims [55% faster task completion](https://resources.github.com/learn/pathways/copilot/essentials/measuring-the-impact-of-github-copilot/) for its users, and costs a mere $39 a month per enterprise user. Then, there is Microsoft Office 365 with Copilot, which promises to [transform the way you work](https://www.microsoft.com/en-us/microsoft-365/copilot/business#Overview) for just $30 per user per month. 

The only way to tell whether or not the tools have improved productivity, and hence to prove the return on your AI tooling investment, is to capture metrics on your current productivity by examining your current working practices. You can then run trials and proofs-of-concent with Gen AI tooling to look for changes in these metrics. There are many frameworks available to help you calculate your current performance - from good old-fashioned agile [velocity](https://www.agilealliance.org/glossary/velocity/) to the more sophisticated [DORA](https://dora.dev/guides/dora-metrics-four-keys/), [HEART](https://www.heartframework.com/) and [SPACE](https://www.infoq.com/news/2021/03/space-developer-productivity/) frameworks.

### 2. The Process vector: Identify bottlenecks and pain-points

Once you have a handle on your current productivity metrics, you can start to identify if there are areas that need improvement. Skipping this step can waste considerable time and resources - for example, if you have accelerated your automation test scripting process by using Generative AI to write tests from your JIRA tickets, but in fact there was only one automated script being written per sprint and your actual delivery bottleneck is a lack of user experience feedback to redesign your front end, you are not going to have any impact on your end-to-end software delivery time.

There are other factors in focussing on a particular stage of the software development lifecycle, for example if a step is particularly onerous then even if it isn't a time-based bottleneck you may be wasting money on high attrition rates for that role! Again, having the right metrics to understand your current process is key.


### 3. The Security vector: Consider your Data

Data sharing considerations can be a major blocker when choosing Gen AI tooling. It is certainly easier, quicker, and probably cheaper, to access pre-trained large language models ([LLM](https://en.wikipedia.org/wiki/Large_language_model)s) as a service via cloud vendors such as Microsoft, OpenAI, AWS, but even if you do not share contextual files and data with the service, you will still need to send your search queries and if you are required to completely abstract the query to avoid sharing sensitive data, the efficacy of the Gen AI tooling will be significantly reduced.

It is also possible to host your own LLM and avoid internet access entirely. It is not, however, straightforward to [connect tools such as Github Copilot to your own LLM](https://gist.github.com/Birch-san/666a60eacbd9095902f99874622767be) so you may be restricted in how effectively you can use such tools if you host your own LLM.

Some industries may be limited by legal frameworks as to whether they can send their data over the internet to a cloud-hosted model, and some business leaders may be nervous about the implications of sharing data.


### 4. The Cultural vector: Train your Employee Base

Even Generative AI toolsets need to have user uptake in order to be effective. Just installing the tools alone is not sufficient, users must be trained not only in HOW to use the tools, but also WHEN to use them (and when not to use them - for example, yes Github Copilot is quite good at writing unit tests to increase coverage of existing code bases, but you should not drop [TDD](https://en.wikipedia.org/wiki/Test-driven_development) as a practice because of this). Collecting and sharing best practice are key, and you also may need to encourage an "AI-First" approach to daily tasks.

If a company's employees are going to use Generative AI, it is important that they have at least a high level understanding of how it works. The MOST IMPORTANT lesson is that answers returned from Generative AI cannot be considered "correct", and so if correctness is required the AI output MUST be thoroughly evaluated. Most mainstream AI tools do present a warning upfront that responses must be analysed, and if employees understand a bit more about the word-salad aspect they will have a better understanding of why the warning is there. 

There are ethical issues that people will want to discuss and evaluate - is the purpose of this AI tooling to replace enjoyable human roles? Usually the answer to this is "no", but it is certainly something a company will want to be open about and provide training/coaching/support for employees. 

There are also sustainability issues to debate - how expensive are AI calls, in monetary or carbon terms? This is a complex question to answer - for a start it depends on whether you host your tooling or if it's cloud-hosted/shared; it depends on whether you have a bespoke trained model (training is compute-intensive and _very_ expensive) or if you are using a pre-trained model. Companies should have an idea of this and should, again, make the information transparent to employees.

### 5. The Tools vector: Evaluation techniques

This vector isn't specific to Gen AI for software engineering - for many processes there are competing software tools on the marketplace, and businesses need a strategy by which to identify the best one. The information to help evaluate available tools will come out of the other vectors mentioned here - cost and data considerations; and which process the tool needs to support. 

Capgemini have significant expertise in the software selection process, [across multiple industries](https://www.capgemini.com/gb-en/wp-content/uploads/sites/28/2022/12/software_selection_for_automotive_suppliers.pdf), using a step-by-step evaluation process from identifying candidate solutions to finalising vendor negotiations. [Contact us](https://www.capgemini.com/gb-en/contact-us/) to find out more.
