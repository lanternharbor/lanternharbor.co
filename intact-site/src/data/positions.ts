import { sources } from './sources';

export interface Position {
  organization: string;
  country: string;
  year: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
}

// Ordered from "most favorable to circumcision" downward — the point being
// that even the top of the list is not a recommendation.
export const positions: Position[] = [
  {
    organization: 'American Academy of Pediatrics',
    country: 'United States',
    year: '2012',
    summary:
      'The most circumcision-friendly statement by any national body: it said health benefits outweigh risks, but that the benefits are not great enough to recommend routine circumcision for all newborns. Under the AAP’s five-year policy rule the statement expired in 2017 and has not been reaffirmed since — a procedural lapse, not a retraction, but it means the US currently has no active policy statement at all.',
    sourceLabel: sources.aapPolicy.label,
    sourceUrl: sources.aapPolicy.url,
  },
  {
    organization: 'Canadian Paediatric Society',
    country: 'Canada',
    year: '2015',
    summary:
      'Does not recommend the routine circumcision of every newborn male. Advises parents to weigh the modest potential benefits against the risks in their child’s circumstances.',
    sourceLabel: sources.cps2015.label,
    sourceUrl: sources.cps2015.url,
  },
  {
    organization: 'Royal Australasian College of Physicians',
    country: 'Australia & New Zealand',
    year: '2010, current revision 2022',
    summary:
      'Finds that the frequency of the conditions circumcision might prevent does not warrant routine infant circumcision, and that ethically the procedure generally should wait unless there is a medical indication.',
    sourceLabel: sources.racpStatement.label,
    sourceUrl: sources.racpStatement.url,
  },
  {
    organization: 'British Medical Association',
    country: 'United Kingdom',
    year: 'current guidance',
    summary:
      'Treats non-therapeutic circumcision of male children as an ethically sensitive procedure requiring careful justification, and directs doctors to consider the child’s best interests and, where possible, defer to the child’s own future choice.',
    sourceLabel: sources.bmaToolkit.label,
    sourceUrl: sources.bmaToolkit.url,
  },
  {
    organization: 'Royal Dutch Medical Association (KNMG)',
    country: 'Netherlands',
    year: '2010',
    summary:
      'States that non-therapeutic circumcision of male minors conflicts with the child’s right to bodily integrity, and urges that it be actively discouraged. Endorsed by a group of other Dutch medical and surgical societies.',
    sourceLabel: sources.knmg2010.label,
    sourceUrl: sources.knmg2010.url,
  },
  {
    organization: 'Danish Medical Association',
    country: 'Denmark',
    year: '2016',
    summary:
      'Concluded that circumcision of boys without a medical indication should be an informed, personal choice — one the young man makes for himself.',
    sourceLabel: sources.danishMa2016.label,
    sourceUrl: sources.danishMa2016.url,
  },
  {
    organization: 'Nordic children’s ombudsmen',
    country: 'Norway, Sweden, Finland, Denmark, Iceland',
    year: '2013',
    summary:
      'Joint statement by the five countries’ official children’s ombudsmen: boys should decide for themselves whether to be circumcised, at an age when they can understand the decision.',
    sourceLabel: sources.nordicOmbudsmen2013.label,
    sourceUrl: sources.nordicOmbudsmen2013.url,
  },
];
