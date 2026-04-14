# lanternharbor.co

Source for **Lantern Harbor** — a one-person technology and AI consulting practice on the South Shore of Massachusetts.

Built with [Astro](https://astro.build) and hand-written CSS. No utility framework. Six typographic pages that lead with a full-viewport navy hero on the home.

## Stack

- **Astro 6** — static site generator
- **Hand-written CSS** — tokens live in `src/styles/global.css`
- **Google Fonts** — Lora (headings, 400/500/600/700) + Inter (body, 400/500/600), via CDN
- **Content collections** — page content is Markdown in `src/content/pages/`; the schema allows an optional `hero` block (currently used by home only)
- **@astrojs/sitemap** — auto-generates `sitemap-index.xml`
- **Cloudflare Pages Functions** — serverless functions under `functions/` (currently one: `functions/api/contact.ts`)
- **Resend** — transactional email provider for contact-form submissions
- Host: **Cloudflare Pages**

## Layout

```
src/
├── components/
│   ├── Button.astro           Filled + ghost variants
│   ├── ContactForm.astro      Accessible form + progressive enhancement
│   ├── Footer.astro           Small, understated
│   ├── Header.astro           Sticky nav; mobile overlay
│   ├── Hero.astro             Full-viewport photographic hero (home only)
│   └── LanternMark.astro      SVG of the lantern (legacy — not currently used)
├── content/
│   └── pages/                 home, services, about, contact, privacy, terms
├── content.config.ts          Collection schema (incl. hero block)
├── layouts/
│   └── Layout.astro           <head>, meta, OG, canonical, fonts
├── pages/
│   ├── index.astro            Home = Hero + prose sections
│   ├── contact.astro          Dedicated contact page (form + direct-contact card)
│   ├── contact/thanks.astro   No-JS fallback landing after form submit
│   └── [slug].astro           Dynamic route for services, about, privacy, terms
└── styles/
    └── global.css             Design tokens + base + .prose

functions/
└── api/
    └── contact.ts             Cloudflare Pages Function — POST handler that
                                validates, filters bots, and sends via Resend

public/
├── hero.jpg                   Photographic hero background (lantern on dock, 142KB)
├── logo-horizontal.png        Trimmed horizontal brand lockup (header, 69KB)
├── favicon.png                Lantern-only icon (PNG favicon + Apple touch, 14KB)
├── favicon.svg                SVG favicon fallback
├── social-card.jpg            Open Graph / Twitter card image (flattened on harbor navy, 36KB)
├── Logo.png                   Full square lockup (raster, for reference)
├── lantern_harbor_logo.svg    Earlier-round vector lockup (for reference)
├── new images/                Original uncompressed brand assets (source of truth)
└── robots.txt
```

## Commands

| Command           | What it does                     |
| :---------------- | :------------------------------- |
| `npm install`     | Install dependencies             |
| `npm run dev`     | Local dev at `localhost:4321`    |
| `npm run build`   | Build to `./dist/`               |
| `npm run preview` | Preview the production build     |

## Editing content

Page copy lives in `src/content/pages/*.md`. Edit and save; the dev server hot-reloads.

Two more content collections pick up any markdown you drop into them:

- `src/content/projects/*.md` — one file per project. Displays on `/work`
  and (when `featured: true`) in the `/work` list header. See that folder's
  README for the schema.
- `src/content/testimonials/*.md` — one file per testimonial. Displays in
  the rotating `<TestimonialRotator>` on the home page and `/work`. See
  that folder's README, which also documents **how to make testimonials
  feel real, not fabricated** — the full set of trust-signal principles.

Neither section renders if empty; as soon as you add one entry, it
appears everywhere it belongs.

Frontmatter fields:

- `title` — used as `<title>` + `og:title`
- `description` — used as `<meta name="description">` + `og:description`
- `hero` (optional, home only) — block with `headline`, `tagline`, `ctaPrimary`, `ctaSecondary?`, `eyebrow?`

## Brand tokens

CSS custom properties in `src/styles/global.css` — sampled from the logo so page and logo harmonize:

```
--color-harbor:    #0F2A3F   primary dark (backgrounds, text)
--color-lantern:   #F5EFE4   cream (main page bg)
--color-gold:      #E5C067   luminous gold (CTAs, accents — logo gold)
--color-gold-soft: #F3E8C9   cream highlight (logo wordmark color)
--color-brass:     #B8864B   muted gold (text accents, active nav)
--color-driftwood: #6B5D4F   body text
--color-fog:       #D9D2C3   dividers
--color-slate:     #2A3842   secondary dark
--color-mist:      #8E9AA8   soft gray-blue (logo cloud tones)
--color-navyline:  #50627A   lantern frame lines (logo)
```

Headings: **Lora 700**. Body: **Inter 400/500/600**.

## The logo

Two copies live in `public/`:

- `lantern_harbor_logo.svg` — vector, clean scaling. Wordmark is **cream (`#F3E8C9`)** so it's designed for dark surfaces (navy hero, dark hero sections).
- `Logo.png` — high-res raster. Same art.

The lantern illustration (no wordmark) is also available as a component: `<LanternMark />` in `src/components/`. Colors inside the mark are driven by CSS variables so it re-themes per context.

## Deploying to Cloudflare Pages

1. Initialize git and push to a new GitHub repo:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Cloudflare dashboard → **Pages → Create project → Connect to Git** → select the repo.
   - Build command: `npm run build`
   - Output directory: `dist/`
   - Cloudflare will auto-detect `functions/` and deploy the contact-form handler alongside the static site.

3. After the first successful build → **Pages → Custom domains** → add:
   - `lanternharbor.co`
   - `www.lanternharbor.co`

4. Add Cloudflare Web Analytics (Pages → Analytics → enable Web Analytics; paste the snippet into `src/layouts/Layout.astro`).

## Contact-form setup (Resend + CF Pages env vars)

The contact form at `/contact` POSTs to `/api/contact`, which is served by a
Cloudflare Pages Function (`functions/api/contact.ts`). That function relays
submissions through [Resend](https://resend.com) to William's inbox.

Until these env vars are configured, the form UI works but submissions return
an error asking the visitor to email directly. You'll know setup is incomplete
if you see `Contact function missing required env vars` in the CF Pages
function logs.

### One-time setup

1. **Sign up for Resend** at https://resend.com (free tier = 3,000 emails/month).

2. **Add `lanternharbor.co` as a sending domain** in the Resend dashboard.
   Resend will issue three DNS records (a TXT for SPF, a CNAME for DKIM, and
   one more for return-path). Add them to your DNS in Cloudflare (the DNS tab
   for `lanternharbor.co`). Click **Verify** in Resend once propagation
   completes — usually a few minutes.

3. **Create an API key** in Resend (Settings → API Keys). Copy the `re_...`
   value; you won't see it again.

4. **Set env vars** in the Cloudflare Pages dashboard →
   *Project → Settings → Environment variables*. Add to **Production** (and
   **Preview** if you want the form to work on preview deploys):

   | Variable             | Type    | Value                                                    |
   | :------------------- | :------ | :------------------------------------------------------- |
   | `RESEND_API_KEY`     | Secret  | `re_...` from Resend                                     |
   | `CONTACT_TO_EMAIL`   | Plain   | `william@lanternharbor.co` (where contacts arrive)       |
   | `CONTACT_FROM_EMAIL` | Plain   | `Lantern Harbor <william@lanternharbor.co>` (verified)   |

5. **Redeploy** (Cloudflare doesn't auto-pick-up env-var changes). Pages →
   Deployments → three-dot menu on the latest → Retry deployment.

6. **Test the form**. Submit a real note from `/contact`; you should see it
   land in `CONTACT_TO_EMAIL` within a few seconds. Reply-to is set to the
   visitor's email, so hitting Reply in Gmail works naturally.

### Troubleshooting

- **Form submits but no email arrives.** Check *CF Pages → Functions → Logs*
  for `Resend API error ...`. Usually means the domain isn't verified yet, or
  the from-address isn't on the verified domain.
- **Submissions succeed without reaching you.** A honeypot field (
  `company_website`) silently drops bot traffic. If a real human's message
  disappeared, check their submission didn't include that field.
- **Local dev.** The function doesn't run with `npm run dev` (that's Astro
  only). For end-to-end local testing, use `npx wrangler pages dev dist --compatibility-date=2024-01-01` after a `npm run build`, with a
  `.dev.vars` file containing the env vars.

## Post-launch checklist

- [ ] Verify `lanternharbor.co` in Resend + set CF Pages env vars (see above)
- [ ] Send a real test submission through `/contact` to confirm end-to-end
- [ ] (Optional) Add a dedicated `hello@` or `noreply@` alias for `CONTACT_FROM_EMAIL`
      so the sender address isn't the same as the destination inbox
      (cosmetic; `william@lanternharbor.co` works fine for both)
- [ ] Explore a second phone line for the practice (e.g. Google Voice, Line2,
      iPhone dual-eSIM) — update `src/pages/contact.astro` + `ContactForm.astro`
      with the business number once chosen
- [ ] Add a photograph of William to the About page (natural, in-context, not studio)
- [ ] Find/commission 2–3 South Shore coastal photos to sprinkle into home and about later
- [ ] Swap Google Fonts CDN for `@fontsource` self-hosting (faster, more private)
- [ ] Submit `sitemap-index.xml` to Google Search Console
- [x] ~~Compress `hero.png`~~ — done (2.1MB PNG → 142KB JPEG); favicon.png 1.4MB → 14KB; social-card.png 2.0MB → 36KB

## Changing domains (e.g. `.co` → `.com`)

The site is architected so a domain swap is a focused one-evening job. Not a
migration project. This runbook exists so future-you (or anyone helping you
later) has a zero-thought path.

### Code (~15–30 minutes)

Single source of truth for the URL is `astro.config.mjs` → `site:`. Change
that one line and canonical URLs, OG/Twitter tags, sitemap, and Schema.org
URLs all update automatically across every page.

Two find/replace passes clean up the remaining hardcoded references:

```bash
# Email address (replace william@lanternharbor.co → william@NEWDOMAIN)
grep -rln "william@lanternharbor.co" src/ functions/ public/ README.md \
  | xargs sed -i '' 's/william@lanternharbor\.co/william@NEWDOMAIN/g'

# Bare domain in prose, comments, meta (replace lanternharbor.co → NEWDOMAIN)
grep -rln "lanternharbor.co" src/ functions/ public/ README.md \
  | xargs sed -i '' 's/lanternharbor\.co/NEWDOMAIN/g'
```

Then:

```bash
npm run build            # confirm build succeeds
git diff                 # review everything before committing
# spot-check dist/index.html and dist/sitemap-*.xml for the new URL
git commit -am "Migrate lanternharbor.co → NEWDOMAIN"
```

Files touched (inventoried via `grep -rn 'lanternharbor\.co' . --include='*.{astro,ts,mjs,md,txt}'`):
`astro.config.mjs`, `README.md`, `public/robots.txt`, several files under
`src/content/pages/`, `src/pages/contact.astro`, `src/components/ContactForm.astro`,
`src/layouts/Layout.astro`, `functions/api/contact.ts`.

### Infrastructure (~90 minutes, one focused session)

1. **Register** the new domain (Cloudflare Registrar is cleanest — same
   account as DNS and Pages). Point its nameservers at Cloudflare.
2. **Cloudflare Pages → Custom domains** — add the new domain. Keep the old
   one active during transition so nothing breaks.
3. **Resend → Domains** — add the new domain, paste in the DNS records Resend
   generates (SPF, DKIM, MX), click Verify. Once green, update the
   `CONTACT_FROM_EMAIL` env var in CF Pages to use the new domain.
4. **Google Workspace → Admin → Domains** — *Add a domain*, verify it, then
   add `william@NEWDOMAIN` as an alias. When you're ready, promote the new
   domain to primary and demote the old.
5. **Add redirects** — create `public/_redirects` (new file) with:
   ```
   https://OLD_DOMAIN/*  https://NEW_DOMAIN/:splat  301
   ```
   This preserves SEO by telling Google the old URLs have permanently moved,
   and means anyone who bookmarked the old site still lands on the new one.
6. **Google Search Console** — add the new domain as a property, verify it,
   then under the OLD property use *Settings → Change of address* to point
   Google at the new home.

### What can't be automated

- Notifying existing clients/contacts of the email change
- Updating LinkedIn, Indeed, and any public profiles
- Replacing printed materials (business cards, signage)
- Waiting for search engines to re-index (2–4 weeks of passive lag)

None of this is scary — it's operations, not code. If you do the swap within
a few months of launch, you haven't built up much SEO equity to migrate, and
the external work is small. The later you wait, the more of it there is.

### Easier alternative

If the `.com` is available at registration price **right now**, grab it before
launch and point both domains at the same Cloudflare Pages site. Zero future
migration. Just own both.

---

Built by hand with AI.
