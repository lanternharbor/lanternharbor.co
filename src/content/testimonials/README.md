# Adding a testimonial

Each file in this directory is one testimonial. Filename becomes the
slug used for `projectSlug` cross-references. Add new files as `.md`
alongside this README.

## Frontmatter fields

```yaml
---
quote: "The actual thing they said, in their own voice. Don't over-polish
  — keeping casual phrasing and rhythm makes it read more human."
name: "Jane Doe"
role: "IT Director"
company: "Example Medical Associates"
companyURL: "https://examplemed.com"       # optional, strong trust signal
linkedIn: "https://linkedin.com/in/janedoe" # optional, strongest single signal
engagementDate: "April 2024"                # optional
projectSlug: "example-redesign"             # optional; links to projects/<slug>.md
permission: "Quoted with permission"        # default
openToReference: false                      # set true if they've agreed to
                                             # take reference calls from prospects
featured: true                              # show in the rotator
order: 0                                    # tiebreaker for sort
---
```

## Why these fields exist — making testimonials feel real, not made up

Consumers have become rightfully suspicious of testimonial sections on
consulting and agency websites. A "great experience!" quote attributed to
"Sarah M., CEO" with a stock-photo headshot can be indistinguishable
from a fabricated one. The schema here is designed to stack multiple
small trust signals that add up to hard-to-fake authenticity.

Principles, roughly in order of strength:

1. **Full attribution.** Real first and last name, actual role, actual
   company. No first-name-last-initial. No "a large regional practice."
2. **Clickable signals.** A live `companyURL` going to a real business
   and a `linkedIn` URL going to a real person are the two strongest
   individual trust signals. Bots and fabricators can't sustain these.
3. **Specific outcomes.** Quotes with numbers, time savings, dollar
   figures, or specific changes ("went from X to Y") land harder than
   generic praise. Avoid the word "amazing."
4. **Anchored in time.** The `engagementDate` places the relationship
   in reality — "We worked with William on the EHR migration in
   September 2024" is harder to fabricate than a floating present-tense
   endorsement.
5. **Voice that sounds like a person.** Real people use incomplete
   sentences, specific jargon from their industry, and occasionally
   understate things. Marketing-polished quotes read as marketing.
   Edit for clarity but preserve their phrasing.
6. **Public permission.** The default `permission: "Quoted with permission"`
   note is small, but it's there on purpose — it signals you asked,
   and they said yes.
7. **Open to a reference call.** Setting `openToReference: true` displays
   a small badge noting the person has agreed to take calls from serious
   prospects. Agencies never do this because their testimonials often
   can't withstand it. It's a killer signal when you can offer it.
8. **Mixed content.** Don't make every testimonial a 10/10 glowing
   review. A measured, specific quote from a thoughtful client reads
   truer than five superlatives in a row.

What the schema deliberately **doesn't** include:

- **Star ratings.** 5-star ratings are the visual language of fake
  SaaS-landing-page testimonials. Leaving them off reads as more adult.
- **Stock-photo avatars.** The rotator component doesn't support
  avatars at all for this exact reason. If someone provides a real
  LinkedIn photo and we really want to add it later, we can; but
  forgoing avatars entirely is safer than using fake ones.

The testimonial rotator on the home page shows entries where
`featured: true` (the default). Set `featured: false` for older
or sensitive entries you'd rather not cycle publicly.

This README is ignored by Astro's content loader.
