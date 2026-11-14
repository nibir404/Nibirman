"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { profile, acts } from "@/lib/career";

const TOTAL = 240;
// layers at which each line of the career "prints" (bottom → top)
const log = [
  { at: 40, text: "Tecognize — interface craft" },
  { at: 80, text: "SIMEC — LIMS, ministries" },
  { at: 120, text: "Design systems + a11y" },
  { at: 150, text: "Digital Gregg — 988, transit" },
  { at: 180, text: "Poridhi — roadmap owner" },
  { at: 205, text: "DIU — Agentic PM (now)" },
  { at: 238, text: "Name & title, top layer" },
];

/**
 * The print room. Pressing "Print" builds the résumé as a stone tablet, layer by layer,
 * while the console logs each career layer. When done, take it off the bed (download).
 */
export default function Printer() {
  const [state, setState] = useState<"idle" | "printing" | "ready">("idle");
  const [layer, setLayer] = useState(0);
  const nozzle = useRef<SVGGElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);

  const start = () => {
    setState("printing");
    const s = { l: 0 };
    gsap.to(nozzle.current, { x: 70, duration: 0.35, yoyo: true, repeat: -1, ease: "sine.inOut" });
    tw.current = gsap.to(s, {
      l: TOTAL,
      duration: 6,
      ease: "power1.inOut",
      onUpdate: () => setLayer(Math.round(s.l)),
      onComplete: () => {
        gsap.killTweensOf(nozzle.current);
        gsap.to(nozzle.current, { x: 0, duration: 0.4 });
        setState("ready");
      },
    });
  };
  const skip = () => {
    tw.current?.progress(1);
  };

  const pct = Math.round((layer / TOTAL) * 100);
  // the tablet spans y 262 → 480 in the SVG; it grows from the bed upward
  const h = (218 * layer) / TOTAL;
  const top = 480 - h;

  return (
    <main className="grid min-h-svh items-center gap-10 px-5 pb-16 pt-28 md:px-10 lg:grid-cols-[22rem_1fr_21rem]">
      <div>
        <p className="label text-muted">Résumé · the print room</p>
        <h1 className="mt-5 font-serif text-7xl serif-tight md:text-[104px]">
          Print my
          <br />
          <em>résumé.</em>
        </h1>
        <p className="mt-6 max-w-sm font-serif text-xl leading-snug">
          Six years, set in stone, one layer at a time. When the print finishes, take it off the bed — it lands in your downloads as a PDF.
        </p>
        <p className="label mt-10">PDF · {acts.length} acts · updated {new Date().getFullYear()}</p>
      </div>

      <svg viewBox="0 0 640 660" className="mx-auto w-full max-w-[680px]" role="img" aria-label={`A 3D printer printing the résumé, ${pct}% complete`}>
        <defs>
          <clipPath id="printed">
            <rect x="200" y={top - 30} width="280" height={h + 30} />
          </clipPath>
        </defs>
        <g fill="none" stroke="var(--ink)" strokeLinejoin="round">
          <polygon points="60,590 500,590 580,530 140,530" fill="color-mix(in oklab, var(--ink) 14%, var(--paper))" strokeWidth="1.6" />
          <polygon points="60,590 500,590 500,612 60,612" fill="var(--ink)" />
          <polygon points="500,590 580,530 580,552 500,612" fill="var(--ink)" opacity="0.8" />
          <line x1="150" y1="530" x2="150" y2="40" strokeWidth="6" />
          <line x1="570" y1="530" x2="570" y2="40" strokeWidth="6" />
          <polygon points="150,40 570,40 490,100 70,100" fill="color-mix(in oklab, var(--ink) 6%, var(--paper))" strokeWidth="2" />
          <polygon points="140,500 430,500 500,450 210,450" fill="var(--card)" strokeWidth="1.8" />
          <polygon points="140,500 430,500 430,510 140,510" fill="var(--ink)" />
          {/* ghost of the finished tablet */}
          <rect x="222" y="262" width="196" height="218" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
          <polyline points="418,262 450,240 450,458 418,480" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
          {/* the printed part */}
          <g clipPath="url(#printed)">
            <rect x="222" y="262" width="196" height="218" fill="var(--paper)" strokeWidth="2" />
            {Array.from({ length: 36 }, (_, i) => (
              <line key={i} x1="222" x2="418" y1={268 + i * 6} y2={268 + i * 6} strokeWidth="0.5" opacity="0.28" />
            ))}
            <polygon points="418,262 450,240 450,458 418,480" fill="color-mix(in oklab, var(--ink) 30%, var(--paper))" strokeWidth="2" />
            <g fill="var(--ink)" stroke="none" fontFamily="var(--nf-serif), Georgia, serif" textAnchor="middle">
              <text x="320" y="300" fontSize="26">IMTIAZ AHMED</text>
              <text x="320" y="330" fontSize="15" fontStyle="italic">{profile.title}</text>
              <text x="320" y="364" fontSize="10.5" letterSpacing="1.4">DIU · PORIDHI · DIGITAL GREGG</text>
              <text x="320" y="382" fontSize="10.5" letterSpacing="1.4">SIMEC · TECOGNIZE</text>
              <text x="320" y="414" fontSize="10.5" letterSpacing="1.4">STRATEGY · AGENTIC AI</text>
              <text x="320" y="432" fontSize="10.5" letterSpacing="1.4">RESEARCH · DESIGN SYSTEMS</text>
              <text x="320" y="462" fontSize="10.5" letterSpacing="1.4">6+ YEARS · DHAKA</text>
            </g>
          </g>
          {state === "printing" && <line x1="230" x2="440" y1={top} y2={top - 22} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />}
          <line x1="70" y1={Math.min(246, top - 110)} x2="490" y2={Math.min(246, top - 110)} strokeWidth="3" />
          <g transform={`translate(0 ${Math.min(0, top - 356)})`}>
            <g ref={nozzle}>
              <rect x="290" y="212" width="64" height="62" fill="var(--card)" strokeWidth="2" />
              <path d="M298 226 H346 M298 234 H346 M298 242 H346" strokeWidth="1" />
              <polygon points="312,274 332,274 324,304 320,304" fill="var(--ink)" />
              {state === "printing" && <circle cx="322" cy="308" r="8" fill="var(--accent)" opacity="0.4" stroke="none" />}
            </g>
          </g>
          <circle cx="560" cy="128" r="42" fill="var(--card)" strokeWidth="2" />
          <circle cx="560" cy="128" r="12" fill="var(--ink)" />
          <line x1="70" y1="590" x2="70" y2="100" strokeWidth="9" />
          <line x1="490" y1="590" x2="490" y2="100" strokeWidth="9" />
        </g>
      </svg>

      <div className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between border-b border-ink pb-2">
          <span className="label">● {state === "idle" ? "Idle" : state === "printing" ? "Printing" : "Ready"}</span>
          <span className="font-serif text-6xl tabular-nums">{pct}%</span>
        </div>
        <div className="h-1.5 bg-ink/15">
          <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between font-mono text-[11px] tracking-[0.12em]">
          <span>LAYER {layer} / {TOTAL}</span>
          <span>ETA 0:0{Math.max(0, Math.ceil(((TOTAL - layer) / TOTAL) * 6))}</span>
        </div>
        <div className="flex min-h-48 flex-col gap-1.5 border hair bg-card p-4 font-mono text-[11.5px]" aria-live="polite">
          {log.map((l) => {
            const done = layer >= l.at;
            const current = done && log.filter((x) => layer >= x.at).at(-1) === l;
            return (
              <span key={l.at} className={current ? "font-bold" : done ? "text-muted" : "opacity-30"}>
                {current ? "▸" : ";"} L{l.at} {l.text}
              </span>
            );
          })}
        </div>
        {state === "idle" && (
          <button onClick={start} data-cursor="Print" className="rounded-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper">
            Start the print ▸
          </button>
        )}
        {state === "printing" && (
          <button onClick={skip} className="rounded-full border border-dashed border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.18em]">
            Hurry it up ⏩
          </button>
        )}
        {state === "ready" && (
          <a href={profile.cvUrl} download data-cursor="PDF" className="flex justify-between rounded-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper">
            <span>Take it off the bed</span>
            <span>↓ PDF</span>
          </a>
        )}
        <p className="font-serif text-lg italic text-muted">
          Can&apos;t wait?{" "}
          <a href={profile.cvUrl} download className="text-ink underline">
            Skip the print, grab the PDF.
          </a>
        </p>
      </div>
    </main>
  );
}
