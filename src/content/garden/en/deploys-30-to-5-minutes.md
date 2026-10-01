---
title: 'How we went from 30-minute to 5-minute deploys'
description: 'System walkthrough of the deployment scripts behind our releases: the steps, the failure modes and the trade-offs of choosing Bash + Make over a platform.'
date: 2026-10-01
stage: seedling
kind: system-design
video: { provider: pending }
project: deploy-pipeline
tags: [devops, deployment, bash, docker]
---

> This entry is a seedling. The video walkthrough is being recorded — the notes below are the outline it follows.

## Why this matters

Slow deploys are not just slow. They make teams batch changes, and big batches are what turns a release into an incident.

## The pipeline, step by step

1. **Preflight** — refuse to start if the working tree is dirty, the branch is wrong or env vars are missing.
2. **Fetch & build** — dependencies and assets, the same way in every environment.
3. **Migrate** — guarded, with a backup first.
4. **Switch** — atomic, so users never see a half-deployed app.
5. **Verify & notify** — health check, then tell the team.

## Failure modes I designed for

| Failure | What happens |
| --- | --- |
| Build fails | Nothing is switched; current release keeps serving |
| Migration fails | Stop, restore from backup, notify |
| Health check fails | Alert the team (rollback is next on the list) |

## Trade-offs

Bash and Make are not glamorous, but every server already has them and every developer can read them. The goal was **fewer moving parts**, not more.

## What's next

- Trigger the same steps from CI on tags.
- Automatic rollback.
