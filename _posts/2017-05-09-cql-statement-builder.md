---
layout: post
title: "CQL Statement Builder"
description: "Automatic schema generation for Apache Cassandra"
author: tosin_ogunrinde
category: Apache Cassandra
tags: [Apache Cassandra, CQL, DevOps, Java, Open source]
comments: true
share: true
---

Anyone who has worked with [Apache Cassandra](http://cassandra.apache.org) will not underestimate the importance of selecting the right [data model](http://docs.datastax.com/en/cql/3.3/cql/ddl/ddlCQLDataModelingTOC.html). 
However, this could be a daunting task due to the [lack of a generic schema generator (in Java).](http://docs.datastax.com/en/developer/java-driver/3.2/manual/object_mapper/creating/#mapping-collections) 
For example, each time you create a new class/model or your class/model structure changes, you'll have to write or rewrite the [CQL](http://cassandra.apache.org/doc/latest/cql/) statements required to create or update the schemas in your [Apache Cassandra](http://cassandra.apache.org) cluster.

Automation is a core tenet of DevOps and so I have decided to automate this process. I have written a Java library that:

1. Generates the [CQL](http://cassandra.apache.org/doc/latest/cql/) statements required to create or update schemas in an [Apache Cassandra](http://cassandra.apache.org) cluster.
2. Builds a range of [CQL](http://cassandra.apache.org/doc/latest/cql/) statements from standard Java classes/models.

I have now decided to open source this library! So check out [cql-statement-builder](https://github.com/tosin-ogunrinde/cql-statement-builder) and let me know your thoughts.
