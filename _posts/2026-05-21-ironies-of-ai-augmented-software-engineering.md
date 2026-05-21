---
layout: post
title: "The Ironies We Don't See: Why Better AI Demands More Investment in Humans"
description: "A look at Lisanne Bainbridge’s “ironies of automation” through the lens of AI-augmented software engineering, arguing that better AI doesn’t reduce human involvement—it raises the bar for it. The post reframes Human-in-the-Loop as a deliberate investment in understanding, validation, and intervention capability."
summary: "AI-augmented software engineering introduces automation paradoxes that can erode human understanding and skill, making deliberate Human-in-the-Loop investment essential as AI capabilities improve."
author: sahitya_pai
team: default
category: Engineering
tags: [AI, Human-in-the-loop, Automation, Human factors, Critical Thinking, Learning, Team dynamics]
---

When we talk about integrating AI agents into software engineering, our minds go straight to the wins: faster development, smaller teams, quicker time to market, increased revenue. The pitch is compelling. Who wouldn't want to ship faster and spend less? But in our rush towards these gains, we're missing something fundamental. We're optimising for immediate productivity whilst overlooking a deeper problem.

Let me take you back to 1983. A psychologist named Lisanne Bainbridge published a paper on the ironies of automation.[^1] Working in human factors research, she studied how humans interact with automated systems. It wasn't about AI; the technology didn't exist yet. It was about industrial automation, the kind with buttons and dials and control systems. Yet forty years later, her observations cut straight to the heart of what we're building today.

Here's what she noticed: automation is meant to replace human control with automatic devices. But even highly automated systems still need humans to supervise, maintain, improve, and handle the unexpected. Which leads to a paradoxical conclusion that automated systems are still human-machine systems. Both the technical factors and the human factors matter.

What's remarkable is how her paper has endured. It has been cited across cognitive engineering, aviation safety, healthcare, and now AI. The problems she identified aren't historical curiosities, they're intensifying.

I've been working through these ironies in the context of AI-augmented development, and what I've found is unsettling. They give us a lens beyond surface-level metrics like speed, revenue and team size. To view this as a system design problem. To realise the depth of investment needed in the human side of the equation, far beyond quick wins and quarterly targets.

But more importantly, these ironies point us toward something fundamental: keeping humans in the loop.

## Keeping Humans in the Loop

Here's what we often miss about automation: the human is the most essential piece in this human-machine puzzle. Not a failsafe, nor a rubber stamp on AI output. The human is indispensable to making automated systems work reliably over time.

Human-in-the-Loop (HITL) means sustained human participation where humans actively govern decisions whilst preserving the capability to intervene effectively when automation fails. It's not about approving what AI suggests. It's about staying meaningfully engaged throughout the work, maintaining both understanding and the skills needed to step in when AI encounters something it cannot handle.

Think about what this means in practice. When AI generates code, you don't just review it and click accept. You understand why this approach works, how it connects to the broader system and what could go wrong. When AI makes architectural suggestions, you don't pick from a menu of options. You lead the design thinking, use AI to assist synthesis, but maintain the theory of how the system works.

This is hard. It's more expensive than letting AI do everything and hoping for the best. It requires continuous investment in human capability even as automation improves. But it's non-negotiable if you want systems that remain maintainable, evolvable, and resilient when the unexpected occurs.

And here's the counterintuitive part that Bainbridge's research reveals: the better AI becomes, the more intensive this human engagement must be, not less. Because as AI handles more of the routine work successfully, the threats to human understanding and intervention capability intensify.

Let me show you why through the six ironies she identified. Each one describes a specific way that automation threatens to degrade human capability and shows why Human-in-the-Loop isn't optional.

## The Designer's Irony: Humans Get the Problems Automation Can't Solve

Designers view humans as unreliable, yet they leave humans to handle exactly the tasks that cannot be automated.

As we progress from human-led to AI-led ways of working, the human role changes. We move towards outcome validation, defining boundaries for AI to operate within, governing how it works within those parameters. The AI handles the well-trodden paths, the patterns it's been trained on, the scenarios it recognises. And what's left for us? The edge cases, the exceptions, the truly hard parts.

This isn't a reduction in the skill required. It's an increase. You need more solid software engineering foundation and expertise to create the process for AI to follow, to iterate incrementally towards the intended outcome. The easy problems are gone, and you're left with a concentrated dose of difficulty.

