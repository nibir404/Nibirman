import Link from "next/link";
import { profile } from "@/lib/career";
import Footer from "@/components/Footer";
import Sheet from "./Sheet";

/** Finale — the commission, a sun setting into the ground line, then the wordmark. */
export default function Commission() {
  return (
    <Sheet id="commission">
      <div className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-32 text-center">
        <p className="label">Open to roles · {profile.city}, {profile.tz}</p>
        <h2 className="mt-6 font-serif text-6xl serif-tight md:text-[140px]">
          Let&apos;s commission
          <br />
          <em className="text-accent">the next work.</em>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/contact" data-cursor="Write" className="rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper hover:opacity-85">
            Write me a letter
          </Link>
          <Link href="/resume" data-cursor="Print" className="rounded-full border border-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-paper">
            Print my résumé
          </Link>
        </div>
        <svg aria-hidden viewBox="0 0 200 100" className="absolute bottom-0 left-1/2 w-56 -translate-x-1/2">
          <circle cx="100" cy="100" r="44" fill="var(--accent)" opacity="0.9" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="74" fill="none" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 5" />
        </svg>
        <span className="absolute inset-x-0 bottom-0 h-px bg-ink" />
      </div>
      <Footer />
    </Sheet>
  );
}
