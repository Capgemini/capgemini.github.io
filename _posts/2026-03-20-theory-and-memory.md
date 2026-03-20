---
layout: post
title: "Theory and Memory: Two Forces Shaping Software Team Knowledge"
description: "How insights from cognitive science and social psychology explain why software knowledge is so hard to preserve"
summary: "How Naur's theory-building and Wegner's transactive memory combine to explain why software knowledge is so hard to preserve — and what it means when AI enters the picture."
author: stuart_williams
team: default
category: Development
tags: [Knowledge management, Team dynamics, AI, Learning, Cognitive science]
---

*How insights from cognitive science and social psychology explain why software knowledge is so hard to preserve*

## Summary

Software teams face a knowledge problem that no amount of documentation seems to solve. When experienced developers leave, something valuable departs with them — something that comprehensive handover documents and well-commented code fail to capture. Two researchers from the 1980s provided frameworks that, when combined, explain this phenomenon with unusual clarity.

Peter Naur argued that programming is fundamentally theory-building[^1]: the real product of software development is the understanding in developers' minds, not the code they produce. Daniel Wegner demonstrated that effective teams develop transactive memory systems[^2] — distributed knowledge structures where members know "who knows what" rather than everyone knowing everything.

These frameworks operate at different levels — individual and team — and their integration reveals that software teams face a dual challenge. They must cultivate deep individual understanding whilst building effective coordination mechanisms. Failure can occur through either path, with distinct symptoms and remedies.

**Key Insights:**
- Code is an artefact of understanding, not understanding itself
- Teams coordinate access to knowledge but cannot substitute for it
- "Program death" and "coordination breakdown" are distinct failure modes
- Conversation is the mechanism that builds both individual theory and team memory
- AI shifts cognitive load from generation to evaluation, making deliberate theory-building essential
- AI can augment team retrieval but cannot participate in the social dynamics of trust and coordination

## 1. The Theory in Developers' Minds

### Explanation

When we look at code, we might assume we're seeing the software itself. But code is more like sheet music than music. Sheet music isn't the music — it's instructions for creating music, reflecting the composer's understanding of harmony, structure, and emotion. Similarly, code reflects a developer's understanding of how to solve a problem. The understanding itself lives in the development team's collective mental model: what the system is supposed to do, what it actually does, why it does it that way, and how all the pieces fit together.

This explains why a team can inherit "perfectly good code" and still struggle to work with it. They've received the sheet music but not the understanding of how to perform it. It explains why developers spend considerable time in meetings drawing diagrams and discussing approaches rather than typing. The challenge isn't writing code; it's building and sharing the mental theory of what the software should do and how it should work.

When developers say they need to "understand the codebase," they're not memorising code — they're reconstructing the original thinking behind it.

### Theoretical Foundation

Peter Naur's 1985 paper "Programming as Theory Building"[^1] established that programming consists of building and maintaining a theory about how computational processes solve real-world problems. Drawing on Gilbert Ryle's philosophical work on knowledge[^2], Naur distinguished between different forms of understanding:

| Form | Description | Example |
|------|-------------|---------|
| **Knowing that** | Factual knowledge | "This function returns a boolean" |
| **Knowing how** | Procedural skill | Being able to write working code |
| **Theory** | Integrated understanding enabling explanation, justification, and appropriate modification | Understanding why the system is structured this way and how it should evolve |

A developer possessing a program's theory can:
1. **Explain** how the solution relates to the real-world problem it addresses
2. **Justify** why each part is designed the way it is
3. **Respond constructively** to modification demands

Crucially, Naur argued this theory "necessarily, and in an essential manner, transcends that which is recorded in the documented products."[^1] The theory cannot be fully captured in code or documentation because it includes tacit understanding — what Michael Polanyi described as knowledge we possess but cannot fully articulate[^3].

### The Concept of Program Death

Naur's most striking claim concerns what happens when theory-holders leave: the program effectively "dies" — even while the code continues executing.

This doesn't mean the software stops working. It means the software can no longer be intelligently modified. New developers can make the code do different things, but without the theory, they work against the system's inherent logic rather than with it. Each modification that fights the original design makes subsequent modifications harder. This is why systems become "legacy" — the theory dies while code survives.

We've all encountered this: a module everyone's afraid to touch, a service that works but nobody truly understands, code that deteriorates with every "fix." These are programs whose theories have died.

## 2. The Directory in Teams' Minds

### Explanation

Consider how couples often divide cognitive labour. One partner remembers birthdays; the other remembers directions. Crucially, both know who knows what. They maintain a mental directory of expertise locations rather than each storing everything.

