"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A three.js dot matrix that breathes and parts around the pointer.
 * Pauses off-screen and respects reduced motion. Purely decorative.
 */
export default function DotField({ color = "#E9E8E3", accent = "#2B3CFF", gap = 18, className = "" }: { color?: string; accent?: string; gap?: number; className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // no WebGL: the CSS dot-field behind still shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -1, 1);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-9999, -9999) },
      uColor: { value: new THREE.Color(color) },
      uAccent: { value: new THREE.Color(accent) },
      uPx: { value: renderer.getPixelRatio() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        uniform float uTime; uniform vec2 uMouse; uniform float uPx;
        varying float vNear; varying float vTw;
        void main(){
          vec3 p = position;
          vec2 d = p.xy - uMouse;
          float dist = length(d);
          float push = smoothstep(160.0, 0.0, dist);
          p.xy += normalize(d + 0.0001) * push * 26.0;
          vNear = push;
          vTw = 0.5 + 0.5 * sin(uTime * 1.3 + p.x * 0.02 + p.y * 0.03);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.6 + push * 3.2 + vTw * 0.6) * uPx;
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform vec3 uAccent; varying float vNear; varying float vTw;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          if (dot(c, c) > 0.25) discard;
          vec3 col = mix(uColor, uAccent, vNear);
          gl_FragColor = vec4(col, 0.16 + vTw * 0.12 + vNear * 0.7);
        }`,
    });
    let points: THREE.Points | null = null;

    const build = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.right = w;
      camera.bottom = h;
      camera.updateProjectionMatrix();
      const pos: number[] = [];
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) pos.push(x, y, 0);
      if (points) { points.geometry.dispose(); scene.remove(points); }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      points = new THREE.Points(g, mat);
      scene.add(points);
    };
    build();

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      uniforms.uMouse.value.set(e.clientX - r.left, e.clientY - r.top);
    };
    const leave = () => uniforms.uMouse.value.set(-9999, -9999);
    el.parentElement?.addEventListener("pointermove", move);
    el.parentElement?.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(build);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (!reduce) uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.parentElement?.removeEventListener("pointermove", move);
      el.parentElement?.removeEventListener("pointerleave", leave);
      points?.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, accent, gap]);

  return <div ref={host} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
