---
name: proposal-leave-behind
description: Produce a Lantern Harbor proposal or prospect leave-behind as a print-quality one-page PDF. Use when William needs a proposal, pricing sheet, name-decision one-pager, remediation checklist, or any formal leave-behind for a prospect (Red Rose, McConnell Rothman, etc.). Renders HTML → PDF via headless Chrome with the house print conventions.
---

# Proposal / leave-behind production

Lantern Harbor leave-behinds are **single-page, print-quality PDFs** rendered from hand-written HTML via headless Chrome. This skill encodes the exact pipeline and the non-negotiable quality gates.

## The pipeline

1. **Write self-contained HTML** (fonts from Google Fonts CDN, all CSS inline in a `<style>` block, no local asset dependencies so `file://` rendering works).
2. **Render to PDF:**
   ```
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
   "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
     --virtual-time-budget=6000 --print-to-pdf=OUT.pdf "file://$PWD/IN.html"
   ```
3. **Render a PNG preview to eyeball it** (never ship a PDF you haven't looked at):
   ```
   "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=816,1056 \
     --force-device-scale-factor=2 --virtual-time-budget=6000 \
     --screenshot=preview.png "file://$PWD/IN.html"
   ```
   Then Read the PNG and confirm layout, no overflow, on-brand.
4. **Confirm it is exactly one page:** `pdfinfo OUT.pdf | grep Pages` (or count `/Type /Page` NOT followed by `s`). More than 1 page = the trailing-blank-page bug; fix the print CSS (below).

## The single-page print CSS (the trailing-blank-page fix)

Every leave-behind's `@media print` block MUST shave the page and clip, or Chrome emits a trailing blank page:
```css
@media print {
  html, body { background: #fff; }
  .page { box-shadow: none; margin: 0; height: 10.92in; min-height: 0; overflow: hidden; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
```
The `.page` is `width:8.5in; min-height:11in` on screen; print shaves it to `10.92in` + `overflow:hidden`. `print-color-adjust: exact` keeps brand fills/bands.

## Brand + voice gates (hard requirements)

- **Canonical domain `lanternharbor.co`** (NEVER `.com`), email `william@lanternharbor.co`, in every footer.
- **LH palette:** navy `#0F2A3F`, gold `#b9892f` / `#E5C067`, cream `#F7F2E7`, ink `#2a2620`. Headlines Lora (serif), body Inter.
- **For a PROSPECT leave-behind, build in THEIR brand, not LH's** — sample their real colors/emblem and elevate them (proves you did the homework). Keep a discreet "by Lantern Harbor" line.
- **No emojis or Unicode pictographs** — SVG/CSS shapes only.
- **Plain language, minimal em dashes, "South Shore" capitalized, opportunity framing** (not accusatory).
- **PDF tone is formal; NO first-name greeting** ("Prepared for {Full Name}", not "Hi {first}"). The greeting lives in the email William sends, not the PDF.
- **Never put a hard price in a leave-behind unless William has set it** — scope/price are his gate. Frame the engagement shape and leave the number for the pitch (exception: an agreed proposal like Red Rose's $2k/$50/$350).

## Assembly

Put the deliverables in a dated folder next to the prospect's working files (e.g. `red-rose/close-package-YYYY-MM-DD/`), with a `README.md` that indexes each file, states what is verified, and lists the gate items that are William's (send, price, publish).

## What stays William's (never do)

Sending anything to the prospect, the pitch itself, final scope/price, touching any live listing, publishing, deploying. Produce the artifact; he sends it.

## Reference

Validated 2026-07-04 on the Red Rose close package (proposal + name one-pager + presence checklist) and the McConnell Rothman leave-behind. See `pitch/redrose-onepager.py` / `pitch/generate.py` for the Chrome invocation this pipeline mirrors, and the auto-memory note "Print one-pager render pipeline".
