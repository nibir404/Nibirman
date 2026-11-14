"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/lib/career";
import { useLenis } from "@/components/SmoothScroll";

/**
 * Fixed left index (after Shopify Editions): the hero title lands here as the masthead
 * of the index, chapters list with counts, the active one is marked.
 */
export default function ChapterIndex() {
  const lenis = useLenis();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const st = chapters.map((c) =>
      ScrollTrigger.create({
        trigger: `#${c.id}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (s) => s.isActive && setActive(c.id),
      }),
    );
    return () => st.forEach((s) => s.kill());
  }, []);

  return (
    <aside
      id="chapter-index"
      className="invisible fixed left-5 top-24 z-40 hidden w-44 -translate-x-2 opacity-0 lg:block md:left-10"
      aria-label="Chapters"
    >
      <p id="index-title" className="font-serif text-[26px] leading-[0.95] serif-tight">
        The Agentic
        <br />
        <em>Renaissance</em>
      </p>
      <ul className="mt-8 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        {chapters.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => lenis?.scrollTo(`#${c.id}`, { duration: 1.6 })}
              className={`flex w-full justify-between transition-colors ${active === c.id ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              <span>
                {active === c.id ? "● " : ""}
                {c.label}
              </span>
              <span>{c.count ?? ""}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
