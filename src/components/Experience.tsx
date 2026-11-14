"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Cover from "./Cover";
import Hud from "./Hud";
import Film from "./chapters/Film";
import Who from "./chapters/Who";
import PowerUps from "./chapters/PowerUps";
import Think from "./chapters/Think";
import Worlds from "./chapters/Worlds";
import Volumes from "./chapters/Volumes";
import Join from "./chapters/Join";

// WebGL only on the client
const SkyScene = dynamic(() => import("./three/SkyScene"), { ssr: false });

export default function Experience() {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <SmoothScroll>
      <div className="grain">
        <AnimatePresence>{!open && <Cover key="cover" onOpen={onOpen} />}</AnimatePresence>
        {open && (
          <>
            <SkyScene />
            <Hud />
            <main>
              <section id="who">
                <Film />
                <Who />
              </section>
              <PowerUps />
              <Think />
              <Worlds />
              <Volumes />
              <Join />
              <div className="h-16" />
            </main>
          </>
        )}
      </div>
    </SmoothScroll>
  );
}
