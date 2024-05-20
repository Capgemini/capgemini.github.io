---
layout: post
title: "Externalizing Spring Boot Config with Kubernetes"
subtitle: "An approach to utilising kubernetes config maps to externalize spring boot config"
category: Engineering
tags: [Engineering, Kubernetes, Spring]
author: [greg_wolverson]
comments: true
draft: false
share: true
---

Spring Boot and Kubernetes go hand in hand when building modern microservices. [Spring Boot](https://spring.io/projects/spring-boot) is a widely used JVM-based framework which allows you to build out stand-alone, production grade applications. [Kubernetes](https://kubernetes.io/) is an open source container management and orchestration system, which makes it quick and easy to deploy and manage those production grade applications. 

## Setting The Scene

I've recently been working on a project where we're writing Spring Boot microservices, which are being deployed into a Kubernetes cluster. My previous experience has primarily been with [Docker Swarm](https://docs.docker.com/engine/swarm/) up until this project, so it's been an interesting switch with different challenges. One of those challenges was how to externalize the Spring Boot configuration within the Kubernetes cluster, I'd thought it would be similar to Docker Swarm, but there were several differences I found along the way. 

In Docker Swarm, you [deploy services via a stack file](https://docs.docker.com/engine/swarm/stack-deploy/), this is very similar to docker-compose for those familiar with that approach. You can define environment variables in the stacks files which are then passed to the running containers. 

In Kubernetes, everything is a resource, and you [manage those resources](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/) through manifest files. Similarly to Docker Swarm, you can [define environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/#define-an-environment-variable-for-a-container) for your Kubernetes Pods and Deployments within those manifest files. Defining environment variables within a manifest file is really useful, as it allows you to abstract configuration values away from the application you're building. However, it can become difficult when you have a lot of configuration that you want to abstract, on the one hand, you want to abstract that configuration to separate the concerns between the application and the resource management, on the other, you don't want the resource definition (manifest file in Kubernetes) becoming overly verbose and unreadable.

Enter ConfigMaps. 


## The Humble ConfigMap

[ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) in Kubernetes are a great way of abstracting your configuration values away from your application, and also decoupling your configuration from your image, which ensures your application is more portable.

A great usage of ConfigMaps is to externalize your Spring Boot configuration away from your application. If we're building applications in the right way, most production grade services will have gone through various environments before finally being deployed into production. Within each environment, resources are likely to be different, even from the most basic aspects such as datasource endpoints. One of the best things about building containerised applications, is it gives you the ability to ensure your application operates consistently in each environment. One key enabler of this is to externalize your configuration. That way, the image you build doesn't change throughout each environment, only the configuration that gets injected into it. 

By using a ConfigMap, you ensure you keep your application image the same in every environment, you abstract your application configuration away from the application itself and you have a specific, separated resource to manage that configuration. 

## A Datasource Story

A good example (I find) of externalized configuration is for a datasource. I'm sure many of you reading this have, at some point, had multiple configuration entries in your application for your datasource in each environment, I know I have. From experience, I find this bad practice for several reasons; it bloats your application configuration in your service, it ties your configuration to your service code and it means you have to update that application code (and therefore your image) for each environment you want to deploy into. 

An alternative approach, and an approach I've taken on my current project, is to utilise Kubernetes ConfigMaps to hold the configuration for our Spring Boot services. 

To show the approach I've taken, I'll run through an example of configuring a datasource for a Spring Boot application and externalizing that configuration with a Kubernetes ConfigMap.

### The Datasource Configuration

Let's say we have a simple Spring Boot application, which connects to a MySQL (other databases are available) instance. We have the following configuration in our `application.yml` file:

```
example:
  datasource:
    url: jdbc:mysql://localhost/example
    username: local-user
    password: local-password
```

When the application is running, the above configuration will allow us to connect to a *local* MySQL instance, great! 

Now let's say we know we've got at least 2 other environments we'll be deploying to before production. We could update our configuration as follows:

```
example:
  datasource:
    url: jdbc:mysql://localhost/example
    username: local-user
    password: local-password

---
spring:
  config:
    activate:
      on-profile: dev 
  datasource:
    url: jdbc:mysql://dev/example
    username: dev-user
    password: dev-password
---    
spring:
  config:
    activate:
      on-profile: pre-prod 
  datasource:
    url: jdbc:mysql://pre-prod/example
    username: pre-prod-user
    password: pre-prod-password
```

The above is fine, it'll likely work and get the job done. However, what happens if the endpoint changes in dev? Or the username gets changed in pre-prod? We'd need to make application code changes, re-build the image and then re-deploy to each environment. Another major flaw to this approach is that you're keeping sensitive data such as usernames and passwords in your application code, which is a major security issue for production grade applications.

An alternative approach would be to use [Spring Boot externalized configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config) using property place-holders to abstract the actual property values away from the application code, like so:

```
example:
  datasource:
    url: jdbc:mysql://localhost/example
    username: local-user
    password: local-password

---
spring:
  config:
    activate:
      on-profile: dev 
  datasource:
    url: ${example.datasource.url}
    username: ${example.datasource.username}
    password: ${example.datasource.password}
---    
spring:
  config:
    activate:
      on-profile: pre-prod 
  datasource:
    url: ${example.datasource.url}
    username: ${example.datasource.username}
    password: ${example.datasource.password}
```

This approach gives you far greater flexibility; you don't have to change application code each time your configuration changes, the same image can be promoted through each environment and you abstract your configuration values away from your application code.

### Creating The Image

Now that we've created the configuration file for our application, we want to build it as a Docker image. This is really simple, but you can make it as sophisticated or complex as you like, depending on the requirements you have for the image you're building. 

In this example, I've used Maven to build the application, so assuming we've run a `mvn clean install` prior to building the image, we have the built jar file ready to go. 

We can create a very simple Dockerfile:

```
FROM openjdk:11-slim

COPY target/*.jar app.jar

CMD java -jar app.jar
```

The above Dockerfile uses the `openjdk:11-slim` base image, copies the jar file we created earlier from the `mvn clean install` and runs a Docker `CMD` to execute that jar file. 

Now we can run a docker build to create the above image ready for use:

```
docker build -t config-demo .
```

### The ConfigMap

As mentioned previously, Kubernetes has a specific resource type for managing config resources: the ConfigMap. In order for us to abstract our datasource configuration from above in the Kubernetes space, we can create a ConfigMap with the desired values. It's worth noting there are several different ways this can be achieved, in this example though, I've used the [spring application json](https://www.baeldung.com/spring-boot-json-properties) method. 

There are multiple ways of creating a ConfigMap in Kubernetes, most commonly using [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/). In this example we create the ConfigMap from a file called `dev-configmap.yaml` with the following contents:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: spring-config
data:
  dev-config.json:
    '{
      "example.datasource.url": "jdbc:mysql://dev-endpoint/example",
      "example.datasource.username": "dev-root",
      "example.datasource.password": "dev-pass"
     }'
```

In the file above, we create a resource kind of `ConfigMap` called `spring-config` - the name is important as we'll need to know this in order to refer to it later. Every ConfigMap has a `data` section which can contain anything you like, in our example, it contains a JSON entry with a key of `dev-config.json`. 

In order to create this ConfigMap in our Kubernetes cluster, we can run the following command to `apply` the file:

```
kubectl apply -f dev-configmap.yaml
```

### Bringing it together

By this point, we have our application ready to accept injected configuration properties and a Docker image created from that application. We also have a ConfigMap deployed into our Kubernetes cluster, so now we can bring that all together by deploying a [Pod](https://kubernetes.io/docs/concepts/workloads/pods/) into our cluster, that uses our newly built image and ConfigMap.

Kubernetes Pods are the smallest deployable units in Kubernetes. We're going to create a very simple Pod definition (`example-pod.yaml`) that deploys our image and uses our ConfigMap as an environment variable for the running container.

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: config-demo
  name: config-demo
spec:
  containers:
    - image: config-demo:latest
      name: config-demo
      ports:
        - containerPort: 8080
      imagePullPolicy: IfNotPresent
      env:      
        - name: SPRING_PROFILE
          value: dev
        - name: SPRING_APPLICATION_JSON
          valueFrom:
            configMapKeyRef:
              name: spring-config
              key: dev-config.json
  restartPolicy: Never                                          
```

Okay, so what exactly is the above Pod definition doing I hear you ask. Firstly, we know it's a Pod because of the `Kind` - which is Pod. Secondly, we've given it a `name` of config-demo, this will be the name of the Pod in the Kubernetes cluster. Next, we define a `spec`, which is the Pod specification, it defines everything needed about this Pod to Kubernetes. We define a *single* container, which uses the image we built earlier (`config-demo:latest`) and defines some key information such as ports to be used and the environment (`env`) variables to be used. 

We're going to focus on the `env` definition. As you can see from the Pod definition above, we've defined 2 variables, firstly the `SPRING_PROFILE` which has a value of `dev`. This indicates to the running Spring Boot application which active profile to use. As we defined several configuration entries in our `application.yml` file, it's important we set this value so that Spring knows which config set to pick up. Secondly, we define a `SPRING_APPLICATION_JSON` variable, which is referencing an entry from our ConfigMap we created earlier. 

Focussing on the `SPRING_APPLICATION_JSON` variable, defining an `env` variable this way in the Pod, allows us to pull data from a ConfigMap running in the cluster via the `configMapKeyRef` value type. What this is doing, is looking in our Kubernetes cluster for a ConfigMap called `spring-config` (that's why the naming is important, these have to be the same!) and specifically within that map, looking for a `key` called `dev-config.json`. 

Furthermore, this combination of ConfigMap name and key, will pick up the following entry from our ConfigMap:

```
dev-config.json:
    '{
      "example.datasource.url": "jdbc:mysql://dev-endpoint/example",
      "example.datasource.username": "dev-root",
      "example.datasource.password": "dev-pass"
     }'
```

When we run this Pod, the configuration values from the json structure above will get injected into our running Spring Boot service!

### Demo in Action

Now with all of the above in place, we have everything we need to create the new Pod and see if it's all working as expected. 

As a simple check, I've created a controller in the Spring Boot service, that when invoked, will just print out those configuration values we've passed to the application. 

First off, let's create the Pod using the kubectl apply method:

```
kubectl apply -f example-pod.yaml
```

Now we can check the Pod is running by using some other kubectl commands (I always do this to sanity check what I've created):

```
kubectl get pods
```

The output *should* contain an entry for the newly created Pod:

```
NAME          READY   STATUS    RESTARTS   AGE
config-demo   1/1     Running   0          3s
```

We can also check our ConfigMap is present

```
kubectl get configmaps
```

Which should show us something similar to

```
NAME            DATA   AGE
spring-config   1      3d23h
```

So our Pod is running, our ConfigMap is present, we should now be able to invoke the service to see if everything has worked as expected. In this scenario, we'll need to use [Kubernetes port-forwarding](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) as we don't have a running [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/) in front of our Pod. In order to do this, we simply run the following command:

```
kubectl port-forward pod/config-demo 8080:8080
``` 

Which just tells Kubernetes to `port-forward` the Pod `config-demo` which is running on container port `8080` to port `8080` running on my machine. 

Now we can open up a browser (or using your favourite REST client) and hit our endpoint `localhost:8080/hello`

When doing so, we should see (or get a response of) `Hello World!` 

This is great, as we know the application is running, but we want to see if our configuration has been injected properly from our ConfigMap. We can now check the logs for the running pod with the following command:

```
kubectl logs pod/config-demo
```

All being well, we should see the following output at the end of the logs

```
2020-12-08 08:51:28.525  INFO 7 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
DB URL: jdbc:mysql://dev-endpoint/example
DB Username: dev-root
DB Password: dev-pass
```

Ta-daa! It's all working as expected, our application has picked up the `dev-config.json` entry from our ConfigMap and injected it into our running Spring Boot application!

## Every Good Story Needs a Sequel

So there we have a simple, but useful example of how Kubernetes ConfigMaps can be used to externalize Spring Boot configuration. That's not the end of the story though, and you likely have some questions. 

One question I definitely have is, what about sensitive information (such as usernames & passwords)? 

ConfigMaps are great at abstracting configuration away from your application code. Ensuring you have a flexible, maintainable, isolated pattern for storing and updating application configuration. However, by themselves they're only part of the solution. For storing and utilising more sensitive information within Kubernetes, you have [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), but that's another post for another day...

## Example Project Code

If you've gotten this far, great stuff! I hope you've learnt something from this post and found the content and example project useful. If you want to see the project I've used to accompany this post, it can be found [in the example project repository](https://github.com/gwolverson/blogs/tree/main/config-demo).
