"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { rank, knnEdges, type RankedPoint } from "./similarity";
import { project, jitter, toScreen, type Point2D } from "./projection";
import { draw, type DrawPoint, type DrawColors } from "./draw";
import { ANGLES, DIMENSIONS, POINTS, QUERIES } from "./points";

const AUTO_ROTATE_MS = 6500;
const RESULT_COUNT = 5;
const KNN_K = 2;
const HOVER_RADIUS = 16;
const EASE = 0.12;

type AnimatedPoint = {
  base: Point2D;
  radius: number;
  alpha: number;
  targetRadius: number;
  targetAlpha: number;
  hit: boolean;
};

// "#rrggbb" -> "r,g,b", for composing into canvas rgba() strings.
function hexToRgbTriplet(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function readColor(name: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return hexToRgbTriplet(value);
}

export function useVectorSpace() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animatedRef = useRef<AnimatedPoint[]>([]);
  const edgesRef = useRef<[number, number][]>([]);
  const hoverRef = useRef(-1);
  const sizeRef = useRef({ width: 0, height: 0 });
  const colorsRef = useRef<DrawColors>({
    fg: "",
    accent: "",
    hit: "",
    white: "255,255,255",
  });
  const reduceMotionRef = useRef(false);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userInteractedRef = useRef(false);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<RankedPoint[]>(() =>
    computeRanking(0)
  );

  function renderFrame(now = 0) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = sizeRef.current;
    const t = reduceMotionRef.current ? 0 : (now - startRef.current) / 1000;
    const drift = (i: number) =>
      reduceMotionRef.current ? 0 : Math.sin(t * 0.5 + i) * 2.2;

    const screenPoints: DrawPoint[] = animatedRef.current.map((p, i) => {
      const { x, y } = toScreen(p.base, width, height, drift(i), drift(i + 7));
      return {
        x,
        y,
        radius: p.radius,
        alpha: p.alpha,
        hit: p.hit,
        label: POINTS[i].label,
      };
    });

    const edges: [DrawPoint, DrawPoint][] = edgesRef.current.map(([a, b]) => [
      screenPoints[a],
      screenPoints[b],
    ]);
    const hitLines = screenPoints.filter((p) => p.hit);

    const queryUnit = project(QUERIES[activeIndexRef.current].weights, ANGLES);
    const queryScreen = toScreen(queryUnit, width, height);
    const pulse = reduceMotionRef.current ? 0 : (Math.sin(t * 2) + 1) / 2;

    draw(ctx, {
      width,
      height,
      dimensionLabels: DIMENSIONS as [string, string, string, string],
      edges,
      points: screenPoints,
      query: { x: queryScreen.x, y: queryScreen.y, pulse },
      hitLines,
      hoverIndex: hoverRef.current,
      colors: colorsRef.current,
    });
  }

  function computeRanking(index: number): RankedPoint[] {
    const weights = POINTS.map((p) => p.weights);
    return rank(QUERIES[index].weights, weights, RESULT_COUNT);
  }

  // Mutates animatedRef's per-point targets from a ranking. A ref mutation,
  // not React state, so it's safe to call from the mount effect directly.
  function applyRankingToPoints(top: RankedPoint[]) {
    const rankByIndex = new Map(top.map((r, k) => [r.index, k]));
    animatedRef.current.forEach((p, i) => {
      const k = rankByIndex.get(i);
      const isHit = k !== undefined;
      p.hit = isHit;
      p.targetRadius = isHit ? 7 - k! * 0.5 : 2.6;
      p.targetAlpha = isHit ? 1 : 0.18;
      if (reduceMotionRef.current) {
        p.radius = p.targetRadius;
        p.alpha = p.targetAlpha;
      }
    });
  }

  function selectQuery(index: number, userInitiated: boolean) {
    activeIndexRef.current = index;
    setActiveIndex(index);
    const top = computeRanking(index);
    setResults(top);
    applyRankingToPoints(top);
    if (userInitiated) {
      userInteractedRef.current = true;
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    }
    if (reduceMotionRef.current) renderFrame();
  }

  function measure() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    sizeRef.current = { width: rect.width, height: rect.height };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduceMotionRef.current) renderFrame();
  }

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    colorsRef.current = {
      fg: readColor("--fg"),
      accent: readColor("--accent"),
      hit: readColor("--hit"),
      white: "255,255,255",
    };

    animatedRef.current = POINTS.map((p, i) => {
      const projected = project(p.weights, ANGLES);
      return {
        base: {
          x: projected.x + (jitter(i) - 0.5) * 0.1,
          y: projected.y + (jitter(i + 99) - 0.5) * 0.1,
        },
        radius: 3,
        alpha: 0.35,
        targetRadius: 3,
        targetAlpha: 0.35,
        hit: false,
      };
    });
    edgesRef.current = knnEdges(
      POINTS.map((p) => p.weights),
      KNN_K
    );

    startRef.current = performance.now();
    applyRankingToPoints(computeRanking(0));
    measure();
    window.addEventListener("resize", measure);

    function tick(now: number) {
      animatedRef.current.forEach((p) => {
        p.radius += (p.targetRadius - p.radius) * EASE;
        p.alpha += (p.targetAlpha - p.alpha) * EASE;
      });
      renderFrame(now);
      rafRef.current = requestAnimationFrame(tick);
    }

    if (reduceMotionRef.current) {
      renderFrame();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    autoRotateRef.current = setInterval(() => {
      if (reduceMotionRef.current || userInteractedRef.current) {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        return;
      }
      selectQuery((activeIndexRef.current + 1) % QUERIES.length, false);
    }, AUTO_ROTATE_MS);

    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafRef.current);
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onCanvasMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    let best = -1;
    let bestDist = HOVER_RADIUS;
    animatedRef.current.forEach((p, i) => {
      const { x, y } = toScreen(p.base, sizeRef.current.width, sizeRef.current.height);
      const dist = Math.hypot(x - mx, y - my);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    hoverRef.current = best;
    canvas.style.cursor = best >= 0 ? "pointer" : "default";
    if (reduceMotionRef.current) renderFrame();
  }

  function onCanvasMouseLeave() {
    hoverRef.current = -1;
    if (canvasRef.current) canvasRef.current.style.cursor = "default";
    if (reduceMotionRef.current) renderFrame();
  }

  return {
    canvasRef,
    activeIndex,
    results,
    selectQuery: (index: number) => selectQuery(index, true),
    onCanvasMouseMove,
    onCanvasMouseLeave,
  };
}
