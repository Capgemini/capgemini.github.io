---
layout: post
title: Scala Appetizer for Java Devs
description: Sharing some lessons learned on the journey from Java to Scala
category: Scala
tags: [Development,Programming,Scala]
author: amir_aryanpour
share: true
---

I have been a Java developer for a long time. That goes beyond the time when EJBs or even Struts were introduced. In my madness I decided to start my PhD a few years back. As part of my research I wanted to design a Domain Specific Language (DSL) for security policy languages from the ground up, and due to the limitations of Java (at that time) I was forced to look at other options.  At this time I was introduced to Scala.

My journey from Java to Scala was not only far from smooth - it was a bumpy ride almost all the time. Having said that, I have to admit I’ve enjoyed every moment of it. So I decided to share my knowledge with the hope to help those of you who would like to have a smoother journey from other universes to Scala. In order to achieve that in a series of short/medium length blog posts (as opposed to a very long one) I am going to provide you with my experiences. So here we go:

## Set Your Mindset ##

I do remember when I converted to Java. I bought a book and started to learn. Everything made sense: if, while, do, methods, objects etc. But why is this not the case for Scala or any other functional programming language? In my opinion the answer is that functional programming languages are hard(er) to grasp especially if you have been an imperative language programmer for a long time.

Let’s pick up an example here. Functional programming languages (including Scala) are less verbose compared to imperative languages. This usually is labelled as an advantage of these languages by their developers. Well, that is true, however that also implies the code will be harder to read, especially for a novice. Those impatient individuals who would love to start functional programming by looking at  code will probably struggle to learn the language in this way. 

Another example can be presented as the concept of “state” in imperative programming languages.  State plays a great role in our day-to-day life (as Java developers). We create (sometimes) complicated code to deal with the state of the data and present it fresh in our code at different tiers. Now imagine a world that is stateless, I mean no state at all! Certainly it will be a simpler world but it will definitely also be hard to grasp and live in such a world whilst you code your applications the other way all your life. It can be compared to a great photographer who has been taken lots of great natural pictures and now he has been asked to shoot ONLY in Black-&-White! 

Irrespective of starting point, you will realise functional programming is hard(er) to grasp and harder to live in  (OK, at least to the point that you feel comfortable with it). Inevitably at some point you will ask yourself the questions “why do I have to go through this pain?” and “what is the justification beyond all these efforts?” Undoubtedly if you do not have concrete answers to these questions, most likely either you never finish the journey or you never feel and love the greatness of functional programming. In my case, I was lucky because the limitations of Java (at the time) forced me to stay on the track. Who knows what would have happened if I wanted to start my PhD course today? I reckon the result might have been different.

To summarise the section, set your mindset, set your goals, be prepared for challenges, have determination, do not give up and rest assured good days will come. 


## Enjoy Coding ##
 
As it has been detailed in the previous section, you need to be prepared for challenges but I would say be prepared for surprises - in a good way - before that. Use these so called surprises as your encouragement to keep learning and ultimately enjoy coding Scala. I could write a book about the greatness of Scala and perhaps to motivate you to start learning this language but I probably will rewrite a Scala textbook here; so let us avoid that! I also would like to go a bit deeper than the very basics, as I am sure you already know about them. Things like forgetting about the semicolon, or that immutable objects are preferred in Scala, or that you can write the import command anywhere in your code!  So let us explore a few tricks that might motivate you to start your journey sooner rather than later. 

- **Values (and Methods) are Objects**

   Scala has the same data types as Java, but unlike Java all the values in Scala are objects that includes numerical values. That is not a huge difference compared to Java however in Scala methods are also Objects! This could be considered as a massive advantage as methods (that are objects) can be sent around.

   Let us look at an example:

		def abstractStringMethod(s: String, f: String => String) = if (s.length > 0) f(s) else s
		abstractStringMethod (s1, _.trim())
		abstractStringMethod (s2, _.toLowerCase())


   As it appears from the above the AbstractStringMethod accepts a method as a parameter. Nice isn’t it? Treating everything as Object (especially methods) becomes incredibly handy when you try to abstract away the complexity of some operations in your code. Scala made the abstraction much easier compared to other languages. 

   Having said that, it has been noted that this feature of Scala often has been misused. That could lead to _Blinkered Abstraction_ where abstraction puts a blinker on developers' thinking and they try to fit the entire world into their abstraction. This phenomenon is perfectly described by Martin Fowler in his book [Domain-Specific Languages](http://www.amazon.co.uk/Domain-Specific-Languages-Addison-Wesley-Signature/dp/0321712943/ref=sr_1_1?ie=UTF8&qid=1458258615&sr=8-1&keywords=domain+specific+languages").

- **Operators are also Methods**

	I would also reckon this comes as a surprise to Java developers that Scala does not come with operators (that includes arithmetic operators like ```+```). All these lookalike operators are treated as methods under the covers.  This also implies all these arithmetic operators can be overloaded. Methods come with no restriction/limitation in their names. The other useful feature that can be explored here is that _any_ method with one parameter can use infix syntax.

	So based on what we have discussed so far:  

		1.+(1) // is equal to 1+1 
	
	Although all these can be described as exciting features, a question could be raised as to where these features come into play? Well, the one that I am able to point you at is designing DSLs. Assume that you have been asked to design a DSL for testing purposes so testers can code their test scripts using the DSL. Then a line of these scripts could look like this: 

		DirectFlights from London to Manchester at 12:30
	
	The above human-readable sentence can be a valid Scala code as follow:
     
		Val numberOfFlights=DirectFlights.from(London).to(Manchester).at(12:30)



