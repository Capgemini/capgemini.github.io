---
layout: post
title: "Ansible and Weave step by step"
category: Cloud
author: alberto_lamela
description: "A beginner’s guide to ansible by using Weave and Scope"
tags: [Open source, Cloud, Weave, Scope, Containers]
comments: true
share: true
canonical: https://medium.com/@enxebre/ansible-step-by-step-6ad5f8dc19c#.pwzib37sv
original: This article was originally published on <a href="https://medium.com/@enxebre/ansible-step-by-step-6ad5f8dc19c#.pwzib37sv">medium.com</a>
---

This is a pragmatic guide to Ansible for beginners. This use case will guide you on how to set up a cross-cloud software defined network for containers using [Weave Net](https://www.weave.works/products/weave-net/), [Weave Scope](https://www.weave.works/products/weave-scope/) and [Docker](https://www.docker.com/).
There is [a full gitbook](https://enxebre.gitbooks.io/ansible-pragmatic-guide/content/) including also a theoretical introduction to the main concepts of Ansible.

## Requirements

This tutorial is using **ansible 2.0.2.0**

The source code is [available on GitHub](https://github.com/enxebre/ansible-pragmatic-guide)

This tutorial will assume that you have two machines running coreOS on DigitalOcean and AWS. You can create them manually or using something like [Terraform](https://www.terraform.io/) or [docker-machine](https://docs.docker.com/machine/get-started/). We provide the [docker-machine-bootstrap](https://github.com/enxebre/ansible-pragmatic-guide/blob/master/docker-machine-bootstrap) script so you can use it and modify it for this purpose.

```bash
# AWS
# --amazonec2-access-key AKI******* \
# --amazonec2-secret-key 8T93C******* \
docker-machine create --driver amazonec2 \
--amazonec2-region "eu-west-1" \
--amazonec2-ssh-user core \
--amazonec2-device-name /dev/xvda \
--amazonec2-ami ami-e3d6ab90 \
aws-ansible-workshop

# DigitalOcean
export DOTOKEN=${DOTOKEN}
docker-machine create --driver digitalocean \
--digitalocean-access-token $DOTOKEN \
--digitalocean-region lon1 \
--digitalocean-image coreos-stable \
--digitalocean-ssh-user core \
do-ansible-workshop
```

We'll use the public IPs of these machines to create the weave network. Make sure your AWS security groups configuration match the Weave requirements.
For this demo I used a totally open configuration.

![steps](/images/2016-11-11-ansible-weave/security-groups.png)

If you don't want to create these machines you could use any machine with docker and [systemd](https://www.freedesktop.org/wiki/Software/systemd/) reachable via ssh from where you are running Ansible.

At the end we'll deploy two containers that will communicate with each other: one in DigitalOcean and another in AWS.

As we'll use CoreOS that is a minimal OS and do not ship with any version of Python we'll need to install a Python interpreter inside the machines. We'll use an Ansible module from the community for this, let's begin...

## Downloading dependencies. Ansible galaxy.

**[Source code](https://github.com/enxebre/ansible-pragmatic-guide/tree/step-1):** ```git checkout step-1```

Before reinventing the wheel you should try reusing community modules.
[Ansible galaxy](https://galaxy.ansible.com/) is a website for sharing and downloading Ansible roles and a command line tool for managing and creating roles. You can download roles from Ansible galaxy or from your specific git repository.
Ansible allows you to define your dependencies with standalone roles in a yaml file. See ```requirements.yml```

```yml
- src: defunctzombie.coreos-bootstrap
  name: coreos_bootstrap
```

By default Ansible assumes it can find a ```/usr/bin/python``` on your remote system. The [coreos-bootstrap role](https://github.com/defunctzombie/ansible-coreos-bootstrap) will install [pypy](http://pypy.org/) for us.

Certain settings in Ansible are adjustable via a [configuration file](http://docs.ansible.com/ansible/intro_configuration.html). [Click here for a very complete template](https://github.com/ansible/ansible/blob/devel/examples/ansible.cfg).

We'll set here the target folder for our community roles.

In ```ansible.cfg```:

```
[defaults]
roles_path = roles
```

![step-1](/images/2016-11-11-ansible-weave/step-1.png)

Just run ```ansible-galaxy install -r requirements.yml```

## Bootstrapping ansible dependencies for CoreOS. The Inventory and the Playbook.

**[Source code](https://github.com/enxebre/ansible-pragmatic-guide/tree/step-2):** ```git checkout step-2```

We'll create an inventory so we can specify the target hosts. You can create meaninful groups for your hosts in order to decide what systems you are controlling at what times and for what purpose.

You can also specify variables for groups. We set the CoreOS specifics here.

```
do01 ansible_ssh_host=138.68.144.191

[coreos]
do01

[coreos:vars]
ansible_python_interpreter="PATH=/home/core/bin:$PATH python"
ansible_user=core


[digitalocean]
do01

[digitalocean:vars]
ansible_ssh_private_key_file=~/.docker/machine/machines/do-ansible-workshop/id_rsa
```

We'll create a playbook so we can declare our expected configuration for every host.

In this step our ```playbook.yml``` will only include the role downloaded previewsly on every coreos machine (just one so far).
By default.

```yml
- name: bootstrap coreos hosts
  hosts: coreos
  gather_facts: False
  roles:
    - coreos_bootstrap
```

The folder tree will look like this now:

![step-2](/images/2016-11-11-ansible-weave/step-2-tree.png)

Run ansible:

```
ansible-playbook -i inventory playbook.yml
```

![step-2](/images/2016-11-11-ansible-weave/step-2.png)

## Adding a new machine on a different cloud. Inventory groups.

**[Source code](https://github.com/enxebre/ansible-pragmatic-guide/tree/step-3):** ```git checkout step-3```

We add the new machine into our Inventory file:

```
do01 ansible_ssh_host=46.101.87.119
aws01 ansible_ssh_host=52.49.153.19

[coreos]
do01
aws01

[coreos:vars]
ansible_python_interpreter="PATH=/home/core/bin:$PATH python"
ansible_user=core


[digitalocean]
do01

[digitalocean:vars]
ansible_ssh_private_key_file=~/.docker/machine/machines/do-ansible-workshop/id_rsa

[aws]
aws01

[aws:vars]
ansible_ssh_private_key_file=~/.docker/machine/machines/aws-ansible-workshop/id_rsa
```

Run:

```
ansible all -i inventory -m ping
```

You will see it fails for aws01 as the python interpreter is not there yet.

![step-3](/images/2016-11-11-ansible-weave/step-3.png)

So let's apply the playbook again.

```
ansible-playbook -i inventory playbook.yml
```

![step-3-ansible](/images/2016-11-11-ansible-weave/step-3-ansible.png)

Now:

```
ansible all -i inventory -m ping
```

![step-3-ping](/images/2016-11-11-ansible-weave/step-3-ping.png)

Nice!

## Overriding role variables.

**[Source code](https://github.com/enxebre/ansible-pragmatic-guide/tree/step-4):** ```git checkout step-4```

So far we have used Ansible to set up a python interpreter for the CoreOS machines so we can run Ansible effectively as many modules rely on python.

In this Step we'll setup a [Weave network](https://www.weave.works/products/weave-net/) and [Weave Scope](https://www.weave.works/products/weave-scope/) between both clouds so docker containers can communicate with ease.

We add a new role dependency on the requirements.

```yml
- src: defunctzombie.coreos-bootstrap
  name: coreos_bootstrap

- src: https://github.com/Capgemini/weave-ansible
  name: weave
``` 

Run:

```
ansible-galaxy install -r requirements.yml
```

We'll modify the inventory to create a group of hosts that belong to the weave network. By using the ["children"](http://docs.ansible.com/ansible/intro_inventory.html#groups-of-groups-and-group-variables) tag you can create a group of groups

```
[weave_servers:children]
digitalocean
aws
```

We'll override the weave role variables for satisfying our needs. Ansible allows to create variables per host, per group, or site wide variables by setting ```group_vars/all```

In ```group_vars/weave_server.yml```

```yml
{% raw  %}
weave_launch_peers: "
{%- for host in groups[weave_server_group] -%}
{%- if host != inventory_hostname -%}
{{ hostvars[host].ansible_ssh_host }}
{%- endif -%}
{%- endfor -%}"

weave_proxy_args: '--rewrite-inspect'
weave_router_args: ''
weave_version: 1.7.2
scope_enabled: true
scope_launch_peers: ''
proxy_env: 
  none: none
{% endraw %}
```

Add te weave role into our playbook:

```yml
---
- include: coreos-bootstrap.yml

- hosts: weave_servers
  roles:
    - weave
```

Run ansible again to configure weave:

```
ansible-playbook -i inventory playbook.yml
```

You can run commands remotely from Ansible cli. Lets check that weave is up and running:

```
ansible all -i inventory -a "/mnt/weave status"
```

![step-4-weave](/images/2016-11-11-ansible-weave/step-4-weave.png)

We should be able to access to the Scope UI on the browser now:

![step-4-weave](/images/2016-11-11-ansible-weave/step-4-weave.png)


## Templates and variables from other hosts.

The weave role relies on Ansible templates for generating Systemd scripts:

weave.service.j2:

```
[Unit]
After=docker.service
Description=Weave Network Router
Documentation=http://docs.weave.works/
Requires=docker.service

[Service]
TimeoutStartSec=0
EnvironmentFile=-/etc/weave.%H.env
EnvironmentFile=-/etc/weave.env
Environment=WEAVE_VERSION={{ weave_version }}

ExecStartPre={{ weave_bin }} launch-router $WEAVE_ROUTER_ARGS $WEAVE_PEERS
ExecStart=/usr/bin/docker attach weave
ExecStartPost={{ weave_bin }} expose
Restart=on-failure

ExecStop={{ weave_bin }} stop-router

[Install]
WantedBy=multi-user.target
```

weave.env.j2:

```
WEAVE_PEERS="{{ weave_launch_peers }}"
WEAVEPROXY_ARGS="{{ weave_proxy_args }}"
WEAVE_ROUTER_ARGS="{{ weave_router_args }}"
# Uncomment and make it more secure
# WEAVE_PASSWORD="aVeryLongString"
```

Weave needs to know the ips of the different host of the network.
[Ansible provide some magic variables so you can get information from the different hosts while running a playbook](http://docs.ansible.com/ansible/playbooks_variables.html#magic-variables-and-how-to-access-information-about-other-hosts).

This templates are populated at runtime by using ```hostvars``` magic variable.

```yml
{% raw %}
weave_launch_peers: "
{%- for host in groups[weave_server_group] -%}
{%- if host != inventory_hostname -%}
{{ hostvars[host].ansible_ssh_host }}
{%- endif -%}
{%- endfor -%}"
{% endraw %}
```

## Tags and conditionals

**[Source code](https://github.com/enxebre/ansible-pragmatic-guide/tree/step-5):** ```git checkout step-5```

In this step we'll use the power of [tags](http://docs.ansible.com/ansible/playbooks_tags.html) and conditional in order to deploy some services running on docker so we can test that they can communicate from DigitalOcean to AWS.

The playbook will look like this now:

```
---
- include: coreos-bootstrap.yml

- hosts: weave_servers
  roles:
    - weave

- include: deployment.yml
  when: deployment_enabled
  tags:
  - deployment

```

We'll run this on demand by using the conditional ```when: deployment_enabled``` and tags.

We'll create a site wide variables file at ```group_vars/all.yml```

```
deployment_enabled: true
```

Run only the deployment tasks by specifying the tag:

```
ansible-playbook -i inventory playbook.yml --tags="deployment"
```

```weaveworks/gs-spring-boot-docker``` is running on AWS now and ```weaveworks/weave-gs-ubuntu-curl``` is running on DigitalOcean.

If you check the logs for the ```weaveworks/weave-gs-ubuntu-curl``` container or you run ```curl http://spring-hello.weave.local:8080/``` inside the container you'll see how is communicating with the ```weaveworks/gs-spring-boot-docker``` container that is running on AWS.

You can also check the connection on Scope.

Grouping by DNS Name:

![step-5](/images/2016-11-11-ansible-weave/step-5.png)

Grouping by Container:

![step-5-containers](/images/2016-11-11-ansible-weave/step-5-containers.png)

## Summary

After following all the steps your folder tree should look something like this:

![summary](/images/2016-11-11-ansible-weave/summary.png)

Hopefully, You'll now have a better idea about the strengths of Ansible and how to make the most out of it.

Contributions are very welcome [on the github repo](https://github.com/enxebre/ansible-pragmatic-guide)

Check out [the full gitbook including a "Concepts" section](https://enxebre.gitbooks.io/ansible-pragmatic-guide/content/).



