# Adding a project

Each file in this directory is one project entry. Filename becomes the
URL slug. Add new files as `.md` alongside this README.

## Frontmatter fields

```yaml
---
title: "Redesign of ExampleCo.com"
client: "Example Company"
year: 2024
summary: "One-sentence summary of what we built, shown on list views."
url: "https://example.com"            # optional — the live site
role: "Design + build + launch"       # optional
tech:                                  # optional
  - Astro
  - Cloudflare Pages
highlights:                            # optional bullet outcomes
  - "Cut page load from 4.2s to 0.6s"
  - "Doubled contact-form completions in first month"
thumbnail: "/projects/exampleco.jpg"  # optional — goes in public/projects/
featured: true                         # show on home page "Recent work"
order: 0                               # tiebreaker for sort; lower = earlier
---

Optional longer-form case-study markdown body goes here. Renders on
`/work/<slug>/` if/when that route is added. For now only the frontmatter
is used on the `/work` list page.
```

## Notes

- If the project doesn't have a live URL (e.g., an internal tool), just
  omit the `url` field — the card will render without an external link.
- Order on the list page is: `featured` first, then by `year` desc, then
  by `order` asc as a tiebreaker.
- Thumbnails are optional. When present, put the image in
  `public/projects/` and reference as `/projects/<filename>`.
- The `/work` page gracefully handles an empty project list — it shows
  a "Work in progress" message.

This README is ignored by Astro's content loader (glob is `*.md` at the
top level, not recursive).
