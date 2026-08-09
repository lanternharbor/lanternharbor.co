---
name: daily-redesign
description: Run the Lantern Harbor daily site-redesign outreach practice — find a South Shore small business with a dated/broken website, build a before/after redesign concept + one-page leave-behind, all locally. Use for the daily-redesign routine or when William wants a fresh redesign candidate + prototype.
---

# Daily site-redesign practice

Each day: pick ONE South Shore small business with a genuinely dated or broken web presence, build a credible "here's what it could look like" redesign concept, and package it as a leave-behind — all local, nothing sent.

## Finding a candidate (the reliable way)

- **Query the corpus, don't blind-search the web.** `jq` the `corpus/by-town/*.json` files for records that are `reachability == "reachable"` with an OLD `copyright_year` or a legacy platform (Wix/GoDaddy/Weebly), then verify live. Blind web searches waste time; the corpus already fingerprinted these.
- **Best target profiles today:** niche trades on Thryv/GoDaddy or Hibu, no-website / Facebook-only businesses (first-web-presence pitch), lodging / B&B, businesses with an oldest-copyright signal. Popular retail/food is mostly on modern hosted platforms now — trust the screenshot over assumptions.
- **Vertical gates:** marine trades fail the review gate; florists fail the template gate; lodging/B&B is viable. Prefer a fresh vertical with 15+ real reviews.

## Verify before building (non-negotiable)

- **Verify the candidate with a REAL screenshot + WebSearch, never a scraper text-dump** (scrapers fabricate). A dead domain screenshots blank — that's your signal it's a real "no owned site" case.
- **Dedup against the full ledger by NAME before building:** grep the entire `completed-businesses.md` by candidate name AND check for an existing `build-<slug>/` dir. Tail-only scans miss older ships and you'll rebuild someone twice.

## Building the concept

- Hand-written CSS only (William's rule for craft/marketing sites — no Tailwind here).
- Capture a before (their live site) and an after (your prototype). The one-page leave-behind uses the [[proposal-leave-behind]] print pipeline.
- **Reveal-on-scroll gotcha:** if the prototype uses `.reveal` scroll animations, screenshots render blank unless a ~700ms timer fallback reveals sections. Add the fallback before capturing.
- **Capture scripts hang on `networkidle`** (Google Fonts CDN never idles) — use a load-based fallback; leave shared capture scripts intact.

## Quality gates

1. Screenshot-verified the target's real current site (not assumed).
2. Deduped by name against the full completed ledger.
3. Passed the vertical gate (not marine/florist).
4. Leave-behind is a clean single-page PDF (see [[proposal-leave-behind]]).
5. Nothing sent, no live listing touched — William sends.

## What stays William's

Sending the outreach, the pitch, price, any contact. This practice produces the artifact and logs the candidate; William decides who to approach.
