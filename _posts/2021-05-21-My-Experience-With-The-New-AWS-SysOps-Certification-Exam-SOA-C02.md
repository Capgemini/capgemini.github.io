---
layout: post
title: "My experience with the new AWS SysOps Certification exam (SOA-C02)"
subtitle: "Some thoughts on the Taking the AWS Certified SysOps Administrator - Associate Certification exam (SOA-C02) while it was in Beta."
category: AWS
tags: [AWS, SysOps, Cloud, Certification]
author: [mattantley]
comments: true
draft: true
share: true
---

Earlier this year while it was available I sat an online proctored exam for the new Beta version of the AWS Certified SysOps Administrator - Associate Certification exam (SOA-C02), for more information you can check out the [Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-sysops-associate/AWS-Certified-SysOps-Administrator-Associate_Exam-Guide_C02.pdf). These are some thoughts on why I decided to sit the Beta exam, how I went about revising (including topics) and some info about the exam itself.

![AWS SysOps Certification Logo](/images/2021-05-18-AWS-SysOps-Certification/cap-aws-sysops.png){: .centered }

## Why the Beta exam

I have been asked why I decided to sit the Beta version of the AWS SysOps exam and the main reasons for it are:

- It included questions about newer AWS services - This made it so I had to revise and learn about these new services which in turn brings me more up-to-date with what AWS have released recently and to better understand their offerings
- Different exam questions - Previously the exam only included multiple choice and multi-answer style questions on its exam however with the SOA-C02 exam it also included a set of hands-on labs which I wanted to try out

This was an opportunity to learn about the newer AWS services that made up the exam as well as take a look into the new format of the exam with the inclusion of the hands-on labs. The only drawback to all this is waiting for up to 90 days after the Beta exam period has ended for your results. As of writing this I am still waiting for my results!

## Revision

Last year in January I had taken and passed the AWS Solutions Architect Associate exam so was familiar with a number of the core services that AWS offered already. On top of that I have around 3 years of experience with AWS so a lot of my revision was aimed at those services I do not tend to use or have not had any exposure with.

A list of the services that I identified and focused my revised around were

- Storage gateway
- Backup
- Api Gateway
- AWS Orgs
- CloudFormation
- CloudTrail
- Config
- ElasticSearch
- RAM
- SSO
- ACM
- KMS
- Directory Service
- WAF & Shield
- Cost Explorer
- Step Functions
- EventBridge (CloudWatch Events)

Initially identifying what services you are least confident with and focus on building knowledge up in these areas for the exam is a good starting point for revision, it allows you to be more focused when you do sit down to revise as you have a list of topics to look into always available. On top of this I would also do a refresher on other services like EC2, Auto Scaling, Load Balancing, RDS, etc, but a lot of the focus initially was on these newer or less familiar services.

After doing some research around the new exam, I found a few articles which spoke about it including Adrian Cantrill's [How to prepare for the upcoming AWS Certified SysOps Administrator - Associate (SOA-C02) Exam](https://www.linkedin.com/pulse/how-prepare-upcoming-aws-certified-sysops-associate-adrian-cantrill/) as well as his thoughts on the exam after he had taken it with [My Thoughts On the SysOps Administrator Associate BETA Exam — (SOA-C02)](https://adriancantrill.medium.com/my-thoughts-on-the-sysops-administrator-associate-beta-exam-soa-c02-db34d31d8e3)

I later found a course of his that specifically aims itself at the new AWS SysOps Administrator exam instead of the older exam. I was quite cautious of any courses or resources that had been rebranded as compatible for the new exam as I thought they wouldn't be as up-to-date or wouldn't include courses on the latest AWS services. I opted to give Adrian's course [AWS Certified SysOps Administrator - Associate](https://learn.cantrill.io/p/aws-certified-sysops-administrator-associate) a try after viewing some of the free videos that were available on the course.

What I primarily liked about his course was the use of graphics to describe a lot of how these AWS services function. As I'm not the most confident of readers and reading isn't how I would best take on new information, but when conveyed with images and his accompanying demos it helped the information stick and was made more understandable by this approach.

