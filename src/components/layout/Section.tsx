import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
};

export default function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="relative py-[104px] max-[940px]:py-[76px]">
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}
