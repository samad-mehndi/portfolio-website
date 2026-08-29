"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Panel from "@/components/ui/Panel";
import { useReveal } from "@/lib/useReveal";
import { education } from "@/content/education";
import type { Degree } from "@/content/types";

function EducationCard({ degree }: { degree: Degree }) {
  const { ref, revealed } = useReveal<HTMLElement>();
  const hasCoursework = !!degree.coursework && degree.coursework.length > 0;

  return (
    <article ref={ref} className={`reveal ${revealed ? "in" : ""}`}>
      <Panel className="flex h-full flex-col p-[30px] max-[940px]:p-[22px]">
        <div className="mb-2 font-display text-[1.28rem] font-semibold tracking-[-0.02em]">
          {degree.degree}
        </div>
        <div className="text-[.94rem] text-accent">{degree.school}</div>
        <div className="mt-3.5 font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
          {degree.location ? `${degree.location} · ${degree.period}` : degree.period}
        </div>
        <p className="mt-4 flex-1 text-[.92rem] text-muted">
          {degree.description}
        </p>
        {hasCoursework && (
          <div className="mt-[22px] flex flex-wrap gap-[7px] border-t border-line pt-[18px]">
            {degree.coursework!.map((item) => (
              <span
                key={item}
                className="rounded-[6px] bg-white/[.04] px-2.5 py-[5px] font-mono text-[.68rem] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </Panel>
    </article>
  );
}

export default function Education() {
  const { ref: headingRef, revealed: headingRevealed } =
    useReveal<HTMLDivElement>();

  return (
    <Section id="education">
      <div
        ref={headingRef}
        className={`reveal mb-11 ${headingRevealed ? "in" : ""}`}
      >
        <Eyebrow>Education</Eyebrow>
        <h2 className="my-3.5">What I studied</h2>
      </div>

      <div className="grid grid-cols-2 gap-[18px] max-[940px]:grid-cols-1">
        {education.map((degree) => (
          <EducationCard key={degree.degree} degree={degree} />
        ))}
      </div>
    </Section>
  );
}
