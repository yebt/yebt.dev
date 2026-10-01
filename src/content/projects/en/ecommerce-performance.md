---
title: E-commerce performance overhaul
summary: Profiled and rebuilt the slowest paths of a production e-commerce site — page load from ~4 s to ~1.1 s, with better SEO and Lighthouse scores.
year: 2025
role: Lead developer · performance & backend
stack: [PHP, Laravel, MySQL, Caching, JavaScript]
status: production
featured: true
order: 2
private: true
outcomes:
  - { value: '4→1.1 s', label: 'page load' }
  - { value: '↑ SEO', label: 'Lighthouse & visibility' }
---

## Context

A production e-commerce site with key landing pages loading in roughly **4 seconds**. Slow pages hurt conversion and search ranking.

## Diagnosis

Measure first: request timings, query logs and Lighthouse audits on the pages that matter for the business. <!-- TODO: add the top 2–3 bottlenecks you found (e.g. N+1 queries, heavy templates, uncached fragments). -->

## What changed

- **Query optimization** — removed redundant queries and added the indexes the hot paths actually needed.
- **Template refactoring** — rewrote heavy components and moved work out of the render path.
- **Caching strategy** — cached expensive fragments and data with explicit invalidation rules.
- **Front-end budget** — lighter assets and component rewrites on landing pages.

## Decisions & trade-offs

- Cache what is read often and changes rarely; keep invalidation explicit rather than time-based where correctness matters (prices, stock).
- Fix the 20% of paths that serve 80% of traffic before touching the rest.

## Outcome

- Page load from **~4 s to ~1.1 s** on key pages.
- Better SEO and Lighthouse scores, improving visibility and engagement.
