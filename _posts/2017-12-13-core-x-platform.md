---
layout: post
title: "Microsoft, .NET and not (necessarily) Windows"
subtitle: ".NET Core to write applications once and run them cross platform"
description: "Benefits of using .NET Core and tools to create a .NET Core application that will run cross platform"
category: .NET
author: jatwal
tags: [.NET, .NET Core]
comments: true
share: true
---

Recently I looked into developing a cross platform .NET Core application. Up to a few years ago a .NET application was developed with the intention to run it on Windows. Not anymore. The landscape for .NET has changed dramatically over the past two years. And that’s probably because the landscape for Microsoft has changed as well.

I understand there may an audience who says "with our programming language we've been able to do cross platform forever". Bear with me. You need to understand that for a developer using Microsoft .NET this is a big change. I went from being someone who found developing on 'not Windows' daunting, to being a developer who now embraces these platforms. For me, I have had to adapt but now have the flexibility to move in different directions based on my particular requirements and constraints at the time. I think open source, cross platform gives you flexibility where you need it most - at the point when you are code complete and need to move forward. Its great to know I have the option to run my code on an operating system of choice. And .NET Core will run most places on premise and anywhere on the cloud. It runs on Amazon ECS just as it can run in Azure, or in a Docker container that runs in Kubernetes or OpenShift, or whatever.

Microsoft has been good at allowing developers to be productive relatively quickly, through their frameworks and tools, and that hasn’t changed. Below I demonstrate how to create a cross platform application with a short walk through and the tools you need. But there is more to .NET Core than just cross platform. It allows you to create .NET applications that are faster, cheaper and easier to maintain. Let’s touch on each of those areas. Note that the following applies to .NET Core and not the [.NET Core on the .NET Framework](https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server).

### Faster and Cheaper

