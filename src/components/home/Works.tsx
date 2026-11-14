"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MachineImage from "@/components/gl/MachineImage";
import { roman, works } from "@/lib/career";
import Sheet from "./Sheet";

/**
 * Act IV — The works, a museum catalogue. Hovering a row floats its plate beside the cursor;
 * the plate arrives as pixels (shader I) and sharpens into oil.
 */
export default function Works() {
  const [hover, setHover] = useState<number | null>(null);
  const progress = useRef(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20 });
  const y = useSpring(my, { stiffness: 150, damping: 20 });

  const enter = (i: number) => {
    progress.current = 0;
    setHover(i);
    requestAnimationFrame(() => setTimeout(() => (progress.current = 1), 60));
  };

  return (
    <Sheet id="works">
      <div className="px-5 py-28 md:px-10 lg:pl-64" onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-7xl serif-tight md:text-[150px]">
            The <em>works</em>
          </h2>
          <p className="max-w-sm font-serif text-xl leading-snug text-muted">
            Five commissions, catalogued. Each plate leads with what changed for the people who used it.
          </p>
        </div>

        <ol className="border-t hair">
          {works.map((w, i) => (
            <li key={w.slug}>
              <Link
                href={`/works/${w.slug}`}
                onMouseEnter={() => enter(i)}
                onMouseLeave={() => setHover(null)}
                data-cursor="View"
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b hair py-5 md:grid-cols-[6rem_1fr_15rem_10rem] md:py-6"
              >
                <span className="label text-muted">Pl. {roman[i]}</span>
                <span className="font-serif text-4xl serif-tight transition-all duration-500 group-hover:translate-x-5 group-hover:italic md:text-6xl">
                  {w.name}
                  {w.italic && <em> {w.italic}</em>}
                </span>
                <span className="label hidden text-muted md:block">{w.tag}</span>
                <span className="text-right font-serif text-xl italic md:text-2xl">{w.result}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-72 w-56 -translate-x-1/2 -translate-y-1/2 border border-ink bg-card p-2 md:block"
        style={{ x, y }}
        animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.7, rotate: hover !== null ? -4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {hover !== null && (
          <MachineImage key={works[hover].slug} src={works[hover].img} alt="" mode="pixel" cell={36} progressRef={progress} className="h-full w-full" />
        )}
      </motion.div>
    </Sheet>
  );
}
