"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/lib/career";
import { scrollState, useLenis } from "@/components/SmoothScroll";
import { useAmbient } from "@/components/useAmbient";

/** Fixed chrome: chapter label, rail, ink thread, manga toggle, sound. */
export default function Hud() {
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const [manga, setManga] = useState(false);
  const { on: soundOn, toggle: toggleSound } = useAmbient();
  const path = useRef<SVGPathElement>(null);
  const rider = useRef<HTMLDivElement>(null);

  // track which chapter is on screen
  useEffect(() => {
    const triggers = chapters.slice(1).map((c, i) =>
      ScrollTrigger.create({
        trigger: `#${c.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (s) => s.isActive && setActive(i + 1),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // ink thread: draw the path with scroll, Biscuit rides the tip
  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    const tick = () => {
      const prog = Math.min(Math.max(scrollState.progress, 0), 1);
      p.style.strokeDashoffset = `${len * (1 - prog)}`;
      const pt = p.getPointAtLength(len * prog);
      const box = p.ownerSVGElement!.getBoundingClientRect();
      if (rider.current) {
        rider.current.style.transform = `translate(${(pt.x / 1440) * box.width - 28}px, ${(pt.y / 900) * box.height - 28}px)`;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("manga", manga);
  }, [manga]);

  const jump = (id: string) => lenis?.scrollTo(`#${id}`, { duration: 1.8 });

  return (
    <>
      {/* ink thread */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="h-full w-full">
          <path
            ref={path}
            d="M-20 700 C 300 520, 420 280, 620 300 S 900 480, 1030 470 S 1300 160, 1460 180"
            fill="none"
            stroke="#f2784b"
            strokeWidth="5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.85"
          />
        </svg>
        <div ref={rider} className="absolute left-0 top-0 hidden h-14 w-14 overflow-hidden rounded-full border-4 border-black bg-cobalt md:block">
          <Image src="/anime/biscuit.png" alt="" fill sizes="56px" className="object-cover" />
        </div>
      </div>

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-ink/80 px-6 py-4 font-mono text-sm backdrop-blur md:px-10">
        <span>
          <b>CH.{String(active).padStart(2, "0")}</b> {chapters[active]?.label}
        </span>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
        </span>
      </header>

      {/* chapter rail */}
      <nav aria-label="Chapters" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 font-mono text-xs uppercase lg:flex">
        {chapters.slice(1).map((c, i) => (
          <button
            key={c.id}
            onClick={() => jump(c.id)}
            className={`flex items-center gap-2 transition-colors ${active === i + 1 ? "text-tang" : "text-paper/50 hover:text-paper"}`}
          >
            {active === i + 1 && <span className="h-2 w-2 rounded-full bg-tang" />}
            {String(i + 2).padStart(2, "0")} {c.label}
          </button>
        ))}
      </nav>

      {/* footer */}
      <footer className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-ink/80 px-6 py-3 font-mono text-xs backdrop-blur md:px-10">
        <button onClick={() => setManga((m) => !m)} className="uppercase text-paper/70 hover:text-paper">
          {manga ? "Manga ⇄ Color" : "Color ⇄ Manga"}
        </button>
        <span className="hidden text-paper/60 md:block">scroll to ride on · ← → also work</span>
        <button onClick={toggleSound} aria-pressed={soundOn} className="text-paper/70 hover:text-paper">
          ♪ {soundOn ? "on" : "off"}
        </button>
      </footer>
    </>
  );
}
