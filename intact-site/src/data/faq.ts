import { sources, type Source } from './sources';

export interface FaqItem {
  question: string;
  /** Paragraphs. Kept as an array so the accordion can render real <p> breaks. */
  answer: string[];
  /** Plain-text version for FAQPage JSON-LD (no links). */
  answerPlain: string;
  sources: Source[];
}

const join = (paragraphs: string[]) => paragraphs.join(' ');

const answers = {
  unsanitary: [
    'It is not. The care instructions for an intact baby, per the American Academy of Pediatrics, are: wipe the outside, never retract. That is the entire job. The foreskin is fused to the glans in infancy and separates on its own over time; until then there is nothing to clean under, and nothing that needs special handling.',
    'Smegma — the substance this worry usually points at — is a normal product of both male and female bodies, and ordinary bathing handles it after separation, the same way it handles every other part of a child.',
    'The comparison people skip: a circumcised newborn has an open surgical wound healing in a diaper, with wound-care instructions. The intact newborn has a body part you leave alone. If hygiene is the concern, the intact baby is the easy case.',
  ],
  matchDad: [
    'Fathers and sons differ in height, hair, teeth, scars, and a hundred other ways; nobody proposes surgery to align any of them. There is no evidence that looking different from a parent harms a child, and "so he matches" is not a medical indication for removing tissue.',
    'If it ever comes up, it takes one honest sentence: "When you were born, doctors were still doing this to a lot of babies. By the time you were born, we knew better." Children accept honest answers. What a grown son cannot get back is the choice that was made for him.',
  ],
  prevention: [
    'Each claim is worth stating precisely. Urinary tract infections: circumcision does lower first-year UTI risk, but the baseline risk is about 1%, so a systematic review estimated roughly 111 circumcisions to prevent one UTI — an infection normally treated with a course of antibiotics, as it is in girls. Penile cancer: very rare (roughly 1 case per 100,000 men per year), and the American Cancer Society does not recommend circumcision to prevent it. HIV: the trials showing reduced transmission studied adult men in high-prevalence African settings; they say little about a newborn in the United States, who faces no sexual transmission risk at all.',
    'The pattern across all three: a real but small or adult-relevant effect, with non-surgical alternatives available, none of which any national medical body has found sufficient to recommend the procedure. Benefits that only matter to adults can be weighed by the adult the baby will become.',
  ],
  wontRemember: [
    'He feels it fully at the time — that is not in dispute, and local anesthesia reduces but does not eliminate the pain. A study in The Lancet found circumcised babies showed measurably stronger pain responses at routine vaccinations months later, which is evidence the nervous system keeps a record even when the narrative memory does not.',
    'But memory was never really the standard. We do not excuse harms to people who will not remember them — that principle protects everyone from anesthetized patients to infants. And the one thing he certainly will notice, for the rest of his life, is the permanent result.',
  ],
  justASnip: [
    'It is surgery: the removal of a normal, innervated, functional part of the body from a patient who cannot consent, with the complication profile surgery has — bleeding, infection, meatal stenosis, adhesions, revisions, and rare severe injuries. The foreskin in an adult is substantial tissue, not a sliver of skin.',
    'A procedure can be quick and still not be minor. The honest description is: irreversible cosmetic-by-default surgery on a healthy child. Framed that way — which is what it is — "just" does not fit.',
  ],
  everyoneDoesIt: [
    'They do not. Worldwide, only about a third of males are circumcised — estimates range from the older WHO figure near 30% to about 38% in more recent work — and the large majority of those are circumcised for religious or cultural reasons, not routine infant medicine. Being intact is the global norm. In the United States, newborn circumcision is lower now than in 1979: CDC data show 64.5% then versus 58.3% in 2010, the rate fluctuating in between, and a 2025 Johns Hopkins analysis found a further drop to about 49% by 2022 — near half, with the West already around 20%.',
    'Your intact son will not be alone in any American locker room, and outside the United States he will be in the majority. Prevalence is also simply not an argument: the question is not what most people did last generation, but what the evidence supports for this child.',
  ],
  hospitalsOfferIt: [
    'Hospitals offer it because parents ask and insurers reimburse — cultural momentum, not medical recommendation. No national medical association or health authority recommends that infant boys be routinely circumcised, and several European bodies actively discourage it or say the choice belongs to the boy himself.',
    'Medicine has retired other once-routine practices as evidence and ethics caught up. A procedure being available, billable, and familiar is a description of the system, not proof the procedure is needed.',
  ],
  partnerHpv: [
    'This is the claim where honesty means conceding something. A pooled analysis in the New England Journal of Medicine (Castellsagué, 2002) did find circumcised men carried HPV less often, and that female partners of high-risk circumcised men had a somewhat lower cervical-cancer risk. That is a real, if modest, signal, and it deserves a straight answer rather than denial.',
    'But it changes little for a decision made today. HPV vaccination prevents the cancer-causing strains directly and far more effectively than a partner’s circumcision status, and routine screening catches cervical changes regardless. The 2002 findings came with real limitations — a retrospective pooled reanalysis, self-reported circumcision status, an effect that showed up only in a high-risk subgroup. A protection that a vaccine now delivers better is not a reason to perform surgery on an infant who cannot consent.',
  ],
  phimosis: [
    'A foreskin that does not pull back in childhood is normal, not a defect. It is fused to the glans at birth and separates gradually over years. Øster’s classic study of Danish schoolboys found phimosis falling from about 8% at age 6–7 to roughly 1% by 16–17, and adhesions resolving on their own — no treatment needed.',
    'Much "he’ll have a tight foreskin" worry comes from judging a normal child’s foreskin against an adult’s, or from premature forced retraction that itself causes the scarring. True pathological phimosis is uncommon, and even then a topical steroid cream resolves the large majority of cases, letting most boys avoid surgery entirely.',
  ],
  adultLater: [
    'The premise is shakier than it sounds. The lifetime chance that an intact male ever needs a medically necessary circumcision is low — commonly estimated around 1%, and lower still once conservative treatments are tried first. You would be operating on all boys to spare the roughly one in a hundred who might someday need it.',
    'And when it is genuinely needed later, it is done with the patient’s own informed consent and local anesthesia — which is the whole point. It is fair to note adult recovery is more involved than an infant’s; that trades against doing nothing to the 99% and letting the one who needs it decide for himself.',
  ],
  stenosisDoctor: [
    'It tends to be the other way around. Meatal stenosis — a narrowed urinary opening — is a recognized complication of circumcision and is far more common in circumcised boys; the mechanism requires the glans to be uncovered. Estimates of how often it happens vary (a large Danish cohort found a markedly raised risk; a pro-circumcision meta-analysis put the absolute rate under 1%), but the direction is not in dispute.',
    'Many "problems" blamed on intact boys — adhesion tears, irritation, so-called infections — are caused by forced retraction during an exam or bath, not by the foreskin. Left alone, an intact penis is low-maintenance; the interventions are what create the complications.',
  ],
  doctorRecommended: [
    'It is worth asking what "recommended" meant. No major US medical body recommends routine infant circumcision — the AAP’s 2012 policy, the most permissive anywhere, explicitly stopped short of recommending it and left the choice to parents, and a large group of European physicians published a formal rebuttal for cultural bias the next year.',
    'Practice varies enormously by region and by individual clinician, and studies of how the option is presented find parents are often given only part of the risk picture. "My doctor recommended it" frequently reflects local custom and how the conversation was framed more than a specific medical indication for your child. It is entirely reasonable to ask: what is the medical reason, for him, today?',
  ],
  saferNewborn: [
    'Here too, candor helps. In raw numbers, reported complication rates are lower for newborn circumcision than for adult procedures, and pretending otherwise would be dishonest.',
    'But the comparison is loaded. Newborn complications are undercounted — many surface later as meatal stenosis, adhesions, or cosmetic problems that are never logged as surgical complications — while adult figures are inflated by complex, medically-indicated cases. And "babies heal fast" does not answer the two real objections: the newborn cannot consent, and for much of the last century received little or no anesthesia. Lower recorded complications are not the same as the better choice for the child.',
  ],
  restoration: [
    'Only partly, and it is important not to oversell it. Non-surgical stretching can expand skin to re-cover the glans and restore some of the gliding movement and coverage. What it cannot do is regrow what was removed — the ridged band, the frenulum, and the dense fine-touch nerve endings of the foreskin’s inner surface are gone for good. Restoration is a real comfort to many men, but it is not a reason to treat the surgery as reversible.',
  ],
  scope: [
    'This site is about one thing: routine, non-therapeutic circumcision of infants — surgery on a healthy baby without a medical reason. Rare genuine medical indications exist (true pathological phimosis that fails conservative treatment, for example), and those are decisions for a family and their doctor.',
    'Religious circumcision raises questions this site does not adjudicate; the medical evidence presented here is what it is regardless. And nothing here is medical advice — it is sourced information to bring into conversations with your own clinicians.',
  ],
};

