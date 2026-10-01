---
title: One-command deploys
summary: Replaced a manual, error-prone release process with scripted, repeatable deployments — from ~30 minutes to ~5 per release.
year: 2025
role: Lead developer · design & implementation
stack: [Bash, Make, Docker, Git, Linux, Laravel]
status: production
featured: true
order: 1
private: true
outcomes:
  - { value: '30→5 min', label: 'per deployment' }
  - { value: '1 cmd', label: 'to release' }
  - { value: 'Docker', label: 'reproducible envs' }
---

<!-- Case-study template: Context → Problem → Constraints → Architecture → Decisions → Outcome → Next. Replace the TODOs with real details. -->

## Context

Several web applications (e-commerce, CRM and internal systems) were deployed by hand: pull, install dependencies, build assets, run migrations, clear caches, restart services. Each release took around **30 minutes** of a developer's focused attention and depended on remembering every step.

## Problem

- Releases were slow, so the team batched changes — making each release riskier.
- Steps were tribal knowledge; a missed cache clear or migration meant an incident.
- New developers could not deploy (or even run the project locally) without help.

## Constraints

- Existing servers and hosting; no budget for a managed platform.
- Multiple projects with slightly different stacks.
- Zero tolerance for long downtime on the e-commerce site.

## Architecture

```text
 developer ──► make deploy ENV=prod
                  │
                  ├─ preflight   (branch, clean tree, env vars, disk)
                  ├─ fetch       (git fetch + checkout tag)
                  ├─ build       (composer / npm, assets)
                  ├─ migrate     (guarded, with backup)
                  ├─ switch      (atomic symlink / container restart)
                  └─ verify      (health check → notify team)
```

The same scripts run in a Docker-based local environment, so "works on my machine" and "works on the server" are the same thing.

## Decisions & trade-offs

- **Scripts over a platform.** Bash + Make are already on every server and readable by the whole team. Trade-off: less polish than a full CI/CD product, but zero new infrastructure.
- **Fail early.** Preflight checks stop a release before anything changes.
- **Idempotent steps.** Every step can be re-run safely after a failure.
- **Dockerized environments.** Onboarding became "clone and run one command".

## Outcome

- Deployment time dropped from **~30 to ~5 minutes**.
- Releases became smaller and more frequent.
- New developers onboard without hand-holding.

## What I would do next

- Move the same steps into a CI pipeline triggered by tags. <!-- TODO: update when done -->
- Add automatic rollback on failed health checks.
