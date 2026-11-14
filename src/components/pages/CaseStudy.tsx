"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MachineImage from "@/components/gl/MachineImage";
import TornEdge from "@/components/TornEdge";
import Footer from "@/components/Footer";
import { roman, works } from "@/lib/career";
import { useLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sections = [
  { id: "problem", label: "The problem" },
  { id: "decisions", label: "Decisions" },
  { id: "result", label: "The result" },
];

/** A single plate: painted hero tearing into paper, sticky index, swash chapters, decision ledger. */
export default function CaseStudy({ index }: { index: number }) {
  const w = works[index];
  const next = works[(index + 1) % works.length];
  const root = useRef<HTMLDivElement>(null);
  const reveal = useRef(0);
  const lenis = useLenis();
  const [active, setActive] = useState("problem");

  useEffect(() => {
    const t = setTimeout(() => (reveal.current = 1), 250);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      gsap.from(".cs-title > *", { yPercent: 100, duration: 1.3, ease: "expo.out", stagger: 0.08, delay: 0.2 });
      gsap.to(".cs-hero-img", { yPercent: 14, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".cs-hero", start: "top top", end: "bottom top", scrub: true } });
      sections.forEach((s) =>
        ScrollTrigger.create({ trigger: `#${s.id}`, start: "top 50%", end: "bottom 50%", onToggle: (st) => st.isActive && setActive(s.id) }),
      );
      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <header className="cs-hero relative h-[96svh] overflow-hidden bg-ink">
        <div className="cs-hero-img absolute inset-0">
          <MachineImage src={w.img} alt={`${w.name} — painted plate`} mode="pixel" cell={48} progressRef={reveal} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,40,0.6)_0%,transparent_22%,transparent_45%,rgba(10,14,40,0.85)_100%)]" />
        <div className="absolute inset-x-5 bottom-28 flex flex-wrap items-end justify-between gap-6 text-[#f8f3e7] md:inset-x-10">
          <div>
            <p className="label">
              Plate {roman[index]} · {w.tag} · {w.role}
            </p>
            <h1 className="cs-title mt-3 overflow-hidden font-serif text-[18vw] serif-tight md:text-[13vw]">
              <span className="inline-block">{w.name}</span>
              {w.italic && <em className="inline-block"> {w.italic}</em>}
            </h1>
          </div>
          <p className="max-w-sm font-serif text-2xl italic leading-snug">{w.logline}</p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <TornEdge />
        </div>
      </header>

      <div className="relative flex gap-16 bg-paper px-5 pt-16 md:px-10">
        <aside className="sticky top-28 hidden h-fit w-52 shrink-0 lg:block">
          <p className="font-serif text-2xl leading-tight">
            Plate {roman[index]}
            <br />
            <em>
              {w.name}
              {w.italic ? ` ${w.italic}` : ""}
            </em>
          </p>
          <ul className="mt-6 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => lenis?.scrollTo(`#${s.id}`, { offset: -100 })} className={`flex w-full justify-between ${active === s.id ? "text-ink" : "text-muted hover:text-ink"}`}>
                  <span>{active === s.id ? "● " : ""}{s.label}</span>
                  <span>0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="label mt-6 border-t hair pt-4 text-muted">← <Link href="/#works">All plates</Link></p>
        </aside>

        <div className="min-w-0 flex-1 pb-24">
          <dl className="cs-reveal grid grid-cols-2 border-y border-ink md:grid-cols-4">
            {w.facts.map((f) => (
              <div key={f.k} className="py-4 pr-4">
                <dt className="label text-muted">{f.k}</dt>
                <dd className="mt-1 font-serif text-2xl">{f.v}</dd>
              </div>
            ))}
          </dl>

          <section id="problem" className="mt-20">
            <p className="label text-muted">01 — The problem</p>
            <h2 className="cs-reveal mt-6 flex items-end gap-1 font-serif">
              <span className="text-[150px] italic leading-[0.8] md:text-[220px]">{w.problem.cap}</span>
              <span className="pb-2 text-5xl serif-tight md:text-7xl">{w.problem.lead}</span>
            </h2>
            <div className="cs-reveal mt-10 grid gap-8 text-lg leading-relaxed md:grid-cols-2">
              {w.problem.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          <section id="decisions" className="mt-24">
            <p className="label text-muted">02 — Three decisions, and what each one cost</p>
            <ol className="mt-6 border-t border-ink">
              {w.decisions.map((d, i) => (
                <li key={d.title} className="cs-reveal grid gap-4 border-b hair py-6 md:grid-cols-[4rem_1fr_22rem] md:items-baseline">
                  <span className="font-serif text-4xl">{["i.", "ii.", "iii."][i]}</span>
                  <span className="font-serif text-3xl leading-tight">{d.title}</span>
                  <span className="text-[15px] leading-relaxed"><b className="font-semibold">Gave up:</b> {d.gaveUp}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="result" className="cs-reveal mt-24 flex flex-wrap items-center gap-10 border-y border-ink py-10">
            <span className="whitespace-nowrap font-serif text-[140px] leading-[0.8] serif-tight md:text-[220px]">{w.resultBig}</span>
            <div className="max-w-xl">
              <p className="label text-muted">03 — The result</p>
              <p className="mt-3 font-serif text-4xl leading-tight">{w.outcome}</p>
            </div>
          </section>

          <Link href={`/works/${next.slug}`} className="group mt-16 flex items-end justify-between gap-6" data-cursor="Next">
            <div>
              <p className="label text-muted">Next plate — {roman[(index + 1) % works.length]} of {roman[works.length - 1]}</p>
              <p className="mt-2 font-serif text-7xl serif-tight transition-transform duration-500 group-hover:translate-x-4 md:text-9xl">
                {next.name}
                {next.italic && <em> {next.italic}</em>} <em>→</em>
              </p>
            </div>
            <div className="hidden w-52 rotate-3 border border-ink bg-card p-2 md:block">
              <MachineImage src={next.img} alt="" mode="dither" className="aspect-[4/3]" />
            </div>
          </Link>
        </div>
      </div>
      <Footer showStats={false} />
    </div>
  );
}
