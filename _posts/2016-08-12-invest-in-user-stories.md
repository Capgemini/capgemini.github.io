---
layout: post
title: "INVEST in User Stories"
description: "Evolution of an INVEST-able User Story during the journey of a Sprint: Through the eyes of an Agile Team Member"
category: "Agile"
author: abnair
tags: [Agile, Scrum, Development, User Story, INVEST]
comments: true
share: true
---

An INVEST-able User Story evolves through the journey of a Sprint. Let us follow this journey through the eyes of an Agile Team Member.

This post is directed at Team Members in companies planning on adopting an Agile methodology, especially for those coming from a background of a traditional Waterfall model. 

After having implemented Agile in a couple of companies that adapted from a traditional Waterfall model to an Agile Scrum approach as well as initiating the methodology from scratch, I hope the following helps you to channel your time and master the art of investing in User Stories. To elucidate this further, I would like to take inspiration from a real-life scenario and track the evolution of a User Story during the journey of a Sprint and present it from the perspective of an Agile Team Member.

_The website of Business XYZ processes huge amounts of payments daily through their checkout process. The business user from the Marketing department requires an urgent "One-click Payment" feature to be implemented within the check-out process that would immensely simplify the experience of the customers to complete their order faster, thereby increasing customer delight and reducing the overall cart abandonment rate._

_User summarises, "We need to urgently integrate a 'One-click Payment' facility within our Checkout process!"_

A User Story must aim to have the following facets:

1. User Story Template
2. Acceptance Criteria
3. Conversation
4. Sub-tasks

## 1. User Story Template

