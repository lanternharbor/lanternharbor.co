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

/**
 * Projects — websites and tools William has built. Rendered as a list on
 * `/work` and (optionally) featured on the home page when `featured: true`.
 *
 * Each file lives at `src/content/projects/<slug>.md` with the fields below
 * in frontmatter. The markdown body becomes the long-form case-study copy.
 */
const projects = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number().int(),
    summary: z.string(),
    url: z.string().url().optional(),
    role: z.string().optional(),
    tech: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

/**
 * Testimonials — real quotes from real clients, with fields that work in
 * concert to signal authenticity (see README, "Testimonials — making them
 * feel real, not fabricated").
 *
 * Each file lives at `src/content/testimonials/<slug>.md` with the fields
 * below in frontmatter. The markdown body is not currently used.
 */
const testimonials = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/testimonials' }),
  schema: z.object({
    /** What they said. Keep it sounding like how they actually speak. */
    quote: z.string(),
    /** Real full name. Avoid anonymized or partial-name testimonials. */
    name: z.string(),
    /** Their role at the time. "IT Director" beats "Director". */
    role: z.string(),
    /** Company name. Required. Avoid "a large regional practice" vagueness. */
    company: z.string(),
    /** Public URL of the company — a real clickable site reads as real. */
    companyURL: z.string().url().optional(),
    /** LinkedIn profile URL — strongest single trust signal we have. */
    linkedIn: z.string().url().optional(),
    /** When the engagement happened — "April 2024" etc. Anchors in reality. */
    engagementDate: z.string().optional(),
    /** Project this testimonial relates to (project slug, optional). */
    projectSlug: z.string().optional(),
    /** Permission note — "Quoted with permission" or similar. */
    permission: z.string().default('Quoted with permission'),
    /**
     * If true, William has offered to introduce prospective clients to this
     * person for reference checks. Displayed as "Open to a reference call".
     */
    openToReference: z.boolean().default(false),
    /**
     * Featured testimonials appear in the rotating component. Unfeatured
     * entries still show on a full testimonials list if/when one exists.
     */
    featured: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const collections = { pages, projects, testimonials };
