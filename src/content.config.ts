import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()).optional(),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    caseStudy: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    summary: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/certifications' }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string(),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/education' }),
  schema: z.object({
    year: z.string(),
    yearDisplay: z.string(),
    degree: z.string(),
    institution: z.string(),
    detail: z.string(),
    tags: z.array(z.string()),
    order: z.number().default(0),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/now' }),
  schema: z.object({
    label: z.string(),
    value: z.string(),
    detail: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { experience, projects, blog, certifications, education, now };