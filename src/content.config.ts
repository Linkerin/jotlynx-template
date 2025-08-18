import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.number({ coerce: true }).optional(),
    created: z.number({ coerce: true }).optional(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = { articles };
