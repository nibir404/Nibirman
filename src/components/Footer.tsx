import Link from "next/link";
import { profile, stats } from "@/lib/career";

/** Stats row + contact line + the giant wordmark. Used at the end of every page. */
export default function Footer({ showStats = true }: { showStats?: boolean }) {
  return (
    <footer className="relative bg-paper">
      {showStats && (
        <div className="grid grid-cols-2 border-t hair md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-r hair p-5 md:p-8">
              <p className="font-serif text-5xl md:text-7xl">{s.value}</p>
              <p className="label mt-2 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="px-5 pt-10 md:px-10">
        <div className="flex flex-wrap justify-between gap-6 font-mono text-xs uppercase tracking-[0.15em]">
          <a href={`mailto:${profile.email}`} className="normal-case tracking-normal hover:text-accent">
            {profile.email}
          </a>
          <div className="flex flex-wrap gap-6">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                {l.label}
              </a>
            ))}
            <Link href="/notebooks" className="hover:text-accent">Notebooks</Link>
            <Link href="/list" className="hover:text-accent">Plain version</Link>
          </div>
        </div>
        <p aria-hidden className="mt-6 overflow-hidden whitespace-nowrap font-serif text-[23vw] leading-[0.8] serif-tight">
          Nibirman
        </p>
      </div>
    </footer>
  );
}