<figure>
  <img src="/images/2021-05-18-AWS-SysOps-Certification/adrian-cantrill-example-image.png" class="centered" alt="Adrian Cantrill SysOps Course" />
  <figcaption>An example of the images used in Adrian Cantrill's courses</figcaption>
</figure>    

After building up some confidence with my revision I started to take practice exams provided from [WhizLabs](https://www.whizlabs.com/aws-sysops-administrator-associate/) as I found the practice exams on there for my Architect exam quite useful in the past. On reflection, the WhizLabs practice exams did not seem up-to-date with the most recent AWS services which were not covered in the practice exams I covered, with that said they were still beneficial in testing my knowledge and allowed me to identify areas where I needed to improve. Next time I plan on taking a look at the practice exams provided by [Tutorials Dojo](https://tutorialsdojo.com/) as I have heard good things about them and want to try and find more practice exam resources.

## The Exam

The online proctored exam was well setup, I had to sign in, confirm my identity and then had to take some photos of my desk and surrounding area for inspection to ensure there were no materials I could use to cheat or gain an advantage in the exam. I was then called by the proctor to confirm a few last minute details and informed I had to remove the coaster and some pens from my desk. Once all this was done, they wished me luck and the exam began after accepting the Terms and Conditions of the exam. Because this was a Beta exam, I had a total time of 3 hours and 45 minutes to complete all sections of the exam.

Then, the exam started. It was was split into 2 parts, the first involving the multiple choice and multi-answer questions and the second part involved the hands-on labs portion of the exam. The first part of the exam contained 53 questions. Any I was unsure of I marked for review to come back to later and as I am not the fastest of readers I also tend to leave the larger & more wordy questions until last and focus on the shorter questions to begin with, this approach works well for me at least. Once I had been through all the questions and got to the end, I had a chance to review all the questions I had marked for review earlier in the exam. I still had around 3 hours left at point in time so I taken my time carefully reading the larger questions to ascertain what they were asking and answer to the best of my ability.

After completing the review, I marked the section as complete. You are then warned you will not be able to come back to this section after completing it so you cannot get answers from the AWS console when the hands-on labs start. I accepted and continued onto the 2nd part of the exam that focused on the labs.

Getting onto the lab section of the exam there was about 2 hours and 30 minutes remaining and it was recommended that you spent 20 minutes on each of the labs you were given. Sadly, I am not allowed to say exactly what I had to do in the hands-on Labs but the areas in which my questions focused on were:

- High availability VPC
- CloudWatch Alarms
- CloudFormation

The Labs were setup through a virtual Windows machine for access to a browser that was set to the AWS console. You followed a set of instructions to provision or amend some resources to specification and once you were done you could move on to the next Lab. I felt the Labs were well implemented and apart from some issues copy/pasting from the exam portal (OnVue) into the Windows virtual machine I had no complaints and thought it was well done.

Once you had finished one Lab you could progress to the next but were not allowed to return to previous labs. During the labs you were given access to the whole AWS console (Although I read that navigating the browser page away would give a warning) so you were not able to look at AWS documentation, for instance. You also had the option use AWS CloudShell if you wanted to provision resources via CLI instead of via the console, for ease I just used the console.

Each of the Labs taken me around 20-25 minutes each but as I had the time I didn't rush and went through the specification of what was asked thoroughly before going onto the next lab. With just over an hour remaining on the exam I confirmed the completion of the labs and submitted the exam.

## Conclusion

Firstly, I genuinely enjoyed taking this exam. The inclusion of the hands-on lab style questions are a huge positive in my books as it means you need to know AWS from a practical standpoint as well as a theoretical one. In the future I would like to see this become a staple that AWS exams include some hands-on Lab element to test the candidate in a different way.

I'm happy with how the online proctored exam was carried out, sign in and setup was quick and easy from my experience and this will likely be how I take my exams going forward.

The new SOA-C02 SysOps exam will be available to register from the 29th of June and the old SOA-C01 SysOps exam will be retired as of the 26th of July. If you are looking to take the new SysOps exam you can find more information on the [Coming Soon to AWS Certification](https://aws.amazon.com/certification/coming-soon/) page.
