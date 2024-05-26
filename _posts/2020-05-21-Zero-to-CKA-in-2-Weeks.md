---
layout: post
title: "Zero to CKA in 2 Weeks"
subtitle: "Some thoughts on the Certified Kubernetes Administrator exam and how I managed to pass it in 2 weeks with no prior knowledge of Kubernetes."
category: Kubernetes
tags: [Kubernetes, CKA, Cloud]
author: [mattantley]
comments: true
draft: true
share: true
---

Prior to the 2 weeks leading up to my CKA exam, I had no Kubernetes knowledge to speak of. I didn't know what a Kubelet was, how to create a Pod, nor did I know what the Control Plane did.

Fast forward 2 weeks and I actually understand most of these concepts. I also know how to setup a Pod and other Kubernetes Objects as well as some of what the Control Plane is doing. On top of this, I passed the [Certified Kubernetes Administrator (CKA)](https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/) with a score of 84% on my first attempt.

This article will contain some thoughts on the Certified Kubernetes Administrator exam and how I managed to pass it after 2 weeks with no prior knowledge of Kubernetes.

![CKA Certification](/images/2020-05-13-Zero-to-CKA-in-2-Weeks.md/cka-certificate.jpg)

---

## The First Week
The first week was spent primarily learning some of the theory of Kubernetes. Learning what a Pod and other Objects are rather than how to set them up and use them. I wanted to slowly expose myself to Kubernetes instead of diving head first and getting overwhelmed by it all which is why I opted to focus on the theory in the beginning.

I started with [A Cloud Guru's Kubernetes Deep Dive course by Nigel Poulton](https://acloud.guru/learn/kubernetes-deep-dive), this course goes into enough detail to give you a broad idea of what Kubernetes is, how to use it and what it can do without scaring you off. These videos also include some demos that you can follow along with if you'd like. I knew my 2nd week learning Kubernetes would contain plenty of lab based exercises so at this point I wanted to focus on the theory as opposed to the practical.

I extended the theory based learning by reading about Kubernetes Objects, Services and a little on the Control Plane. A lot of this was extracted from the [Kubernetes documentation](https://kubernetes.io/docs/home/) which I recommend you become familiar with if you thinking of learning Kubernetes and especially if you're planning on taking the CKA exam.

Throughout the week I made notes of what I'd learnt using [Nuclino](https://www.nuclino.com/), detailing what a Pod was, how it can be used and how it differed from other Objects like Deployments and DaemonSets. If making notes didn't help me in taking on certain pieces of information then I drew diagrams that allowed me to understand some concepts with greater ease (Services like NodePort and ClusterIP come to mind for this). Over the week I had built up a fairly comprehensive document that I could refer to if I needed a refresher on anything I had covered.

## The Second Week

For the 2nd week I had enrolled onto a CKA course hosted internally by Capgemini which was put on as part of getting more employees to learn about Kubernetes and get themselves certified with the CKA exam.

![CKA Course Agenda](/images/2020-05-13-Zero-to-CKA-in-2-Weeks.md/2nd-week-agenda.jpg)

The agenda for the week was fairly straightforward, days 1–3 were spent covering core concepts, Kubernetes Objects, Services and carrying out labs (hands-on creation of these components). A lot of the areas covered in these first few days would feature heavily on the exam and become the majority of the marks that made up the exam. Day 3 also included a mock exam with a variety of exam-like questions which was used to gauge the classes' current confidence levels with the exam coming up in 2 days.

Day 4 of the course covered some of the smaller sections of the exam like Logs, Top and Config Maps but most of the day was used to introduce components that would be used for more real world systems and wouldn't feature in the exam. This included components like Ingress Controllers, Resource Limits and some Pod Security basics.

Day 5 was reserved for some exam revision in the morning which consisted of a light Q&A to test our knowledge and for us to ask last minute questions if needed. We were then given some quick-fire setup questions to work through to warm ourselves up before the exam. For example, setting up a single Pod with the name 'hello-world' and a namespace of 'cka-training' which were a good pre-exam warmup. 

Looking back to the first day of the course, creating a Pod took 30-40 minutes to complete as a group, this was by going either the declarative (YAML) or imperative (kubectl) route. However by the end of the week the majority of participants could do this within a few minutes. For me this was down to the repetition in which we did these tasks and continuous use of the kubectl CLI tool to build a lot of the Object creation into muscle memory.

## The Exam
The exam is 3 hours long and consists of 24 questions in total. It is 100% hands-on and doesn't contain any multiple choice questions, this can either work for or against you depending on how comfortable you are with a terminal. As for me I'm used to sitting in a terminal, using vim as my text editor and typing away Linux commands for most of the day, because of this I was more comfortable than some would be in this situation.

As you go through the exam you'll notice that each question displays the percentage of how much it's worth in the marking criteria and it's worth noting these are you go through. A virtual notepad is available which I used to make notes of how much each question was worth and if I felt I had answered it to a satisfactory level. If not I simply wrote "Come back to" if I felt I was spending too much time on a particular question or if I didn't know how to answer it off the top of my head.

3 hours seems like a lot when you look at it but the time will quickly deplete as you go through the exam, make good use of your time and if you get stuck or you are unsure make a note of the question in the Notepad and come back to it later. I managed to answer 21/24 questions to a level where I was satisfied that I had the right answer (Although I'll never be sure) this was with 30 minutes to spare at the end. It allowed me to go back through the remaining 3 questions and work at them a little more to try and obtain some more marks from them.

## Final Thoughts
My number one suggestion is that you should try to avoid using Google while working towards the CKA exam, stick to the Kubernetes documentation as that's pretty much all that will be available to you in the exam. Gaining some familiarity for the docs will pay off for the exam as well as any additional work you end up doing with Kubernetes. The Kubernetes documentation is extremely good. In most examples you can find exactly what you need to answer an exam question (Some tweaks may be required) but instead of tearing your hair out, you should head straight to the documentation in order to prevent wasting time on your exam. I'm really just trying to hammer home how important the documentation is to you in the exam, hopefully you got that!

Despite spending 8 hours a day in the 2nd week on the CKA course I still put in an additional 2–3 hours a night into shoring up my notes, playing around with kubectl and doing a bit of reading of the documentation to fill in any gaps in knowledge I had at any point. I think this additional time paid off in the end as it helped me build up my confidence with Kubernetes and especially with kubectl.

Using the imperative way of creating resources (kubectl) but adding a few extra parameters to have the command generate the YAML for you to go the declarative route is extremely beneficial. It allows you to double check what you're doing against what the question is asking for as well as giving you a good base if you do need to edit anything. It's a win-win. 

The arguments you need for this are:
```bash 
--dry-run -o yaml | tee myyaml.yaml
```

For example:
```bash 
kubectl create deployment nginx --image=nginx --dry-run -o yaml | tee nginx.yaml
```

This will create a file called `nginx.yaml` containing the YAML needed to create a Deployment called nginx with the nginx image. From there you can edit the YAML and simply apply it!

---

Lastly, If you're going to take the CKA exam then I wish you the best of luck! I definitely preferred this hands-on exam approach as opposed to the multi-choice-a-thon exam format like some other exams have you do, but maybe that's just me.