And here's what we often miss: when you only engage with the hard problems, you lose touch with the fundamentals. You become like a surgeon who only handles the most complex procedures but hasn't stitched a basic wound in years. Theory and practice drift apart. Understanding degrades when it's no longer grounded in the full spectrum of work.

To maintain understanding in this environment, we need what researchers call "processing for meaning."[^1] It's not enough to review AI's output and nod along. You must actively engage with the reasoning and ask yourself what problem this solves, why this approach, what the tradeoffs are. Articulate the mental model, not just accept the artefact.

This requires deliberate effort. When AI generates code, capture the theory behind it: why this works, how it connects to the broader system.[^2] That theory becomes your anchor. Without it, you're reviewing work you don't truly understand, and the gap between you and the system you're building widens with every AI-generated solution you accept.

Maintaining that understanding through active engagement is what Human-in-the-Loop looks like here. Not just reviewing outputs, but building and preserving the mental model of how your system works. It's the difference between having AI work for you versus working alongside AI whilst maintaining your capability to understand and modify what's being built.

## Skills Atrophy Through Disuse: The Expertise You Lose

A formerly experienced operator who has been monitoring an automated process may become inexperienced, simply through lack of practice.

Bainbridge's research showed that efficient retrieval from long-term memory depends on frequency of use.[^1] Theoretical knowledge without regular practice doesn't sustain operational capability. You learn by doing, and when you stop doing, you stop retaining.

When AI handles most of the implementation, your engagement shifts from active creation to passive monitoring. You're reading code, not writing it, accepting or rejecting suggestions rather than generating solutions from first principles.

Research on learning shows there's a difference between declarative knowledge (knowing what) and procedural fluency (knowing how). You might retain the conceptual knowledge, the design patterns and algorithmic approaches. But your execution capability degrades. You can critique, but can you create?

Here's the uncomfortable question: if AI is correct 95% of the time, how do you maintain the fluency to catch the 5% when it's wrong? More troubling still, how do you maintain the capability to step in when AI fails entirely?

One proposed approach is what practitioners call "learning opportunities".[^3] These are structured exercises designed to maintain execution fluency. Short deliberate practice sessions after significant work like active generation, retrieval practice, prediction then reflection, to counter the passive acceptance AI encourages and maintain the muscle memory of creation.

But here's the honest assessment: this is a hypothesis, not a proven solution. The evidence base comes from declarative learning (knowledge retention[^4]), not from maintaining procedural capability when automation does primary execution. The procedural side remains uncertain territory.

Not just understanding, but preserving execution capability is what Human-in-the-Loop must do here. Intervention capability means you can actually do the work when needed, not just comprehend it. Understanding degrades without practice. Skills atrophy through disuse. HITL is the discipline of maintaining both.

## The Monitoring Paradox: Why It Feels Impossible

It is humanly impossible to carry out the basic function of monitoring for unlikely abnormalities.

The obvious solution to AI making mistakes seems to be having humans validate the outputs. But consider the mathematics that if AI is correct 99% of the time, you're hunting for the 1% failures. Research on vigilance shows humans cannot maintain effective attention when monitoring for rare events in a stream that's overwhelmingly correct.[^5]

Bainbridge captured the paradox perfectly: "The automatic control system has been put in because it can do the job better than the operator, but yet the operator is being asked to monitor that it is working effectively." If AI makes decisions better than you can, how exactly do you check it's doing so correctly? The best you can do is meta-level monitoring, deciding if outcomes are "acceptable." But if we're using AI precisely because human judgement was inadequate, which outcomes should we accept?

AI hallucination makes this harder still. We have all observed AI producing false but plausible-sounding output. The code looks right, the logic seems sound, until you dig deeper and find the subtle bug, the missing edge case, the integration mismatch that will fail in production.

Passive review doesn't work. Reading AI-generated code and thinking "makes sense" is not validation. Research on code review shows that perspective-based reading (actively examining code from different viewpoints like a user, a tester, a future maintainer) detects 35-80% more faults than ad hoc review.[^6]

The question you must ask is not "Does this make sense?" but "Where could this fail?" You must adopt an adversarial stance, assuming AI made mistakes and actively searching for them. Ask what edge cases it might miss, what happens when input is malformed, how it integrates with the broader system, what security vulnerabilities might lurk.

This is exhausting. It requires sustained critical thinking, not passive acceptance. And here's the challenge: maintaining that adversarial vigilance when AI is correct 99% of the time is cognitively draining and, frankly, feels foolish. You're searching for needles in haystacks, and most haystacks don't contain needles.

