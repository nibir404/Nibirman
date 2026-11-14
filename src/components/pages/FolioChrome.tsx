"use client";

import { useEffect, useRef, useState } from "react";
import MachineImage from "@/components/gl/MachineImage";
import { scrollState } from "@/components/SmoothScroll";

/** Reading-progress rule + the folio's header and plate (the plate loads as a dither, then resolves to oil). */
export default function FolioChrome({ cover, caption, minutes, children }: { cover?: string; caption?: string; minutes: number; children: React.ReactNode }) {
  const [pct, setPct] = useState(0);
  const resolve = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => (resolve.current = 1), 600);
    let raf = 0;
    const tick = () => {
      setPct(Math.round(scrollState.progress * 100));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-ink/15">
        <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
      </div>
      <p className="label fixed bottom-6 right-5 z-40 hidden text-muted md:block">
        {pct}% read · {Math.max(0, Math.ceil(minutes * (1 - pct / 100)))} min left
      </p>
      <div className="flex flex-col items-center gap-14 px-5 pb-16 pt-32">
        {children}
        {cover && (
          <figure className="w-full max-w-6xl">
            <div className="border border-ink bg-card p-3">
              <MachineImage src={cover} alt={caption ?? ""} mode="dither" progressRef={resolve} className="aspect-[2.1/1]" position="50% 25%" />
            </div>
            {caption && <figcaption className="label mt-3 text-muted">Plate · {caption}</figcaption>}
          </figure>
        )}
      </div>
    </>
  );
}
