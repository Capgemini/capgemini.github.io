---
layout: post
title: "Elasticsearch: Deeper Dive"
subtitle: "A deeper dive into the world of Elasticsearch"
category: Development
tags: [Development, Elasticsearch, Tutorial]
author: [kali]
comments: true
share: true
---

## Introduction
In [my previous post](https://capgemini.github.io/development/elasticsearch-introduction/) we looked at getting started with Elasticsearch, covering some basic concepts and getting some hands on.

In this article I want to expand on that, taking a deeper dive and covering the following:
* Importing large amounts of data
* Trimming results
* Paging results
* Scoring
* QueryDSL

Before getting started make sure you have Elasticsearch installed and running, details of which can be found in the [official Elasticsearch documentation.](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)

## Importing data
To import large amounts of data into Elasticsearch we will be using the bulk API, which allows us to index a lot of data with a single API call.

Before doing this we will need some large datasets to import. I used an [online JSON generator](https://www.json-generator.com) which can be used to generate datasets required for the work we will be doing. 
On the left hand side of the panel you have the generator configuration, I will be using the following configuration, which will generate us 3 JSON objects with the specified fields (you can paste this in).
 
```
[
  {{ "'{{" }}repeat(3, 3)}}',
  {
    id: {{ "'{{" }}objectId()}}',
    eyeColor: {{ "'{{" }}random("blue", "brown", "green")}}',
    name: {{ "'{{" }}firstName()}} {{ "{{" }}surname()}}',
    gender: {{ "'{{" }}gender()}}',
    company: {{ "'{{" }}company().toUpperCase()}}',
    email: {{ "'{{" }}email()}}',
    phone: '+1 {{ "{{" }}phone()}}'
  }
]
```

When ready click 'Generate' at the top of the screen. This will display your randomly generated JSON documents on the right hand side of the screen.

Before running the bulk import, we will need to make a few tweaks to your JSON documents for the import process to function correctly. 

* Before downloading the data, ensure you have selected 'Compact' as the bulk import uses new line characters to determine the end of the file.
* Once the data has been downloaded, we will need to remove the square brackets at the beginning and end of the document so we only have our individual JSON objects.
* We'll need to ensure that there is a new line character at the end of each JSON document.
* Finally, ensure that you're adding an 'action line' before each document. This simply tells elastic to add an ID to the document, and in particular we will be telling elastic to create an ID for us. 

An example of what my JSON document ready for bulk import should look like. You're welcome to copy this and save it as a document called data.json.

```
{"index":{}}
{"id":"5fbce76b51f6720fb820a80c","eyeColor":"blue","name":"Mcintosh Cooley","gender":"male","company":"example-company-1","email":"mcintoshcooley@example-company-1.com","phone":"+1 (993) 503-3824"}
{"index":{}}
{"id":"5fbce76b0d94b91072f4a988","eyeColor":"blue","name":"Carole Decker","gender":"female","company":"example-company-2","email":"caroledecker@example-company-2.com","phone":"+1 (929) 421-3982"}
{"index":{}}
{"id":"5fbce76b07595151f4100b57","eyeColor":"green","name":"Baxter Andrews","gender":"male","company":"example-company-3","email":"baxterandrews@example-company-3.com","phone":"+1 (911) 448-2944"}
```

Once we have prepared the data, we'll be using curl to hit the bulk import API. 
As the data generated is based on people, we need to create an index type that makes sense, so I decided to model this is as a university course students list: a 'computer_science' index with type 'students'.

In this example the JSON data file I have created is named 'data.json'
```
curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/computer_science/students/_bulk?pretty' --data-binary @data.json
```

Once you’ve executed the command the console will output data similar to what is shown below:

```
{
  "took" : 423,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "computer_science",
        "_type" : "students",
        "_id" : "tK7s-XUBlEyYNvSPxirU",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 201
      }
    }...
  ]
}
```

## Trimming search results

We can now search on our stored students data. The following command will query for all students who have blue eyes:

```
curl -X GET "localhost:9200/_search?q=blue"
```

And the result of the query is as follows:
```
{
    "took": 11,
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
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b51f6720fb820a80c",
                    "eyeColor": "blue",
                    "name": "Mcintosh Cooley",
                    "gender": "male",
                    "company": "example-company-1",
                    "email": "mcintoshcooley@example-company-1.com",
                    "phone": "+1 (993) 503-3824"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

Say we've got thousands of results and we're not interested in the actual data just yet, we can trim the results to remove the `_source` of our hits.

```
curl -X GET "localhost:9200/_search?q=blue&_source=false"
```

With the result looking a lot cleaner:

```
{
    "took": 3,
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
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 0.4700036
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036
            }
        ]
    }
}
```

We can continue to trim this down and limit hits using the size parameter. 
An example of where we may want to do this, is if we just want to know the total number of students returned from our query.

```
curl -X GET "localhost:9200/_search?q=blue&_source=false&size=1"
```

And here's the output, as you can see, the objects aren't returned in the hits array.

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
            "value": 2,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    }
}
```