Yet the moment you relax that vigilance is precisely when the rare failure will slip through.

This is why Human-in-the-Loop requires active validation, not passive monitoring. You cannot maintain HITL by reading AI output and hoping to notice problems. You must actively search for faults using structured methods: perspective-based reading, adversarial review, explicit fault models, test-driven validation. HITL here means assuming AI made mistakes and proving it didn't, not assuming AI is correct and hoping you'll notice if it isn't.

## The Competence Irony: When You Can't Validate What You Don't Understand

We use AI because it's better than humans at certain tasks, yet we expect humans to monitor and validate AI's work.

If you could independently verify that AI's solution is correct, why would you need the AI in the first place? We use AI precisely because it can do things we cannot, and do them better, faster, more thoroughly. Consider that AI generates an optimal algorithm you don't fully understand. It applies a design pattern you've never encountered, solves a problem using a mathematical approach beyond your training. How do you validate this?

The naive response is "learn everything AI might use." But AI's knowledge base increasingly exceeds any individual's learning capacity, and it expands faster than humans can learn. If you must be an expert in area X to validate AI's work in X, what value does AI add?

So we're left with a genuine puzzle: how do less-competent humans effectively govern more-competent AI?

The answer isn't to match AI's technical competence. It's to recognise that humans and AI have different competencies, and validation should leverage human strengths, not compete on AI's terms.[^7] You can validate reasoning coherence, context fit, problem understanding, and whether AI acknowledged the right tradeoffs, even when you can't verify the technical implementation directly.

But we must be honest: when AI is genuinely more competent, perfect validation may be impossible. Multiple validation methods reduce risk but don't eliminate it. Gaps remain.

Which leads to the uncomfortable conclusion that sometimes the right answer is "don't use the AI, even though it's capable." If the competence gap is too wide and the consequences of undetected errors are severe enough, automation should be bounded by validation capability, not by what's technically possible. That requires saying no to productivity gains and having uncomfortable conversations about what we truly understand versus what we're willing to trust.

Knowing where that boundary lies, and having the discipline not to cross it, is what Human-in-the-Loop demands here.

## The Training Irony: Learning by Assistance Doesn't Teach Independence

Operators are trained to follow instructions and work with automation, then expected to provide intelligence and independent judgement when automation fails.

Here's what makes this different from skill degradation: skill degradation is about experienced developers losing capability through AI use. The training irony is about new developers never acquiring capability in the first place. By the time you notice the problem, you have a generation of developers who never learned to work independently.

They learn how to prompt AI effectively, review AI-generated code, refine AI output. These are genuine skills, but they're skills for working with AI. What they don't acquire is how to think without it. Educational psychology has a name for this: scaffolding without fading.[^8] Scaffolding is temporary support meant to reduce over time as capability develops. But AI assistance doesn't fade, it's constant. And when the novel problem arrives, you need the principles that only come from working through difficulty yourself.[^9]

What I've come to believe, living through this transformation, is that restricting AI tools isn't the answer. Fundamentally rethinking what on-the-job learning looks like is.

The volume tasks that built foundational skills in junior developers are now handled by agents. CRUD endpoints, integrations, boilerplate to name a few examples. Not glamorous work, but it built instinct through repetition. That pathway no longer exists in the same form. What I think we get wrong is assuming this means junior developers are lost. I think it means senior developers need to show up differently. There are different ways to do this, and pair-orchestrating is one.

The building experience shifts from hands-on coding to mentorship. Learning happens by working alongside a senior: evaluating agent outputs together, developing judgement about what good looks like, learning design principles by examining finished implementations rather than arriving at them through trial and error.

Pair-working becomes the new standard for on-the-job training, not pair programming in the traditional sense, but pair-orchestrating. Senior and junior, side by side, directing agents, probing outputs critically, deciding when to override and why. Reviewing agent output is the new entry point for juniors. It builds pattern recognition, the critical eye, the understanding of tradeoffs. Through orchestration rather than implementation, juniors engage with a wider technical breadth than they ever would have in the old model.

The deeper shift is from task-based learning to mentorship-driven learning. The task no longer teaches by its own friction, and the mentor must carry more of that weight. The investment is in the quality and intensity of human mentorship that surrounds their use. The human in the loop, for a junior developer, is quite literally the senior standing beside them.

Whether through pair-orchestrating, structured time working without AI, deliberate learning sprints, or other approaches, the principle is the same: the learning must be intentional. It won't happen by itself.

## The Success Irony: When Excellence Creates Catastrophe

