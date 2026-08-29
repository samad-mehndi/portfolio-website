import type { ReactNode } from "react";

type PanelProps = {
  children?: ReactNode;
  className?: string;
};

export default function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={`rounded-[20px] border border-line bg-linear-to-b from-white/[.055] to-white/[.015] backdrop-blur-[16px] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
