import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  small?: boolean;
  external?: boolean;
  className?: string;
};

const BASE =
  "inline-flex items-center gap-[9px] rounded-full font-medium transition-[transform,background-color,border-color] duration-200 ease-[ease] hover:-translate-y-0.5";

const VARIANTS = {
  primary:
    "border border-accent bg-accent font-semibold text-[#080A12] shadow-[0_14px_40px_-14px_rgba(122,140,255,.8)] hover:border-[#8E9CFF] hover:bg-[#8E9CFF]",
  secondary:
    "border border-line-2 bg-white/[.04] text-fg hover:border-white/[.28] hover:bg-white/[.09]",
};

export default function Button({
  href,
  children,
  variant = "secondary",
  small = false,
  external = false,
  className,
}: ButtonProps) {
  const sizing = small
    ? "px-[15px] py-2 text-[.82rem]"
    : "px-5 py-[11px] text-[.9rem]";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${BASE} ${sizing} ${VARIANTS[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
