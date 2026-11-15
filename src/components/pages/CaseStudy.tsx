"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ventures, type Venture } from "@/lib/content";
import { ParallaxImg, Reveal, Rise } from "../fx";

const chapters = ["Overview", "The challenge", "Vision", "Exploration areas", "System architecture", "What's next"];

export default function CaseStudy({ v }: { v: Venture }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const next = ventures[(ventures.findIndex((x) => x.slug === v.slug) + 1) % ventures.length];

  useEffect(() => {
    const els = chapters.map((_, i) => document.getElementById(`ch-${i}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number(e.target.id.split("-")[1]))), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.from(".arch-layer", { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".arch-diagram", start: "top 75%" } });
      gsap.from(".arch-link", { scaleY: 0, transformOrigin: "top", stagger: 0.12, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".arch-diagram", start: "top 70%" } });
      gsap.to(".arch-pulse", { opacity: 0.25, repeat: -1, yoyo: true, duration: 1.1, ease: "sine.inOut" });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section aria-labelledby="cs-title" className="relative h-[86svh] min-h-[560px] overflow-hidden bg-[#2B3CFF] text-white">
        <ParallaxImg src={v.img} alt="" className="absolute inset-0 opacity-45 mix-blend-screen" amount={10} />
        <div className="absolute left-5 top-28 flex flex-wrap gap-2 md:left-10">
          <span className="label rounded-[var(--radius)] bg-white px-3 py-1.5 text-[#2B3CFF]">{v.status}</span>
          <span className="label rounded-[var(--radius)] border border-white/70 px-3 py-1.5">{v.category}</span>
        </div>
        <h1 id="cs-title" className="display absolute bottom-6 left-4 text-[22vw] leading-[0.85] md:bottom-4 md:left-8 md:text-[16vw] xl:text-[260px]"><Reveal text={v.name.split(" / ")[0]} /></h1>
        <p className="display absolute bottom-10 right-5 hidden max-w-[340px] text-[28px] italic leading-8 md:block md:right-10">{v.line}</p>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <nav aria-label="Chapters" className="hidden md:block">
          <ol className="sticky top-28 flex flex-col gap-3">
            {chapters.map((c, i) => (
              <li key={c}>
                <a href={`#ch-${i}`} aria-current={active === i ? "true" : undefined} className={`label flex items-center gap-2 transition-colors ${active === i ? "text-ink" : "text-muted hover:text-ink"}`}>
                  <span className={`h-2 w-2 transition-all ${active === i ? "bg-accent" : "bg-transparent"}`} />0{i + 1} {c}
                </a>
              </li>
            ))}
            <li className="mt-3 h-0.5 bg-[var(--hair)]"><motion.div className="h-full bg-accent" animate={{ width: `${((active + 1) / chapters.length) * 100}%` }} /></li>
          </ol>
        </nav>

        <div className="flex flex-col gap-28">
          <section id="ch-0" aria-label="Overview" className="grid grid-cols-2 border-t border-ink md:grid-cols-4">
            {[["Role", "Product architect"], ["Status", `${v.status} · not shipped`], ["Year", "2026"], ["Scope", "Strategy · IA · System"]].map(([k, val]) => (
              <div key={k} className="flex flex-col gap-2 pt-5"><span className="label text-muted">{k}</span><span className="text-[16px]">{val}</span></div>
            ))}
          </section>
          <section id="ch-1" aria-labelledby="ch1-h">
            <p className="label text-accent">02 — The challenge</p>
            <h2 id="ch1-h" className="display mt-5 text-[11vw] leading-[0.95] md:text-[76px]">{v.challenge[0]} <em className="text-muted">{v.challenge[1]}</em></h2>
          </section>
          <section id="ch-2" aria-labelledby="ch2-h" className="grid gap-8 md:grid-cols-2">
            <p className="label text-accent md:col-span-2">03 — Vision</p>
            <h2 id="ch2-h" className="sr-only">Vision</h2>
            <p className="font-serif text-[28px] leading-[1.2] md:text-[36px]">{v.vision}</p>
            <Rise><div className="ui-arch h-[360px] bg-ink">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={v.img} alt="" className="h-full w-full object-cover grayscale" /></div></Rise>
          </section>
          <section id="ch-3" aria-labelledby="ch3-h">
            <p className="label text-accent">04 — Exploration areas</p>
            <h2 id="ch3-h" className="sr-only">Exploration areas</h2>
            <ul className="mt-6 border-t border-ink">
              {v.areas.map((a, i) => (
                <li key={a} className="group flex items-baseline gap-6 border-b border-[var(--hair)] py-5">
                  <span className="pixel w-10 text-xs text-muted">A.0{i + 1}</span>
                  <span className="display text-[34px] leading-none transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-accent md:text-[52px]">{a}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section id="ch-4" aria-labelledby="ch4-h" className="grid-squares bg-[#0A0A0B] py-24 text-[#E9E8E3]" style={{ ["--ink" as string]: "#E9E8E3" }}>
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="label text-[#4B5BFF]">05 — System architecture</p><h2 id="ch4-h" className="display mt-3 text-[11vw] leading-none md:text-[64px]">Four layers, <em className="text-[#8b8f96]">one gate.</em></h2></div>
            <p className="label text-[#8b8f96]">Fig. 05 · {v.name} · {v.status}</p>
          </div>
          <div className="arch-diagram mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[1fr_220px]">
            <div className="flex flex-col">
              {v.layers.map((l, i) => (
                <div key={l.label}>
                  {i > 0 && <div className="arch-link mx-auto h-7 w-px bg-white/40" aria-hidden />}
                  <div className={`arch-layer grid border md:grid-cols-[180px_1fr] ${l.highlight && i === 1 ? "border-[#2B3CFF] bg-[#2B3CFF]/10" : "border-white/20"}`}>
                    <div className="flex items-center gap-3 border-b border-white/20 p-4 md:flex-col md:items-start md:justify-center md:border-b-0 md:border-r">
                      <span className="pixel text-[11px] text-[#8b8f96]">L{i + 1}</span>
                      <span className="label">{l.label}</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
                      {l.items.map((it) => (
                        <li key={it} tabIndex={0} className={`p-3 text-sm outline-offset-2 transition-colors hover:bg-white hover:text-[#101010] focus-visible:bg-white focus-visible:text-[#101010] ${it === l.highlight ? (i === 1 ? "bg-[#2B3CFF] text-white" : "bg-[#E9E8E3] font-serif text-lg italic text-[#101010]") : i === v.layers.length - 1 ? "border border-dashed border-white/30 font-mono text-xs text-[#9DA1A7]" : "border border-white/25"}`}>
                          {it === l.highlight && i === 1 && <span className="arch-pulse mr-2 inline-block h-2 w-2 rounded-full bg-white" aria-hidden />}
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <aside aria-label="Human in the loop" className="arch-layer flex flex-col justify-between gap-8 border border-[#2B3CFF] bg-[#2B3CFF]/10 p-5">
              <div><span className="pixel text-[11px] text-[#4B5BFF]">GATE</span><p className="display mt-2 text-[32px] leading-none">Human in the loop</p></div>
              <ul className="label flex flex-col gap-2.5 text-[#9DA1A7]">{v.gate.map((g) => <li key={g}>◉ {g}</li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="ch-5" aria-label="Next project" className="mx-auto max-w-[1440px] border-b border-[var(--hair)] px-5 py-24 md:px-10">
        <p className="label text-muted">Next project · {next.status}</p>
        <Link href={`/work/${next.slug}`} className="group mt-3 block" data-cursor="Next">
          <span className="display text-[14vw] leading-[0.9] transition-colors group-hover:text-accent md:text-[140px]">{next.name.split(" / ")[0]} <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span></span>
        </Link>
      </section>
    </div>
  );
}
