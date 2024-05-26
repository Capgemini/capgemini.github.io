---
layout: post
title: "Navigating Kubernetes Deployments With Helmsman"
summary: "Simplify Kubernetes deployments by describing your cluster state with Helmsman"
category: Kubernetes
tags: [Kubernetes, Cloud Native, Containers, Helm]
author: [greg_wolverson]
comments: true
share: true
---

[Kubernetes](https://kubernetes.io/) is one of the most popular open-source container orchestration frameworks in use today. It allows you to easily deploy, scale and manage containerised applications. As your applications grow, the number of Kubernetes resources you have to manage increases, and that's where [Helm](https://helm.sh/) comes in. Helm is a package manager for Kubernetes, allowing you to define, install and manage complex Kubernetes clusters at scale. However, unless you want to [install](https://helm.sh/docs/helm/helm_install/) all of your [helm charts](https://helm.sh/docs/topics/charts/) individually (and possibly manually), there is a need for an automated, infrastructure-as-code approach. Enter [Helmsman](https://github.com/Praqma/helmsman#what-is-helmsman). 

## The Problem

As mentioned above, in a productionised domain, the set of deployed services and their accompanying resources will grow exponentially. Even when using a package manager like Helm, the sheer amount of deployable resources and packages can become hard to manage. 

If you have ten Helm charts to deploy, you could be running ten install and/or upgrade commands to reach the desired cluster state for any given environment. Furthermore, if you have multiple environments (dev, test, preprod, prod etc), you then have ten commands _per environment_ to run - you can quickly see how this could become difficult - not to mention inefficient - to manage. 

## An Introduction to Helmsman

Helmsman is a tool which allows you to define the desired state of your Kubernetes cluster in code, giving you the ability to deploy, upgrade or destroy that state in a single command. Each environment (`namespace` traditionally in Kubernetes) has its own state file, making managing versions and resources across environments much simpler. 

As a result of Helmsman encapsulating the state of your cluster(s) in code, you can easily describe the state of any cluster by looking at the Helmsman [desired state file](https://github.com/Praqma/helmsman/blob/master/docs/desired_state_specification.md#helmsman-desired-state-specification). This makes it easier to manage what's deployed, where and at which version.

## A Helmsman Story

Let's take an example where we have a service domain which contains four microservices. Each microservice has slightly different resources requirements (CPU/Memory) and two of them are required to integrate with a database. In non-production environments (dev, test) they are not required to be highly-available, whereas in production environments (preprod, prod) they are. 

### Basic Helm Chart

We'll create a Helm [application chart](https://helm.sh/docs/topics/charts/) that can define the Kubernetes resources required for each of our services. Our example service chart will contain some standard Kubernetes resources such as a deployment and network policy.

```
metadata:
  environment: replace-me

deployment:	
  create: false
  replicas: 1
  name: replace-me
  image: replace me 
  ports: 
    - 8080
  resources:
    requests: 
      memory: "250Mi"
      cpu: "250m"
    limits: 
      memory: "350Mi"
      cpu: "300m"

networkPolicy:
  create: false
  podSelector:
    matchLabels:
      app: replace-me 
  policyTypes:
    - Egress
  egress: {}
```

The above is heavily simplified from what a real production chart may look like, but the purpose here is just to give an example to work from later. 

Above you can see a `create: false` property on each resource, this is a practice I tend to follow when building Helm library charts, as it gives implementing charts the ability to opt-in to whichever resources they need, and not just get them implemented by default.

### Microservice Setup

Each microservice will have it's own implementation of the base chart shown above. Let's first use microservice-a as an example, which has no extra resource requirements, and no database connectivity.  

Chart.yaml

```
---
apiVersion: v2
name: service-a
description: Chart for microservice A
version: 0.1.0
dependencies:
  - name: base
    version: 1.0.0
    repository: "@base-repository"
```

values.yaml

```
base:
  deployment:	
    create: true
    replicas: 1
    name: service-a
    image: service-a:1.0.0
```

As you can see above, microservice-a has a very simple implementation of the base chart, mostly using the default values provided.

Now let's look at microservice-b. This service will have slightly higher resource requirements and will also need egress networking out to a MySQL database (running in a pod in the same namespace). 

Chart.yaml

```
---
apiVersion: v2
name: service-b
description: Chart for microservice B
version: 0.1.0
dependencies:
  - name: base
    version: 1.0.0
    repository: "@base-repository"
```

values.yaml

```
base:
  deployment:	
    create: true
    replicas: 1
    name: service-b
    image: service-b:1.0.0
    resources:
      requests: 
        memory: "500Mi"
        cpu: "350m"
      limits: 
        memory: "550Mi"
        cpu: "400m"

  networkPolicy:
    create: true
    podSelector:
      matchLabels:
        app: service-b
    policyTypes:
      - Egress
    egress:
    - to:
      - podSelector:
          matchLabels:
            app: mysql
```

### Helmsman Implementation

Now let's look at the Helmsman implementation and how it makes dealing with multi-service deployments simpler. 

Our very simple Helmsman folder structure will look as follows (showing only service-a and service-b for brevity):

```
.
├── dev.yaml        
├── test.yaml       
|── preprod.yaml    
|── prod.yaml       
└── values
    ├── service-a
        └── values-dev.yaml       
        └── values-test.yaml       
        └── values-preprod.yaml   
        └── values-prod.yaml       
    ├── service-b
        └── values-dev.yaml        
        └── values-test.yaml       
        └── values-preprod.yaml    
        └── values-prod.yaml       
```

Let's look at a desired state file and one of the values files for each service in a bit more detail to show what's happening. 

As mentioned previously, Helmsman provides a way of describing the desired state for your Kubernetes cluster. In the example we're using, we've got two clusters; non-production (containing dev and test namespaces) and production (containing preprod and prod namespaces). 

Let's take a look at the `dev.yaml` state file;

```
metadata:
  description: Desired State File for the dev environment

namespaces:
  dev: 

helmRepos:
  stable: http://custom-helm-repo-example.com

apps:
  service-a:
    namespace: dev
    enabled: true
    chart: stable/service
    version: 1.0.0
    valuesFile: values/service-a/values-dev.yaml    
  service-b:
    namespace: dev
    enabled: true
    chart: stable/service
    version: 1.0.0
    valuesFile: values/service-b/values-dev.yaml     
```

There's a few bits going on in the above state file definition, so let's break it down. 

The `namespaces` property allows you to define the namespace(s) you have or want as part of this state definition. If the namespace(s) don't exist when you run Helmsman, it will [create them](https://github.com/Praqma/helmsman/blob/master/docs/how_to/namespaces/create.md#create-namespaces) for you.

```
namespaces:
  dev:
```

The `helmRepos` property allows you to [define the Helm repositories](https://github.com/Praqma/helmsman/blob/master/docs/how_to/helm_repos/default.md) where your packaged charts are stored. There are several options for chart repositories, such as; default, private (backed by Google, AWS or basic auth) and local. 

```
helmRepos:
  stable: http://custom-helm-repo-example.com # This doesn't exist, it's just shown for example purposes
```

The [apps](https://github.com/Praqma/helmsman/blob/master/docs/desired_state_specification.md#apps) block is the most important block within the example state file shown above, it defines _all_ the services you want deploying as part of this state file. Helmsman is very powerful and provides a lot of configuration options for [deploying apps and configuring them](https://github.com/Praqma/helmsman/tree/master/docs/how_to). In the example above, we're using a simple app definition for each service. 

```
apps:
  service-a: 
    namespace: dev 
    enabled: true 
    chart: stable/service 
    version: 1.0.0 
    valuesFile: values/service-a/values-dev.yaml
```

An important property defined above is the `valuesFile` property, this tells Helmsman where the values file to be installed as part of this release is located within the Helmsman structure. 

As displayed previously, our Helmsman file structure contains the following files;

```
└── values
    ├── service-a
        └── values-dev.yaml        
    ├── service-b
        └── values-dev.yaml        
```

So when we're specifying the `valuesFile` property as `values/service-a/values-dev.yaml` it's referring to the following folder

```
└── values    
  ├── service-a
      └── values-dev.yaml        
```

Now let's look at the contents of those files - this is where the modularisation within Helmsman really shines. 

Earlier on we stated that Service A doesn't have any additional requirements beyond the standard chart specification. Whereas Service B had the additional requirements of higher resources and a connection to a MySQL database. With that being said, let's look at the `values-dev.yaml` definition for these services

#### Service A

Service A _only_ needs to specifiy the environment it sits within and some basic information about the deployment; name, image and container port, everything else is already defined in the base service chart that we're using (as defined in the Helmsman `dev.yaml` state file). 

```
metadata:
  environment: dev

deployment:	
    create: true
    name: service-a
    image: service-a:1.0.0
    containerPort: 8080
```

#### Service B

Service B on the other hand, needs a bit more configuration to meet requirements.

```
metadata:
  environment: dev

deployment:	
  create: true
  name: service-b
  image: service-b:1.0.0
  containerPort: 8080
  resources:
    requests: 
      memory: "500Mi"
      cpu: "350m"
    limits: 
      memory: "550Mi"
      cpu: "400m"

networkPolicy:
  create: true
  podSelector:
    matchLabels:
      app: service-b
  policyTypes:
    - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: mysql
```

For the Service B `values-dev.yaml` file we have specified the environment, deployment and networkPolicy configuration values. This has allowed us to _override_ and add to the values that are defined in the base service chart we're using as part of this deployment.

As our project grows, we can easily add more services to our desired state file(s), making the management of our environments much simpler than if we had to manage all the helm charts individually.

### Bringing It All Together

So now we have our example Helmsman project setup, with our desired state file(s) ready to provision services into our cluster. All we need to do now is issue certain Helmsman commands and we'll have our services running in no time. Ideally, you'd [run Helmsman from CI pipelines](https://github.com/Praqma/helmsman/blob/master/docs/how_to/deployments/ci.md#run-helmsman-in-ci), but that goes beyond the scope of this post. We'll now take a look a few of the more widely used commands.

#### Dry Run

A _really_  useful feature of Helmsman is the ability to use `dry-run`. This allows you to point Helmsman at one of your desired state files and do a dry-run installation against your cluster. The benefit of this is you get to see the rendered Kubernetes manifests that would be installed, and can easily verify and validate that the manifests to be installed are correct, without them actually being installed. 

`helmsman -f dev.yml --dry-run`

#### Apply

Next up is the `apply` command. This applies your desired state file to your kubernetes cluster, installing all the resources via Helm.

`helmsman -f dev.yml --apply`

#### Destroy

Another useful command is the `destroy` command. This tears down your cluster based on the desired state file - this is useful if you want to tear down environments quickly or nightly to save costs.

`helmsman -f dev.yml --destroy`

## Wrapping Up

Although this post has only shown a very simple example project, hopefully you can see how Helmsman is a very useful tool for managing our Kubernetes environments. As service domains grow, so do the amount of resources we need to keep track of and implement to keep everything ticking along. Rather than trying to keep a handle on all of those resources manually, it's better to leverage specific tooling (like Helmsman) to provide consistency, efficiency and a much better developer experience!

Helmsman is just one approach to managing your kubernetes environments, and is a good entryway to more GitOps style approaches such as [FluxCD](https://fluxcd.io/) or [ArgoCD](https://argo-cd.readthedocs.io/en/stable/) (among others).

You can see all the code for an example service scenario like the one described in this post [over on my github](https://github.com/gwolverson/helmsman-demo).

