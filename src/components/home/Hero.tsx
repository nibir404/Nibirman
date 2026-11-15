"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTime } from "../TimeProvider";
import { Magnetic, TitleBar } from "../fx";

function Seal() {
  return (
    <svg viewBox="-100 -100 200 200" className="h-full w-full" aria-hidden>
      <circle r="96" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle r="70" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 4" />
      <path id="seal-arc" d="M-82 0 A82 82 0 1 1 82 0 A82 82 0 1 1 -82 0" fill="none" />
      <text fontFamily="var(--f-mono)" fontSize="14" letterSpacing="4" fill="var(--ink)"><textPath href="#seal-arc">MADE IN DHAKA · BANGLADESH · </textPath></text>
      <g fill="none" stroke="var(--ink)" strokeWidth="2.4">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <path key={r} d="M0 0 C9 -14 9 -34 0 -48 C-9 -34 -9 -14 0 0Z" transform={`rotate(${r})`} />)}
      </g>
      <circle r="9" fill="var(--accent)" />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { art, edition, palette } = useTime();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const back = { x: useTransform(sx, (v) => v * -18), y: useTransform(sy, (v) => v * -10) };
  const mid = { x: useTransform(sx, (v) => v * 10), y: useTransform(sy, (v) => v * 6) };
  const front = { x: useTransform(sx, (v) => v * 30), y: useTransform(sy, (v) => v * 16) };
  const rotY = useTransform(sx, (v) => v * 6);
  const rotX = useTransform(sy, (v) => v * -4);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from(".h-arch", { clipPath: "inset(100% 0 0 0)", duration: 1.6, ease: "expo.inOut" })
          .from(".h-back", { yPercent: 40, opacity: 0, duration: 1.4 }, 0.3)
          .from(".h-front", { yPercent: 40, opacity: 0, duration: 1.4 }, 0.45)
          .from(".h-band", { scaleX: 0, duration: 1, ease: "power4.inOut" }, 0.9)
          .from(".h-meta", { opacity: 0, y: 16, stagger: 0.08, duration: 0.8 }, 1.1);
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
        tl.to(".h-back", { xPercent: -22, ease: "none" }, 0)
          .to(".h-front", { xPercent: 18, ease: "none" }, 0)
          .to(".h-arch-wrap", { scale: 1.12, yPercent: 8, ease: "none" }, 0)
          .to(".h-band", { scaleX: 1.6, ease: "none" }, 0)
          .to(".h-seal", { rotation: 140, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <h1 id="hero-title" className="sr-only">Imtiaz Ahmed, AI Product Architect — Building what comes next.</h1>

      <motion.p aria-hidden style={back} className="h-back display absolute left-[-1vw] top-[14svh] whitespace-nowrap text-[30vw] leading-[0.85] md:top-[12svh] md:text-[29vw] xl:text-[420px]">
        Building
      </motion.p>

      <motion.div style={{ ...mid, rotateY: rotY, rotateX: rotX, transformPerspective: 1000 }} className="h-arch-wrap absolute left-1/2 top-[24svh] h-[48svh] w-[min(62vw,32svh)] -translate-x-1/2 md:top-[16svh] md:h-[84svh] md:w-[min(36vw,56svh)]">
        <div aria-hidden className="absolute -inset-3 rounded-t-full border-2 border-dashed border-ink [[data-world=editorial]_&]:block hidden" />
        <div className="h-arch ui-arch relative h-full w-full bg-ink">
          <TitleBar title={`engraving_${edition}.bmp`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art} alt="Engraving of Imtiaz Ahmed — the image changes every visit" className="h-full w-full object-cover grayscale contrast-125" />
        </div>
        <div className="h-band absolute left-[-12%] right-[-12%] top-[30%] flex h-10 items-center justify-between bg-accent px-4 text-[var(--on-accent)] md:h-12" aria-hidden>
          <span className="pixel text-xs md:text-sm">█ █ ▌ ▐</span>
          <span className="pixel text-xs tracking-[0.08em] md:text-sm">WHAT COMES</span>
          <span className="pixel text-xs md:text-sm">▐ ▌ █ █</span>
        </div>
      </motion.div>

      <motion.p aria-hidden style={front} className="h-front display absolute bottom-[14svh] right-[3vw] text-[30vw] italic leading-[0.85] md:bottom-[-2svh] md:text-[22vw] xl:text-[310px]">
        next.
      </motion.p>

      <div className="h-seal absolute right-[5vw] top-[58svh] hidden h-[120px] w-[120px] md:block" aria-hidden>
        <Seal />
      </div>

      <div className="absolute bottom-6 left-5 z-10 flex items-center gap-4 md:bottom-10 md:left-10">
        <Magnetic>
          <Link href="/work" className="h-meta ui-btn" data-cursor="Enter">Explore my work <span className="ui-dot">→</span></Link>
        </Magnetic>
        <span className="h-meta label hidden text-muted lg:block">Independent thinker · Product builder · {palette.name} in Dhaka</span>
      </div>
    </section>
  );
}
