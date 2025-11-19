---
layout: post
title: "Critical Thinking in the Age of AI"
summary: "How AI shifts critical thinking for software engineers—from generation to evaluation and theory building—covering code, architecture, product, prompting practices, and techniques to embed analysis, assumption checking, and judgment in daily workflows."
description: "How AI redistributes critical thinking for software engineers—from generation to evaluation, theory building, and structured prompting—covering code, architecture, product decisions, team dynamics, and techniques to surface assumptions, compare alternatives, and apply rigorous reasoning standards."
author: stuart_williams
team: default
category: Engineering
tags: [AI, Critical Thinking, Development, Software Engineering, Best Practices]
comments: true
share: true
---

## What Is Critical Thinking?

Critical thinking emerged as a formal area of study from multiple traditions. The most influential modern definition comes from the 1990 Facione Delphi study [^Facione], where expert philosophers and educators reached consensus on what constitutes critical thinking - no small feat in philosophy. This definition has been widely adopted in education and professional development. They arrived at this:

> We understand critical thinking to be purposeful, self-regulatory judgment which results in interpretation, analysis, evaluation, and inference, as well as explanation of the evidential, conceptual, methodological, criteriological, or contextual considerations upon which that judgment is based.

That might sound abstract, but it maps surprisingly well to what we already do in software development. Consider how the skills involved in critical thinking align with common software engineering tasks:

### Core cognitive skills
- **Interpretation** - understanding what code, requirements, or error messages actually mean
- **Analysis** - examining the structure of arguments in RFCs, identifying assumptions in designs
- **Evaluation** - assessing whether evidence supports claims, whether benchmarks are meaningful
- **Inference** - reasoning about consequences, exploring what could go wrong
- **Explanation** - articulating why we made particular decisions
- **Self-regulation** - monitoring our own reasoning, catching our own biases

The Delphi study identified habits of mind that distinguish people who use these skills consistently - inquisitiveness, systematicity, truth-seeking, open-mindedness, and judiciousness. We've all experienced this during code reviews: technical skill isn't enough if someone becomes defensive or stops genuinely engaging with alternative perspectives; we refer to this as our *disposition*.

The work also established standards for good critical thinking: clarity, accuracy, precision, relevance, depth, breadth, logic, and significance. These are not arbitrary criteria - they're the qualities that distinguish robust reasoning from reasoning that merely sounds convincing - and we'll see how important this is as we explore how AI changes what critical thinking means in practice.

## The Changing Nature of Thinking With AI

For decades, software development involved humans reasoning about problems and then expressing those solutions through code; critical thinking should be happening *before* and *during* the act of coding. AI hasn't eliminated that, isn't replacing human judgment, and isn't removing the need for critical thinking. Instead, it's changing *where* and *how* critical thinking is applied.

Consider what happens when we work with an AI assistant on a coding task. The AI can generate plausible code remarkably quickly. This creates a new cognitive demand: we need to evaluate code we didn't write, based on a mental model we may not have fully formed yet. The traditional workflow of "think deeply, then implement" becomes "sketch intent, evaluate output, refine understanding."

Peter Naur's 1985 essay "Programming as Theory Building" [^Naur] argued that programming is fundamentally about developers building and maintaining a theory of how the program relates to the problem domain. The program itself is just an expression of that theory. When AI generates code, we face a question: whose theory is being built? Or rather, *is* a theory being built?

The answer matters because theory - in Naur's sense - is what enables us to modify programs appropriately, explain why things are the way they are, and respond to new requirements sensibly. Without theory, we're left with code we don't fully understand, making changes through trial and error.

This suggests that critical thinking in the AI era requires conscious attention to theory building in ways it perhaps didn't before. When we wrote every line ourselves, theory building was almost unavoidable. When AI writes substantial portions, we need to deliberately construct understanding of what was generated and why it works - we have an increased focus on learning and evaluation.

There's also a shift in what constitutes "good" critical thinking. Previously, questioning our own assumptions and biases was primarily about catching our own, or our colleague's errors. Now it includes questioning whether the AI has understood our intent, whether it's applied patterns appropriately for our context, and whether plausible-sounding explanations actually correspond to what the code does.

The redistribution of cognitive work makes it worth examining how critical thinking applies in each domain where AI is now active.

## Critical Thinking in Software and Product Development

