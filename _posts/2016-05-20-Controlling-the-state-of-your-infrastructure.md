---
layout: post
title: "Controlling the state of your infrastructure"
category: DevOps
author: alberto_lamela
description: "Deploying and evolving the infrastructure for Mesos and Kubernetes"
tags: [Development, DevOps, Open source, Terraform, Golang, Apollo, Kubeform]
comments: true
share: true
---

It is now a necessity to be able to rapidly and easily deploy and evolve a platform where your apps will be running. In order to do this you need to manage your own compute resources in a given cloud and follow patterns using infrastructure as code.

[Terraform](https://www.terraform.io/) exists for this purpose. It gives you a single view of your entire infrastructure by providing a common domain specific language for every cloud while using the specific APIs underneath.

Terraform keeps track of how your infrastructure evolves by using a [state](https://www.terraform.io/docs/state/index.html) file. When working in a team environment you can make use of the [remote state](https://www.terraform.io/docs/state/remote/index.html) feature. This will help to avoid conflicts, delegate the outputs between teams, and create a smoother workflow.

It would look something like this:

![terraform remote state](/images/2016-05-20-Controlling-the-state-of-your-infrastructure/terraform-remote-state-diagram.png)

However this won't help you to safely run Terraform in parallel. Issues may occur as a result of engineers applying changes at the same time and using stale versions of the state. If this is a must for your use case [Atlas by HashiCorp](https://www.hashicorp.com/atlas.html) is a commercial service that allows you to run Terraform in parallel safely by handling infrastructure locking among other features.
 
So we had this idea of having the full workflow controlled by an on-premise solution for managing and evolving the state while safely running Terraform in parallel driven by continuous integration. The changes should be kept in a history accessible on a web UI. This would provide an immediate way to visualize and track the development of the state of any platform for a team.

The web UI is built on top of this nice [React/Redux universal example](https://github.com/erikras/react-redux-universal-hot-example).

As Terraform is built with [Go](https://golang.org/), we were thinking on locking environments and Go has rich support for concurrency, it just seemed a natural choice for the backend.

So I started to do some research and these are some good resources that I found pretty useful, including the official docs, where you can see and run examples straight away:

[https://golang.org/pkg/sync/#example_Once](https://golang.org/pkg/sync/#example_Once)

[https://gobyexample.com/](https://gobyexample.com/)

[https://tour.golang.org/concurrency/1](https://tour.golang.org/concurrency/1)

[https://github.com/golang/go/wiki/LearnConcurrency](https://github.com/golang/go/wiki/LearnConcurrency)

[https://golang.org/doc/effective_go.html](https://golang.org/doc/effective_go.html)

As my knowledge on Go is quite limited, I was looking for Go projects to help me to take off when [Otto](https://github.com/hashicorp/otto) came to my mind. As Otto runs Terraform behind the scenes for generating infrastructure it was the boost that I needed to get started so we got cracking and we built [Terraform-Control](https://github.com/Capgemini/terraform-control). It may well happen to be the foundation for a usable solution in the future but has no more ambition than serving as a simple PoC at the moment.

The workflow now looks a bit like this:

![terraform control diagram](/images/2016-05-20-Controlling-the-state-of-your-infrastructure/terraform-control-diagram.png)

And as we have automated the deployment of opinionated platforms on top of [Mesos](https://github.com/capgemini/apollo) and [Kubernetes](https://github.com/capgemini/kubeform) you can see a full demo deploying and evolving the infrastructure for both clusters here:

<div class="medium-8 small-centered columns">
  <div class="flex-video">
    <iframe width="640" height="360" src="https://www.youtube.com/embed/5eClxFWK_Ec" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

So if you have similar necessities for using Terraform in a team environment and you like what you see, please feel free to drop a comment or [create an issue sharing your ideas](https://github.com/Capgemini/terraform-control).