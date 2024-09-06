---
layout: post
title: "Use Cases for AI"
summary: "What should we be using AI for?"
category: AI, Development
tags: [AI, Machine Learning, Development, Testing]
author: [sasaunde]
comments: true
share: true
---

# Use Cases for Generative AI

For the past year, almost every week the Software Engineering world is asked about Artificial Intelligence (AI). “What should Capgemini’s AI offerings be?”, “Aren’t you worried about the role of Capgemini software engineers now that AI can write code?” Specifically in these cases, the questions are around Generative AI. To put that in context, here is a recap of some terms used to describe different implementations of AI.

### Machine Learning
A nice dictionary definition of machine learning from [Oxford Languages](https://languages.oup.com/) is: “the use and development of computer systems that are able to learn and adapt without following explicit instructions, by using algorithms and statistical models to analyse and draw inferences from patterns in data.”
The difference between a basic decision tree and machine learning is that with machine learning, a person didn’t sit down and define a set of if-statements for the machine to follow to make decisions (as used, for instance, in the NHS [Map of Medicine](https://www.ucl.ac.uk/news/2004/dec/map-medicine) from 2007). Instead, they provided a set of inputs and expected outputs and let the machine’s algorithms figure out how to get from input to output. You could describe it as a bottom-up approach to problem solving rather than a top-down approach. This evokes the differences between [Newton](https://en.wikipedia.org/wiki/Isaac_Newton) and [Leibnitz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz) in their attempts to describe the physical world in the 17th century. Newton’s laws are built more like a decision tree, describing the results of forces on objects, whereas Leibnitz’s “monads” are more like the algorithms in machine learning where small, simple rules build up together to create the complex forces we see in action. They are both very useful tools in describing and learning about the physical world but may result in different predictions of varying accuracy.
Machine learning algorithms are loosely based on the [neurons](https://en.wikipedia.org/wiki/Neuron) in the brain. Each “artificial neuron” is a function that receives one or more inputs, applies weights to these inputs, and sums them to produce an output. Chained together into a “Neural Network” these small functions can complete amazing tasks such as image recognition, text generation and predictive analytics.
Machine learning is incredibly useful and can benefit a wide range of industries from healthcare to travel to finance.

### Generative AI
Dictionaries are not so hot on defining generative AI. Perhaps the best example is from [Merriam Webster](https://www.merriam-webster.com/dictionary/generative%20AI): “artificial intelligence that is capable of generating new content (such as images or text) in response to a submitted prompt (such as a query) by learning from a large reference database of examples”. The important difference here is the generation of new content. There are still machine-learning algorithms at play, but the ask is that they produce something new. The output of a generative AI query isn’t pulled from a list, it isn’t copied from an article. It is created by the neural network. You MAY get a text answer that is the same as an existing article, but it will have been probabilistically generated using an algorithm that, in simple terms, says “what word is most likely to come next in this phrase”, for example. Asking the same question twice will not produce the same output.
With machine learning, the output you get is usually a probability – for example, a handwriting recognition system would give a probability percentage that a given input image contains certain words. As such, it isn’t ever completely wrong, because it doesn’t give a definitive answer. Generative AI will look at the various probable outputs and choose one by applying a separate decision algorithm. In this way, it is possible to get answers that are just plain wrong.

### General AI
Wikipedia says General AI “is a type of AI that matches or surpasses human capabilities across a wide range of cognitive tasks.” To put it simply, General AI does not exist. We don’t currently accurately define human capabilities, so trying to decide whether a machine can exceed them is impossible!

## Examining the Use Cases

As mentioned above, Machine Learning solutions are proving vastly useful in automating complex tasks that must make deductions based on huge quantities of data. A notable example is evaluating patient [CT scan data in search of cancerous growths](https://www.nature.com/articles/s43856-022-00199-0). The algorithm does not replace the oncologist, but assists to alleviate an otherwise “repetitive, tedious and burdensome” task. The outputs are not treated as gospel truth, but help the oncologist choose where to focus their time and efforts.

There has understandably been much buzz and excitement about the amazing capabilities of Generative AI this past year, with the broader uptake of [ChatGPT](https://openai.com/index/chatgpt/) and [Dall-e](https://openai.com/index/dall-e-2/), for example. Now that the dust has settled, a closer evaluation of Generative AI use cases is required.

Remember this diagram for blockchain use cases? Perhaps it's time for something similar for Generative AI use cases?

![Should You Use Blockchain? Flow chart](/images/2024-09-06-use-cases-for-ai/flowchain.jpg)

The key thing to remember about Generative AI is that the answers it generates are not necessarily correct, and are not even [intended](https://link.springer.com/article/10.1007/s11023-022-09602-0) to be correct. When architecting a solution that involves Generative AI, the pertinent questions are:

* Does it matter if this generated answer is wrong?
* Do I require the same answer to the same question if I ask it twice?

If the answer to either of these questions is YES, then you cannot use a standard Generative AI solution without some significant [tuning](https://www.forbes.com/sites/forbestechcouncil/2023/10/10/the-power-of-fine-tuning-in-generative-ai/) which in itself removes the “generative-ness” of your solution. 

There are still plenty of scenarios where the answer to the above questions is NO. With a focus on Microservice Development, we will look at the use cases that have been put forward for enhancing the software development lifecycle:

### User Interface Design

When designing a human-computer interface to improve the user experience, there are best practices but there is no wrong answer. As such, it is a viable candidate for applying Generative AI - the role of an [Agile Software Engineer](https://en.wikipedia.org/wiki/Agile_software_development) in interface design is to iteratively put suggestions forward to the system user for their consideration. AI tools could accelerate prototypes, and assist the designer in breaking out of their habitual designs and trying something new.  Already, design tools such as [Figma](https://www.figma.com/) and [V0 by Vercel](https://v0.dev/) have started to put this into practice.

### Automated Testing

A software test suite should allow all routes through the system to be automatically checked when a change is added, to ensure that no previous logic has been broken by the new addition. Defining “all routes” isn’t as straightforward as you may think. There is a great testing joke:


> A tester walks into a bar and orders a beer.  
> Then they order null beers.  
> Then they order 99999 beers.  
> Then they order ytugihoij^%&*( beers.  
> Then they order a bear.  
> A customer walks into a bar and asks where the toilets are. The bar explodes.

Turning up the "[temperature](https://platform.openai.com/docs/guides/text-generation/how-should-i-set-the-temperature-parameter)" on Generative AI and asking it to generate some test cases, and getting some random test cases generated which a tester might not have considered, could be useful. A similar principle is applied to testing technical architectures in Barry O’Reilly’s [Residuality Theory](https://www.sciencedirect.com/science/article/pii/S1877050922004975), whereby he suggests imagining random events to test the robustness of a software architecture. For example, if you architect for the scenario that giant lizards might crawl out of the River Thames and set fire to London, your application will consequently be able to survive events such as power blackouts or train strikes! Generative AI could be used to produce those off-the-wall architectural scenarios that help improve your overall application stability over time.

### Writing Code

There has been a lot published around the ability of Generative AI to [write code](https://youtu.be/qbIk7-JPB2c?t=1771). With applications such as Github Copilot and Azure Copilot being very easy to integrate into a developer’s workflow (or to use standalone as a pseudo developer), this would appear to be a central use case for Generative AI, and some believe that Generative AI will replace the software engineer’s role imminently. What we have seen with Capgemini software projects does not align with this, however – it is not possible to provide a junior developer with a Copilot license and expect them to perform like a senior developer, let alone enabling businesses to create software themselves without a software engineer present at all. There are a few big and obvious reasons for this:
1. It only saves time spent writing code  
Developers spend surprisingly small amounts of time actually writing code There are [various studies](https://www.microsoft.com/en-us/research/uploads/prod/2019/04/devtime-preprint-TSE19.pdf) showing percentages between 9% and 67% of time is spent “coding”, depending on the definition, the seniority of the developer, the workplace environment. Either way, there is a lot of time that a developer spends on tasks that Generative AI code assistants are not designed to help with.
Github proudly announced huge [productivity gains](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) of 55% when using Copilot, but saving 55% of the 9% of time you actually spend coding isn't as impressive - plus, most of the examples I have seen of using Copilot focus on reducing boilerplate or writing simple games, and these use-cases are not particularly relevant to the typical task list of a senior software engineer.

2. It takes value away from the development lifecycle  
An often-quoted example of Generative AI writing code is the creation of unit tests. The best practice when developing code is to employ [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD), an architectural approach which forces the developer to consider their code interfaces before they even write their method implementations. Relying on Generative AI to write unit tests implies they will be written after the code, hence not following TDD practices.
A counter-argument is where a team inherits a codebase which does not have high unit test coverage. Is it safe to allow Generative AI to create the tests? Again, let’s go back to the initial ask - Does it matter if this generated answer is wrong? Yes it does matter. The only thing worse than no tests is incorrect tests! It is possible to generate unit tests for an existing code framework [using rules](https://symflower.com/en/) rather than Generative AI. In fact, for many Generative AI use cases this is true – a rules-based or machine learning result from a query is more useful than a generated result. What we find with many Generative AI use cases is that the useful component is very often the natural language “chatbot” interface and the way it can translate a natural language query into a search term, rather than the generated result.

3. It's most useful for the people who don't want it  
It is worth considering who will find a Generative AI code assistant most useful. Senior developers are less likely to use it to generate much code, as they have already found ways to avoid boilerplate, and the difficult work of fine-tuning or bug-fixing a code base is less likely to bring useful suggestions from Copilot. It is still incredibly useful though and can save many hours of trawling the Internet. Below is a real-world example of a conversation held with Azure Copilot. The software engineer has identified an issue with the code, and uses Copilot to find a way to code a specific fix. Interestingly many of the most useful applications of Generative AI coding appear to be helping humans to write [regular expressions](https://en.wikipedia.org/wiki/Regular_expression)!

![Copilot writing regular expressions](/images/2024-09-06-use-cases-for-ai/copilot-regex.jpg)

As you can see from the prompt engineering, considerable knowledge is needed to get the code that is required to fix a problem in a code base. Further knowledge is needed to check whether the required answer is relevant. And user beware - if you lose your chat history in Copilot (as will happen with Microsoft Copilot in “Data Protection” mode) of course you cannot get the same answer a second time by asking the question again, and this can result in many frustrating lost hours trying to find what you briefly saw via an internet search instead! So much for time saving!

When interviewed, most senior software engineers will talk about their problem-solving mindset. They enjoy problem solving, and will actively look for problems to solve. As such, a tool which does the “fun bit” of problem solving for them is not going to have a great take-up. Regular expressions aside, it is junior developers who will be most likely to take up Generative AI and use it as a crutch. And here we must go back to our initial check: Does it matter if the code they generate is wrong? In our software supply chain pipelines we usually have built-in checks to ensure compilation, look at code quality and mandate test coverage, so some “wrong” code will be weeded out by the pipelines, but there is still a huge risk that a junior developer is shipping code the impact of which they do not really understand. Currently, hackers have to go to great lengths to get unknown code into production code-bases, now it seems we are embracing a tool that will do it for them. Care must be taken here.

4. It's only as good as the average of the code it learns from  
The data set used by Generative AI to produce code is often all open source code bases. This is a huge dataset and fairly comprehensive – many, many programmers have contributed to open source projects. Therefore, we have literally created the world's most average programmer. This is rarely the target that a business sets for its IT divisions… And indeed, [reports](https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality) are now proving that a code base maintained with Generative AI degenerates in quality over time.

5. It's just another programming language to learn  
There have always been layers of abstraction between humans and machines, be it 10 strings on an abacus to represent decimal numbers, typewriter keys operating little letter printers, or an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) auto-completing your code bracket pairs. Even Java code compiling to JVM bytecode which is turned into operating-system-specific instructions by the [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine), or NoCode/LoCode drag-and-drop integrations. Most of the text-based layers of abstraction have been called “programming languages” and in that way, is Generative AI very different? It is still part of the chain between the human ideation of the software, and the executable software itself. If we all become expert prompt engineers and lose the ability to write Javascript code from scratch, is that any different from losing the ability to write C++ code because we write Javascript and get Google’s [V8 engine](https://v8.dev/) to turn it into C++ for us? Software engineering is still the same skill, but the language used is now the language of prompt engineering. The only difference is in the fact that the Generative AI answer varies over time and hence the process of debugging could get pretty interesting .
 
In conclusion, there are fewer use cases than one might think for Generative AI, and whilst it will be a great tool for developers and will probably be as game-changing as IDEs were in the 1990s, it isn't quite the end to software engineering that people are predicting - developers, don't go hanging up your boots just yet.

### Content Generation

One of the often-touted use cases of Generative AI, within and without the Software Development community, is its ability to generate content for blogs and articles. (Perhaps it is also able to read said content and “like” it?)
As an example, we can compare the content of this article with the content generated when we ask Microsoft Copilot to write it, using this prompt:

“Write 2000 words on the use cases for Generative AI in the software development lifecycle. Include a definition of machine learning, generative AI and general AI in the first section. Use a formal but friendly tone. Write with the persona of a cautious software engineer.”
## Copilot 
> Certainly! Let's delve into the fascinating world of Generative AI and its impact on the software development lifecycle. As a cautious software engineer, I'll guide you through the nuances while maintaining a friendly tone. 
>  
>  
> Before we explore the use cases, let's clarify some terms: 
> 1. Machine Learning (ML): ML is a subset of artificial intelligence (AI) that enables systems to learn from data and improve their performance over time. It involves algorithms that automatically learn patterns and make predictions based on examples. 
> 2. Generative AI (GenAI): GenAI goes beyond traditional ML by creating new content rather than just predicting existing patterns. It generates novel outputs, such as text, images, or code, based on input data or prompts. 
> 3. General AI (AGI): AGI refers to an AI system with human-like cognitive abilities, including reasoning, problem-solving, and creativity. While AGI remains an aspiration, > GenAI represents a step toward achieving it. 
>  
> ### Code Generation and Assistance: 
> - GenAI tools like ChatGPT and GitHub Copilot assist developers by suggesting code snippets, improving productivity, and reducing manual coding efforts.
> - However, it's essential to recognize that GenAI isn't a silver bullet. It complements human expertise rather than replacing it entirely. 
> ### Content Creation: 
> -	GenAI can create documentation, blog posts, and other textual content. It helps developers communicate effectively and maintain consistent documentation.
> ### Test Script Generation: 
> -	Beyond user stories and test cases, GenAI can generate test scripts and scenarios. 
> -	It identifies edge cases, executes automated tests, and logs defects, enhancing software quality. 
> ### Unit Test Cases: 
> -	GenAI assists in writing unit test cases, ensuring robust code coverage. 
> -	Developers benefit from faster test case creation and improved code reliability. 
> ### Source Code Generation: 
> -	While GenAI isn't writing entire applications (yet!), it can generate boilerplate code, saving time during initial setup. 
> -	Developers remain responsible for critical design decisions. 
>  
>1. Quality Control: 
> -	Always review GenAI-generated content critically. It's a tool, not a replacement for human judgment. 
> -	Verify that the code aligns with best practices, security guidelines, and project requirements. 
> 2. Ethical Implications: 
> -	GenAI learns from existing data, which may contain biases. Be cautious about perpetuating bias in your code. 
> -	Regularly assess the ethical impact of GenAI-generated content. 
> 3. Balancing Speed and Quality: 
> -	GenAI accelerates development, but don't sacrifice quality for speed. 
> -	Maintain a balance—use GenAI where it enhances productivity without compromising reliability. 
>  
> Generative AI holds immense promise for software development. By understanding its capabilities, limitations, and ethical considerations, cautious engineers can leverage it effectively. Remember, GenAI is a valuable ally, but it's our collective wisdom that truly drives innovation in the software development lifecycle. 
> As a cautious software engineer, I've emphasized practical insights while maintaining a friendly tone. If you have any further questions or need clarification, feel free to ask! 😊
> <cite>Source: Conversation with Copilot, 19/06/2024  
References given: 
1. [Generative AI and the software development lifecycle](https://www.thoughtworks.com/insights/articles/generative-ai-software-development-lifecycle-more-than-coding-assistance) 
2. [Automating the Software Development Life Cycle with Generative AI](https://www.architectureandgovernance.com/artificial-intelligence/automating-the-software-development-life-cycle-with-generative-ai/) 
3. [How Generative AI is Reshaping the Software Development Lifecycle: From ...](https://geekyants.com/blog/from-concept-to-code-how-generative-ai-is-reshaping-the-software-development-lifecycle) 
4. [IMPACT OF GENERATIVE AI ON THE SOFTWARE DEVELOPMENT LIFE CYCLE (SDLC)](https://ijcrt.org/papers/IJCRT2308145.pdf) 
 

Not bad, Copilot! However it’s only 500 words. No amount of re-prompting and scolding would generate more. Seems you still can’t beat humans for their sheer ability to vacillate!


