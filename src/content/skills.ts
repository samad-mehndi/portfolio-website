import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C/C++", "Java", "Scala", "SQL"],
  },
  {
    label: "Machine learning and AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Triton",
      "LangGraph",
      "FAISS",
      "pgvector",
      "BGE-M3 embeddings",
      "cross-encoder reranking",
      "RAG pipelines",
      "MLflow",
      "DVC",
    ],
  },
  {
    label: "Backend",
    items: [
      "FastAPI",
      "Django",
      "Flask",
      "Node.js",
      "Express",
      "REST API design",
      "microservices",
      "WebSockets",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "ETL", "Hadoop"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Mapbox GL JS"],
  },
  {
    label: "Infrastructure",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "Git",
      "Linux",
      "Railway",
      "Vercel",
    ],
  },
];
