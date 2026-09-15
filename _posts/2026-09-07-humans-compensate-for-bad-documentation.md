---
layout: post
title: "The Documentation You Have Is Not The Documentation Your AI Needs"
description: "Stale documentation was tolerable for humans. AI reads it just as confidently, and gets it just as wrong."
summary: "Legacy systems like SharePoint and Documentum are full of outdated documentation describing how systems used to work. Humans compensated by checking dates and asking colleagues; AI does not, and treats stale information with the same confidence as accurate information. Drawing on Gartner, Deloitte, and Forbes Technology Council research, the piece argues documentation has to be fixed before AI sits on top of it, since MCP and similar access layers only amplify whatever quality already exists rather than fixing it."
author: eirik_sander-fjeld
team: default
category: Engineering
tags: [AI, Documentation, Enterprise Software, MCP, Legacy Systems, Platform Engineering]
---

Every enterprise I've worked with has the same graveyard: a SharePoint site, a Documentum vault, or just a shared drive nobody's renamed since 2014, full of PDFs and Word files describing how a system used to work rather than how it works today. Nobody updated the architecture diagram when the system migrated. The runbook still points to a server that got decommissioned. And the process document everyone calls "current" predates the last three reorganizations.

The expectation is usually there, too. Most organizations assign documentation upkeep to the team that built the solution, and in my experience that's mostly followed: there's usually some documentation. What fails is what happens to it once that team moves on, gets reassigned, or the system changes hands.

This was tolerable when the only reader was a human, someone who could check the date, ask a colleague, or trust their own experience over the page. It stops being tolerable once an AI agent is the one reading it.

## A Content Problem, Not Just an Engineering One

An AI does none of that. It reads a stale PDF with the same confidence it would read something current, and it answers just as fast either way. Gartner projects[^1] that by 2030, more than 60% of early agentic orchestration implementations will fail to meet performance or cost expectations, because enterprises underestimate the integration, governance and talent requirements involved. Deloitte's survey work[^2] points the same way: integrating with legacy systems, alongside risk and compliance concerns, is among the barriers to agentic AI adoption cited by nearly six in ten AI leaders. Neither finding is about documentation directly. But both describe organizations that can't reliably tell an agent what is true about their own systems, which is a content problem as much as an engineering one.

## The Knowledge Gap

Writing in Forbes, Mohit Gupta of the modernization firm Damco Solutions[^3] put it more bluntly: the real barrier to legacy modernization is that most organizations can no longer fully account for what they're modernizing. He sells modernization services, so weigh it accordingly, but it matches what I see. Decades of business logic sit in code and documents written by people who no longer work there.

_Humans compensate for bad documentation. AI exposes it._

So if an organization wants AI to be useful for real operational questions rather than impressive in a demo, fixing documentation has to come first, not as a side project and not as something handed to the AI itself. That means self-contained sections instead of documents that assume prior context, consistent structure across systems, and someone accountable for keeping it current. It's unglamorous work, and it's hard to fund precisely because it doesn't look like "doing AI."

## Can AI Just Generate the Documentation Instead?

The obvious objection is that AI can do this part too: generate the documentation by reverse-engineering it from the code, rather than asking people to write it. AWS Transform[^4] generates technical documentation as part of mainframe modernization, and GitHub's modernization walkthrough for Copilot[^5] starts by having the model explain and document legacy code before anything gets rewritten. Both keep a human in the loop, and neither is wrong. They're just incomplete. It's worth being specific about what's recoverable. Documentation, at its most complete, answers three questions: _what_ the system does, _why_ it does it that way, and _why_ any of that still matters to the business. Reverse engineering is genuinely good at the first, even if pulling clean logic out of decades of COBOL is never as tidy as the demos suggest. The second is harder. A comment or variable name might hint at intent, but the reasoning behind a design decision rarely survives in the code. The third is usually gone entirely. Why a workaround exists, why a rule was written the way it was, why a process still runs after its justification disappeared: that context lived in people, not the codebase. Once they've left, there's nothing to recover it from.

## MCP Changes the Economics of Documentation

The Model Context Protocol (MCP) changes the economics of all this. Stale documentation could sit untouched for years because barely anyone read it, and a page nobody opens costs nothing to leave wrong. Expose that same page through an MCP server and an agent can query it live, at request time, hundreds of times a day, permissioned exactly as the querying user already is. Atlassian's Rovo MCP server[^6] works this way: the agent sees only what that user could already see in Confluence or Jira. The documentation doesn't get better by being queried more often. It just gets read, constantly, by something that can't tell it's wrong.

## Documentation as Runtime Infrastructure

Organizations have spent decades treating documentation as a byproduct of software delivery. In an AI-first environment, it becomes part of the runtime itself, shaping the answers an agent gives and the actions it takes on someone's behalf. Documentation used to be written for humans who could tell when to distrust it. Now it's operational infrastructure, and operational infrastructure can't be left to rot. Fix it first. The rest of the AI stack is hard too, but it's the part that already has budget, attention, and no shortage of volunteers.


[^1]: Gartner. (2026, January). *How to Enable Agentic AI via API-Based Integration*. Cited via [StackOne: Gartner Says 60% of AI Agent Deployments Will Fail — The Reason Is Integration](https://www.stackone.com/blog/gartner-on-ai-agent-integration/)

[^2]: Deloitte. (2026). *Tech Trends 2026*. [deloitte.com/us/en/insights/topics/technology-management/tech-trends](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends.html)

[^3]: Gupta, M. (2026, July 17). How AI Is Solving the Most Persistent Problem of Legacy Application Modernization: The Knowledge Gap. *Forbes Technology Council*. [forbes.com/councils/forbestechcouncil](https://www.forbes.com/councils/forbestechcouncil/2026/07/17/how-ai-is-solving-the-most-persistent-problem-of-legacy-application-modernization-the-knowledge-gap/)

[^4]: AWS. Reimagine Your Mainframe Applications With Agentic AI and AWS Transform. *AWS Migration and Modernization Blog*. [aws.amazon.com/blogs/migration-and-modernization](https://aws.amazon.com/blogs/migration-and-modernization/reimagine-your-mainframe-applications-with-agentic-ai-and-aws-transform/)

[^5]: GitHub. Modernize Legacy Code. *GitHub Copilot Docs*. [docs.github.com/en/copilot/tutorials/modernize-legacy-code](https://docs.github.com/en/copilot/tutorials/modernize-legacy-code)

[^6]: Atlassian. Rovo MCP Server Overview. *Atlassian Developer*. [developer.atlassian.com/cloud/rovo-mcp](https://developer.atlassian.com/cloud/rovo-mcp/)
