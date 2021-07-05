---
layout: post
title: Encrypting configuration in Apache Karaf
description: >-
  Most application configuration will contain some sensitive information,
  this post will show you how best to use Jasypt in Apache Karaf to encrypt it
  and set up your application to decrypt when needed.
category: Development
author: phil_hardwick
tags: [Java, OSGi, Security, Encryption]
share: true
published: true
mathjax: false
featured: false
---

It's very important to encrypt passwords or other sensitive information in configuration files. This stops attackers gaining easy access to sensitive information, limiting the way they can harm your system. This has been made easy in an [OSGi](https://www.osgi.org/) environment with [Jasypt](http://www.jasypt.org/) due to the features and classes it provides. 

Any work to do with security starts with an awareness of the attack vectors that are being mitigated by your work because it will influence how you implement the changes and choose between trade-offs. This example will minimise the damage an attacker can do if they gain access (read-only) to the configuration files.

In this example I'll be working with [Apache Karaf](http://karaf.apache.org/) to provide OSGi and [Apache Aries Blueprint](http://aries.apache.org/modules/blueprint.html) to provide dependency injection.

## Blueprint configuration
To enable Blueprint to decrypt properties you need to add a property parser to your blueprint xml:

    <!-- Jasypt Decryptor -->
    <enc:property-placeholder>
        <enc:encryptor class="org.jasypt.encryption.pbe.StandardPBEStringEncryptor">
            <property name="config">
                <bean class="org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig">
                    <property name="algorithm" value="PBEWITHSHA256AND192BITAES-CBC-BC" />
                    <property name="providerName" value="BC" />
                    <property name="passwordEnvName" value="${passwordEnvName}" />
                </bean>
            </property>
        </enc:encryptor>
    </enc:property-placeholder>
    
Which requires a new namespace in the same file:

    xmlns:enc="http://karaf.apache.org/xmlns/jasypt/v1.0.0"
    
