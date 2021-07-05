---
layout: post
title: Change your debugging mindset
description: >-
  One rule for debugging like a pro
category: Development
author: phil_hardwick
tags: [Development]
share: true
published: true
mathjax: false
featured: false
---

I learnt to code at a bootcamp organised by Capgemini and delivered by QA in the first 13 weeks of my apprenticeship. Undoubtedly the best thing I got out of that was a nugget of wisdom which has stayed with me for the whole of my short career and probably will for the rest my years.

Knowing it has saved hours and hours of my time. I'm much better at debugging than I would be otherwise and can find what's wrong in a system much more efficiently. That wisdom is, "<span class='pullquote'>Think of the most obvious thing that could be going wrong and it's probably that</span>".

I've found this to be true 90% of the time. Yes, sometimes you need to delve into the infrastructure, inspect the packets with tcpdump, watch the TCP connections occur, but most of the time it's the simplest possible thing which is stopping your system from working. For example:
 * If your application is not working: is it running? Are you looking in the right place? Is it deployed?
 * If some functionality is not working: is it configured?

One of my colleagues, James Gee, put it another way which is just as helpful to think about, "<span class='pullquote'>What are you assuming?</span>". When you're investigating why your test or application isn't functioning as expected, what are you assuming? You may be assuming you know which port it's running on, you may be assuming the database is set up, you may be assuming the application is connecting to the right database.

Question is, how can you know your assumptions are correct?

In approaching debugging I would advise anyone to make a list of the simplest possible things that could be going wrong and then check each one in order of how likely you think it is. Once you get good at this you can do this in your mind but starting out I would recommend writing it out as it helps your brain develop the process. Even if you think you know the database is setup, check it anyway, it's an assumption and you don't know whether (if it's a shared database between the team) someone has rebuilt/reset it between now and the last time you used it.

This works well alongside the [rubber duck debugging][rubber_duck] technique. If you're asked to be someone's rubber duck then I think your questions should be around "What are you assuming?", "What's the simplest, most likely reason for this not working?", "How do you know?" and "Show me". These questions are good for teaching without telling, so that team members work out the knowledge for themselves, therefore making it more memorable. 

Answering these questions gets harder with a microservices architecture or even just a service oriented architecture.
 
"We replaced our monolith with micro services so that every outage could be more like a murder mystery." [@honest_status][honest_status]

The questions are the same in the "murder mystery" microservices scenario but the possible culprits are numerous. It require more knowledge of the system to debug efficiently and a keen understanding to prioritise what could be going wrong most frequently.
 
In conclusion, there's only one message to this post but it's saved me countless hours and it'll save you hours too: "What's the most obvious thing that could be going wrong? Because it's probably that".

[honest_status]: https://twitter.com/honest_update/status/651897353889259520?lang=en
[rubber_duck]: https://rubberduckdebugging.com/
