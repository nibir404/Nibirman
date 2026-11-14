"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { roman, stations } from "@/lib/career";

/** Engraved Bengal landscape, one wide SVG per parallax layer. */
function Layer({ speed, children, className = "" }: { speed: number; children: React.ReactNode; className?: string }) {
  return (
    <div data-speed={speed} className={`layer absolute inset-y-0 left-0 w-[500%] ${className}`}>
      <svg viewBox="0 0 5000 600" preserveAspectRatio="none" className="h-full w-full">
        {children}
      </svg>
    </div>
  );
}

const hills = (seed: number, base: number, amp: number) => {
  let d = `M0 600 L0 ${base}`;
  const r = (n: number) => Math.round(n); // integers: identical on server and client
  for (let x = 0; x <= 5000; x += 150)
    d += ` Q${x + 75} ${r(base - amp * Math.abs(Math.sin(x * 0.002 + seed)))} ${x + 150} ${r(base - amp * 0.4 * Math.abs(Math.sin((x + 150) * 0.0016 + seed)))}`;
  return d + " L5000 600 Z";
};

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="var(--ink)">
      <path d="M-4 0 C0 -50 6 -100 6 -150 L11 -150 C12 -100 8 -50 4 0 Z" />
      <path d="M8 -150 C-20 -168 -50 -166 -74 -146 C-46 -156 -22 -156 8 -146 Z" />
      <path d="M8 -150 C-10 -180 -38 -192 -66 -188 C-38 -180 -14 -166 6 -146 Z" />
      <path d="M8 -150 C10 -182 26 -204 50 -210 C32 -194 20 -174 12 -146 Z" />
      <path d="M8 -150 C36 -170 66 -168 88 -146 C62 -156 36 -156 10 -146 Z" />
      <path d="M8 -150 C38 -154 62 -140 72 -116 C54 -134 32 -142 10 -144 Z" />
      <path d="M8 -150 C-16 -148 -40 -132 -48 -110 C-32 -128 -12 -138 8 -144 Z" />
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M20 100 Q10 70 45 66 Q50 30 95 38 Q120 8 165 28 Q200 4 240 30 Q285 18 300 52 Q350 46 360 78 Q400 82 398 100 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M40 92 Q100 82 160 88 Q240 78 320 90 Q360 88 390 94" fill="none" stroke="var(--ink)" strokeWidth="0.7" />
    </g>
  );
}

