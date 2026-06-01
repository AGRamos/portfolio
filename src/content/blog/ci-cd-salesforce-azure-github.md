---
title: "CI/CD for Salesforce with Azure DevOps + GitHub Actions"
description: "A practical architecture for Salesforce CI/CD that combines Azure DevOps for governance, GitHub Actions for the build pipeline, and SFDX for the actual deployments."
pubDate: 2025-12-03
tags: ["salesforce", "devops", "azure", "github-actions", "ci-cd"]
---

When I joined Universidad Europea, the deployment story was the kind of thing that makes senior engineers wince: a single shared sandbox, manual deployments via change sets, no automated tests, and a "production deploy window" that meant someone had to babysit the org for two hours. This post is the architecture I built to fix that, and the things I wish I'd known before I started.

## The shape of the problem

Salesforce deployments have a few characteristics that make them different from a typical web app:

- **The platform is opinionated.** Metadata, not code. A deploy is a diff of org metadata, not a build artifact.
- **You can't roll back easily.** Once metadata is in production, you can deactivate or replace it, but you can't roll back like you would with a Git revert.
- **Tests have to pass.** Salesforce won't let you deploy to production if your org's Apex test coverage is below 75%.
- **Environments are expensive.** A full Salesforce org costs real money. You can't just spin up a per-PR preview environment.

These constraints shape the pipeline.

## The architecture we settled on

After a few iterations, we landed on this layout:

- **GitHub** is the source of truth. All metadata, all LWC code, all Apex lives in a monorepo with a conventional `main` / `feature/*` / `hotfix/*` branching model.
- **GitHub Actions** runs the build pipeline on every PR. Linting, Apex tests, SFDX source validation, and a deploy to a scratch org for an integration smoke test.
- **Azure DevOps** owns the release pipeline. We use Azure DevOps Release Pipelines for the orchestrated deploys through the org environment chain (Dev → QA → UAT → Pre-prod → Prod), because the governance story (approvals, environments, audit trail) is more mature there.
- **SFDX** is the actual deployment mechanism. Source-format projects, scripted deployments, JWT auth.

The split feels redundant at first, but it ended up being a strength: GitHub for engineering velocity, Azure DevOps for enterprise governance. Each tool does what it's best at.

## A few specifics

### The pull request pipeline

Every PR runs this in GitHub Actions:

1. Checkout the repo
2. Authenticate to a long-lived dev org with a JWT-bearer flow (no human credentials in CI)
3. Run `sf project deploy start --dry-run` to validate the metadata
4. Run all Apex tests against a fresh scratch org
5. Run a small Playwright suite against the deployed LWC components
6. Post a summary back to the PR

If any of that fails, the PR is blocked. No exceptions.

### The release pipeline

The release pipeline lives in Azure DevOps and is triggered manually with approvals. It walks the org chain:

- **Dev**: auto-deploy on merge to main
- **QA**: triggered by a release branch, with a code-review approval
- **UAT**: separate approval from a product owner
- **Pre-prod**: separate approval from the release manager
- **Prod**: change advisory board approval + a scheduled window

Each environment has its own Service Connection, its own set of pre- and post-deploy Apex scripts, and its own rollback runbook. The "scheduled window" is the one piece of friction I'd push back on next time — for hotfixes, the human approval chain is the bottleneck, not the deploy.

### The thing I'd do differently

If I were rebuilding this from scratch, I'd push harder for **package-based development** (unlocked or 2GP) instead of source-format project deploys. The metadata diff model is fundamentally harder to reason about than a versioned package, and the rollback story is dramatically better with packages. The org I worked in had too much legacy metadata to make the migration practical in the timeframe I had, but I'd start there next time.

More to come — I'll write a follow-up on the scratch org + Playwright integration smoke test, which deserves its own post.