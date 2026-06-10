# Lantern Harbor — Brand System

The reference for how Lantern Harbor looks, sounds, and shows up. Visuals are generated in GPT (see `image-prompts.md`); this document is the brief those prompts serve and the rules everything follows.

---

## 1. Essence & positioning

**Lantern Harbor is an independent technology advisor for small businesses on the South Shore of Massachusetts.**

One line: *the steady light that helps a small business find its way through the fog of technology decisions.*

We are an advisor on the owner's side, not a web shop and not a vendor. The job is clarity: help good local businesses make confident technology choices and actually get them working.

## 2. The metaphor (the spine)

- **Fog** = the confusion and overwhelm of small-business technology.
- **The lantern** = Lantern Harbor's calm, human, practical guidance. A small steady light, not a flashy hero.
- **The harbor town** = the settled, confident place the client is trying to reach.

Every illustration, headline, and color choice should serve this story.

## 3. Personality

Warm, steady, plain-spoken, crafted, human. Not corporate, not hype, not jargon.

**Distinctiveness principle (intentional):** the category is full of interchangeable corporate-AI logos, and that sameness is accelerating as everyone uses the same generators. A warm, hand-illustrated, place-specific identity is a deliberate competitive advantage. We look made-by-a-person and rooted-in-a-place on purpose. Standing out is the strategy.

## 4. Logo system

Four tiers, each with a clear job. **All artwork is GPT-generated** per `image-prompts.md`; type is set separately in Lora (image models can't spell).

| Tier | What it is | Use it for | Prompt |
|---|---|---|---|
| **Emblem** (signature) | The painterly circular badge: lantern on a dock, foggy harbor town, gold rule border on navy | Large, atmospheric moments only: website hero, social cover, print/PDF covers, packaging | `image-prompts.md` #1 |
| **Horizontal lockup** (primary) | Lantern + "LANTERN HARBOR" wordmark, side by side | Default everywhere: site header, documents, email | current `public/logo-horizontal.png` |
| **Icon mark** (small) | A single simplified lantern, lots of breathing room | Favicon, social avatar, app icon, anywhere small | `image-prompts.md` #2 (+ `public/favicon.svg` as the tiny fallback) |
| **Wordmark** (type only) | "Lantern Harbor" set in the display serif | Very tight spaces, or over busy imagery | set in Lora |

**Rules**
- **Clear space:** keep at least the height of the lantern's flame clear on all sides.
- **Minimum size:** don't use the Emblem below ~96px (detail collapses). Below that, switch to the Icon mark.
- **Light vs dark:** on cream, use the standard art; on navy, use the cream/reversed treatment. There is no separate light-logo variant historically, so on dark the brand can also go fully typographic (cream wordmark + gold).
- **Don't:** stretch, recolor outside the palette, add drop shadows, bake the wordmark into a generated illustration, or use the Emblem as a tiny favicon.

## 5. Color

Sampled from the logo so site, logo, and illustration stay in one world. Source of truth: `src/styles/global.css` (mirrored in `tokens/`).

| Token | Hex | Role |
|---|---|---|
| Harbor navy | `#0F2A3F` | Primary dark surface, structure, headings |
| Lantern cream | `#F5EFE4` | Primary light / page background |
| Gold | `#E5C067` | CTAs, accents, the warm note |
| Gold soft | `#F3E8C9` | Highlights, wordmark cream |
| Brass | `#B8864B` | Deeper decoration, hover |
| Brass text | `#836034` | Body text on cream (passes contrast) |
| Ember | `#7A3E2C` | Reserved hover/deep warm |
| Driftwood | `#6B5D4F` | Body text on cream |
| Fog | `#D9D2C3` | Dividers, subtle fills |
| Slate | `#2A3842` | Secondary dark |
| Mist | `#8E9AA8` | Cool cloud gray-blue |
| Navyline | `#50627A` | Lantern frame lines |
| **Lantern glow** | `#E9A23C` | **Illustration only** — the warm flame/light in artwork. Never UI text. |

**Balance:** roughly 60% cream / 30% navy / 10% gold. Gold is an accent, not a field.
**Text pairings:** on cream use Driftwood/Brass-text body + Harbor headings; on navy use cream body (88%) + gold accents.

## 6. Typography

- **Lora** (serif) — headlines, the wordmark, anything that should feel crafted.
- **Inter** (sans-serif) — body, UI, labels.
- **Display serif (emblem face):** the decorative serif in the emblem may be used for special display lockups only. Keep it out of body/UI so it doesn't fragment the system; Lora remains the workhorse serif. (Recommendation: keep the system Lora-led; treat the emblem's lettering as part of the artwork, not a third UI font.)
- **Scale:** the fluid `clamp()` scale in `tokens/` (`--step--1` … `--step-6`).

## 7. Illustration & art direction (the differentiator)

This is what sets Lantern Harbor apart, so it must stay consistent. Full descriptors and ready prompts live in `image-prompts.md`; the essence:

- **Medium:** warm hand-painted vintage editorial illustration — a New England coastal nocturne. Soft painterly brushwork, like a classic maritime crest. Never flat corporate vector, never 3D render, never photo-pastiche for the marks.
- **Light:** one warm light source (the lantern flame) glowing through cool blue fog. Rim-lit brass, soft golden reflections on wet wood and calm water.
- **Recurring motifs:** brass hurricane lantern (the hero object), foggy harbor town with a white steeple and lit windows, weathered dock and pilings, a moored sailboat in mist, coiled rope, calm reflecting water, an optional compass rose / north star.
- **Composition:** balanced and calm; the Emblem sits in a circular/arched vignette with a thin gold rule on navy.
- **Avoid:** flat vector, neon, clutter, busy backgrounds, any text rendered inside the art, modern objects, cartoon style, harsh contrast.
- **Consistency:** generate one asset per prompt, and upload an approved piece as a style reference for every subsequent generation.

## 8. Voice

Full rules + examples in `voice.md`. In short: plain language over jargon, frame the opportunity not the failure, minimize em dashes, capitalize "South Shore," no emojis, sound like a trusted neighbor who's great with technology.

## 9. Applications

- **Web** — cream ground, navy structure, gold accents; Emblem or hero scene at the top; Lora headlines.
- **Business card** — light front (lockup + details); dark navy back with the lantern motif and a de-boxed QR.
- **Email signature** — Icon mark or horizontal lockup, name, `william@lanternharbor.co`, `lanternharbor.co`.
- **Proposals / PDFs** — Emblem on the cover; formal tone (the personal greeting lives in the email); render via the `pitch/` HTML→PDF approach.
- **Social** — Emblem or a crop as profile; the wide foggy harbor scene as cover (`image-prompts.md` #5).
- **Favicon / app icon** — Icon mark (`image-prompts.md` #2; `public/favicon.svg` as the 16–32px fallback).
- **Signage** — the lantern + wordmark, high contrast, navy or cream ground.

## 10. Where the files live

- `brand/` — this system: `brand-system.md`, `gpt-brand-context.md`, `image-prompts.md`, `voice.md`, `tokens/`, and `assets/` (GPT outputs go here).
- `public/` — live site assets: `logo-horizontal.png`, `favicon.svg` + favicon set.
- `brand-source/` — high-res sources: `favicon-source-1024.png`, `hero-source.png`, `horizontal-website-header.png`.
- `src/styles/global.css` — canonical color + type tokens (source of truth).
