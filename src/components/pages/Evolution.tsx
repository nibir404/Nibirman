"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MachineImage from "@/components/gl/MachineImage";
import Footer from "@/components/Footer";
import TornEdge from "@/components/TornEdge";
import { acts } from "@/lib/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The Evolution — a gold-spine timeline. The spine draws itself as you scroll; each plate
 * unveils from below; Act V shows how the automatons see you (live ASCII shader).
 */
export default function Evolution() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".ev-title", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.1 });
      gsap.to(".ev-opener img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".ev-opener", start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".spine-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".acts", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".act").forEach((act) => {
        gsap.from(act.querySelector(".plate"), {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: act, start: "top 75%" },
        });
        gsap.from(act.querySelectorAll(".reveal"), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: act, start: "top 65%" },
        });
        gsap.to(act.querySelector(".node"), {
          backgroundColor: "var(--ink)",
          scrollTrigger: { trigger: act, start: "top 55%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <header className="ev-opener relative h-[92svh] overflow-hidden">
        <Image src="/paintings/teacher.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ filter: "brightness(0.55) saturate(0.85)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,17,13,0.5)_0%,rgba(21,17,13,0.1)_40%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-[18svh] flex flex-col items-center gap-2 text-center text-[#f1e6cc]">
          <p className="font-serif text-2xl tracking-[0.12em]">I — V</p>
          <h1 className="ev-title font-serif text-[22vw] serif-tight md:text-[17vw]">Evolution</h1>
          <p className="mt-4 font-serif text-2xl italic leading-snug md:text-3xl">
            From apprentice to maker of automatons.
            <br />A career, painted in five acts.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <TornEdge />
        </div>
      </header>

      <section className="acts relative flex flex-col gap-28 bg-paper px-5 pb-32 pt-16 md:px-20">
        <div className="absolute bottom-0 left-[calc(1.25rem+6px)] top-0 w-px bg-ink/20 md:left-[45.8%]">
          <div className="spine-fill h-full w-full origin-top bg-ink" />
        </div>
        {acts.map((a, i) => (
          <article key={a.n} className="act relative grid items-center gap-10 pl-8 md:grid-cols-[1fr_1fr] md:gap-28 md:pl-0">
            <div className="relative">
              <div className="plate border border-ink bg-card p-3">
                <div className="relative aspect-[4/5]">
                  <Image src={a.img} alt={`${a.title.join(" ")} — ${a.caption}`} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" />
                </div>
              </div>
              <p className="label mt-3 text-muted">{a.caption}</p>
              {i === acts.length - 1 && (
                <div className="absolute bottom-16 right-6 hidden w-48 border border-ink bg-paper shadow-[0_18px_36px_rgba(0,0,0,0.18)] md:block">
                  <div className="flex justify-between border-b border-ink px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em]">
                    <span>Agent&apos;s view</span>
                    <span>● live</span>
                  </div>
                  <MachineImage src="/paintings/philosopher.jpg" alt="Imtiaz as the agents see him, in ASCII" mode="ascii" className="aspect-[4/5]" />
                </div>
              )}
            </div>
            <span className="node absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-ink bg-paper md:left-[calc(50%-1.75rem-8px)]" />
            <div className="flex flex-col gap-5">
              <div className="reveal flex items-baseline gap-4">
                <span className="font-serif text-8xl italic leading-none">{a.n}</span>
                <span className="label text-muted">Act {i + 1} · {a.name}</span>
              </div>
              <h2 className="reveal font-serif text-6xl serif-tight md:text-7xl">
                {a.title[0]} <em>{a.title[1]}</em>
              </h2>
              <p className="reveal label">{a.role}</p>
              <p className="reveal max-w-md font-serif text-2xl leading-snug text-muted">{a.story}</p>
              <div className="reveal max-w-md border-t hair pt-4">
                <p className="label text-muted">Gifts gained</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.gifts.map((g) => (
                    <span key={g} className="rounded-full border border-ink px-3 py-1.5 font-mono text-[11px] tracking-[0.08em]">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </div>
  );
}
