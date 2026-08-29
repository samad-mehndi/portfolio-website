"use client";

import Section from "@/components/layout/Section";
import Panel from "@/components/ui/Panel";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { MailIcon, DownloadIcon } from "@/components/ui/icons";
import { useReveal } from "@/lib/useReveal";
import { profile, contactSection } from "@/content/profile";

export default function Contact() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const linkedin = profile.links.find((link) => link.label === "LinkedIn");
  const socials = [
    ...profile.links,
    { label: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <Section id="contact">
      <div ref={ref} className={`reveal text-center ${revealed ? "in" : ""}`}>
        <Panel className="px-8 py-16 max-[940px]:px-[22px] max-[940px]:py-11">
          <Eyebrow>{contactSection.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-[18px] mb-4 max-w-[16ch]">
            {contactSection.heading}
          </h2>
          <p className="mx-auto max-w-[56ch] text-[1.06rem] text-muted">
            {contactSection.lead}
          </p>

          <div className="mt-[34px] flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${profile.email}`} variant="primary">
              {profile.email}
              <MailIcon className="size-[15px]" />
            </Button>
            <Button href={profile.resumePath} external>
              Download resume
              <DownloadIcon className="size-[15px]" />
            </Button>
            {linkedin && (
              <Button href={linkedin.href} external>
                Connect on LinkedIn
              </Button>
            )}
          </div>

          <div className="mt-[38px] flex flex-wrap justify-center gap-[26px] border-t border-line pt-[26px]">
            {socials.map((social) => {
              const isMailto = social.href.startsWith("mailto:");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-2 font-mono text-[.78rem] text-muted transition-colors duration-200 ease-[ease] hover:text-fg"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </Panel>
      </div>
    </Section>
  );
}
