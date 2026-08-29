"use client";

import { Fragment, useState } from "react";
import Section from "@/components/layout/Section";
import Panel from "@/components/ui/Panel";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import VectorSpace from "@/features/vector-space/VectorSpace";
import { profile } from "@/content/profile";

function Avatar() {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="avatar-in relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-full border border-line-2 bg-linear-[150deg] from-[rgba(122,140,255,.35)] to-[rgba(240,180,41,.22)] shadow-[0_12px_34px_-12px_rgba(0,0,0,.9)]">
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink-2"
      >
        {initials}
      </span>
      {!imgFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/samad.jpg"
          alt={profile.name}
          onError={() => setImgFailed(true)}
          className="relative z-10 block h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <Section id="hero" padding="hero">
      <div className="grid grid-cols-[1fr_1.02fr] items-center gap-14 max-[940px]:grid-cols-1 max-[940px]:gap-10">
        <div>
          <div className="flex items-center gap-3.5">
            <Avatar />
            <div className="flex flex-col gap-1.5">
              <Eyebrow>{profile.role}</Eyebrow>
              <span className="inline-flex items-center gap-2 font-mono text-[.72rem] tracking-[.04em] text-muted">
                <span className="status-dot" aria-hidden="true" />
                {profile.availability}
              </span>
            </div>
          </div>

          <h1 className="my-[22px]">
            {profile.headline.map((line, i) => {
              const rendered = line.segments.map((segment, j) =>
                segment.accent ? (
                  <span key={j} className="text-accent">
                    {segment.text}
                  </span>
                ) : (
                  <Fragment key={j}>{segment.text}</Fragment>
                )
              );
              if (line.small) {
                return (
                  <span
                    key={i}
                    className="mt-[.22em] block text-[clamp(1.2rem,3vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.02em]"
                  >
                    {rendered}
                  </span>
                );
              }
              return (
                <Fragment key={i}>
                  {rendered}
                  <br />
                </Fragment>
              );
            })}
          </h1>

          <p className="max-w-[56ch] text-[1.06rem] text-muted">
            {profile.lead}
          </p>

          <div className="mt-[30px] flex flex-wrap gap-3">
            <Button href="#work" variant="primary">
              See the work
              <ArrowRightIcon className="size-[15px]" />
            </Button>
            <Button href={`mailto:${profile.email}`}>Get in touch</Button>
          </div>

          <div className="mt-[52px] grid grid-cols-4 border-t border-line max-[940px]:grid-cols-2 max-[940px]:gap-x-3">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="pt-[18px] pr-4 max-[940px]:pt-4 max-[940px]:pr-2 max-[940px]:pb-3"
              >
                <b className="block font-display text-[1.5rem] font-semibold not-italic tracking-[-.03em]">
                  {stat.value}
                </b>
                <span className="font-mono text-[.66rem] uppercase tracking-[.1em] text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Panel>
          <VectorSpace />
        </Panel>
      </div>
    </Section>
  );
}