.NET Core has made gains in [performance](https://blogs.msdn.microsoft.com/dotnet/2017/06/07/performance-improvements-in-net-core/) by looking at and improving the low level internals of the fundamental things that computer programs do. There is a message that ASP.NET Core is x many times faster than ASP.NET (x changes depending on who you speak to), but that is a relative measure. If ASP.NET wasn’t that quick in the first place, and ASP.NET Core is better, then it’s probably still nowhere near some of the high performance open source web servers that exist. But, why is high performance code important?

Well, let’s look at the cloud as an example. For those of us who have looked at developing Microsoft application designed for the cloud, a key design principle is designing the application to scale horizontally. So you have developed an application according to those design principals and now your application needs to scale. So Microsoft tells you to scale out, but what’s the impact of that? Well, cost probably. Scaling horizontally may mean more compute time, which maybe means a higher bill at the end of the month. If I choose not to use a Microsoft web server, would my throughput be greater and therefore my costs lower?

If we look at the [road map](https://github.com/dotnet/corefxlab/blob/master/docs/roadmap.md) it seems Microsoft have realized this and are putting effort in to do something about it. The important statement is *“optimize .NET much more for scenarios in which inefficiencies are directly tied to your monthly billing”*. I also believe performance gains are important for Azure because .NET Core will be the framework that underpins Microsoft's PaaS and server-less offers. If everything in the cloud is a price war, then the framework becomes more attractive to potential customers if it costs less to run.

Add to the mix the contribution the community have been making around performance improvements. An example is the [pull request](https://www.ageofascent.com/2016/11/23/asp-net-community-standup-de-bruijn-ben-magic-number/) submitted by the Age of Ascent. To summarize, reading and parsing bytes off a socket buffer with a web request is relatively expensive. This pull request took months to complete. That story behind it is important, people working together and working toward a common goal. Some of the best things about open source. The new [Span<> and Memory<>](https://channel9.msdn.com/Events/Connect/2017/T125) constructs are specifically designed for high performance parsing of data streams and reducing heap allocations. These constructs will probably be introduced at some point next year.

Finally, the intention must be to have much higher density per host, whether that host is physical, virtual or through the use of some form of containerization. .NET Core achieves that. A key driver for moving to the cloud has always been to bring down costs and it’s only correct that .NET Core already supports a variety of deployment scenarios with a view to making it a more attractive framework for increasing density and therefore reducing costs.

### Easier to maintain

I started to think about my experience of starting on a new project. Let’s say I start and Application A is already out there, doing its job well and for a while. I come along and develop the new Application B. Application B has all the bells and whistles so uses the latest version of .NET. Application A was developed a while ago, perfectly happy with an older version of .NET. When it comes to deploy it, I have two options. I can co-host both and so upgrade Application A to use the new framework. That means more time and cost (regression test, support impact, etc.). Or, maybe I will ask for another server. That’s low risk, and both Application A & B are happy. Virtualization has become an easy option as far as the application development is concerned but provisioning an on premise server may take a little while. And there is also the small thing of two under-utilized servers. 

Well, a key concept in .NET Core (not the .NET Framework) is side-by-side. It means you can host as many .NET Core applications as you need on a single server, all targeting different .NET Core runtimes with zero impact in terms of regression testing and support. This is more important in a multi-tenant architecture where those other applications may not be yours.

### Example

Below is a short walk through to create a new cross platform .NET Core Web Api. You will need to download and install the [NET Core SDK](https://www.microsoft.com/net/download) and [Visual Studio Code](https://code.visualstudio.com/download) (probably in that order). You will also need [OmniSharp](https://github.com/OmniSharp/omnisharp-vscode) which is the engine that powers C# in Visual Studio Code, but you dont need to download that explicitly, VS Code will do that for you (more on that later). I have tested the following on a Mac, Ubuntu 16.04 and Windows. These steps are the same across all three and that highlights an important point - a consistent tooling experience across all platforms.

Once the .NET Core SDK has been installed, open a terminal window (or PowerShell). Note that if you are using PowerShell replace the '&&' with a ';' to chain up commands. 

Create a new folder and cd into it:

`mkdir corexplatform && cd corexplatform`

Create a new .NET Core solution:

`dotnet new sln`

Create a new src folder and cd into it:

`mkdir src && cd src`

Create a new Web Api and give it a name CoreXPlatform.API:

`dotnet new webapi -n  CoreXPlatform.API`

Add the new Web Api to your solution:

`dotnet sln ../CoreXPlatform.sln add ./CoreXPlatform.API/CoreXPlatform.API.csproj`

Create a new sub folder called test at the solution level:

`cd .. && mkdir test && cd test`

Create a XUnit test project called CoreXPlatform.API.Tests:

`dotnet new xunit -n CoreXPlatform.API.Tests`

Add the test project to the solution:

`dotnet sln ../CoreXPlatform.sln add ./CoreXPlatform.API.Tests/CoreXPlatform.API.Tests.csproj`

Reference the project you want to test in the Test project:

`dotnet add ./CoreXPlatform.API.Tests/CoreXPlatform.API.Tests.csproj reference ../src/CoreXPlatform.API/CoreXPlatform.API.csproj`

You now have a project that you can begin to develop in Visual Studio Code. Now open Visual Studio Code and `File -> Open Folder` the `corexplatform` folder. If this is a new install VS Code should recognize you are trying to work with C# project and prompt you to install a C# Extension. This is OmniSharp that I mentioned earlier. If you dont get the prompt, on the left hand-side panel, the bottom icon is for extensions. Search for the C# extension and install it (VS Code will prompt you to reload the editor). Its also worth taking a look through the many, many extensions supported by VS Code.

VS Code will take a little while to download what it needs. Bear with it, its worth the wait. If you look at the Output window (Ctrl+Shift+U) you can see VS Code performing the download. An example on my Windows 10 machine:

![downloading OmniSharp](/images/2017-12-13-core-x-platform/omnisharp.png)

You will now want to build and run the application. VS Code should provide a prompt to install the dependencies you need:

![build and test](/images/2017-12-13-core-x-platform/buildtest.png)

Click yes and you will notice a new `.vscode` folder has been added to the root with two files; `tasks.json` that is used to build the application and `launch.json` that is used to run the application. If you hit Ctrl+Alt+B VS Code will proceed to use `tasks.json` and prompt you to build your Web Api. To debug, hit F5 and VS Code should start the application. Once the application is running you can test the Web Api locally in a bash shell using `curl -iv http://localhost:5000/api/values` or in PowerShell using `Invoke-WebRequest http://localhost:5000/api/values`.

So that provides a minimal solution that you can begin to start to work with. A Git [repository](https://github.com/Capgemini/CoreXPlatform) has been created using the commands above. It provides some reference material in case you have any problems setting this up. There are also the [launch configurations](https://github.com/Capgemini/CoreXPlatform/blob/master/.vscode/launch.json) for both Windows and Linux under the .vscode folder. It also has some other highlights including a cross platform build script using [Cake](https://github.com/Capgemini/CoreXPlatform/blob/master/build.cake), build definitions for [Windows](https://ci.appveyor.com/project/jsacapdev/corexplatform/branch/master) and [Linux](https://travis-ci.org/Capgemini/CoreXPlatform) and multi-stage [Windows](https://github.com/Capgemini/CoreXPlatform/blob/master/Dockerfile.windows) and [Linux](https://github.com/Capgemini/CoreXPlatform/blob/master/Dockerfile) docker builds that allows you to optimize the size of the Docker container hosting your cross platform application. 

At this point it's worth pointing out that there are also some quite useful tools that will aid the development of cross platform applications using .NET Core. Two of these are Windows Subsystem for Linux (WSL) and API Analyzer.

### WSL

Windows Subsystem for Linux (or WSL) is useful if you want to use Windows 10 as a single development environment to build, test and run your cross platform .NET Core applications. WSL gives you an opportunity to get feedback early on how your application will behave and also the opportunity to debug if your development and target environments are different. Once WSL is [installed](https://msdn.microsoft.com/en-us/commandline/wsl/install-win10), you will also need to install the [.NET Core SDK](https://www.microsoft.com/net/download/linux) for Linux. Its worth pointing that WSL is independent from the Windows 10 host, and therefore doesn't share tools. In fact, you should not edit Linux files using Windows Tools as it can cause [problems](https://blogs.msdn.microsoft.com/commandline/2016/11/17/do-not-change-linux-files-using-windows-apps-and-tools/). Below shows both .NET Core SDK's on a single Windows 10 host:

![build and test](/images/2017-12-13-core-x-platform/wsl.png)

There are some simple [instructions](https://github.com/OmniSharp/omnisharp-vscode/wiki/Windows-Subsystem-for-Linux) as to how to set-up VS Code to either launch your application to debug on WSL or attach when it is running. 

### API Analyzer

The .NET API Analyzer is a NuGet package that you can add to your application that will tell you if there are any compatibility issues when running your code between Windows and Linux. The Analyzer will throw up warnings at compile time if it thinks you may have problems later on at runtime. The following example demonstrates how to add the .NET API Analyzer to an application.

Create a new console application:

`dotnet new console`

Add the API Analyzer:

`dotnet add package Microsoft.DotNet.Analyzers.Compatibility --version 0.1.2-alpha`

Open the `Program.cs` and add some Windows specific code:

```
using System;

namespace CoreXPlatform
{
    class Program
    {
        static void Main(string[] args)
        {
            var w = Console.WindowWidth; // only works on Windows
        }
    }
}
```

Build the application and you should see the warnings telling you things will not go well on Linux and Mac:

```
PS C:\Git\CoreXPlatform> dotnet build
Microsoft (R) Build Engine version 15.4.8.50001 for .NET Core
Copyright (C) Microsoft Corporation. All rights reserved.

Program.cs(9,29): warning PC001: Console.WindowWidth isn't supported on Linux, MacOSX [C:\Git\CoreXPlatform\CoreXPlatform.csproj]
  CoreXPlatform -> C:\Git\CoreXPlatform\bin\Debug\netcoreapp2.0\CoreXPlatform.dll

Build succeeded.

Program.cs(9,29): warning PC001: Console.WindowWidth isn't supported on Linux, MacOSX [C:\Git\CoreXPlatform\CoreXPlatform.csproj]
    1 Warning(s)
    0 Error(s)

Time Elapsed 00:00:04.91
```

### Summary

.NET Core has three key selling points. Firstly, it allows developers to create applications and then have the flexibility to deploy them across multiple platforms. Secondly, .NET Core is being developed with performance in mind, and in addition to the general performance improvements there is a view to reduce the costs of hosting your .NET Core applications in the cloud. Finally, it supports a side-by-side model to reduce support implications of co-hosting applications and to give much greater density per host, again with a view to try and reduce costs. In addition to these, the tooling allows developers to be productive. The example above shows how a solution can be setup in 10 or so commands across platforms (Windows, Linux or Mac).