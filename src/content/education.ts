import type { Degree } from "./types";

export const education: Degree[] = [
  {
    degree: "MS, Computer Engineering",
    school: "The University of Texas at Dallas",
    // No `location`: v0.html has no location line for this entry (unlike
    // the B.Tech entry below, which pairs "Delhi, India" with its period).
    // `period` carries the source's full "Machine learning focus · May
    // 2026" line verbatim rather than splitting off a location that isn't
    // there.
    period: "Machine learning focus · May 2026",
    description:
      "Machine learning and NLP are where the search and retrieval projects on this page started, and computer architecture is where the GPU kernel work started.",
    coursework: [
      "Machine Learning",
      "Natural Language Processing",
      "Algorithms",
      "Data Structures",
      "Computer Architecture",
      "Database Design",
    ],
  },
  {
    degree: "B.Tech, Electrical and Electronics Engineering",
    school: "Guru Gobind Singh Indraprastha University",
    location: "Delhi, India",
    period: "Sep 2020",
    description:
      "An electronics degree rather than a computer science one. Coming to software from the hardware side is part of why I am comfortable at the layers most application work never touches, from query plans down to GPU kernels.",
  },
];
