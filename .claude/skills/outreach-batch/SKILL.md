---
name: outreach-batch
description: Produce a Lantern Harbor cold-outreach batch from scored corpus records — draft observation-led emails in William's voice, assemble into a dated gitignored batch folder. Use for the weekly outreach-drafts routine or when William wants a batch of prospect emails prepared for his review. Never sends anything.
---

# Outreach-batch production

Assemble a batch of cold-outreach email drafts from the corpus, ready for William to review, edit, and send himself. **Nothing is ever sent by this skill.**

## Inputs

Scored corpus records with a synthesized `outreach_draft` (`{subject, body, generated_at}`) and `outreach_opening`. Prefer the current Fit top slice (see [[corpus-maintenance]] scoring). Only draft records that pass the reachability gate (R10): `reachability == "reachable"` with a classified platform, OR a confirmed no-website prospect (`enumeration_source` ends `-no-website-confirmed`).

## Voice rules (these make or break a cold email)

- **Cold outreach must not sound cold.** NO "shortlist" / "looking for people to work with" framings — those read as mass-mailed.
- **Open with a concrete, specific local observation** about THAT business (their site, their platform, a real signal). Generic openers get deleted.
- **Plain language, minimal em dashes, "South Shore" capitalized, opportunity framing** (not "your site is broken" — "I noticed X and was curious whether that was deliberate").
- **No fabrication.** Every specific in the email must be verifiable on their own site. If you can't verify it, don't claim it.
- **Regulars flip the honesty rule** → for William's regulars list (Jackson Sq, Red Rose, EuroMart, Pleasant Paws, Old Country Pizzeria, The Barrel) the email opens FIRST-PERSON, not with the cold-observation framing. Same for warm-channel records (`[WARM: ...]` opener) — bridge via the family/relationship.
- **The email carries the greeting** ("Hi {first},"); the attached proposal/leave-behind PDF stays formal with no first-name greeting.

## Assembly

- Output to `corpus/outreach-batch-YYYY-MM-DD/` — inside `corpus/`, so it is **gitignored (never committed)**. Confirm with `git check-ignore`.
- One file per prospect (subject + body + the record's context + any attachment), plus an index. Body excludes greeting and sign-off (assembled at send time by William).
- Canonical domain `lanternharbor.co`, email `william@lanternharbor.co` in any signature block.

## Quality gates

1. Reachability/R10 gate passed for every drafted record.
2. Every factual claim verifiable on the prospect's own site (no fabrication).
3. Opener is a concrete local observation (or first-person for regulars/warm channels).
4. Tone check: no "shortlist"/cold-marketing phrasing; opportunity framing; minimal em dashes.
5. Output path is gitignored.

## What stays William's

**Sending.** This skill drafts and assembles; William reviews, edits, and sends every email himself. It never sends, never DMs, never publishes. Pace any new-account sending (spam risk).
