import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    ogImage: z.string().optional(),
    created: z.number({ coerce: true }),
    updated: z.number({ coerce: true }).optional(),
    tags: z.array(z.string()).optional(),
    toc: z.boolean().optional(),
    externalLinkIcon: z.boolean().optional()
  })
});

export const collections = { articles };
