---
layout: post
title: "How to (maybe) replace your HR department in 3 easy steps"
summary: "Spinning up a Chatbot against a Knowledge Base in Azure"
category: Cloud
tags: [AI, Chatbot, Cloud, Azure]
author: [sasaunde]
comments: true
share: true
---

I recently had the privilege of judging an internal Capgemini hackathon. It was an open brief, but the focus was to be on technology and its application to solve a real-world business problem. The entries were varied and excellent, from a dashboard to assess how warm/busy/accessible the office was so you could decide whether or not it was worth going in, to gamification of training, to improvements for mountain search and rescue teams. 
One of the major commonalities across many of the entries was the use of “AI”, where, given our common use of the Azure platform, AI tended to be defined as Azure cognitive search (recently renamed [Azure AI](https://azure.microsoft.com/en-us/products/ai-services/ai-search)) indexing a set of business documents, with a natural language processing unit on top to act as a chatbot. This made me want to have a go myself, and see what I could build!

## Is it AI?

This architecture, for me, isn’t really using the “AI” bits of AI - despite the fact that if you use ChatGPT (which is [available as a product in Azure](https://learn.microsoft.com/en-us/azure/ai-services/openai/) since Microsoft's purchase of OpenAI) there can be some non-deterministic, generative functionality, but it sure is useful and could probably ease the burden of the HR and support departments of many organisations - and could possibly even replace a lot of the staff in these departments. I set out to see if I could build a HR chatbot to replace the kinds of queries a typical HR department employee might need to deal with. Why HR? Just because everybody hates them?? No…! - it's because of the remit of HR, dealing with the employee lifecycle and needing to prove that a company acts without bias it must be a heavily process-driven department. These processes must be documented, and most of the workload of the department is in dealing with queries regarding the process. The incoming questions are probably not phrased in the same way as the process documentation, so some sort of fuzzy search is required in order to automate the question-answering process; for example, translating “how much paid time off do I get when my baby is born?” to “paternity leave allowances” is not a straightforward mapping. This is the reason that previous attempts to automate such departments have failed. Language is too complex for simple mappings and decision trees to replace a person on the end of a line - as anyone who has tried to navigate an automated telephone call will tell you. Who hasn’t ended up shouting “I WANT TO SPEAK TO A PERSON” down the line? But at the end of the day, the workload is simply regurgitating content from a document repository and the hard bit comes in finding the relevant sections - a process that is better automated as it's a pretty unrewarding job acting as a knowledge base for people who can't be bothered to read swathes of documentation.

## The Architecture

As mentioned, the hackathon had been playing with the Azure cloud, so we’ll keep to this and use Azure’s concepts. These are pretty simply translated to any hyperscaler though, or to open-source alternatives if you want to host your own. For example, on AWS you could use [Textract and Amazon Comprehend](https://aws.amazon.com/blogs/machine-learning/building-an-nlp-powered-search-index-with-amazon-textract-and-amazon-comprehend/), and in the OSS world you’d perhaps use [NLTK](https://www.nltk.org/) and [Lucene](https://lucene.apache.org/).

Azure AI Search is a nice tool - a little more than document search, a little less than AI. It can be a bit clunky to get used to, and the price policy is per GB storage which is pretty bizarre - but this can be beneficial if you have query-intensive applications and a small-ish data set of documents. We use it as an exotic database view for one of our applications, and it took us a while to get used to the fuzzy query syntax - it’s not really designed for logical queries, it’s much better at giving you best-guess matches for loose search terms - and as such is well positioned to be the back-end of our HR chatbot.

## The Method

I found a couple of tutorials and quick-starts to create chatbots on my documentation - 
[Azure Search OpenAI demo](https://github.com/Azure-Samples/azure-search-openai-demo)
or [Query your documentation using Langchain](https://techcommunity.microsoft.com/t5/startups-at-microsoft/build-a-chatbot-to-query-your-documentation-using-langchain-and/ba-p/3833134)

The issue I found is that it’s all moving quite fast - faster than the tutorials can keep up with. All mention of [Langchain](https://www.langchain.com/) has now gone from the Azure portal (although you can still [write your own](https://towardsdatascience.com/talk-to-your-sql-database-using-langchain-and-azure-openai-bb79ad22c5e2) Langchain chatbot), and QnA maker has now moved on and we have [Azure AI Language Studio](https://language.cognitive.azure.com/) where you can add in your documents via a “Custom Question Answering” project, which is a type of Azure “Language” and can be created via the LoCode/NoCode [Language Studio homepage](https://language.cognitive.azure.com/). The tutorial speedily guides you through a simply-configured web form although it's not quite clear what you are actually going to create - looking at what was deployed after the configuration steps, this sets up an Azure cognitive search (AI search) repository and then enables custom text classification / custom named entity recognition on the repository. The default behaviour for this appears to be breaking down the content in your referenced documents into paragraphs and pulling out likely titles/subjects. You can then modify this classification by adding in new questions and answers, or choosing the best answer for given terms.

The free trial only allows you to upload three sources into your AI search repository. So, for our HR example, I’ve downloaded three HR policy documents from [this handy online repository](https://staffsquared.com/free-hr-documents/ ) and added them into my Custom Question Answering repository. This generates a “Knowledge Base” that I can then publish.

![Upload documents into your language knowledge base](/images/2024-01-08-create-ai-bot-in-azure/upload-docs.jpg)

Here we can see the way that the content has been divided up into major terms and paragraphs that may address those terms. I can edit here, and once it’s published I can generate a Bot to act as the user interface to it.

![knowledge base parsed from documents](/images/2024-01-08-create-ai-bot-in-azure/knowledge-base.jpg)

OK so now onto creating this Bot. As Bots go, OpenAI's [ChatGPT](https://chat.openai.com) is the real deal. Generative AI, pre-trained to recognise vast arrays of English language. For most use cases we would have to “turn off” all the fun, generative stuff for our application (see Guardrails below) and it’s probably overkill to use ChatGPT for this demo - plus, it isn’t included in the Azure Free Trial tier so I will be experimenting with the [Azure AI Bot Service](https://azure.microsoft.com/en-gb/products/ai-services/ai-bot-service) instead. It should be sufficient for this fairly small and simple demo.
Cost-wise, the Azure AI Bot has a free tier, but it must be hosted via an Azure Web App whose service plan is defaulted to S1 (Standard). This plan, at £75/month to keep it running, is eating rapidly into my free credit!

Configuring the Bot online is pretty straightforward. The web GUI provides you with a customised template for creating the resources that you will need, creating an App Service Plan to launch an Azure WebApp that will host your Bot. The only config you have to do is enter the key of your Language Resource so that you can create a secure connection between the AI service knowledge base and the chatbot. This isn't documented, but you can find the key by going back to the Azure Portal home and clicking the green squares “All Resources” view, then selecting your Language resource (the resource where Type = Language) and then selecting the Keys and Endpoint menu item. (There are two keys, so that you can refresh them by rotating them individually and hence avoid downtime. Either one is fine.)

## Testing

Once your Bot is deployed, you can test it by finding it under All Resources and choosing “Test in Web Chat” from the right hand menu.

I tried with a simple question, that I know is answerable with the content in the documents:
![Trial question](/images/2024-01-08-create-ai-bot-in-azure/good-answer.jpg)

So far so good. The Bot has successfully found the right bit of my documentation and returned a comprehensive and understandable answer. How about another:

![Second question](/images/2024-01-08-create-ai-bot-in-azure/bad-answer.jpg)

Oh dear. "cannot" is not exactly a strong English sentence! Although it has found the relevant section of the documentation, it has not been able to pull out a contextual answer. 
I am not sure if it is the Language Service or the Bot which is struggling with this question. Enabling and examining the logs on the Bot Service isn't that helpful - it just shows HTTP POST requests going to the Bot framework. The Bot framework should be responsible for breaking down the user's entered text into logical "intentions" that the back-end question-answerer can respond to, and then delivering the back-end response in a human readable form.
I eventually figure out how to [enable logging on my Language Service](https://learn.microsoft.com/en-us/azure/ai-services/diagnostic-logging) and discover the query and response that the Bot has sent to the language service:

![Bot query to language service](/images/2024-01-08-create-ai-bot-in-azure/backend-query.jpg)

I can see that the language service has actually done a reasonable job. It's identified the right paragraph for the query, but returned just a 38.97% certainty rating that this is the right data. Fair enough. So it seems that the issue is with the Bot being able to pull the right piece of text out of the response. This makes me start to wonder about the "Bot" I have deployed. What is it actually based on? There isn't much documentation I can find, but you can download the source code, which shows that I have deployed something created by the [BotBuilder SDK](https://github.com/microsoft/botbuilder-js). I should be able to run this locally, but weirdly the Bot JavaScript code in my download seems totally out-of-date with the latest Language Studio API. I have to go back to the drawing board and use one of the [later samples](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/48.customQABot-all-features) and update the code to correctly declare a method asynchronous to get the Bot running locally using the Bot Framework Emulator. 

To get it to work using Node.js v18.16.0 and restify ^11.1.0, I had to edit the sample code [index.js line 91]( https://github.com/microsoft/BotBuilder-Samples/pull/3939/files) to declare the method async or it would not start:

```
// Listen for incoming requests.
server.post('/api/messages', async (req, res) => {
    adapter.processActivity(req, res, async (turnContext) => {
        // Route the message to the bot's main handler.
        await bot.run(turnContext);
    });
});
```    

I was then able to run the Bot locally connecting to my Azure-hosted Language via the Azure [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/blob/master/README.md). And of course as luck would have it, the latest sample doesn't return such a poor response! It's still not perfect, but it's at least a sentence. See below.

![Local Bot Service running in emulator](/images/2024-01-08-create-ai-bot-in-azure/via-emulator.jpg)

It does also prove that the poor response here was the chatbot interpreting the data from the Language Service. The Language Service will return a field called an AnswerSpan which lists, with a confidence score, the section of the documentation it considers most relevant to the question. In the case of my "dismissal" question, the AnswerSpan returned was:

`An employee whose appointment is terminated for any reason will be provided with a written statement of the reasons for the dismissal`

This text was paired with a confidence score of 0.2880999999999997, or circa 29%. Fair enough. So how the cloud-deployed bot extracted the answer "cannot" from this is a bit of a mystery! The new version of my Bot prints the whole AnswerSpan and is, whilst still not exactly accurate, at least better. So how do I fix it?

## Customisation

It seems the way to fix up these simple Bots is to go and add a custom question/answer into the Language Service knowledge base. I try adding a specific answer to the question, "Can I appeal against my dismissal?". I re-publish the knowledge base and try again.

![Adding a custom question](/images/2024-01-08-create-ai-bot-in-azure/fixed-question.jpg)

This looks much better. But it does imply that quite a lot of user testing and customisation will have to take place before this Bot is ready to replace its human counterparts.

## Guardrails

One of the things that surprised people about ChatGPT, particularly in its earlier iterations, was that it was not trained to be accurate. It was trained to please the user. This would mean it would return inaccurate answers above telling you that it didn’t know the answer, as it had gauged higher satisfaction from “lying”! You don’t want your HR chatbot to lie, so you must use the guardrail settings to ensure that it does not. With ChatGPT, guardrails can be set using natural language, for example you can state:
``` 
{"role": "system", "content": "Assistant is an intelligent chatbot designed to help users answer their tax related questions.`

Instructions:
- Only answer questions related to taxes.

- If you're unsure of an answer, you can say "I don't know" or "I'm not sure" and recommend users go to the IRS website for more information. "},
{"role": "user", "content": "When are my taxes due?”}
```

This configuration will prevent the chatbot from "making up" an answer if it cannot find a decent response in its repository.
Configuring Azure's ChatGPT chatbot via the GUI, to achieve the above you turn the setting known as "temperature" down to 0. The temperature represents how creative the chatbot can be in getting you an answer. A low temperature results in more "I'm sorry I don't know" type answers, but increases the chances you'll get an accurate answer, and that you'll get the same answer when you ask the same question twice!

## The Cost

So what does this cost to run in Azure? Depending on your Bot type, the cost can vary wildly. As mentioned, I am running my Language instance and my Bot instance in the free trial tier, so I am only paying for the app service to host them and this is around £75/month. If you were to use an enterprise ChatGPT Bot, costs are over £800/month fixed rate for 40 users, plus 80p per "usage unit" and £20 for any extra users over and above the plan. Still considerably cheaper than making your HR staff deal with these queries, I suppose..
As mentioned, Azure AI search is priced per GB of data indexed, the free tier runs up to 50 GB, Standard tier gives you 25 GB  for 27p/hour.

## In Conclusion

I am impressed with the Azure AI search offering - it's powerful and useful - there are so many scenarios whereby we end up awash with documentation and cannot find the content we need. The chatbots are a varied bunch but I liked the way you could download the code and run/edit it locally with relative ease. In all, I feel this will be a very common architecture for the business problems of the next year or so.