Software development has always demanded critical thinking, even if we didn't always call it that. The field emerged from mathematics and engineering, disciplines where rigorous reasoning is foundational. But software occupies an unusual position: it's both a formal system (governed by logic and mathematics) and a social artefact (built by humans, for humans, within organisations).

This dual nature means critical thinking in software development operates on multiple levels simultaneously.

### At the code level
When we're debugging, we're interpreting symptoms, analysing causes, evaluating hypotheses, and inferring what change will fix the issue. The self-regulation component shows up when we catch ourselves assuming "it must be the database" because the database caused problems last time - and we force ourselves to actually gather evidence.

When reviewing code, we're evaluating whether the implementation matches stated intent, whether edge cases are handled, whether the approach is appropriate for the context. The dispositional elements matter enormously here: is our review genuinely truth-seeking, or are we trying to demonstrate cleverness?

### At the architectural level
Every architectural decision involves inference about future consequences - how will this choice constrain us later? Should this be synchronous or asynchronous? Monolith or microservices? What failure modes does it introduce? The quality of these inferences depends directly on the depth and breadth of our analysis.

Fred Brooks observed in "No Silver Bullet" [^Brooks] that there's an essential complexity in software - complexity that derives from the problem domain itself, not from our tools. Critical thinking helps distinguish *essential* from *accidental* complexity. When we're evaluating a proposed solution, are we assessing whether it addresses the actual problem, or whether it's solving a simpler problem the team finds more tractable?

### At the product level
Product development introduces radical uncertainty. We're making decisions with incomplete information, under time pressure, with imperfect understanding of user needs. Critical thinking here includes meta-reasoning: "how confident should we be in this decision?", "what would change our mind?", "what's the cheapest way to test our assumptions?".

As we're now reasoning about user needs, market dynamics, strategic positioning, the evaluation standards include not just "does this work?" but "does this matter?" and "is this the right thing to build?"

### At the organisational level
Amy Edmondson's research on psychological safety [^Edmondson] reveals something important: critical thinking isn't just an individual cognitive skill. Teams need environments where people can question assumptions, admit uncertainty, and challenge ideas without fear. A technically brilliant team that can't question each other's reasoning will make worse decisions than a less skilled team with strong critical thinking culture.

This matters because software is built by teams, not individuals. Our ability to think critically is bounded by our ability to think *together* critically. Code review, pair programming, design discussions are all *collaborative* critical thinking exercises.

### AI Enters The Fray
Traditional software development assumed humans did the reasoning and computers did the executing. AI blurs this boundary. When an AI suggests an implementation, we're evaluating not just correctness but appropriateness. When it generates tests, we're assessing whether they actually validate what matters.

The critical thinking demand hasn't decreased - if anything, it's intensified. But the focus has shifted from "am I solving this correctly?" to "has this been solved correctly, and does it solve the right thing?"

Having examined how critical thinking operates in software development, we can now examine the practice of prompting an AI.

## Critical Thinking *About* Prompting
Prompting has emerged as a new skill, and like any new skill it's accumulating a body of practices, advice, and received wisdom. Some of this is evidence-based, much of it isn't, and some of the wilder claims are being shared on social media to boost engagement statistics. Critical thinking about prompting means evaluating these practices with the same rigour we'd apply to any technical claim.

### The Problem With Evidence
Prompt engineering is remarkably young. The techniques that work today weren't possible three years ago because the models didn't exist. This creates a methodological challenge: by the time we could rigorously study a technique, the models have often changed. There are releases of models every few months, each with different capabilities and behaviours.

Consider "chain-of-thought" prompting - asking the model to think step-by-step. Wei et al.'s 2022 research [^Wei] showed significant improvements on reasoning tasks, providing solid evidence for the technique. Yet we'll also encounter advice like "always use polite language" or "threaten the model with consequences" - claims that spread through social media without controlled evaluation.

Critical thinking here means asking: what's the actual evidence? A viral tweet isn't evidence. An anecdote isn't evidence. Even a compelling demonstration with one example isn't evidence - it's an existence proof that something *can* work, not that it *does* work reliably.

### Cargo cult prompting
You've likely seen prompts that contain elaborate rituals: specific phrasings, particular structures, magical incantations. Some of these have theoretical grounding. Others persist because someone successful uses them, so they must work - classic cargo cult thinking.