/**
 * Act II — The journey. Pinned train window; the land rushes past in parallax and each
 * career station arrives as a platform board.
 */
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".window-stage", start: "top top", end: `+=${stations.length * 90}%`, scrub: 1.2, pin: true },
        });
        gsap.utils.toArray<HTMLElement>(".layer").forEach((l) => tl.to(l, { xPercent: -Number(l.dataset.speed) * 14, ease: "none" }, 0));
        tl.to(".boards", { xPercent: (-100 * (stations.length - 1)) / stations.length, ease: "none" }, 0);
        tl.to(".line-progress", { scaleX: 1, ease: "none" }, 0);
        gsap.to(".carriage", { y: 2.5, rotation: 0.12, duration: 0.42, yoyo: true, repeat: -1, ease: "sine.inOut" });
      });
    },
    { scope: root },
  );

  return (
    <section id="journey" ref={root} className="relative">
      {/* continuation of the portal so the cut is seamless */}
      <div className="flex h-[60svh] items-end justify-center bg-ink pb-16 text-paper">
        <p className="label opacity-70">Scroll · the train is leaving the station</p>
      </div>
      <div className="window-stage relative h-svh overflow-hidden bg-paper">
        <div className="carriage absolute inset-0 flex flex-col px-5 pb-6 pt-24 md:px-10 lg:pl-64 md:pt-28">
          <div className="mb-4 flex items-end justify-between gap-6">
            <h2 className="font-serif text-5xl serif-tight md:text-7xl">
              The <em>journey</em>
            </h2>
            <p className="label max-w-xs text-right text-muted">Act II · Dhaka line · {stations.length} stations · window seat</p>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-[48px] border-[10px] border-ink md:rounded-[72px] md:border-[14px]" style={{ background: "color-mix(in oklab, var(--ink) 22%, var(--paper))" }}>
            <Layer speed={0.6} className="top-0">
              <Cloud x={120} y={40} />
              <Cloud x={900} y={110} s={0.7} />
              <Cloud x={1700} y={30} s={0.9} />
              <Cloud x={2600} y={90} s={0.75} />
              <Cloud x={3500} y={50} />
              <Cloud x={4300} y={100} s={0.8} />
              <g fill="none" stroke="var(--ink)">
                <circle cx="1300" cy="110" r="34" fill="var(--paper)" strokeWidth="1.6" />
                <circle cx="1300" cy="110" r="46" strokeWidth="0.8" />
                <circle cx="1300" cy="110" r="60" strokeWidth="0.6" strokeDasharray="2 5" />
              </g>
            </Layer>
            <Layer speed={1} className="top-[28%] opacity-40">
              <path d={hills(1, 420, 150)} fill="var(--ink)" />
            </Layer>
            <Layer speed={2} className="top-[38%]">
              <defs>
                <pattern id="hatchA" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
                  <line x1="0" y1="0" x2="0" y2="7" stroke="var(--ink)" strokeWidth="1.3" />
                </pattern>
              </defs>
              <path d={hills(4, 360, 90)} fill="url(#hatchA)" stroke="var(--ink)" strokeWidth="2" />
              {Array.from({ length: 22 }, (_, i) => (
                <Palm key={i} x={140 + i * 230 + ((i * 53) % 70)} y={360 - ((i * 37) % 40)} s={0.75 + ((i * 17) % 40) / 100} />
              ))}
            </Layer>
            <Layer speed={4} className="top-[68%]">
              <defs>
                <pattern id="paddy" width="14" height="10" patternUnits="userSpaceOnUse">
                  <path d="M0 10 L4 0 M7 10 L10 2" stroke="var(--ink)" strokeWidth="1.2" />
                </pattern>
              </defs>
              <rect width="5000" height="600" fill="var(--paper)" />
              <rect width="5000" height="600" fill="url(#paddy)" />
              <line x1="0" y1="1" x2="5000" y2="1" stroke="var(--ink)" strokeWidth="2" />
            </Layer>
            <Layer speed={9} className="top-0">
              {Array.from({ length: 20 }, (_, i) => (
                <g key={i} stroke="var(--ink)">
                  <line x1={i * 260 + 40} y1="40" x2={i * 260 + 40} y2="600" strokeWidth="6" />
                  <line x1={i * 260 + 10} y1="70" x2={i * 260 + 70} y2="70" strokeWidth="5" />
                  <path d={`M${i * 260 + 40} 70 Q${i * 260 + 170} 140 ${i * 260 + 300} 70`} strokeWidth="1.4" fill="none" />
                </g>
              ))}
            </Layer>

            <div className="boards absolute inset-0 flex" style={{ width: `${stations.length * 100}%` }}>
              {stations.map((s, i) => (
                <div key={s.name} className="flex h-full flex-1 flex-col items-center justify-start pt-[6%]">
                  <div className="w-[min(420px,80%)] border-2 border-ink bg-paper p-1.5">
                    <div className="flex flex-col items-center gap-2 border border-ink px-6 py-5 text-center">
                      <p className="label">Station {roman[i]} — {s.role}</p>
                      <p className="font-serif text-5xl serif-tight md:text-6xl">{s.name}</p>
                      <span className="h-px w-10 bg-ink" />
                      <p className="font-serif text-lg italic leading-snug md:text-xl">{s.note}</p>
                    </div>
                  </div>
                  <div className="flex w-[min(420px,80%)] justify-between px-14">
                    <span className="h-32 w-1.5 bg-ink" />
                    <span className="h-32 w-1.5 bg-ink" />
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.2)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.08)_100%)]" />
          </div>

          <div className="mt-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span>{stations[0].name}</span>
            <div className="relative h-px flex-1 bg-ink/25">
              <div className="line-progress absolute inset-0 origin-left scale-x-0 bg-ink" />
            </div>
            <span>{stations[stations.length - 1].name} · now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
