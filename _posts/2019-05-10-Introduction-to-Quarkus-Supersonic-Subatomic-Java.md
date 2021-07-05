---
layout: post
title: "Introduction to Quarkus: Supersonic Subatomic Java"
subtitle: A first look into Quarkus
description: This article will introduce Quarkus and some of its boasted features
category: Development
tags: [Development, Java, Containerisation, Serverless]
author: [cburns]
comments: true
share: true
---

Due to the constant evolution of different languages and frameworks in the tech industry, developers are able to develop and deploy apps with faster speeds and lower footprint on the underlying systems in which they are deployed to. This simultaneously increases the need for faster deployments with lower footprint which motivates engineers to make the next best thing in regard to this. This can be one of the leading arguments when deciding which language or framework to use. Is it lightweight? How fast does it run? What is its footprint on the system as a whole? Although there are many engineers who let their bias kick in when choosing a language or framework, you should always choose – within reason – what better suits the current scope of work you are anticipating. One of the reasons Java may not be considered over other technologies when dealing with API microservices is its footprint. Cue Quarkus..

## What is Quarkus?
[Quarkus](https://quarkus.io/) is _"A Kubernetes Native Java stack tailored for [GraalVM](https://www.graalvm.org/) & [OpenJDK HotSpot](https://www.oracle.com/technetwork/java/javase/tech/index-jsp-136373.html), crafted from the best of breed Java libraries and standards"._ Quarkus aims to make Java a leading platform in Kubernetes and serverless environments by also simultaneously offering developers a cohesive reactive and imperative model to [address a wider range of application architectures.](https://developers.redhat.com/blog/2019/03/07/quarkus-next-generation-kubernetes-native-java-framework/) 

Quarkus tailors your application for GraalVM and HotSpot and because of this, you can achieve amazingly fast boot times (by using a technique called compile time boot), incredibly low resident set size (RSS) memory, near instant scale up and high-density memory utilization in container orchestration platforms.

Quarkus also claims that when it comes to the amount of time it takes to boot up the application and deliver its first response it is in the milliseconds, as shown below in comparison with other stacks.


| Configuration                     | REST   | REST + JPA  |
|-----------------------------------|:------:|:-----------:|
| Quarkus + GraalVM	                | 0.014s | 0.055s      |
| Quarkus + OpenJDK                 | 0.75s	 | 2.5s        |
| Traditional Cloud Native Stack	| 4.3s	 | 9.5s        |


From the outset, Quarkus has been designed around a container first philosophy meaning that it is optimised for low memory usage and fast start-up. It does this by enabling the following:
-	First class support for Graal/SubstrateVM
-	Build time metadata processing
-	Reduction in reflection usage
-	Native image pre boot

It also makes developers lives a lot easier by allowing:
-	Unified configuration
-	Zero config, live reload in the blink of an eye
-	Streamlined code for the 80% common usages, flexible for the 20%
-	No hassle native executable generation

Wired on a standard backbone, it brings the best breed of [libraries and standards](https://quarkus.io/vision/standards) you love and use. These standards include CDI, JAX-RS, ORM, JPA and many more and instead of a whole application server the applications are run in an optimized runtime either via a Java runtime, native executable or a native image – something we will dive into later on.

## Creating a Quarkus Application
Enough of the high-level talk, lets dive into some code and real examples.

If you navigate to the Quarkus site, they offer guides on how to correctly setup and configure your system ready to create a Quarkus application as well as how to create your first Quarkus application. For this blog post – whilst skipping the setup – we will align most of our focus on creating the application itself. So, let’s get started.

The easiest way to create a Quarkus project is to use the Quarkus plugin for Maven by running the following inside of a terminal:

    mvn io.quarkus:quarkus-maven-plugin:0.13.3:create \
        -DprojectGroupId=org.acme \
        -DprojectArtifactId=getting-started \
        -DclassName="org.acme.quickstart.GreetingResource" \
        -Dpath="/hello"

This will use the Quarkus plugin in order to generate a skeleton project with a basic `/hello` endpoint along with a landing page, some tests, a Dockerfile for both native and jvm modes and a config file. This acts as a skeleton so you can build on top of it and tailor it towards your requirements. Once the project has been generated let’s try compiling it using the `quarkus:dev` profile: `mvn compile quarkus:dev`

```log
    Listening for transport dt_socket at address: 5005
    2019-04-23 08:39:55,399 INFO  [io.qua.dep.QuarkusAugmentor] (main) Beginning quarkus augmentation
    2019-04-23 08:39:55,887 INFO  [io.qua.dep.QuarkusAugmentor] (main) Quarkus augmentation completed in 488ms
    2019-04-23 08:39:56,146 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.866s. Listening on: http://[::]:8080
    2019-04-23 08:39:56,147 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
```

As shown by the logs above, we can see that after it had finished downloading all dependencies, it both compiled and started in 0.866s. For a first metric that isn’t bad at all, especially when compared to a basic SpringBoot starting time of normally a few seconds – which excludes the stripping away a lot of unwanted config (which you wouldn’t want to have to do if it was a small project).

As it’s started, we can visit the landing page at `localhost:8080` or even hit the basic `/hello` endpoint with `localhost:8080/hello`.

<figure>
    <img src="/images/2019-05-10-Introduction-to-Quarkus-Supersonic-Subatomic-Java/hello-picture.png" />
</figure>

## Development mode
So, we have established so far that both Quarkus compilation and start up is pretty quick but let’s dive into the development mode they boast about. Since we have run the app in `quarkus:dev` mode, we are essentially already doing this. Development mode allows hot deployments with background compilation which means when you make changes to any Java, resource or configuration files and re-hit the application, your new changes will immediately take effect – no downtime. Re-hitting the application essentially triggers a scan of the workspace and if there are any changes detected by Quarkus then the affected files are recompiled, and the application is redeployed, and your new request is then handled by the recompiled code. 
Additionally, in dev mode, it also listens on port `5005` for a debugger, however you can disable this by running it with `-Ddebug=false`.

Hot deployments you say, tell me more! Ok, so, let’s alter the code, so instead of the basic `/hello` endpoint returning “hello”, it returns “hello, this is a new compile”. We can do this by just modifying the return String in the `GreetingResource.java` file: 

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "hello, this is a new compile";
    }

Now, as stated above, these changes will be automatically compiled and redeployed when we hit the endpoint. Let’s give it a try by hitting `localhost:8080/hello` again in our browser or REST client.

<figure>
    <img src="/images/2019-05-10-Introduction-to-Quarkus-Supersonic-Subatomic-Java/hello-new-compile.png" />
</figure>

Wallahhh!!! We now see the new text – which proves that the change was indeed recompiled and redeployed. What do we see in the logs?

```log
2019-04-23 08:56:49,029 INFO  [io.qua.dev] (XNIO-1 task-1) Changed source files detected, recompiling [/zuvsapp/quarkus-api/src/main/java/org/acme/quickstart/GreetingResource.java]
2019-04-23 08:56:49,330 INFO  [io.quarkus] (XNIO-1 task-1) Quarkus stopped in 0.002s
2019-04-23 08:56:49,330 INFO  [io.qua.dep.QuarkusAugmentor] (XNIO-1 task-1) Beginning quarkus augmentation
2019-04-23 08:56:49,418 INFO  [io.qua.dep.QuarkusAugmentor] (XNIO-1 task-1) Quarkus augmentation completed in 88ms
2019-04-23 08:56:49,438 INFO  [io.quarkus] (XNIO-1 task-1) Quarkus 0.13.3 started in 0.108s. Listening on: http://[::]:8080
2019-04-23 08:56:49,438 INFO  [io.quarkus] (XNIO-1 task-1) Installed features: [cdi, resteasy]
2019-04-23 08:56:49,438 INFO  [io.qua.dev] (XNIO-1 task-1) Hot replace total time: 0.409s
```

Well, that’s pretty impressive. As you can see from the logs above, our changes were detected in the `GreetingResource.java` file which triggered Quarkus to stop in 0.002s, further resulting in a recompilation of the changes and redeployment – all in 0.409s. It literally took Quarkus less than half a second to detect the changes made, stop the application, recompile and restart and perform the request. That is essentially live development as no human would be able to distinguish a Quarkus hot deployment any differently from a normal request response time. Normally, you would have to stop the app, recompile it and then restart. That would take normally more than a few seconds most of the time. Quarkus impressively does all this in under half a second – the time of a normal request response from a running API.

Also, one positive – or possibly negative – point on Quarkus’ hot deployments is that the flow of development isn’t interrupted. This is due to no more waiting for rebuilds and restarts of the application which in turn means no more coffee breaks or social media updates. I mean come on, we have all been guilty of checking our phones whilst waiting for a rebuild to complete to only then come back to work completely unfocused and having to take a few minutes to get back in the flow we were in mentally before we stopped. Well, this can be seen as a positive for Quarkus hot deployments as they allow for a constant flow of development by reducing the chance of distraction whilst at the same time increasing productivity. However, some people might see that as a negative as they won’t be able to keep up to date with the matrix of social media, additionally, some may even reduce their coffee intake – but is that really a bad thing?

Now it’s worth mentioning that there are other tools that you can use in order to achieve hot deployments that simulate live development. Tools such as [OpenLiberty](https://openliberty.io/) (minimal server runtime) in combination with [WAD](https://wad.sh/) could also be used to simulate live deployments, however Quarkus does offer this out of the box so there is no assembling of different tools needed.

## Dependency injection
Dependency injection (DI) in Java is thought to be one of the crucial aspects and needs for an application – especially in microservices. DI allows for the reduction in coupling in your application making it more malleable and easier to test. This is one of the core reasons for why Spring – Java’s most popular framework – was initially developed. Nowadays a high percentage of Java apps are written with Spring as they have evolved by taking over many areas of Java development, but a criticism of Spring from developers is that sometimes it’s too big for what you need – a fair criticism some might say? In Quarkus, DI stems from ArC which is a CDI-based DI solution made specifically for Quarkus architecture. ArC additionally comes as a dependency of `quarkus-resteasy` so we already have it in our project.

Let’s do an example by using ArC. First we are going to create a `GreetingService.java` that has a `greeting` method which accepts a `String` argument for `name`. The functionality of this method simply greets the user by their name: 

    @ApplicationScoped
    public class GreetingService {
      public String greeting(String name) {
          return "hello " + name + "\n";
      }
    }

The greeting service above, will now be injected into `GreetingResource.java` which we'll call by passing it a `name` parameter in order for it to return a greeting response.

    @Inject
    GreetingService service;
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/greeting/{name}")
    public String greeting(@PathParam("name") String name) {
        return service.greeting(name);
    }

Now, whilst our application is still running, lets hit the new endpoint to make use of those hot deployments.

<figure>
    <img src="/images/2019-05-10-Introduction-to-Quarkus-Supersonic-Subatomic-Java/hello-chris.png" />
</figure>

There we have it, I have been consequently greeted, and here are our logs when we hit the new endpoint:

```log
2019-04-29 08:39:18,931 INFO  [io.qua.dev] (XNIO-1 task-1) Changed source files detected, recompiling [/zuvsapp/quarkus-api/src/main/java/org/acme/quickstart/GreetingResource.java, /zuvsapp/quarkus-api/src/main/java/org/acme/quickstart/GreetingService.java]
2019-04-29 08:39:19,037 INFO  [io.quarkus] (XNIO-1 task-1) Quarkus stopped in 0.000s
2019-04-29 08:39:19,037 INFO  [io.qua.dep.QuarkusAugmentor] (XNIO-1 task-1) Beginning quarkus augmentation
2019-04-29 08:39:19,118 INFO  [io.qua.dep.QuarkusAugmentor] (XNIO-1 task-1) Quarkus augmentation completed in 81ms
2019-04-29 08:39:19,141 INFO  [io.quarkus] (XNIO-1 task-1) Quarkus 0.13.3 started in 0.104s. Listening on: http://[::]:8080
2019-04-29 08:39:19,141 INFO  [io.quarkus] (XNIO-1 task-1) Installed features: [cdi, resteasy]
2019-04-29 08:39:19,141 INFO  [io.qua.dev] (XNIO-1 task-1) Hot replace total time: 0.210s
```

Pretty neat, now we have an endpoint with a service as an injected dependency which we have made use of to greet us by our name. Pretty simple stuff, to find out more information about Quarkus DI [visit the Quarkus guides](https://quarkus.io/guides/cdi-reference).

## Testing
A wise man once said, “for every hour spent in development, spend 5 in testing”. When we generated the project initially using the Quarkus plugin, it also generated a few tests for us. Quarkus supports both JUnit 4 and 5 but for this we will use JUnit 5. In the GreetingResourceTest.java we have a few new things.

Initially the first thing we can spot is `@QuarkusTest`. This is the Quarkus test runner, it essentially instructs JUnit to start the application before the tests. Let's look at the first test:

    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/hello")
          .then()
             .statusCode(200)
             .body(is("hello"));
    }

Using `RestAssured` we can make use of the BDD style testing. Let’s run `mvn test` to kick off the tests and see what the logs output.

```log
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running org.acme.quickstart.GreetingResourceTest
2019-04-29 08:48:08,426 INFO  [io.qua.dep.QuarkusAugmentor] (main) Beginning quarkus augmentation
2019-04-29 08:48:08,934 INFO  [io.qua.dep.QuarkusAugmentor] (main) Quarkus augmentation completed in 508ms
2019-04-29 08:48:09,197 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.248s. Listening on: http://[::]:8081
2019-04-29 08:48:09,197 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.713 s - in org.acme.quickstart.GreetingResourceTest
2019-04-29 08:48:10,067 INFO  [io.quarkus] (main) Quarkus stopped in 0.004s
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  3.825 s
[INFO] Finished at: 2019-04-29T08:48:10+01:00
[INFO] ------------------------------------------------------------------------
```

Not bad, pretty easy stuff. For more information on testing in Quarkus just [visit the official website](https://quarkus.io/guides/getting-started-testing) where it has information of injections, mock support and native executable testing. Although they may not be the popular frameworks and libraries that are most commonly used (Mockito etc), Quarkus has already shown promise with filling those gaps, so I wouldn’t be surprised if they didn’t include support for your favourite libraries and frameworks in the future – providing they don’t lose sight of its unique selling points of being super-fast.

## Packaging and running of the application
Java applications are normally compiled and packaged into `.jar` files. With Quarkus it’s the same thing with some minor differences. With Quarkus the application is packaged using the package goal (mvn package) and it produces 2 jar files:
- `getting-started-1.0-SNAPSHOT.jar`:  containing the classes and resources of the projects, this is the standard artifact produced by the Maven build.
- `getting-started-1.0-SNAPSHOT-runner.jar`: being an executable jar. Be aware that it's not an Uber-jar as the dependencies are copied into the `target/lib` directory.

When the two `.jar` files have been created, you can run the application without Maven by using the executable jar produced by the package goal by running the following command: `java -jar target/getting-started-1.0-SNAPSHOT-runner.jar`

```log
2019-04-29 08:57:12,158 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.506s. Listening on: http://[::]:8080
2019-04-29 08:57:12,165 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
```

0.506s start up time, not bad. This executable `.jar` can be run locally if you want to run your application without having to start it up in dev mode. However, it is worth noting, in this era, with containerisation being a common principle when dealing with microservices – you may just want to run it in your favourite container platform instead. Additionally, if you did want to run the executable `.jar` inside a container you would also have to copy its dependencies from the `target/lib` folder.

Something to take into consideration, if you follow the common practice of today, images commonly have things baked into them that don’t really concern the running of the application e.g. Maven included in Java based images. This is all well and good but in efforts to reduce the size of the image and footprint on the system, what you ideally want is one executable that has everything it needs to run – kind of like a native executable. This avoids the need to copy `.jar` files into the image themselves with also removing the need to have a JVM. What? Did I just say you can run Java without installing a JVM into an image? I did, let’s see how.

## Creating a native executable
As seen above, when you want to run your application, you would have to use Java in order to run the `.jar` files, or if you wanted to run the executable `.jar` you would have to also make sure it can access its dependencies as well as having a JVM installed and running. Running just the `.jar` is what companies previously did, currently still do and may even do for the foreseeable future, with or without containerisation. Copying the `.jar` file into a container and running it is still a followed method to this day by many – however, it requires an underlying JVM installed inside of the container (which normally comes with the java image chosen). What we want is to create an executable that has our application and everything it needs to be able to run – including the JVM. So, let’s produce a native executable for our application by running `native` profile specified in the project: `mvn package -Pnative`

Now in your target directory you will see another file called: `./target/getting-started-1.0-SNAPSHOT-runner`

This is the native executable, it not only has an improved start-up time of the application whilst producing minimal disk footprint but included in this executable is everything the application needs to run – including the JVM, which has been shrunk to be just enough to run the application. The size of the native executable is around 19M whilst the default packaged `.jar` file is around 6.1k, however when you factor in all the things needed in order to run the default `.jar` file, the footprint in regards to resources quickly adds up to a number that eventually surpasses the executable.

Let’s run the executable by running the following and see what happens: `./target/getting-started-1.0-SNAPSHOT-runner`

```log
2019-05-04 17:12:08,830 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.007s. Listening on: http://[::]:8080
2019-05-04 17:12:08,877 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
```

From the logs we can see that the application started instantly (0.007s), I don’t think my finger even got 5 cm away from the keyboard before it was already started. When compared to the default `.jar` being run via Java which took 0.506s to start, the speeds I must say, definitely favour the executable.

However, by default, the native executable is made specifically for your operating system (Linux, macOS, Windows etc). Due to the container not using the same executable format as the one produced by your operating system, we will instruct the Maven build to produce an executable from inside a container. When we run the following command, an executable will be produced that is a 64bit Linux executable so depending on your OS you may not be able to run it, however this is fine as we will be copying it into the Docker container. Run the following command to create the 64bit Linux executable: `mvn package -Pnative -Dnative-image.docker-build=true`

Just to note if we try and run this new executable (I’m on MacOS) we get the following error which as explain above is expected
`zsh: exec format error: ./target/getting-started-1.0-SNAPSHOT-runner`

As explained above, now we have a Linux executable, what we now want is to bake this into an image which we can use to create our container. 

## Creating a native image
Nowadays, companies that are taking on new development work or performing their routine infrastructure redesign would normally move towards a microservice architecture. Within the microservice world, `.jar` files themselves aren’t really used in the same way as before. Previously the application was packaged up into a `.jar` file (or .war file) and was executed on the host operating system – whether it be a developer’s system, CI server or a production server.  Nowadays, those same `.jar` files are instead baked into images containing a JVM which containerisation platforms would use in order to deploy the application. These same images are subsequently passed on through the pipeline to what would be its final destination; a container orchestration platform in a production environment.

As mentioned above, with Quarkus, we don’t need to worry about jar files anymore and instead we can create executables that includes the application and everything it needs in order to run. All we need is a native image in order to create our container and that’s it. So, enough talk, let’s create our native image.

Initially, the project generated at the start already has a Dockerfile that we can use to create our image. If we go to `src/main/docker` we can see `Dockerfile.native` that contains the following:

```dockerfile
FROM registry.fedoraproject.org/fedora-minimal
WORKDIR /work/
COPY target/*-runner /work/application
RUN chmod 775 /work
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
```

I’m not going to go through and explain what each line does as I am making an assumption that you’re somewhat familiar with Docker and Dockerfile’s but in summary, the image is based on a minimal Fedora distribution and it copies the executable we created earlier into the image and then runs it. Now following the traditional Docker image building process, we can use the `Dockerfile` above to generate our Docker image by running the following: `docker build -f src/main/docker/Dockerfile.native -t quarkus/getting-started .`

```log
Sending build context to Docker daemon  29.79MB
Step 1/6 : FROM registry.fedoraproject.org/fedora-minimal
latest: Pulling from fedora-minimal
21d95e340ee0: Pull complete
Digest: sha256:28dcdc19fd1d55598dc308a44c40287f4b00d0bf5a53cd01c39368c16cf85d57
Status: Downloaded newer image for registry.fedoraproject.org/fedora-minimal:latest
 ---> f0c38118c459
Step 2/6 : WORKDIR /work/
 ---> Running in 62a0e3c1dbe8
Removing intermediate container 62a0e3c1dbe8
 ---> bc01e702d69d
Step 3/6 : COPY target/*-runner /work/application
 ---> e7789344d420
Step 4/6 : RUN chmod 775 /work
 ---> Running in dbe607e95f45
Removing intermediate container dbe607e95f45
 ---> 662387367ca5
Step 5/6 : EXPOSE 8080
 ---> Running in add3e9db00bf
Removing intermediate container add3e9db00bf
 ---> c0e163af8cb1
Step 6/6 : CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
 ---> Running in 646e7c2a9da8
Removing intermediate container 646e7c2a9da8
 ---> 1ec6e9c7e910
Successfully built 1ec6e9c7e910
Successfully tagged quarkus/getting-started:latest
```

Now the image has been created on our machine at 125MB we can now run the image in a container using the following command: `docker run -i --rm -p 8080:8080 quarkus/getting-started`

```log
2019-05-04 16:30:14,826 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.005s. Listening on: http://0.0.0.0:8080
2019-05-04 16:30:14,826 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
```

Shown by the logs above, the container with the running application has started in 0.005 seconds. Compared to the average Java container start up, that is ridiculously fast as now we have a containerised Java application fully running and ready to handle requests.

With regard to footprint, I believe we have achieved very impressive metrics as the overall impact on resources have now been cut down by a large percentage due to the container itself only running a barebones minimum distribution alongside an executable that not only has the application and its dependencies but also the JVM. The size of the image, however, is 125MB and is still rather big, after all, it is Quarkus we are talking about. Let’s see if we can shave a few megabytes off the image size.

## Distroless images
Although everything so far has been very impressive, the image size is still a bit too big. We can take this a step further by using distroless images that take even less space on the underlying system. Distroless images only contain the application and its runtime dependencies – no package managers, shells or any other programs found on a standard Linux distribution.

I won’t go through the ins and outs of creating distroless images as it is a subject in itself, however, to create a distroless image in our case we can replace the contents of the `Dockerfile.native` with the following:

```dockerfile
FROM debian:stable-slim AS build-env

FROM gcr.io/distroless/base
WORKDIR /work/
COPY target/*-runner /work/application
COPY --from=build-env /lib/x86_64-linux-gnu/libz.so.1 /lib/x86_64-linux-gnu/libz.so.1
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
```

This uses a technique called multi-stage building and so when we run the following command again to build the image based on the updated Dockerfile: `docker build -f src/main/docker/Dockerfile.native -t quarkus/getting-started .`

We now get an updated image created on our system and this time the size is 36.9MB – almost 100MB smaller. Now what happens if we run it?

```log
2019-05-04 23:54:18,788 INFO  [io.quarkus] (main) Quarkus 0.13.3 started in 0.004s. Listening on: http://0.0.0.0:8080
2019-05-04 23:54:18,788 INFO  [io.quarkus] (main) Installed features: [cdi, resteasy]
```

Looking at the logs above, although there’s no real improvement in start-up time, by using a distroless image we managed to shave off almost 100MB from the image size - resulting in less disk space being used. Not too bad when you consider the fact that the `openjdk:8-jre-alpine` image is 84MB in size and also happens to be one of the most commonly used Java images today.

Additionally, we already know the container starts up almost instantly, but it is also worth noting that its memory usage is 1.848MiB. To give some context, a standard containerised SpringBoot application with a standard packaged jar file using the `openjdk:8-jre-alpine` image runs at around 350MiB. 

Realistically, in the world of containerisation and container orchestration, the image is the artifact that is not only used to run the application but to create the container. As shown above, the image created by Quarkus not only starts at ridiculous speeds but overall has less of a footprint on the system. Although the image size can be reduced even further by using distroless images, this is a step further in the direction of footprint reduction that the majority of people still do not do. However, combined with a native executable as shown above, the numbers are astounding. That being said, what we have shown in this article is the frontier of the Java world in regard to creating, running, and deploying applications via containerisation. Like most things in this industry it will take companies a few years before they evolve to a point where these things are adopted – which may not be a bad thing for them business wise as all the creases and holes may have been ironed out and filled by that time – as after all, if you are on the front line, you are most likely to get shot and hurt ;).

## Closing thoughts
As this was just the unearthing of Quarkus as a whole, there are many different capabilities it has and continually keeps adding and if you want more of an idea and guide on what these could be head over to the [Quarkus](https://quarkus.io/) site. 

With more current generation developers and companies choosing serverless frameworks for their applications, speed and footprint is one thing that has to be considered. Quarkus definitely provides an efficient solution for running Java in this new world as it was designed with these in mind. In fact, one of the unique selling points for Quarkus - and in fact running Java applications natively – is the extremely short start-up time. As shown above, everything operates in a matter of milliseconds, from building, starting and deploying to hot deployments, you’re never sat waiting for something to happen, everything is instantaneous. This in itself can be seen as a game changer, especially nowadays since companies are starting to up their expectations of wanting to be able to setup and tear down applications and services in the blink of an eye, all whilst having a minimal footprint on the underlying systems.

Still though, throughout its history and still to this day, one of the biggest limitations in the Java world is performance as the JVM needs a huge amount of time and resources to start up. In its defence, its runtime has mostly been optimized for throughput in long-running processes but with current companies demanding that applications should aim to start-up almost instantly it’s simply not enough to start a JVM in the normal way anymore. This is somewhat solved with the creation and use of images and containers as it removes the need of having to start up full JVMs therefore resulting in less resource strain on the underlying systems.

Lastly, I have to agree with Sebastian Daschner from DZone / JavaZone [when he says](https://dzone.com/articles/thoughts-on-quarkus) that whilst all this is interesting, we shouldn’t just forget that most enterprises are still running, and probably will continue running, their workload for a longer period of time with no plans to change anytime soon. However, as he describes, the approach of getting rid of most of the “dynamics” at runtime also has a positive impact on the overall resource consumption and is certainly promising and a step in the right direction.
