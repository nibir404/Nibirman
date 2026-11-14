"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins every sheet (except the last) once its bottom reaches the viewport bottom,
 * so the next sheet tears in over it — and gently dims/sinks the one underneath.
 */
export default function SheetStack() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sheets = gsap.utils.toArray<HTMLElement>(".sheet");
    const triggers = sheets.slice(0, -1).flatMap((sheet, i) => {
      const next = sheets[i + 1];
      const body = sheet.lastElementChild as HTMLElement;
      return [
        ScrollTrigger.create({ trigger: sheet, start: "bottom bottom", endTrigger: next, end: "top top", pin: true, pinSpacing: false }),
        gsap.to(body, {
          scale: 0.96,
          filter: "brightness(0.93)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        }).scrollTrigger!,
      ];
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      triggers.forEach((t) => t.kill());
    };
  }, []);
  return null;
}
