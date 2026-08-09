---
name: corpus-maintenance
description: Safely work with the Lantern Harbor prospect corpus (~12.7k South Shore + Cape business records). Use for enumerating, verifying, fingerprinting, synthesizing angles, scoring, or auditing corpus records. Enforces the never-commit-PII rule, the reachability v2 schema, the validator, and the no-lock claim-queue concurrency discipline.
---

# Corpus maintenance

The corpus is `corpus/` — ~12.7k South Shore + Cape MA business records across 51 `by-town/*.json` files. It is a durable prospect asset William wants **improved, not abandoned**. Full schema in `corpus/SCHEMA.md`; read it before any structural work.

## The one rule that is never negotiable

**The corpus is prospect PII and is NEVER committed.** It is gitignored. If asked to "commit the corpus," the answer is no. Before writing any corpus output, confirm the path is gitignored: `git check-ignore <path>`. Dated working outputs (`corpus/score-YYYY-MM-DD/`, `corpus/audit-YYYY-MM-DD/`, `corpus/outreach-batch-YYYY-MM-DD/`) live inside `corpus/` so they inherit the ignore.

## The pipeline (stages)

`enumerate → verify (existence) → website-discovery → fingerprint (stack) → synthesize (angle + draft) → score`. Each stage reads/writes records conforming to `SCHEMA.md`.

- **Record identity** (`id`, `name`, `town`, `vertical`, `added_at`, `enumeration_source`) is immutable once set.
- **`stack.website.reachability`** is the v2 8-value enum (`reachable`, `blocked-cloudflare`, `blocked-other-waf`, `ssl-issue`, `dead-domain`, `tcp-timeout`, `http-404`, `server-error`) and is NEVER null. `platform` is set ONLY when `reachability == "reachable"`. Non-reachable ≠ "business gone" — only `dead-domain` is high-confidence broken.
- **`status`** (NEW/SENT/…/DEAD) is human-edited by William; scheduled tasks NEVER modify it.

## Quality gates (run these, do not skip)

1. **Validator:** `corpus/validate-stack-shape.py` enforces 11 invariants (R1–R11) across all town files. Run it after any stack/draft write; a non-zero exit HALTS and must be logged verbatim. Key rules: no stack without a website (R1), no draft without a reachable+classified stack or a confirmed no-website prospect (R10), plausible copyright year 1995..current+1 (R11).
2. **Copyright year:** use ONLY the canonical parser `corpus/lib/fingerprint_extract.py::detect_copyright_year` (range-aware, returns the MAX year — "© 2016-2026" is 2026, a CURRENT site, not stale). Never re-implement it; six divergent copies once caused false "your site is frozen" pitches.
3. **No fabrication:** never invent founding year, testimonials, AUM, client counts, awards, NMLS, rates, hours, or people beyond what's verified. When unsure, leave the field null.

## Concurrency hazard (important)

The fingerprint claim queue is a **no-lock JSON claim file**. It protects the three scheduled instances a/b/c from each other, but does NOT protect two instances of the SAME task from a scheduler double-fire — that races the writeback. If a corpus scheduled job may be mid-run, DEFER; check `ps aux | grep -iE 'corpus|synth|enum'` first. Rapid repeat probe curls to one host return HTTP 000 (burst throttle) — the 1-probe-per-3s cadence is enough; don't add a rapid second pass.

## Scoring (industry-agnostic Fit)

Fit = **pitch + deliver + income opportunity per record, NOT vertical match**. Signals: a drafted `modernization_angle` (deliverable pain found), a stale/DIY stack (old copyright, legacy platform Wix/GoDaddy/Weebly, phone-only booking, no payments), a confirmed no-website business (first-presence pitch), transition `signals[]` (handoff/expansion/funding/permit/hiring — the "why now"), an identified decision-maker (deliverability), and a light org-size/value proxy. Score deterministically over ALL records (cheap), then **adversarially LLM-verify the top slice** (catch template-artifact false positives — e.g. a Wix site showing "© 2000" is a template default, not a 12-year-stale site — and refine the "why now"). Pattern validated 2026-07-04 in `corpus/score-2026-07-04/`.

## Artifacts

Forensic/audit work goes in a dated dir beside the data (`corpus/audit-YYYY-MM-DD/`), never `/tmp` (must survive reboots). Browse records via `~/Applications/Corpus Browser.app` (headless servers can't read `~/Documents` due to TCC).
