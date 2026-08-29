"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Panel from "@/components/ui/Panel";
import { useReveal } from "@/lib/useReveal";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";

export default function Experience() {
  const { ref: headingRef, revealed: headingRevealed } =
    useReveal<HTMLDivElement>();
  const { ref: timelineRef, revealed: timelineRevealed } =
    useReveal<HTMLDivElement>();
  const { ref: stackRef, revealed: stackRevealed } =
    useReveal<HTMLDivElement>();

  return (
    <Section id="experience">
      <div
        ref={headingRef}
        className={`reveal mb-11 ${headingRevealed ? "in" : ""}`}
      >
        <Eyebrow>Background</Eyebrow>
        <h2 className="my-3.5">Where I have worked</h2>
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] items-start gap-14 max-[940px]:grid-cols-1 max-[940px]:gap-10">
        <div
          ref={timelineRef}
          className={`reveal flex flex-col ${timelineRevealed ? "in" : ""}`}
        >
          {experience.map((role, i) => (
            <div
              key={`${role.org}-${role.period}`}
              className={`grid grid-cols-[112px_1fr] gap-6 border-t border-line py-[26px] max-[940px]:grid-cols-1 max-[940px]:gap-2 ${
                i === experience.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="pt-1 font-mono text-[.72rem] tracking-[.04em] text-muted">
                {role.period}
              </div>
              <div>
                <h3 className="mb-1 text-[1.05rem]">{role.title}</h3>
                <div className="mb-2.5 text-[.82rem] text-accent">
                  {role.org}, {role.location}
                </div>
                <p className="text-[.92rem] text-muted">{role.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={stackRef} className={`reveal ${stackRevealed ? "in" : ""}`}>
          <Panel className="p-7">
            {skills.map((group, i) => (
              <div
                key={group.label}
                className={
                  i === 0
                    ? "pb-4"
                    : "border-t border-line py-4"
                }
              >
                <h4 className="mb-2.5 font-mono text-[.68rem] font-normal uppercase tracking-[.12em] text-muted">
                  {group.label}
                </h4>
                <p className="text-[.92rem] leading-[1.7]">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </Section>
  );
}