A User Story is a short and simple description of a feature (the "what") told from the perspective of the person who desires the new capability (the "who"), usually the customer of the system (hereinafter referred to as the "customer") [Reference: [User Stories and User Story Examples by Mike Cohn](https://www.mountaingoatsoftware.com/agile/user-stories)]. 

If the feature is an internal requirement, the User Story must be told from the perspective of the area of the business that is responsible for managing the efficiency and effectiveness of the customer-facing business of the system (hereinafter referred to as the "user" or "business user"). 

Additionally, a User Story must clearly list the direct "benefit" or "value" that the customer or the user will enjoy (the "why"), once the User Story is successfully delivered.

Finally and most importantly, a well-written User Story must always answer the question: "Is the User Story INVEST-able?" 

**I**ndependent

**N**egotiable

**V**aluable

**E**stimable

**S**mall

**T**estable

This INVEST mnemonic for agile software projects was created by Bill Wake in his original article, [INVEST in Good Stories, and SMART Tasks](http://xp123.com/articles/invest-in-good-stories-and-smart-tasks).

Based on my experience, with tools like JIRA available to keep track and record details for every User Story, the more time you spend in getting your user stories INVEST-able, the better your understanding of the requirements become and the lesser time you spend in the actual coding and testing of those stories. It avoids the team going off course and acts as a guide to help steer the team towards getting their User Story "done" or to take appropriate corrective measures early on, in the journey of the team's Sprint. 

Example template of a User Story:

**As a... <"CUSTOMER" or "USER" who directly benefits from the successful delivery of this User Story>**

**I want to... <perform a "FEATURE" specified in the User Story>**

**So that... <"BENEFIT" / "VALUE" that the customer or user will enjoy on the successful delivery of this User Story>**

Let us write the aforementioned user requirement, following the template of a User Story:

>_As an XYZ customer ordering using the website, I want to be able to use the One-click Payment option, so that I can skip the payment pages and complete my order faster_

Is the above User Story INVEST-able? The simple answer: NO!

This User Story leaves a number of questions unanswered:

* **Type of Customers:** Is this feature available to all new and existing customers?
* **New Customers:** What should be the workflow for a new customer after the One-click Payment option has gone live?
* **First Visit of Existing Customers without saved card details:** What should be the workflow of an existing customer who has not saved any card details and visits for the first time after the One-click Payment option has gone live?
* **First Visit of Existing Customers with saved card details:** What should be the workflow of an existing customer who has already saved their card details and visits for the first time after the One-click Payment option has gone live?
* **Existing Customers not opted for One-click Payment:** What should be the workflow of an existing customer who has not opted to register for the One-click Payment in their previous visit after the feature has gone live?
* **Existing One-click Payment Customers:** What should be the workflow of an existing customer who has successfully registered their card for the One-click Payment in their previous visit?

Let us assume that the **Existing One-click Payment Customers** use-case received the below answers from the user: 

1. Customers must be presented with a "Buy Now with 1-click" button on the Checkout Screen (where the Checkout Screen is any section that can act as the start of a checkout process).
2. Clicking on the button must skip the Payment screens and the customer must be presented with the Order Confirmation screen directly. 

Based on the above answers, let us rewrite the User Story:

>_As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the website, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

The above User Story is **Independent** as this feature can be developed and delivered independently _after_ the **First Visit of Existing Customers** use cases have been done. 

The above User Story is **Negotiable** as this feature can incorporate changes if required. 

Let us look at this scenario in our case study: 

_As always, the business user comes to our Product Owner (PO) once the Sprint has commenced and says, "Whoops! I just got the numbers in from my market research teams and it highlights the fact that 55% of our customers are using their mobiles and tablets (30% of those are Apple device users). Since we are already adding the feature for our web users, could we increase the scope of the delivery of this feature just a teeny-weeny bit so that this is available not only to our web but also to our Apple and Android tablet and mobile apps users as a priority? Later maybe we could make this facility available to our Windows app users since that's not much of a priority as of right now!"_

In such a scenario, is the above User Story Negotiable? Yes! I would negotiate the User Story by breaking it down further as below: 

* _As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using a **DESKTOP OR LAPTOP**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

* _As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using an **APPLE TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

* _As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using an **ANDROID TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

* _As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **MOBILE APP** using an **APPLE TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

* _As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **MOBILE APP** using an **ANDROID TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

The priority of which deliverables need to be included in the current Sprint and which can be excluded can then be negotiated with the business user by the PO as a "Minimum Viable Product" (MVP).

The above User Story is obviously **Valuable** as the value / benefit has been clearly stated. 

Each of the above User Story is easily **Estimable** as we have now broken it down to an independent, negotiable, valuable, small and testable MVP.

The User Story is **Small** enough to be "done" within a Sprint.

The User Story is **Testable** as it is small enough to be developed and tested within a Sprint.

## 2. Acceptance Criteria

I would use this section of a User Story in conjunction with the PO and a team member who has specialised in Quality Assurance (QA) and / or a team member with a QA mindset. I have seen the quality of deliverables increase immensely, when all Acceptance Criteria is written in a combination of Given-When-Then and checklist formats.

A Behaviour-Driven Development (BDD) approach follows a "Given-When-Then" format to help break the behaviour of the system down to an agreed and specific flow. According to [behaviourdriven.org](http://behaviourdriven.org), BDD relies on the use of a very specific (and small) vocabulary to minimise miscommunication and to ensure that everyone – the business, developers, testers, analysts and managers – are not only on the same page but using the same words. 

Hence, using the BDD approach ensures that everyone involved with the User Story has a consistent understanding of what is expected to be delivered of the new functionality that would be built from tests that satisfy the Acceptance Criteria.

Use a Given-When-Then format for a one-to-one mapping of acceptance tests that must be met and tested against.

**Given:** An existing scenario

**When:** I perform some action

**Then:** I expect a specific result

Use a checklist format for a scenario where an acceptance test satisfies multiple Acceptance Criteria checklist items.

_After discussions with the Team Members, our PO has now negotiated with the business user that in this Sprint, the team would commit to deliver the web version of the User Story._ 

So let us write Acceptance Criteria specifically for those user stories.

>_As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using a **DESKTOP or a LAPTOP**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

<em>**Acceptance Criteria:**</em>

  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer orders through the website and clicks on Checkout using a desktop or a laptop, **Then:** The Customer must be presented with a One-click Payment button
    * **Checklists:** This test must pass when tested on:
      * Approved versions of IE browsers
      * Approved versions of Chrome browsers
      * Approved versions of Firefox browsers
      * Approved versions of Safari browsers

  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer clicks on the One-click Payment button using a desktop or a laptop, **Then:** The Customer must directly be presented the Order Confirmation screen
    * **Checklists:** This test must pass on:
      * Approved versions of IE browsers
      * Approved versions of Chrome browsers
      * Approved versions of Firefox browsers
      * Approved versions of Safari browsers

	  
>_As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using an **APPLE TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

<em>**Acceptance Criteria:**</em>

  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer orders through the website and clicks on Checkout using an Apple device, **Then:** The Customer must be presented with a One-click Payment button
    * **Checklists:** This test must pass on:
      * Approved list of Apple mobiles
      * Approved list of Apple tablets

  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer clicks on the One-click Payment button using an Apple device, **Then:** The Customer must directly be presented the Order Confirmation screen
    * **Checklists:** This test must pass on:
      * Approved list of Apple mobiles
      * Approved list of Apple tablets

	  
>_As an EXISTING ONE-CLICK PAYMENT XYZ CUSTOMER ordering from the **WEB** using an **ANDROID TABLET OR MOBILE**, I want to be able to CLICK ON THE ONE-CLICK PAYMENT OPTION so that I can skip the payment pages and complete my order faster_

<em>**Acceptance Criteria:**</em>

  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer orders through the website and clicks on Checkout using an Android device, **Then:** The Customer must be presented with a One-click Payment button
    * **Checklists:** This test must pass when tested on:
      * Approved list of Android mobiles
      * Approved list of Android tablets
      
  * **Given:** An EXISTING ONE-CLICK PAYMENT WEB XYZ Customer, **When:** The Customer clicks on the One-click Payment button using an Android device, **Then:** The Customer must directly be presented the Order Confirmation screen
    * **Checklists:** This test must pass when tested on:
      * Approved list of Android mobiles
      * Approved list of Android tablets


## 3. Conversation

This section of the User Story summarises all important and relevant email discussions, code discussions, visual representations / diagrams, screen grabs, test results, et al. that have occurred during the uncovering of the User Story and recorded either as comments and / or attachments. 

I use this section to record a summary of what discussions and actions have occurred on this User Story during its journey through the Sprint.

_Continuing on with our case study, after the delivery of the User Story in the Sprint, it is time for the team's Retrospective. Let us refer to the "Conversation" of the User Story to record the team's Retrospective points:_

<em>**Conversation:**</em>

* Created this User Story as a part of a change agreed by the PO with the business user after the Sprint had commenced. Team had to spend a time-boxed amount of time in re-planning and re-estimating the story. Work on this story commenced 3 days into the Sprint and delivery has been agreed to the Web platforms only.

Why invest precious time on a Conversation?

1. To decipher the actual "complexity" of the User Story
2. To empower the team or any other team working on a similar User Story to make better and more accurate estimations
3. To save any time that might be spent on potential rework
4. To act as documentation on the feature delivered
5. To act as a tool to take corrective measures mid-Sprint rather than render the story as not done at the end of the Sprint

## 4. Sub-tasks

One has the capability of adding sub-tasks to one's User Story but this can easily be misused unfortunately. From my perspective, the smaller a User Story, the easier it is for the story to be INVEST-able, thereby rendering sub-tasks as unimportant in most cases! I have only used sub-tasks as a mere logical set of one-liner reminders of tasks that need to be completed for the User Story to be marked as "done". Usually, I try and avoid sub-tasks as much as possible as it masks the complexity of the task listed and managing them within an already INVEST-able User Story ends up becoming an additional overhead. Moreover, since they are not monitored as closely as a User Story, sub-tasks tend to become complex and quite as often, root to a cascade of problems in the following sprints. I have encountered sub-tasks that should have been user stories in itself (if not "Epics"). 

<em>**Consequences:**</em>

1. Noticeable long and stagnant parallel lines in the team's Sprint Burn-up / Burn-down charts
2. Same user stories carried over across several Sprints
3. Frustration amongst the Team Members due to failure of meeting commitments Sprint after Sprint	
4. Team losing credibility amongst stakeholders
5. Nervousness to commit
6. Unable to calculate the Velocity of the team

_Continuing on with our case study, no sub-tasks are required for this story as all potential tasks are already well-covered in the other sections of the story._

## User Story AntiPattern: Horror Story

Can you see why the below are "Horror" (user) stories?

1. _"Finish coding for microservice"_
2. _"Deploy code to QA"_
3. _"We need 3 additional codes to be added to the Shipping module"_
4. _"This is an easy JSP change - Integrate a new option in an existing dropdown"_

## Conclusion

Successfully adopting Agile requires implementing a change in the organisation's "culture" and this is only as successful as the overall collaborative effort of every member in the organisation investing into this change. Composing INVEST-able user stories form a strong foundation towards paving the way for a successful journey. Implementing this change and Bill Wake's INVEST mnemonic will help remind you of the mandatory characteristics required for writing good user stories.

**Are YOUR user stories INVEST-able?**
