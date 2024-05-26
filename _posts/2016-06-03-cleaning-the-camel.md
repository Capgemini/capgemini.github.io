---
layout: post
title: Cleaning the Camel
description: "A look into how not to write dirty code with Apache Camel"
comments: true
author: nick_walter
category: Java
tags: [Development,Programming,Java,Camel]
---
You can almost smell bad code and it's not a nice thing to behold.

It can be even worse when you have to get your hands dirty and fix the stuff. In this post I'm going to take a look at some examples of dirty coding using [Apache Camel](http://camel.apache.org)'s Java API. And I'll show how I think you can improve things. I've chosen Camel not because I think Camel or Java are particularly bad, you can write dirty code in almost any language. The name certainly helps, not sure 'Cleaning the Scala' has the same ring to it, but [Apache Camel](http://camel.apache.org) is a good example of a fluent API and it's a framework that I've been working with a lot the last couple of years at Capgemini.

## What Does Dirty Look Like?
They say 'Beauty is in the eye of the beholder' and that is no different for coding. I've seen so many pull request comments on my code that are merely someone's opinion. Be it for style, formatting, the layout or the class structure. So here are my views, you definitely don't have to agree with them (I'm hoping you do) and feel free to comment on them either way.

### Tabs Do Matter
So fluent APIs give you the ability to construct a single line of code doing many actions. But just because you can do that, doesn't mean you should. Take the example below of a Camel Route to complete an order:

```
from("direct:completeOrder").onCompletion().removeHeaders("*", HTTP_RESPONSE_CODE).end().beanRef("orderService", "getOrderByOrderId").beanRef("paymentService", "takePayment").beanRef("orderService", "setOrderToComplete").setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_OK));
```

Ok It's an extreme example, it will compile and run but its un-readable. You can't tell what action is being done where and by which bean. Try this:

```
from("direct:completeOrder")
	.onCompletion()
		.removeHeaders("*", HTTP_RESPONSE_CODE)
	.end()
	.bean("orderService", "getOrderByOrderId")
	.bean("paymentService", "takePayment")
	.bean("orderService", "setOrderToComplete")
	.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_OK));
```
Now we have separated the lines and correctly tabbed them and we can see the flow and which method relates to which bean. This example shows how correctly formatting routes is more than just an OCD cosmetic thing, but essential. When working with Camel or any other fluent API you need to be able to understand what the flow is, what is actually happening to the Camel Exchange as it moves through the logic. 

### Inline vs Extracted Logic
It is a battle we all have. Do we inline that logic or extract it off to a separate variable, method or class? Take a look at the example below, here we are going to do some route switching based on a header parameter. 

```
from("direct:getOrder")
	.choice()
		.when(and(header("orderId").isNotNull(), header("orderType").isEqualTo("basic")))
			.bean("orderService", "getBasicOrderByOrderId")
			.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_OK))
		.when(and(header("orderId").isNotNull(), header("orderType").isEqualTo("super")))
			.bean("orderService", "getSuperOrderByOrderId")
			.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_OK))
		.otherwise()
			.setBody(constant("Unknown OrderType provided"))
			.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_BAD_GATEWAY))
		.endChoice();
```

It's not awful, but doesn't read amazingly well. How about this:

```
final Predicate orderTypeIsBasic 
	= and(header("orderId").isNotNull(), header("orderType").isEqualTo("basic"));
final Predicate orderTypeIsSuper 
	= and(header("orderId").isNotNull(), header("orderType").isEqualTo("super"));

from("direct:fulfilOrder")
	.choice()
		.when(orderTypeIsBasic)
			.to("direct:fulfilBasicOrder")
		.when(orderTypeIsSuper)
			.to("direct:fulfilSuperOrder")
		.otherwise()
			.setBody(constant("Unknown OrderType provided"))
			.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_BAD_REQUEST))
		.endChoice();
```

So I've gone through 2 steps to the code to improve it. 1) Extracting the logic out into Predicate variables. and 2) Sensible naming, probably the more important point, so we can read the routing like a sentence. 

*e.g. When [the] Order Type Is Basic ....* 

This sort of extraction of logic from inside the route and into something named makes all the difference. Where logic is placed is sort of irrelevant as long as the name makes sense.

### The Choice Is Yours
Choices in Camel let you do 'if, else if, else' logic. And as with 'if' statements you can nest them and spiral into a whole heap of trouble. 

```
from("direct:createOrder")
	.choice()
		.when(orderTypeIsBasic)
			.choice()
				.when(userAlreadyExists)
					.bean("userService", "getUserDetails")
					.bean("orderService", "createNewOrder")
				.otherwise()
					.choice()
						.when(userDetailsAreProvided)
							.bean("userService", "createNewUser")
							.bean("orderService", "createNewOrder")
						.endChoice()
				.endChoice()
		.when(orderTypeIsSuper)
			...
		.otherwise()
			...
		.endChoice()
		.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_CREATED));
```
It's simple to get lost with nested Choice / When / Otherwise statements in your Route, and this is only showing 2 levels. You could envisage more here, for example adding another check for a null user being returned. And if you are tabbing your lines appropriately then lines can start to go off to the right, making things even harder to read.

So what alternative pattern can we use to negate the need to nest? So you can use sub routes to move the choices out of the main flow.

