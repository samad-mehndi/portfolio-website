// Corpus for the vector-space demo, ported verbatim from
// docs/reference/v0.html. Every point is something actually built; the
// weight vectors are what the ranking and layout are computed from.

export type CorpusPoint = {
  label: string;
  project: string;
  weights: number[];
};

export type QueryDefinition = {
  label: string;
  weights: number[];
};

// machine learning, data, backend, frontend
export const DIMENSIONS = ["machine learning", "data", "backend", "frontend"];

// top-left, top-right, bottom-right, bottom-left
export const ANGLES = [
  Math.PI * 0.75,
  Math.PI * 0.25,
  -Math.PI * 0.25,
  -Math.PI * 0.75,
];

export const POINTS: CorpusPoint[] = [
  { label: "Hybrid dense and sparse retrieval", project: "Wellness Search Engine", weights: [0.9, 0.6, 0.3, 0.05] },
  { label: "FAISS HNSW index", project: "Wellness Search Engine", weights: [0.7, 0.7, 0.5, 0.02] },
  { label: "Cross-encoder reranking", project: "Wellness Search Engine", weights: [0.95, 0.4, 0.2, 0.05] },
  { label: "PageRank and HITS authority", project: "Wellness Search Engine", weights: [0.5, 0.8, 0.35, 0.05] },
  { label: "KMeans topic clustering", project: "Wellness Search Engine", weights: [0.8, 0.7, 0.2, 0.1] },
  { label: "LLaMA query expansion", project: "Wellness Search Engine", weights: [0.9, 0.3, 0.3, 0.1] },
  { label: "Incremental indexing", project: "Wellness Search Engine", weights: [0.3, 0.8, 0.7, 0.05] },
  { label: "143K page crawl pipeline", project: "Wellness Search Engine", weights: [0.1, 0.95, 0.7, 0.05] },
  { label: "Three panel comparison UI", project: "Wellness Search Engine", weights: [0.05, 0.15, 0.15, 0.95] },
  { label: "Ranking evaluation", project: "Wellness Search Engine", weights: [0.7, 0.8, 0.2, 0.05] },
  { label: "LangGraph job parser agent", project: "JobMap AI", weights: [0.85, 0.4, 0.4, 0.1] },
  { label: "LangGraph resume matcher", project: "JobMap AI", weights: [0.85, 0.4, 0.3, 0.2] },
  { label: "pgvector similarity search", project: "JobMap AI", weights: [0.6, 0.7, 0.6, 0.05] },
  { label: "Nominatim geocoding", project: "JobMap AI", weights: [0.05, 0.6, 0.6, 0.4] },
  { label: "Mapbox GL map interface", project: "JobMap AI", weights: [0.02, 0.2, 0.1, 0.95] },
  { label: "Next.js front end", project: "JobMap AI", weights: [0.02, 0.05, 0.25, 0.95] },
  { label: "FastAPI service layer", project: "JobMap AI", weights: [0.1, 0.2, 0.9, 0.15] },
  { label: "Neon Postgres on Railway", project: "JobMap AI", weights: [0.02, 0.6, 0.9, 0.05] },
  { label: "JSearch data ingestion", project: "JobMap AI", weights: [0.1, 0.85, 0.6, 0.1] },
  { label: "Multi-agent billing pipeline", project: "Billing assistant", weights: [0.85, 0.4, 0.5, 0.15] },
  { label: "RESTful API design", project: "Think Future Technologies", weights: [0.02, 0.2, 0.9, 0.35] },
  { label: "MongoDB query tuning", project: "Think Future Technologies", weights: [0.02, 0.75, 0.9, 0.05] },
  { label: "Production debugging", project: "Think Future Technologies", weights: [0.05, 0.2, 0.85, 0.35] },
  { label: "Node.js and Express services", project: "Think Future Technologies", weights: [0.02, 0.15, 0.9, 0.4] },
  { label: "React interfaces", project: "Think Future Technologies", weights: [0.02, 0.05, 0.2, 0.95] },
  { label: "Triton reduction kernels", project: "Graduate research", weights: [0.6, 0.2, 0.9, 0.02] },
  { label: "Floating point benchmarking", project: "Graduate research", weights: [0.5, 0.5, 0.85, 0.02] },
  { label: "Teaching C++ and algorithms", project: "Coding Ninjas", weights: [0.1, 0.15, 0.5, 0.35] },
  { label: "CNN image classification", project: "Kidney Disease Classification", weights: [0.95, 0.6, 0.25, 0.1] },
  { label: "Conversational NLP system", project: "Mental health chatbot", weights: [0.9, 0.4, 0.35, 0.3] },
  { label: "Multi-tenant ticketing design", project: "LocalFix", weights: [0.05, 0.3, 0.85, 0.6] },
  { label: "MERN property listing app", project: "Real Estate Listings", weights: [0.02, 0.25, 0.85, 0.75] },
];

export const QUERIES: QueryDefinition[] = [
  { label: "machine learning work", weights: [1, 0.4, 0.3, 0.1] },
  { label: "data pipelines", weights: [0.3, 1, 0.5, 0.1] },
  { label: "backend and APIs", weights: [0.1, 0.25, 1, 0.25] },
  { label: "front end and product", weights: [0.05, 0.1, 0.25, 1] },
];
