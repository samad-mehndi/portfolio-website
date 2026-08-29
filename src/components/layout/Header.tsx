"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import Button from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";

// Section anchors, not sourced content: these mirror the page's own
// section ids rather than carrying any copy of their own.
const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

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
          <Button href={profile.resumePath} small external>
            <DownloadIcon className="size-[13px]" />
            Resume
          </Button>
          <Button
            href={`mailto:${profile.email}`}
            small
            className="max-[560px]:hidden"
          >
            Email me
          </Button>
        </div>
      </div>
    </header>
  );
}
