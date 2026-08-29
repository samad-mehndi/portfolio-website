// Pure similarity math for the vector-space demo. No React, no DOM.

export function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-9);
}

export type RankedPoint = {
  index: number;
  score: number;
};

export function rank(
  query: number[],
  points: number[][],
  k: number
): RankedPoint[] {
  return points
    .map((weights, index) => ({ index, score: cosine(query, weights) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

// Each point's k nearest neighbours by cosine similarity, as deduplicated
// [i, j] index pairs (i < j).
export function knnEdges(points: number[][], k: number): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];

  points.forEach((a, i) => {
    const neighbours = points
      .map((b, j) => ({ j, score: cosine(a, b) }))
      .filter(({ j }) => j !== i)
      .sort((x, y) => y.score - x.score)
      .slice(0, k);

    neighbours.forEach(({ j }) => {
      const pair: [number, number] = i < j ? [i, j] : [j, i];
      const key = `${pair[0]}-${pair[1]}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push(pair);
      }
    });
  });

  return edges;
}
