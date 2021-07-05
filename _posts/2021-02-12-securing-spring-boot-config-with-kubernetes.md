---
layout: post
title: "Securing Spring Boot Config with Kubernetes"
subtitle: "An approach to utilising Kubernetes secrets to secure spring boot config"
category: Engineering
tags: [Engineering, Kubernetes, Spring, Security]
author: [greg_wolverson]
comments: true
draft: false
share: true
---

In a [previous blog post](https://capgemini.github.io/engineering/externalising-spring-boot-config-with-kubernetes/) I wrote about how [Spring Boot](https://spring.io/projects/spring-boot) and [Kubernetes](https://kubernetes.io/) are widely used together when building modern microservices. This post is a natural sequel to the aforementioned post, so it's worth reading that first if you haven't already done so.

Whilst I covered a good example of how Kubernetes ConfigMaps can be utilised in order to externalise application configuration, I raised some questions about security and how to store and use sensitive information in Spring Boot applications. 

## Secure Configuration is Good Configuration

As discussed in the datasource example in my last post, externalizing application config with ConfigMaps has lots of benefits. On the other hand, whilst ConfigMaps provide flexibility and aid with separation of concerns, they don't give a lot of security. ConfigMaps are great for non-secure configuration, but when security is paramount, such as for datasource credentials, you have Kubernetes Secrets. 

## Keeping Secrets

[Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) let you store and manage sensitive data. They are great for storing credentials, tokens, keys etc. A word of caution though,  Secrets by themselves won't necessarily solve all of your security concerns. Secrets are stored as unencrypted, base64-encoded strings - which by themselves aren't very secure. It's important to secure your Kubernetes cluster as well as the data within it, such as [enabling encryption at rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) and [enabling RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/). There are other, more mature approaches to using Kubernetes Secrets, such as [Kamus](https://github.com/Soluto/kamus) or [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets), but we're not going into those here, as we're focussing on using Kubernetes Secrets as a standalone resource. 

For the purposes of this post, I'll be looking at how Kubernetes Secrets can be used to store sensitive information, such as datasource credentials.

## Securing the Datasource

We'd previously stored the datasource configuration in a ConfigMap. This time we're going to create a Secret in Kubernetes and pass the values to our application via [environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/#define-an-environment-variable-for-a-container) from our Pod. 

### Creating the Secret

There are several ways to create Secrets; via yaml files or using `kubectl`. I find it useful to create Secrets using `kubectl` initially, outputting the result of the command to a yaml file for later usage. To create the Secret we can run the following command:

```
kubectl create secret generic datasource-credentials --from-literal=username=root --from-literal=password=password
```

The above command creates us a Secret named `datasource-credentials`, from the literal values `root` for username and `password` for password. Notice the `generic` parameter as well, this is the default Secret type in Kubernetes and refers to an [Opaque Secret](https://kubernetes.io/docs/concepts/configuration/secret/#opaque-secrets). If we wanted to get the output from creating a Secret without actually creating the resource in the cluster, we could add the following two parameters onto the end of the command:

```
-o yaml --dry-run
```

These parameters tell `kubectl` to output the results of the command in yaml format and not to apply to changes to our Kubernetes environment, this way we can copy the results into a yaml file for later use. The full command would look like this:

```
kubectl create secret generic datasource-credentials --from-literal=username=root --from-literal=password=password -o yaml --dry-run
```

Now we can check the Secret has been created successfully:

```
kubectl get secrets
````

Which should show us an entry like so:

```
NAME                              TYPE                                  DATA   AGE
datasource-credentials            Opaque                                2      3s
```

### Using the Secret

Now we have our Secret created within our Kubernetes environment, we can use it within our application and Pod configuration.

The changes to the Spring Boot application are minimal, and involve changing the reference values within the `application.yml` file. Previously the application configuration for the datasource looked like this:

```
spring:
  config:
    activate:
      on-profile: dev 
  datasource:
    url: ${example.datasource.url}
    username: ${example.datasource.username}
    password: ${example.datasource.password}
```

Now we just change it so that the username and password properties can be referenced from environment variables:

```
spring:
  config:
    activate:
      on-profile: dev 
  datasource:
    url: ${example.datasource.url}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

The environment variables are set within the Kubernetes Pod manifest, the values for which are pulled from the Secret we created earlier. Our Pod manifest needs some additional entries to create those environment variables:

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
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: datasource-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: datasource-credentials
              key: password
  restartPolicy: Never                                  
```

The key changes from the above are these two `env` entries:

```
- name: DB_USERNAME
  valueFrom:
    secretKeyRef:
      name: datasource-credentials
      key: username
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: datasource-credentials
      key: password
```

The above approach is to [use Secrets as environment variables](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables) within the Pod. We create two environment variables, one for `DB_USERNAME` and one for `DB_PASSWORD`, each of these gets assigned the values `username` and `password` from the `datasource-credentials` secret respectively. It's important to note the naming of each environment variable matches the values defined in the Spring Boot `application.yml` file, otherwise no value would be passed to the running application. 

### Demo in Action

Now with the changes in place to use Kubernetes Secrets for our datasource credentials, we can apply the Pod changes and hopefully see the application pick them up. 

First off, let's re-create the Pod using the `kubectl` apply method:

```
kubectl apply -f example-pod.yaml
```

Now we can check the Pod is running by using some other kubectl commands (I always do this to sense check what I've created):

```
kubectl get pods
```

The output *should* contain an entry for the newly created Pod:

```
NAME          READY   STATUS    RESTARTS   AGE
config-demo   1/1     Running   0          3s
```

So our Pod is running, we should now be able to invoke the service to see if everything has worked as expected. In this scenario, we'll use [Kubernetes port-forwarding](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) again as we don't have a running [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/) in front of our Pod. In order to do this, we simply run the following command:

```
kubectl port-forward pod/config-demo 8080:8080
``` 

Now we can open up a browser (or using your favourite REST client) and hit our endpoint `localhost:8080/hello`

When doing so, we should see (or get a response of) `Hello World!` 

This is great, as we know the application is running, but we want to see if our configuration has been injected properly using the environment variables created from our new Secret. We can now check the logs for the running pod with the following command:

```
kubectl logs pod/config-demo
```

All being well, we should see the following output at the end of the logs

```
2020-12-08 08:51:28.525  INFO 7 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
DB URL: jdbc:mysql://dev-endpoint/example
DB Username: root
DB Password: password
```

Great stuff! It's all working as expected, our application has picked up the `dev-config.json` entry from our ConfigMap, which we created previously and is also picking up the `username` and `password` values from our newly created Secret.

## Every Good Sequel Needs an Ending

So there we have a simple, but useful example of how Kubernetes Secrets can be used to externalize secure Spring Boot configuration. Whilst by themselves Secrets don't provide a completely secure solution, there are recommended approaches to ensure your Kubernetes cluster itself is secured as well, which makes leveraging Secrets a more secure approach. Following secure patterns and principles within your Kubernetes cluster, such as [Zero Trust Architecture](https://github.com/ukncsc/zero-trust-architecture), helps ensure you maintain higher levels of trust and security, which in turn makes using resources like Secrets, inherently more secure.

Kubernetes provides several resources that we can leverage in order to externalize our application configuration securely. The benefits of externalizing application configuration are numerous, and with Kubernetes becoming ever-more popular as an orchestration tool, having tried and tested patterns and principles to utilise those resources is more important than ever. 

## Example Project Code

I hope you've learnt something from this post and found the content and example project useful. If you want to see the project I've used to accompany this post, it can be found [in the example project repository](https://github.com/gwolverson/blogs/tree/secrets).