export const faqItems: FaqItem[] = [
  {
    question: 'Isn’t an uncircumcised penis unsanitary?',
    answer: answers.unsanitary,
    answerPlain: join(answers.unsanitary),
    sources: [sources.healthyChildrenCare, sources.cps2015],
  },
  {
    question: 'Shouldn’t he match his dad?',
    answer: answers.matchDad,
    answerPlain: join(answers.matchDad),
    sources: [sources.cps2015],
  },
  {
    question: 'Doesn’t it prevent UTIs, cancer, and STDs?',
    answer: answers.prevention,
    answerPlain: join(answers.prevention),
    sources: [
      sources.singhGrewal2005,
      sources.acsPenileCancer,
      sources.cochraneHiv,
      sources.aapTechReport,
    ],
  },
  {
    question: 'Doesn’t it protect a future partner — HPV, cervical cancer?',
    answer: answers.partnerHpv,
    answerPlain: join(answers.partnerHpv),
    sources: [sources.castellsague2002, sources.aapTechReport],
  },
  {
    question: 'He won’t remember it, so what’s the harm?',
    answer: answers.wontRemember,
    answerPlain: join(answers.wontRemember),
    sources: [sources.taddio1997],
  },
  {
    question: 'Won’t his foreskin be too tight — isn’t phimosis common?',
    answer: answers.phimosis,
    answerPlain: join(answers.phimosis),
    sources: [sources.oster1968, sources.phimosisSteroids],
  },
  {
    question: 'If he needs it later, isn’t adult circumcision worse?',
    answer: answers.adultLater,
    answerPlain: join(answers.adultLater),
    sources: [sources.danishSurgicalNeed],
  },
  {
    question: 'Don’t intact boys end up at the doctor more?',
    answer: answers.stenosisDoctor,
    answerPlain: join(answers.stenosisDoctor),
    sources: [sources.frischStenosis2016, sources.morrisStenosis2017],
  },
  {
    question: 'Isn’t it just a snip?',
    answer: answers.justASnip,
    answerPlain: join(answers.justASnip),
    sources: [sources.weiss2010, sources.taylor1996],
  },
  {
    question: 'Isn’t it safer to do it as a newborn?',
    answer: answers.saferNewborn,
    answerPlain: join(answers.saferNewborn),
    sources: [sources.weiss2010, sources.aapTechReport],
  },
  {
    question: 'Can’t he just restore it later if he minds?',
    answer: answers.restoration,
    answerPlain: join(answers.restoration),
    sources: [sources.taylor1996],
  },
  {
    question: 'Doesn’t everyone do it?',
    answer: answers.everyoneDoesIt,
    answerPlain: join(answers.everyoneDoesIt),
    sources: [
      sources.cdcRates,
      sources.hopkins2025,
      sources.whoPrevalence,
      sources.morrisPrevalence2016,
    ],
  },
  {
    question: 'My doctor recommended it, though.',
    answer: answers.doctorRecommended,
    answerPlain: join(answers.doctorRecommended),
    sources: [sources.aapPolicy, sources.frisch2013],
  },
  {
    question: 'If it were wrong, hospitals wouldn’t offer it — right?',
    answer: answers.hospitalsOfferIt,
    answerPlain: join(answers.hospitalsOfferIt),
    sources: [sources.aapPolicy, sources.knmg2010],
  },
  {
    question: 'Does this apply to medically necessary or religious circumcision?',
    answer: answers.scope,
    answerPlain: join(answers.scope),
    sources: [sources.bmaToolkit],
  },
];