The Anthropic documentation on prompting offers guidance based on their understanding of how their models work. That's different from a random Medium article about "10 ChatGPT tricks experts use to make $100k per week". The former comes from people who built the system. The latter comes from someone who found something that may have only worked once.

Folk wisdom isn't necessarily wrong - practitioners sometimes discover effective techniques before researchers can validate them - though we still need to evaluate the source, understand the claimed mechanism, and test whether it actually improves outcomes for our use case.

### Understanding the mechanism
When someone claims a technique works, ask why it would work. If the explanation is "the AI likes it when we're polite" - that's anthropomorphisation, not mechanism. If the explanation is "providing examples helps the model identify the pattern we want" - that's a testable claim about how pattern matching and few-shot learning operate.

The best prompt engineering advice explains *why* something works in terms of how language models actually function. This lets us reason about when to apply it and when it's irrelevant.

### Few-shot learning, example of examples
Research [^Snell] clearly shows that providing examples (few-shot prompting) improves performance on many tasks. But critical thinking pushes further: how many examples? What makes a good example? Does order matter? Does diversity of examples matter more than quantity?

These are answerable questions, but they require moving beyond "use examples because someone said so" to "use examples because they help the model identify the relevant pattern, and I understand what pattern I'm trying to indicate."

### Evaluating claims of effectiveness
When we read that a technique "dramatically improves" results, critical thinking asks: improves according to what metric? On what tasks? Compared to what baseline? "This prompt is better" is meaningless without specification of better *for what* and better *how*.

You can't apply critical thinking standards like precision and accuracy to vague claims. If someone says "this prompt structure gets better code," we need to know: better by what measure? Fewer bugs? More maintainable? Faster? Closer to requirements?

### Challenges with replication
Software engineering has a replication crisis of its own - Shepperd et al.'s 2014 analysis [^Sheppard] found that many claimed improvements in software practices don't replicate. Prompt engineering faces the same risk, amplified by rapid model changes.

When we find advice about prompting, consider: could we replicate this? Is the claim specific enough to test? Are the conditions clear enough that we'd know if it applies to our situation?

### Summary
Critical thinking about prompting means treating it as an engineering discipline, not a mystical art. It means evaluating techniques based on evidence, understanding mechanisms not just recipes, and being willing to test rather than assume.

This meta-level critical thinking - about the practice itself - sets the foundation for the next question: how do we embed critical thinking *within* our prompts?

## Critical Thinking *In* Prompting
If critical thinking *about* prompting is the meta-level question of which techniques work, critical thinking *in* prompting is the practice-level question: how do we structure prompts to elicit reasoning that meets critical thinking standards?

The distinction matters because AI can produce two very different kinds of output: answers that sound authoritative, and answers that result from careful reasoning. The difference often lies in how we prompt.

### Requesting explicit reasoning
The simplest technique is to ask for it. "Explain your reasoning" or "think step-by-step" prompts the model to make its inference process visible. Explicit reasoning serves multiple purposes: it lets us evaluate the reasoning, it often improves the quality of the final answer, and it helps us identify where the reasoning might be flawed. Many models have a 'thinking mode' that can be activated to perform this kind of reasoning. The benefit extends beyond accuracy to auditability - we can see where the reasoning goes wrong.

### Prompting for analysis
Rather than asking "what should we do?", structure prompts to request analysis first: "What are the key factors in this decision? What are the trade-offs between approaches? What assumptions underlie each option?"

Such structured prompts mirror how we'd approach a problem ourselves - decompose it, examine components, identify relationships. When we prompt for analysis explicitly, we're more likely to get output that's genuinely analytical rather than pattern-matched from training data.

### Requesting evaluation
You can prompt AI to evaluate claims, evidence, or even its own outputs. "What are the weaknesses in this argument?" or "What evidence would contradict this conclusion?" or "What are the failure modes of this approach?"

Evaluation prompts are particularly valuable in code review scenarios. Rather than asking AI to "review this code," we might ask: "What edge cases might this code not handle? What assumptions does this implementation make? What would break if requirements change in these specific ways?"

### Prompting for alternative perspectives
Critical thinking requires considering multiple viewpoints. You can explicitly request this: "What are three different ways to approach this problem?" or "What would a security engineer's concerns be? What would a performance engineer prioritize?"

Requesting multiple perspectives is especially useful when we're working in a domain where we have gaps in expertise. By prompting for different perspectives, we're creating a synthetic version of diverse team input.

