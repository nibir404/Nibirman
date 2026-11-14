"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { vert } from "./shaders";

const loader = new THREE.TextureLoader();
const texCache = new Map<string, Promise<THREE.Texture>>();

export function loadTex(src: string) {
  if (!texCache.has(src)) {
    texCache.set(
      src,
      loader.loadAsync(src).then((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        return t;
      }),
    );
  }
  return texCache.get(src)!;
}

let atlas: THREE.Texture | null = null;
/** 10-glyph ASCII atlas drawn once on a canvas (JetBrains Mono if loaded). */
export function glyphAtlas() {
  if (atlas) return atlas;
  const ramp = " .:-=+*#%@";
  const cw = 32, ch = 56;
  const c = document.createElement("canvas");
  c.width = cw * ramp.length;
  c.height = ch;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#fff";
  g.font = `600 ${ch * 0.78}px "JetBrains Mono", ui-monospace, monospace`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  [...ramp].forEach((ch_, i) => g.fillText(ch_, i * cw + cw / 2, ch / 2 + 2));
  atlas = new THREE.CanvasTexture(c);
  atlas.minFilter = THREE.LinearFilter;
  atlas.flipY = true;
  return atlas;
}

export function canUseGL() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts a full-size fragment-shader quad in `host`.
 * `uniforms` is mutated by the caller every frame via `onFrame`.
 */
export function useShaderCanvas(
  frag: string,
  makeUniforms: () => Promise<Record<string, THREE.IUniform>>,
  onFrame?: (u: Record<string, THREE.IUniform>, t: number) => void,
) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const frameRef = useRef(onFrame);
  frameRef.current = onFrame;

  useEffect(() => {
    const el = host.current;
    if (!el || !canUseGL()) return;
    let disposed = false;
    let raf = 0;
    let visible = true;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const cam = new THREE.Camera();
    let mat: THREE.ShaderMaterial | null = null;

    makeUniforms().then((u) => {
      if (disposed) return;
      u.uRes = { value: new THREE.Vector2(1, 1) };
      mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: u, depthTest: false });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
      el.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });
      resize();
      setReady(true);
      const start = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible || !mat) return;
        frameRef.current?.(mat.uniforms, (performance.now() - start) / 1000);
        renderer.render(scene, cam);
      };
      loop();
    });

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      const dpr = renderer.getPixelRatio();
      if (mat) (mat.uniforms.uRes.value as THREE.Vector2).set(width * dpr, height * dpr);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mat?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frag]);

  return { host, ready };
}

export const color = (hex: string) => new THREE.Color(hex);
