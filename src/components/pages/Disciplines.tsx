"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { engineeringAreas, experiments, gtm, labAreas } from "@/lib/content";
import DotField from "../DotField";
import PageHero from "../PageHero";
import { Reveal, Rise, TitleBar, ease } from "../fx";

/* ───────────────────────── AI LAB ───────────────────────── */

const termLines = ["$ lab run --experiment omnia", "› spawning 4 agents ............ ok", "› sharing context .............. ok", "› awaiting human approval ......"];

function Terminal() {
  const [n, setN] = useState(0);
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(termLines.length); return; }
    const id = setInterval(() => {
      setChars((c) => {
        if (n >= termLines.length) return c;
        if (c >= termLines[n].length) { setN((x) => x + 1); return 0; }
        return c + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [n]);
  return (
    <div className="ui-card w-full max-w-[520px] overflow-hidden border border-white/15 !bg-[#141416] text-left" role="img" aria-label="Terminal: running the Omnia experiment, four agents spawned, context shared, awaiting human approval">
      <TitleBar title="lab.sh" />
      <div className="flex gap-1.5 border-b border-white/10 px-4 py-3" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-[#3A3A3D]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3A3A3D]" /><i className="h-2.5 w-2.5 rounded-full bg-[#4B5BFF]" /></div>
      <pre aria-hidden className="min-h-[124px] p-5 font-mono text-[13px] leading-[22px] text-[#9DA1A7]">
        {termLines.map((l, i) => (i < n ? l + "\n" : i === n ? l.slice(0, chars) : "")).join("")}
        <span className="animate-pulse text-[#4B5BFF]">█</span>
      </pre>
    </div>
  );
}

export function AILab() {
  const [area, setArea] = useState(1);
  return (
    <>
      <section aria-labelledby="lab-h" className="relative overflow-hidden bg-[#0A0A0B] text-[#E9E8E3]" style={{ ["--ink" as string]: "#E9E8E3", ["--muted" as string]: "#8b8f96" }}>
        <DotField gap={22} />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between gap-12 px-5 pb-14 pt-32 md:px-10 md:pt-40">
          <div>
            <p className="label text-[#4B5BFF]">+ AI Lab · Experiments running: 05</p>
            <h1 id="lab-h" className="mt-4">
              <span className="display block text-[18vw] leading-[0.86] md:text-[200px]"><Reveal text="The next" /></span>
              <span className="pixel block text-[11vw] leading-none md:text-[130px]">GENERATION</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <p className="display max-w-[440px] text-[26px] italic leading-8 text-[#9DA1A7]">Not every experiment becomes a product. Every experiment teaches something.</p>
            <Terminal />
          </div>
        </div>
      </section>

      <section aria-labelledby="areas-h" className="grid-lines mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <p id="areas-h" className="label text-muted">+ Areas of exploration</p>
        <ul className="mt-8 border-t border-ink">
          {labAreas.map((a, i) => (
            <li key={a.t} className="border-b border-[var(--hair)]">
              <button onMouseEnter={() => setArea(i)} onFocus={() => setArea(i)} onClick={() => setArea(i)} aria-pressed={area === i} className="grid w-full items-center gap-4 py-6 text-left md:grid-cols-[80px_1fr_320px] md:gap-10">
                <span className={`pixel text-sm ${area === i ? "text-accent" : "text-muted"}`}>A.0{i + 1}</span>
                <span className={`display text-[10vw] leading-none transition-all duration-500 md:text-[84px] ${area === i ? "translate-x-3 italic text-accent" : ""}`}>{a.t}{area === i ? " →" : ""}</span>
                <span className={`text-sm leading-6 transition-opacity ${area === i ? "opacity-100" : "opacity-60"}`}>{a.d}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="log-h" className="bg-[#0A0A0B] py-24 text-[#E9E8E3] md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="log-h" className="display text-[13vw] leading-[0.9] md:text-[96px]">Experiment <em className="text-[#8b8f96]">log.</em></h2>
            <p className="label text-[#8b8f96]">+ 05 entries · sorted by activity</p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {experiments.slice(0, 3).map((e, i) => (
              <Rise key={e.id} delay={i * 0.08}>
                <li className={`ui-card group relative flex h-[340px] flex-col justify-between overflow-hidden border p-6 transition-colors md:h-[420px] ${i === 0 ? "border-transparent !bg-[#2B3CFF]" : "border-white/15 !bg-transparent hover:border-white/40"}`}>
                  {i === 0 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/art/act-5-maker.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen grayscale transition-transform duration-700 group-hover:scale-105" />
                  )}
                  {i === 1 && <span aria-hidden className="dot-field absolute inset-0" />}
                  {i === 2 && <pre aria-hidden className="absolute left-6 top-20 font-mono text-xs leading-4 text-white/35">{"┌──────┐   ┌──────┐\n│ tool │──▶│ agent│\n└──────┘   └──┬───┘\n     ┌────────┴──┐\n     │   omnia   │\n     └───────────┘"}</pre>}
                  <span className="pixel relative text-[11px]">{e.id} {e.state === "Running" ? "●" : "○"} {e.state.toUpperCase()}</span>
                  <span className="display relative text-[48px] leading-none">{e.name}</span>
                </li>
              </Rise>
            ))}
          </ul>
          <ul className="mt-6 border-t border-white/15">
            {experiments.slice(3).map((e) => (
              <li key={e.id} className="flex items-baseline gap-6 border-b border-white/15 py-5">
                <span className="label w-20 text-[#8b8f96]">{e.id}</span>
                <span className="display flex-1 text-[30px]">{e.name}</span>
                <span className="label text-[#8b8f96]">○ {e.state}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── PRODUCT & GTM ───────────────────────── */

export function ProductGTM() {
  const [sel, setSel] = useState(1);
  const dial = useRef<SVGSVGElement>(null);
  const angle = (i: number) => -90 + i * 72;
  const pick = (cx: number, cy: number) => {
    const r = dial.current!.getBoundingClientRect();
    const a = (Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2)) * 180) / Math.PI;
    const i = Math.round(((a + 90 + 360) % 360) / 72) % 5;
    setSel(i);
  };
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setSel((s) => (s + 1) % 5); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setSel((s) => (s + 4) % 5); }
  };
  return (
    <>
      <PageHero label="Product & go-to-market" title="Strategy that" italic="moves products." />
      <section aria-labelledby="gtm-h" className="grid-lines mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] items-center gap-12 px-5 pb-28 md:px-10 lg:grid-cols-[1fr_600px]">
        <div aria-live="polite">
          <h2 id="gtm-h" className="sr-only">What I bring to product strategy</h2>
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, ease }} className="border-t-[3px] border-accent pt-6">
              <p className="pixel text-xs text-accent">0{sel + 1} / 05 · {gtm[sel].t.toUpperCase()}</p>
              <p className="display mt-4 text-[44px] leading-[1.05] md:text-[56px]">{gtm[sel].d}</p>
            </motion.div>
          </AnimatePresence>
          <p className="label mt-8 text-muted">Drag the dial, or use the arrow keys ↻</p>
        </div>
        <div className="relative mx-auto w-full max-w-[600px]">
          <svg
            ref={dial}
            viewBox="0 0 640 640"
            className="w-full touch-none select-none"
            role="slider"
            tabIndex={0}
            aria-label="Strategy capability"
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={sel + 1}
            aria-valuetext={gtm[sel].t}
            onKeyDown={keys}
            onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); pick(e.clientX, e.clientY); }}
            onPointerMove={(e) => e.buttons && pick(e.clientX, e.clientY)}
            data-cursor="Drag"
          >
            <g fill="none" stroke="var(--ink)">
              <circle cx="320" cy="320" r="300" strokeOpacity="0.2" />
              <circle cx="320" cy="320" r="250" strokeOpacity="0.5" />
              <circle cx="320" cy="320" r="170" strokeOpacity="0.25" strokeDasharray="2 6" />
              <circle cx="320" cy="320" r="90" strokeOpacity="0.6" />
              <line x1="20" y1="320" x2="620" y2="320" strokeOpacity="0.12" />
              <line x1="320" y1="20" x2="320" y2="620" strokeOpacity="0.12" />
              {Array.from({ length: 72 }, (_, i) => {
                const a = (i * 5 * Math.PI) / 180;
                return <line key={i} x1={320 + Math.cos(a) * 286} y1={320 + Math.sin(a) * 286} x2={320 + Math.cos(a) * (i % 6 ? 294 : 300)} y2={320 + Math.sin(a) * (i % 6 ? 294 : 300)} strokeOpacity="0.4" />;
              })}
            </g>
            <motion.g animate={{ rotate: angle(sel) + 90 }} style={{ originX: "320px", originY: "320px" }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
              <line x1="320" y1="320" x2="320" y2="70" stroke="var(--accent)" strokeWidth="2.5" />
              <circle cx="320" cy="70" r="12" fill="var(--accent)" />
            </motion.g>
            <circle cx="320" cy="320" r="6" fill="var(--ink)" />
            {gtm.map((g, i) => {
              const a = (angle(i) * Math.PI) / 180;
              const x = 320 + Math.cos(a) * 250;
              const y = 320 + Math.sin(a) * 250;
              const lx = 320 + Math.cos(a) * 318;
              const ly = 320 + Math.sin(a) * 318;
              return (
                <g key={g.t} onClick={() => setSel(i)} className="cursor-pointer">
                  <circle cx={x} cy={y} r={sel === i ? 9 : 6} fill={sel === i ? "var(--accent)" : "var(--ink)"} />
                  <text x={lx} y={ly} textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"} dominantBaseline="middle" fontFamily="var(--f-mono)" fontSize="13" letterSpacing="1.5" fill={sel === i ? "var(--accent)" : "var(--ink)"}>
                    0{i + 1} {g.t.split(" ")[0].toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>
      <section aria-labelledby="pr-h" className="bg-[#101010] px-5 py-32 text-center text-[#E9E8E3] md:px-10 md:py-44">
        <p className="label text-[#8b8f96]">+ My principle</p>
        <h2 id="pr-h" className="display mx-auto mt-6 max-w-5xl text-[11vw] leading-[1] md:text-[84px]">A product shouldn&apos;t exist because it <em className="text-[#8b8f96]">can</em> be built.</h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {["A meaningful problem", "A viable market", "A reason to choose it"].map((t, i) => (
            <Rise key={t} delay={i * 0.12}><li className={`ui-chip !border-white/30 !px-5 !py-2.5 text-[15px] ${i === 2 ? "!border-transparent bg-[#2B3CFF]" : ""}`}>{t}</li></Rise>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ───────────────────────── ENGINEERING ───────────────────────── */

export function Engineering() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = gsap.utils.toArray<SVGGeometryElement>(".bp path, .bp rect, .bp line, .bp circle");
        paths.forEach((p) => {
          const len = p.getTotalLength?.() ?? 400;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, { strokeDashoffset: 0, stagger: 0.03, ease: "none", scrollTrigger: { trigger: ".bp", start: "top 80%", end: "bottom 60%", scrub: 1 } });
        gsap.from(".bp-note", { opacity: 0, x: 30, stagger: 0.25, scrollTrigger: { trigger: ".bp", start: "top 60%", end: "bottom 70%", scrub: 1 } });
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="eng-h" className="grid-squares">
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] gap-14 px-5 pb-28 pt-32 md:px-10 md:pt-40 lg:grid-cols-[1fr_620px]">
        <div>
          <p className="label text-muted">+ Engineering · Dwg. 05 · Scale 1:20</p>
          <h1 id="eng-h" className="display mt-4 text-[15vw] leading-[0.88] md:text-[120px]"><Reveal text="Product thinking," /><br /><em><Reveal text="made buildable." delay={0.2} /></em></h1>
          <p className="mt-8 max-w-lg text-[17px] leading-7 text-muted">Product design and engineering shouldn&apos;t be disconnected. I translate product intent into clear, structured, technically informed execution.</p>
          <ol className="mt-12 border-t border-ink">
            {engineeringAreas.map((a, i) => (
              <li key={a} className="group flex gap-5 border-b border-[var(--hair)] py-4 text-[16px] transition-colors hover:text-accent">
                <span className="label w-12 pt-1 text-muted group-hover:text-accent">S.0{i + 1}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative">
          <svg viewBox="0 0 420 860" className="bp mx-auto h-auto w-[60%] md:w-[70%]" aria-hidden>
            <g fill="none" stroke="var(--ink)" strokeWidth="1.4">
              <rect x="70" y="40" width="280" height="30" />
              <path d="M90 70 Q60 105 100 115 L320 115 Q360 105 330 70 Z" />
              <circle cx="96" cy="94" r="12" />
              <circle cx="324" cy="94" r="12" />
              <rect x="110" y="115" width="200" height="560" />
              {[135, 160, 185, 210, 235, 260, 285].map((x) => <line key={x} x1={x} y1="125" x2={x} y2="665" />)}
              <rect x="90" y="675" width="240" height="30" />
              <rect x="60" y="705" width="300" height="40" stroke="var(--accent)" strokeWidth="3" />
              <line x1="400" y1="40" x2="400" y2="745" strokeDasharray="4 4" />
              <line x1="60" y1="790" x2="360" y2="790" />
            </g>
          </svg>
          <ul className="absolute right-0 top-0 flex h-[86%] flex-col justify-between">
            {[["A · Capital", "The experience must make sense."], ["B · Shaft", "The architecture must support it."], ["C · Base", "The business model must sustain it."]].map(([k, t], i) => (
              <li key={k} className="bp-note max-w-[180px]">
                <span className={`pixel text-[11px] ${i === 2 ? "text-accent" : "text-muted"}`}>{k}</span>
                <p className={`display text-[22px] leading-7 md:text-[26px] ${i === 2 ? "italic" : ""}`}>{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
