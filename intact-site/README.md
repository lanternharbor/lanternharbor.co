# Whole From the Start

Standalone Astro site: evidence-based information on routine infant
circumcision, written for parents. Fully independent of the Lantern Harbor
site that lives at the repo root — own dependencies, own styles, no shared
code (patterns were copied, not imported).

## Run

```sh
cd intact-site
npm install
npm run dev       # http://localhost:4322 (parent site owns 4321)
npm run build     # production build to intact-site/dist/
npm run preview   # serve the built dist/
```

## Rename / point at a real domain

1. Edit `src/data/site.ts` (`name`, `tagline`, `description`, `url`).
2. Edit `site` in `astro.config.mjs`.
3. Update the Sitemap host in `public/robots.txt`.

## Deploy (Cloudflare Pages)

Create a **separate** Pages project (do not reuse `lanternharbor-co`):

- Root directory: `intact-site`
- Build command: `npm run build`
- Build output directory: `dist`

## Content conventions

- Every factual claim carries a source; links live beside the claims in
  `src/data/*.ts` and in per-page `SourceList` blocks.
- Tone is calm and evidence-forward — strength through understatement.
- Hand-written CSS only (`src/styles/global.css` + scoped component styles).
- No emoji or Unicode pictographs in UI; icons are inline SVG
  (`src/components/Icon.astro`).
