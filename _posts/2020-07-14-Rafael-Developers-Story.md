---
layout: post
title: "Rafael: A Developers Story"
subtitle: "The personal story of the developers that assembled and brought you Rafael"
category: Development
tags: [Development, Cloud, COVID-19, App]
author: [cburns]
comments: true
draft: false
share: true
---

As the global population live in angst about humanity’s future, there are industries across the world that are being stretched to the peak of their abilities in ways never seen before. The healthcare sector is one of those industries. It is reasonable to say that the capabilities of healthcare systems across the world were the most crucially needed systems this year. Without a sound healthcare system in a global pandemic, you severely limit the capabilities and services that you can provide. This is both a physical truth with regards to the ability to scale the amount of hospital beds available during a spike of A&E admissions, and it is also a technological truth with regards to having the technology available to efficiently test, treat and track patients. Of course, like many global crises many people suffer from both physical and emotional damage, there are always the visionaries that come together to provide aid. In this instance a COVID-19 task force was assembled consisting of 18 engineers in [Capgemini Bordeaux](https://www.capgemini.com/fr-fr/capgemini-a-bordeaux/) with backing from the health support team at the [University Hospital of Bordeaux](https://www.chu-bordeaux.fr/Professionnels-recherche/Ange-Gardien-Rafael/) to bring you Rafael.

Unlike the typical blog post you’re used to reading from me, this one will be taking on a slightly different form. I will be providing an interview with one of the lead engineers behind Rafael – a COVID-19 tracking application. We will be discussing Rafael and its development methodologies, technology inside of today’s healthcare systems and the potential impact COVID-19 will have on the responsibility technology plays in future healthcare systems.

## What is Rafael?
Rafael is a COVID-19 tracking application that has been created by Capgemini Bordeaux with the help of the healthcare support team at the University Hospital of Bordeaux. It focuses on identifying potential COVID-19 hosts with additional functionality enabling a follow up of suspected/confirmed patients. This allows for the quick response by physicians to minimise the possibility of a further spread.

The below image describes the context in a bit more detail alongside the final application's solution flow.

![Rafael Context Overview](/images/2020-07-14-Rafael-Developers-Story/rafael-context-overview.jpg)

When a user opens Rafael, they are met with a screen where they fill with their information and symptoms for further evaluation. If the user is identified to have serious symptoms then they will be swiftly contacted by a physician.

![Rafael Patient Questionnaire](/images/2020-07-14-Rafael-Developers-Story/rafael-patient-questionnaire.jpg)

For a physician, there will be many potential patients that will need care. The following Crisis Center Dashboard allows physicians to see patients’ states sorted by the seriousness of their symptoms. This allows for physicians to be aware of those with the most serious conditions and symptoms so they can act faster to care to them.

![Rafael Crisis Dashboard](/images/2020-07-14-Rafael-Developers-Story/rafael-crisis-dashboard.jpg)

<div class="small-12 medium-8 large-4 small-centered columns">
  <div class="flex-video">
    <iframe width="640" height="360" src="https://www.youtube.com/embed/oL3L-Ac8LiM" frameborder="0" allowfullscreen></iframe>
  </div>
</div>


## The Story
In this troubling time, you and your team have stepped up to the plate and assembled a COVID-19 task force, but do you mind telling us a bit about who you are, what you do and what brought you to Capgemini?

_"Sure, my name is Mohamed Akdim and I’m a 29-year-old Lead Software Engineer and Junior Architect at the healthcare department of Capgemini Bordeaux. My journey at Capgemini began on 2014 as an intern. The diversity and innovation of the projects were key parts in me joining the Capgemini team. In fact, I had the opportunity to work with skilful teams on multiple business domains including Transports, Public services and the Wine industry. I had the chance to use one of the more popular Cloud Providers Microsoft Azure and had a chance to learn Reactive programming and AI."_

[Reactive programming](https://medium.com/@kevalpatel2106/what-is-reactive-programming-da37c1611382) can be quite a learning curve to those coming from the more popular imperative paradigm – I can imagine it came with its challenges alongside learning Cloud engineering and AI?

_"It did, all these challenges were very instructive to my career and kept me seeking for new ones. It was in-fact the same mindset that eventually led me to work on one of the most challenging projects: the build of Rafael Platform - a part of a bigger program called ["Ange Gardien"](https://www.chu-bordeaux.fr/Professionnels-recherche/Recherche-clinique-et-Innovation/Actualit%C3%A9s-recherche-clinique-et-innovation-CHU-de-Bordeaux/Projet-Ange-Gardien-relier-m%C3%A9decins-lib%C3%A9raux-et-m%C3%A9decins-du-CHU/)’ which is a collaboration between the University Hospital of Bordeaux, multiple healthcare actors in the region and Capgemini."_

### The Impacts of COVID-19
Coming from personal experience, I can attest that my life has changed dramatically since the beginning of 2020 as I am now working from home, and I’ve even spent significantly less money – which I’m never going to complain about. Have you also experienced a drastic change in your life? If so, what is different now than before?

_"The impact of the COVID-19 pandemic is huge on one’s life. Everything has changed during the pandemic with the period of confinement. It was a tough experience to stay at home, not hanging with friends and colleagues, and being away from family. Although, the fact that we were directly involved in the outbreak with the development of Rafael was very helpful in some way, kind of being on duty. In fact, the French president Mr Macron has declared war upon the virus. Thus, we were participating as a team in this national effort by facilitating the support and management of COVID-19 patients. This gave us the strength to work hard and to fulfil the development of the app in a very efficient way."_

That’s very interesting how you feel like it is like being on duty. I do admit, I find it very intriguing how differently world leaders have faced this pandemic. Some have followed science and nothing else, some have carried on as normal, and as you stated, some have declared war. It’s especially interesting with regards to the political landscape too as over the years when something happens on a global scale, USA are normally one of the self-appointed leaders (the Ebola Virus pandemic) however with the COVID-19 pandemic it seems that nations across the globe have taken their own path, and what’s most interesting is the cultures reactions to said paths.
One type of reaction that we’ve seen many times over in multiple different nations around the world is the rise of the innovators. Many individuals like yourself have taken up the initiative to help create a solution that aids in the handling of the virus. With relation to this, how do you feel about the impact such solutions/apps have had towards COVID-19 and how do you feel being a part of that impact?

_"I believe the app had a significant impact in the region. More than 2000 COVID-19 patients were able to be managed via the app. Each patient had a personalised follow-up by healthcare professionals. About 10,000 physicians were registered in the app. Each physician was able to monitor the health state of their patients remotely, therefore reducing the risk of contamination between patients and diminishing the spread of the outbreak. The enablement of flagging and alerting mechanisms has helped the health support team to take quick decisions and act effectively._
_Obviously, I’m very proud of what we’ve done so far, and I look forward for the upcoming challenges."_

It sounds like you’ve really hit a chord with the healthcare support team with so many individuals being registered to the app. Are there any patient/health worker anecdotes you care to share with us?

_"The health support team members at the University Hospital of Bordeaux were very satisfied by the application Rafael, as they could easily manage more than 200 patients daily. ‘The patient management workflow is very intuitive and facilitates greatly our work.’ said one of the physicians at a debriefing meeting."_

I’ve always learned that no matter how good you feel your product is, if nobody wants to use it, it is a bad product. Rafael however seems to have really resonated with those who use it which is the most important factor. If people like using it, you’re onto a winner. Not to mention it looks great from a user interface perspective.

### Applications in Healthcare
Moving onto apps in general with regards to their impact on healthcare, what are the more recent impressions you get from the healthcare sector with respects to using apps?

_"I think that healthcare apps are reshaping the picture around patient management. It improves patient experience, especially with regard to accessing health information and making doctor/patient communication more convenient and straightforward, ensuring transparency in medical charge, and ameliorating short-term outcomes. Patient's background medical data is easily accessible, thus helps to improve the efficiency of the diagnosis. In addition to that, the emergence of mobile health apps has helped to overcome geographical and organisational barriers to improve healthcare delivery to everyone."_

I completely agree in that it improves the patient experience. I also find a particular point very interesting that was made by Yuval Noah Harari in his book 21 Lessons for the 21st Century that with the rise of big data and AI, it’s not hard to imagine a future where we have an increased presence of AI robots in healthcare. He then goes on to make the point that it will be much easier reduce fatality rates worldwide that are due to out of date medical knowledge. Normally it can take quite a bit of time for crucial and ground-breaking up-to-date medical information to make its way from the Harvard University Lab it was discovered in, to a poverty-stricken rural village in Ethiopia. Whereas with the help of big data and AI, these ground-breaking medical updates can be pushed to all robots around the world within seconds – improving the integration of updated medical knowledge exponentially. Thus, allowing all medical practitioners around the world to share a single source of regularly updated truth. With this example in mind, how do you feel technologically will evolve in the future to help people? Does Harari’s example make you more optimistic that a utopian future is possible, or do you see a more dystopian horizon?

_"I strongly believe that we’re only scratching the surface. For example, teleconsulting will be done more easily and widely. The precision of medical diagnosis is improving continuously. Of course, IOT’s latest outstanding progress is helping to overcome some technical barriers, leading to more connected objects with more precise measurements. Last but not least, the melding of AI and Big Data has a tremendous potential in the healthcare industry. Practitioners and especially patients will have a set of tools that can guide them to take quick and critical saving life decisions. Healthcare technology has a bright future for sure."_

I completely agree, very valid points you put forward, I too am optimistic about the future but at the same time I am certainly not forgetting that the potential chance of dystopia is still possible.

### What other industries will Engineers step into?
Bringing it closer to our beloved area of software engineering, it is true that when we think about medicine and healthcare, traditionally we think of doctors and nurses – not software engineers. What other industries or systems do you think engineers might get involved in, especially as we learn to connect remotely?

_"Of course, some jobs simply can’t be done at home. But the pandemic is accelerating the trend, possibly for the long term and for larger opportunities. For example, many innovative companies are using Virtual Reality to develop digital offices that mimic real-world office spaces. This scenario makes it much easier to allow certain professions to be conducted remotely, such as Virtual Operations Managers, Market/Financial Managers, and of course Medical and Health Management Professions."_

That’s a very interesting thought, I've written a few posts about the [impacts that COVID-19](https://chrisjburns.com/posts/2020-04-01-impact-of-covid-19-on-remote-working/) had on remote working and [how I feel the government should incentivise it](https://chrisjburns.com/posts/2020-05-20-should-the-government-incentivise-remote-working/) and one of the downsides of remote working I mentioned was the obvious lack of social contact which is inescapable. I was actually entirely convinced that we had no solution to this yet, but the idea of a Virtual Reality office where employees are able to connect into to feel more involved socially is absolutely genius. I’d definitely be interested to see how that technology evolves in the near future where remote working is still at the forefront of everyone’s minds.

### The Development of Rafael
Moving on to how the Rafael was developed, do you mind going into how long it took you and your team to get from ideation to delivery?

_"It took us 5 days to deliver the MVP of the application Rafael COVID-19. Afterwards, we continued to enrich the application by providing multiple evolutions and support."_

Wow! 5 days is incredible. Especially with balancing the pressure of the ever-growing dynamic of COVID-19. Capgemini has really stepped up with regards to placing ourselves on the front-lines of getting solutions out to the world. Just a few weeks back we also had another Capgemini team work closely with HMRC in the United Kingdom to [release the furlough portal](https://www.accountingweb.co.uk/tax/hmrc-policy/furlough-scheme-portal-opens-for-claims-on-20-april). Something which has been undeniably foundational in the reasons for why citizens of the UK have been able to afford basic necessities.

Was there much support/backing from your project?

_"We had overwhelming support from every actor inside the project. Thanks to our decision makers, we quickly had access to every resource needed in order to work effectively, including both human or technical resources. Everyone was fully committed to conclude the mission successfully."_

You mentioned having quick access to technical resources, were there any colleagues that helped with technical/personal support?

_"Yes definitely! We were a task force COVID-19 team. I had the chance to work with professional, skilful and fully committed teammates. It's thanks to them that the application was successfully delivered with high quality standards in a very short amount of time. I would like to take this opportunity to thank every actor inside the project for the great collaboration and commitment shown during this period."_

### The Technology under Rafael's hood
Lastly, it wouldn’t be an engineering blog if we didn’t talk a bit about the technical aspects of Rafael. My first question is based around security. As you’re probably aware, in a world where surveillance and data breaches are a top concern for many people, the topic of security when it comes to health systems is incredibly important to people - for the obvious reasons. In many cases, not being completely in control of the security of a system can be a matter between life and death. Do you mind sharing any security best practises you followed that ensured that the app was secure and reliable and safe from malicious attack?

_"Privacy and security in healthcare apps are both major concerns in our work and we take it very seriously. Of course, one of the crucial points is to follow up the [OWASP recommendations](https://owasp.org/www-project-top-ten/). We must ensure that every developer had security mindset since the beginning. This is done by making multiple security supports and formations available to everyone, in parallel to continuous code reviews and security mobs.
The authentication/authorisation parts are implemented with the most proven standards such as OpenID Connect and OAuth 2.0. In addition to this, we do use double authentication to guarantee a more secured platform. On the technology stack level, we make sure to use the most secured and updated frameworks with the latest security patches, without forgetting data encryption on each level: data exchange, HTTPS, SSL/TLS etc"_

With just five days between ideation and delivery, I can imagine with such a pressure you must have been met with some technical challenges when designing, developing and delivering Rafael.

_"One of the biggest challenges was to use the reactive programming model in the development of the app. This model is built around data streams and consists on a non-blocking, event-driven applications that scale with a small number of threads with backpressure as a key ingredient. The main purpose is to ensure high availability under intensive workloads. The learning curve is a bit tricky, but the advantages of this model are huge with great potential."_

One of the core principles we follow in our team at Capgemini to get up and running and delivering at a fast pace is to have a CI/CD platform and pipeline setup for your applications as early as possible. Was this the same on Rafael? Also, what other software methodologies did you follow in order to best deliver the app?

_"Here at the healthcare department in Bordeaux, our projects are fully Agile. We use Scrum in order to improve the productivity and the quality of the application with small feedback loops. This method allows us to be highly reactive by reducing time to market. This was a crucial point in the development of Rafael Covid-19 app during the outbreak. Besides, we rely on Capgemini’s Production line to ensure CI/CD. We follow DevOps principles in order to shorten the development life cycle and provide continuous delivery. This is made possible thanks to our highly competent DevOps team."_

As you mentioned previously with regards to the purposes of using of Reactive programming, high scalability and high availability under intensive workloads is absolutely crucial for healthcare systems. The healthcare systems are not like media streaming sites where if the website is down for one hour, nobody dies. In healthcare systems, being highly scalable and available are absolutely fundamental to human life and are on the same level of importance as security. Now, as healthcare apps are by nature mandated to be reliable and available, how did you ensure that the apps were highly scalable and highly available under intensive workloads? 

_"Rafael is based on micro services architecture which is deployed on the Microsoft Azure Cloud. This ensures a highly scalable, performant and resilient application. Each microservice is able to scale with the entire system without suffering from performance problems. Our platform implements the common patterns in distributed systems including configuration management, service discovery, circuit breakers, intelligent routing, event bus, distributed sessions, etc. All these aspects combined with the reactive programming model guarantee a high scalability and availability levels of the platform."_

It's really something amazing that your team managed to deliver an app with such important functionality within five days and it’s even more impressive that you managed to implement very modern paradigms on such short notice, at such great pressure in a landscape where every waking day could bring something completely different. Many companies are still debating whether they should bite the bullet and break up their monolith to microservices. So, I personally would like to congratulate you guys on what you’ve achieved in the time period and thank you for talking with me.

## Rolling Credits
I’m not often a fan of film credits but I feel in this case it’s important and recognition goes a long way in our line of work, with that in mind, here is a list of the team's names and their roles within the development of Rafael and once again, thank you for reading we hope you enjoyed.

- Benjamin Richard - Chief Information Security Officer
- Cendrine Fillioux - Engagement Manager
- Ulysse Moutard - Delivery Executive
- Alexandre Ripart - Project Manager
- Valentin Arbez - Product Owner
- Selma Menja - Product Owner
- Pierre Laprade - Scrum Master
- Matthieu Ruelle - Scrum Master
- Eric Gauchery - Cloud Architect
- Olivier Bethery - Architect
- Xavier Sicard - Architect
- Laurent Duhart - Tech Lead (Mobile)
- Mohamed Akdim - Tech Lead (Back-End)
- Thomas Joubert - Tech Lead Shared Services
- Maxime Pomier - Developer
- Maud Si Mansour - Front-End Developer
- Alexis Jonot - Back-End Developer
- Nicolas Saucisse - Web Developer
- Alexandre Blin - UX Integration
- Théo Pauliat - UX/UI