- **Love the Case Classes**

	We (as Java developers) love Data Access Objecs and Data Transfer Objects. If that is the case for you most probably you will also like _case classes_ that are perfect for such a purpose and many other scenarios. The definition of case classes is easy: 

   
		case class fun (Foo : String , Bar : String)  {
  		def  someMoreFn = .... 
		}	


	When you create a _case class_ , Scala also creates a _toString_ , _hashCode_, _equals_, constructor field(s) _extractor_ and _copy_ methods on the fly that come very handy specially when you are performing some pattern matching. You  are not even obliged to use the _new_ keyword to create case classes. Also taking the fact into account that ```==``` in Scala always delegate to _equals_ then you are safe and sound when you use ```==``` against case classes:



		case class Author(lastname: String, firstname: String)
	
		val a = Author (“Aryanpour” , “Amir”)
		val a1 = Author (“Harmel-Law” , “Andrew”)
		val a2 = Author (“Harmel-Law” , “Andrew”)
	
		a==a1   // results false 
		a1==a2  // results true 


	Nice and neat isn’t it? Be truthful, how many times you have encountered that mistake in your Java code?

	Most probably you already know how powerful Scala is in pattern matching. And by pattern matching I meant defining some useful function like:

		def convertToYesNo(choice: Int): String = choice match {
  		case 1 => "yes"
  		case 0 => "no"
  		case _ => "error"
		}

	The above function receives an _Int_ (choice) and based on the value received, it converts the input to _Yes_ or _No_ (or even error if it cannot match it). Nice and useful. Now with the case classes you can do the same on an instance of class:

		sealed trait MyAbstract[+T]
		case class  FirstSubClass[T](value: T) extends MyAbstract[T]
		case class  SecondSubClass[T](value: T) extends MyAbstract[T]

		def decision[T](value: MyAbstract[T]): Unit = value match {
  		case FirstSubClass(v) =>  // do some stuff
  		case SecondSubClass(v) =>  // do other stuff
		}



	Do not be distracted by _sealed_, _trait_ and all other unknown keywords. Here we have two case classes that both extend the base class (MyAbstract). The _decision_ method however can perform pattern matching based on class type. Wonderful!


- **Collections, Collections and Collections**

	I would say one of the features you (as a Java developer) are going to love when you convert to Scala is the enhancement they have made on iterable objects.  The enhancement can be categorised as follows:

	-  They are _neat_. On average each iterable object has in the region of 30 methods. These methods make the vocabulary efficient, short and precise. Forget all those endless iteration, wrapping exercises that we go through in Java. Whatever you would require is made available for you. 

	-  They are _fast_ and _responsive_. The majority of methods (especially search and pattern matching ones) are optimized, hence you will see the difference when you actually use them in your application.

	-  They are _concise_. Thus whilst they are in use they significantly reduce the number of unnecessary loops and lines of code that usually written in other languages to achieve the very same goal. You might also combine a few methods to go even further.  


			val (minors, adults) = people partition (_.age < 18)


	As an example, the above line of code takes a collection as input (people) and partitions them into to sub-collections (minors and adults) based on the criteria that has been defined: age < 18.


	-  They are _safe_ and _universal_. The same operations are provided across range of iterable objects. For example, if we consider the String object as a sequence of chars, the operations that are available on arrays also available on String object. How cool is that?
In addition to that collection methods inputs and outputs are explicitly and statically type checked. This means compare to other languages majority of error that you unintentionally introduce during implementation are caught at compile-time whilst you write your code in Scala. 


I would like to keep going but I would say this is just about enough for the first blog post. I will continue on other posts, but before I close, I’d like to highlight one more thing.




## Practice, Practice and Practice ##

We (us developers, and not just Java ones now) love “Hello World” kind of exercises that teach us new languages, features etc. But we all know that is not enough. We need to get our hands dirty on real projects with what we have learned. We need to see how other developers approach the very same problem that we are about to solve. We need to see what can be done to make the code more reliable, enhanced and defect-less. Unfortunately none of the above can be achieved if you are not working on a real project but fortunately there are ways to address this challenge.

Contribution to an open source community can be described as a win-win situation. There are wide ranges of open source projects available that you can contribute to. Usually contribution starts with contribution to documentation, which leads to reading the code and documenting it accordingly. As your confidence and experience grows you might be able to move to bug fixing or even implementing some features for the project. That would be a great starting point for almost everyone.

The other way of course would be to join multi dimensional organisations like Capgemini. Within Capgemini we have wide range of projects that suit almost everybody’s tastes and appetites. You will certainly enjoy the diversity of projects that we have within Capgemini. If you are eager to learn more, challenge yourself, work shoulder-to-shoulder with very famous individuals who constantly shape the IT industry and more importantly being paid at the same time, why not join us and achieve all in one go. **We are hiring now.**
