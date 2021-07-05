---
layout: post
title: "Multi-stage builds in Docker"
description: "The latest feature in Docker 17.05"
category: Development
author: sophie_field
tags: [Engineering, Docker, DevOps, Open source]
comments: true
share: true
published: false
---
Building lean Docker images is important for performance.
For each RUN instruction that your image contains, a new layer is written to the image and increases the size of that image and disk space required. Therefore 
avoiding creating overly large images is encouraged.
 A recent introduction in [Docker 17.05](https://docs.docker.com/edge/#docker-ce-edge-new-features) is the multi-stage build. This post is going to look at how the separation between a build image and a base image is no longer necessary, by
combining the two in one Dockerfile. 


Before multi-stage builds the familiar syntax of building a Docker image is using one build image and a separate base image that contains
your application run configuration.
To minimise image size without affecting performance there are plenty of tips that can be implemented. To name a few; chaining run statements, removing temporary packages and
ensuring your base image is the right one for your application requirements.
But now Docker allows the option of using more than one 'FROM' command, which means for each stage step you can choose explicitly what you want your final image to contain.
This feature not only helps with the maintenance of Docker applications but reduces the overall size of the run image, so improving performance.


I've set out a simple demo below of how this will work.

## First step: Choosing a Docker image
I'm going to run a simple Node.js application in a Docker container. I have my Node.js application working so the next step is
building the application in Docker. I pulled the following image from Docker hub: 

### Dockerfile

{% highlight yaml %}
FROM alpine:3.1

# Update
RUN apk add --update nodejs

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

# Expose port and define cmd
EXPOSE  8080
CMD ["node", "/src/index.js"]
{% endhighlight %}

I built the image and tested it runs as expected with the following Docker commands:

{% highlight code %}
docker build -t nodejs-demo . 
docker run -p 8080:8080 nodejs-demo 
{% endhighlight %}

Opening my browser at localhost:8080 I can see my application running as expected. 

## Second step: Customising the image
My application is currently using two images, one base image which contains the build and the other image to actually run assets.
Therefore maintaining this application is not straightforward (or as straightforward as it could be).
But let's now build the application in Docker following the multi-stage build pattern. 

### Dockerfile with multi-stage feature


{% highlight yaml %}
# BASE image
FROM alpine:3.1 AS base

# Update
RUN apk add --update nodejs

# Copy project file
COPY package.json /src/package.json

# Install node dependencies
RUN cd /src; npm install

# Bundle app source
COPY . /src


# RELEASE image
FROM base AS release

# Expose port and define cmd
EXPOSE  8080
CMD ["node", "src/app.js"]

{% endhighlight %}

The final multi-stage Dockerfile now contains two FROM statements, one for the base image and one for the final image containing the release configuration.
You can also see that the syntax allows you to name build stage steps too, which is useful for current and future maintainers of the application.
Node modules required to run the application are now installed in the base image. 
Like before I ran the following Docker commands to build and run the application:
{% highlight code %}
docker build -t nodejs-demo-multi-stage . 
docker run -p 8080:8080 nodejs-demo-multi-stage
{% endhighlight %}
The application builds successfully and works as expected. By implementing the multi-stage build functionality, it has reduced the size of the run image and bloat 
by reducing the number of overall layers, all in a single Dockerfile. 



## Conclusion
The goal with multi-stage builds is to build effective images by keeping it simple. By no longer having to use multiple images (and probably a script) to run
your application, Docker now gives you the choice of deciding what it is you want in your final image, reducing overall complexity in order to build lean Docker images.


