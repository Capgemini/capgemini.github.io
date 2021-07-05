---
layout: post
title: "To SQL or not to SQL"
subtitle: "SQL vs NoSQL: which one should you choose?"
description: "A comparison of SQL and NoSQL, and a overview of common databases of each type"
category: Design 
author: paul_monk
tags: [SQL, NoSQL, Databases]
comments: true
share: true
---

## Overview
A common question that many developers and architects struggle to answer is which technology stacks should I use for my project, and more importantly why? This decision is particularly important when it comes to picking a database, as databases are often the backbone of an application. They affect which other technologies are used and the overall performance of the application.
There are many articles that describe the advantages of different database software, and every company likes to advertise their database as the best. But there are circumstances when different types of database are better than others.

## SQL (Structured Query Language)
SQL databases have become the standard database for most applications. There are clear standards (both ANSI and ISO) that SQL databases must meet, and there is extensive support for them, both on a community and enterprise level. The main strength of an SQL database is its relational data model, where referential integrity between data can be guaranteed.

### Pros
#### Powerful query language
The SQL language is well known, with many functions and a concise syntax. Simple commands can be learnt quickly, however it takes a lot of work to master the language and database design.

#### Optimised for large numbers of table rows
Tables can hold millions of rows of data, and still maintain fast performance. SQL databases are optimised to hold and search through large amounts of data, and indexes can be used to speed up search and retrieval of rows.

