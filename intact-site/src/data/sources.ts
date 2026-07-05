// Shared citation registry. Every factual claim on the site links to one of
// these. URLs verified 2026-07 — prefer publisher pages and PubMed/DOI links,
// which stay stable.
export interface Source {
  label: string;
  url: string;
}

export const sources = {
  aapPolicy: {
    label: 'AAP Circumcision Policy Statement, Pediatrics 2012',
    url: 'https://publications.aap.org/pediatrics/article/130/3/585/30235/Circumcision-Policy-Statement',
  },
  aapTechReport: {
    label: 'AAP Technical Report: Male Circumcision, Pediatrics 2012',
    url: 'https://publications.aap.org/pediatrics/article/130/3/e756/30225/Male-Circumcision',
  },
  knmg2010: {
    label: 'KNMG viewpoint: Non-therapeutic circumcision of male minors, 2010',
    url: 'https://www.knmg.nl/download/non-therapeutic-circumcision-of-male-minors-knmg-viewpoint',
  },
  cps2015: {
    label: 'Canadian Paediatric Society position: Newborn male circumcision, 2015',
    url: 'https://cps.ca/en/documents/position/circumcision',
  },
  racpStatement: {
    label: 'RACP position statement: Circumcision of infant males',
    url: 'https://www.racp.edu.au/docs/default-source/advocacy-library/racp-circumcision-of-infant-males-position-statement.pdf',
  },
  bmaToolkit: {
    label: 'BMA toolkit: Non-therapeutic male circumcision of children',
    url: 'https://www.bma.org.uk/advice-and-support/ethics/children-and-young-people/non-therapeutic-male-circumcision-toolkit',
  },
  danishMa2016: {
    label: 'Danish Medical Association 2016 position (English coverage, The Local)',
    url: 'https://www.thelocal.dk/20161205/danish-doctors-come-out-against-circumcision',
  },
  nordicOmbudsmen2013: {
    label: 'Nordic children’s ombudsmen joint statement: Let the boys decide, 2013',
    url: 'https://www.barneombudet.no/uploads/documents/Barneombudet-mener/Andre-brev-og-innspill/2013/Let-the-boys-decide-on-circumsision.PDF',
  },
  singhGrewal2005: {
    label: 'Singh-Grewal et al., Circumcision for the prevention of UTI in boys: systematic review, Arch Dis Child 2005',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15890696/',
  },
  taddio1997: {
    label: 'Taddio et al., Effect of neonatal circumcision on pain response during vaccination, Lancet 1997',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9057731/',
  },
  taylor1996: {
    label: 'Taylor et al., The prepuce: specialized mucosa of the penis, Br J Urol 1996',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8800902/',
  },
  coldTaylor1999: {
    label: 'Cold & Taylor, The prepuce, BJU Int 1999',
    url: 'https://doi.org/10.1046/j.1464-410x.1999.0830s1034.x',
  },
  sorrells2007: {
    label: 'Sorrells et al., Fine-touch pressure thresholds in the adult penis, BJU Int 2007',
    url: 'https://pubmed.ncbi.nlm.nih.gov/17669150/',
  },
  bossio2016: {
    label: 'Bossio et al., Examining penile sensitivity in circumcised and intact men, J Urol 2016',
    url: 'https://doi.org/10.1016/j.juro.2015.12.080',
  },
  weiss2010: {
    label: 'Weiss et al., Complications of circumcision in male neonates, infants and children: systematic review, BMC Urol 2010',
    url: 'https://doi.org/10.1186/1471-2490-10-2',
  },
  frisch2013: {
    label: 'Frisch et al., Cultural bias in the AAP’s 2012 report on male circumcision, Pediatrics 2013',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23509170/',
  },
  cochraneHiv: {
    label: 'Siegfried et al., Male circumcision for prevention of heterosexual acquisition of HIV, Cochrane Review 2009',
    url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003362.pub2/full',
  },
  healthyChildrenCare: {
    label: 'HealthyChildren.org (AAP): Care for an uncircumcised penis',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/bathing-skin-care/Pages/Care-for-an-Uncircumcised-Penis.aspx',
  },
  acsPenileCancer: {
    label: 'American Cancer Society: Penile cancer risk factors',
    url: 'https://www.cancer.org/cancer/types/penile-cancer/causes-risks-prevention/risk-factors.html',
  },
  cdcRates: {
    label: 'CDC/NCHS: Trends in circumcision among US newborns, 1979–2010',
    url: 'https://www.cdc.gov/nchs/data/hestat/circumcision_2013/circumcision_2013.htm',
  },
  whoPrevalence: {
    label: 'WHO/UNAIDS: Male circumcision — global trends and determinants of prevalence, 2007',
    url: 'https://www.unaids.org/en/resources/documents/2007/20071212_jc1360_male_circumcision_en.pdf',
  },
  docCare: {
    label: 'Doctors Opposing Circumcision — intact care resources',
    url: 'https://www.doctorsopposingcircumcision.org/',
  },
  ywbCare: {
    label: 'Your Whole Baby — intact care resources',
    url: 'https://www.yourwholebaby.org/',
  },
} as const satisfies Record<string, Source>;