Now we arrive at the meta-irony, the one that governs all the others: the most successful automated systems, with the rarest need for manual intervention, are the ones most likely to generate problems when manual intervention is required.

Better AI makes the problem worse, not better.

Here's why. As AI becomes more capable and reliable, developers intervene less frequently. When AI succeeds 90% of the time, developers handle the other 10%, regular practice that maintains capability. When AI succeeds 99% of the time, developers intervene only 1% of the time. When AI succeeds 99.9% of the time, the skills required atrophy through sheer lack of use.

And here's the cruel mathematics: that 0.1% where AI fails isn't a random sample. It's the hardest 0.1%, the problems AI cannot solve. Developers are expected to tackle the most difficult problems with 99.9% less practice than they'd had when they handled everything.

Every irony we've discussed intensifies. 

* Designer irony: the difficulty of what remains becomes more concentrated.
* Skill degradation: less intervention means faster atrophy. 
* Monitoring paradox: rarely-failing AI breeds complacency.
* Competence gap: more capable AI widens the validation gap.
* Training effects: new developers never practice independently at all.

We optimise AI for success rate. We celebrate each percentage point, from 95% to 96%, 99% to 99.9%. Each improvement is a productivity win. Each improvement also means less practice, less engagement, less capability maintenance for the humans who must intervene when AI fails.

Research from safety-critical systems shows what happens in highly automated environments.[^10] Success breeds complacency. Long periods without failure make safety procedures feel like bureaucratic overhead. "We haven't had a problem in years" becomes the predecessor to catastrophic failure.

The skills required for intervention decay faster than automation reliability improves. Doubling reliability halves practice opportunities, but skills atrophy with disuse. Critical capabilities may disappear entirely before automation reaches anything close to perfect reliability.

And perfect reliability is impossible. Novel situations always arise, systems must evolve, and someone must maintain the ability to modify the system intelligently when the unexpected occurs.

So what do we do? The obvious responses all fail on inspection. Make AI more reliable? That makes the problem worse. 99.9% reliability means even less intervention, even less practice. Humans will specialise in what AI can't do? That's designer irony again, and it collides with the training problem: how do you learn to solve problems you never practise? AI will eventually do everything? Novel situations constantly arise, systems must evolve, and someone must govern AI's decisions.

The solution cannot be better automation. Better automation is the source of the problem.

What high-reliability organisations have learned, in aviation, nuclear power and healthcare, is that maintaining capability in highly automated environments requires deliberate, intensive, continuous investment that scales with automation capability.[^11]

The counterintuitive principle is that better AI demands more investment in human capability, not less. HITL intensity must scale inversely with AI success rate. To illustrate, when AI succeeds 90% of the time, some HITL may suffice. At 99%, you need more: regular practice sessions, capability assessments, deliberate intervention exercises. At 99.9%, you need extreme HITL or you should not deploy that level of automation at all.

Better AI doesn't reduce the need for Human-in-the-Loop. It intensifies it.

As AI success rate increases, mitigation must intensify: reviewing cases where AI was uncertain; analysing near-misses, not just actual failures; periodic "degraded mode" operation where you work without AI; deliberate practice of rare scenarios;[^12] and assessing team intervention capability, not just productivity.

The scaling is counterintuitive but necessary. As a rough illustration: at 90% AI success rate, monthly deliberate practice sessions and capability drills might suffice; at 99%, weekly; at 99.9%, daily. Or you make a different choice entirely: constrain AI below its technical maximum to maintain practice frequency. Use 99%-capable AI at 90% capacity to preserve human capability, rather than pushing AI utilisation to 99% and watching human capability collapse.

The hard truth: when rare failure occurs, the team with maintained capability handles it. The team with degraded capability fails catastrophically.

## What This Means for How We Build

The ironies of automation are structural problems that intensify as our tools become more capable. Every improvement in AI capability makes the human capability problem harder, not easier.

The ironies teach us that better AI demands more investment in humans, not less. It's the fundamental design principle for building resilient AI-augmented systems. When AI succeeds 99% of the time, that remaining 1% will be the hardest problems you face, and your team's capability to handle that 1% determines whether you have a resilient, evolvable system or a brittle dependency waiting to catastrophically fail.

In practice, this means active engagement that builds and preserves theory, deliberate practice to maintain execution fluency, adversarial validation that assumes AI made mistakes, explicit learning pathways that build independent capability, and scaled intensity that increases as AI capability improves. The thread running through all of it is keeping humans in the loop.

