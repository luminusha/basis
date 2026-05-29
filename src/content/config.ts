import { defineCollection, z, reference } from 'astro:content';

const ROLES = [
  'summarizer',
  'concept-enricher',
  'highlighter',
  'contrarian',
  'bridge-builder',
  'discussion-generator',
  'practical-applicationist',
  'forecaster',
] as const;

const sessions = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    date: z.date(),
    notesStatus: z.enum(['complete', 'partial', 'pending']).default('pending'),
    attendees: z.array(reference('members')).default([]),
    papers: z.array(reference('papers')).default([]),
    roles: z.record(z.enum(ROLES), reference('members')).default({}),
    tags: z.array(z.string()).default([]),
    bridgesTo: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    url: z.string().url(),
    year: z.number().int().optional(),
    arxivId: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tldr: z.string().optional(),
  }),
});

const members = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    github: z.string().optional(),
    bio: z.string().optional(),
    site: z.string().url().optional(),
    pronouns: z.string().optional(),
  }),
});

export const collections = { sessions, papers, members };
export { ROLES };
