// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical URL for <link rel=canonical>, Open Graph, and the sitemap.
  // Set SITE_URL at build time (the Dockerfile/Fly deploy passes it) so these
  // are correct on whatever host serves the site; falls back to a placeholder.
  // TODO: point at the real domain once one is registered.
  site: process.env.SITE_URL || 'https://wholefromthestart.example',
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
  ],
  server: {
    // The parent Lantern Harbor site dev server owns 4321.
    port: 4322,
  },
});
