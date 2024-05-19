---
layout: post
title: Tips and Thoughts on Prototyping with AWS Elastic Beanstalk
description: >-
    Sharing my experience of using AWS Elastic Beanstalk as a Platform for rapid iteration and development with Docker
category: Development
author: phil_hardwick
tags: [Docker, AWS, Elastic Beanstalk, Laravel, PHP, Composer, PaaS]
comments: true
share: true
---

## The choice of PaaS
I've investigated a few Platform as a Service (PaaS) offerings as part of small projects or prototypes I've done recently. I've used [Openshift (version 2)](https://www.openshift.com/), [Heroku](https://www.heroku.com/) and now [Amazon Web Services (AWS)](https://aws.amazon.com/). This is only a few of the available PaaSs, there are a lot out there I've still yet to try, but I think my recent use of AWS as my platform of choice has been the most successful so far.
 
## What I did
As part of my [degree apprenticeship](https://www.uk.capgemini.com/careers/your-career-path/apprentices) with Capgemini and Aston University I was involved in a group project module, designing a system of components with a frontend, REST API and an email service for an application called "Moco". Seeing the opportunity to learn and use some new tech I decided to use [Docker](https://docker.com), so it could be deployed anywhere, and AWS as a platform enabling the whole team to access the application. Docker seemed to fit well as it allowed flexibility in what I deployed, isolation between services and the choice to use various languages or frameworks for each component. We ended up using ReactJS and Redux on the frontend, Laravel for a REST API and Spring Boot with Apache Camel for an email service.

## Learning Docker
I hadn't used Docker at all at this point so went through their [tutorial](https://docs.docker.com/engine/getstarted/) and got to grips with commands, the Docker client and the fact that I had a VM on my Mac to run containers (native Docker beta release wasn't out at this point).

