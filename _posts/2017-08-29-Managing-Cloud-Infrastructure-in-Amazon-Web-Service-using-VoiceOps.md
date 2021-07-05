---
layout: post
title: "Managing Cloud Infrastructure in Amazon Web Service using VoiceOps"
description: "Alexa skill to build CloudFormation Infrastructure"
category: Cloud
author: [nagaraj_govindaraj, rushil_soni]
tags: [CloudFormation, Alexa, AWS, Learning]
comments: true
share: true
---

Amazon Echo has steadily become the hottest smart home product on the market. Suddenly, every tech company wants to integrate its products with Amazon's customizable virtual assistant, [Alexa](https://developer.amazon.com/echo).

Alexa is Amazon’s voice controlled service on many devices like Echo, Echo Dot, and Echo Show. Alexa provides capabilities or skills to create a more personalised experience. The integrations keep coming, at such pace it’s hard to know exactly which products/services will work with it. Alexa provides features which include:

* Voice recognition system
* Adaptable behaviour
* Skill capabilities
* Scalability in the cloud
* Engaging experiences

We joined Capgemini as members of the first Summer Intern programme based out of Telford, UK. Shortly after our induction we had been given the task of creating cloud Infrastructure in AWS using an Alexa enabled device, admittedly this was an open-ended task which could be tackled in different ways, but we were trusted enough as young professionals to be given free rein on how we would tackle this task.

We relished the challenge at hand and saw it as a unique opportunity to learn some new technologies and services, which would otherwise not have been exposed to us, had we not undertaken this internship.

## Objectives

