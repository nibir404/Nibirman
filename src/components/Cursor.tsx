"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A minimal cursor: a dot plus a lagging ring that grows and shows a label over [data-cursor]. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("a,button,[data-cursor],input,textarea,select");
      setLabel(el ? el.dataset.cursor ?? "" : null);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!on) return null;
  const size = label === null ? 28 : label ? 84 : 52;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ x, y }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/60 font-mono text-[10px] uppercase tracking-[0.12em] text-ink mix-blend-difference"
        style={{ x: rx, y: ry, borderColor: "currentColor", color: "#fff" }}
        animate={{ width: size, height: size, scale: down ? 0.85 : 1, backgroundColor: label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <span style={{ color: "#000" }}>{label}</span>
      </motion.div>
    </>
  );
}
