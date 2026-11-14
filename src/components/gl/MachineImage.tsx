"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { machineFrag } from "./shaders";
import { color, glyphAtlas, loadTex, useShaderCanvas } from "./useShaderCanvas";
import { useTime } from "@/components/TimeProvider";
import { photos, type PhotoKey } from "@/lib/career";

export type MachineMode = "pixel" | "dither" | "ascii" | "resolve" | "engrave";
const modeId: Record<MachineMode, number> = { pixel: 0, dither: 1, ascii: 2, resolve: 3, engrave: 4 };

/**
 * One of your photos, printed by the machine. Every pass ends as a cobalt engraving
 * (`progress` 0 → machine pass, 1 → engraving). Ink/paper follow the Dhaka act.
 * Without WebGL it shows the photo in greyscale; if the photo file is missing, a hatched plate.
 */
export default function MachineImage({
  photo,
  alt,
  mode,
  progress = 1,
  progressRef,
  cell = 28,
  className = "",
  focus,
}: {
  photo: PhotoKey;
  alt?: string;
  mode: MachineMode;
  progress?: number;
  progressRef?: React.RefObject<number>;
  cell?: number;
  className?: string;
  focus?: [number, number];
}) {
  const p = photos[photo];
  const f = focus ?? p.focus;
  const { palette } = useTime();
  const pal = useRef(palette);
  pal.current = palette;
  const eased = useRef(progressRef ? 0 : progress);
  const [missing, setMissing] = useState(false);

  const { host, ready } = useShaderCanvas(
    machineFrag,
    async () => {
      const tex = await loadTex(p.src);
      const img = tex.image as HTMLImageElement;
      return {
        uTex: { value: tex },
        uAtlas: { value: glyphAtlas() },
        uTexA: { value: img.width / img.height },
        uFocus: { value: new THREE.Vector2(f[0], 1 - f[1]) },
        uMode: { value: modeId[mode] },
        uProgress: { value: eased.current },
        uCell: { value: cell },
        uInk: { value: color(palette.ink) },
        uPaper: { value: color(palette.paper) },
      };
    },
    (u) => {
      const target = progressRef ? progressRef.current ?? 0 : progress;
      eased.current += (target - eased.current) * 0.1;
      u.uProgress.value = eased.current;
      (u.uInk.value as THREE.Color).lerp(color(pal.current.ink), 0.05);
      (u.uPaper.value as THREE.Color).lerp(color(pal.current.paper), 0.05);
    },
  );

  return (
    <div ref={host} className={`relative overflow-hidden bg-paper ${missing ? "hatch" : ""} ${className}`} role="img" aria-label={alt ?? p.alt}>
      {!missing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src}
          alt=""
          onError={() => setMissing(true)}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-500"
          style={{ objectPosition: `${f[0] * 100}% ${f[1] * 100}%`, opacity: ready ? 0 : 1 }}
        />
      )}
    </div>
  );
}
