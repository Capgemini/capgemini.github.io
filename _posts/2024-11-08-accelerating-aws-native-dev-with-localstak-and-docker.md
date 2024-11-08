---
layout: post
title: "Accelerating AWS Native Development with LocalStack & Docker: A Real-World Case Study"
summary: "Some of the benefits of using LocalStack to emulate AWS environments on a developer's local machine, based on real-world project experience."
category: Cloud
tags: [AWS, Cloud, Development, Testing]
author: [charles_ofoegbu]
comments: true
share: true
---


In this blog post, I'll walk through how using [LocalStack](https://www.localstack.cloud/) with [Docker](https://www.docker.com/) 
and [Docker Compose](https://docs.docker.com/compose/) helped us speed up development
and testing, making the entire process more efficient and seamless.

When building modern cloud-native applications on AWS, having a reliable and cost-effective approach
to development and testing is essential. 
For this project, we utilised LocalStack, a platform that simulates AWS services locally. This
enabled us to work more efficiently, speed up development, cut down on costs, and quickly test
integrations without constantly interacting with the actual AWS cloud. LocalStack, along with other
components of the project, was deployed as Docker containers using Docker Compose for
orchestrating the entire environment locally.

## The Challenge: Cloud Dependency Slows Development
As many developers will attest, working directly with live AWS services can become costly and slow.
Every API call, infrastructure change, or even basic testing, requires interaction with the cloud,
which can introduce delays. On top of that, maintaining isolation between development and production
environments can be tricky and costly when dealing with real AWS resources.

In particular, this project was fast-paced and required frequent iteration between components. This 
constant cycle of making changes, pushing updates, and testing in a live AWS environment was prone 
to introduce a lot of friction. A local alternative to AWS was essential for reducing the turnaround 
time between code changes and testing. The combination of LocalStack with Docker and Docker Compose 
provided the perfect solution.

## The Solution: LocalStack with Docker
**[LocalStack](https://www.localstack.cloud/)** — "A complete, localised AWS environment where developers can build, test, 
profile and debug infrastructure and code ahead of deployment to the cloud." By deploying LocalStack 
in a Docker container, we were able to spin up a local version of AWS that was fast, reliable, and 
cost-free. Docker made it easy to manage and isolate the LocalStack environment, while Docker Compose 
orchestrated the entire environment locally, allowing us to run all components — front-end, back-end, 
mocks, and infrastructure, together in one seamless, local environment without the latency, cost, or 
need for an internet connection.

### Project Overview
The project consisted of four key components:
1. **UI Component:** The frontend / user interface of the application was developed with
   [Node.Js](https://nodejs.org/en) and [Nunjucks](https://mozilla.github.io/nunjucks/) used as the templating engine.
2. **Backend Component:** The APIs and business logic built with [Java](https://www.java.com/en/)
   and [Spring Boot](https://spring.io/projects/spring-boot) framework
3. **Mock Component:** A HTTP mock service based on [MockServer](https://www.mock-server.com/) used to simulate third-party
   or Upstream APIs.
4. **Infrastructure/Environment:** The AWS environment was defined in code following the
   Infrastructure as Code (IaC) paradigm, using [Terraform](https://www.terraform.io/) to provision various AWS services.

![Basic High level illustration of project setup with local stack, docker and docker compose](/images/2024-11-08-aws-native-dev/LocalStack_Project_Illustration.drawio.png)

In this project, we used **SQS** for messaging, **S3** for object storage, and **ECS** for container
orchestration, **Cognito** for user management, **Cloud Watch** for monitoring and alerting, among 
other AWS services. LocalStack allowed us to simulate these services locally, cutting down 
on our cloud costs and speeding up development. With Docker and Docker Compose, all services were 
integrated into a single, local environment that closely mirrored the cloud environment.
For instance:
- Messaging flows were tested by sending and receiving messages through **local SQS queues**. This
  allowed us to validate the flow of messages from one component to another, ensuring that the
  message-handling logic worked as expected.
- We uploaded and retrieved files from LocalStack’s simulated **S3 buckets**, ensuring our storage
  logic worked as expected without needing to interact with the actual AWS S3 service
- User authorisation and authentication was tested through local **Cognito User Pools**
- Our back-end API integrated with Mock services simulated using **MockServer** running in
  Docker, allowing us to test data storage and retrieval workflows without needing the live services
  deployed on AWS.

All the code for the various components were managed with [Git](https://git-scm.com/) & [GitLab](https://about.gitlab.com/) version control, 
and we also utilised GitLab’s CI/CD for our build and deployment pipeline management. 

Refer to [AWS Service Feature Coverage](https://docs.localstack.cloud/user-guide/aws/feature-coverage/) 
for an overview of the AWS APIs and services implemented in LocalStack

## LocalStack and Docker enhanced our project in the following ways:

### 1. Containerised Deployment 
By containerising LocalStack, our application’s Backend services, Frontend service, mock components,
and other services, we could deploy the entire stack on any developer's machine with minimal setup.
All that was required was Docker and Docker Compose. This approach offered consistency across
different environments and eliminated the "works on my machine" issues that often arise when
different developers have different local setups.

### 2. Docker Compose for Orchestration
We used Docker Compose to orchestrate our multi-container environment. Each service—whether it was
LocalStack simulating AWS or our front-end and back-end components—was defined in a single
docker-compose.yml file. With one command, we could spin up or tear down the entire environment.
This orchestration allowed us to develop, test, and debug the entire system on a local machine
without having to interact with AWS cloud services.

Here’s an example of the Docker Compose setup. Please note, this is just an illustration and not the 
actual configuration.
```
version: '3'
services:
  localstack:
    image: localstack/localstack
    ports:
      - "4566:4566"
      - "4571:4571"
    environment:
      - SERVICES=s3,sqs,lambda,dynamodb
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"

  backend:
    build: ./backend
    depends_on:
      - localstack
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  mock-service:
    build: ./mock-service
    ports:
      - "4000:4000"
```

This setup allowed all components — LocalStack, the back-end, front-end, and mock services to run in
harmony, facilitating rapid development and easy integration testing.

### 3. Faster Development Cycle
By running services locally, we no longer had to wait for deployments or API interactions to happen 
in the cloud. We could iterate over changes rapidly, test out new features, and deploy code without 
worrying about cloud costs. For example, instead of sending messages through live SQS queues and 
interacting with S3 storage on AWS, LocalStack let us simulate these services locally. This allowed 
us to run and test our messaging workflows much faster.

### 4. Easy Integration Testing
One of the biggest challenges in modern cloud applications is ensuring that various components — 
front-end, back-end, messaging, storage; are working harmoniously together. LocalStack made this 
process seamless. Since we could emulate all the AWS services locally, we could simulate how our 
front-end communicated with the back-end, how our back-end processed data using SQS and stored files 
in S3, and even how our infrastructure interacted with external services. This allowed us to test 
integrations between various parts of our system without needing to push anything to the cloud.

### 5. Reduced Costs
The ability to test AWS-dependent services locally means you’re not accumulating unnecessary cloud 
charges. In our project, running constant tests on live AWS services would have significantly 
increased the budget. LocalStack helped us minimize these costs by simulating the AWS environment on 
our local machines without any cloud interaction. This is particularly useful for small teams or 
projects with limited budgets.

### 6. Simplified Infrastructure Setup
LocalStack also simplifies the process of setting up and tearing down infrastructure. Since 
everything runs locally, we could quickly spin up and shut down environments for testing and 
development, reducing the overhead involved in managing cloud resources.

### 7. Parallel Development
With LocalStack in place, our team could develop multiple components simultaneously. The front-end
devs didn't need to wait for the back-end APIs to be fully functional in AWS; they could test against
the locally mocked services. Similarly, the infrastructure devs could configure and test various AWS
services locally before pushing changes to the cloud.

## Downsides of LocalStack:

### 1. Limited Feature Support
Not all AWS services and features may be available or fully supported in LocalStack. Also, new or
complex features may not be fully implemented, which could impact testing and development.

### 2. Compatibility Concerns
LocalStack may not always be fully compatible with the latest versions of AWS SDKs which could lead
to delays in adopting new features.

### 3. Configuration Complexity
Configuring and setting up LocalStack may require additional effort and technical know how. It may
not be as straightforward as using the actual cloud services, especially for beginners.

## Conclusion
In summary, LocalStack significantly accelerated our project’s development and testing processes. By
simulating a local AWS environment, it allowed us to quickly iterate on our front-end, back-end, and
infrastructure components without incurring high cloud costs or waiting for slow cloud interactions.

I would highly recommend incorporating LocalStack into your workflow for anyone working on projects
that rely on AWS services. Not only will it make your development process faster and more efficient,
but it will also allow you to test AWS integrations with greater confidence, all while keeping your
costs low. If you haven’t tried LocalStack yet, give it a shot - you’ll likely find it as invaluable
as we did!

