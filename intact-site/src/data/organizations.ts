export interface Organization {
  name: string;
  description: string;
  url: string;
}

export const organizations: Organization[] = [
  {
    name: 'Intact America',
    description:
      'The largest US advocacy organization working to end routine infant circumcision, through public education and campaigns aimed at hospitals and clinicians. Absorbed Genital Autonomy America (formerly NOCIRC) in 2021.',
    url: 'https://intactamerica.org/',
  },
  {
    name: 'Doctors Opposing Circumcision',
    description:
      'A physician-led organization providing medical literature, clinician education, and guidance for families — including help when a doctor or hospital pressures parents.',
    url: 'https://www.doctorsopposingcircumcision.org/',
  },
  {
    name: 'Your Whole Baby',
    description:
      'Parent-focused education on foreskin function and intact care, with printable guides that are easy to hand to a partner, grandparent, or pediatrician.',
    url: 'https://www.yourwholebaby.org/',
  },
  {
    name: 'Intaction',
    description:
      'A nonprofit running public-awareness campaigns and outreach events on genital autonomy and the harms of circumcision.',
    url: 'https://intaction.org/',
  },
  {
    name: 'Bloodstained Men',
    description:
      'Known for street protests in distinctive white-and-red outfits. Their style is far louder than this site’s, but their visibility has put the issue in front of many people who would never have searched for it.',
    url: 'https://www.bloodstainedmen.com/',
  },
];
