// Canvas rendering for the vector-space demo. Takes a fully-resolved frame
// of state and a 2D context; does no animation bookkeeping of its own.

export type DrawPoint = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  hit: boolean;
  label: string;
};

// Each channel string is "r,g,b", read once from a CSS variable and reused
// inside rgba() calls at whatever alpha the moment calls for.
export type DrawColors = {
  fg: string;
  accent: string;
  hit: string;
  white: string;
};

export type DrawState = {
  width: number;
  height: number;
  dimensionLabels: [string, string, string, string];
  edges: [DrawPoint, DrawPoint][];
  points: DrawPoint[];
  query: { x: number; y: number; pulse: number };
  hitLines: DrawPoint[];
  hoverIndex: number;
  colors: DrawColors;
};

export function draw(ctx: CanvasRenderingContext2D, state: DrawState): void {
  const { width, height, colors } = state;
  ctx.clearRect(0, 0, width, height);

  ctx.font = '400 9px "IBM Plex Mono", monospace';
  ctx.fillStyle = `rgba(${colors.white},.28)`;
  const pad = 14;
  ctx.textAlign = "left";
  ctx.fillText(state.dimensionLabels[0].toUpperCase(), pad, pad + 4);
  ctx.textAlign = "right";
  ctx.fillText(state.dimensionLabels[1].toUpperCase(), width - pad, pad + 4);
  ctx.textAlign = "right";
  ctx.fillText(state.dimensionLabels[2].toUpperCase(), width - pad, height - pad);
  ctx.textAlign = "left";
  ctx.fillText(state.dimensionLabels[3].toUpperCase(), pad, height - pad);

  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${colors.white},.05)`;
  state.edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  state.hitLines.forEach((p) => {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${colors.hit},${0.3 * p.alpha})`;
    ctx.lineWidth = 1;
    ctx.moveTo(state.query.x, state.query.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  state.points.forEach((p, i) => {
    if (p.hit) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${colors.hit},${0.14 * p.alpha})`;
      ctx.arc(p.x, p.y, p.radius * 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = p.hit
      ? `rgba(${colors.hit},${p.alpha})`
      : `rgba(${colors.fg},${p.alpha})`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    if (i === state.hoverIndex) {
      ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillStyle = `rgba(${colors.fg},.95)`;
      ctx.textAlign = p.x > width * 0.6 ? "right" : "left";
      ctx.fillText(p.label, p.x + (p.x > width * 0.6 ? -10 : 10), p.y - 9);
    }
  });

  const { pulse } = state.query;
  ctx.beginPath();
  ctx.strokeStyle = `rgba(${colors.accent},${0.5 - pulse * 0.3})`;
  ctx.lineWidth = 1.2;
  ctx.arc(state.query.x, state.query.y, 12 + pulse * 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = `rgb(${colors.accent})`;
  ctx.arc(state.query.x, state.query.y, 4, 0, Math.PI * 2);
  ctx.fill();
}
