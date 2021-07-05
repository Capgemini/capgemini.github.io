---
layout: post
title: "A look at Cloud-Native Apps on Azure"
subtitle: "A framework for building Cloud Native Apps on the Microsoft Azure Cloud"
description: "What are Cloud Native Apps, why should we build them and what services are available for building them on the Microsoft Azure Cloud."
category: Cloud
author: ian_crow
tags: [Microsoft, Azure, Cloud]
comments: true
share: true
---

Organisations are using software as a key differentiator and source of competitive advantage. Whilst we often think about technology-led companies, such as Netflix and Uber, it is transforming all types of organisation. The cloud supports this transformation, and we are seeing big shifts to development of applications on cloud platforms. Whilst cost reduction may be a big factor in the move, it is the speed and flexibility provided by cloud services that companies can use to accelerate business velocity and growth.  

## What are Cloud-Native Apps?
The term **Cloud-Native App** is used to describe an application that is built for the cloud on the cloud. In this blog post we will talk about some of the characteristics of cloud-native applications and explore a framework for building them in the Microsoft Azure cloud.

By responding to change quickly companies can gain competitive advantage; building new environments in hours not weeks, releasing new features continuously and creating new business opportunities through innovation. Software systems should adapt easily to business demands. But how?

The term **Antifragile** is used to refer to software systems that deal with the disorder of change better. Cloud-native applications embrace the "antifragility" that the cloud has to offer, making extensive use of Platform as a Service (PaaS) managed services. In addition cloud-native applications are designed and built using architecture styles that better accommodate change. Among the characteristics of cloud-native apps are: 

- **Microservice-based** to significantly increase the overall agility and maintainability of applications with loosely-coupled, autonomous services that facilitate change. 
- **Containerized** to quickly move, enhance and scale applications with independent containers enabling modular development and deployment. 
- **Operate on managed platforms** to reduce cost of operation through efficient use of resources with high levels of resilience and scalability; and benefit from features such as auto-scaling to allow the system to change to demands. 
- **DevOps** to remove organizational and cultural inhibitors in a move toward continuous delivery and end-to-end automation for the application lifecycle; and reduce the risk of introducing new software into production even allowing for experimentation. 

### Azure Services for Cloud-Native Apps
So now we hopefully have an idea of what cloud-native is and means to us, let's look at what the Azure cloud offers to build cloud-native applications. 

Azure cloud provides a range of compute services as shown in Figure 1. A key difference in these services is the level of control that can be exercised over the environment. Offset this against the effort required to design, set-up and operate it, and make applications resilient, scalable and supported. By giving over control of managing the platform to the cloud providers, we can meet the characteristics we set out for cloud-native apps and focus effort on the real business value of developing software. 

<figure>
  <img src="/images/2018-03-09-cloud-native-apps-on-azure/azure_compute_services.png" alt="Azure compute services" />
  <figcaption>Figure 1: Microsoft Azure Compute Service Categories</figcaption>
</figure>

- **Virtual Machines** - An Infrastructure as a Service (IaaS) offering that provides maximum control over the hosting environment and support for legacy workloads. Consumers are responsible for operational activities such as server patching and monitoring. 
- **Virtual Machine Scale Sets** - Provides services on top of Virtual Machines where you need to deploy large numbers of identical servers with load balancing and auto-scale, reducing some operational overhead. 
- **Containers** - Provides traditional container orchestrators (Docker, Kubernetes, Mesos) as well as Microsoft's Service Fabric for building managed microservices applications that are resilient and scalable, and support Linux and Windows platforms. 
- **App Services** - A fully managed and scalable Platform as a Service (PaaS) offering for Web, Mobile and API applications, which removes a lot of the management overhead, yet provides flexibility with support for multiple platforms (Windows/Linux) and languages (.NET, Node.js, PHP, Java, Python).  
- **Serverless** - Provides an on-demand and scalable execution model for coded functions in multiple programming languages, so that you pay only for the time the code is executing, from the point at which it is triggered to completion. 

A detailed comparison of these compute services is beyond the scope of this article, but it should be apparent that our characteristics for cloud-native apps can be best met by Container, App Services and Serverless compute. They are managed services that support the ability to build microservice-based architectures in a containerized deployment model with support for DevOps tooling and automation. Whilst IaaS could be made to support these characteristics, a lot more effort has to be made in the set up and management, reducing our ability to quickly respond to change.

We should also distinguish between some of the Container offerings and the App Service and Serverless ones. The underlying infrastructure is less abstracted away with Container services and we still have some management overhead, for example patching the servers the containers run on. They do however have the advantage of being more portable across different cloud platforms if that is a concern for you.

### Completing the picture

In addition to the compute services already described, Azure offers a range of other managed services to enable development of end-to-end applications. 

- **Storage** - Managed storage for logs, document and media files (e.g. Blobs and SMB File services). 
- **Data** - Relational and NoSQL databases, caching and search services (e.g. SQL Azure, Cosmos DB, Redis Cache, Azure Search). 
- **Messaging** - Queues and subscriptions (e.g. Azure Service Bus). 
- **Security** - Authentication services (e.g. Azure AD). 
- **Network** - Traffic management, content delivery, load balancing and network virtual appliances. 

Specialised or more advanced apps can make use of additional services for Artificial Intelligence, Analytics and Event driven architectures (such as IoT) and integration for hybrid scenarios.

Putting all of this together, figure 2 shows a framework for building cloud-native applications on Azure. Other cloud platforms do provide similar offerings. If you are not using Azure, hopefully this article has given you some things to look out for on your cloud platform to build cloud-native apps that respond to change and enable you to work at the pace your business demands.

<figure>
  <img src="/images/2018-03-09-cloud-native-apps-on-azure/azure_cloud_native_apps.png" alt="Azure compute services" />
  <figcaption>Figure 2: Azure Cloud-Native Application Framework</figcaption>
</figure>   
