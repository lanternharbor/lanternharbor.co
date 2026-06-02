---
title: Summer of Soccer
client: Self-initiated, for South Shore bars
year: 2026
summary: A multi-tenant score-prediction game for the 2026 World Cup, built so an independent bar can run its own prize pool on the big screen — patrons prove they are in the room, predict the scores, and climb a named leaderboard on the TV, while the owner keeps the opt-in customer list it builds.
url: https://summer-of-soccer.fly.dev
role: Design, build, and go-to-market
tech:
  - FastAPI
  - SQLite
  - Fly.io
highlights:
  - Multi-tenant by design — every venue gets its own themed leaderboard, prize, and customer list from one codebase and a one-line config
  - A physical-presence check-in, opt-in capture with timestamped consent, and a sweepstakes-compliant prize wrapper, so the fun stays on the right side of the rules
  - The same venue config drives both the live game and the printed pitch mockup, so onboarding a new bar is mostly already done
thumbnail: /projects/summer-of-soccer.jpg
featured: true
order: 1
---

## The situation

The 2026 World Cup brings matches to the Boston area, and for a few weeks every neighborhood bar has a reason to be full. But a packed room on match night is temporary. When the final whistle blows, the crowd leaves and the bar has nothing to show for it: no list, no reason for anyone to come back, no easy way to do it again next season.

The consumer apps for predictions and brackets are crowded and national. None of them are built for a single independent bar that just wants its own regulars competing on its own TV.

## The work

Summer of Soccer is a score-prediction game built for one bar at a time. A patron scans a QR code, enters a short rotating code shown on the bar's screens to prove they are actually in the room, and predicts the scores of upcoming matches. An exact score is worth three points, the right result one. Each bar has its own leaderboard on the TV, its own prize, and its own Cup.

It is multi-tenant from the ground up. One codebase and a one-line venue config run every bar, and the same config that powers the live game also generates the printed table tents and the mockup I walk in with. The board on the TV is the brand surface; the opt-in list, captured with logged consent, is the asset the owner keeps.

The product ships with the unglamorous parts handled: a physical-presence check, a sweepstakes structure with a no-purchase alternate entry and official rules, age gating, and consent capture built to respect how text-message marketing is supposed to work.

## The outcome

Summer of Soccer is built, hardened, and live, launching across South Shore bars for the 2026 World Cup, starting with a pilot at a local pub. It is a reusable product, not a one-off promotion: the same game runs for football-season pick'em, March Madness, or any venue's slow-night promotion once the tournament is over.

For the bar, the value outlasts the event. A temporary crowd becomes a named rivalry, a filled slow night, and a customer list the owner can actually use.

## What it took, what got skipped

The hard part was not the game. It was everything around it: making the check-in honest, keeping the prize compliant, capturing consent properly, and making a leaderboard look good on a television across a loud room. The game itself is simple on purpose, because the people playing came to watch a match, not to learn an app.

What got skipped, for now: live score feeds, where results are entered by hand instead; text-message sending, where the list and the consent are captured but the sending waits on the parts that should not be rushed; and any consumer-app ambitions. The product is deliberately narrow, built for the independent bar and the moment in front of it.
