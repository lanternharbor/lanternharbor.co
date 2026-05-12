---
title: Hearth
client: C.C. Shepherd Funeral Home
year: 2026
summary: A private tool for funeral directors that captures the arrangement meeting in plain language and helps turn the notes into the documents the family will see.
role: Design, build, and launch
tech:
  - iPhone PWA
  - Fly.io
highlights:
  - Designed and built end-to-end for a Massachusetts funeral home, in active production since May 2026
  - iPhone-first progressive web app, no app store install, deployable in a day
  - Voice and typing both first-class so the director can stay with the family during the meeting
  - "Single-tenant per funeral home: private deployment, private data, no crossover between homes"
featured: true
order: 0
---

## The situation

Funeral directors spend a lot of time in arrangement meetings: the conversation where a family figures out what kind of service they want, what readings, what music, what the obituary should say. The director takes notes. Later, those notes have to become the formal documents the family will see: a service program, a death certificate worksheet, an obituary draft.

The transition from notes a director took with their head down during a hard conversation to polished documents the family sees is the part that takes hours. It is also the part that is easiest to get wrong, because the notes are fragmented and the family is fragile.

## The work

Hearth is a private, single-tenant tool I designed, built, and launched for C.C. Shepherd Funeral Home. It runs on iPhones in the arrangement room, deployed as a progressive web app so there is no app-store install to deal with.

The director uses it during the meeting. The tool captures notes in plain conversational form. After the meeting, it helps the director turn those notes into the family-facing documents: the obituary draft, the service program, the worksheet for filing.

The whole product is built around the rhythm of the actual work: short bursts of capture during the meeting, then structured follow-up afterward. Voice and typing are both first-class so the director can stay present with the family rather than locked into a form.

## The outcome

Hearth has been in active production use at C.C. Shepherd since May 2026. Every arrangement meeting goes through it. The director's after-meeting time is meaningfully shorter, with the documents that used to take hours of retyping and reformatting now coming together from the notes themselves, with the director's review on top.

The product is single-tenant on purpose. Each funeral home gets its own private deployment, its own data, its own access controls. Nothing crosses between homes.

## What it took, what got skipped

The hard parts were not technical. Funeral directors are not designers, and they are working under emotional weight. The product has to be quiet, calm, and predictable. Anything that calls attention to itself, like flashy interactions or unexpected behavior, is wrong for this audience.

What got skipped on purpose: a public marketing site, multi-tenant infrastructure, integrations with the larger funeral-industry software platforms. Those are real and they are coming. The current product is intentionally focused on one funeral home and the part of the work where the leverage is highest.