The biggest "ah ha" moment was understanding [volumes](https://docs.docker.com/engine/tutorials/dockervolumes/) and [links](https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/). Firstly, that volumes are pieces of disk (folders) from your host machine which are mounted into the containers - like a shared folder in VirtualBox. Secondly, that links enable containers to communicate and have a reference to one another through their container names (these names are put into the container's hosts file and Docker sorts out the IP addresses). The benefit to using volumes is that Docker images don't have to be built again if files in a mounted volume change. Volumes allow for your containers to be as abstract and generic as you would like. For example, you can bake the application code into an image if you don't want to re-use it elsewhere, forcing you to create a new build each time, or you can mount the code as a volume and build the image totally generically, customising and configuring it with volumes.

Running multiple containers meant I got to grips with [Docker Compose](https://docs.docker.com/compose/), another command line client which manages a set of containers defined in a `docker-compose.yaml` file. Using this setup was a lot faster than using [MAMP](https://www.mamp.info/en/), my usual setup, and a lot more flexible e.g. I could change the versions of PHP, Composer and PHPunit much easier and there was no installation necessary. Plus it was easy for others in the team to set up the application - I didn't have to ask them to install PHP, Composer, MySQL, or any dependencies of the actual application. This made my instructions for running the application very simple (however, in reality getting others to set up Docker for the first time wasn't totally smooth so, although it ran brilliantly once set up, it took some time).

## Learning Elastic Beanstalk
When I first looked at using AWS I did so because I wanted to see what their ecosystem was like and because I wanted more flexibility than Openshift or Heroku - that and they had a good free tier! I had hoped that there would be less of a learning curve involved with using AWS too and it would be just like using the Docker commands I was getting so comfortable with. 

Initially I was worried: I read blog posts about setting up EC2 containers, provisioning it to run Docker, creating security groups and other very low level stuff I didn't want to stray into. I wanted to keep away from the infrastructure and stick to the abstractions of using a PaaS, after all, it was only a short project - I didn't want to spend my time setting up security groups. I wondered whether AWS was only "Infrastructure as a Service" but then I found [Elastic Beanstalk (EB)](https://aws.amazon.com/elasticbeanstalk/) and the infrastructure abstractions I had been hoping for.

EB gives you a choice of applications to run: Docker (single or multi-container), PHP, Python, Node.js, Ruby, Tomcat and others. It only takes 2/3 pages of options and configuration to have a whole environment set up and ready to be deployed to. As part of the set up Elastic Beanstalk creates an AWS virtual machine, called an EC2 node, for your docker or other type of application to run on. Then, it provides a URL to access your application and creates an S3 bucket where your code is uploaded. It also has an excellent [command line client](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) which was not too hard to set up with a secret key. To start using my newly provisioned multi-container Docker environment I had to transform my `docker-compose.yaml` into a `Dockerrun.aws.json` file. This wasn't hard either but the inevitable debugging that came after took a long time.

Understanding what went wrong in a deployment was probably the hardest and most time consuming aspect of getting set up. There are a lot of logs and a lot of log files and so the first problem is finding what logs are relevant. I mostly spent my time logged into my EC2 instance via SSH and in the container logs `/var/log/docker` where each container logs out to a file based on its container ID.

### Gotchas
I came up against a few things I had to work out and debug. Firstly, not every container is essential. I had a container named "application" which simply set up volumes which other containers could use. Setting this container as "essential":true stalled the deployment and only when I changed it to be "essential":false did all the containers start correctly.

In another container I had a Java process, a Spring Boot application, which ran fine with docker-compose but when deployed, maxed out the CPU on my EC2 node. It turns out it was using all the I/O CPU and this was because it needed more memory. I doubled it to 256MB and the CPU returned to normal.

I had initially wanted to use a submodule in my git repo for my Docker build files and any configuration files needed for the containers. In the end I realised it was going to be more effort that it was worth to deploy git submodules with Elastic Beanstalk. The deploy command in the EB command line client zips up the checked in code which doesn't include submodules. To include them there would need to be some post-deploy steps to init the submodule and pull the latest and then continue with the rest of the deploy. I found it was easier to build the images I needed and push them to the Docker Registry, rather than building on the fly when deployed. With this set up, AWS pulls the images from the Docker registry and starts them. Any configuration files necessary, I put into a new sub project ("moco-config") of my main project and mounted volumes from the folders of that sub project to each container.

Lastly code is uploaded to an S3 (AWS's object/file store) bucket and then mounted to `/var/app/current` in the EC2 instance so all the volumes need to be sourced from there. You can see this in the volume definitions of my final `Dockerrun.aws.json` file:

    {
      "AWSEBDockerrunVersion": 2,
      "volumes": [
        {
          "name": "moco",
          "host": {
            "sourcePath": "/var/app/current/moco-api"
          }
        },
        {
          "name": "moco-app",
          "host": {
            "sourcePath": "/var/app/current/moco-app"
          }
        },
        {
          "name": "moco-email",
          "host": {
            "sourcePath": "/var/app/current/moco-config/email"
          }
        },
        {
          "name": "moco-api-docs",
          "host": {
            "sourcePath": "/var/app/current/moco-config/docs"
          }
        }
      ],
      "containerDefinitions": [
        {
          "name": "application",
          "image": "philhardwick/laradock_application:latest",
          "memory": 64,
          "essential": false,
          "mountPoints": [
            {
              "sourceVolume": "moco",
              "containerPath": "/var/www/laravel",
              "readOnly": false
            },
            {
              "sourceVolume": "moco-app",
              "containerPath": "/var/www/web-ui",
              "readOnly": false
            }
          ]
        },
        {
          "name": "workspace",
          "image": "philhardwick/laradock_workspace:latest",
          "memory": 128,
          "essential": true,
          "volumesFrom": [
            {
              "sourceContainer": "application"
            }
          ]
        },
        {
          "name": "php-fpm",
          "image": "philhardwick/laradock_php-fpm:latest",
          "essential": true,
          "memory": 128,
          "volumesFrom": [
            {
              "sourceContainer": "application"
            }
          ],
          "links": [
            "workspace"
          ]
        },
        {
          "name": "nginx",
          "image": "philhardwick/laradock_nginx:latest",
          "portMappings": [
            {
              "hostPort": 80,
              "containerPort": 80
            }
          ],
          "essential": true,
          "memory": 128,
          "volumesFrom": [
            {
              "sourceContainer": "application"
            }
          ],
          "links": [
            "php-fpm"
          ]
        },
        {
          "name": "api-docs",
          "image": "philhardwick/laradock_api-docs:latest",
          "portMappings": [
            {
              "hostPort": 4000,
              "containerPort": 80
            }
          ],
          "essential": true,
          "memory": 64,
          "mountPoints": [
            {
              "sourceVolume": "moco-api-docs",
              "containerPath": "/app/swagger-configuration"
            }
          ]
        },
        {
          "name": "email",
          "image": "philhardwick/moco:email-0.0.1",
          "portMappings": [
            {
              "hostPort": 20001,
              "containerPort": 20001
            }
          ],
          "essential": true,
          "memory": 256,
          "mountPoints": [
            {
              "sourceVolume": "moco-email",
              "containerPath": "/config"
            }
          ]
        }
      ]
    }

### Deploy steps
After getting around the above problems I needed to be able to run composer install whenever things were pushed. This meant investigating Elastic Beanstalk's post deploy options. As it turns out it's not too difficult but it did require a lot of tweaking and checking logs each time to see if it worked correctly. This is the final file:

    commands:
      create_post_dir:
        command: "mkdir /opt/elasticbeanstalk/hooks/appdeploy/post"
        ignoreErrors: true
      create_post_dir:
        command: "touch /var/app/current/moco-api/.env;"
        ignoreErrors: true
    files:
      "/opt/elasticbeanstalk/hooks/appdeploy/post/99_laravel_deps.sh":
        mode: "000755"
        owner: root
        group: root
        content: |
          #!/usr/bin/env bash
          pushd /var/app/current/moco-api
          mkdir storage/logs
          touch storage/logs/laravel.log
          sudo chmod -R 777 storage/ && sudo chmod -R 777 bootstrap/cache
          echo "APP_ENV=production" >> .env
          echo "APP_DEBUG=false" >> .env
          echo "APP_KEY=SomeRandomString" >> .env
          echo "APP_URL=http://moco-dev.us-west-2.elasticbeanstalk.com/" >> .env
          popd
          DOCKER_ID=`docker ps -q --filter "ancestor=philhardwick/laradock_workspace:latest"`
          docker exec -i $DOCKER_ID bash -c "php /usr/local/bin/composer.phar install"
          docker exec -i $DOCKER_ID bash -c "php artisan key:generate"
          docker exec -i $DOCKER_ID bash -c "php artisan migrate --force"
          docker exec -i $DOCKER_ID bash -c "php artisan optimize"
          docker exec -i $DOCKER_ID bash -c "php artisan route:cache"
          docker exec -i $DOCKER_ID bash -c "php artisan config:cache"
    
I called this post_deploy.config and placed in it a folder called `.ebextensions`. This file allows you to do multiple things after a deploy has happened but I just needed the commands and files functionality. I used it to create a directory of hooks to be executed, create my environment config file and then created a file with a bash script in it to be put in the created directory. I decided to use the PHP executable within my Docker container to perform the various installations and configurations. This worked very well in the end and I was impressed with not having to install any executables on my EC2 VM. I could rely on the executables always being provided by the Docker containers meaning I could destroy and rebuild the VM anytime and it didn't require any setup.

Another problem I ran into was running npm on a low memory container. It would crash consistently and because I didn't want to go anywhere near my free usage tier limits I decided that checking in the built frontend bundle was an acceptable trade off so that the EB CLI deploy command could upload it with the rest of the code.

## Using RDS

RDS is Amazon's database provisioning and management service. I used it to create a MySQL database as the datastore in Moco. I chose to use RDS rather than a Docker container with MySQL in it because it takes some load off the EC2 instance, it's managed by AWS and comes with upgrade-ability, backup-ability and standard security to protect it. This paid off because halfway through the project I needed to upgrade MySQL in order to use JSON columns and this was a very simple process - it just worked.

In order for Moco to use the RDS instance I used the environment variables automatically assigned by Elastic Beanstalk. I used five of the environment variables: `RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD`. Ideally these would be written into the `.env` file (Laravel's way of overriding configuration per environment) at deploy time enabling you to have multiple environments with the same Laravel database config file.

## The Benefits of Prototyping with Docker and Elastic Beanstalk

 * Having not used containers much in the past I really felt the benefits of [automation](https://capgemini.github.io/development/how-we-work/#know-your-tools-and-automate). Whilst the automation here was very simple relative to most projects I was glad to not have to provision virtual machines or do any manual steps with each deploy. I only had to type `eb deploy` and the application would be down for a minute and then back up with the new changes. This was amazingly fast for me and helped me work faster and better with others in the team - any bugs or changes needed and they could be deployed in minutes.

 * Containerisation also meant I could add a new container whenever, for whatever purpose. In my case I needed a [swagger UI](http://swagger.io/swagger-ui/) and it had to be the very latest version so that it included security options in the UI. Once this was built as a Docker image I just had to add it to my AWS Docker file, configure it, and it was available - completely isolated, composable and built at a specific bleeding edge version. The best thing about this was I only had to do this once: when I destroyed my EC2 instance I didn't have to SSH in, download Node, NPM, build swagger and run it - I just ran the container again.

 * I didn't touch any of the power of Elastic Beanstalk but I understand it can make scaling and load balancing very easy and automatic.

 * It's free! (as in beer). For 12 months you can run 1 small EC2 instance (1GB RAM) and 1 RDS instance. I also didn't get anywhere near the S3 upload limit even though I was uploading new code quite often.

 * Because I was using Docker I could test my containers locally with docker-compose and be confident they would work the same way in the cloud (given that the Dockerrun.aws.json is correct and aligned with the docker-compose.yaml). Containerisation meant I didn't have any issues with missing PHP libraries (I'm looking at you MCrypt!) or differences between versions and I didn't have to stick to the versions of PHP that AWS supports (I've had pain in the past with MAMP's PHP version and system PHP version). Using containers felt easier and smoother than using the MAMP stack and it felt right that the configuration of the processes required to run the code was written and kept with the code. The containers I used came with PHPunit, Composer and other executables ready installed so I spent less time installing tools and more time using them.

## Conclusion

Working with Elastic Beanstalk was absolutely worth it, despite the numerous teething problems. Once set up, it allowed quick iteration on the product and enough configuration to be in control of the infrastructure without being too low-level. It reduced the time I spent interacting with infrastructure and meant I could focus on writing the application. Using it with Docker makes it even more powerful, extensible and maintainable. I can't comment on using this in production but for prototyping I haven't used any better Platform as a Service. Lastly, even if you don't use AWS as a Platform, I would highly recommend trying replacing your \*AMP stack with Docker just for easier development purposes and gaining familiarity with containers.