"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/components/SmoothScroll";

/** Soft round sprite texture generated on a canvas — no network fetch. */
function useSoftTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.5, "rgba(255,255,255,0.55)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/** Sakura petals: one instanced mesh, swirling down, gusting with scroll velocity. */
function Petals({ count = 420 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 40,
        y: Math.random() * 30 - 15,
        z: -Math.random() * 60,
        s: 0.08 + Math.random() * 0.14,
        r: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 0.8,
      })),
    [count],
  );
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.6, 0.5, 0.5, 1.2, 0, 1.4);
    shape.bezierCurveTo(-0.5, 1.2, -0.6, 0.5, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    const gust = 1 + Math.min(Math.abs(scrollState.velocity) * 0.08, 6);
    const t = state.clock.elapsedTime;
    seeds.forEach((p, i) => {
      p.y -= dt * p.sp * gust;
      p.x += Math.sin(t * 0.6 + i) * dt * 0.6 * gust;
      if (p.y < -16) p.y = 16;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(t * p.sp + p.r, t * 0.7 * p.sp, p.r + t * 0.4);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, count]}>
      <meshBasicMaterial color="#f7a8c8" side={THREE.DoubleSide} transparent opacity={0.9} />
    </instancedMesh>
  );
}

/** Billboard cloud puffs scattered along the camera's flight path. */
function Clouds() {
  const tex = useSoftTexture();
  const puffs = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        pos: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 14 - 3, -i * 1.2 - Math.random() * 4] as const,
        scale: 6 + Math.random() * 10,
        warm: Math.random() > 0.6,
      })),
    [],
  );
  return (
    <group>
      {puffs.map((p, i) => (
        <sprite key={i} position={p.pos as unknown as THREE.Vector3Tuple} scale={[p.scale * 1.6, p.scale, 1]}>
          <spriteMaterial map={tex} color={p.warm ? "#ffd9b8" : "#ffffff"} transparent opacity={0.55} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}

/** Camera dives through the clouds as the whole page scrolls (the “scroll film”). */
function CameraRig() {
  useFrame((state) => {
    const p = scrollState.progress;
    const cam = state.camera;
    const targetZ = 12 - p * 80;
    cam.position.z += (targetZ - cam.position.z) * 0.06;
    cam.position.x += (state.pointer.x * 1.5 - cam.position.x) * 0.04;
    cam.position.y += (state.pointer.y * 0.8 - cam.position.y) * 0.04;
    cam.lookAt(cam.position.x * 0.5, 0, cam.position.z - 10);
  });
  return null;
}

export default function SkyScene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* painted sky gradient behind the transparent canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0b12_0%,#16204f_45%,#2b44f0_100%)]" />
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 12], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#16204f", 10, 55]} />
        <Clouds />
        <Petals />
        <CameraRig />
      </Canvas>
    </div>
  );
}
