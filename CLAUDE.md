# Lantern Harbor — notes for Claude

Two things share this directory: the **git-tracked lanternharbor.co site** (Astro 6:
`src/`, `public/`, `functions/api` for /api/contact, `brand/`) and a large **untracked
business workspace** (`corpus/`, `pitch/`, `red-rose/`, `agent-reports/`, `private/`, …).
Deep session context lives in Claude's auto-memory for this project — this file holds only
what any session must never get wrong.

## Hard rules
- **Canonical domain is `lanternharbor.co`** — never `.com` (common autocomplete mistake).
  Email: `william@lanternharbor.co`. Applies to every PDF footer, contact card, signature.
- **`corpus/` is prospect PII and is NEVER committed** (gitignored; ~5k South Shore business
  records). If asked to "commit the corpus," the answer is no.
- **Hand-written CSS only** on this site — no Tailwind/frameworks (William's rule for Astro
  marketing/craft sites; his Next.js apps elsewhere DO use Tailwind).
- **No emojis or Unicode pictographs in UI** — SVG (Lucide style) or CSS-drawn shapes.
- Voice: plain language, minimal em dashes, "South Shore" capitalized, opportunity framing.

## Commands
- `npm run dev` — Astro dev server; `npm run build` — production build to `dist/`;
  `npm run preview` — serve the built `dist/` locally.
- Tests: none in this repo (it's a content site + workspace).

## Deploy
- **Cloudflare Pages** (NOT Vercel), project `lanternharbor-co`; `/api/contact` is a CF
  Pages Function (`functions/api/`). Pushes to main trigger the Pages build — so a push IS
  a deploy; William triggers/approves them.

## Workspace conventions
- Forensic/audit artifacts go in dated dirs beside the data (`corpus/audit-YYYY-MM-DD/`),
  never `/tmp` (must survive reboots).
- Dot-prefixed root scripts (`.enum-*`, `.mk-*`, `.corpus-*`) are local one-off helpers —
  untracked by design; don't commit or "clean up" without asking.
