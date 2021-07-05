---
layout: post
title: Building for Alexa at Devoxx UK
description: A quick look at Alexa Skills development
category: Development
tags: [Voice, Design, Development, Engineering, Learning]
author: [sasaunde]
comments: true
---
For our Platinum sponsorship of Devoxx UK this year, we had a theme to align with our recruitment drive of "it takes all types to make a team". One attraction that we had at our stall was an application taking you through the [Open Extended Jungian Type Scales](https://openpsychometrics.org/tests/OEJTS/) - an open-source equivalent of the Myers Briggs personality test. The project has 32 questions and an algorithm to condense your personality type into four scaled letters - are you Introverted or Extroverted, Sensing or iNtuitive, Thinking or Feeling, Judging or Perceiving. 

We then roughly grouped the resultant 16 personality types into some common technology roles:
 - DevOps
 - Server Side Development
 - Front End Development
 - Technology Scout
 - Agile Coach
 
 We had talented character designer [Finbar Coyle](https://www.linkedin.com/in/finbar-coyle-55710899) draw up some cartoons of each role and had them made into stickers and T shirts to hand out. ![T shirt](/images/2018-05-18-voices-for-women/T_Shirt_Design3.png) This was a fun game, although I did offend one of our most senior devs by classifying him as a front-end developer! I thought it would be a good addition to build the quiz for [Alexa](https://en.wikipedia.org/wiki/Amazon_Alexa), so that "she" could walk you through the questions. 
 
Alexa would make an excellent psychologist with her calm and measured tones – although, only the English and German speaking worlds. (alternatives are [Google Assistant](https://assistant.google.com/intl/en_uk/) which supports nine languages, [Cortana](https://www.microsoft.com/en-gb/windows/cortana) eight and [Siri](https://www.apple.com/uk/ios/siri/) an impressive 24). Amazon has published its reasons for [choosing a female voice](http://www.wsj.com/video/alexa-siri-cortana-why-all-your-bots-are-female/9E6E58C8-7B09-4DE0-A0A0-A39E822D941B.html) for Alexa – basically driven by customer feedback across large trial groups. I wonder what kind of an effect this could have on the next generation of programmers? Will there be a kind of implied perception that women are naturally good at maths and logic because of it? I already compare poorly to Siri in my childrens’ eyes (“Siri knows the square root of 2 to six decimal places, Mum, why don’t you?”). Or will it create a more negative impact of women being the do-ers and not the thinkers? I hope some university research departments are braced to investigate.

I'd been to one of Amazon's excellent [Dev Days](https://developer.amazon.com/alexa/devday), so I felt ready to build. The [documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) and development environment for using the Alexa skills kit to create your own Alexa skill (A “skill” is the name of an Alexa command interpreter) are excellent – there is a browser-based IDE or you can write your own code and configurations and upload them to AWS, and plenty of tutorials and templates to get you started - although, in the way of many new languages and libraries, it does move very quickly and the demo you built last month will probably need updating now...

### TLA Attack
As expected with new domains, there is quite a lot of terminology to learn. The [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit) (ASK) allows you to build the “interaction model” for your skill – the part which defines the format and flow of the conversation your skill will create via Alexa. This is defined using a JSON format. Then there is the skill service - the back end where the computation related to the skill takes place. The easiest back end to adopt is an AWS lambda function, particularly as it removes the need for an SSL certificate. You can just provide the function UID to the Alexa skill and use Amazon’s OAuth tokens to secure. 
Then there is the [Alexa Voice Service](https://developer.amazon.com/alexa-voice-service), (AVS) which represents the capture of the sound made by your voice, and the decision of which skill to direct it to. Devices such as [Amazon Echo](https://www.amazon.co.uk/Echo) and [Sonos One](https://www.sonos.com/en-gb/shop/one.html) contain implementations of Alexa Voice Services with an always-on microphone listening for the keyword, or you can install a [software version](https://github.com/alexa/avs-device-sdk/wiki) of Alexa Voice Services on your PC and trigger it to listen using a button click (I used a Java implementation with great success).
### The Interaction Model
For myself as a back-end developer, the development of the interaction model is by far the harder to understand. Once the parameters from your user are processed by AVS and arrive at the back-end Lambda function, it’s easy to use the Alexa SDKs and implement any custom business logic. SDKs for AWS lambda are available in Java, Python, C# and Javascript (NodeJS). 
The front end interaction model, as I mentioned, is [defined in JSON](https://developer.amazon.com/docs/smapi/interaction-model-schema.html) and consists of three parts – a required language model object, an optional dialog object and an optional array of prompts. Let’s start with the language model as the most interesting piece.

The language model has an invocation name. which is how the skill will be triggered – it’s basically the bit that Alexa will listen for and use to route incoming voice requests to the relevant skill. So, if you name your skill “analyse me”, enable it for your device via your Amazon account, and then stated “Alexa, analyse me”, your skill would be launched by Alexa Voice Services.

Next in the language model are the [intents](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html#intent-syntax), presumably so-called because they are the pieces where you interpret what the user intends to do… Within an intent, you list out the various phrases that a user might attempt in order to interact at this stage of your skill flow. There are a number of built-in intents, for instance an `Amazon.HelpIntent`, triggered when the user says “help” or similar, an `Amazon.YesIntent` triggered when the user says “Yes”, `Amazon.StopIntent` for when the user screams “ALEXA FOR GOD’S SAKE STOP!”.  The interaction model does not define the logic that is executed for each intent, that is done in the back-end service. It simply defines the intent with a name and lists the possible ways that the user can trigger it. This was the point for me where the usual “shattering of the magical illusion” of technology occurred. 

### No magic, all hard labour

We (developers) all know that technology isn’t magic, and that at the end of the day you have to build everything yourself and APIs/tools/frameworks simply help us along, but with something new and shiny like AVS there’s always the optimistic moment when you think “Ooooh, how clever IS this thing?”.

Of course, the answer is – very clever, but not THAT clever. When you say to Alexa, “turn the lights on”, and you get the same response as when you say, “switch on the lights”, it’s not because AVS contains super amazing linguistic skills which understand that these two phrases mean the same thing. It’s because a meticulous programmer has entered all the possible permutations of things you could say to turn on the lights into their intent model. This implies that, in order to avoid entering the entire thesaurus into your intent model, you need to be a bit clever with how you structure the conversation flow with Alexa. You need to move away from open ended questions such as, “What would you like to do?” and instead aim for the simplest responses possible, for instance, “Would you like me to turn the lights on?” Voice interface design is [already](http://ldt.stanford.edu/~ejbailey/02_FALL/ED_147X/Readings/CohenExcerpt.Winograd.pdf) a broad and fascinating discipline.

Another surprise for me was how difficult it is to collect an open phrase from the user. The parameters within a sentence that Alexa needs to collect are known as [slots]( https://developer.amazon.com/docs/smapi/interaction-model-schema.html#slots). When creating your own intent, you add some sample “utterances”, using curly bracket notation to define the slots, and the type of the data within those slots. So for instance, in one of the Alexa sample skills which teaches you about US geography, the sample sentence to trigger the intent is `“Tell me about {CityName}”`. The type of the `CityName` slot is set to the predefined `AMAZON.US_CITY`, so that Alexa knows it is expecting a value from a predefined list. There are a bewildering array of [predefined slot types](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html), across geography, entertainment, weather, dates, and on and on, and you are expected to find what you are looking for in the library.

The built-in intents are, of course, finite. Consider a skill that asks the user’s name. There is a predefined `AMAZON.US_FIRST_NAME`, but it may not cover everything you require as you might want this slot to include nicknames, shortened names, non-English names, and so on - it ought to be able to have ANY value. Alexa has the concept of a [literal](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html#literal) to support this, currently [being replaced by the concept of a custom slot]( https://developer.amazon.com/blogs/post/tx3ihsfqsuf3rqp/why-a-custom-slot-is-the-literal-solution), but it’s an interestingly restricted concept. For each literal you have to define an example value. So I tried an AskNameIntent with a model like this:
```
{
 “name”: “AskNameIntent”,
 “samples”:[
  “{sarah|Name}”,
  “It’s {sarah|Name}”,
  “My name is {sarah|Name}”,
  “I’m {sarah|Name}”
  ],
 “slots”:[
  {
   “name”: “Name”,
   “type”:”AMAZON.LITERAL”
  }
 ]
}
```
This works fine if I say “My name is Ermintrude”, and it works fine if I say “Sarah”, but if I just say “Ermintrude”, the skill does not pick up the data. The reasons behind this appear to be fairly complex, to do with the way Alexa’s algorithm determines when a user has started and completed a sentence. Just noise which does not directly map data in the intent is apparently unacceptable. It does have the added by-product of making Alexa skills more data-safe and secure; it’s nigh on impossible for a custom skill to “spy” on you and submit your conversation into the cloud.
There are further limits to the Literal/Custom Slot format which prevent skills being able to do things like store dictated notes. There is an 8 to 10 second hard cut-off when AVS listens for input, so even using the most carefully structured literal wildcard intent your musings will be cut off at the knees!

Once you've got to grips with intents and slots, you've basically got the hang of the interaction model. The next part of the model schema involves defining any custom types you may need - ones outside of Alexa's built in library. For instance, for my psychometric test skill, in order to capture the answers I need to create custom types for every possible answer. So in my server-side code Alexa asks the question:
```javascript
this.emit(":ask", "Do you keep a clean room, or do you just put stuff wherever?");
```
My Interaction Model has to define types that will match the user's response. So I have a list of potential utterances with a custom slot type {Response}:
```
 {
    "name": "ResponseIntent",
    "samples" : [
       "{Response}",
       "I {Response}",
       "Just {Response}",
       "I just {Response}",
       "I usually {Response}",
       "ummmmm I {Response}",
       "I prefer to {Response}",
       "I like to {Response}",
       "Probably {Response}"
    ],
    "slots" : [ {"name" : "Response", "type" :  "Custom.RESPONSE", "samples": [] } ]
 },
```
And then I define the Response type:
```
"types" : [
 {
  "name": "Custom.RESPONSE",
  "values": [
   {
    "name": {
       "value": "keep a clean room"
     },
    "name": {
       "value": "put stuff wherever"
     }
  }]
 }]
```
Again you can see how much non-technical thinking goes in to just one of the 50 questions in the psychometric test. This is going to be one big JSON file.


### State

Finally we move on to the back end, and the Lambda function which will receive the information from my skill. Again, there are lots of [well-documented code samples](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html) on [Github](https://github.com/alexa) to get you started developing the skill service and linking it to your interaction model. The one area that I found difficult to understand was how the concept of state could be used in between voice interactions to create a conversation flow.

For my psychometric test skill, I wanted to generate a value from 0 to 5 for each answer. To turn from a boolean (A or B) to this 1 to 5 scale, I decided to have Alexa ask the user how sure they were of their answer after each question, and then judge the positivity of their response. For instance, the flow might go like this:

(Q1) Alexa: "Do you get worn out by parties, or do they fire you up?"  
(A1) User: "I get worn out by parties".  
(Q2) Alexa: "Would you always say that?"  
(A2) User: "Well no, maybe I'm just tired today".  

Alexa "Okay. Now, next question... "

And so on. I wanted to use state to let the Lambda function know whether it was listening for the question answer (A1) or the answer to the follow-up assertion (A2). So, I define three states in my function.

```javascript
const states = {
    START: "_START",
    QUIZ: "_QUIZ",
    ASSERT: "_ASSERT"
};
```
I then use the `Alexa.CreateStateHandler()` method to group logic based on state.
```javascript
const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "QuizIntent": function() {
    	console.log("QuizIntent Intent");
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    }
});
const quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
   "Quiz": function() {
     this.emitWithState("AskQuestion");
   },
  "AskQuestion": function() {
     this.emit(":ask", questions[counter]);,
  },
  "HelpIntent": function() {
   // message specific to answering psychometric query
  },
  "AnswerIntent": function() {
   var answer = getSlot(this.event.request.intent.slots); // This would be the answer to the above question
       .....
     this.handler.state = states.ASSERT;
     this.emit(":ask", "Are you sure?");
});

const assertHandlers = Alexa.CreateStateHandler(states.ASSERT, {
 "HelpIntent": function() {
    // message specific to answering the are-you-sure query
 },
 "AnswerIntent" : function() {
   var answer = getSlot(this.event.request.intent.slots); // This would be the response to the "are you sure?" question
      ....
   this.handler.state = states.QUIZ; // ready for the next question
```
There is an [official API to define dialog flow](https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html) if your dialog is more complex, but they are the same concept of state underneath. States do help make the code easier to read and follow.

### Skills for Skills

In conclusion, this is a new set of skills a developer will need to add to their bow to work with AVS or, indeed, any voice interface. In the same way that web design required graphical skills, voice interface design is a completely new subject. Skills that move steadily away from mathematics and logic into the worlds of English and other modern languages, and the psychology of speech and conversation. I’m hoping that this is another way in which women will be lured into software engineering, as English and psychology are famously female-dominated degrees. Fingers crossed!

### Alexa psychometric test

If you'd like a copy of my Alexa skill, I haven't published it on Amazon but the code is on my [github repository](https://github.com/sasaunde/alexa-personality-quiz). Here you will find the JSON file containing the interaction model and the Javascript file containing the lambda function logic. Happy scripting!
