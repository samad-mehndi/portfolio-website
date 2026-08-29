import type { Project } from "./types";

// Copy for the Work section's own heading block and tier divider, ported
// verbatim from v0.html. Lives here rather than profile.ts since it's
// specific to presenting this file's data, not the site-wide profile.
export const workSection = {
  eyebrow: "Selected work",
  heading: "Things I built and what came out of them",
  lead: "These span front end work, backend services, retrieval, deep learning, and GPU kernels. Each one started with a problem the obvious approach could not solve, and the interesting part is usually what had to change.",
  compactLabel: "Also built",
};

// Order matches the order projects appear in docs/reference/v0.html:
// five featured, then three compact under "Also built".
export const projects: Project[] = [
  {
    id: "jobmap-ai",
    title: "JobMap AI",
    meta: "Geospatial job intelligence · Jun 2026",
    tier: "featured",
    links: [
      { label: "Live", href: "https://jobmap-ai.vercel.app" },
      { label: "GitHub", href: "https://github.com/samad-mehndi/jobmapAI" },
    ],
    problem: [
      {
        text: "Job boards tell you the title and the company. They do not tell you whether the role actually matches your resume, or where it sits relative to where you live.",
      },
    ],
    approach: [
      {
        text: "A Next.js and Mapbox GL front end over a FastAPI backend running ",
      },
      { text: "two LangGraph pipelines", emphasis: true },
      {
        text: ", one that parses postings and one that matches resumes, with ",
      },
      { text: "pgvector HNSW similarity search", emphasis: true },
      {
        text: ", Nominatim geocoding, and real listings from the JSearch API on Neon Postgres.",
      },
    ],
    result: [
      {
        text: "Roles plotted on a map and ranked by semantic fit instead of keyword overlap, with relevant matches surfacing in under a second despite wording mismatches between a resume and a posting. Getting there meant dropping PostGIS for plain lat and lng columns to survive an IPv6 deployment constraint, and replacing SQL LIKE filtering with vector similarity.",
      },
    ],
    tags: [
      "Next.js",
      "Mapbox GL",
      "FastAPI",
      "LangGraph",
      "pgvector",
      "Neon Postgres",
      "Railway",
    ],
  },
  {
    id: "wellness-search-engine",
    title: "Wellness Search Engine",
    meta: "Semantic search · May 2026",
    tier: "featured",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/wellness-search-engine",
      },
    ],
    problem: [
      {
        text: "A 143,000 page wellness crawl ranked with a classical TF-IDF vector space model. It matched keywords well and answered questions badly, so the top results were often on topic and still useless.",
      },
    ],
    approach: [
      { text: "I rebuilt the retrieval stack end to end: " },
      {
        text: "hybrid BGE-M3 dense and sparse retrieval over a FAISS HNSW index",
        emphasis: true,
      },
      {
        text: ", cross encoder reranking on the shortlist, PageRank and HITS as authority signals, KMeans topic clustering, and LLaMA through Groq for query expansion and answer generation.",
      },
    ],
    result: [
      { text: "Roughly " },
      { text: "0.8 second queries", emphasis: true },
      {
        text: " across the full collection, served through a three panel interface that puts my results next to live Google and Bing so the ranking has to defend itself.",
      },
    ],
    tags: [
      "BGE-M3",
      "FAISS HNSW",
      "Cross-encoder rerank",
      "PageRank / HITS",
      "Groq",
      "Flask",
      "Python",
    ],
  },
  {
    id: "billing-code-assistant",
    title: "Multi-agent billing code assistant",
    meta: "Applied AI · In progress",
    tier: "featured",
    links: [],
    status: "Building now",
    problem: [
      {
        text: "Assigning billing codes means reading unstructured notes, finding candidate codes, and checking them against rules. One model doing all three at once is hard to trust and harder to debug.",
      },
    ],
    approach: [
      {
        text: "Splitting the job across specialised agents so extraction, code lookup, and validation each stay small enough to inspect, with retrieval over the code set rather than relying on model recall.",
      },
    ],
    result: [
      {
        text: "In active development. Ask me about it and I will show you where it currently breaks.",
      },
    ],
    tags: ["Multi-agent", "Retrieval", "Python"],
  },
  {
    id: "gpu-kernel-generation",
    title: "AI-Assisted GPU Kernel Generation",
    meta: "Graduate research · Sep 2025",
    tier: "featured",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/triton-nondeterminism",
      },
    ],
    problem: [
      {
        text: "Parallel reductions are nondeterministic. Change the concurrency and the same input gives a different answer, so a kernel can be fast and quietly wrong, and the error only surfaces once it is deep inside a model.",
      },
    ],
    approach: [
      { text: "Wrote both deterministic and atomic " },
      { text: "Triton", emphasis: true },
      {
        text: " kernels for the same reductions and measured the drift between them in ",
      },
      { text: "max ULP difference", emphasis: true },
      {
        text: ", then built a logging and benchmarking harness to tie execution configuration to performance and numerical stability together.",
      },
    ],
    result: [
      { text: "Up to " },
      { text: "34 ULP of variation", emphasis: true },
      {
        text: " across configurations, which puts a number on a trade-off that usually gets described in adjectives. Useful for anyone deciding how much reproducibility an inference path can afford to give up.",
      },
    ],
    tags: [
      "Triton",
      "CUDA",
      "GPU kernels",
      "Numerical stability",
      "Benchmarking",
    ],
  },
  {
    id: "kidney-disease-classification",
    title: "Kidney Disease Classification",
    meta: "Deep learning · May 2025",
    tier: "featured",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/Kidney-Disease-Classification-Project",
      },
    ],
    problem: [
      {
        text: "Classifying kidney disease from CT scans is the easy half. The hard half is making the pipeline reproducible, so a result from three weeks ago can still be explained and repeated.",
      },
    ],
    approach: [
      { text: "An end to end pipeline in " },
      { text: "TensorFlow and Keras", emphasis: true },
      {
        text: ", with modular training and evaluation stages driven by YAML configuration, ",
      },
      { text: "DVC", emphasis: true },
      { text: " for data versioning, " },
      { text: "MLflow", emphasis: true },
      {
        text: " for experiment tracking, and automated evaluation and deployment through Flask on AWS EC2.",
      },
    ],
    result: [
      { text: "87.1 percent validation accuracy at 0.30 loss", emphasis: true },
      {
        text: ", and more usefully, every run traceable back to the exact data and configuration that produced it.",
      },
    ],
    tags: ["TensorFlow", "Keras", "DVC", "MLflow", "Flask", "AWS EC2"],
  },
  {
    id: "real-estate-listings",
    title: "Real Estate Listings",
    meta: "Full stack · MERN",
    tier: "compact",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/real-estate-app",
      },
    ],
    summary:
      "A property listing application split into a React client and an Express API, with Mongoose models for listings and users, and JWT authentication over hashed credentials and cookie sessions.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    id: "mental-health-chatbot",
    title: "Mental health support chatbot",
    meta: "Natural language processing",
    tier: "compact",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/NLP-mental-health-chatbot",
      },
    ],
    summary:
      "An earlier NLP project centred on working out what a message is actually asking for and responding usefully. It is where I hit the limits of keyword matching, which is what pushed me toward embeddings.",
    tags: ["NLP", "Python", "Transformers"],
  },
  {
    id: "localfix",
    title: "LocalFix",
    meta: "IT operations platform · In design",
    tier: "compact",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/samad-mehndi/LocalFix",
      },
    ],
    summary:
      "Ticketing, per business asset tracking, and a monitoring agent with threshold alerts, split across a business portal, a technician portal, and an ops dashboard. Architecture is settled, build is starting.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Redis and BullMQ", "WebSockets"],
  },
];
