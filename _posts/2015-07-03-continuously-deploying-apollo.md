---
layout: post
title: "Continuously deploying Apollo with Wercker"
category: Open source
author: [alberto_lamela, cam_parry]
description: "Continuous deployment ability for Apollo."
date: 2015-07-03
tags: [Development, DevOps, Continuous Integration, Continuous Delivery, Continuous Deployment]
comments: true
share: true
---

When deploying [Apollo](https://github.com/Capgemini/Apollo) it will create the cluster infrastructure in the cloud using an image built by [Atlas](http://atlas.hashicorp.com/) and [Packer.](https://www.packer.io/) Additionally, it will provision and configure the new machines providing a full PAAS ready for deploying containers across the datacenter.

When dealing with several layers of abstraction and using many different technologies (Bash, Packer, [Terraform](https://www.terraform.io/), [Ansible](http://www.ansible.com/home), etc.) it is fairly easy to break things during development.

We need to make sure we are not committing syntax errors, that every commit is deployable and that the behaviour of the platform with all the bits communicating to each other works as expected.

Changes need to be continuously integrated and driven by tests. For this purpose we chose [Wercker](http://wercker.com/) out of a list of available CI as a service tools like [Travis](https://travis-ci.org/), [circleci](https://circleci.com/), [Drone](http://docs.drone.io/) and [Shippable](http://docs.shippable.com/)

"Wercker is an open automation platform for developing, building and delivering your applications" from the simplicity of a YAML file and it is highly customizable via [custom steps](http://devcenter.wercker.com/learn/steps/step-registry.html)

For achieving our continuous deployment approach we'll use two different pipelines: [build](http://devcenter.wercker.com/learn/build/introduction.html) and [deploy](http://devcenter.wercker.com/learn/build/introduction.html)

## Build

"Builds are the result of a run-through of the steps in the wercker pipeline. If all steps in the pipeline are successful, a build has passed".

Every time a Pull Request is created the build steps below will run:

- Syntax checks against all our json packer templates using [packer validate](https://www.packer.io/docs/command-line/validate.html).

```yaml 
script:
  cwd: packer/
  name: validate packer template for AMI
  code: ./packer validate ubuntu-14.04_amd64-amis.json
```

- Linting checks against the ansible code using our custom [step-ansible-lint](https://github.com/Capgemini/step-ansible-lint) that relies on [https://github.com/willthames/ansible-lint](https://github.com/willthames/ansible-lint).

```bash 
capgemini/ansible-lint:
  name: run ansible-lint against the site.yml playbook
  playbook: site.yml
```

- [Very simplistic Bash unit testing](https://github.com/Capgemini/Apollo/blob/master/bootstrap/tests/test.sh) for ensuring our bash functions do what they are meant to do.

```yaml 
script:
  name: scripts testing
  cwd: bootstrap/tests
  code: |
    /bin/bash test.sh
```

In the future we might be adding a new step here for "packer push" the images into [Atlas](https://atlas.hashicorp.com/) when merging into master branch.

You can see the feedback for every build in wercker:

![Fig 1. Wercker builds](/images/2015-07-03-continuously-deploying-apollo/builds.jpg)

## Deploy

Wercker allows you to deploy your application into supported platforms like Heroku or Openshift or you can create you own Deployment Target.

Every successful build from any specific commit can be deployed either automatically or manually.

![Fig 2. Wercker deploy](/images/2015-07-03-continuously-deploying-apollo/deploy.jpg)

At the moment we are continuously deploying Apollo into Amazon and Digitalocean using a [step-apollo-deploy](https://github.com/Capgemini/step-apollo-deploy/).

```yaml 
deploy:
    steps:
    - install-packages:
        packages: wget unzip
    - pip-install:
        requirements_file: "requirements.txt"
    - capgemini/apollo-deploy:
        cloud: $CLOUD
        artifact_name: $ARTIFACT_NAME
        artifact_version: $ARTIFACT_VERSION
        terraform_version: 0.5.3
        run_tests: true
```

Environment variables can be set for every target you create in wercker:

![Fig 3. Slack notification](/images/2015-07-03-continuously-deploying-apollo/variables.jpg)

We have created [step-apollo-deploy](https://github.com/Capgemini/step-apollo-deploy/) step for:

- Installing a given version of Terraform.
- Deploying Apollo in parallel into multiple clouds.
- Running different types of testing inside the vms. At the moment [Serverspecs](http://serverspec.org/) and [docker bench security.](https://github.com/docker/docker-bench-security)
- Destroying the whole platform.

Every change in step-apollo-deploy is also continuously integrated by wercker itself using [step-validate-wercker-step](https://github.com/wercker/step-validate-wercker-step):

```yaml 
box: wercker/default
build:
  steps:
    - validate-wercker-step
```

So in essence with both "build" and "deploy" in place we have the ability to automatically triggering a fully tested ephemeral Apollo deployment for any specific commit.

## Test

We use ansible roles for installing and running [dockerbench](https://github.com/Capgemini/Apollo/tree/master/roles/dockerbench) and [serverspecs](https://github.com/Capgemini/Apollo/tree/master/roles/serverspec) covering components of Apollo:

- Mesos
- Marathon
- Docker
- Weave
- Consul
- Registrator
- Dnsmasq
- HAProxy
- Zookeeper

Testing during a deploy can be optionally enabled using a toggle environment variable.

```bash 
export APOLLO_serverspec_run_tests=true
export APOLLO_dockerbench_run_test=true
```

### Dockerbench

We have recently decided to try and integrate [dockerbench](https://github.com/Capgemini/Apollo/tree/master/roles/dockerbench) into our test suite.

The Docker Bench for Security is a script that checks for all the automatable tests included in the [CIS Docker 1.6 Benchmark ](https://benchmarks.cisecurity.org/tools2/docker/CIS_Docker_1.6_Benchmark_v1.0.0.pdf). It gives INFO, PASS and WARNING messages for each of the tests that run. We run tests at deploy time, to check we haven't slipped any unwanted security risks into our build. Currently we only test if WARNING's are above a certain configurable threshold.

The dockerbench project is still fairly young, and is still to settle on a standard way all tests can be run across any environment, whilst having configurable rules. We think this is a great project, as it allows us to bring security into our Continuous Integration cycle, which can decrease attack vectors and catch risks earlier in development cycles.

### Serverspecs

Apollo default deployment provides 3 machines playing mesos master role and running zookeeper and marathon. As some configuration like the ips can be assigned on deployment time we need to populate some of the serverspecs dynamically by using an ansible [j2 template](http://docs.ansible.com/template_module.html).
 
```ruby 
{% raw %}
describe command("curl --silent --show-error --fail --dump-header /dev/stderr --retry 2 http://{{ marathon_hostname }}:8080/v2/info") do
  its(:stdout) { should match '.*"master":"zk://"{{ marathon_peers|join(',') }}/mesos".*' }
  its(:stdout) { should match '.*"zk":"zk://{{ marathon_peers|join(',') }}/marathon".*' }
  its(:stdout) { should match '.*"name":"marathon".*' }
  its(:stdout) { should match '.*"mesos_user":"root".*' }
  its(:stdout) { should match '.*"executor":"//cmd".*' }
  its(:exit_status) { should eq 0 }
end
{% endraw %}
```


Below are some examples with more of the serverspecs we run for marathon:

```ruby 
describe docker_container('marathon') do
  it { should be_running }
  it { should have_volume('/store','/etc/marathon/store') }
end

describe port(8080) do
  it { should be_listening }
end

describe command("/usr/local/bin/marathon-wait-for-listen.sh") do
  its(:exit_status) { should eq 0 }
end

describe service('marathon') do
  it { should be_running.under('upstart') }
end

describe command("curl -s -XPOST 127.0.0.1:8080/v2/apps -d@spec/marathon/sample.json -H \"Content-Type: application/json\" && sleep 3") do
  its(:exit_status) { should eq 0 }
end

describe command("curl -s 127.0.0.1:8080/v2/deployments") do
  its(:stdout) { should match '[]' }
  its(:exit_status) { should eq 0 }
end

describe command("curl -s 127.0.0.1:8080/v2/apps/serverspecs-app") do
  its(:stdout) { should match '.*"id":"/serverspecs-app".*' }
  its(:stdout) { should match '.*"tasksRunning":1.*' }
  its(:exit_status) { should eq 0 }
end
```

## Feedback

Finally we get the feeback for the deployment in every cloud in our Slack channel using [wantedly/pretty-slack-notify](https://github.com/wantedly/step-pretty-slack-notify):

```yaml 
after-steps:
    - wantedly/pretty-slack-notify:
        webhook_url: $SLACK_WEBHOOK_URL
        channel: apollo
        username: wercker-bot
```
![Fig 4. Slack notification](/images/2015-07-03-continuously-deploying-apollo/slack.png)

You can check out the [full wercker.yml file here](https://github.com/Capgemini/Apollo/blob/master/wercker.yml)
and below is a video showing the whole cycle:

<div class="small-12 medium-8 large-4 small-centered columns">
  <div class="flex-video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ApSa8J_8SF8" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

## What's next

If for your use case you need to keep track of the state of Terraform you might find this [Atlas and GitHub integration](https://hashicorp.com/blog/atlas-terraform-github.html) useful.

Check out our upcoming posts if you want to hear more about CI, CD and our Continuous Delivery approach for services running inside docker containers deployed by Apollo, running Serverspecs into ephemeral containers via "docker exec" across multiple environments.
