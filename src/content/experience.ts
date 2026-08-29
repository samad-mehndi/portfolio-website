import type { Role } from "./types";

export const experience: Role[] = [
  {
    title: "Software Engineer",
    org: "Think Future Technologies",
    location: "Gurugram, India",
    period: "Aug 2021 – Apr 2024",
    description:
      "Built and maintained RESTful APIs for ingestion, validation, and transformation workflows carrying more than 20,000 requests a day, secured with JWT and OAuth2. Cut API response times by around 40 percent through MongoDB indexing and aggregation pipeline work, refactored services into reusable modules that removed roughly 30 percent of duplicated code, and owned production debugging at about 20 issues a month. Shipped around four releases a month alongside product, QA, and DevOps, with Jenkins handling builds and deploys.",
  },
  {
    title: "Software Engineering Intern",
    org: "Think Future Technologies",
    location: "Gurugram, India",
    period: "May – Jul 2021",
    description:
      "Built a movie listing application with browsing and filtering, then moved onto backend work: REST endpoints for email notifications, camera alerts, and authentication, plus real time delivery over WebSockets.",
  },
  {
    title: "Teaching Assistant",
    org: "Coding Ninjas",
    location: "Gurugram, India",
    period: "Aug – Dec 2020",
    description:
      "Worked through more than 500 debugging and algorithmic problems with students learning C++, algorithms, and full stack web development. Explaining low level execution behaviour and performance trade-offs out loud is still the best practice I have had at it.",
  },
];
