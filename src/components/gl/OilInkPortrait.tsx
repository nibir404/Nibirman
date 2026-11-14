"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { oilInkFrag } from "./shaders";
import { color, loadTex, useShaderCanvas } from "./useShaderCanvas";
import { useTime } from "@/components/TimeProvider";

/**
 * Hero portrait: oil | pixel-dither band | manga ink, split by a seam you can drag
 * (or that follows the cursor). Falls back to the oil painting without WebGL.
 */
export default function OilInkPortrait({ className = "" }: { className?: string }) {
  const { palette } = useTime();
  const pal = useRef(palette);
  pal.current = palette;
  const target = useRef(0.52);
  const seam = useRef(0.52);
  const [handleX, setHandleX] = useState(52);
  const dragging = useRef(false);

  const { host, ready } = useShaderCanvas(
    oilInkFrag,
    async () => {
      const [oil, ink, sky] = await Promise.all([
        loadTex("/paintings/figure-oil.webp"),
        loadTex("/paintings/figure-ink.webp"),
        loadTex("/paintings/philosopher.jpg"),
      ]);
      const img = oil.image as HTMLImageElement;
      return {
        uOil: { value: oil },
        uInkT: { value: ink },
        uSky: { value: sky },
        uTexA: { value: img.width / img.height },
        uSeam: { value: seam.current },
        uBand: { value: 64 },
        uTime: { value: 0 },
        uInk: { value: color(palette.ink) },
        uPaper: { value: color(palette.paper) },
      };
    },
    (u, t) => {
      seam.current += (target.current - seam.current) * 0.09;
      u.uSeam.value = seam.current;
      u.uTime.value = t;
      (u.uInk.value as THREE.Color).lerp(color(pal.current.ink), 0.05);
      (u.uPaper.value as THREE.Color).lerp(color(pal.current.paper), 0.05);
      const pct = Math.round(seam.current * 1000) / 10;
      if (Math.abs(pct - handleXRef.current) > 0.2) {
        handleXRef.current = pct;
        setHandleX(pct);
      }
    },
  );
  const handleXRef = useRef(52);

  const setFromEvent = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    target.current = Math.min(0.92, Math.max(0.08, (e.clientX - r.left) / r.width));
  };

  return (
    <div
      ref={host}
      className={`relative cursor-ew-resize touch-none select-none overflow-hidden ${className}`}
      onPointerMove={(e) => (dragging.current || e.pointerType === "mouse") && setFromEvent(e)}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromEvent(e);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => !dragging.current && (target.current = 0.52)}
      role="img"
      aria-label="Portrait of Imtiaz Ahmed, half oil painting, half manga ink, joined by a band of dithered pixels"
      data-cursor="Drag"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/paintings/philosopher.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1 }}
      />
      {ready && (
        <div
          className="pointer-events-none absolute top-[66%] z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-ink bg-paper font-mono text-base text-ink"
          style={{ left: `${handleX}%` }}
        >
          ⇄
        </div>
      )}
    </div>
  );
}
