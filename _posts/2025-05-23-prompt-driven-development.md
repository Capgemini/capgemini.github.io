---
layout: post
title: "Prompt Driven Development"
subtitle: "What I learnt vibe coding for a real project in the real world"
summary: "A guide to programming in the age of AI and LLM assistance"
category: AI
tags: [Development, Engineering, AI]
author: julie_vaccalluzzo
comments: true
share: true
---

> Vibe coding (also vibecoding) is an AI-dependent programming technique where a person describes a problem in a few sentences as a prompt to a large language model (LLM) tuned for coding. The LLM generates software, shifting the programmer's role from manual coding to guiding, testing, and refining the AI-generated source code. Vibe coding is claimed by its advocates to allow even amateur programmers to produce software without the extensive training and skills required for software engineering. The term was introduced by Andrej Karpathy in February 2025 and listed in the Merriam-Webster Dictionary the following month as a "slang & trending" noun.

[Wikipedia][1]

To prepare myself for the marathon I had set myself up for of building a Next.js app in one week, I watched a few short-form videos and read some online blogs. I loaded up a whole bunch of YouTube videos – I am visual, so this works for me. I also follow this topic doomscrolling on TikTok and watching comments fly by on my phone's Discord notifications, the occasional Substack binge and me-curated X feeds. Side note: it's dangerous letting social media just feed you stuff. Your tin hat will shine like a lighthouse on a dark night far away from civilisation. It's like advertising, but instead of making you feel inadequate and wanting to inexplicably buy something, you find yourself angry and questioning your values. Regardless, a lot of the information had already trickled down. Interest is king. Use it to your advantage.