This pattern scales to teams. Effective groups develop collective memory capabilities exceeding any individual's capacity — not by everyone knowing everything, but by everyone knowing who knows what. "Alice understands the authentication module" doesn't mean we understand authentication. It means we know where to find understanding.

### Theoretical Foundation

Daniel Wegner's research on transactive memory systems (TMS)[^4] identified three components that enable distributed team knowledge:

| Component | Function | Software Team Example |
|-----------|----------|----------------------|
| **Specialisation** | Differentiated expertise distribution | "Alice knows auth, Bob knows payments" |
| **Credibility** | Beliefs about members' knowledge reliability | "Alice is the real expert on auth" |
| **Coordination** | Orchestrated knowledge retrieval | "When auth breaks, we ask Alice" |

The critical mechanism is the directory — members store labels and pointers to expertise rather than all content. This enables teams to function effectively despite no single person holding complete understanding.

Subsequent research validated this framework in software contexts. Faraj and Sproull's study of 69 software development teams[^5] found that expertise coordination strongly predicted performance — "mere presence of expertise is insufficient." The expertise must be locatable and accessible.

### TMS Vulnerability

Transactive memory creates capability but also vulnerability. The directory can become inaccurate. Key experts can depart. Communication breakdowns can prevent retrieval. Unlike individual memory, which degrades gradually, TMS can fail suddenly when critical nodes disappear or connections break.

## 3. Integration: Two Levels, Two Failure Modes

### Explanation

At first glance, these frameworks appear to be in tension. Naur seems pessimistic — theory can't be transferred, programs die. Wegner seems optimistic — teams achieve collective capability through coordination.

The resolution: they operate at different levels of analysis.

| Level | Framework | Core Question |
|-------|-----------|---------------|
| **Individual** | Naur's Theory-Building | What constitutes genuine understanding? |
| **Team** | Wegner's TMS | How do groups coordinate distributed expertise? |

Naur asks whether adequate understanding exists anywhere. Wegner asks how existing understanding is coordinated. Both observations can be true simultaneously: software teams demonstrably develop transactive memory, and software maintenance demonstrably suffers when experts depart.

### The Relationship Between Theory and TMS

TMS coordinates access to theory but cannot substitute for it. The directory contains metadata — labels and locations — not content. Knowing that "Alice understands auth" doesn't give us Alice's understanding. We gain retrieval capability, not possession.

This means TMS presupposes individual expertise to function. There must be something to coordinate. Naur's "theory" represents the individual expertise that TMS coordinates.

### Two Distinct Failure Modes

This integration reveals that software teams can fail through either mechanism:

