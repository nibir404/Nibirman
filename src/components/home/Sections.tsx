"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { approach, crafts, ventures } from "@/lib/content";
import { Reveal, Rise, TitleBar, ease } from "../fx";

/** Intro statement — words light up as you scroll. */
export function Statement() {
  const root = useRef<HTMLElement>(null);
  const text = "Great products don't start with beautiful interfaces. They start with understanding people, finding meaningful problems, and making the right decisions.";
  useGSAP(
    () => {
      gsap.fromTo(".st-w", { opacity: 0.15 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true } });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="st-h" className="grid-lines mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <p className="label text-muted">Beyond designing products</p>
      <h2 id="st-h" className="display mt-4 text-[13vw] leading-[0.9] md:text-[120px]">Architecting <em>possibilities.</em></h2>
      <p className="mt-12 max-w-5xl font-serif text-[30px] leading-[1.15] md:text-[52px]" aria-label={text}>
        {text.split(" ").map((w, i) => <span key={i} aria-hidden className="st-w">{w} </span>)}
      </p>
    </section>
  );
}

/** Five crafts as a hand of cards that fans out as it scrolls in. */
export function Crafts() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(2);
  const [desk, setDesk] = useState(false);
  const fanRef = useRef<HTMLDivElement>(null);
  const inView = useInView(fanRef, { once: true, margin: "-20% 0px" });
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const f = () => setDesk(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  const fan = [-16, -8, 0, 8, 16];
  return (
    <section ref={root} aria-labelledby="cr-h" className="relative overflow-hidden bg-[#101010] py-24 text-[#E9E8E3] md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="label text-[#8b8f96]">01 — 05 · What I do · Pick a card</p>
        <Reveal as="h2" text="Five crafts, one hand." className="display mt-3 block text-center text-[14vw] leading-[0.9] md:text-[120px]" />
      </div>
      <div ref={fanRef} role="tablist" aria-label="Crafts" className="cr-fan relative mx-auto mt-14 flex h-[460px] max-w-[1100px] snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-6 md:mt-20 md:h-[520px] md:justify-center md:overflow-visible md:px-0">
        {crafts.map((c, i) => {
          const on = active === i;
          return (
            <motion.button
              key={c.n}
              role="tab"
              aria-selected={on}
              aria-controls="cr-panel"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="Read"
              className="cr-card ui-card relative h-[360px] w-[240px] shrink-0 snap-center p-2 text-left md:absolute md:bottom-6"
              style={{ left: `calc(50% - 120px + ${(i - 2) * 190}px)`, background: on ? "var(--accent)" : "#E9E8E3", zIndex: on ? 10 : 5 - Math.abs(i - 2) }}
              animate={desk ? { rotate: inView && !on ? fan[i] : 0, x: inView ? 0 : (2 - i) * 190, y: on ? -40 : inView ? 0 : 80 } : { rotate: 0, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
            >
              <span className="block h-[300px] overflow-hidden rounded-t-[120px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" className="h-full w-full object-cover grayscale" />
              </span>
              <span className={`label mt-3 flex justify-between px-2 ${on ? "text-[var(--on-accent)]" : "text-[#101010]"}`}><span>{c.n}</span><span>{c.key}</span></span>
            </motion.button>
          );
        })}
      </div>
      <div id="cr-panel" role="tabpanel" aria-live="polite" className="mx-auto mt-8 max-w-2xl px-5 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
            <p className="label text-[#8b8f96]">{crafts[active].n} · {crafts[active].title}</p>
            <p className="mt-3 font-serif text-[26px] italic leading-8 md:text-[30px]">{crafts[active].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Selected work as a TV — turn the dial to change channel. */
export function Channels() {
  const [ch, setCh] = useState(0);
  const v = ventures[ch];
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setCh((c) => (c + 1) % ventures.length); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setCh((c) => (c - 1 + ventures.length) % ventures.length); }
  };
  return (
    <section aria-labelledby="ch-h" className="grid-lines mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <p className="label text-muted">Selected work · Turn the dial</p>
      <h2 id="ch-h" className="display mt-3 text-[12vw] leading-[0.92] md:text-[104px]">Ideas are interesting.<br /><em>Products are better.</em></h2>
      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div className="ui-card relative flex gap-4 rounded-[36px] !bg-[#1C1C1E] p-4 md:gap-6 md:p-7" style={{ background: "#1C1C1E" }}>
          <Link href={`/work/${v.slug}`} className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[42px] bg-[#2B3CFF]" data-cursor="Open" aria-label={`Open ${v.name} case study`}>
            <TitleBar title={`CH0${ch + 1}.tv`} />
            <AnimatePresence mode="popLayout">
              <motion.div key={v.slug} className="absolute inset-0" initial={{ opacity: 0, scaleY: 0.02, filter: "brightness(3)" }} animate={{ opacity: 1, scaleY: 1, filter: "brightness(1)" }} exit={{ opacity: 0, scaleY: 0.02 }} transition={{ duration: 0.45, ease }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt="" className="h-full w-full object-cover opacity-50 mix-blend-screen grayscale" />
                <span className="pixel absolute left-6 top-6 text-[11px] text-white md:left-9 md:top-8">CH 0{ch + 1} ▸ {v.status.toUpperCase()}</span>
                <span className="display absolute bottom-4 left-6 text-[14vw] leading-none text-white md:bottom-6 md:left-9 md:text-[88px]">{v.name.split(" / ")[0]}</span>
              </motion.div>
            </AnimatePresence>
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.18)_0_1px,transparent_1px_3px)]" />
          </Link>
          <div className="flex w-16 flex-col items-center justify-between py-2 md:w-24">
            <motion.button
              aria-label={`Next channel. Now ${v.name}`}
              onClick={() => setCh((c) => (c + 1) % ventures.length)}
              className="relative h-14 w-14 rounded-full border-[5px] border-[#3A3A3D] bg-[#2B2B2E] md:h-20 md:w-20"
              animate={{ rotate: ch * 90 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              data-cursor="Turn"
            >
              <span className="absolute left-1/2 top-1.5 h-4 w-1 -translate-x-1/2 rounded bg-[#E9E8E3] md:h-5" />
            </motion.button>
            <span className="h-10 w-10 rounded-full border-4 border-[#3A3A3D] bg-[#2B3CFF] md:h-14 md:w-14" aria-hidden />
            <span className="flex w-full flex-col gap-1.5" aria-hidden>{[0, 1, 2, 3].map((i) => <span key={i} className="h-[3px] bg-[#3A3A3D]" />)}</span>
          </div>
        </div>
        <div role="radiogroup" aria-label="Channels" onKeyDown={keys}>
          {ventures.map((x, i) => (
            <button key={x.slug} role="radio" aria-checked={ch === i} tabIndex={ch === i ? 0 : -1} onClick={() => setCh(i)} onMouseEnter={() => setCh(i)} className={`flex w-full items-center gap-5 border-t py-5 text-left transition-colors ${ch === i ? "border-ink" : "border-[var(--hair)] text-muted"}`}>
              <span className={`label w-10 ${ch === i ? "text-accent" : ""}`}>CH0{i + 1}</span>
              <span className="display flex-1 text-[34px] leading-none md:text-[40px]">{x.name}</span>
              <span className={`label rounded-[var(--radius)] px-3 py-1.5 ${ch === i ? "bg-accent text-[var(--on-accent)]" : "border border-current"}`}>{x.status}</span>
            </button>
          ))}
          <Link href="/work" className="mt-6 inline-block border-t border-[var(--hair)] pt-5 hover:underline">All projects →</Link>
        </div>
      </div>
    </section>
  );
}

/** Approach — a progress line fills as you scroll. */
export function Approach() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useGSAP(
    () => {
      gsap.to(".ap-bar", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true, onUpdate: (s) => setStep(Math.min(4, Math.floor(s.progress * 5))) },
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="ap-h" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <h2 id="ap-h" className="display text-[13vw] leading-[0.92] md:text-[104px]">Think deeply.<br /><em className="text-muted">Build intelligently.</em></h2>
      <div className="relative mt-20">
        <div className="h-px bg-[var(--hair)]" />
        <div className="ap-bar absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-accent" aria-hidden />
        <ol className="grid gap-8 pt-8 md:grid-cols-5">
          {approach.map((a, i) => (
            <li key={a.n} className="flex flex-col gap-3" aria-current={step === i ? "step" : undefined}>
              <span className={`pixel text-xs ${step === i ? "text-accent" : "text-muted"}`}>{a.n}{step === i ? " ▸ NOW" : ""}</span>
              <span className={`display text-[44px] leading-none transition-all duration-500 ${step === i ? "italic" : ""}`}>{a.t}</span>
              <span className={`max-w-[240px] text-sm leading-6 transition-opacity duration-500 ${step === i ? "opacity-100" : "opacity-60"}`}>{a.d}</span>
            </li>
          ))}
        </ol>
      </div>
      <Rise className="mt-20">
        <p className="label text-muted">Have an interesting problem to solve?</p>
      </Rise>
    </section>
  );
}
