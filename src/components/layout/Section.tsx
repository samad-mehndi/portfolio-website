import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  // "hero" matches v0.html's #hero override (132px/72px, 112px/56px under
  // 940px) instead of the generic section rhythm (104px, 76px under 940px).
  padding?: "default" | "hero";
};

const PADDING = {
  default: "py-[104px] max-[940px]:py-[76px]",
  hero: "pt-[132px] pb-[72px] max-[940px]:pt-[112px] max-[940px]:pb-[56px]",
};

export default function Section({
  id,
  children,
  padding = "default",
}: SectionProps) {
  return (
    <section id={id} className={`relative ${PADDING[padding]}`}>
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}
