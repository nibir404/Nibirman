"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filmBeats, profile } from "@/lib/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * CH.01 — “The scroll film”. One pinned shot, ~5 screens long.
 * Each beat: anime still dollies in (Ken Burns), a giant comic word slams/cracks across it,
 * then the shot wipes to the next with a speed-line flash.
 */
export default function Film() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shots = gsap.utils.toArray<HTMLElement>(".shot");
        // intro: the name slams in letter by letter as soon as the book opens
        gsap.from(shots[0].querySelectorAll(".ltr"), {
          yPercent: 140, rotate: () => gsap.utils.random(-30, 30), opacity: 0,
          stagger: 0.07, duration: 0.9, ease: "back.out(2.4)", delay: 0.4,
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=500%", scrub: 1, pin: true },
        });

        shots.forEach((shot, i) => {
          const img = shot.querySelector(".shot-img");
          const letters = shot.querySelectorAll(".ltr");
          const flash = shot.querySelector(".flash");
          if (i > 0) {
            tl.fromTo(shot, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 120% 0, 100% 100%, 0 100%)", duration: 0.6, ease: "power3.inOut" });
            tl.fromTo(flash, { opacity: 0.9 }, { opacity: 0, duration: 0.4 }, "<0.3");
          }
          tl.fromTo(img, { scale: 1.35, yPercent: 6 }, { scale: 1.05, yPercent: -4, duration: 2, ease: "none" }, i ? "<" : 0);
          // first word is already on screen when the book opens (see intro below)
          if (i > 0) tl.fromTo(
            letters,
            { yPercent: 120, rotate: () => gsap.utils.random(-25, 25), opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "back.out(2.2)" },
            "<0.2",
          );
          // the word cracks open before the next shot
          if (i < shots.length - 1) {
            tl.to(letters, {
              x: (j: number) => (j - letters.length / 2) * 60,
              y: () => gsap.utils.random(-140, 140),
              rotate: () => gsap.utils.random(-60, 60),
              opacity: 0,
              stagger: 0.015,
              duration: 0.6,
              ease: "power2.in",
            });
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative h-screen w-full overflow-hidden bg-ink">
      {filmBeats.map((b, i) => (
        <div key={b.word} className="shot absolute inset-0" style={{ zIndex: i }}>
          <Image src={b.img} alt="" fill priority={i === 0} sizes="100vw" className="shot-img object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,11,18,0.75)_100%)]" />
          <div className="speedlines flash absolute inset-0 opacity-0" />
          <h2
            aria-label={b.word}
            className={`outline-text absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center font-display uppercase leading-[0.85] tracking-tight ${
              i === filmBeats.length - 1 ? "accent-text text-tang" : "text-cream"
            } text-[16vw] md:text-[11vw]`}
          >
            {b.word.split(" ").map((w, wi) => (
              <span key={wi} className="block whitespace-nowrap">
                {w.split("").map((ch, ci) => (
                  <span key={ci} aria-hidden className="ltr inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="absolute bottom-20 left-6 font-mono text-xs uppercase tracking-widest text-tang md:left-10">
            {b.at} · {b.note}
          </p>
        </div>
      ))}
      <p className="absolute bottom-20 right-6 z-10 font-mono text-xs text-paper/80 md:right-10">
        {profile.title} — scroll to ride ↓
      </p>
    </div>
  );
}
