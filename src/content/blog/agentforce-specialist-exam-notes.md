---
title: "Notes on the Salesforce Agentforce Specialist exam"
description: "A study guide and field report for the Agentforce Specialist certification — what to study, what's on the test, and the things I wish I'd known."
pubDate: 2026-01-15
tags: ["agentforce", "certification", "salesforce", "ai"]
---

I passed the Agentforce Specialist exam in early 2025, after spending most of the previous month building Agentforce implementations in production. These notes are the things I wish I’d known going in — not a brain dump, but a study guide shaped by what the exam actually tests.

## What the exam is, in plain English

It's a 60-question, multiple-choice proctored exam. You get 105 minutes. The pass mark is 65%. It's not a free-for-all — every question is carefully weighted, and the exam is harder than the older Salesforce specialty exams in a few specific ways:

- **Scenarios are long.** You read a paragraph of business context, then 3-4 questions tied to it. Skim and you'll miss the constraint.
- **The "right" answer often requires picking a tradeoff.** It's not always "the best practice" — sometimes it's "the least bad option given this constraint."
- **The questions are *current*.** The exam rotates questions frequently. Memorized dumps will fail you.

## What to study, in order

### 1. Prompt Builder and the prompt lifecycle

If you only study one thing, study this. Prompt Builder is the foundation that everything else sits on. You need to know:

- The prompt template types (Sales GPT, Service GPT, custom)
- How groundings work (Record Data, Data Cloud, flows, Apex)
- Why and when to use Flex template vs. a standard template
- The prompt lifecycle: draft → test → deploy → monitor

The exam leans heavily on the "why would you choose X over Y" question, so you can't just memorize the screens.

### 2. Agentforce agents, end to end

Topics you'll definitely be tested on:

- **Topics** and how they scope what an agent knows
- **Actions** (Flow, Apex, Prompt, HTTP) and the order of execution
- **Instructions** — what they do, what they don't do, how they inherit
- **Guardrails** — when to use which guardrail type, and the limits
- **Channel deployment** — deploying to a site, Slack, WhatsApp, the agentforce service agent

A surprising number of questions are about debugging — "an agent is doing X, what's the most likely cause." This is where the production experience helps.

### 3. Data Cloud grounding

You don't need to be a Data Cloud expert, but you do need to know:

- How a Data Cloud data stream becomes a grounding source
- The difference between a knowledge object and a streaming insight
- When to use vector search vs. keyword search in a grounding

### 4. Model selection and cost reasoning

A few questions are explicitly about cost and latency tradeoffs:

- When to use a smaller model in Einstein
- What "grounded generation" actually costs
- How to estimate token usage for a given use case

This is the area where the exam is closest to a real architecture conversation, and the questions are the most useful for actual work.

### 5. Trust, safety, and the audit story

The exam cares about this more than you might expect:

- The Einstein Trust Layer, end to end (masking, zero retention, audit)
- Toxicity detection and the failure modes
- How to set up a human handoff
- Data residency and the Salesforce compliance posture

## What to *not* spend time on

A few things I studied that turned out to be low-yield:

- **The exact UI labels.** The exam tests concepts, not clicks. Don't memorize screens.
- **The full Einstein 1 Platform stack.** It's a marketing diagram. The exam asks about specific capabilities, not the diagram.
- **Older AI products (Einstein Bots, Einstein Vision).** They come up in exactly one question each, and it's usually a "which product would you use" distractor.

## What I'd do differently

If I were retaking it, I'd spend more time on the **debugging scenarios**. The exam gives you a real-world failure and asks what to do — these are easier to reason about if you've actually operated an agent in production, and harder if you're studying from docs alone. Build something small, break it on purpose, then read the docs to understand why it broke. That hour of work is worth a week of reading.

Good luck. It's a fair exam.