```
from("direct:createOrder")
	.to("direct:getUserDetails")
	.to("direct:createNewOrder")
	.setHeader(HTTP_RESPONSE_CODE, constant(HttpStatus.SC_CREATED));
	
from("direct:getUserDetails")
	.choice()
		.when(userAlreadyExists)
			.bean("userService", "getUserDetails")
		.otherwise()
			.bean("userService", "createNewUser")
		.endChoice();
		
from("direct:createNewOrder")
	.choice()
		.when(orderTypeIsBasic)
			.bean("orderService", "createNewBasicOrder")
		.when(orderTypeIsSuper)
			.bean("orderService", "createNewSuperOrder")
		.otherwise()
			...
		.endChoice();	
```
So here I've restructured the above Route to now have 2 sub Routes, each with its own Choice / When statements.  The parent Route 'createOrder' now flows really nicely. You know straight away it only needs to get a users details and use that to create the new order details. And as a nice byproduct I can see some potential reuse with the sub routes.

### Split and Aggregate
I think Split and Aggregate are one of those powerful patterns that Apache Camel gives us. Allowing us to chew through data sets, process them in a parallel manner and merging the results back together. Using this pattern in a clean and readable manner is not easy. Here's an example of a order reporting route:

```
from("file:orderReporting")
	.split(body())
	    .unmarshal(orderDetailDataFormat)
        .setHeader(SALES_CHANNEL, simple("${body.salesChannel}"))
		.choice()
			.when(orderSalesChannelIsOnline)
				.bean("orderService", "getOrderLineDataForOnlineOrder")
				.bean(OrderFileProcessor.class, "transformOnlineOrderLineMessage")
			.otherwise()
				.bean("orderService", "getOrderLineDataForShopOrder")
				.bean(OrderFileProcessor.class, "transformShopOrderLineMessage")
			.endChoice()
        .unmarshal(orderDataReportFormat)
		.aggregate(header(SALES_CHANNEL_ID), new OrderLineAggregationStrategy())
        .completionTimeout(orderAggregationTimeout)
	        .to("file:///temp/order_reporting_output?autoCreate=true")
        .end()
     .end();
```
Lets go through what it does. It consumes order files and splits by the body, so each line is processed separately. We then unmarshal into a Java object and extract the sales channel, so was it shop or online. Depending on the channel the OrderService gets some additional order line data from the DB. This is all transformed into a generic reporting format and then we aggregate depending on the sales channel, so we end up with 2 report files.

First of all what's wrong with this? You might think it's ok, if not a little complicated. But I think it could be improved and made more readable and maintainable. 

```
from("file:orderReporting")
   .split(body())
      .to("direct:getOrderLineDataForSalesChannel")
      .unmarshal(orderDataReportFormat)
	  .to("direct:writeToReportFile")
   .end();

from("direct:getOrderLineDataForSalesChannel")
   ....  

from("direct:writeToReportFile")
   .aggregate(header(SALES_CHANNEL_ID), new OrderLineAggregationStrategy())
      .completionTimeout(orderAggregationTimeout)
	     .to("file:///temp/order_reporting_output?autoCreate=true")
   .end();

```
By extracting 3 seperate routes (split, get and aggregate) from the single route it becomes a very different beast. Much easier to understand, less fragile and therefore easier to change.

### Routes 
As you can see I'm a big fan of splitting route logic out, either sub routes within a class or into a new route class. One of the reasons I move logic into new route classes is to benefit from having different error handling patterns.  

Take this example, we are reading a message from a queue, calling an API and then writing the result to a DB.
 
*OrderFulfilmentRoute.class*

```
onException(TimeoutException.class)
    .maximumRedeliveries(2)
    .redeliveryDelay(100)
    .handled(true)
    .to("jus:queue:orderData.Error");

from("jms:queue:orderData")
   .bean("orderFulfilmentService", "fulfillOrder")
   .bean("orderCRMService", "publishUpdatedOrder");   
```

Lets say the 'orderCRMService' makes a call out via HTTP to an external API, and therefore we have the potential to have timeouts and connection issues. But the CRM system just stores the latest version of the data so we retry any failed calls, which is nice. But if the CRM element fails Camel will *restart* the route from the beginning, and we definitely don't want to be sending multiple requests to the fulfilment service! 

*OrderFulfilmentRoute.class*

```
onException(TimeoutException.class)
    .handled(true)
    .to("jus:queue:orderData.Error");

from("jms:queue:orderData")
   .bean("orderFulfilmentService", "fulfillOrder")
   .to("direct:publishOrderToCRM");   
```

*OrderPublisherRoute.class*

```
onException(TimeoutException.class)
    .maximumRedeliveries(2)
    .redeliveryDelay(100)
    .handled(true)
    .to("jus:queue:orderData.Error");

from("direct:")
   .bean("orderCRMService", "publishUpdatedOrder");   
```
So moving the CRM logic into it's own route gives us the ability to define different error handling strategies. So if the CRM element fails *only* that is retried. 

## My main message
I think if I had to sum up my clean Camel code message it would be to make your routes read like paragraphs in a book. With the correct separation of Route elements (tabbing) and good naming of routes and variables it will allow you to write code that is readable to another developer (and yourself) and reduce the time taken to maintain or enhance it. 

