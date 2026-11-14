"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Global, mutable scroll progress (0 → 1) read by the Three.js scene every frame. */
export const scrollState = { progress: 0, velocity: 0 };

const LenisCtx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisCtx);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<(t: number) => void>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const l = new Lenis({ duration: reduce ? 0 : 1.25, smoothWheel: !reduce, wheelMultiplier: 0.9 });

    l.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      scrollState.progress = e.limit ? e.scroll / e.limit : 0;
      scrollState.velocity = e.velocity;
    });

    raf.current = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(raf.current);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    if (process.env.NODE_ENV !== "production") (window as unknown as { lenis: Lenis }).lenis = l;

    return () => {
      if (raf.current) gsap.ticker.remove(raf.current);
      l.destroy();
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
