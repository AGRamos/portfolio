---
title: "Deploying Agentforce for WhatsApp at Universidad Europea"
description: "A practical walkthrough of the architecture, integrations, and lessons from rolling out Agentforce on WhatsApp to handle real student conversations."
pubDate: 2025-11-12
tags: ["agentforce", "whatsapp", "salesforce", "ai"]
---

We were the first team at Universidad Europea to put an AI agent in front of real students on WhatsApp. This post walks through what worked, what didn't, and what I'd build differently next time.

## The starting point

The university runs a multi-cloud Salesforce org spanning Sales Cloud, Service Cloud, Marketing Cloud, and Experience Cloud. Before Agentforce, the student support flow was a mix of email, a web form, and a small contact center. The contact center handled WhatsApp manually through a third-party tool that didn't talk to Salesforce at all.

The brief was simple: route WhatsApp conversations to an AI agent that could answer common questions, escalate to a human when needed, and log everything back in Salesforce.

## The architecture

We used Agentforce as the orchestration layer, with a few key integrations:

- **WhatsApp Business API** for messaging
- **Salesforce Service Cloud** as the system of record
- **Open CTI** for the human handoff (so agents get full context)
- **Apex** for the bits Agentforce couldn't do natively (mostly data validation and complex flows)

The pattern that ended up working best was keeping Agentforce focused on the conversation, and using Apex invokable actions for anything that needed transactional integrity.

## What I'd do differently

A few things, in order of importance:

1. **Start with escalation.** Build the human handoff first, then the AI. We did the opposite and spent weeks untangling edge cases that should have been human conversations from day one.
2. **Measure conversation quality, not just deflection rate.** Deflection looks great on a dashboard but doesn't tell you if students are actually getting answers. We added a CSAT survey at the end of every conversation and learned a lot.
3. **Don't trust the LLM with anything transactional.** Agentforce is great at conversation and terrible at idempotency. Keep that in Apex.

More to come. This is a long post in the making.