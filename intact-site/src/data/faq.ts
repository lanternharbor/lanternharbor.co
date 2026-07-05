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
    'They do not. Worldwide, roughly 30% of males are circumcised; being intact is the global norm. In the United States, newborn circumcision has been declining for decades — CDC data show a drop from about 65% in 1979 to about 58% by 2010, with large regional variation and lower rates since.',
    'Your intact son will not be alone in any American locker room, and outside the United States he will be the majority. Prevalence is also simply not an argument: the question is not what most people did last generation, but what the evidence supports for this child.',
  ],
  hospitalsOfferIt: [
    'Hospitals offer it because parents ask and insurers reimburse — cultural momentum, not medical recommendation. No national medical association recommends routine infant circumcision, and several European bodies actively discourage it or say the choice belongs to the boy himself.',
    'Medicine has retired other once-routine practices as evidence and ethics caught up. A procedure being available, billable, and familiar is a description of the system, not proof the procedure is needed.',
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
    question: 'He won’t remember it, so what’s the harm?',
    answer: answers.wontRemember,
    answerPlain: join(answers.wontRemember),
    sources: [sources.taddio1997],
  },
  {
    question: 'Isn’t it just a snip?',
    answer: answers.justASnip,
    answerPlain: join(answers.justASnip),
    sources: [sources.weiss2010, sources.taylor1996],
  },
  {
    question: 'Doesn’t everyone do it?',
    answer: answers.everyoneDoesIt,
    answerPlain: join(answers.everyoneDoesIt),
    sources: [sources.cdcRates, sources.whoPrevalence],
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
