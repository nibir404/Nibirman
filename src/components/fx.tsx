"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Words rise from a mask as they enter the viewport. */
export function Reveal({ text, className = "", delay = 0, as: Tag = "span" }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" | "h3" | "p" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", rotate: 3 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: delay + i * 0.05 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + lift on enter. */
export function Rise({ children, className = "", delay = 0, y = 32 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Element drifts toward the pointer. */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Image that drifts slower than the page (parallax). */
export function ParallaxImg({ src, alt, className = "", amount = 12 }: { src: string; alt: string; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img src={src} alt={alt} className="absolute inset-0 h-[124%] w-full -top-[12%] object-cover grayscale" style={reduce ? undefined : { y }} />
    </div>
  );
}

/** Retro worlds add a title bar to framed objects; Editorial hides it. */
export function TitleBar({ title }: { title: string }) {
  return (
    <div className="world-titlebar" aria-hidden>
      <span>{title}</span>
      <span className="hidden gap-1 [[data-world=win98]_&]:flex">
        <i className="block h-3.5 w-4 bg-[#c0c0c0] text-center text-[9px] not-italic leading-3 text-black">_</i>
        <i className="block h-3.5 w-4 bg-[#c0c0c0] text-center text-[9px] not-italic leading-3 text-black">□</i>
        <i className="block h-3.5 w-4 bg-[#c0c0c0] text-center text-[9px] not-italic leading-3 text-black">×</i>
      </span>
    </div>
  );
}

/** Live Dhaka clock text. */
export function useTicker(fn: () => void, ms = 1000) {
  useEffect(() => {
    fn();
    const id = setInterval(fn, ms);
    return () => clearInterval(id);
  }, [fn, ms]);
}

export const ease = [0.2, 0.8, 0.2, 1] as const;
