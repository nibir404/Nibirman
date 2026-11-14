"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dhakaHour, now, palettes, phaseAt, syncClock, type Palette, type Phase } from "@/lib/time";

type Ctx = {
  phase: Phase;
  palette: Palette;
  live: Phase; // what the real Dhaka clock says
  override: Phase | null;
  setOverride: (p: Phase | null) => void;
};

const TimeCtx = createContext<Ctx | null>(null);
export const useTime = () => useContext(TimeCtx)!;

/** Reads the Dhaka clock every 30s; visitors can preview other acts with the clock switch. */
export default function TimeProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<Phase>("day");
  const [override, setOverride] = useState<Phase | null>(null);
  const [resolved, setResolved] = useState(false); // the inline boot script already painted the right act

  useEffect(() => {
    let timer = 0;
    // re-evaluate the act now, then exactly at the next minute boundary, every minute
    const tick = () => {
      setLive(phaseAt(dhakaHour()));
      const ms = 60_000 - (now().getTime() % 60_000) + 50;
      window.clearTimeout(timer);
      timer = window.setTimeout(tick, ms);
    };
    tick();
    setResolved(true);
    syncClock().then(tick); // correct for a wrong device clock
    // hidden tabs throttle timers: resync when the visitor comes back
    const onVisible = () => document.visibilityState === "visible" && syncClock().then(tick);
    document.addEventListener("visibilitychange", onVisible);
    // ?time=dusk lets you share / test a specific act
    const q = new URLSearchParams(location.search).get("time") as Phase | null;
    if (q && q in palettes) setOverride(q);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const phase = override ?? live;
  const palette = palettes[phase];

  useEffect(() => {
    if (!resolved) return;
    const r = document.documentElement;
    r.dataset.phase = phase;
    r.style.setProperty("--paper", palette.paper);
    r.style.setProperty("--ink", palette.ink);
    r.style.setProperty("--accent", palette.accent);
    r.style.setProperty("--muted", palette.muted);
    r.style.setProperty("--card", palette.card);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette.paper);
  }, [phase, palette, resolved]);

  return <TimeCtx.Provider value={{ phase, palette, live, override, setOverride }}>{children}</TimeCtx.Provider>;
}
