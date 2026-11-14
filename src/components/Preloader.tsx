"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import MachineImage from "@/components/gl/MachineImage";
import { useLenis } from "@/components/SmoothScroll";

/** The painting resolves: ASCII → Bayer dither → oil (shader mode "resolve"). Once per session. */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const progress = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("nibirman:preloaded") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const state = { p: 0 };
    const tw = gsap.to(state, {
      p: 1,
      duration: 2.4,
      ease: "power1.inOut",
      delay: 0.3,
      onUpdate: () => {
        progress.current = state.p;
        setPct(Math.round(state.p * 100));
      },
      onComplete: () => {
        setTimeout(() => setShow(false), 450);
        try {
          sessionStorage.setItem("nibirman:preloaded", "1");
        } catch {}
      },
    });
    return () => {
      tw.kill();
    };
  }, []);

  useEffect(() => {
    if (show) lenis?.stop();
    else lenis?.start();
  }, [show, lenis]);

  const stage = pct < 35 ? "I · ASCII" : pct < 75 ? "II · Bayer dither" : "III · Oil";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-paper"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="relative h-[58svh] w-[min(76vw,37svh)] overflow-hidden rounded-t-full border border-ink">
            <MachineImage src="/paintings/philosopher.jpg" alt="" mode="resolve" progressRef={progress} className="h-full w-full" />
          </div>
          <div className="flex w-[min(76vw,37svh)] justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
            <span>{stage}</span>
            <span className="tabular-nums">{pct}%</span>
          </div>
          <p className="label text-muted">The machine is still learning your face</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
