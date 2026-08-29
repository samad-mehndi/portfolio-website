"use client";

import type { CSSProperties } from "react";
import { POINTS, QUERIES } from "./points";
import { useVectorSpace } from "./useVectorSpace";

export default function VectorSpace() {
  const {
    canvasRef,
    activeIndex,
    results,
    selectQuery,
    onCanvasMouseMove,
    onCanvasMouseLeave,
  } = useVectorSpace();

  return (
    <div className="overflow-hidden p-5">
      <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
        <strong className="font-display text-base font-semibold">
          Ask my work a question
        </strong>
        <em className="font-mono text-[.68rem] not-italic tracking-[.04em] text-muted">
          cosine similarity, ranked live
        </em>
      </div>

      <div
        role="group"
        aria-label="Example queries"
        className="mb-4 flex flex-wrap gap-2"
      >
        {QUERIES.map((query, i) => (
          <button
            key={query.label}
            type="button"
            aria-pressed={i === activeIndex}
            onClick={() => selectQuery(i)}
            className={`rounded-full border px-3 py-[7px] font-mono text-[.72rem] transition-colors duration-200 ${
              i === activeIndex
                ? "border-hit bg-hit font-medium text-ink-2"
                : "border-line bg-white/[.03] text-muted hover:border-line-2 hover:text-fg"
            }`}
          >
            {query.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[14px] border border-line bg-black/[.24]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          onMouseMove={onCanvasMouseMove}
          onMouseLeave={onCanvasMouseLeave}
          className="block h-[290px] w-full max-[940px]:h-[240px]"
        />
      </div>

      <ol aria-live="polite" className="mt-4 flex flex-col gap-[9px]">
        {results.map((result, k) => {
          const point = POINTS[result.index];
          const maxScore = results[0].score;
          const minScore = results[results.length - 1].score;
          const width = `${30 + ((result.score - minScore) / (maxScore - minScore || 1)) * 70}%`;
          const delay = `${k * 60}ms`;

          return (
            <li
              key={result.index}
              style={{ animationDelay: delay }}
              className="result-row grid grid-cols-[22px_1fr_auto] items-center gap-3"
            >
              <span className="font-mono text-[.7rem] text-muted">
                {String(k + 1).padStart(2, "0")}
              </span>
              <span className="text-[.86rem] leading-[1.35]">
                {point.label}
                <small className="mt-0.5 block font-mono text-[.65rem] tracking-[.05em] text-muted">
                  {point.project}
                </small>
              </span>
              <span className="font-mono text-[.72rem] text-hit">
                {result.score.toFixed(3)}
              </span>
              <span className="col-start-2 col-end-4 -mt-1 h-0.5 rounded-[2px] bg-white/[.08]">
                <span
                  style={{ "--w": width, animationDelay: delay } as CSSProperties}
                  className="score-bar-fill block h-full rounded-[2px] bg-linear-to-r from-accent to-hit"
                />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
