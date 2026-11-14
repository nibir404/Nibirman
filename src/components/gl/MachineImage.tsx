"use client";

import { useRef } from "react";
import * as THREE from "three";
import { machineFrag } from "./shaders";
import { color, glyphAtlas, loadTex, useShaderCanvas } from "./useShaderCanvas";
import { useTime } from "@/components/TimeProvider";

export type MachineMode = "pixel" | "dither" | "ascii" | "resolve";
const modeId: Record<MachineMode, number> = { pixel: 0, dither: 1, ascii: 2, resolve: 3 };

/**
 * An image the machine is looking at. `progress` (0 → machine, 1 → oil) can be a number
 * or a ref the caller animates (GSAP / Framer). Without WebGL it renders the plain image.
 */
export default function MachineImage({
  src,
  alt,
  mode,
  progress = 0,
  progressRef,
  cell = 28,
  className = "",
  position = "50% 30%",
}: {
  src: string;
  alt: string;
  mode: MachineMode;
  progress?: number;
  progressRef?: React.RefObject<number>;
  cell?: number;
  className?: string;
  position?: string;
}) {
  const { palette } = useTime();
  const pal = useRef(palette);
  pal.current = palette;
  const eased = useRef(progress);

  const { host, ready } = useShaderCanvas(
    machineFrag,
    async () => {
      const tex = await loadTex(src);
      const img = tex.image as HTMLImageElement;
      return {
        uTex: { value: tex },
        uAtlas: { value: glyphAtlas() },
        uTexA: { value: img.width / img.height },
        uMode: { value: modeId[mode] },
        uProgress: { value: progress },
        uCell: { value: cell },
        uInk: { value: color(palette.ink) },
        uPaper: { value: color(palette.paper) },
      };
    },
    (u) => {
      const target = progressRef ? progressRef.current ?? 0 : progress;
      eased.current += (target - eased.current) * 0.12;
      u.uProgress.value = eased.current;
      (u.uInk.value as THREE.Color).lerp(color(pal.current.ink), 0.05);
      (u.uPaper.value as THREE.Color).lerp(color(pal.current.paper), 0.05);
    },
  );

  return (
    <div ref={host} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ objectPosition: position, opacity: ready ? 0 : 1 }}
      />
    </div>
  );
}
