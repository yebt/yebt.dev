---
title: Cross-database record validator
summary: Internal tool that compares and validates records across databases, replacing hours of manual checks for teams outside engineering.
year: 2025
role: Lead developer · internal tooling
stack: [PHP, Python, MySQL, PostgreSQL, Bash]
status: production
featured: true
order: 3
private: true
outcomes:
  - { value: '↓ manual', label: 'effort & errors' }
  - { value: 'N areas', label: 'using it' }
---

## Context

Different systems (e-commerce, CRM, record-linking) hold overlapping data. Other areas of the company verified consistency by hand — exporting, comparing spreadsheets and fixing mismatches one by one.

## Problem

- Slow, repetitive work for non-engineering teams.
- Human errors in the comparison itself.
- Mismatches discovered late, after they had already caused problems.

## Approach

- A small tool with **source adapters** per database and a common record model, so new sources plug in without changing the core (ports & adapters).
- **Rules as data** — each validation is declared, not hard-coded, so the people who own the data can understand what is checked.
- Clear reports: what differs, where, and the suggested fix.

```text
 [MySQL adapter] ─┐
 [Postgres adapter]├─► normalize ─► rules engine ─► report / fix queue
 [CSV adapter] ───┘
```

## Outcome

- Reduced manual effort and errors for several areas of the company. <!-- TODO: add hours saved per week / areas using it -->
- Data issues detected earlier, before they reach customers.
