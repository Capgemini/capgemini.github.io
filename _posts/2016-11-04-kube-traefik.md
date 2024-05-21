---
layout: post
title: "Kubernetes, Ingress controllers and Traefik"
category: Kubernetes
author: alberto_lamela
description: "Kubernetes using traefik as an Ingress controller"
tags: [Open source, Cloud, Kubernetes, Containers]
comments: true
share: true
canonical: https://medium.com/@enxebre/kubernetes-ingress-controllers-and-traefik-a32648a4ae95#.x3x8sq7be
original: This article was originally published on <a href="https://medium.com/@enxebre/kubernetes-ingress-controllers-and-traefik-a32648a4ae95#.x3x8sq7be">medium.com</a>
---

When running your application services on top of an orchestration tool like Kubernetes or Mesos with Marathon there are some common necessities you'll need to satisfy. Your application will usually contain two types of services, those that should be visible only from inside of the cluster, and those that you want to expose to the external world, outside your cluster and maybe to the internet (e.g frontends).

This article will focus on how to approach this on Kubernetes.

You can make use of the different service types that Kubernetes makes available for you when creating a new service in order to achieve what you want.

- ClusterIP: This is the default. Choosing this value means that you want this service to be reachable only from inside of the cluster.

- ExternalName: It serves as a way to return an alias to an external service residing outside the cluster.

- NodePort: Expose the service on a port on each node of the cluster.

- LoadBalancer: on top of having a cluster-internal IP and exposing service on a NodePort, also ask the cloud provider for a load balancer which forwards requests to the Service exposed as a ```<NodeIP>:NodePort``` for each Node. If the cloud provider does not support the feature, the field will be ignored.

So, if your cloud does not support "loadBalancer" (e.g. you run an on-premise private cloud), and you need something more sophisticated than exposing a port on every node of the cluster, then it used to be that you'd need to build your own custom solution. Fortunately this is not true anymore.

Since [Kubernetes v1.2.0](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG.md#v120) you can use [Kubernetes ingress](http://kubernetes.io/docs/user-guide/ingress/) which includes support for TLS and L7 http-based traffic routing.

*You can also ask [Kuwit](http://kuwit.io/) "How can I expose services to the external world?" whenever you need to remember this ;-)*


An Ingress is a collection of rules that allow inbound connections to reach the cluster services. It can be configured to give services externally-reachable URLs, load balance traffic, terminate SSL, offer name based virtual hosting, and other useful configuration. Users request Ingress by POSTing the Ingress resource to the API server.

In order for the Ingress resource to work, the cluster must have an Ingress controller running. The Ingress controller is responsible for fulfilling the Ingress dynamically by watching the ApiServer's /ingresses endpoint.

This is handy! Now you could go even further, isolate at the infra level where your Ingress controller runs and think of it as an "edge router" that enforces the firewall policy for your cluster. The picture for a High Available Kubernetes Cluster would look something like this:

![kube](/images/2016-11-04-kube-traefik/kube-ingress.png)

We'll show how to use [Traefik](https://traefik.io/) for this purpose. Traefik is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease. It supports several backends among Mesos/Marathon and Kubernetes to manage its configuration automatically and dynamically.

We'll deploy a Kubernetes cluster similar to the picture above and will run Traefik as [DaemonSet](http://kubernetes.io/docs/admin/daemons/).

```yaml 
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: traefik-ingress-controller-v1
  namespace: kube-system
  labels:
    k8s-app: traefik-ingress-lb
    kubernetes.io/cluster-service: "true"
spec:
  template:
    metadata:
      labels:
        k8s-app: traefik-ingress-lb
        name: traefik-ingress-lb
    spec:
      terminationGracePeriodSeconds: 60
      containers:
      - image: containous/traefik
        name: traefik-ingress-lb
        imagePullPolicy: Always
        ports:
          - containerPort: 80
            hostPort: 80
          - containerPort: 443
            hostPort: 443
          - containerPort: 8080
            hostPort: 8080
        volumeMounts:
          - mountPath: /etc/traefik
            name: traefik-volume
            readOnly: false
        args:
        - --web
        - --kubernetes
        - --configFile=/etc/traefik/traefik.toml
        - --logLevel=DEBUG
      volumes:
        - hostPath:
            path: /etc/traefik
          name: traefik-volume
      nodeSelector:
        role: edge-router
```

The source code is [here](https://github.com/Capgemini/kubeform/blob/master/roles/addons/files/traefik-ingress-controller.yaml)

[You can configure Traefik to use automatic TLS config for your services on demand](https://docs.traefik.io/toml/#acme-lets-encrypt-configuration).

Our edge-router will be just another [Kubernetes node](http://kubernetes.io/docs/admin/node/) with some restrictions.

We don't want any other pod to be scheduled to this node so we set ```--register-schedulable=false``` when running the [kubelet](http://kubernetes.io/docs/admin/kubelet/) as well as giving it a convenient label: ```--node-labels=edge-router```.

Kubernetes will run DaemonSets on every node of the cluster even if they are non-schedulable. We only want this DaemonSet to run on the edge-router node so we use "nodeSelector" to match the label we previously added. 

```
nodeSelector:
  role: edge-router
```

Notice that with this approach, if you want to add a new edge-router to the cluster, all you need to do is spin up a new node with that label and a new DaemonSet will be automatically scheduled to that machine. Nice!

Here is a video demo of all this in action using two different clouds (DigitalOcean and AWS), deploying two Kubernetes clusters from scratch:

<div class="small-12 medium-8 large-4 small-centered columns">
  <div class="flex-video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Ejc5rKTzHiQ" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

Recently I've seen a lot of users on [Kubernetes slack](http://slack.k8s.io/) with issues communicating to the Ingress controller. This is often due to a known problem.

The Ingress controller might want to use [hostPort](http://kubernetes.io/docs/api-reference/v1/definitions/#_v1_pod) to expose itself.

```
ports:
  - containerPort: 80
	hostPort: 80
  - containerPort: 443
	hostPort: 443
```
If you are using a [CNI](https://github.com/containernetworking/cni) [Network Plugin](http://kubernetes.io/docs/admin/network-plugins/) for your cluster networking, hostPort is not supported yet.

You can track the current status of this problem here:

[https://github.com/kubernetes/kubernetes/issues/23920](https://github.com/kubernetes/kubernetes/issues/23920)
[https://github.com/kubernetes/kubernetes/issues/31307](https://github.com/kubernetes/kubernetes/issues/23920)
[https://github.com/containernetworking/cni/issues/46](https://github.com/kubernetes/kubernetes/issues/23920)

For now potential workarounds for this are to use "hostNetwork" or run a service using the previously mentioned "nodePort" to match your Ingress controller running as a DaemonSet.

Hopefully this post will give you some insight about how to expose services on Kubernetes and the benefits of Ingress controllers.

