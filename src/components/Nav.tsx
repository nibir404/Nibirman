"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, navBlurbs, profile } from "@/lib/content";
import { dhakaClock, dhakaHour, minutesToNext, palettes, phases } from "@/lib/time";
import { worlds } from "@/lib/worlds";
import { useTime } from "./TimeProvider";
import { useLenis } from "./SmoothScroll";
import { ease } from "./fx";

function useClock(seconds = false) {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => setT(dhakaClock(undefined, seconds));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return t;
}

/** Small 24h ring used in the nav chip and the panel dial. */
export function Dial({ size = 30, stroke = 3 }: { size?: number; stroke?: number }) {
  const [h, setH] = useState(12);
  useEffect(() => {
    const f = () => setH(dhakaHour());
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  const r = size / 2 - stroke;
  const c = size / 2;
  const pt = (x: number) => {
    const a = ((x / 24) * 360 * Math.PI) / 180;
    return [c - Math.sin(a) * r, c + Math.cos(a) * r];
  };
  const arc = (a: number, b: number) => {
    const [x1, y1] = pt(a);
    const [x2, y2] = pt(b);
    return `M${x1} ${y1} A${r} ${r} 0 ${b - a > 12 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const [bx, by] = pt(h);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <path d={arc(5, 8)} stroke={palettes.dawn.accent} strokeWidth={stroke} fill="none" />
      <path d={arc(8, 16.5)} stroke="#c9c8c3" strokeWidth={stroke} fill="none" />
      <path d={arc(16.5, 19)} stroke={palettes.dusk.accent} strokeWidth={stroke} fill="none" />
      <path d={arc(19, 29)} stroke="#2B3CFF" strokeWidth={stroke} fill="none" />
      <circle cx={bx} cy={by} r={stroke + 1.5} fill="var(--ink)" stroke="var(--bg)" strokeWidth={1.5} />
    </svg>
  );
}

function ThemePanel({ onClose }: { onClose: () => void }) {
  const { world, setWorld, shuffle, pinned, mode, setMode, phase, live, override, setOverride, edition } = useTime();
  const clock = useClock(true);
  const { next, mins } = minutesToNext();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("[aria-checked=true]")?.focus();
  }, []);
  const radioKeys = (e: React.KeyboardEvent, ids: string[], cur: string, set: (v: string) => void) => {
    const i = ids.indexOf(cur);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); set(ids[(i + 1) % ids.length]); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); set(ids[(i - 1 + ids.length) % ids.length]); }
  };
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="World and theme"
      className="ui-card fixed right-3 top-[76px] z-[120] w-[min(420px,calc(100vw-24px))] p-5 text-ink shadow-2xl md:right-6"
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label text-muted">Edition №{edition} · Dhaka</p>
          <p className="pixel mt-1 text-3xl">{clock}</p>
          <p className="mt-1 text-sm text-muted">{palettes[phase].name} now · {palettes[next].name} in {Math.floor(mins / 60)}h {mins % 60}m</p>
        </div>
        <Dial size={64} stroke={5} />
      </div>

      <p id="w-label" className="label mt-6 text-muted">World</p>
      <div role="radiogroup" aria-labelledby="w-label" className="mt-2 grid grid-cols-2 gap-2" onKeyDown={(e) => radioKeys(e, worlds.map((w) => w.id), world, (v) => setWorld(v as typeof world, pinned))}>
        {worlds.map((w) => (
          <button key={w.id} role="radio" aria-checked={world === w.id} tabIndex={world === w.id ? 0 : -1} onClick={() => setWorld(w.id, pinned)} className="ui-ghost !justify-start !rounded-[10px] !px-3 !py-2 text-left">
            <span className="flex flex-col"><span className="text-sm font-medium">{w.name}</span><span className="text-[11px] opacity-70">{w.blurb}</span></span>
          </button>
        ))}
        <button onClick={shuffle} className="ui-ghost !justify-center !rounded-[10px] !px-3 !py-2" data-cursor="Shuffle">↻ Shuffle</button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={pinned} onChange={(e) => setWorld(world, e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
        Keep this world on every visit
      </label>

      <p id="m-label" className="label mt-6 text-muted">Light</p>
      <div role="radiogroup" aria-labelledby="m-label" className="mt-2 flex gap-2" onKeyDown={(e) => radioKeys(e, ["auto", "light", "dark"], mode, (v) => setMode(v as typeof mode))}>
        {(["auto", "light", "dark"] as const).map((m) => (
          <button key={m} role="radio" aria-checked={mode === m} tabIndex={mode === m ? 0 : -1} onClick={() => setMode(m)} className="ui-ghost !px-4 !py-2 text-sm capitalize">
            {m === "auto" ? "Auto · Dhaka" : m}
          </button>
        ))}
      </div>

      <p id="p-label" className="label mt-6 text-muted">Preview the hour</p>
      <div role="radiogroup" aria-labelledby="p-label" className="mt-2 grid grid-cols-4 gap-2">
        {phases.map((p) => (
          <button key={p} role="radio" aria-checked={phase === p} onClick={() => setOverride(p === live ? null : p)} className="ui-ghost !flex-col !gap-1 !rounded-[10px] !px-2 !py-2 text-xs">
            <span className="block h-3 w-full rounded-sm" style={{ background: palettes[p].bg, outline: `2px solid ${palettes[p].accent}` }} />
            {palettes[p].name}{p === live ? " ·" : ""}
          </button>
        ))}
      </div>
      {override && <button onClick={() => setOverride(null)} className="mt-2 text-sm underline underline-offset-4">Back to live Dhaka time</button>}

      <button onClick={onClose} className="sr-only focus:not-sr-only">Close</button>
    </motion.div>
  );
}

function Menu({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = useState(nav[1].href);
  const first = useRef<HTMLAnchorElement>(null);
  const clock = useClock();
  const { palette } = useTime();
  useEffect(() => first.current?.focus(), []);
  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[110] overflow-y-auto bg-[#101010] text-[#E9E8E3] grid-lines"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-5 pb-8 pt-24 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)] flex-1 gap-10 lg:grid-cols-[1fr_420px]">
          <nav aria-label="Primary">
            <ul>
              {nav.map((l, i) => (
                <motion.li key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease }} className="border-t border-white/15 last:border-b">
                  <Link
                    ref={i === 0 ? first : undefined}
                    href={l.href}
                    onClick={onClose}
                    onMouseEnter={() => setHover(l.href)}
                    onFocus={() => setHover(l.href)}
                    className="group flex items-baseline gap-5 py-2 md:gap-8"
                  >
                    <span className="label w-6 text-white/50 group-hover:text-[var(--accent)]">0{i + 1}</span>
                    <span className="display text-[13vw] leading-[1.02] transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-[var(--accent)] md:text-[86px]">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="hidden flex-col gap-4 lg:flex" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.div key={hover} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="ui-arch relative h-[440px] bg-[var(--accent)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={navBlurbs[hover].img} alt="" className="h-full w-full object-cover opacity-55 mix-blend-screen grayscale" />
              </motion.div>
            </AnimatePresence>
            <p className="display text-[26px] italic leading-8">{navBlurbs[hover].blurb}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <Link href="/contact" onClick={onClose} className="ui-btn !bg-[#E9E8E3] !text-[#101010]">Let&apos;s Talk <span className="ui-dot">→</span></Link>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {profile.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">{l.label} ↗</a>)}
            <span className="label text-white/50">Dhaka {clock} · {palette.name} · Esc to close</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Nav() {
  const path = usePathname();
  const lenis = useLenis();
  const { edition } = useTime();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const clock = useClock();
  const home = path === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > (home ? window.innerHeight * 0.7 : 40));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [home]);

  const close = useCallback(() => { setMenu(false); setPanel(false); menuBtn.current?.focus(); }, []);
  useEffect(() => {
    if (menu) lenis?.stop(); else lenis?.start();
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [menu, lenis, close]);
  useEffect(() => { setMenu(false); setPanel(false); }, [path]);

  const pill = scrolled || !home;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[115] transition-[background-color,backdrop-filter,border-color] duration-500 ${pill && !menu ? "border-b border-[var(--hair)] bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md" : "border-b border-transparent"}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-5 md:px-10">
          <Link href="/" aria-label="Imtiaz Ahmed — home" className={`display text-[32px] leading-none ${menu ? "text-[#E9E8E3]" : ""}`} data-cursor="Home">
            IA<span className="text-accent">.</span>
          </Link>

          <AnimatePresence>
            {pill && !menu && (
              <motion.nav aria-label="Primary" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }} className="hidden lg:block">
                <ul className="flex items-center gap-0.5 rounded-[var(--radius)] bg-[#101010] p-1">
                  {nav.map((l) => {
                    const on = path.startsWith(l.href);
                    return (
                      <li key={l.href} className="relative">
                        {on && <motion.span layoutId="pill" className="absolute inset-0 rounded-[var(--radius)] bg-white" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                        <Link href={l.href} aria-current={on ? "page" : undefined} className={`relative block whitespace-nowrap px-4 py-2 text-[13px] transition-colors ${on ? "text-[#101010]" : "text-[#E9E8E3] hover:text-white"}`}>{l.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <button onClick={() => setPanel((v) => !v)} aria-expanded={panel} aria-haspopup="dialog" aria-label={`World and theme. Dhaka time ${clock}. Edition ${edition}`} data-cursor="World" className={`flex items-center gap-2 rounded-[var(--radius)] border border-[var(--hair)] py-1 pl-1 pr-3 ${menu ? "text-[#E9E8E3]" : ""}`}>
              <Dial />
              <span className="pixel text-xs">{clock}</span>
              <span className="label hidden text-muted sm:inline">№{edition}</span>
            </button>
            {pill && !menu ? (
              <Link href="/contact" className="ui-ghost hidden !py-2.5 text-[13px] md:inline-flex" data-cursor="Talk"><span className="h-2 w-2 bg-accent" />Let&apos;s Talk</Link>
            ) : null}
            <button
              ref={menuBtn}
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="site-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              data-cursor={menu ? "Close" : "Menu"}
              className={`grid h-11 w-11 place-items-center rounded-[var(--radius)] transition-colors ${menu ? "bg-accent text-[var(--on-accent)]" : "bg-[#101010] text-white"} ${pill && !menu ? "lg:hidden" : ""}`}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${menu ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${menu ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{menu && <Menu onClose={close} />}</AnimatePresence>
      <AnimatePresence>{panel && <ThemePanel onClose={close} />}</AnimatePresence>
    </>
  );
}
