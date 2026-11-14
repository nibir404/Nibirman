"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { seamFrag } from "./shaders";
import { color, loadTex, useShaderCanvas } from "./useShaderCanvas";
import { useTime } from "@/components/TimeProvider";
import { photos, type PhotoKey } from "@/lib/career";

/**
 * Hero portrait: your photo split by a seam — Bayer dither on the left, copper-plate
 * engraving on the right. Drag it, or let it follow the cursor.
 */
export default function SeamPortrait({ photo = "studio", className = "" }: { photo?: PhotoKey; className?: string }) {
  const p = photos[photo];
  const { palette } = useTime();
  const pal = useRef(palette);
  pal.current = palette;
  const target = useRef(0.5);
  const seam = useRef(0.5);
  const shown = useRef(50);
  const [handleX, setHandleX] = useState(50);
  const dragging = useRef(false);

  const { host, ready } = useShaderCanvas(
    seamFrag,
    async () => {
      const tex = await loadTex(p.src);
      const img = tex.image as HTMLImageElement;
      return {
        uTex: { value: tex },
        uTexA: { value: img.width / img.height },
        uFocus: { value: new THREE.Vector2(p.focus[0], 1 - p.focus[1]) },
        uSeam: { value: seam.current },
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
      if (Math.abs(pct - shown.current) > 0.2) {
        shown.current = pct;
        setHandleX(pct);
      }
    },
  );

  const setFromEvent = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    target.current = Math.min(0.92, Math.max(0.08, (e.clientX - r.left) / r.width));
  };

  return (
    <div
      ref={host}
      className={`relative cursor-ew-resize touch-none select-none overflow-hidden bg-paper ${className}`}
      onPointerMove={(e) => (dragging.current || e.pointerType === "mouse") && setFromEvent(e)}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromEvent(e);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => !dragging.current && (target.current = 0.5)}
      role="img"
      aria-label={`${p.alt}, printed half as a pixel dither and half as an engraving`}
      data-cursor="Drag"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-700"
        style={{ objectPosition: `${p.focus[0] * 100}% ${p.focus[1] * 100}%`, opacity: ready ? 0 : 1 }}
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
