"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { loop } from "@/lib/career";

/** CH.03 — How I think: a pinned, sideways-scrolling manga strip (Ask → Listen → Build → Measure). */
export default function Think() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const dist = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>(".strip-panel").forEach((el) => {
          gsap.fromTo(
            el.querySelector(".strip-img"),
            { scale: 1.4 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="think" ref={root} className="relative overflow-hidden bg-ink">
      <div className="halftone absolute inset-0" />
      <div ref={track} className="relative flex min-h-screen flex-col gap-10 px-6 py-28 md:w-max md:flex-row md:items-center md:gap-16 md:px-24">
        <div className="shrink-0 md:w-[32vw]">
          <p className="font-mono text-sm uppercase tracking-widest text-tang">CH.03 · How I think</p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">When a project lands…</h2>
          <p className="mt-6 max-w-sm text-paper/70">Every project runs the same loop. The agent does the drafting; people make the calls.</p>
        </div>
        {loop.map((l, i) => (
          <article
            key={l.step}
            className="strip-panel panel relative h-[70vh] shrink-0 overflow-hidden bg-black md:h-[72vh] md:w-[42vh]"
            style={{ rotate: `${[-3, 2, -1, 3][i]}deg` }}
          >
            <Image src={l.img} alt={`${l.step} — anime panel`} fill sizes="(min-width:768px) 42vh, 100vw" className="strip-img object-cover" />
            <div className={`accent-bg absolute inset-x-0 bottom-0 border-t-4 border-black p-5 ${l.tone}`}>
              <h3 className="font-display text-3xl">
                {i + 1} · {l.step.toUpperCase()}
              </h3>
              <p className="mt-2 text-sm leading-snug opacity-90">{l.line}</p>
            </div>
          </article>
        ))}
        <div className="shrink-0 font-display text-6xl text-tang md:w-[30vw] md:text-8xl">…repeat.</div>
      </div>
    </section>
  );
}
