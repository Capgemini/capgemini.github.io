---
layout: post
title: "Tooling as a service via executable images"
category: DevOps
author: alberto_lamela
description: "Tooling as a service and executable images."
tags: [Development, DevOps, Open source, Apollo]
comments: true
share: true
---

This is a recap about how we use the isolation of [containers](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) and the power, portability and simplicity of [Docker](https://www.docker.com/) for providing tooling as a service via [executable images](http://www.infoq.com/articles/docker-executable-images) using [DCOS-CLI](https://docs.mesosphere.com/using/cli/) as an example. True story!

## The problem:
* We want to install [Mesos Frameworks](http://mesos.apache.org/documentation/latest/mesos-frameworks/).
* We want to deploy apps with [Marathon](https://github.com/mesosphere/marathon).
* We want to automate the installation of Mesos Frameworks.
* We want to automate the deployment of apps.

## The pain!
* [DCOS-CLI](https://github.com/mesosphere/dcos-cli) from [Mesosphere](https://mesosphere.com/) is the best solution for the first two problems but we need to follow all the steps to [install it](https://docs.mesosphere.com/install/cli/).
* We need to make sure our environment is suitable to install and run it so it has all the required dependencies.
* We need to make sure every environment where we want to run it is suitable to install and run it so every environment has all the required dependencies.
* We need to ensure all the dependencies and any executables comply with security requirements, as the attack vector can be quite extensive.

## The solution:
* To offer DCOS-CLI as a service that can be executed with zero dependencies with the specific environment.
* To consume this service from a given automation tool like [Ansible](http://www.ansible.com/).

## But how?

* We use Docker for running an [ephemeral container with dcos-cli contained](https://hub.docker.com/r/capgemini/dcos-cli/). This means Docker is your only dependency no matter what you want to run.

{% highlight bash %}
DCOS_CONFIG=/dcos-cli/.dcos/dcos.toml
SOURCES=${SOURCES:-'[ "https://github.com/mesosphere/multiverse/archive/master.zip", "https://github.com/mesosphere/universe/archive/version-1.x.zip",]'}
MESOS_MASTER_URL=${MESOS_MASTER_URL:-'http://127.0.0.1:5050'}
MARATHON_URL=${MARATHON_URL:-'http://127.0.0.1:8080'}
TOKEN=${TOKEN:-'1234'}
EMAIL=${EMAIL:-'apollo@capgemini.com'}
{% endhighlight %}

* The container **creates a temporary config** file from your environment variables, **executes** your command **and dies.** Check out the [source code here](https://github.com/Capgemini/dcos-cli-docker/).

{% highlight bash %}
docker run -v `pwd`/chronos_config:/config \
           -e MESOS_MASTER_URL='http://172.31.1.11:5050' \
           -e MARATHON_URL='http://172.31.1.11:8080' \
           -it capgemini:dcos-cli package install --options=config --yes chronos
{% endhighlight %}

* Now it's up to you how to automate it. We use ansible and the [Frameworks role](https://github.com/Capgemini/Apollo/tree/master/roles/frameworks) for [Apollo](https://github.com/Capgemini/Apollo) which looks something like this:

{% highlight yaml %}
{% raw %}
# defaults file for frameworks
frameworks_dcos_cli_image: capgemini/dcos-cli
frameworks_zk_master_peers: "zk://{{ zookeeper_peers_nodes }}/mesos"
frameworks_mesos_master_url: "http://{{ ansible_ssh_host }}:5050"
frameworks_marathon_url: "http://{{ ansible_ssh_host }}:8080"
frameworks_sources: '["https://github.com/Capgemini/universe/archive/version-1.x.zip",]'
frameworks_list:
  - cassandra
  - chronos
{% endraw %}  
{% endhighlight %}

{% highlight yaml %}
{% raw %}
- name: "install dcos-cli package"
  when: "frameworks_{{ item }}_enabled | bool"
  run_once: true
  docker:
    name: "{{ item }}"
    image: "{{ frameworks_dcos_cli_image }}"
    state: started
    command: "package install --options=/config --yes {{ item }}"
    volumes:
    - "/tmp/{{ item }}-config:/config"
    env:
      MESOS_MASTER_URL: "{{ frameworks_mesos_master_url }}"
      MARATHON_URL: "{{ frameworks_marathon_url }}"
      SOURCES: "{{ frameworks_sources }}"
  tags:
    - "{{ item }}"
  with_items:
    - "{{ frameworks_list }}"
{% endraw %}    
{% endhighlight %}

## The benefits:
* Reduced impacting surface.
* Only one dependency with the run time container, i.e Docker.
* Crazily easy to integrate with other automation tools!
* Reusable.
* Build once, Run everywhere!

At the time of writing this post, [Mesosphere](https://mesosphere.com/), the creators of DCOS-CLI among such other amazing tools around Mesos, are working on their [own image for DCOS-CLI]( https://github.com/mesosphere/dcos-cli-docker)