All of which requires the jasypt-encryption feature to be installed in your Karaf container. This feature will export the packages and classes needed by your Blueprint and will provide the necessary namespace handler above. The above snippet also includes a variable for the `passwordEnvName` allowing the name of the property which holds your master password to be changed per application or per environment (it's not good to have the same master password between environments).
    
## Keeping the master password safe
Jasypt provides [a number of classes](http://www.jasypt.org/advancedconfiguration.html) to configure how properties should be decrypted: 

 * Simple - password is a value passed to the class i.e. it's in your configuration file, defeating the point of encrypting properties in the first place
 * Environment - this means that you configure the key of a operating system property or JVM (Java Virtual Machine) property and this class will retrieve the value and keep it in memory for use in decrypting the passwords. Bear in mind, the risk of the master password being visible on the system e.g. in a process command and the need for applications to automatically restart and therefore always have access to the master password.
 * Web - the application waits until the master password is entered in a web UI by someone.
 
The last two are the most secure as it means your master password is now no longer in configuration too. Let me be clear: *doing work to encrypt properties is only useful as long as your master password is safe.*

## Configuring a good algorithm
The Oracle JDK does not ship with the strongest encryption algorithms (due to US export laws): only MD5 or SHA1 and [DES (Data Encryption Standard)](https://en.wikipedia.org/wiki/Data_Encryption_Standard) are included which are all considered insecure now. The [Java Cryptography Extension pack](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) can be downloaded to add to the JDK but there is another easier way. [Bouncy Castle](https://www.bouncycastle.org/java.html) provides a wide range of algorithms which are much more secure than those packaged with Java, including other SHA and, critically, [AES (Advanced Encryption Standard)](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) based algorithms. I recommend using AES, please do not use MD5, SHA1 or DES based encryption.

### Using Bouncy Castle
There are a few ways to configure Bouncy Castle:

The first (and easiest) way is below. Using it means that just the JVM fired up by your application has Bouncy Castle as a provider. Place this in a method which is run when the application is started up so it is run just once:
    
    Security.addProvider(new BouncyCastleProvider());
    
It also requires a Maven dependency:

    <dependency>
        <groupId>org.bouncycastle</groupId>
        <artifactId>bcprov-jdk15on</artifactId>
        <version>1.56</version>
    </dependency>
    
The second way is to add to the Java installation so that any created JVM will have Bouncy Castle as a provider. This requires putting the Bouncy Castle jar in the $JAVA_HOME/jre/lib/ext directory and adding a security provider line to the java.security file. This is more involved and inflexible.

Once Bouncy Castle is available Jasypt needs to be told to use it. This is done by setting the provider name on the Jasypt Config class e.g. `<property name="providerName" value="BC" />` (`BC` is the String constant name of the Bouncy Castle provider). Now feel free to configure the Config class with any of the wide and varied [encryption algorithms available to you](http://www.java2s.com/Code/Java/Security/Whatisinbouncycastlebouncycastle.htm).

## Dockerise and automate
The mention of encryption might make other developers in your team groan as they realise that it's going to be harder to make sure components are connected and configured correctly. When encrypting configuration you should try not to make other developers have to work harder once you've completed your work. One way of doing this is using [Docker](http://docker.io/) , as a standalone executable which has the necessary components packaged up, to encrypt and decrypt text in one line. This tool is completely separate to the runtime of the application we've just been modifying. Docker is a convenient platform to run this standalone tool to encrypt and decrypt Strings with a password. For example:

    docker run philhardwick/docker-crypt:1.0-SNAPSHOT jasypt-1.9.2-dist/jasypt-1.9.2/bin/encrypt.sh input=Password123 password=secret providerName=BC algorithm=PBEWITHSHA256AND192BITAES-CBC-BC
    
Once the process finishes the container exits and the password entered as a parameter is no longer stored anywhere - except possibly your bash history (you can prevent this by preceding the command with a space).

So instead of each developer setting up Java locally to have Bouncy Castle as a provider, downloading the Jasypt jars and then running the encrypt command, all they have to do is copy and paste. Feel free to use this docker container to make encrypting and decrypting passwords easier. To decrypt, use the decrypt.sh script in the same directory with the same parameters (using encrypted text as input). You can also list the available algorithms:

    docker run philhardwick/docker-crypt:1.0-SNAPSHOT jasypt-1.9.2-dist/jasypt-1.9.2/bin/listAlgorithms.sh

## Jasypt in JBoss Fuse
When using Blueprint you don't explicitly write bundle activators so there isn't an application boot method to register Bouncy Castle using the method `Security.addProvider(new BouncyCastleProvider())`. Thankfully, [JBoss Fuse](https://developers.redhat.com/products/fuse/overview/) (a distribution of Karaf with some extras) makes this easy since it's already registered by default as a Java Cryptography Extension provider. The only problem I had in setting up this example is the Jasypt Configuration classes being found correctly. I use the Apache Felix Maven bundle plugin to generate bundles as part of the build (Felix is the core OSGi implementation which Karaf uses and wraps with some extra features). A bundle is simply a Jar with a MANIFEST.MF file in the root directory which specifies the imported and exported packages. This plugin generated a manifest that specified that my bundle needed the Jasypt package version 1.9 to 2.0 whereas the deployed version was a Redhat specific version (with a textual Redhat identifier which OSGi couldn't understand). When there are unresolved dependencies in the OSGi container I find it helpful to unzip the bundles and find the required dependencies, in the import-package, in the MANIFEST.MF. In this case Karaf required adding a specific version in the bundle plugin Import-Package instruction like so:

    <plugin>
        <groupId>org.apache.felix</groupId>
        <artifactId>maven-bundle-plugin</artifactId>
        <version>2.3.4</version>
        <extensions>true</extensions>
        <configuration>
            <instructions>
                <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
                <Bundle-Description>${project.description}</Bundle-Description>
                <Import-Package>org.jasypt.encryption.pbe;version=${jasypt.version},org.jasypt.encryption.pbe.config;version=${jasypt.version},*</Import-Package>
            </instructions>
        </configuration>
    </plugin>
    
Where jasypt.version is filtered by Maven into the specific version of Jasypt bundled with JBoss Fuse.

## Testing
To test this, I used [Stefan Birkner's System Rules](http://stefanbirkner.github.io/system-rules/#EnvironmentVariables) to set OS variables which my Blueprint test could use. This library provides [JUnit rules](https://github.com/junit-team/junit4/wiki/Rules) which allow you to set a range of variables and expectations on system dependencies. My use of the library used the `EnvironmentVariables` rule and overrode the setup method to set the variable and add Bouncy Castle:

    public class TestABlueprintCanStartWithEncryptedProps extends CamelBlueprintTestSupport {
    
    ...

        @Rule
        public final EnvironmentVariables environmentVariables = new EnvironmentVariables();
    
        @Override
        public void setUp() throws Exception {
            Security.addProvider(new BouncyCastleProvider());
            environmentVariables.set("MASTER_PASSWORD", "secret");
            //Make sure you call the CamelBlueprintTestSupport setup method
            super.setUp();
        }
    
    ...
    
    }

## Conclusion
It's not hard to encrypt properties using the tools available and so it should be standard practice when configuring applications. Make sure you look for other information that may be sensitive: API keys or passphrases, and encrypt those too. Keep the master password safe and use a strong encryption algorithm. 
