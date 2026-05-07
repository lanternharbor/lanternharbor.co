// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lanternharbor.co',
  integrations: [
    sitemap({
      // Sitewide lastmod — bumped on every deploy. Helps crawlers prioritize
      // the freshly built sitemap over a stale one. Per-page granularity isn't
      // worth the complexity for a 16-URL site.
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/variant-b') && !page.includes('/contact/thanks'),
    }),
  ],
});
