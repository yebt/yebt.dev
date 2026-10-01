# yebt.dev

Personal site of **Yahir Eduardo Bravo Tafur** — software engineer, backend & software architecture.
Built with [Astro](https://astro.build), bilingual (`/en/`, `/es/`), fully static.

## Sections

| Route | What it is |
| --- | --- |
| `/<lang>/` | Home: hero, measured impact, featured projects, now, principles, garden, toolbox, contact |
| `/<lang>/projects/` | Case studies (context → constraints → architecture → decisions → outcome) |
| `/<lang>/garden/` | Long-form notes + **videos** (system design, devlogs, post-mortems). RSS at `/<lang>/garden/rss.xml` |
| `/<lang>/resources/` | Tools, templates, scripts, checklists — filterable by type |
| `/<lang>/cv/` | ATS-friendly CV + PDF download |

## Commands

```sh
npm install
npm run dev       # http://localhost:4321 (drafts are visible in dev)
npm run build     # static output in dist/
npm run cv:pdf    # build + regenerate public/cv/*.pdf from src/data/cv.ts
npm run check     # type-check
```

`cv:pdf` uses a local Chromium/Chrome. If it is not found, set `CHROMIUM_PATH=/path/to/chrome`.

## Editing content

- **Personal data / links / email** → `src/data/site.ts` (empty values are hidden).
- **CV, impact numbers, principles, "now"** → `src/data/cv.ts`. Run `npm run cv:pdf` after changes.
- **UI strings** → `src/i18n/ui.ts`.
- **Content** lives in `src/content/<collection>/<lang>/<slug>.md`. Use the same `<slug>` in both languages so the language switch lands on the same page. `draft: true` hides an entry in production.

### Garden entry with video

```md
---
title: 'Designing the record validator'
description: 'Ports & adapters for a cross-database tool.'
date: 2026-11-01
stage: seedling          # seedling | budding | evergreen
kind: system-design      # system-design | devlog | post-mortem | note | talk
video: { provider: youtube, id: VIDEO_ID }   # or { provider: file, src: /videos/x.mp4 } or { provider: pending }
project: record-validator                    # links the entry to a case study
tags: [architecture]
---
```

### Project (case study)

See `src/content/projects/en/deploy-pipeline.md`. Key fields: `featured`, `order`, `outcomes`, `private` (hides links for company/NDA work), `repo`, `live`.

### Resource

`type`: `tool | template | script | article | talk | book | checklist`, optional `url`.

## Deploy

Any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages): build command `npm run build`, output `dist/`.
