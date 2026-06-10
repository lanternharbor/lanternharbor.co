# Lantern Harbor — GPT Image Prompt Library

Ready-to-paste prompts for ChatGPT / GPT image generation. Built around your approved emblem so everything stays in one visual family.

## How to use these

1. **One asset per prompt.** Never ask for "3 versions" in a single message — the model crams them onto one canvas. Run a prompt, then re-run it for another take.
2. **Lock the style with a reference.** Once you have an emblem you love, **upload that image** into the next prompt and add: *"Match the exact style, palette, brushwork, and lantern design of this reference image."* This is the single biggest lever for consistency across assets.
3. **Text is the exception, not the rule.** A logo wordmark must be *identical every time*, which only real type guarantees — and AI can still misspell. So the **emblem/seal** is the one place to bake "Lantern Harbor" in (it's a signature; see **1b**), the **primary lockup** should be art + the wordmark set in **Lora**, and everything else (icon, spot art, motifs, covers) stays text-free and gets its name added in layout.
4. **Save outputs** into `brand/assets/` using the filenames noted under each prompt — the brand board (`brand/brand-board.html`) is wired to display them.

---

## STYLE CORE (already embedded in every prompt below)

> Warm hand-painted vintage editorial illustration — a New England coastal nocturne with soft painterly brushwork, like a classic maritime crest. Not flat vector, not 3D render, not a photograph. Palette: deep harbor navy (#0F2A3F) for shadows and background, antique brass and luminous gold (#E5C067, #B8864B) metalwork, warm cream (#F5EFE4) highlights, cool fog grays (#8E9AA8, #D9D2C3), and a single warm amber lantern glow (#E9A23C). Lighting: one warm light source — the lantern flame — glowing through cool blue fog, with soft golden reflections on wet wood and calm water. Mood: calm, hopeful, settled, timeless, trustworthy. Avoid: flat corporate vector, neon, clutter, busy backgrounds, any lettering or text in the image, modern objects, cartoon style, harsh contrast, watermarks.

---

## 1 — Signature Emblem (the hero badge, text-free)

> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork like a classic maritime crest — not flat vector, not 3D, not a photo. Subject: a single antique brass hurricane lantern standing on a weathered wooden dock, glowing warmly, with a misty New England harbor town behind it — a white church steeple, clapboard houses with softly lit windows, a moored sailboat fading into the fog, calm reflecting water. Composition: centered inside a circular vignette with a thin gold rule border on a deep navy field, like a vintage seal. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: high-resolution square (1:1), 2048×2048.

**Save as:** `assets/emblem-reference.png`

---

## 1b — Signature Emblem WITH the wordmark

Two routes, depending on how much control you want.

**Option A — let GPT bake the name in (matches the emblem you already love):**

> [paste STYLE CORE] Subject: a single antique brass hurricane lantern glowing on a weathered dock, misty New England harbor town behind (white steeple, lit clapboard houses, a moored sailboat in fog), calm reflecting water, inside a circular vignette with a thin gold rule border on a deep navy field. Include the exact text "LANTERN HARBOR" in elegant classic serif capitals, centered along the lower arc of the seal, in luminous gold (#E5C067), well-kerned and perfectly spelled. Palette: harbor navy #0F2A3F, brass/gold #E5C067/#B8864B, cream #F5EFE4, fog grays, warm amber glow #E9A23C. Output: square (1:1), 2048×2048.

Then **proofread the letterforms** and regenerate until the spelling and spacing are clean. This is a fixed raster signature — two generations won't letter identically, so pick one and keep it.

**Option B — clean art + typeset wordmark (most consistent; use for anything official):**

> 1. Generate the emblem text-free (prompt 1).
> 2. Add "Lantern Harbor" in **Lora** beneath or within it, in Canva / Figma / Keynote — or as a second GPT step: upload the clean emblem and prompt *"Add the words 'Lantern Harbor' in an elegant classic serif, centered beneath the lantern, luminous gold, and keep everything else identical."* Proofread.

This keeps the wordmark crisp, recolorable, and the same everywhere.

**Save as:** `assets/emblem-wordmark.png`

**Consistency note:** circulate ONE canonical wordmark. Your existing Lora lockup (`public/logo-horizontal.png`) is the safe default for documents and the site header; the emblem's decorative lettering is a lovely one-off signature. Don't let three slightly different "Lantern Harbor" letterings float around — that's the tell of an unfinished brand.

---

## 2 — Simplified Icon Mark (small-use: favicon, avatar, app icon)

> Warm hand-painted vintage illustration, soft painterly brushwork, not flat vector, not 3D, not a photo. Subject: just a single antique brass hurricane lantern, glowing warm amber, simplified and bold with minimal detail and only a hint of fog behind it. Composition: centered and iconic with generous empty navy space around it so it stays clear when shrunk to a tiny app icon; a gentle circular glow around the flame. No dock, no town, no text. Palette: deep harbor navy #0F2A3F background, brass/gold #E5C067, cream #F5EFE4 highlight, warm amber glow #E9A23C. Output: square (1:1), 1024×1024, deep navy background.

**Save as:** `assets/mark-icon.png` · **Tip:** ask for a version "as simple as possible, readable at 32 pixels" for the favicon.

---

## 3 — Monochrome Engraved Mark (one-color: stamp, letterpress, embroidery)

> A vintage one-color line engraving / woodcut of an antique hurricane lantern — fine etched linework, no gradients, no shading blends, a single ink color (deep harbor navy #0F2A3F) on a clean white background. The look of a classic stamp, letterpress crest, or bookplate. Subject: one hurricane lantern, front view, simple, balanced, elegant. No text. Output: square, high contrast, transparent or pure-white background, 1024×1024.

**Save as:** `assets/mark-engraved-navy.png` · **Variant:** re-run with *"single ink color luminous gold #E5C067 on a deep navy #0F2A3F background"* → save as `assets/mark-engraved-gold.png`.

---

## 4 — Horizontal Hero / Header Scene (wide, atmospheric)

> Warm hand-painted vintage editorial illustration, New England coastal nocturne, soft painterly brushwork, not flat vector, not 3D, not a photo. Subject: a wide foggy harbor at dusk — an antique brass lantern glowing on a weathered dock to the right, a misty harbor town with a white steeple and lit clapboard houses across the far shore, a moored sailboat in the haze, calm water with golden reflections. Composition: wide cinematic scene; keep the lantern and town to the right two-thirds, leaving soft open fog on the left for headline space. Palette: harbor navy #0F2A3F, brass/gold #E5C067/#B8864B, cream #F5EFE4, fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light in cool fog. No text. Output: wide 16:9, 2560×1440.

**Save as:** `assets/hero-wide.png`

---

## 5 — Social Cover (Facebook / LinkedIn banner)

> Warm hand-painted vintage editorial illustration, New England coastal nocturne, soft painterly brushwork, not flat vector, not 3D, not a photo. Subject: a wide, atmospheric foggy harbor at dusk — an antique brass lantern glowing on a dock at the right edge, a misty harbor town with a steeple and softly lit windows along the far shore, calm reflecting water, with lots of soft open fog filling the left side. Composition: wide banner; key elements on the right third, generous empty foggy space on the left for a logo and headline overlay. Palette: harbor navy #0F2A3F, brass/gold #E5C067, cream #F5EFE4, fog grays #8E9AA8/#D9D2C3, amber glow #E9A23C. No text. Output: 1640×856 (Facebook cover ratio ~1.91:1).

**Save as:** `assets/social-cover.png` · **Use:** this is the Facebook cover from earlier today.

---

## 6 — Spot Illustrations (section dividers, cards, collateral)

Six standalone prompts. Run each on its own (one asset per message), and upload your approved emblem first with "match this exact style" to keep them a family.

### 6a — Lantern alone
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: a single antique brass hurricane lantern glowing warmly, resting on a weathered wooden surface, with soft fog behind it. Composition: centered and calm, with generous breathing room around it. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, deep navy background.

**Save as:** `assets/spot-lantern.png`

### 6b — Harbor town
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: a small misty New England harbor town at dusk seen across calm water — a white church steeple, clapboard houses with softly lit windows, faint boat masts at the dock. Composition: a quiet vignette, the town nestled low with soft fog above and gentle reflections in the water. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, soft dusk-fog background.

**Save as:** `assets/spot-town.png`

### 6c — Sailboat in fog
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: a single wooden sailboat moored in still water, half-dissolved in soft evening fog, a faint warm light glowing aboard. Composition: centered and minimal, with lots of soft open fog around it. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, pale fog-gray background.

**Save as:** `assets/spot-sailboat.png`

### 6d — Dock & pilings
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: weathered wooden dock pilings wrapped with old rope, rising from calm water, low fog drifting across the surface. Composition: centered, simple, and quiet. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, dusk-navy background.

**Save as:** `assets/spot-dock.png`

### 6e — Compass rose / north star
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: an antique brass compass rose with a north star, elegant and simple, resting on aged dark wood, faint fog around it. Composition: centered, symmetrical, emblematic. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, deep navy background.

**Save as:** `assets/spot-compass.png`

### 6f — Rope coil
> Warm hand-painted vintage editorial illustration, a New England coastal nocturne with soft painterly brushwork — not flat vector, not 3D, not a photo. Subject: a neatly coiled length of weathered nautical rope on wet wooden planks, soft warm light catching the fibers. Composition: centered, close-up, calm. Palette: harbor navy #0F2A3F, antique brass and gold #E5C067/#B8864B, cream #F5EFE4 highlights, cool fog grays #8E9AA8/#D9D2C3, warm amber glow #E9A23C. One warm light source in cool fog. No text anywhere. Output: square (1:1), 1024×1024, dusk-navy background.

**Save as:** `assets/spot-rope.png`

---

## 7 — Letterhead / Email Banner Strip (slim, wide)

> Warm hand-painted vintage illustration, soft brushwork, not flat vector, not a photo. Subject: a slim horizontal band of misty New England harbor at dawn — faint town and steeple on the far shore, calm water, a small glowing lantern at one end, mostly soft open fog. Composition: very wide and short, quiet and subtle, lots of negative fog space (it sits behind/above text). Palette: cream #F5EFE4 and fog gray base with harbor navy #0F2A3F accents and a small warm gold #E5C067 lantern glow. No text. Output: wide banner 1600×400.

**Save as:** `assets/banner-strip.png`

---

## 8 — Business-Card Back Motif (dark)

> Warm hand-painted vintage illustration, soft brushwork, not flat vector, not a photo. Subject: a deep harbor-navy field with a single small antique brass lantern glowing low in one corner, faint fog and a barely-there harbor silhouette, lots of dark calm space. Composition: mostly empty navy for an elegant card back (room for a centered mark). Palette: harbor navy #0F2A3F dominant, brass/gold #E5C067 lantern, soft amber glow #E9A23C, faint cool fog. No text. Output: 3.5:2 card ratio, 1750×1000.

**Save as:** `assets/card-back.png`

---

## Consistency checklist (per generation)
- [ ] Did I upload the approved emblem as a style reference and say "match this exact style"?
- [ ] One asset only, no "variations" in the same message?
- [ ] "No text" included?
- [ ] Palette hexes present?
- [ ] Saved into `brand/assets/` with the noted filename?