### Structured reasoning frameworks
Rather than free-form responses, we can request specific reasoning structures. For instance:

```
Analyse this architectural decision using these criteria:
- Performance implications
- Maintainability concerns  
- Failure modes
- Scaling characteristics
- Team expertise requirements
```

Such frameworks ensure the analysis is comprehensive rather than focusing only on salient features.

### Prompting for assumption identification
One of the most valuable applications: "What assumptions does this solution make?" or "What would need to be true for this approach to work?"

When designing systems, unexamined assumptions are often where things go wrong. By explicitly prompting for assumption identification, we're creating a forcing function for critical examination.

### Self-evaluation prompts
You can ask AI to evaluate its own outputs: "Review my previous response. What questions should I ask to verify this is correct? What could be wrong with this analysis?"

Self-evaluation is particularly useful in iterative problem-solving. After getting an initial response, asking for self-evaluation often surfaces issues or limitations that weren't apparent in the first pass.

### Requesting evidence and sources
When AI makes claims, prompt for the basis: "What evidence supports this recommendation? What research or established practices inform this approach?" 

While this won't always yield perfect citations, it shifts the response from assertion to argumentation - from "do this" to "here's why this makes sense given these principles."

### Comparative analysis
Rather than asking for a single solution, request comparison: "Compare these three approaches across relevant dimensions. What are the strengths and weaknesses of each?"

Comparison forces evaluation rather than mere generation. It's the difference between "give me a solution" and "help me reason about which solution fits my context."

### The limitations
It's important to recognize what this doesn't do. Prompting for critical thinking doesn't guarantee the AI has actually engaged in reasoning - it may be pattern-matching what critical thinking looks like. The output may appear rigorous without being rigorous.

Critical thinking about prompting and critical thinking in prompting need to work together for precisely this reason. You prompt for structured reasoning, then we apply our own critical thinking to evaluate whether that reasoning is sound.

### Practical application
In practice, embedding critical thinking in prompts means moving from:

| Baseline Prompt | Enhanced Critical Thinking Prompt |
|-----------------|-----------------------------------|
| Write a function to parse JSON | Write a function to parse JSON. <br/>What edge cases should it handle? What errors might occur? <br/>How should it fail gracefully? |
| Is this a good architecture?   | Evaluate this architecture against these criteria: [list].<br/> What are the trade-offs? <br/>What assumptions does it make?        |
| Fix this bug                   | Analyse this bug. What's the root cause? <br/>What are three possible fixes? <br/>What are the implications of each?                |

The prompts become longer, more structured, and more explicit about the reasoning process we're requesting. But the output becomes more valuable because it's not just an answer - it's reasoning we can examine, question, and build upon.

## What Remains Human

We started by defining critical thinking: purposeful, self-regulatory judgment involving interpretation, analysis, evaluation, and inference. We've examined how AI redistributes this cognitive work across software development and prompting practices. Now we can ask: what does this mean for human cognition when AI is present?

### Theory-building
Naur argued that a programmer's value lies not in the code they produce but in the theory they hold - their understanding of how the program relates to the problem domain. Theory enables appropriate modification, explains design choices, and guides responses to new requirements.

When AI generates code, this theory doesn't automatically transfer. The code might work, but we don't necessarily understand why it works, what alternatives were considered, or how it should change when requirements shift. Theory building becomes a more conscious, deliberate practice - we can't rely on writing code to build theory, so we actively construct understanding of what was generated through critical evaluation.

### Curation
Previously, the hard work was generating solutions - thinking through the problem, designing an approach, implementing it carefully. Evaluation was important but often easier than generation, so the cognitive load was front-loaded.

AI inverts this relationship: generation becomes fast while evaluation becomes the bottleneck, requiring us to judge not just correctness but appropriateness, maintainability, and contextual fit. we're assessing whether the generated solution reflects good thinking about the problem, forming judgments about work we didn't create, often rapidly and while our mental model is still forming. The critical thinking skills - interpretation, analysis, evaluation - operate more continuously than when we controlled the pace of generation.

### Human Judgement
AI analyses patterns across millions of codebases and suggests implementations based on statistical regularities. But it doesn't hold theory or understand our specific context - the organisational constraints, planned system evolution, or tacit team knowledge about what matters.