The Capgemini DCX team published an invite to [Vercel](https://vercel.com/)'s new shiny AI tool V0. The presentation took place at the Capgemini London office, I was aware of Capgemini's partnership with Vercel, and this project was ripe to give it a play.

What I learnt from working with Data Scientists on AI projects: your overarching prompt can go a long way in setting you up for success.
Vercel's V0 has a setting for your whole project. This is where I told it what I wanted from it – how I wanted it to code, what stack I was using, and other bits. My prompt looked like this:

> For all the code you produce, please adhere to the following best practices. If you need to deviate from them, please tell me before you generate anything as we are trying to save energy and usage. I will provide context as instructions as follows:
>
> - Clean Architecture: Separation of concerns between UI, business logic, and data access
> - Type Safety: Comprehensive TypeScript types for all components and functions
> - State Management: Zustand for efficient state management
> - Form Validation: Client-side validation with detailed error messages
> - Error Handling: Custom error classes and consistent error handling
> - Security: CSRF protection, secure cookies, and input validation
> - Accessibility: ARIA attributes and keyboard navigation support
> - Responsive Design: Mobile-friendly UI components
> - Use Material UI for building the app. Use Ubuntu for headings and Roboto for body copy.

I originally had a much larger prompt, but that got too confusing for V0 and I had to cut the chaff and thin it out. I used a web-based LLM, the famous one, the one and only, [ChatGPT](http://chat.openai.com/), to slim it down a bit. The V0 context window is not that large. It is good practice to keep your prompts short and actionable. One step at a time. Try not to give the LLM too many complicated things to do at once; this is where LLMs will fall over for now. You also kind of need a language degree to use this thing, in that you need to be able to communicate and explain what you need concisely, so make sure you are very specific. Say jump and it will jump... most of the time. Also a good idea to tell it what not to do or to only do this, only look at this.

Back to V0, I was very impressed with its rendering-from-design capability using [Figma](https://www.figma.com/) URLs. However, if the design includes random colours and artefacts, the LLM can include these or add all your styles as overrides of the theme! I had to restart three times as design and theme colours were updated! The login screen was still on the old design, so all my subsequent pages were overrides of the original theme. Just because it works doesn't make it right. The perfectionist in me was having a meltdown! How to deal with design changes in an agile way? In short, you can't – well, not with this tool yet unfortunately, as you cannot upload your project back to the online system and say "update my file to the new design" when your project gets too big. Not very agile, methinks. The ecosystem is new-ish, so watch this space. I wish there was a plugin that you could have with your IDE, kind of how Dreamweaver used to work in the mid-2000s, pushing and pulling updates from the server. As of 14 May 2025, this is [V0's number one thing that everyone requested](https://youtu.be/Tuu5iC--fcg?si=OrkKPFC74A4-C_v9&t=1000) – well, a feature that will sync with your GitHub codebase, so that’s a start to get things cohesive.

I did like that V0 intuitively knew to do things and interpret the design in ways I would not think about – things that I later thought "I'll keep that, thank you very much", and could you also include this or that? V0, under the hood, uses many models to build its output. My feeling here is: make sure your designs are machine-readable, and by that I mean be pedantic, specific, and make them sharp-sharp. The better and more precise your designs are, the better your results. Again, this is not very agile, and I am starting to see others in the dev community starting to poke a stick at agile, asking if it's still relevant – especially in this vibe coding era of prompt-driven development. I would also like to see UX and UI designers actually explain functionality in their designs so that these can be part of the prompt for the feature.

Prompt-driven development is exactly what it sounds like. You prompt, you see what comes out, and then you prompt again until you are happy with it. Coined by [Andrew Miller on his _Andrew Ships_ substack][2] as follows:

1. Developer receives requirements
2. Developer breaks requirements down into a series of prompts
3. LLM generates code for each prompt
4. Developer reviews LLM generated code
5. Developer submits all changes for review
6. Another developer reviews and merges changes

![Prompt Driven Development life cycle](/images/2025-05-23-prompt-driven-development/prompt-driven-development-life-cycle.png)

GenAI can help people learn and upgrade their skills too. This is very useful with reasoning models like [Claude Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) and now [Gemini](https://gemini.google.com/), apparently – but I think that was a ruse to get me to switch. These models can be picked from the dropdown and come packaged with your GitHub Enterprise licence. The model will explain what it is doing and why.
![Cline model selection](/images/2025-05-23-prompt-driven-development/cline-model-selection.png)
I have used a prompt as follows:

> Please help me write the code and explain what you are doing and why to help me as a JavaScript developer understand what you are doing, and point out any differences that you feel I may not understand or that would be different in Python programming.

It's magic when you are trying to port over your skills and learn something new.

I plugged in my instance of GitHub Copilot into [Cline](https://github.com/cline/cline/wiki). Cline is a plugin that lets you look at your whole project, not just the files that you tell it to look at. So in more cases than not, I used Cline. You have a dropdown list where you can choose what model you want to use. In the overall settings, you can add your pre-prompt – the thing you always want to do – your master prompt. There are two files in your project that control this: `.github/copilot-instructions.md` and `.clinerules`

![the cline tab in VS code](/images/2025-05-23-prompt-driven-development/cline-screenshot.png)

I also found that giving Cline full read rights made it easy to concentrate on what changes it made; this was super useful later on when I had to debug or fix issues manually the _old skool_ way.
![auto read feature](/images/2025-05-23-prompt-driven-development/auto-read.png)

It is important to read the commentary as it's reasoning. You will not learn anything new if you don't, and you also want to know what it did and why. Read the code too. Make sure you understand what it does. This comes in useful later when the project is too complicated for an LLM to solve and you have to get down and dirty with the code. There is no point in just accepting everything, as it may just hurt you later. You need to understand what it did.

If you have accepted something and then decide that you don't want to go down this route, you can always revert to a previous state; much like Git, there are checkpoints. I will warn you though that if you don't accept the answer and wish you had, manual intervention may be needed.

![checkpoints](/images/2025-05-23-prompt-driven-development/check-point.png)

On the whole, having an LLM was so useful in getting stuff out the door for this project and doing the boring stuff that I would have procrastinated away as much as I could have done otherwise. So useful for learning new programming languages. It's the friend that you love for their knowledge and patience – that never gets tired of helping you figure stuff out!

Sometimes the LLM got in the way and made me doubt my sanity. For example, Material UI's `<Box>` element could not take on a class name implemented via ThemeProvider; convinced it was an error on my part, after much debugging (and frustration), I found out through Next.js Material UI bug reports that `<Box>` does not accept class names! An LLM won't tell you this; sometimes you have to do it the old-fashioned way.
In short: treat an LLM like a _hooooooman_ – check its work makes sense; ask clarifying questions; understand what it's doing before accepting its suggestions wholesale. If all else fails, make it make sense. That's what we are paid for!

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Wikipedia"
[2]: https://andrewships.substack.com/p/prompt-driven-development "Andrew Ships"
