"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { dhakaClock, now, palettes, phases } from "@/lib/time";
import { useTime } from "@/components/TimeProvider";

const links = [
  { href: "/evolution", label: "Evolution" },
  { href: "/#works", label: "Works" },
  { href: "/notebooks", label: "Notebooks" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

/** Fixed masthead: wordmark, nav, live Dhaka clock and the four-act switch. */
export default function Masthead() {
  const { phase, live, override, setOverride, palette } = useTime();
  const path = usePathname();
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    // tick exactly on each second of the (server-corrected) clock
    let id = 0;
    const t = () => {
      setClock(dhakaClock());
      id = window.setTimeout(t, 1000 - (now().getTime() % 1000) + 5);
    };
    t();
    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-4 px-5 py-4 text-ink md:px-10 md:py-6">
      <Link href="/" className="pointer-events-auto font-serif text-2xl leading-none md:text-3xl" data-cursor="">
        Nibirman<span className="align-super font-mono text-[10px]">®</span>
      </Link>

      <nav className="pointer-events-auto hidden gap-7 pt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] lg:flex">
        {links.map((l) => {
          const on = l.href !== "/#works" && path.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={`border-b pb-0.5 transition-colors ${on ? "border-ink" : "border-transparent hover:border-ink/40"}`}>
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="hidden uppercase tracking-[0.18em] text-muted sm:inline">Dhaka</span>
          <span className="tabular-nums">{clock}</span>
        </div>
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Time of day">
          {phases.map((p) => (
            <button
              key={p}
              role="radio"
              aria-checked={phase === p}
              aria-label={`${palettes[p].name}${p === live ? " (now in Dhaka)" : ""}`}
              data-cursor={palettes[p].name}
              onClick={() => setOverride(p === live ? null : p)}
              className="relative h-3 w-3 rounded-full border border-ink"
              style={{ background: palettes[p].skyBottom }}
            >
              {phase === p && <motion.span layoutId="act" className="absolute -inset-1 rounded-full border border-ink" />}
            </button>
          ))}
        </div>
        <span className="hidden max-w-[13rem] text-right font-serif text-sm italic leading-tight text-muted sm:block">
          {override ? `Previewing ${palette.name.toLowerCase()} · tap again for now` : palette.label}
        </span>
      </div>
    </header>
  );
}
