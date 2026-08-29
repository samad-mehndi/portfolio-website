export type Link = {
  label: string;
  href: string;
};

export type TextSegment = {
  text: string;
  emphasis?: boolean;
};

// A paragraph as an ordered list of segments. `emphasis: true` marks text
// that was a <b> span in the source copy. Components must render each
// segment in order (emphasis ones as <strong> or equivalent) and must not
// flatten the segments back into one string first, since that throws away
// which words were emphasized.
export type RichParagraph = TextSegment[];

export type FeaturedProject = {
  id: string;
  title: string;
  meta: string;
  tier: "featured";
  links: Link[];
  problem: RichParagraph;
  approach: RichParagraph;
  result: RichParagraph;
  tags: string[];
  status?: string;
};

export type CompactProject = {
  id: string;
  title: string;
  meta: string;
  tier: "compact";
  links?: Link[];
  summary: string;
  tags: string[];
};

export type Project = FeaturedProject | CompactProject;

export type Role = {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
};

export type Degree = {
  degree: string;
  school: string;
  location: string;
  period: string;
  description: string;
  coursework?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type HeadlineSegment = {
  text: string;
  accent?: boolean;
};

// One line of the hero headline. `small: true` marks the third line, which
// renders at a smaller size than the first two.
export type HeadlineLine = {
  segments: HeadlineSegment[];
  small?: boolean;
};

export type Stat = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  location: string;
  // The eyebrow label in the hero identity row, e.g. "Software Engineer".
  // Distinct from the `Role` type above (past positions in experience.ts).
  role: string;
  availability: string;
  headline: HeadlineLine[];
  lead: string;
  stats: Stat[];
  email: string;
  links: Link[];
  resumePath: string;
};
