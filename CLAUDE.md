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
- Preview = `lantern-harbor-dev` (port 4321) in `.claude/launch.json`. Screenshots capture page
  TOP only — verify off-screen elements with `preview_eval`; `scroll-behavior:smooth` (global.css)
  blocks eval `scrollTo` (set it to `auto` first).

## Deploy
- **Cloudflare Pages** (NOT Vercel), project `lanternharbor-co`; `/api/contact` is a CF
  Pages Function (`functions/api/`). Pushes to main trigger the Pages build — so a push IS
  a deploy; William triggers/approves them.
- PRs squash-merge with a `(#N)` suffix; branch from synced main, `gh pr merge --squash`. Run
  `npm run build` first to confirm the production build before relying on the CF build.

## Brand & logo assets
- **Logo source of truth = `brand/logo/`**; regenerate/extend via the deterministic scripts in
  `brand/logo/build/` (cutout → Chrome-composited Lora lockups → favicons → `deploy_to_public.py`).
  Masters → `public/` is one-way. See `brand/logo/README.md`. Live header img = `/logo-header.png`
  (size-tuned cut), schema/display logo = `/logo-horizontal.png`.
- Logo ART (lantern/emblem) is GPT-generated; lockups are composited in code with real Lora. Do
  NOT hand-draw the mark or bake the wordmark into the art — the "SVG/CSS shapes" rule above is for
  UI icons, not the logo.
- Brand renders use headless Chrome: `--force-device-scale-factor=1` for large canvases (dsf=2
  SIGKILLs at ≥1536²), `--allow-file-access-from-files`, `--default-background-color=00000000` for
  transparency. Stop the preview server + `pkill "Google Chrome"` first (they contend for memory).
- Git: `brand/` tracks docs only, `brand-source/` is tracked (legacy PNGs), `brand/logo/` masters
  are untracked — `git ls-files` before moving brand files (moving tracked ones = dangling deletes).

## Workspace conventions
- Forensic/audit artifacts go in dated dirs beside the data (`corpus/audit-YYYY-MM-DD/`),
  never `/tmp` (must survive reboots).
- Dot-prefixed root scripts (`.enum-*`, `.mk-*`, `.corpus-*`) are local one-off helpers —
  untracked by design; don't commit or "clean up" without asking.
- Desktop/Downloads files carry `com.apple.macl` → Claude's tools EPERM on read/cp (even with the
  sandbox off); William must `cp` them into the repo first.
