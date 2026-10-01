---
title: Production error alerting
summary: Sentry integrated across apps and wired to Telegram so the team sees production errors in real time — and responds before users report them.
year: 2024
role: Developer → Lead · observability
stack: [Sentry, Telegram Bot API, PHP, Laravel]
status: production
featured: true
order: 4
private: true
outcomes:
  - { value: 'real-time', label: 'error visibility' }
  - { value: '↓ MTTR', label: 'faster response' }
---

## Context

Errors in production were discovered when a user or a stakeholder complained. There was no single place to see what was failing.

## What I built

1. Integrated **Sentry** in the applications for error tracking with context (release, user, request).
2. Built a **Sentry → Telegram** bridge so relevant alerts reach the team channel immediately, with noise filtering so people keep reading them.

## Decisions & trade-offs

- Telegram because the team already lived there — an alert nobody sees is not an alert.
- Route by severity and project; group repeated errors to avoid alert fatigue.

## Outcome

- Real-time visibility of production errors and faster incident response. <!-- TODO: add before/after detection time if you have it -->
