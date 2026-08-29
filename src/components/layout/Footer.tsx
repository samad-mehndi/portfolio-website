import { profile } from "@/content/profile";

export default function Footer() {
  // Computed once at `next build` time, baked into the static HTML — no
  // client effect needed for a value that never changes after the export.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pt-9 pb-12">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-4 px-6 font-mono text-[.72rem] text-muted">
        <span>
          {profile.name} · {profile.location} · {profile.relocationNote}
        </span>
        <span>
          © {year} {profile.name}. {profile.copyrightNote}
        </span>
      </div>
    </footer>
  );
}
