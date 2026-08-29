// Pure projection math for the vector-space demo. No React, no DOM.

export type Point2D = {
  x: number;
  y: number;
};

// Radviz projection: places each dimension's unit anchor at `angles[d]`
// and returns the weighted average of those anchors, weighted by
// `weights[d]`. The result lands inside the unit disk.
export function project(weights: number[], angles: number[]): Point2D {
  let x = 0;
  let y = 0;
  let sum = 0;
  for (let d = 0; d < weights.length; d++) {
    x += weights[d] * Math.cos(angles[d]);
    y += weights[d] * Math.sin(angles[d]);
    sum += weights[d];
  }
  return { x: x / sum, y: y / sum };
}

// Deterministic seeded hash in [0, 1), stable across renders for the same
// index. Used to jitter overlapping points apart without them drifting on
// re-render.
export function jitter(index: number): number {
  const v = Math.sin(index * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

// Maps a unit-disk point to canvas pixel space, centred in (width, height),
// with an optional per-axis pixel offset for the ambient drift animation.
export function toScreen(
  point: Point2D,
  width: number,
  height: number,
  driftX = 0,
  driftY = 0
): Point2D {
  return {
    x: width / 2 + point.x * (width * 0.4) + driftX,
    y: height / 2 - point.y * (height * 0.4) + driftY,
  };
}
