// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lanternharbor.co',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/variant-b') && !page.includes('/contact/thanks'),
    }),
  ],
});
