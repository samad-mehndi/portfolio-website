"use client";

import Panel from "@/components/ui/Panel";
import { useReveal } from "@/lib/useReveal";
import type { CompactProject } from "@/content/types";

export default function CompactProjectCard({
  project,
}: {
  project: CompactProject;
}) {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <article ref={ref} className={`reveal ${revealed ? "in" : ""}`}>
      <Panel className="flex h-full flex-col p-6 transition-[transform,border-color] duration-300 ease-[ease] hover:-translate-y-[3px] hover:border-line-2">
        <h3 className="mb-1.5 text-[1.02rem]">{project.title}</h3>
        <p className="font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
          {project.meta}
        </p>
        <p className="mt-3.5 flex-1 text-[.9rem] text-muted">
          {project.summary}
        </p>
        <div className="mt-[18px] flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[6px] bg-white/[.04] px-2.5 py-[5px] font-mono text-[.68rem] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.links && project.links.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-2">
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
        )}
      </Panel>
    </article>
  );
}