Human critical thinking remains essential precisely here: evaluating contextual fit, judging trade-offs against specific constraints, and determining whether solutions address actual problems rather than surface manifestations. The dispositional elements from the Delphi study - inquisitiveness, systematicity, judiciousness, truth-seeking - become more important as plausible-sounding AI suggestions demand the disposition to question, probe for weaknesses, and consider alternatives.

### Collaboration
Psychological safety research found that critical thinking isn't purely individual cognition - it's collective. Teams need environments where members can question each other's reasoning, including decisions about accepting AI-generated solutions. The quality of team reasoning may depend on whether people feel comfortable admitting "I don't fully understand this AI-generated code" rather than feigning comprehension they lack.

### What's automated, what isn't
AI automates pattern matching and statistical synthesis at scale - recognising "this looks like that" and generating outputs following familiar patterns, known from its training data. What it doesn't automate is judgment about pattern appropriateness. It lacks goals, constraints, or understanding of consequences beyond immediate output. It doesn't hold theory or care whether solutions fit our context.

These require human critical thinking: interpreting complex, ambiguous situations; evaluating against implicit or contextual criteria; and self-regulation - catching biases, questioning assumptions, recognising when we're accepting something because it _sounds_ good rather than because it _is_ good.

### The Development of Expertise
If expertise develops through practice, (the prevailing theory), and AI now handles much of what used to be practice, how will people develop expertise? This question echoes concerns that emerged with calculators and IDEs - tools that automated cognitive work. The answer has generally been that people learn different things at different levels of abstraction. Yet it reinforces that critical thinking becomes more important as AI handles routine implementation, leaving humans to excel at the non-routine: judgment calls, context-dependent decisions, and recognising when standard patterns don't apply.

## Conclusion
Working with AI doesn't reduce the need for critical thinking, it redistributes where that thinking is needed and demands it with greater intensity and discipline. Less in generation, more in evaluation; less in implementation, more in judgment about appropriateness; less in writing code, more in building and maintaining theory about systems.

The standards remain constant: clarity, accuracy, precision, relevance, depth, breadth, logic, significance. The dispositional elements remain essential: inquisitiveness, systematicity, judiciousness, truth-seeking, open-mindedness. What changes is the context - we're thinking critically not just about problems and solutions, but about AI outputs, prompting practices, and whether understanding is being built or merely code generated.

Perhaps the core insight is this: **AI is powerful not because it replaces human thinking, but because it creates conditions where high-quality human thinking becomes more valuable**. The question isn't whether to think critically - it's whether we're deliberate about doing so in this new context.


[^Facione]: [Facione, P. A. (1990). Critical Thinking: A Statement of Expert Consensus for Purposes of Educational Assessment and Instruction. The Delphi Report.](https://eric.ed.gov/?id=ED315423)
[^Naur]: [Naur, P. (1985). Programming as Theory Building. Microprocessing and Microcomputers, 14(11), 365-371.](https://gwern.net/doc/cs/algorithm/1985-naur.pdf)
[^Brooks]: [Brooks, F. P. (1987). No Silver Bullet: Essence and Accidents of Software Engineering. Computer, 20(4), 10-19.](https://ieeexplore.ieee.org/document/1663532)
[^Edmondson]: [Edmondson, A. C. (1999). Psychological Safety and Learning Behavior in Work Teams. Administrative Science Quarterly, 44(2), 350-383.](https://www.hbs.edu/faculty/Pages/item.aspx?num=2959)
[^Wei]: [Wei, J., Wang, X., Schuurmans, D., Bosma, M., Xia, F., Chi, E., ... & Zhou, D. (2022). Chain of Thought Prompting Elicits Reasoning in Large Language Models. ](https://arxiv.org/abs/2201.11903)
[^Snell]: [Snell, J., Swersky, K., & Zemel, R. (2017). Prototypical Networks for Few-shot Learning.](https://arxiv.org/abs/1703.05175)
[^Sheppard]: [Shepperd, M., Kitchenham, B., Budgen, D., Brereton, P., & Mair, C. (2014). A systematic review of evidence for software engineering practice. Information and Software Technology, 56(11), 1230-1246.](https://www.semanticscholar.org/paper/Evidence-Based-Software-Engineering-and-Systematic-Kitchenham-Budgen/266aa9741c6559af0c6dcee2e1947ced0385b4bd)