#### Can handle large numbers of transactions in a single query
The query language is powerful enough to carry out several commands in one query. Queries can be nested inside each other, and in Oracle databases SQL is extended by [PLSQL](http://www.oracle.com/technetwork/database/features/plsql/index.html), adding an aspect of procedural programming to aid in building queries and carrying out complex queries with many logical steps.

#### Many different choices of database, and wide support
Having been around for many years, and being widely used in many enterprise applications, there is a wide range of community and enterprise support for SQL databases. There are also many different databases that are of an enterprise standard.

#### Fast for searching and querying of data
With support for indexes and lots of other optimisations, SQL databases are the fastest for carrying out searches of data over a single table. Performance can drop off when searching across multiple tables, so a good design is important to maintain performance.

#### Fast for retrieving data from multiple tables
Due to foreign-keys and the maintaining of referential integrity between tables, SQL databases can retrieve data across several tables quickly. The SQL language also has good support for this using JOINS. However as stated above a good design is important to maintain performance, as well as optimised queries.

#### High availability and consistency of data
As the majority of SQL databases are very mature and run on a single server, it means that they are highly available and data is always consistent as there is no need to synchronise data over many servers.

### Cons
#### Predefined and inflexible data model
Data migration is always an issue with SQL databases. Every time you want to add a new column, or delete one every row of the table is affected. If you start updating foreign keys then maintaining the referential integrity of data can be a nightmare. This typically results in large migration scripts to adjust data every time the data model changes.

#### Can be difficult to convert data from Objects into database tables
Many languages have support for converting data from an SQL database into Objects that can be used programmatically. However configuration can often be fiddly, the phrase “it’s easy when you know how” really does apply here! 

#### Vertically scalable, can only run on one server so increasing speed means upgrading hardware
The architecture of SQL databases mean that they can generally only be run on one server, so expensive hardware is needed to cope with large amounts of data and high demand.

#### Lack of partition tolerance
As SQL databases generally run on one server if that server goes down then the database can't be accessed. There are workarounds for this such as having multiple servers listed in the connection strings, but this isn't as flexible as having multiple servers running for the same database instance.

## Common SQL Databases
Here are the most popular types of SQL databases. As well as the common pros and cons that apply for all SQL databases, each of these have their own strengths and weaknesses.

### [Oracle](https://www.oracle.com/uk/database/index.html)
Oracle is the most popular enterprise standard database, it has a large number of users and so has extensive support if you are willing to pay for it. There is a free version (express), but the features are limited so it is only suitable for small applications. It is designed to hold large amounts of data, has support for PLSQL, has additional commands like tablespace, synonyms and packages, and has several backup mechanisms. It has wide support across many major programming languages. This is the SQL database to use for large enterprise applications that hold lots of data, and need a fast reliable database.

### [MySQL](https://www.mysql.com/)
MySQL is a partly open source database engine, with MySQL server edition being closed source, both are managed by Oracle. It again has a large user base and a large amount of enterprise support. It also has extensive community support due to its open source nature.  It is lightweight and fast to set up, and still has almost all of the features the Oracle database does, except for the support of PLSQL. It also has wide support across many programming languages. One downside of MySQL is that performance can drop off when storing large amounts of data. This should be used as a good free alternative to Oracle, for smaller applications that need a fast setup and don’t need a lot of computational resources.

### [MariaDB](https://mariadb.org/)
MariaDB is a fork of the MySQL database, it was created when Oracle took over the development of MySQL in 2010. It has many of the features of MySQL and is fully compatible with MySQL drivers and libraries, so programming language support is high. It has speed improvements over MySQL, and so scales better to large amounts of data. It has a lot of community support as it has been growing in popularity over the past few years, but its enterprise support is not up to the standard of Oracle’s. It is however beginning to diverge from MySQL so may not always be compatible with it in the future. MariaDB should be used as a slightly faster alternative to MySQL, and is in the spirit of true open source!

### [PostgreSQL](https://www.postgresql.org/)
PostgreSQL is another open source database. It has some specific use cases, and so in general isn’t as fast as other SQL databases. However it excels at joining large numbers of tables, and searching through large amounts of data. It also has support for PLSQL, unlike MySQL and MariaDB. PostgreSQL should be used for complex data models, where lots of tables are present and queries are complex. It can be used as an open source alternative to oracle when PLSQL support is needed.

## NoSQL (Non-Structured Query Language) 
NoSQL databases in their varying forms have gained traction over the past few years, as their community support has increased. NoSQL has become a phrase used to describe a wide range of different data storage technologies. There are no official standards for NoSQL so there are many different implementations each with their own strengths and weaknesses. In general the main strength of NoSQL is its flexible data model, where columns can be added/removed from Collections (tables) ad-hoc, without the need for any data migration. 

### Pros
#### Flexible data models, can be changed on the fly without affecting existing data
Unlike SQL data is kept in flexible collections instead of tables. This means that “columns” can be added or removed to a single object without affecting any of the other objects in the table. This means that no migration scripts are needed when the data model changes.

#### Horizontally scalable - across multiple servers
NoSQL is designed to run across multiple servers, and be multi-threaded. The data across all servers may not necessarily be up to date. But it is easier and cheaper to add more servers to improve performance, instead of buying expensive hardware, this also means there is no single point of failure. There are many examples of using Raspberry Pis to create MongoDB clusters.

#### Good at storing large datasets/objects
Large objects can be stored without the need for massive tables like in SQL. This makes NoSQL very efficient for the reading and writing of large amounts of data in large single chunks.

#### Fast for simple queries, from a single table/collection
NoSQL doesn’t have all the constraints that SQL has, so it is very fast for reading/writing to single collections. Simple queries can be used to search for data in a collection, and many databases support indexing to further improve speed of retrieval.

#### High availability and partition tolerance
As NoSQL databases can run across multiple servers when setup they naturally have a high availability, and aren't dependent on just one server staying up so they have great fault tolerance should a server fail or have to be taken down for maintenance.

### Cons
#### Doesn't verify the referential integrity of data
There is no checking of data between collections in NoSQL. There is no concept of a foreign key either. This helps make the data model flexible but can cause discrepancies in the data, and can make it slow to search for data across different collections.

#### Lack of enterprise level support
Many NoSQL databases are open source and haven’t been widely used for enterprise applications, however some of the most popular databases do offer good support networks. As there is such a wide range of NoSQL databases performance and reliability also differ greatly between them. 

#### Query languages are varied and often not very powerful
NoSQL databases use their own bespoke query languages, often in varying forms of Javascript as there query language. It is easy to learn initially but queries can get large and complex quickly, with a lot of curly brackets! There are also big variations in query languages between different platforms, so just because you know one doesn’t mean you can use any NoSQL database.

#### Slow for searching and complex queries across multiple tables/collections
Due to the lack of referential integrity and absence of foreign keys, getting data from different collections requires a full search of each collection. This can make linking data together slow when the data model is complex.

#### Data retrieved isn't always up to date
Running across multiple servers causes issues with data consistency. If running the database across several servers it will take some time to propagate updates to all of them, meaning sometimes you can get different data from different servers. Some NoSQL databases (like MongoDB) cope with this better than others. 

## Common NoSQL Databases
Here are the most popular NoSQL databases, each of these is a different take on the NoSQL technology so their ideal uses cases vary greatly.

### [MongoDB](https://www.mongodb.com/) (Document)
MongoDB is the most popular and well known NoSQL database. It stores its data as JSON documents, inside collections which are akin to tables in SQL. As such it has a wide level of community and enterprise support. It is very flexible with objects being stored as JSON, which can be easily converted and used programmatically without the need for complex configuration. It is fast, scales well. Data consistency when running over several servers can be maintained by using the "red concern" option, which ensures that data held by the "majority" of the server is returned instead of the local copy which may be out of date. It does have a limit on the size of a single document which is 16mb, however this can be overcome by using the GridFS API. There is good support for many different programming languages, and it naturally fits in with any Javascript program. MongoDB should be used if you need a fast database that is very flexible and can store almost anything successfully.

### [Neo4J](https://neo4j.com/) (Graph)
Neo4j is a Graph database written in Java, its design works around many of the limitations that hold other NoSQL databases back. It stores data as key-value pairs (nodes) which are all linked together in a graph like structure. For example a person may be a node, they may be related to an address which is another node, there may also be another person which is also related to the same address. These relationships between nodes help maintain a certain amount of referential integrity. Graph databases offer excellent performance when the data model is complex with a lot of links between different objects, in this sense graph databases outdo most other SQL and NoSQL databases while still maintaining a flexible data model. Both community and enterprise support is available for Neo4j. The main use case is for heavily linked data, where data would be spread across several tables in an SQL database.  However it will be slower than other databases for data models just requiring a single table in SQL.

### [Cassandra](http://cassandra.apache.org/) (Column)
Cassandra is a Column database by Apache, its query language and data model are the most similar to SQL’s out of the 4 listed NoSQL databases. It does have slight differences however, as the data model is row-orientated instead of column-orientated. This means that each row can have different columns, and don't have to contain all the columns that other rows have. It can be used to store large amounts of data, and is particularly fast at writing data to the database. Being so similar to SQL the learning curve for Cassandra is less steep than other NoSQL databases, when converting from SQL. However it does lack scalability when data models are complex and data is spread over multiple tables. It has excellent community support, but enterprise support is only available through third party sources. It should be used to store large amounts of data in a single table, and where high fault tolerance is needed.

### [Oracle NoSQL](https://www.oracle.com/uk/database/nosql/index.html) (Key-value)
The Oracle NoSQL database stores its data as key-value pairs, but it also has support for SQL style tables and JSON documents. The Key-value pairs are stored in a similar way to Neo4J, however Oracle has the concept of a "Master" key (e.g. a unique id) which links all the "Child" keys together. There are both commercial and open source versions available. Being Oracle it has excellent enterprise level support available. It can store large amounts of data and process it quickly, it is best at storing simple data models without relationships. It can cope with a large number of read/write requests. However it doesn’t support transactions like a standard Oracle SQL database. The ideal use case for Oracle NoSQL is an application with a simple data model and a high volume of traffic such as network monitoring.

## Verdict
There isn’t always one database that’s perfect for the job, and even within the SQL and NoSQL categories there are vast differences between the databases. However in general the following rules should be considered when choosing the database for your next project:

#### Projects where SQL is better
* There is logically related data which can be identified up-front and is unlikely to change
* Data integrity is essential
* Consistency of data is more important than partition tolerance
* You want standards-based proven technology that developers are used to working with
* Commercial applications with good enterprise support is preferred

#### Projects where NoSQL is better
* There are unrelated, indeterminate or evolving data requirements
* Simpler or looser project objectives, perfect for Agile projects where you are able to start coding immediately
* Speed and scalability is important
* Partition tolerance is more important than consistency
* Open source technology with good community support is preferred
