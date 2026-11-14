"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A quill-nib cursor: an ink dot plus a lagging ring that swells over anything clickable. */
export default function InkCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 180, damping: 22 });
  const ry = useSpring(y, { stiffness: 180, damping: 22 });
  const [hover, setHover] = useState<string | null>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("a,button,[data-cursor]");
      setHover(el ? el.dataset.cursor ?? "" : null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink font-mono text-[10px] uppercase tracking-widest text-ink"
        style={{ x: rx, y: ry }}
        animate={{ width: hover !== null ? (hover ? 96 : 56) : 32, height: hover !== null ? (hover ? 96 : 56) : 32, opacity: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {hover}
      </motion.div>
    </>
  );
}
