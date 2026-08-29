import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
};

export default function Eyebrow({ children }: EyebrowProps) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[.72rem] uppercase tracking-[.14em] text-muted before:h-px before:w-[22px] before:bg-accent before:opacity-80 before:content-['']">
      {children}
    </span>
  );
}
