import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string() });

// One file per language: src/content/profile/en.md, src/content/profile/fr.md
const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '*.md' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string().optional(),
    photo: z.string(),
    photoAlt: z.string(),
    email: z.string(),
    github: z.url(),
    linkedin: z.url(),
    medium: z.url(),
  }),
});

// src/content/projects/<lang>/<slug>.mdx. Projects with `page: true` get a case-study page
// built from the file body; the others only appear as cards on the home page.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    page: z.boolean().default(false),
    order: z.number(),
    period: z.string(),
    context: z.string().optional(),
    team: z.string().optional(),
    stack: z.array(z.string()),
    links: z.array(link).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

// A single file listing published articles, newest first or in any order (sorted by date).
const articles = defineCollection({
  loader: file('./src/content/articles.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    date: z.coerce.date(),
    minutes: z.number(),
    project: z.enum(['rochondra', 'bitcoin']).optional(),
    summary: z.object({ en: z.string(), fr: z.string() }),
  }),
});

// src/content/resume/<lang>.yaml, shown in the home page's Resume tab.
// A missing French file falls back to the English one.
const dated = { period: z.string(), place: z.string() };
const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '**/*.yaml' }),
  schema: z.object({
    pdf: z.string(),
    availability: z.string(),
    experience: z.array(
      z.object({
        company: z.string(),
        title: z.string(),
        ...dated,
        intro: z.string().optional(),
        bullets: z.array(z.string()).default([]),
      }),
    ),
    education: z.array(
      z.object({ school: z.string(), degree: z.string(), ...dated, details: z.string().optional() }),
    ),
    skills: z.array(z.object({ label: z.string(), items: z.string(), link: z.url().optional() })),
  }),
});

export const collections = { profile, projects, articles, resume };
