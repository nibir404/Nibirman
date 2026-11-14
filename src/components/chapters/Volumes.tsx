"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { volumes, type Volume } from "@/lib/career";
import { useLenis } from "@/components/SmoothScroll";
import ChapterShell from "./ChapterShell";

/** CH.05 — Case studies as a shelf of comic volumes. Arrow keys browse, Enter opens. */
export default function Volumes() {
  const [sel, setSel] = useState(2);
  const [open, setOpen] = useState<Volume | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const shelf = document.getElementById("volumes")?.getBoundingClientRect();
      const inView = shelf && shelf.top < window.innerHeight / 2 && shelf.bottom > window.innerHeight / 2;
      if (open) {
        if (e.key === "Escape" || e.key.toLowerCase() === "b") setOpen(null);
        return;
      }
      if (!inView) return;
      if (e.key === "ArrowRight") setSel((s) => Math.min(s + 1, volumes.length - 1));
      if (e.key === "ArrowLeft") setSel((s) => Math.max(s - 1, 0));
      if (e.key === "Enter") setOpen(volumes[sel]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, sel]);

  return (
    <ChapterShell id="volumes" bg="/anime/bg-shelf.jpg" title="Pick a volume." hint="click a volume · or use ← → and ENTER">
      <div className="flex items-end justify-center gap-2 overflow-x-auto pb-6 md:gap-4">
        {volumes.map((v, i) => {
          const d = i - sel;
          return (
            <motion.button
              key={v.slug}
              onClick={() => (i === sel ? setOpen(v) : setSel(i))}
              animate={{ scale: d === 0 ? 1.08 : 0.9, rotate: d * 4, y: d === 0 ? -20 : Math.abs(d) * 14, opacity: Math.abs(d) > 2 ? 0.6 : 1 }}
              whileHover={{ y: -30 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="panel relative w-40 shrink-0 bg-black text-left md:w-56"
              style={{ zIndex: 10 - Math.abs(d) }}
            >
              <div className={`accent-bg border-b-4 border-black px-3 py-2 font-display text-lg md:text-xl ${v.header}`}>{v.name.toUpperCase()}</div>
              <div className="relative aspect-[3/4]">
                <Image src={v.img} alt={`${v.name} cover`} fill sizes="224px" className="object-cover" />
              </div>
              <div className="accent-text px-3 py-2 font-mono text-[11px] uppercase text-tang">{v.tag}</div>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={sel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center font-display text-2xl md:text-3xl"
        >
          {volumes[sel].logline}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence>{open && <CaseStudy v={open} onClose={() => setOpen(null)} onNext={() => {
        const n = volumes[(volumes.indexOf(open) + 1) % volumes.length];
        setSel(volumes.indexOf(n));
        setOpen(n);
      }} />}</AnimatePresence>
    </ChapterShell>
  );
}

/** Full-screen case study: beats slam in one by one like comic captions. */
function CaseStudy({ v, onClose, onNext }: { v: Volume; onClose: () => void; onNext: () => void }) {
  const beat = (i: number) => ({
    initial: { opacity: 0, x: 120, rotate: 4 },
    animate: { opacity: 1, x: 0, rotate: [-1.5, 1.2, -0.8][i] },
    transition: { delay: 0.5 + i * 0.35, type: "spring" as const, stiffness: 180, damping: 18 },
  });
  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label={`${v.name} case study`}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink"
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
    >
      <motion.div className="fixed inset-0" initial={{ scale: 1.3 }} animate={{ scale: 1.05 }} transition={{ duration: 6, ease: "easeOut" }}>
        <Image src={v.img} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="fixed inset-0 bg-[linear-gradient(90deg,transparent_20%,rgba(11,11,18,0.85)_70%)]" />
      <header className="relative z-10 flex justify-between px-6 py-5 font-mono text-sm md:px-10">
        <span><b>VOL.{v.vol}</b> {v.name} · {v.role}</span>
        <button onClick={onClose} className="hover:text-tang">B / Esc = back to shelf ✕</button>
      </header>
      <div className="relative z-10 ml-auto flex max-w-xl flex-col gap-6 px-6 py-10 md:mr-16">
        <motion.div {...beat(0)} className="panel bg-paper p-6 text-ink">
          <p className="font-mono text-xs uppercase text-cobalt">The problem</p>
          <p className="mt-2 font-display text-2xl leading-tight md:text-3xl">{v.problem}</p>
        </motion.div>
        <motion.div {...beat(1)} className="panel accent-bg bg-tang p-6 text-ink">
          <p className="font-mono text-xs uppercase">My move</p>
          <p className="mt-2 font-display text-2xl leading-tight md:text-3xl">{v.move}</p>
        </motion.div>
        <motion.div {...beat(2)} className="panel flex items-center gap-6 border-cream bg-black p-6">
          <span className="accent-text font-display text-6xl text-tang md:text-7xl">{v.resultBig}</span>
          <div>
            <p className="font-mono text-xs uppercase text-paper/70">The result</p>
            <p className="mt-1 font-display text-xl leading-tight">{v.result}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex gap-4">
          <button onClick={onNext} className="border-4 border-paper px-5 py-3 font-display text-sm hover:bg-paper hover:text-ink">
            NEXT VOLUME →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
