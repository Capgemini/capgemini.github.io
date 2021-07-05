---
layout: post
title: "DevOps Legacy"
subtitle: "(Daft Punk Soundtrack optional)"
description: "Bringing a modern culture to older projects"
category: DevOps
author: broomyocymru
tags: [DevOps, Automation, Continuous Integration, Continuous Deployment, Legacy]
comments: true
share: true
published: true
---

We all know that a DevOps culture should be a core principle of any new projects, and there's plenty of blog posts to get us started - just take a look at some of our [previous posts](/categories/#devops). But what happens when you’re running various legacy solutions created long before the concepts of DevOps were born? When we tackle legacy solutions we can apply the  cultural elements of DevOps but what about the technical ones? Much like Flynn in Tron, we strive to build a “perfect” computer system that can manage itself, but where do we start? 


###1. Metrics
How long does a deployment take? What was the downtime to the users? How much time does it take to prepare a release? How many tests have we got passing? The list is endless but we can’t definitively say we’re improving the situation until we know where we’re starting from.


###2. Developer Environments
Automation starts with the development team. A scripted environment setup allowing the team to create, update and destroy their environments is a good place to begin. For an introduction take a look at [my previous post]({% post_url 2015-10-02-developer-automation %}). This gives developers the tools to push the boundaries and experiment safe in the knowledge they can get back to a working environment no matter what. Using configuration management tools like [ansible](http://www.ansible.com/), [puppet](https://puppetlabs.com/) or [chef](https://www.chef.io/chef/) we can reuse a lot of the scripts in other environments. This consistency in setup across environments allows for reusable deployment scripts.


###3. Deployment Scripts
Deployment is often the most complex part of dealing with legacy systems. Generally speaking, most legacy systems will have a web services api, command line interface or custom scripting solution for automation. The challenge is finding enough about it in the documentation. Start by creating basic build scripts that can be run from the command line to interact with these interfaces. These small individual deployment scripts are your building blocks to more complex deployment. Sometimes this will involve creating a thin client that we can run from the command line. As with the automation of environments, giving the development team early access to the scripts will give faster feedback loops to improve the deployments further. For example, in one instance we used [IBM Websphere](http://www-01.ibm.com/software/uk/websphere/) and to automate deployments we created a thin-client with a reusable [jython](http://www.jython.org/) script to deploy WAR and EAR archives. This meant that developers could deploy updated applications without going through the web UI.


###4. Continuous Integration
Now we’ve got the scripts to deploy our code, and we can run them ad-hoc we'll want to take things further. We use CI tools to deploy artefacts to testing environments using the same scripts as we did in development and will do in production. This gives us a level of consistency and speed. Once we know the deployment is reliable and repeatable, moving the same release through all the environments isn’t the headache it once was. Continuing the Websphere example above, we installed the newly created thin-client on our jenkins infrastructure. This enabled developers to configure nightly deployments for the testing environments. This even allowed testers to deploy the latest successful builds themselves, this empowered them and free'd engineers to do other things.


###5. Analytics
Using the logs in the CI server we can go now full circle and compare how long our various deployments are taking, look for bottlenecks and try and run much of the deployments in parallel. This allows us to make changes to the script, give it to developers and repeat the process again - iterate. In our Websphere example we found a number of teams were deploying multiple applications in a single CI build, the script were changed to cater for multiple application deployments in a single request, this reduced the deployment time significantly.


## But what has any of this got to do with legacy?
Nothing! It shouldn't make any difference how many legacy solutions are involved. Legacy systems will need a little more effort to get an automation solution in place but often once you do the benefits can be significant. I'll leave you with one final Tron reference before you get back on your neon bike; with DevOps "the game has changed."
