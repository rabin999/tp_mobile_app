export type LegalClause = {
  title: string;
  paragraphs: readonly string[];
};

export type LegalGroup = {
  title: string;
  intro: string;
  clauses: readonly LegalClause[];
  closingTitle?: string;
  closing?: string;
};

export type PrivacySubSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type PrivacyBlock = {
  heading: string;
  subSections?: readonly PrivacySubSection[];
  paragraphsBefore?: readonly string[];
  bullets?: readonly string[];
  paragraphsAfter?: readonly string[];
};
