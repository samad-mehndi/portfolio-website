import Section from "@/components/layout/Section";
import Panel from "@/components/ui/Panel";

export default function Home() {
  return (
    <Section id="top">
      <Panel>
        <div className="p-8">
          <p className="font-mono text-xs tracking-[.14em] text-muted uppercase">
            Palette check
          </p>
          <h1 className="mt-4">Tokens and shell, nothing else yet.</h1>
          <p className="mt-4 max-w-[56ch] text-muted">
            This placeholder exists to confirm the background, the glass
            panel, the hairline border, and the type scale before any real
            content goes in.
          </p>
        </div>
      </Panel>
    </Section>
  );
}
