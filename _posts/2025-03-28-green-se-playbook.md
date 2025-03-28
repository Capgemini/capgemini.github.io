---
layout: post
title: "A Green Software Engineering Playbook"
subtitle: "A set of rules to ensure your applicaton build process is as sustainable as possible"
summary: "Some actionable steps to improve your SDLC efficiency"
category: Sustainability
tags: [Development, Engineering, Infrastructure]
author: [sasaunde]
comments: true
share: true
---
Defra is a long-standing client for Capgemini, with both organisations sharing a [commitment to sustainability](https://www.capgemini.com/about-us/csr/environmental-sustainability/). Recently we have been focussing on whether we can introduce "Green coding standards" to our teams. Whilst there can be benefits from developers focussing on making each line of code [“greener”](https://greensoftware.foundation/articles/10-recommendations-for-green-software-development), much greater wins can be achieved from using best practices to minimise the infrastructure and resources used in the software development lifecycle. Listed below are the best practices that our teams follow at Defra to help make the application estate as sustainable as possible.

## Prerequisites
Here we list a few common software engineering best practices that are essential to have in place before following this playbook.

1.	Automate all infrastructure configuration. Having infrastructure defined as code, so that it can be created and recreated repeatedly, not only benefits application stability but allows unused infrastructure to be torn down with confidence that it can be restored.
2.	Build in observability across the lifecycle. There are certain “red flags” that you can mark as risk factors to always watch out for, such as:
 - Test environment infrastructure costs are higher than production
 - Builds are taking longer than an hour
If you can set up monitors / alerts for these flags, it gives you a good head start in addressing them when they occur.
3.	Prefer cloud deployments. If you can delegate hardware efficiencies to your cloud provider, they are most likely the specialist in using their infrastructure to maximum efficiency. This need not imply cloud vendor tie-in; we can abstract to layers such as Kubernetes-as-a-service and move, or even balance, applications between clouds without too much difficulty.

## Software Architecture Best Practices
Thinking sustainable begins at application inception, and it is also at inception that the biggest efficiencies can be realised.

1.	Don’t solve problems that aren’t there. If there isn’t a performance issue, don’t architect as if there is one! You may not need that cache/queue/resilience level in the infrastructure. 
2.	In the cloud, prefer [function-as-a-service](https://en.wikipedia.org/wiki/Function_as_a_service), then a [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service) that can [scale-to-zero](https://www.fermyon.com/blog/scale-to-zero-problem), then [VMs](https://en.wikipedia.org/wiki/Virtual_machine). There are often good reasons not to use function-as-a-service, but even so you should be looking for the possibility to scale right down to zero for your hosted applications rather than having a constantly-running virtual machine (that you are constantly paying for).
3.	Avoid data duplication. Having a single store of data and making it readily accessible can be more sustainable than having multiple copies and having to keep them in sync. 
4.	Minimise message traffic. Passing excessive data over interfaces can also reduce sustainability. Keep messages small and only pass data when necessary. 
5.	Consider message and security protocols. Some can be more energy-efficient than others, depending on handshake complexity and encryption levels – although there is often a trade-off to consider. For example, for [JSON Web Tokens](https://jwt.io/) (JWTs) the cost of creating and validating  the JWT is high as it uses complex encryption, but you only need to make one authentication call – whereas with OAuth you pass a simple token but must make regular authentication calls to validate it. Similarly, SSL uses expensive encryption but is essential for securing internet traffic so can only be safely avoided for communications within a closed network.
6.	Use stateless services. Managing state introduces complexity and cost – avoid as much as possible. Event-based models can help.
7.	Set document retention policies for all supporting documents.

## Software Development Best Practices
It is usually true that if you write quality code, you write the most sustainable code possible, because the best practices of both disciplines align. There are some development team best practices that we can highlight though:
1.	Keep It Simple. [KISS](https://en.wikipedia.org/wiki/KISS_principle) is one of the acronyms that often appear in “clean code” guidebooks, and it plays directly into sustainability. Applications can become over-complicated by trying to code for scenarios that will never exist. Keep a “MVP” mindset and write as little code as possible.
2.	Keep the team Informed. Our project recently calculated that to run a single branch build in the cloud and complete our branch integration test suite costs £40 per day. Once developers know this, they are far more likely to be conservative in the builds they run.
3.	Consider your programming language. Each language has a different energy efficiency protocol – for instance a [study showed](https://www.researchgate.net/publication/320436353_Energy_efficiency_across_programming_languages_how_do_energy_time_and_memory_relate) that a set of problems solved in JavaScript used more energy than the same problems solved with Java.
4.	Use appropriate data structures. Consider what your data is being used for and choose a data structure to match its use case.
5.	Write self-documenting code. Well-written code, stored in a repository in deltas with each commit linked (e.g. via naming convention) to an issue tracking system where requirements are captured, and BDD-style test scripts that copy the language of the requirements to prove delivery, can alleviate the need for a lot of expensive documentation.
6.	Keep tasks small. Successful backlog management and refinement leads to manageable development tasks where the developer can focus on quality code, and the code reviewers can focus on improving the sustainability of the code.

## Software Testing Best Practices
Whilst automating tests is essential to enabling frequent low-risk releases, there is a danger that automation suites become overly large, repetitive and expensive to run. Tests should be reviewed and groomed throughout the application lifecycle, and test strategies should be practical and minimal.
1.	Keep to the [Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html). Unit tests are much cheaper to run as they do not require the entire application architecture to be up and running, the way that integration tests do. All functional testing should be confined to unit testing, with pact testing used to confirm dependencies and interfaces between systems.
2.	Fail early. If your unit tests fail, you don’t want to go on to run further tests. So any automated pipelines should stop on the first failure – even if stages are running in parallel.
3.	Only test on change. Tests should be cadenced with application changes, not with calendar dates. There is no need to re-run performance tests weekly if nothing in your environment has changed, for example!

## Software Deployment Best Practices
Here we discuss all things Platform - assuming cloud deployments and full automation as per the prerequisites.
1.	Everything Ephemeral. If infrastructure isn’t being used, tear it down. This is particularly relevant for test environments  - we often have many test or “live-like” environments which are left running overnight and at weekends. Review whether this is really necessary. Sometimes it is – you may have certain tests running out-of-hours, but often it is not. This applies to support infrastructure too – build pipeline machines should be created when needed and torn down afterwards. Capgemini can provide templates for completely ephemeral build environments, such as [CREATE](https://capgemini.github.io/devsecops/platform-for-product-oriented-teams/) and, for Defra, [ADP](https://github.com/DEFRA/ado-pipeline-common?tab=readme-ov-file) for Azure DevOps pipelines.
2.	Automated tear-down. Developer builds and other automated test environment builds should automatically take themselves down once their automation suites have completed.
3.	Review your cloud service plans regularly. Your initial best estimate of what “size” of hardware applications will need should be reviewed over time. Often, we only review when we want to scale up – consider regular reviews with a view to scaling down when hardware or services are not being utilised.

We will be evolving this list as we work with our clients, adding best practices that we have seen in use. As usual with any drive for change, awareness is key - having a focus on sustainability for everything we do will help draw out further ideas on how we can improve. Don't hesitate to add further suggestions!



