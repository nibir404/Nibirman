"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { teams, worlds } from "@/lib/career";
import ChapterShell from "./ChapterShell";

const rot = [-8, 6, -3, 9, -5];

/** CH.04 — Where I've worked: sticker slaps you can drag around the table. */
export default function Worlds() {
  const table = useRef<HTMLDivElement>(null);
  return (
    <ChapterShell id="worlds" bg="/anime/bg-worlds.jpg" title={<>5 worlds. <span className="accent-text text-tang">Real people.</span></>} hint="drag the stickers around">
      <div ref={table} className="relative flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {worlds.map((w, i) => (
          <motion.div
            key={w.name}
            drag
            dragConstraints={table}
            dragElastic={0.3}
            whileDrag={{ scale: 1.12, rotate: 0, zIndex: 20 }}
            initial={{ scale: 0, rotate: rot[i] * 6 }}
            whileInView={{ scale: 1, rotate: rot[i] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 13, delay: i * 0.12 }}
            className={`accent-bg flex h-44 w-44 cursor-grab flex-col items-center justify-center rounded-full p-4 text-center shadow-[8px_8px_0_#000] ring-[10px] active:cursor-grabbing md:h-56 md:w-56 ${w.style} ${w.ring} ${i === 4 ? "rounded-3xl" : ""}`}
          >
            <span className="font-display text-2xl leading-none md:text-3xl">{w.name.toUpperCase()}</span>
            <span className="mt-2 font-mono text-[11px] opacity-80">{w.sub}</span>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-paper/60">Teams I&apos;ve worked with</p>
        <p className="mt-2 font-display text-xl md:text-2xl">{teams.join(" · ")}</p>
      </div>
    </ChapterShell>
  );
}