We spent our first week getting familiar with the new technologies and tools that are required to complete this project, in addition to collecting functional and non-functional requirements from stakeholders, allowing us to scope out the required work using a [Trello](https://trello.com/) board with a [Kanban](http://www.kanban.com/) agile model. The Trello board allowed us to easily track and delegate work to each other, whilst providing a highly readable overview of the project.

* An Alexa skill to create, delete and provide a status of CloudFormation stacks running in AWS.
* Have appropriate invocations which are short and easy to call for each subsequent command to Alexa.
* Make sure actions which would cost the business money or cause a lot of damage should be protected by authentication.
* A help action which gives the capabilities of the skill.
* Allow multi-user access from a single Alexa enabled device and have varying levels of access to capabilities for each user.

## Integration of Amazon Web Services to Alexa

![Alexa_Architecture](/images/2017-08-18-CloudFormation-Infrastructure-using-VoiceOps-in-Amazon-Web-Service/Alexa_Architecture.png)

When deciding on how we would handle the integration of the Alexa Skill to AWS services, we settled on using AWS Lambda over other alternative solutions such as [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/); due to its serverless platform and ease of implementation.

We developed the Lambda component of the skill concurrently in [NodeJS](https://nodejs.org/en/) and [Python](https://www.python.org/) with both versions providing identical functionality, due to members of the team having varying skill sets and specialisation.

Detailed below is how the Alexa skill will integrate with the Lambda function.

1. [Alexa Skill](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-1)
    * Utterances
    * Intent
2. AWS Lambda
    * Handler

![Integration_dia](/images/2017-08-18-CloudFormation-Infrastructure-using-VoiceOps-in-Amazon-Web-Service/Integration_diagram.png)

### Core components required for integration
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Alexa Skill](https://developer.amazon.com/alexa-skills-kit)
* [AWS S3](https://aws.amazon.com/s3/)
* [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
* [AWS Simple Notification Service](https://aws.amazon.com/sns/) (One Time Passcodes)

## Minimum Viable Product (MVP)

Agile is an iterative process so we developed an MVP (to be presented to stakeholders) for the Alexa skill which uses voice activated commands to create cloud infrastructure from CloudFormation template files, which can be either written in [JSON](http://www.json.org/) or [YAML](http://yaml.org/). When instantiated these templates create CloudFormation Stacks.

### Steps on minimum viable product:
* Basic integration of core components.
* Created a basic CloudFormation template for testing.
* Created a CloudFormation stack from a basic template.

## Design architecture

### Actions with negligible cost.

![Design_arch1](/images/2017-08-18-CloudFormation-Infrastructure-using-VoiceOps-in-Amazon-Web-Service/Design_arch1.png)

These are generic actions which incur a negligible cost or are free (Allocated a monthly allowance of free access to services required to run actions).

### Actions which require elevated privileges.

![Design_Architecture](/images/2017-08-18-CloudFormation-Infrastructure-using-VoiceOps-in-Amazon-Web-Service/Design_Architecture.png)

Each action which requires authentication needs to prompt for the username and a passcode which can be elicited from the user in the form of a slot from an Alexa enabled device. These privileged actions (create/delete cloud infrastructure) have an authentication layer wrapped around them. We looked at various options such as QR codes and access credentials. A decision was made to use one time passwords (OTP) which would be sent to an authenticated users mobile device. The user speaks the code to Alexa, and Alexa validates that code is correct and either allows or rejects the action.

A decision was made not to make skill session based, as that would grant access to the skill for large periods of time, instead the user is required to follow the authentication model each time they want to execute a privileged action; this prevents bad actors from interjecting and running commands as the user.

## Code functionality

The code can be found in our [GitHub repository](https://github.com/capgemini-psdu/cloud-former-alexa).

The solution was developed with scalability and future development in mind, this was achieved by following a modular approach, which allows for modules to be interchanged easily should a better approach be found.

This section will represent the basic functions used for individual components in the development of the project. There are many functions involved to incorporate different features to Alexa with specific conversations. To make it easy, we have declared all the constant variables at the top of the script to change the values according to the requirement. We want to portray the main features in a sequential way dividing into appropriate snippets which follows as:

1. Dependencies and package library
2. CloudFormerCreateIntent
3. CloudFormerDeleteIntent
4. CloudFormerListTemplateIntent
5. CloudFormerHelpIntent

These are the main intents used in the script which will be discussed below in detail.

**1. Dependencies and package library:** CloudFormer requires that the dependencies outlined below in the code snippet be included for the skill to function correctly. The cloudformer-node package has been forked and tweaked (the forked repository can be found [here](https://github.com/retrofy/cloudformer-node), all the other packages are used as it is.

```
//Add AWS sdk dependency
const AWS = require('./node_modules/aws-sdk');

//Add dependency to CloudFormer scripts
const Stack = new require('./node_modules/cloudformer-node');

//Add dependency to Alexa SDK
const Alexa = new require('./node_modules/alexa-sdk');

//Package required for producing a random auth code.
const auth = new require('./node_modules/random-number');

const sns = new AWS.SNS({
  apiVersion: '2010-03-31'
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

const cloudFormation = new AWS.CloudFormation({
  apiVersion: '2010-05-15'
});

//Define the range of valid values for generated auth codes.
const authParams = {

  min: 1000,
  max: 9999,
  integer: true
};
```

**2. CloudFormerCreateIntent:** The create action requires elevated privileges which can only be obtained if the user is authorised by an administrator. This works by specifying the option number of the stack, which the user requests to be created. In the event that the user is authenticated the stack is created, otherwise an access denied message is returned by Alexa.

**3.	CloudFormerDeleteIntent:** The delete action also requires elevated privileges; this works by specifying the option number of the stack which the user requests to be deleted. In the event that the user is authenticated the stack is deleted, otherwise an access denied message is returned by Alexa.

**4. CloudFormerListTemplateIntent:** The ListTemplate intent loops through the specified S3 Bucket in AWS and then Alexa outputs information about each CloudFormation Template (JSON and YAML) found within the bucket. Note, that the JavaScript Promise is used to ensure that the list of templates is returned for the intent to handle.

**5. CloudFormerHelpIntent:** The help intent has been designed so that it is similar to an expert system, as the majority of people would have prior experience using such a system; this allows for a user to intuitively follow through the intent to get whatever assistance they may require.

The other minor functions to have been included in the script are:

* A count of the templates that exist in the S3 bucket.
* A lists of existing stacks and their status in CloudFormation.

A global IAM role has been used with a custom policy with the minimum required permission on the AWS resources.

## Want to see a live demonstration?

We will be demonstrating our Alexa VoiceOps solution at the [Digital and DevOps Meetup in Birmingham on the 14th of September](https://www.meetup.com/Birmingham-digital-development-Meetup/events/242215888/). See you there!

## Conclusion

We've thoroughly enjoyed the project and the journey it has taken us on, during our short stint here at Capgemini; it has provided us with an invaluable insight into the processes and culture which the company prides itself upon. We highly recommend this summer programme to students who are passionate about Technology and Consulting. We look forward to gaining similar opportunities and continuing our journey with Cloud-based development projects in the near future.

## Future enhancements

There are a few additional features which we would have liked to implement had we had some more time, these can be found below.

* Billing alerts to individual users for running resources in AWS.
* Using DynamoDB tables to store the authorisation keys which allows expiration after time limit.
* An authenticated action which can add/remove users from the skill by modifying users and their phone number in the database.
* DynamoDB table to keep track of stacks to prevent duplicate names.
* Add user tag to created stacks.

## Team members

We would personally like to thank our stakeholders and who were involved throughout the development of this project. We appreciate their consistent support and input.

* **Developers:** Jordan Lindsey, Nagaraj Govindaraj, Rushil Soni
* **DevOps Engineer Interns:** Nagaraj Govindaraj, Rushil Soni
* **Robot Process Automation Intern:** Jordan Lindsey
* **Digital Delivery Architect Intern:** Sara Jebril
* **Scrum Masters:** Nagaraj Govindaraj, Rushil Soni
* **Stakeholders:** Douglas Thomson, James Devaney, Jonathan Sugden, Les Frost, Paul Taylor
