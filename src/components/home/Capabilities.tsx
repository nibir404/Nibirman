"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MachineImage from "@/components/gl/MachineImage";
import { capabilities } from "@/lib/career";
import Sheet from "./Sheet";

/** Act III — Capabilities, an architect's blueprint. The scholar is a live dither engraving. */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <Sheet id="capabilities">
      <div className="grid min-h-svh md:grid-cols-2 lg:pl-56">
        <div className="relative flex flex-col border-b hair md:border-b-0 md:border-r">
          <div className="flex items-center gap-6 px-5 pt-24 md:px-10">
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 6 }, (_, i) => <span key={i} className="h-px w-6 bg-ink" />)}
            </div>
            <p className="label">Act III · Capabilities</p>
          </div>
          <h2 className="px-5 pt-10 font-serif text-6xl serif-tight md:px-10 md:text-8xl">
            Four crafts,
            <br />
            <em>one practice.</em>
          </h2>
          <div className="mt-10 flex-1 md:mt-auto" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} data-cursor="Look">
            <MachineImage
              photo="houndstooth"
              mode="dither"
              progress={hover ? 0 : 1}
              className="aspect-[4/3] w-full md:aspect-auto md:h-[46svh]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 self-start sm:grid-cols-2 md:mt-[18svh]">
          {capabilities.map((c, i) => (
            <button
              key={c.n}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="Read"
              className="relative flex aspect-square flex-col justify-between border-b border-r hair p-5 text-left md:p-6"
            >
              {active === i && <motion.span layoutId="cap" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 300, damping: 32 }} />}
              <span className="absolute -left-1 -top-1 h-2 w-2 bg-ink" />
              <span className={`relative flex gap-6 font-mono text-xs uppercase tracking-[0.15em] ${active === i ? "text-paper" : ""}`}>
                <span>{`${c.n} //`}</span>
                <span>{c.title}</span>
              </span>
              <span className={`relative max-w-[18rem] font-serif text-lg leading-snug ${active === i ? "text-paper" : "text-muted"}`}>{c.body}</span>
            </button>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
