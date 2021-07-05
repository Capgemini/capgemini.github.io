---
layout: post
title: "Dotnet, Docker, DevOps"
subtitle: "Docker to build, test and publish Microsoft .NET applications"
description: "Building a docker container to support DevOps with .NET Core and .NET Framework applications"
category: Docker
author: jatwal
tags: [.NET, .NET Core, Docker, DevOps]
comments: true
share: true
---
Since starting on my journey down the Microsoft Open Source road, one of the things I have been introduced to is Docker. Increasingly, I have looked for opportunities where I can use Docker when developing my .NET applications. DevOps has always seemed like a good fit. 

I like the consistency Docker gives me. I can develop, build, test and publish my applications in a consistent environment. It also means transitioning my .NET Application across environments should be relatively frictionless (if I choose to deploy as a Docker container).

As background, as a NET developer, I now have [two options](https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server) when I start to develop my application; .NET Core or .NET Framework. With the .NET Framework, it’s mature and been around for ages. With .NET Core, it’s an open source, cross platform, high performance framework and has made huge progress over the past 2-3 years. For me .NET Core is future for .NET, especially when we are thinking about the cloud.

Digressing slightly - which would I choose? An important consideration when making the choice is the risk I am taking on if I choose to deliver using something new like .NET Core. It’s not that I wouldn’t use NET Core, but I know from experience that the risk is greater. If I choose the mature .NET Framework then I know what I am getting. Ideally, what I need is the [best of both](https://github.com/aspnet/Home/issues/2022) worlds – the assurance that I get of using a framework that I have used for years and something that is future proofed.

Here I would like to focus on a gap (coming back to Docker). The DevOps story around Docker and .NET Core is pretty good. There is already support to [build](https://hub.docker.com/r/microsoft/aspnetcore-build/) and [run](https://hub.docker.com/r/microsoft/aspnetcore/) .NET Core applications in Docker. You can also [run](https://hub.docker.com/r/microsoft/dotnet-framework/) NET Framework applications in Docker. But if I want to use Docker to build, test and publish both .NET Framework and NET Core applications?

To achieve this, I created a [Dockerfile](https://github.com/Capgemini/dockerfiles/blob/master/net-build/Dockerfile) layered on top of the [Windows Server 2016 Server Core](https://hub.docker.com/r/microsoft/windowsservercore/) image. To compliment this image, I installed the latest [MsBuild tools](https://go.microsoft.com/fwlink/?linkid=840931), [.NET Core](https://www.microsoft.com/net/download/core), [various .NET Frameworks](https://www.microsoft.com/net/download) and [NuGet](https://www.nuget.org/downloads). These are some of the tools I might expect to be installed on a server I want to use to build a .NET Application.

But instead of a server, I have the tools I need in a container. And this container can be used by the build system of choice (as long as it has docker installed). I get consistency across my build server(s). I have chosen the tools above, but another team may choose different tools to meet their own requirements. I could extend it to include my build agent. Docker offers much greater density across physical/virtual host, whether its on-premise or cloud. For this example, it offers a model where all build agents across the organization are hosted on a single machine with a view to reduce provisioning costs.

### Cake

At this point it's worth taking time to mention the build system that has been used to achieve this. The Git repository is built using [Cake](https://cakebuild.net/). I'm not going to talk in too much detail about what Cake is, but [Cross-Platform DevOps for .NET Core](https://rehansaeed.com/cross-platform-devops-net-core/) is a good read if you are interested to find out more. To summarize, it allows me to specify my build script in C#, that can be exercised by the build system of choice. It means that this repository is built on both Linux using [Travis](https://travis-ci.org/Capgemini/dockerfiles) and Windows using [AppVeyor](https://ci.appveyor.com/project/jsacapdev/dockerfiles/branch/master). It's an example of a single repository hosting all docker files regardless of if they target Windows (as is the case with this one) or Linux. A docker image is only built if the sub-folder that contains the Dockerfile or associated files change (see below for the link to the GitHub repository). The final image is pushed by the build system to the Docker registry under [capgemini/net-build](https://hub.docker.com/r/capgemini/net-build/). 

### Publish

So, how can this image be used? The [capgemini/net-build](https://hub.docker.com/r/capgemini/net-build/) image is built to run as a Windows Container. It can be used with either [Docker for Windows](https://docs.docker.com/docker-for-windows/install/) on Windows 10 (switching to Windows containers), or [Windows Containers on Windows Server](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/quick-start-windows-server). The commands here were tested on Windows 10, build version >= 14372 and [Server 2016 running on Azure](https://github.com/MicrosoftDocs/Virtualization-Documentation/tree/master/windows-server-container-tools/containers-azure-template) sized at Standard_D1_V2. Take the following command (that can be used during continuous integration) to publish a Windows Classic .NET Framework application:

`docker run -t -v "$(Get-Location):C:/app:rw" --rm --workdir C:/app capgemini/net-build:1.0 powershell.exe "msbuild /p:Configuration=Release /p:PublishDir=./output/ /t:Publish"`

To break this down, `docker run` runs the container. `-v "$(Get-Location):C:/app:rw"` mounts the current directory in the container. `capgemini/net-build:1.0` is the build image. `msbuild /p:Configuration=Release /p:PublishDir=./output/ /t:Publish"` is the powershell command that gets executed in the container to run the build and generate the output to a folder called `output` that you can find in the same folder as the application being built. `--rm` removes the container when the build is complete and it exits.

Let's look at another example. Let's say that you have a newer .NET application that targets both .NET Core and .NET Framework. In your project file (.csproj) you may have the target frameworks set-up as `<TargetFrameworks>netcoreapp2.0;net47</TargetFrameworks>`. `netcoreapp2.0` is .NET Core and `net47` is .NET Framework.

If you want to publish the output from the .NET Framework application, you can run the following command at the root of your solution:

`docker run -t -v "$(Get-Location):C:/app:rw" --rm --workdir C:/app/src/MyApplication/ capgemini/net-build:1.0 powershell.exe "dotnet publish -f net47 -c Release -o ../../frameworkoutput"`

The subtle difference with this command is that the powershell command is run in a sub-folder src/MyApplication/ through setting the `--workdir`, after which you should find the build output in the folder `frameworkoutput` at the root (the same as your mount point). That folder is probably considered as your build system artefact.

To publish the .NET Core variant:

`docker run -t -v "$(Get-Location):C:/app:rw" --rm --workdir C:/app/src/MyApplication/ capgemini/net-build:1.0 powershell.exe "dotnet publish -f netcoreapp2.0 -c Release -o ../../coreoutput"`

In this case `coreoutput` is picked up as the build artefact. These examples show how to capture the build output, but you would probably use [Multi-stage builds in Docker](../../development/multi-stage-builds-in-docker) if you are adding your build output directly to an optimized Docker image ready for staging and production environments.

## Test

To test an application, the following command can be run (to the test .NET Core variant):

`docker run -t -v "$(Get-Location):C:/app:rw" --rm --workdir C:/app/tests/MyTests/ capgemini/net-build:1.0 powershell.exe "dotnet test -f netcoreapp2.0 -c Release --logger trx%3bLogFileName=../../../TestResults.xml"`

You should now find an xml test results file that can be parsed by the build system of choice to find out how your tests went.

The [Capgemini/dockerfiles](https://github.com/Capgemini/dockerfiles) git repository contains the source code, including the build script used by Cake.

### Summary

The docker image described here is more DevOps focused and can be used to build, test and publish applications developed to run on .NET Core and .NET Framework. The docker image is built using Cake on both AppVeyor (for Windows) and Travis (for Linux). It demonstrates that when using Docker to build applications, its quite easy to transition the approach across build systems because the same rules apply within the container regardless of what kicks off the build process.
