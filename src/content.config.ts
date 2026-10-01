import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every collection is organised as `src/content/<collection>/<lang>/<slug>.md`.
 * Use the same <slug> in both languages so pages link to each other.
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['production', 'in-progress', 'archived', 'concept']).default('production'),
    /** Shown on the home page, sorted by `order`. */
    featured: z.boolean().default(false),
    order: z.number().default(99),
    /** Key numbers for the card and the header of the case study. */
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    repo: z.string().optional(),
    live: z.string().optional(),
    /** Company / NDA work: hides links and shows a notice. */
    private: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const garden = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/garden' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Digital-garden maturity of the note. */
    stage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    kind: z.enum(['system-design', 'devlog', 'post-mortem', 'note', 'talk']).default('note'),
    /**
     * Video to embed at the top of the entry.
     * YouTube: `{ provider: youtube, id: dQw4w9WgXcQ }`
     * Any file/URL: `{ provider: file, src: /videos/demo.mp4 }`
     */
    video: z
      .discriminatedUnion('provider', [
        z.object({ provider: z.literal('youtube'), id: z.string() }),
        z.object({ provider: z.literal('file'), src: z.string(), poster: z.string().optional() }),
        z.object({ provider: z.literal('pending') }),
      ])
      .optional(),
    /** Slug of a related project (same language). */
    project: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.enum(['tool', 'template', 'script', 'article', 'talk', 'book', 'checklist']),
    url: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, garden, resources };