## Paging results

I only have three documents stored in elastic, however we can still demonstrate paging results.

Limits can be added to the results as demonstrated previously, using the 'size' parameter. 
So if we just want the first result we can use 'size=1' and this will get us the first result (from 0). We aren't sorting yet, so elastic is returning these in an arbitrary order.

```
curl -X GET "localhost:9200/_search?q=blue&_source=false&size=1"
```

This will fetch us the first document:

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
            "value": 2,
            "relation": "eq"
        },
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b51f6720fb820a80c",
                    "eyeColor": "blue",
                    "name": "Mcintosh Cooley",
                    "gender": "male",
                    "company": "example-company-1",
                    "email": "mcintoshcooley@example-company-1.com",
                    "phone": "+1 (993) 503-3824"
                }
            }
        ]
    }
}
```

If we want to get the next document we can use the 'from' parameter in conjunction with the 'size' parameter. This will tell us to grab x documents from position y.
To get our second result we would use 'from=1'.

```
curl -X GET "localhost:9200/_search?q=blue&size=1&from=1"
```

As you can see we now have our second student:
```
{
    "took": 3,
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
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

If we try to go beyond this (we only have two students with blue eyes) we will get a blank result:

```
curl -X GET "localhost:9200/_search?q=blue&size=1&from=2"
```

And the result:

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
            "value": 2,
            "relation": "eq"
        },
        "max_score": 0.4700036,
        "hits": []
    }
}
```

## Scoring in Elasticsearch
You may have noticed a score field is returned with each document returned by queries in Elasticsearch. 
This is the way in which Elasticsearch signals to us how the results rank in terms of relevance to our query, including field matches and any additional configuration we may have used. 
The score itself is calculated using the [Lucene Practical Scoring Function](https://www.elastic.co/guide/en/elasticsearch/guide/current/practical-scoring-function.html)

## QueryDSL
QueryDSL (Domain Specific Language) is a framework we can use for more specific and efficient searches by providing our criteria in the request body as JSON.
There are two types of query clauses:
* Leaf query clause: Looks for a certain value in a particular field 
* Compound query clause: A combination of leaf queries and other compound queries

### Match All
The most basic query is the `match_all` query, which will return everything.

```
POST /computer_science/_search
{
   "query":{
      "match_all":{
      }
   }
}
```

And on running this we get the following result, as you can see all three of our students are returned:

```
{
    "took": 8,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b51f6720fb820a80c",
                    "eyeColor": "blue",
                    "name": "Mcintosh Cooley",
                    "gender": "male",
                    "company": "example-company-1",
                    "email": "mcintoshcooley@example-company-1.com",
                    "phone": "+1 (993) 503-3824"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tq7s-XUBlEyYNvSPxirV",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b07595151f4100b57",
                    "eyeColor": "green",
                    "name": "Baxter Andrews",
                    "gender": "male",
                    "company": "example-company-3",
                    "email": "baxterandrews@example-company-3.com",
                    "phone": "+1 (911) 448-2944"
                }
            }
        ]
    }
}
```

### Match
We can also use the `match` query to repeat our previously used query for students with blue eyes:

```
POST /computer_science/_search
{
   "query":{
      "match":{
         "eyeColor":"blue"
      }
   }
}
```

And as you can see our two students with blue eyes are returned:

```
{
    "took": 5,
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
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b51f6720fb820a80c",
                    "eyeColor": "blue",
                    "name": "Mcintosh Cooley",
                    "gender": "male",
                    "company": "example-company-1",
                    "email": "mcintoshcooley@example-company-1.com",
                    "phone": "+1 (993) 503-3824"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

### Bool, Must (AND) & Filter
If we want to see how many females with blue eyes are in the class we will need to use  a `boolean query`. 
This matches documents based on boolean combinations of other queries. We will be using the `must` clause which basically means that the query clause parameter MUST appear in matching documents.

To achieve what we did in the previous query and collect all students with blue eyes using a boolean query, we would do the following:

```
POST /computer_science/_search
{
   "query":{
      "bool":{
         "must":[
            {
               "match":{
                  "eyeColor":"blue"
               }
            }
         ]
      }
   }
}
```

With the same result:

```
{
    "took": 20,
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
        "max_score": 0.4700036,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tK7s-XUBlEyYNvSPxirU",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b51f6720fb820a80c",
                    "eyeColor": "blue",
                    "name": "Mcintosh Cooley",
                    "gender": "male",
                    "company": "example-company-1",
                    "email": "mcintoshcooley@example-company-1.com",
                    "phone": "+1 (993) 503-3824"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

Now we can either stack another match clause to get our females with blue eyes, or use the filter clause (which doesn't affect the scoring of the document).

Two stacked match clauses in a must works exactly like the logical operator `AND`. So in the below query we're saying `eyeColour = blue AND gender = female`.

```
POST /computer_science/_search
{
   "query":{
      "bool":{
         "must":[
            {
               "match":{
                  "eyeColor":"blue"
               }
            },
            {
               "match":{
                  "gender":"female"
               }
            }
         ]
      }
   }
}
```
With the following result: (note that the score for this query: 1.4508327 is different to the previous 0.4700036)
```
{
    "took": 34,
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
        "max_score": 1.4508327,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 1.4508327,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

And now using the `filter` clause: 

```
POST /computer_science/_search
{
   "query":{
      "bool":{
         "must":[
            {
               "match":{
                  "eyeColor":"blue"
               }
            }
         ],
         "filter":[
            {
               "term":{
                  "gender":"female"
               }
            }
         ]
      }
   }
}
```
As you can see in the results below, the score is the equivalent of just searching for blue eyes: 0.4700036
```
{
    "took": 18,
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
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 0.4700036,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            }
        ]
    }
}
```

### Wildcard

The next useful query type is `wildcard query`. 
Simply put this allows us to query using a wildcard pattern `*` which is a placeholder that matches zero or more characters. 

The following query will allow us to search on the phone field for anyone who has the 911 area code, with anything coming before and after, allowing us to effectively search on this field. 

```
POST /computer_science/_search
{
   "query":{
      "bool":{
         "must":{
            "wildcard":{
               "phone":"*911*"
            }
         }
      }
   }
}
```
As you can see from the result, the relevant student is returned.
```
{
    "took": 3,
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
        "max_score": 1.0,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tq7s-XUBlEyYNvSPxirV",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b07595151f4100b57",
                    "eyeColor": "green",
                    "name": "Baxter Andrews",
                    "gender": "male",
                    "company": "example-company-3",
                    "email": "baxterandrews@example-company-3.com",
                    "phone": "+1 (911) 448-2944"
                }
            }
        ]
    }
}
```

### Should (OR)
Finally I wanted to cover `should` which works like the logical operator OR. 
Similarly to the `match` (AND) clause earlier, we can stack multiple `should` clauses to create our OR queries.

For this example we will be expanding on our wildcard query and looking for students from two area codes: 911 or 929. 
Note that we have replaced `must` with should and have both our wildcard queries wrapped up in this clause.

```
POST /computer_science/_search
{
   "query":{
      "bool":{
         "should":[
            {
               "wildcard":{
                  "phone":"*911*"
               }
            },
            {
               "wildcard":{
                  "phone":"*929*"
               }
            }
         ]
      }
   }
}
```
And below is the result, as you can see both our students from these area codes have been returned!

```
{
    "took": 48,
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
        "max_score": 1.0,
        "hits": [
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "ta7s-XUBlEyYNvSPxirV",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b0d94b91072f4a988",
                    "eyeColor": "blue",
                    "name": "Carole Decker",
                    "gender": "female",
                    "company": "example-company-2",
                    "email": "caroledecker@example-company-2.com",
                    "phone": "+1 (929) 421-3982"
                }
            },
            {
                "_index": "computer_science",
                "_type": "students",
                "_id": "tq7s-XUBlEyYNvSPxirV",
                "_score": 1.0,
                "_source": {
                    "id": "5fbce76b07595151f4100b57",
                    "eyeColor": "green",
                    "name": "Baxter Andrews",
                    "gender": "male",
                    "company": "example-company-3",
                    "email": "baxterandrews@example-company-3.com",
                    "phone": "+1 (911) 448-2944"
                }
            }
        ]
    }
}
```

## Wrap up
As you can see there is a lot to uncover with Elasticsearch, it's a powerful tool with lots of use and is something every developer should be at least slightly familiar with. 
This article hasn't even scratched the surface of what we can do, however I hope it has given you an understanding of what can be accomplished and a great foundation to continue within the world of Elasticsearch.
