"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

// Section anchors, not sourced content: these mirror the page's own
// section ids rather than carrying any copy of their own.
const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const BUTTON = "inline-flex items-center gap-[9px] rounded-full border border-line-2 bg-white/[.04] px-[15px] py-2 text-[.82rem] font-medium text-fg transition-[transform,background-color,border-color] duration-200 ease-[ease] hover:-translate-y-0.5 hover:border-white/[.28] hover:bg-white/[.09]";

export default function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[14px] transition-[background-color,border-color] duration-300 ease-[ease] ${
        stuck ? "border-line bg-ink/[.9]" : "border-transparent bg-ink/[.72]"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
        <a
          href="#top"
          className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]"
        >
          {profile.name}
          <span className="ml-[10px] font-mono text-[.72rem] uppercase tracking-[.1em] text-muted">
            {profile.location}
          </span>
        </a>

        <nav className="flex gap-7 max-[940px]:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[.88rem] text-muted transition-colors duration-200 ease-[ease] hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[9px]">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className={BUTTON}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[13px]"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={`${BUTTON} max-[560px]:hidden`}
          >
            Email me
          </a>
        </div>
      </div>
    </header>
  );
}
