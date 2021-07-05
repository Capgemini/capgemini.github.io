---
layout: post
title: "Elasticsearch: Introduction"
subtitle: "A first time hands on with Elasticsearch"
category: Development
tags: [Development, Elasticsearch, Tutorial]
author: [kali]
comments: true
share: true
---

## Introduction
Elasticsearch is one of those technologies I have always heard about but never had the opportunity to get hands on with. Apart from making an educated guess I didn’t really know what it was, or what it really provides us.

I thought I’d be a little more productive during the COVID-19 lockdown, and due to my curiosity I decided to do some research on the technology.
So these next few posts are going to document my findings and hopefully you can follow along if you’re looking to take a dive into the world of Elasticsearch and the entire ELK stack.

For more reading around the technologies in the ELK stack:
* [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)
* [Logstash](https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html)
* [Kibana](https://www.elastic.co/guide/en/kibana/current/getting-started.html)

## What is Elasticsearch?

So, what is Elasticsearch? Straight from the horse's mouth:

> Elasticsearch is a distributed, open source search and analytics engine for all types of data, including textual, numerical, geospatial, structured, and unstructured. Known for its simple REST APIs, distributed nature, speed, and scalability.

In layman’s terms it’s Google for your data, it allows you to search and analyse huge amounts of data in near real-time and returns answers in milliseconds. It achieves this by searching on an index of your data. It’s a powerful open source tool built on [Apache Lucene](https://lucene.apache.org) which provides a tonne of advantages.

## Why use Elasticsearch?
* It’s multilingual as it allows us to perform and combine various kinds of searches irrespective of the data type
* Data can also be returned in whichever form is required
* It performs in near real time, meaning, we can analyse billions of records in seconds
* Can manage huge indexes
* It’s scalable up to thousands of servers
* Can accommodate petabytes of data (that’s a lot)
* Schema free, meaning documents with any structure can be stored
* Provides a RESTful API for your searching needs
* AWS have a dedicated service for elastic search!
* It’s been adopted by some HUGE brands, including:
    - Dell
        - Utilises Elasticsearch to support e-commerce searches on the dell.com website
    - The Guardian
        - Used to gain visibility in real time on how readers are interacting with content on different platforms (website, social media). This allows The Guardian to better tailor their articles to users
        - Also used to monitor site activity allowing the development teams to keep the site running smoothly
    - Docker
        - Powers search functionality on docker website for a constantly growing database

## Elasticsearch basic concepts

*	Node: A single instance of Elasticsearch
*	Cluster: A group of nodes
*	Document: JSON document containing a collection of fields. Every document belongs to a type and is stored inside an index. These are identified with a unique identifier called a UID
*	Type: This is a class of similar documents, for example if we were storing music albums
*	Index: A collection of different documents. Works like the index in a book
*	Shard: Indexes can be horizontally divided into shards
*	Replicas: We can create replicas of our indexes and shards which increases the availability of our cluster

## Installing and running Elasticsearch locally

[There are guides for installing it on Linux, Mac and Windows; you can also use docker.](https://www.elastic.co/guide/en/elasticsearch/reference/current/targz.html)

Once you have installed Elasticsearch, be sure to start it and use the following command to verify the service is running.
(I have my Elasticsearch service running locally)

```
curl -X GET "localhost:9200/"
```

You should see a response containing details on your Elasticsearch service like the following:
```
{
  "name" : "kamalis-MBP",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "rGl-BYbOTlGg_CzGVUbWqg",
  "version" : {
    "number" : "7.9.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "a479a2a7fce0389512d6a9361301708b92dff667",
    "build_date" : "2020-08-11T21:36:48.204330Z",
    "build_snapshot" : false,
    "lucene_version" : "8.6.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

## Basic uses

Now that we have our Elasticsearch service up and running we can get to work storing our first document.

For the purposes of this demonstration we will be storing fruit and veg in Elasticsearch, which are both a type of food. Elastic acts like a REST API so we can use either POST (to add new data) or PUT (to update existing data).

We’ll first focus on POSTING data, and in particular we will be adding an apple, which is a type of fruit to our ‘food’ index.
To do this we will be sending a POST request to: `/food/fruit` with a body like the following:

```
{
  "name": "apple",
  "colour": "red",
  "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
}
```

Before sending the request lets quickly break down the URL. We’re sending a request to `/food/fruit` and this is composed of two major parts of Elasticsearch.

The first part is the index, think of this as a ‘database’ in elastic search, which contains a mapping of multiple types, so this ‘food’ database will contain all our different foods.

The second part of our URL is the type, this pretty much represents a class of similar documents; so when we are talking about food we can split them into a range of different types such as:
* Fruit
* Veg
* Meat
* Poultry
* Dessert
* We can even split into cuisines
    - Italian
    - Indian
    - Mediterranean
    - Mexican


Below you can see the entire request to create our first document which represents an Apple. This will be indexed in food and is of type fruit:

```
curl -X POST "localhost:9200/food/fruit" -H 'Content-Type: application/json' -d'
{
  "name": "apple",
  "colour": "red",
  "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
}
'
```

And here is the response we received, as you can see from `_id` this has been generated for us.

```
{
  "_index": "food",
  "_type": "fruit",
  "_id": "C7_IP3QBLxijL355EXvJ",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}
```

If needed we can also specify your own IDs. To demonstrate this we will create a banana document in Elasticsearch with the ID `12345B`.
Below is the request we will send. Notice the ID has been appended to the URL so now we have `/food/fruit/12345B`.

```
curl -X POST "localhost:9200/food/fruit/12345B" -H 'Content-Type: application/json' -d'
{
  "name": "banana",
  "colour": "yellow",
  "description": "A banana is a tropical fruit that'\''s quite popular all over the world. It grows in bunches on a banana tree. To \"Go bananas\" is a slangy way of saying \"Go crazy\" or to act ridiculous, and if someone refers to the \"Top banana\" they mean the most important person in a particular group."
}
'
```

And below is the result, notice how the `_ID` field now contains the value we specified.

```
{
  "_index": "food",
  "_type": "fruit",
  "_id": "12345B",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 1,
  "_primary_term": 2
}
```

## Updating documents

Using PUT to update our documents is also a powerful tool and can help you on your way. For the sake of this demo we will be looking to update our apple from ‘red’ to ‘green’. To do this we will need to generate a put request with our updated body and specifying the ID of our document so elastic knows which document to update.

Small problem, I don’t remember the ID of the apple document I stored. The solution here is to use the simple search feature Elasticsearch provides to find our document and the data we need.

We will be using the `_search` URL and in particular we will be looking for our apple using the following: `_search?q=apple`. This will search on all fields to see if we have any matches (more on searching a little later).

Below is the composed search:

```
curl -X GET "localhost:9200/_search?q=apple"
```

And here is the result (as you can see we have got a hit and we can grab the value from `_id`):

```
{
  "took": 615,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 0.4700036,
    "hits": [
      {
        "_index": "food",
        "_type": "fruit",
        "_id": "C7_IP3QBLxijL355EXvJ",
        "_score": 0.4700036,
        "_source": {
          "name": "apple",
          "colour": "red",
          "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
        }
      }
    ]
  }
}
```

I will cover search a little later, however now that we have our ID we can compose the following request, and update our apples colour from red to green. As you can see we have put the ID in the URL, and in the body we have specified we want to update the colour to green.

```
curl -X PUT "localhost:9200/food/fruit/C7_IP3QBLxijL355EXvJ" -H 'Content-Type: application/json' -d'
{
  "name": "apple",
  "colour": "green",
  "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
}
'
```

Here is the response we get, as you can see Elasticsearch has alerted us that the document has been marked as updated!

```
{
  "_index": "food",
  "_type": "fruit",
  "_id": "C7_IP3QBLxijL355EXvJ",
  "_version": 2,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 4,
  "_primary_term": 2
}
```

Finally if we do our search again we will retrieve a green apple:

```
{
  "took": 916,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 0.4700036,
    "hits": [
      {
        "_index": "food",
        "_type": "fruit",
        "_id": "C7_IP3QBLxijL355EXvJ",
        "_score": 0.4700036,
        "_source": {
          "name": "apple",
          "colour": "green",
          "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
        }
      }
    ]
  }
}
```

## Searching

The first basic search is to collect a single item by its ID. If we remember our Banana with the ID of 12345B, we can compose a basic GET request with the following URL: `/food/fruit/12345B`.

```
curl -X GET "localhost:9200/food/fruit/12345B"
```

And here is the result:

```
{
  "_index": "food",
  "_type": "fruit",
  "_id": "12345B",
  "_version": 1,
  "_seq_no": 1,
  "_primary_term": 2,
  "found": true,
  "_source": {
    "name": "banana",
    "colour": "yellow",
    "description": "A banana is a tropical fruit that's quite popular all over the world. It grows in bunches on a banana tree. To \"Go bananas\" is a slangy way of saying \"Go crazy\" or to act ridiculous, and if someone refers to the \"Top banana\" they mean the most important person in a particular group."
  }
}
```

All the fields in the response (above) which begin with an underscore are metadata fields, the `_source` object is where we will find the document we indexed.

Another example of searching which was touched on earlier is using the `_search` endpoint. We will be doing another basic query looking for the word `world`. The way the basic URI search works is by scanning all the fields of all the documents for the specified string, which doesn’t make it very efficient!

Here is our basic GET request with the search looking for the word `world`.

```
curl -X GET "localhost:9200/_search?q=world"
```

And here are the results, as you can see both descriptions for our apple and banana contain the string `world` so both documents are returned!

```
{
  "took": 4,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 2,
      "relation": "eq"
    },
    "max_score": 0.19070335,
    "hits": [
      {
        "_index": "food",
        "_type": "fruit",
        "_id": "12345B",
        "_score": 0.19070335,
        "_source": {
          "name": "banana",
          "colour": "yellow",
          "description": "A banana is a tropical fruit that's quite popular all over the world. It grows in bunches on a banana tree. To \"Go bananas\" is a slangy way of saying \"Go crazy\" or to act ridiculous, and if someone refers to the \"Top banana\" they mean the most important person in a particular group."
        }
      },
      {
        "_index": "food",
        "_type": "fruit",
        "_id": "C7_IP3QBLxijL355EXvJ",
        "_score": 0.17810643,
        "_source": {
          "name": "apple",
          "colour": "green",
          "description": "Apples are the ideal fruit to eat at any time, having a positive role in the achievement of nourish balance. Their skin may be green, yellow or reddish, and the meat taste ranges from a bitter to sweet flavour. It is one of the most consumed fruit in the world. There is a great amount of varieties; thanks to that, apples are available all the year round."
        }
      }
    ]
  }
}
```

There are also some other pieces of data which you get alongside your ‘hits’, these can be helpful when you are trying to be more efficient with your searches. As a quick overview:
* Took – The time in milliseconds the search took
* Timed_out – Did the search timeout?
* Shards – The number of shards searched
* Hits - The actual result

For more efficient and specific searches we can use the [QueryDSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) (which I will cover in more depth in a future post).
This is a request body search which allows us to get a lot more advanced with our searching.
Below is a query we have composed to search the colour field for the phrase “yellow”.

```
curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match_phrase": {
      "colour": "Yellow"
    }
  }
}
'
```

And as you can see below our banana document has been returned. Note that search is case insensitive,
as we searched for `Yellow` despite the document containing the string `yellow`.

```
{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 0.6931471,
    "hits": [
      {
        "_index": "food",
        "_type": "fruit",
        "_id": "12345B",
        "_score": 0.6931471,
        "_source": {
          "name": "banana",
          "colour": "yellow",
          "description": "A banana is a tropical fruit that's quite popular all over the world. It grows in bunches on a banana tree. To \"Go bananas\" is a slangy way of saying \"Go crazy\" or to act ridiculous, and if someone refers to the \"Top banana\" they mean the most important person in a particular group."
        }
      }
    ]
  }
}
```

## Deleting data

The final subject this post on basic elastic concepts is going to look at is deleting data, which is surprisingly easy. All you need to do is send a DELETE request ensuring you specify the ID of the document (much like the POST to create data).

For this example we are going to delete the banana document. To do this we will send a DELETE request to `/food/fruit/12345B`.

```
curl -X DELETE "localhost:9200/food/fruit/12345B"
```

As you can see in the returned body the banana document has been deleted.

```
{
  "_index": "food",
  "_type": "fruit",
  "_id": "12345B",
  "_version": 2,
  "result": "deleted",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 5,
  "_primary_term": 2
}
```

Just to double check we will do our previous search for our yellow coloured fruits using the QueryDSL.
As you can see no results are returned, so the document has been successfully deleted from Elasticsearch.

```
{
  "took": 940,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 0,
      "relation": "eq"
    },
    "max_score": null,
    "hits": []
  }
}
```

## Wrap up
This was a simple look into the world of Elasticsearch to get to grips with the tool, gain a little understanding and get our feet wet. Next I will be looking into QueryDSL and how we can really leverage the power Elasticsearch gives us to compose some advanced searches and take a deeper dive, I will also be exploring Kibana and Logstash and how we can use these other tools in the ELK stack and tie all of this together.