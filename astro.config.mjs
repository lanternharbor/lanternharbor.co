// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lanternharbor.co',
  integrations: [
    sitemap({
      // /work has a noindex meta tag until real case studies land; keep it out
      // of the sitemap too so we don't send mixed signals. Drop this filter
      // once the first project is published.
      filter: (page) => !page.includes('/work'),
    }),
  ],
});
