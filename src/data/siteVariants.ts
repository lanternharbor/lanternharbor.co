export interface CardItem {
  eyebrow?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ProofItem {
  label: string;
  detail: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Offer {
  name: string;
  summary: string;
  fit: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What happens on the first call?',
    answer:
      'The first conversation is free and casual — you describe what you are sorting out, I ask a few questions, and by the end we either agree on a next step or I tell you honestly that it is not a fit. Either outcome is useful.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer:
      'Advisory work — a tech second opinion, an AI review, or software advice — usually takes one to three weeks. Hands-on work like automating a workflow or a website tune-up runs four to eight weeks depending on scope. Some engagements are a single afternoon. We agree on a rough timeline before anything starts.',
  },
  {
    question: 'What does this cost?',
    answer:
      'There is no published price list because the right number depends on the size of the question and what the work actually involves. I quote after the first call, once I understand the situation. The first conversation is always free.',
  },
  {
    question: 'How do I know which offer fits my situation?',
    answer:
      'Usually the first call makes it obvious within a few minutes. If you are not sure, a tech second opinion is the widest door — it covers most technology questions. Vendor proposal or software purchase? Software advice. Recurring manual work? Automate the manual work. Site that undersells the business? Website tune-up. AI question? Is AI worth it. If nothing on the list quite fits, say so — some engagements do not map neatly, and that is fine.',
  },
  {
    question: 'What if you recommend I don\u2019t hire you?',
    answer:
      'It happens. Some conversations end with "do not do the project" or "this is a fifteen-minute fix, here is how." No charge for the conversation. The first call is free specifically so neither of us has sunk-cost pressure to force a fit.',
  },
  {
    question: 'Do you only work with South Shore businesses?',
    answer:
      'The practice is built around the South Shore. The first conversation, the working sessions, and the relationship itself are in person whenever possible — I drive to you, sit in your office, and see how things actually run. Follow-up and ongoing work happens by phone and email like anything else, but the reason to hire me over someone generic and remote is that I will actually show up. I occasionally take on work outside the area through a referral, but I am not actively seeking it.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'Twelve-plus years in enterprise healthcare IT means I have the deepest experience with practices, clinics, and healthcare-adjacent service businesses. Outside of healthcare, most small and mid-sized service businesses translate cleanly — the decision-making and workflow patterns are similar. If your situation sounds too specialized, mention it on the first call and we will sort it out quickly.',
  },
  {
    question: 'Can you work alongside my existing IT person or vendor?',
    answer:
      'Yes, and it is common. The advisory role is complementary to an operational IT provider, not competitive. Introductions go smoother when I meet the existing person early — I am not interested in undermining a working relationship.',
  },
  {
    question: 'Is there a difference between advisory work and implementation?',
    answer:
      'Yes. Advisory is the recommendation and the written plan. Implementation is the thing actually built — an automation, a website, a small tool. Some offers are purely one or the other; some span both. Many engagements start advisory and become implementation if the work earns it. Pricing reflects the difference.',
  },
  {
    question: 'What tools or technologies do you work in?',
    answer:
      'I am tool-agnostic by default. Recommendations start with the situation, not the toolbox. I am comfortable across common small-business stacks — Google Workspace, Microsoft 365, typical CRMs, automation platforms like Zapier and Make, and web technologies from WordPress to hand-written code. Happy to work in whatever you already have rather than push a change for change\u2019s sake.',
  },
  {
    question: 'Do you take on retainer or ongoing work?',
    answer:
      'Most engagements are discrete pieces of work with a clear start and end. Retainers happen occasionally when the relationship warrants it and the work is steady enough to justify a recurring commitment. I am not interested in a drip-meter consulting arrangement — if there is no real work in a given month, I would rather pause than invoice.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes, happily. A mutual NDA is typical. Most healthcare engagements have had one. I can work from your template or provide a simple standard one. If an NDA is a precondition for the first call, mention it when you reach out and we will put it in place first.',
  },
];

export const variantASections = {
  home: {
    proof: [
      {
        label: '12+ years',
        detail: 'Enterprise healthcare IT, implementation work, and change that had to land in the real world.',
      },
      {
        label: 'Hingham based',
        detail: 'An in-person practice for South Shore businesses. I drive to you, sit in your office, and see the real work.',
      },
      {
        label: 'A few clients at a time',
        detail: 'Small enough to stay thoughtful, hands-on, and available when something needs attention.',
      },
      {
        label: 'Advice and build work',
        detail: 'Some projects are a recommendation. Some are the thing actually built. Some are both.',
      },
    ] satisfies ProofItem[],
    scenarios: {
      heading: 'You might call Lantern Harbor when...',
      lede:
        'The common thread is usually the same: a technology problem that nobody has translated into a sensible next move yet.',
      items: [
        {
          title: 'You are about to spend money and want an adult in the room.',
          body: 'A software proposal, a new website, an AI tool, a consultant, a migration. Before you commit, you want someone who is not trying to sell you the thing.',
        },
        {
          title: 'There is drag in the business, and it is starting to feel expensive.',
          body: 'The same manual work keeps happening, the handoffs are loose, and the fixes so far have been workarounds rather than decisions.',
        },
        {
          title: 'Your website is underselling the business.',
          body: 'The service is solid, but the homepage does not say so clearly — and the person landing on it does not know what to do next.',
        },
        {
          title: 'AI keeps coming up, but the real question is where it is worth using.',
          body: 'You do not need an innovation theater project. You need a sober answer about where it will save time or improve the customer experience.',
        },
      ] satisfies CardItem[],
    },
    offersPreview: {
      heading: 'Starting offers',
      lede:
        'Most engagements start with a small, concrete piece of work so the next step is clear before the project gets bigger.',
      items: [
        {
          eyebrow: 'A clear first step',
          title: 'Tech second opinion',
          body: 'A short, senior read on the tool, proposal, or technology question in front of you.',
          ctaLabel: 'See all starting offers',
          ctaHref: '/services',
        },
        {
          eyebrow: 'Answer the AI question',
          title: 'Is AI worth it?',
          body: 'A grounded read on where AI actually saves time in your business today, and where it is not ready yet.',
        },
        {
          eyebrow: 'Fix the recurring drag',
          title: 'Automate the manual work',
          body: 'A focused pilot on one recurring workflow so you can see the value before expanding anything.',
        },
        {
          eyebrow: 'Tighten the message',
          title: 'Website tune-up',
          body: 'A homepage, offer, and CTA pass for businesses that sound better in person than they do online.',
        },
      ] satisfies CardItem[],
    },
    process: {
      heading: 'How the work usually goes',
      lede:
        'Simple on purpose. No sprawling discovery project unless the problem truly needs one.',
      items: [
        {
          title: 'We name the actual problem.',
          body: 'Not the vague version — the specific decision, bottleneck, or question that is costing you time or confidence.',
        },
        {
          title: 'I look at the real work.',
          body: 'The website, the workflow, the vendor materials, the current tools, or a morning sitting with your team. The point is to react to the work itself, not guess from the abstract.',
        },
        {
          title: 'You get a clear next move.',
          body: 'Sometimes that is a short written plan. Sometimes it is a build. Sometimes it is a calm recommendation not to do the project at all.',
        },
      ] satisfies ProcessStep[],
    },
    recentWork: {
      heading: 'Recent builds',
      lede:
        'A few public examples of the product, website, and software work I do. Not every engagement is public, but these show the shape and finish of the work.',
      note: 'Selected projects only. Advisory work and internal client systems are often private.',
      viewAllLabel: 'See the full work page',
      viewAllHref: '/work',
    },
    closing: {
      heading: 'If something feels murky, that is usually the right time to talk.',
      body:
        'A calm first conversation is often enough to tell whether the next step is a small fix, a clearer plan, or nothing at all.',
      primaryLabel: 'Start a conversation',
      primaryHref: '/contact',
      secondaryLabel: 'See starting offers',
      secondaryHref: '/services',
    },
  },
  services: {
    lede:
      'Most engagements start with one of these named offers. They are small enough to feel manageable, but concrete enough to produce something useful.',
    note:
      'Not sure which one fits? That is normal. A first conversation usually makes it obvious.',
    offers: [
      {
        name: 'Tech second opinion',
        summary:
          'A short piece of work to get clear on the tool, proposal, or technology question in front of you.',
        fit: 'When the picture feels messy, or you want someone experienced to look at it with you before you commit money, time, or staff attention.',
        deliverables: [
          'A short working session to hear what you are sorting out',
          'A look at the current tools, workflow, vendor proposal, or decision in front of you',
          'A plainspoken written recommendation with priorities, tradeoffs, and the next step',
        ],
        ctaLabel: 'Ask about a tech second opinion',
        ctaHref: '/contact',
      },
      {
        name: 'Is AI worth it?',
        summary:
          'A grounded read on where AI can actually save time in your business today — and where it is not ready yet.',
        fit: 'When you keep hearing AI will change everything and want a plainspoken answer about what is worth trying now.',
        deliverables: [
          'A short working session to understand how your team actually spends its week',
          'An honest map of where current AI tools can help, where they are not ready, and where they are a bad fit',
          'A shortlist of two or three experiments worth trying in the next ninety days, with the ones to skip',
        ],
        ctaLabel: 'Ask about AI for your business',
        ctaHref: '/contact',
      },
      {
        name: 'Automate the manual work',
        summary:
          'A pilot on one recurring workflow that is absorbing too much manual effort each week.',
        fit: 'When the same steps keep happening by hand, and you want to try fixing one before deciding whether to do more.',
        deliverables: [
          'A walkthrough of the current process',
          'One clear place to start, chosen with you',
          'A working prototype or a first piece of real automation, with notes on how to keep it running',
        ],
        ctaLabel: 'Ask about automating your workflow',
        ctaHref: '/contact',
      },
      {
        name: 'Website tune-up',
        summary:
          'A plain-language and structure pass for businesses whose site no longer explains the offer well.',
        fit: 'When the business sounds stronger in person than it does on the homepage.',
        deliverables: [
          'A pass on the homepage — what it says, and what it asks the reader to do next',
          'Tighter service descriptions and page structure, so someone can understand the offer in ninety seconds',
          'A punch list of small changes I can implement, or a clear brief for a rebuild',
        ],
        ctaLabel: 'Ask about a website tune-up',
        ctaHref: '/contact',
      },
      {
        name: 'Software advice',
        summary:
          'Outside help for software comparisons, sales calls, and contract questions before you commit.',
        fit: 'When the options all sound alike and you want someone on your side before you sign.',
        deliverables: [
          'A short list of what matters most for your business',
          'A plain-English comparison of the options',
          'Questions to ask, risks to watch, and negotiation points before purchase',
        ],
        ctaLabel: 'Ask about software advice',
        ctaHref: '/contact',
      },
    ] satisfies Offer[],
    closing: {
      heading: 'Start small, then decide.',
      body:
        'These offers are meant to reduce ambiguity, not create a bigger consulting project than you need.',
      primaryLabel: 'Talk through which offer fits',
      primaryHref: '/contact',
    },
  },
  about: {
    intro: [
      'If you are hiring outside help, you should know the short version quickly.',
      'Lantern Harbor is William Keough: a South Shore technology advisor and builder with more than twelve years in enterprise healthcare IT and a deliberately small local practice.',
      'I do not traffic in hype. What I try to bring is steadier judgment, clear language, and follow-through that actually happens.',
    ],
    credibility: {
      heading: 'Why clients trust this work',
      lede:
        'The promise is not that every project should get bigger. The promise is that the decision will get clearer.',
      items: [
        {
          title: 'Complex systems, practical judgment',
          body: 'Large healthcare environments taught me how to evaluate tools, surface risks, and keep implementation tied to real operations.',
        },
        {
          title: 'Plain language without agency theater',
          body: 'I care about clearer decisions, tighter offers, and work that lands — but without layered process, long decks, or inflated language.',
        },
        {
          title: 'Local and in person',
          body: 'I drive to you. The relationship starts in your office, not on a video call from somewhere far away.',
        },
        {
          title: 'No handoffs',
          body: 'The person you meet on the first call is the same person doing the work. No team to hand you off to, no subcontractors brought in later.',
        },
      ] satisfies CardItem[],
    },
  },
  contact: {
    lede:
      "Drop a note below, or call or text if you'd rather skip the typing. I read every message personally and reply within one business day.",
    sublede:
      'The first conversation is free and casual — just to see if I can help. No pitch deck. No intake maze.',
    fitStatement:
      'Best suited for South Shore small and mid-sized business owners sorting out a specific technology decision, an AI question, workflow friction, or a website or small system that no longer fits. Not the right fit for enterprise RFPs, ongoing break-fix support, or clinical-software customization inside an EHR.',
    nextSteps: {
      heading: 'What happens next',
      lede: 'Simple and human on purpose.',
      items: [
        {
          title: '1. I reply personally.',
          body: 'Usually within one business day. No autoresponder, no ticket number, no handoff to someone else.',
        },
        {
          title: '2. We set up a short first conversation.',
          body: 'If a call makes sense, we will find a time. If an answer is simpler than that, I will say so by email.',
        },
        {
          title: '3. You get a clear recommendation for the next step.',
          body: 'That might be a starting offer, a smaller fix than you expected, or an honest suggestion to leave it alone.',
        },
      ] satisfies ProcessStep[],
    },
    submitLabel: 'Start the conversation',
    reassurance: 'I read and reply to every message personally. Usually within one business day.',
  },
};

export const variantBSections = {
  home: {
    title: 'Lantern Harbor Variant B',
    description:
      'Sharper commercial homepage concept for Lantern Harbor, keeping the same calm South Shore brand.',
    hero: {
      eyebrow: 'South Shore, Massachusetts',
      headline: 'A steady light for practical technology decisions.',
      tagline:
        'Lantern Harbor helps South Shore owners fix the technology decisions that waste time, muddy the offer, or turn into expensive detours.',
      ctaPrimary: {
        label: 'Book the first call',
        href: '/variant-b/contact',
      },
      ctaSecondary: {
        label: 'See starting offers',
        href: '/variant-b/services',
      },
    },
    proof: [
      {
        label: '12+ years',
        detail: 'Enterprise healthcare IT and implementation work where the recommendations had to survive real operations.',
      },
      {
        label: 'Based in Hingham',
        detail: 'Built for South Shore businesses that would rather work with someone local than a distant agency queue.',
      },
      {
        label: 'Small, senior practice',
        detail: 'You work directly with William from the first call through the actual work.',
      },
      {
        label: 'Think and ship',
        detail: 'Advisory, implementation, and small product work in one place when the problem needs both.',
      },
    ] satisfies ProofItem[],
    scenarios: {
      heading: 'You might call Lantern Harbor when...',
      lede:
        'The sharper version is this: the business has a technology problem, but nobody has translated it into a sensible next move yet.',
      items: [
        {
          title: 'You are about to spend money and want an adult in the room.',
          body: 'A software proposal, a new website, an AI tool, a consultant, a migration. Before you commit, you want someone who is not trying to sell you the thing.',
        },
        {
          title: 'There is drag in the business, and it is starting to feel expensive.',
          body: 'The same manual work keeps happening, the handoffs are loose, and the fixes so far have been workarounds rather than decisions.',
        },
        {
          title: 'Your website is underselling the business.',
          body: 'The service is solid, but the homepage does not say so clearly — and the person landing on it does not know what to do next.',
        },
        {
          title: 'AI keeps coming up, but the real question is where it is worth using.',
          body: 'You do not need an innovation theater project. You need a sober answer about where it will save time or improve the customer experience.',
        },
      ] satisfies CardItem[],
    },
    who: {
      heading: 'Who this version is aimed at',
      body:
        'Small and mid-sized South Shore businesses that want clearer decisions, tighter offers, and practical help implementing the right fix once the path is obvious.',
    },
    offersPreview: {
      heading: 'Starting offers',
      lede:
        'A sharper commercial packaging of the same underlying work. Clear names, concrete deliverables, low drama.',
      items: [
        {
          eyebrow: 'Clarify the decision',
          title: 'Tech second opinion',
          body: 'A short, senior read on the tool, proposal, or technology question in front of you.',
          ctaLabel: 'See the sharper offer set',
          ctaHref: '/variant-b/services',
        },
        {
          eyebrow: 'Reduce weekly drag',
          title: 'Automate the manual work',
          body: 'A focused pilot on one recurring workflow so you can see the value before expanding anything.',
        },
        {
          eyebrow: 'Tighten the offer',
          title: 'Website Reset',
          body: 'A commercial clarity pass on the homepage, CTA, and service packaging.',
        },
        {
          eyebrow: 'Buy more carefully',
          title: 'Vendor Sidecar',
          body: 'Support through comparison, questions, and negotiation before a software commitment becomes your problem.',
        },
      ] satisfies CardItem[],
    },
    process: {
      heading: 'What happens after you reach out',
      lede:
        'Still calm, just a bit more direct about the commercial intent.',
      items: [
        {
          title: 'We name the actual problem.',
          body: 'Not the vague version. The specific decision, bottleneck, or conversion problem that is costing time or confidence.',
        },
        {
          title: 'I look at the evidence.',
          body: 'The website, workflow, vendor materials, current tools, or team reality. The point is to react to the work itself, not guess from the abstract.',
        },
        {
          title: 'We start with a scoped first move.',
          body: 'A decision review, a pilot, a reset, a build. Enough to create momentum without inflating the engagement.',
        },
      ] satisfies ProcessStep[],
    },
    recentWork: {
      heading: 'A few recent builds',
      lede:
        'Representative product and website work. Not every engagement is public, but these show the kind of judgment and finish the work tends to have.',
      note: 'Public examples only.',
      viewAllLabel: 'See all selected work',
      viewAllHref: '/variant-b/work',
    },
    closing: {
      heading: 'When technology starts clouding the business, the first job is usually clarity.',
      body:
        'If the next step is still fuzzy, that is a good reason to talk now rather than after another round of guesswork.',
      primaryLabel: 'Start the conversation',
      primaryHref: '/variant-b/contact',
      secondaryLabel: 'Review the starting offers',
      secondaryHref: '/variant-b/services',
    },
  },
  services: {
    title: 'Starting offers',
    description:
      'Sharper commercial offer packaging for Lantern Harbor: named starting offers with clear deliverables.',
    lede:
      'Same practice, sharper packaging. These are meant to create a clean first yes without overcomplicating the engagement.',
    note:
      'Each offer is designed to stand on its own or become the first step in a larger project if the work earns it.',
    offers: [
      {
        name: 'Tech second opinion',
        summary:
          'A fast, senior read on the technology choice or proposal in front of you.',
        fit: 'When you want an experienced outside perspective before you commit money, time, or staff attention.',
        deliverables: [
          'A focused intake call',
          'Review of the proposal, tool, or current setup',
          'A written recommendation with tradeoffs, concerns, and a clear suggested path',
        ],
        ctaLabel: 'Ask about a tech second opinion',
        ctaHref: '/variant-b/contact',
      },
      {
        name: 'Automate the manual work',
        summary:
          'A scoped pilot on one recurring workflow that is taking too much manual effort.',
        fit: 'When you want proof that the automation is worth it before expanding the project.',
        deliverables: [
          'Process walkthrough and friction mapping',
          'One prioritized automation opportunity',
          'Pilot implementation or prototype with handoff notes',
        ],
        ctaLabel: 'Ask about automating your workflow',
        ctaHref: '/variant-b/contact',
      },
      {
        name: 'Website Reset',
        summary:
          'A commercial clarity pass on messaging, offer packaging, and next-step calls to action.',
        fit: 'When the business is strong but the site is vague, underselling, or not converting clearly enough.',
        deliverables: [
          'Homepage and CTA rewrite recommendations',
          'Offer packaging and scanability improvements',
          'Implemented revisions or a tightly scoped rebuild brief',
        ],
        ctaLabel: 'Ask about a website reset',
        ctaHref: '/variant-b/contact',
      },
      {
        name: 'Software advice',
        summary:
          'A calm counterpart on sales calls and software comparisons before a vendor becomes a long-term cost.',
        fit: 'When the options sound similar and you want the tradeoffs translated plainly.',
        deliverables: [
          'Requirements and evaluation criteria',
          'Option comparison in plain English',
          'Questions, negotiation notes, and watchouts before signature',
        ],
        ctaLabel: 'Ask about vendor sidecar support',
        ctaHref: '/variant-b/contact',
      },
      {
        name: 'Small Tool Build',
        summary:
          'A right-sized internal tool or lightweight software build when off-the-shelf software is close but not quite right.',
        fit: 'When the problem is specific enough that a small custom solution would save meaningful time or frustration.',
        deliverables: [
          'Problem framing and scope',
          'A practical build plan',
          'Implemented software or prototype, depending on the size of the job',
        ],
        ctaLabel: 'Ask about a small tool build',
        ctaHref: '/variant-b/contact',
      },
    ] satisfies Offer[],
    closing: {
      heading: 'The point is to make the first step easier to say yes to.',
      body:
        'Clear packaging should reduce uncertainty, not make the work feel more salesy.',
      primaryLabel: 'Talk through the right starting offer',
      primaryHref: '/variant-b/contact',
    },
  },
  about: {
    title: 'About',
    description:
      'Sharper commercial about-page concept for Lantern Harbor, with credibility front-loaded before the story.',
    intro: [
      'If you are hiring outside help, you should know the short version quickly.',
      'Lantern Harbor is William Keough: a South Shore technology advisor and builder with more than twelve years in enterprise healthcare IT and a deliberately small local practice.',
      'I do not traffic in hype. What I try to bring is steadier judgment, clear language, and follow-through that actually happens.',
    ],
    credibility: {
      heading: 'Why clients trust this work',
      lede:
        'The promise is not that every project should get bigger. The promise is that the decision will get clearer.',
      items: [
        {
          title: 'Complex systems, practical judgment',
          body: 'Large healthcare environments taught me how to evaluate tools, surface risks, and keep implementation tied to real operations.',
        },
        {
          title: 'Commercial clarity without agency theater',
          body: 'I care about clearer offers, better decisions, and work that converts, but without layered process or inflated language.',
        },
        {
          title: 'Local enough to be useful',
          body: 'For South Shore businesses, I can sit with the work directly instead of guessing from a distance.',
        },
        {
          title: 'Senior attention throughout',
          body: 'No junior handoff. No disappearing after strategy. The same person thinks through the work and helps carry it out.',
        },
      ] satisfies CardItem[],
    },
  },
  contact: {
    title: "Tell me what's going on",
    description:
      'Sharper commercial contact-page concept for Lantern Harbor, with a clearer explanation of what happens next.',
    lede:
      'If there is a technology decision, workflow problem, website issue, or vendor question in front of you, send a note. I will read it myself.',
    sublede:
      'The first conversation is free and casual — just to clarify the next move. No pitch deck. No intake maze.',
    nextSteps: {
      heading: 'What happens next',
      lede: 'A clearer commercial framing of the same process.',
      items: [
        {
          title: '1. I reply personally.',
          body: 'Usually within one business day, often sooner if I can give a quick answer right away.',
        },
        {
          title: '2. We have a short first conversation.',
          body: 'Enough to understand the decision, the pain point, and whether the right first move is a review, a pilot, a reset, or something simpler.',
        },
        {
          title: '3. I suggest a scoped next step.',
          body: 'You should leave that first exchange knowing what I would recommend and why, even if the answer is not to hire me.',
        },
      ] satisfies ProcessStep[],
    },
    submitLabel: 'Start the conversation',
    reassurance: 'I read every message myself and reply personally.',
  },
};
