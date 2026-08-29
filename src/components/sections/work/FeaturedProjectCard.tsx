"use client";

import { Fragment } from "react";
import Panel from "@/components/ui/Panel";
import { useReveal } from "@/lib/useReveal";
import type { FeaturedProject, RichParagraph } from "@/content/types";

const TERMS: { key: "problem" | "approach" | "result"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "result", label: "Result" },
];

function RichText({ paragraph }: { paragraph: RichParagraph }) {
  return (
    <>
      {paragraph.map((segment, i) =>
        segment.emphasis ? (
          <b key={i} className="font-medium text-fg">
            {segment.text}
          </b>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        )
      )}
    </>
  );
}

export default function FeaturedProjectCard({
  project,
}: {
  project: FeaturedProject;
}) {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <article ref={ref} className={`reveal ${revealed ? "in" : ""}`}>
      <Panel className="p-[30px] transition-[transform,border-color] duration-300 ease-[ease] hover:-translate-y-[3px] hover:border-line-2 max-[940px]:p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h3 className="mb-1.5">{project.title}</h3>
            <p className="font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
              {project.meta}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.status && (
              <span className="rounded-full border border-hit/40 bg-hit/[.08] px-3 py-1.5 font-mono text-[.72rem] text-hit">
                {project.status}
              </span>
            )}
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[.72rem] text-muted transition-colors duration-200 ease-[ease] hover:border-accent hover:bg-accent/10 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-[96px_1fr] gap-x-5 gap-y-3.5 border-t border-line pt-[22px] max-[940px]:grid-cols-1 max-[940px]:gap-x-0 max-[940px]:gap-y-1.5">
          {TERMS.map(({ key, label }) => (
            <Fragment key={key}>
              <dt className="pt-[3px] font-mono text-[.68rem] uppercase tracking-[.12em] text-accent">
                {label}
              </dt>
              <dd className="text-[.95rem] text-muted max-[940px]:mb-3">
                <RichText paragraph={project[key]} />
              </dd>
            </Fragment>
          ))}
        </dl>

        <div className="mt-[22px] flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[6px] bg-white/[.04] px-2.5 py-[5px] font-mono text-[.68rem] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </Panel>
    </article>
  );
}