This is expensive. It requires continuous investment in human capability even as automation improves. I suspect most organisations won't do this. The business pressure to ship faster, reduce team sizes, and capture productivity gains is powerful, and those forces draw most of the attention. And that's a choice organisations can make with eyes open.

But let's be clear about what that choice means. We're trading long-term resilience for short-term speed. We're building systems our teams increasingly cannot understand, cannot validate independently, cannot modify intelligently. We're creating dependency masked by productivity.

The choice is ours, but we must make it consciously, understanding the full weight of what we're choosing. We can optimise for speed and accept the fragility, or we can invest in humans and build systems where we maintain understanding, preserve intervention capability, and remain able to govern and modify what we're building. We cannot pretend the ironies don't exist. Better automation does not solve the human problem. Productivity and capability are not the same thing, and the gap between them is where our future success or failure will be determined.

The human isn't the weakness in the system. The human is what makes the system resilient.

---

## Acknowledgements

A huge thanks to my mentor, [Stuart Williams](/authors#author-stuart-williams), whose software engineering expertise helped bring this post to life.

## References

[^1]: Bainbridge, L. (1983). Ironies of automation. *Automatica*, 19(6), 775-779.

[^2]: Naur, P. (1985). Programming as theory building. *Microprocessing and Microprogramming*, 15(5), 253-261. Naur argues that programming fundamentally involves building and maintaining a theory of how the program relates to the problem domain it addresses.

[^3]: The Learning Opportunities Framework is a practitioner resource developed by Dr. Cat Hicks for maintaining developer skills in AI-assisted contexts: https://github.com/DrCatHicks/learning-opportunities. For the underlying research on AI as a skill threat, see: Hicks, C. M., Lee, C. S., & Ramsey, M. (2024). Developer thriving: Four sociocognitive factors that create resilient productivity on software teams. *IEEE Software*, 41(4), 68-77.

[^4]: Roediger III, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science*, 17(3), 249-255. See also: Bjork, R. A., Dunlosky, J., & Kornell, N. (2013). Self-regulated learning: Beliefs, techniques, and illusions. *Annual Review of Psychology*, 64, 417-444.

[^5]: Mackworth, N. H. (1948). The breakdown of vigilance during prolonged visual search. *Quarterly Journal of Experimental Psychology*, 1(1), 6-21. This foundational study established that human attention degrades significantly when monitoring for rare signals over extended periods — a finding extensively replicated across industrial, aviation, and clinical contexts.

[^6]: Basili, V. R., & Selby, R. W. (1987). Comparing the effectiveness of software testing strategies. *IEEE Transactions on Software Engineering*, SE-13(12), 1278-1296. See also: Shull, F., Rus, I., & Basili, V. (2000). How perspective-based reading can improve requirements inspections. *Computer*, 33(7), 73-79.

[^7]: Hollnagel, E., & Woods, D. D. (2005). *Joint Cognitive Systems: Foundations of Cognitive Systems Engineering*. CRC Press. This work on cognitive systems engineering emphasises the importance of understanding the different but complementary capabilities of humans and machines in joint systems.

[^8]: Wood, D., Bruner, J. S., & Ross, G. (1976). The role of tutoring in problem solving. *Journal of Child Psychology and Psychiatry*, 17(2), 89-100. The foundational work on scaffolding as a learning support mechanism.

[^9]: Bransford, J. D., Brown, A. L., & Cocking, R. R. (Eds.). (2000). *How People Learn: Brain, Mind, Experience, and School*. National Academy Press. This comprehensive review of learning science emphasises the importance of deep understanding for transfer to novel situations.

[^10]: Weick, K. E., & Sutcliffe, K. M. (2007). *Managing the Unexpected: Resilient Performance in an Age of Uncertainty* (2nd ed.). Jossey-Bass. See also: Perrow, C. (1984). *Normal Accidents: Living with High-Risk Technologies*. Basic Books.

[^11]: Weick, K. E., & Sutcliffe, K. M. (2007). *Managing the Unexpected: Resilient Performance in an Age of Uncertainty* (2nd ed.). Jossey-Bass. The authors identify five principles that characterise high reliability organisations: preoccupation with failure, reluctance to simplify, sensitivity to operations, commitment to resilience, and deference to expertise.

[^12]: Ericsson, K. A. (2006). The influence of experience and deliberate practice on the development of superior expert performance. In K. A. Ericsson et al. (Eds.), *The Cambridge Handbook of Expertise and Expert Performance* (pp. 683-703). Cambridge University Press.
