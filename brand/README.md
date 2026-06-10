# Lantern Harbor — Brand System

A portable brand identity you can plug into GPT to generate consistent, on-brand assets. The art is GPT's job; this folder is the system that keeps it coherent.

## Quick start (generating an asset in GPT)

1. Open ChatGPT. Paste the block from **`gpt-brand-context.md`** at the top of the chat.
2. Copy a prompt from **`image-prompts.md`** (one asset per message).
3. Once you have an emblem you like, **upload it** and tell GPT "match this exact style" for every later asset. This is the #1 consistency lever.
4. Save outputs into **`assets/`** using the filenames noted in `image-prompts.md`.

## What's here

| File | What it's for |
|---|---|
| `brand-system.md` | The full brand book — strategy, logo system, color, type, illustration direction, applications |
| `gpt-brand-context.md` | Paste-at-top block so ChatGPT generates on-brand copy or art direction |
| `image-prompts.md` | Ready-to-paste image prompts (emblem, icon, mono mark, hero, social cover, spot art, more) |
| `voice.md` | Voice & tone rules with before/after examples |
| `tokens/colors.css` | Brand color + type tokens as CSS variables (mirrors `src/styles/global.css`) |
| `tokens/tokens.json` | Same tokens as JSON (for dev / tooling / feeding exact hexes to GPT) |
| `assets/` | Where generated images live (`emblem-reference.png`, `mark-icon.png`, `social-cover.png`, …) |

## Drop-in needed

The approved emblem currently exists only as a chat image. Export it from GPT and save it as **`assets/emblem-reference.png`** — it becomes the style reference for everything else.

## Source of truth

Color and type tokens here **mirror** `src/styles/global.css`. If the site's tokens change, update `tokens/` to match (and vice versa). The only addition is `--color-lantern-glow` (`#E9A23C`), which is illustration-only.

## Division of labor

- **Code / docs / prompts / tokens** — built here.
- **Every pixel of artwork** — generated in GPT from the prompts above.
