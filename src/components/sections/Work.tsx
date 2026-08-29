"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReveal } from "@/lib/useReveal";
import { projects, workSection } from "@/content/projects";
import type { CompactProject, FeaturedProject } from "@/content/types";
import FeaturedProjectCard from "./work/FeaturedProjectCard";
import CompactProjectCard from "./work/CompactProjectCard";

export default function Work() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const featured = projects.filter(
    (p): p is FeaturedProject => p.tier === "featured"
  );
  const compact = projects.filter(
    (p): p is CompactProject => p.tier === "compact"
  );

  return (
    <Section id="work">
      <div
        ref={ref}
        className={`reveal mb-11 max-w-[60ch] ${revealed ? "in" : ""}`}
      >
        <Eyebrow>{workSection.eyebrow}</Eyebrow>
        <h2 className="my-3.5">{workSection.heading}</h2>
        <p className="text-[1.06rem] text-muted">{workSection.lead}</p>
      </div>

      <div className="flex flex-col gap-[18px]">
        {featured.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>

      <p className="mt-14 border-t border-line pt-[26px] font-mono text-[.68rem] uppercase tracking-[.14em] text-muted">
        {workSection.compactLabel}
      </p>

      <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {compact.map((project) => (
          <CompactProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
