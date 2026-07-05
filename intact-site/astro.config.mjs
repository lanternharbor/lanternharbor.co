// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: real domain once one is registered. Also update src/data/site.ts.
  site: 'https://wholefromthestart.example',
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
