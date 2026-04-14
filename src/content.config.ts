import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cta = z.object({
  label: z.string(),
  href: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * Optional hero block. Currently only home.md uses this.
     * If present, the page template renders a dedicated Hero section
     * above the markdown-rendered body.
     */
    hero: z
      .object({
        eyebrow: z.string().optional(),
        headline: z.string(),
        tagline: z.string(),
        ctaPrimary: cta,
        ctaSecondary: cta.optional(),
      })
      .optional(),
  }),
});

export const collections = { pages };
