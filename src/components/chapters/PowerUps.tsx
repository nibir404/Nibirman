"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { powerUps } from "@/lib/career";
import ChapterShell from "./ChapterShell";

const tilts = [-6, -2, 3, 7];

/** CH.02 — four trading cards deal onto the table, flip to reveal the proof. */
export default function PowerUps() {
  const grid = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".card", {
        y: 400,
        rotate: (i: number) => tilts[i] * 4,
        opacity: 0,
        stagger: 0.12,
        ease: "back.out(1.4)",
        duration: 1,
        scrollTrigger: { trigger: grid.current, start: "top 80%" },
      });
    },
    { scope: grid },
  );

  return (
    <ChapterShell id="powerups" bg="/anime/bg-powerups.jpg" title={<>My <span className="accent-text text-tang">power-ups.</span></>} hint="hover or tap a card to flip it · see the proof">
      <div ref={grid} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {powerUps.map((p, i) => (
          <button
            key={p.n}
            className="card h-80 text-left [perspective:1200px] lg:h-96"
            style={{ rotate: `${tilts[i]}deg` }}
            onMouseEnter={() => setFlipped(i)}
            onMouseLeave={() => setFlipped(null)}
            onClick={() => setFlipped((f) => (f === i ? null : i))}
            aria-label={`${p.title}: ${p.proof}`}
          >
            <motion.div
              animate={{ rotateY: flipped === i ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              <div className={`panel accent-bg absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden] ${p.tone}`}>
                <span className="font-display text-7xl">{p.n}</span>
                <span className="font-display text-3xl leading-tight">{p.title}</span>
              </div>
              <div className="panel absolute inset-0 flex flex-col justify-between bg-paper p-6 text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt">Proof · {p.n}</span>
                <p className="font-display text-xl leading-snug">{p.proof}</p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </ChapterShell>
  );
}