**Theory Death (Naur's concern):** The experts leave. Even if the TMS structure remains intact — people remember "who knew what" — the expertise itself is gone. New members cannot simply consult someone else because no one holds the theory anymore.

**TMS Degradation (Wegner's concern):** The experts remain but coordination breaks down. Reorganisations, rapid turnover, remote work transitions, or communication breakdown disrupt the directory. Individual expertise exists somewhere, but the collective loses awareness of where.

| Failure Mode | Symptom | Remedy |
|--------------|---------|--------|
| **Theory Death** | "No one really understands this anymore" | Rebuild understanding through deep engagement |
| **TMS Degradation** | "The expertise is here somewhere" | Rebuild visibility and coordination structures |

A project might suffer either failure independently, or both simultaneously. Distinguishing which failure mode is occurring determines the appropriate response.

## 4. Conversation as the Mechanism

### Explanation

A critical insight often remains implicit: conversation is not merely a byproduct of theory-building and TMS — it is the primary mechanism through which both operate.

When developers explain code, they're articulating theory (making tacit understanding explicit) whilst simultaneously updating the team directory ("I know this"). When they ask questions, they're building theory whilst executing retrieval operations. Design discussions build rationale whilst negotiating who will own what knowledge.

| Conversation Type | Theory-Building Function | TMS Function |
|-------------------|-------------------------|--------------|
| Explaining code | Articulating theory, making tacit explicit | Directory update ("I know this") |
| Asking questions | Seeking understanding, building theory | Retrieval operation |
| Design discussions | Developing rationale, deepening theory | Encoding negotiation |
| Code review | Validating understanding, refining theory | Credibility assessment |
| Discussing errors | Learning, correcting mental models | Directory maintenance |

### Why Certain Practices Work

This dual function explains why certain practices show benefits across multiple dimensions simultaneously.

Pair programming operates on both levels: knowledge transfers between partners (building theory) whilst pairs develop mutual awareness of each other's understanding (building TMS). When pairs rotate, both effects spread through the team.

Code review creates opportunities for theory articulation (the author explains their reasoning) and directory updates (reviewers learn who understands what). Design discussions build shared rationale whilst establishing who owns which decisions.

Teams that "just talk" more than others aren't wasting time — they're building the invisible infrastructure that makes everything else work.

## 5. How AI Changes the Picture

### The Theory-Building Question

When AI generates code, we face a question Naur couldn't have anticipated: whose theory is being built?

The traditional workflow of "think deeply, then implement" meant theory-building was almost unavoidable. Writing code forced engagement with the problem. The act of implementation — choosing variable names, structuring functions, handling edge cases — built understanding whether we intended it or not.

AI inverts this relationship. Generation becomes fast; code appears without the developer having worked through the reasoning. The code might be correct, but we don't necessarily understand why it's correct, what alternatives were considered, or how it should change when requirements shift.

This doesn't mean AI-generated code is theory-free. The AI produces code that reflects patterns learned from millions of examples — a kind of statistical crystallisation of collective practice. But that's different from the developer holding a theory about this specific program in this specific context. The code exists; the theory doesn't automatically transfer.

This suggests that theory-building in AI-augmented development requires conscious attention in ways it perhaps didn't before. We can't rely on writing code to build theory, so we must deliberately construct understanding of what was generated. Reviewing AI outputs, questioning decisions, iterating on designs — these activities build theory even when AI generates the initial artefacts.

### The Shift from Generation to Evaluation

Previously, the cognitive work concentrated in generation: thinking through the problem, designing an approach, implementing it carefully. Evaluation mattered but was often less demanding than the work of creation.

AI redistributes this load. Generation becomes fast whilst evaluation becomes the bottleneck. We're now assessing whether solutions reflect good thinking about the problem, forming judgements about work we didn't create, often whilst our mental model is still developing.

This shift has implications for both Naur and Wegner's frameworks:

| Dimension | Traditional Development | AI-Augmented Development |
|-----------|------------------------|--------------------------|
| **Theory-building** | Emerges through implementation | Requires deliberate construction |
| **Cognitive load** | Front-loaded in generation | Shifted to evaluation |
| **Understanding pace** | Builds incrementally as code is written | Must be constructed after generation |
| **Quality signal** | "Does this work?" | "Does this work, and do I understand why?" |

The critical thinking skills — interpretation, analysis, evaluation — operate more continuously when we don't control the pace of generation. We're no longer building understanding step-by-step as we write; we're constructing understanding of something that appeared whole.

### The TMS Asymmetry

Human-AI collaboration introduces a structural asymmetry not present in human teams: AI context is ephemeral.

In human teams, conversation builds TMS and TMS state persists beyond conversations. Team members remember what was discussed, what was decided, who knows what. This persistence creates a continuously updated directory that enables efficient coordination.

In human-AI collaboration, conversation still performs TMS operations in real-time. But the AI's contributions are ephemeral. Session end means the AI "forgets" — TMS degradation from the AI's perspective.

| TMS Dimension | Human-Human Teams | Human-AI Collaboration |
|---------------|-------------------|------------------------|
| **Theory-building** | Both partners build theory over time | Human builds; AI generates without theory |
| **Directory knowledge** | Both persist "who knows what" | Human persists; AI forgets |
| **Encoding agreements** | Both remember allocation | Human remembers; AI must be re-informed |
| **Credibility assessment** | Builds through track record | Must be re-established or externally encoded |

This creates a structural problem: the human partner must either re-establish context at every session (costly, error-prone) or find ways to externalise state so the AI can rejoin the team's transactive memory.

### AI as TMS Participant — Or Tool?

There's a deeper question about AI's role in the team knowledge structure. Is AI a TMS participant — a member of the distributed memory system — or a sophisticated retrieval tool that humans query?

Wegner's TMS involves social dynamics: credibility built through relationship, encoding responsibilities negotiated through conversation, retrieval initiated by recognising one's own knowledge gaps. AI participates asymmetrically in these processes. It can be queried as a knowledge source, but it doesn't build credibility through track record in the way humans do. It doesn't negotiate encoding responsibilities or make social judgement calls about when to defer.

Perhaps the most useful framing: AI can serve as an external extension of team TMS — a queryable knowledge system that augments what humans can locate and retrieve — without being a full participant in the social memory system. This suggests that human TMS remains essential for coordination involving trust, judgement, and contextual fit, even as AI enhances raw retrieval capability.

### Externalisation as Mitigation

Decision logs, session summaries, and context documents take on new importance in this framing. They're not bureaucracy — they're externalised TMS transactions that enable AI to rejoin the team's memory system.

| Externalisation Practice | TMS Function |
|-------------------------|--------------|
| Decision logs | Externalise encoding/allocation and rationale |
| Observation records | Externalise directory updates |
| Session summaries | Compress TMS state for retrieval |
| Context documents | Encode standing TMS knowledge |

Without externalisation, each AI session starts with zero TMS context. The AI cannot know who knows what, what was decided, or what was observed. Externalisation enables continuity despite ephemeral context.

This explains why "just use AI" often disappoints. The AI can generate code, but without the surrounding TMS infrastructure — the context, decisions, and rationale — it generates in a vacuum. The output may be technically correct but contextually inappropriate, because the AI lacks access to the team's accumulated understanding.

## 6. Practical Implications

### For Team Organisation

- **Redundancy plus visibility**: Ensure multiple people understand each critical component (redundant theory) AND that everyone knows who those people are (complete TMS)
- **Stability matters**: Both theory-building and TMS development require time and shared experience
- **Communication structure**: Face-to-face communication uniquely enables TMS emergence; distributed teams face inherent disadvantages requiring deliberate mitigation
- **Team size**: TMS effectiveness may degrade with size; consider whether coordination costs outweigh capability gains

### For Knowledge Management

- **Documentation purpose**: Documentation cannot substitute for theory but can scaffold theory-building — focus on capturing why decisions were made, not just what exists
- **Expertise visibility**: Maintain visible expertise directories; make it easy to know who knows what
- **Onboarding targets**: New members must build individual theory AND integrate into team TMS — this dual target explains extended onboarding timelines (6-9 months for autonomy)

### For AI Integration

- **Theory still required**: AI generates artefacts, but humans must still build theory about those artefacts to maintain and modify systems intelligently. Code you didn't write is code you don't yet understand.
- **Deliberate understanding**: When AI generates substantial portions of a system, theory-building becomes a conscious practice rather than an automatic byproduct of implementation. Budget time for understanding, not just generation.
- **Externalise deliberately**: The ephemeral context problem is real — decisions, rationale, and context must be captured externally to enable AI participation across sessions.
- **Shifted balance**: AI improves retrieval whilst making theory-building more important, not less. The bottleneck moves from "can we build this?" to "do we understand what we've built?"
- **TMS infrastructure matters**: AI without context generates in a vacuum. The value of AI assistance scales with the quality of the surrounding knowledge infrastructure.

### For Legacy Systems

- **Double deficit**: New teams inheriting systems face a dual challenge — they must build individual theory AND establish TMS, but without access to former experts, both processes are impaired
- **"Just read the code" fails**: This approach addresses neither theory-building nor TMS integration

## Conclusion

Naur's pessimism about knowledge transfer and Wegner's optimism about collective memory reflect different aspects of the same phenomenon.

Individual understanding is indeed hard to transfer — Naur was right about this. The theory in developers' minds transcends what documentation can capture. Yet groups demonstrably achieve collective capability through coordination — Wegner was right about this too. Teams develop distributed knowledge structures that exceed any individual's capacity.

Software development requires both: individuals who understand deeply, and teams who coordinate effectively. Optimising for one whilst neglecting the other explains why many interventions fail. Hiring brilliant individuals doesn't help if they can't coordinate. Building elaborate knowledge management systems doesn't help if no one holds the underlying expertise.

AI amplifies both the opportunity and the risk. It accelerates generation whilst making deliberate understanding more necessary. It can augment team retrieval whilst remaining unable to participate in the social dynamics of trust and judgement. It produces artefacts at scale whilst leaving theory-building as fundamentally human work.

Perhaps the core insight is this: AI is powerful not because it replaces human understanding, but because it creates conditions where high-quality human understanding becomes more valuable[^6]. The question isn't whether to use AI — it's whether we're deliberate about building and maintaining the theory and coordination structures that make AI assistance meaningful.

The theory that lives in developers' minds matters. The directory that lives in teams' minds matters. And the conversations that build both aren't overhead — they _are_ the work.

## References

[^1]: Naur, P. (1985). Programming as Theory Building. *Microprocessing and Microprogramming*, 15(5), 253-261.

[^2]: Ryle, G. (1949). *The Concept of Mind*. Hutchinson.

[^3]: Polanyi, M. (1966). *The Tacit Dimension*. University of Chicago Press.

[^4]: Wegner, D. M. (1986). Transactive Memory: A Contemporary Analysis of the Group Mind. In B. Mullen & G. R. Goethals (Eds.), *Theories of Group Behavior* (pp. 185-208). Springer-Verlag.

[^5]: Faraj, S., & Sproull, L. (2000). Coordinating Expertise in Software Development Teams. *Management Science*, 46(12), 1554-1568.

[^6]: Williams, S. (2025). Critical Thinking in the Age of AI. *Capgemini Engineering Blog*. https://capgemini.github.io/engineering/critical-thinking-age-of-ai/

