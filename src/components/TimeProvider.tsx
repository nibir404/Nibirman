"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dhakaHour, editionNumber, now, palettes, phaseAt, syncClock, type Palette, type Phase } from "@/lib/time";
import { heroArt, tokensFor, worlds, type Mode, type World } from "@/lib/worlds";

type Ctx = {
  phase: Phase;
  palette: Palette;
  live: Phase;
  override: Phase | null;
  setOverride: (p: Phase | null) => void;
  edition: string;
  world: World;
  setWorld: (w: World, pin?: boolean) => void;
  shuffle: () => void;
  pinned: boolean;
  mode: Mode;
  setMode: (m: Mode) => void;
  dark: boolean;
  art: string;
};

const TimeCtx = createContext<Ctx | null>(null);
export const useTime = () => useContext(TimeCtx)!;

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} },
  del: (k: string) => { try { localStorage.removeItem(k); } catch {} },
};

/** Theme brain: Dhaka clock × world × light/dark. A new world on every visit unless pinned. */
export default function TimeProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<Phase>("day");
  const [override, setOverride] = useState<Phase | null>(null);
  const [edition, setEdition] = useState("0000");
  const [world, setWorldState] = useState<World>("editorial");
  const [pinned, setPinned] = useState(false);
  const [mode, setModeState] = useState<Mode>("auto");
  const [art, setArt] = useState(heroArt[0]);

  useEffect(() => {
    setEdition(editionNumber());
    setArt(heroArt[Math.floor(Math.random() * heroArt.length)]);
    const m = store.get("ia:mode") as Mode | null;
    if (m) setModeState(m);
    const pin = store.get("ia:pin") as World | null;
    const q = new URLSearchParams(location.search);
    const qw = q.get("world") as World | null;
    if (qw && worlds.some((w) => w.id === qw)) setWorldState(qw);
    else if (pin && worlds.some((w) => w.id === pin)) { setWorldState(pin); setPinned(true); }
    else {
      // ephemeral: never the same world twice in a row; first visit is always Editorial
      const last = store.get("ia:last") as World | null;
      const pool = worlds.map((w) => w.id).filter((w) => w !== last);
      const pick = last ? pool[Math.floor(Math.random() * pool.length)] : "editorial";
      setWorldState(pick);
      store.set("ia:last", pick);
    }
    const qt = q.get("time") as Phase | null;
    if (qt && qt in palettes) setOverride(qt);

    let t = 0;
    const tick = () => {
      setLive(phaseAt(dhakaHour()));
      t = window.setTimeout(tick, 60_000 - (now().getTime() % 60_000) + 50);
    };
    tick();
    syncClock().then(tick);
    return () => clearTimeout(t);
  }, []);

  const setWorld = useCallback((w: World, pin = false) => {
    setWorldState(w);
    store.set("ia:last", w);
    if (pin) { store.set("ia:pin", w); setPinned(true); } else { store.del("ia:pin"); setPinned(false); }
  }, []);
  const shuffle = useCallback(() => {
    setWorldState((cur) => {
      const pool = worlds.map((w) => w.id).filter((w) => w !== cur);
      const next = pool[Math.floor(Math.random() * pool.length)];
      store.set("ia:last", next);
      return next;
    });
    store.del("ia:pin");
    setPinned(false);
    setEdition(editionNumber());
    setArt((a) => heroArt.filter((x) => x !== a)[Math.floor(Math.random() * (heroArt.length - 1))]);
  }, []);
  const setMode = useCallback((m: Mode) => { setModeState(m); store.set("ia:mode", m); }, []);

  const phase = override ?? live;
  const palette = palettes[phase];
  const { tokens, dark } = tokensFor(world, mode, phase);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.phase = phase;
    r.dataset.world = world;
    r.dataset.dark = String(dark);
    r.style.colorScheme = dark ? "dark" : "light";
    r.style.setProperty("--bg", tokens.bg);
    r.style.setProperty("--ink", tokens.ink);
    r.style.setProperty("--accent", tokens.accent);
    r.style.setProperty("--muted", tokens.muted);
    r.style.setProperty("--card", tokens.card);
    r.style.setProperty("--on-accent", tokens.onAccent);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tokens.bg);
  }, [phase, world, dark, tokens]);

  return (
    <TimeCtx.Provider value={{ phase, palette, live, override, setOverride, edition, world, setWorld, shuffle, pinned, mode, setMode, dark, art }}>
      {children}
    </TimeCtx.Provider>
  );
}
