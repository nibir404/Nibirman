"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import { clients, experience, ventures } from "@/lib/content";
import PageHero from "../PageHero";
import { Reveal, Rise, TitleBar, ease } from "../fx";

const filters = ["All", "AI & Intelligent", "Enterprise & SaaS", "Marketplaces"];
const Y0 = 2021.5;
const Y1 = 2027;
const pct = (y: number) => `${((y - Y0) / (Y1 - Y0)) * 100}%`;

function Timeline() {
  const [open, setOpen] = useState(3);
  const e = experience[open];
  return (
    <section aria-labelledby="exp-h" className="bg-[#101010] py-24 text-[#E9E8E3] md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" text="Five rooms, one craft." className="display text-[13vw] leading-[0.9] md:text-[96px]" />
          <p className="label text-[#8b8f96]">+ 01 · Experience · 2021 → now</p>
        </div>
        <div className="mt-14 hidden border-t border-white/20 md:flex" aria-hidden>
          {[2022, 2023, 2024, 2025, 2026].map((y) => <span key={y} className="label flex-1 pt-3 text-[#8b8f96]" style={{ marginLeft: y === 2022 ? pct(2022) : undefined }}>{y}</span>)}
        </div>
        <ul className="mt-8 flex flex-col gap-3" aria-label="Roles">
          {experience.map((x, i) => (
            <li key={x.org} className="relative md:h-12">
              <button
                onClick={() => setOpen(i)}
                onMouseEnter={() => setOpen(i)}
                aria-expanded={open === i}
                aria-controls="exp-detail"
                className={`flex h-12 w-full items-center gap-3 rounded-[var(--radius)] border px-5 text-left transition-colors md:absolute md:w-auto ${open === i ? "border-transparent bg-[#E9E8E3] text-[#101010]" : "border-white/30 hover:border-white"} ${i === experience.length - 1 ? "!bg-[#2B3CFF] !text-white" : ""}`}
                style={{ left: pct(x.start), width: undefined }}
              >
                <span className="font-serif text-[22px] italic">{x.org}</span>
                <span className="label opacity-70">{x.role}</span>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.div id="exp-detail" key={open} aria-live="polite" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-12 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-[380px_1fr]">
            <div>
              <p className="label text-[#8b8f96]">{e.period} · {e.place}</p>
              <p className="display mt-2 text-[44px] leading-[1]">{e.role}, <em>{e.org}</em></p>
            </div>
            <ul className="flex flex-col gap-3 text-[16px] leading-6 text-[#b9bcc1]">
              {e.points.map((p) => <li key={p}>— {p}</li>)}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Clients() {
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 20 });
  const y = useSpring(my, { stiffness: 180, damping: 20 });
  return (
    <section aria-labelledby="cl-h" className="grid-lines relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal as="h2" text="Client projects." className="display text-[13vw] leading-[0.9] md:text-[96px]" />
        <p className="label text-muted">+ 02 · Shipped · 07</p>
      </div>
      <ul className="mt-12 border-t border-ink" onMouseLeave={() => setHover(null)}>
        {clients.map((c, i) => (
          <li key={c.name} className="border-b border-[var(--hair)]">
            <details className="group" onMouseEnter={() => setHover(i)}>
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 md:gap-8 md:py-6" data-cursor="Open">
                <span className="label w-8 text-muted">{c.n}</span>
                <span className="display flex-1 text-[30px] leading-none transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-accent md:text-[54px]">{c.name}</span>
                <span className="label hidden w-[300px] text-muted md:block">{c.tag}</span>
                <span className="pixel w-16 text-right text-accent">{c.metric}</span>
                <span aria-hidden className="text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-6 pl-12 text-[17px] leading-7 text-muted md:pl-16">{c.overview}</p>
            </details>
          </li>
        ))}
      </ul>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[220px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] border-[6px] border-ink md:block" style={{ x, y }} animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.6, rotate: hover !== null ? -4 : 0 }} transition={{ duration: 0.3 }}>
        {hover !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={clients[hover].img} alt="" className="h-full w-full object-cover" />
        )}
      </motion.div>
    </section>
  );
}

function Ventures() {
  const [f, setF] = useState("All");
  const list = useMemo(() => ventures.filter((v) => f === "All" || v.filter === f), [f]);
  return (
    <section aria-labelledby="v-h" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--hair)] pt-12">
        <Reveal as="h2" text="Independent ventures." className="display text-[13vw] leading-[0.9] md:text-[96px]" />
        <p className="label text-muted">+ 03 · Concepts & explorations — not shipped</p>
      </div>
      <div role="group" aria-label="Filter ventures" className="mt-8 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} aria-pressed={f === x} onClick={() => setF(x)} className="ui-ghost !py-2 text-[13px]">
            {x} {x === "All" ? `· ${ventures.length}` : ""}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} ventures shown</p>
      <LayoutGroup>
        <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
          <AnimatePresence>
            {list.map((v, i) => (
              <motion.li key={v.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease }} className={i % 2 ? "md:pt-28" : ""}>
                <Link href={`/work/${v.slug}`} className="group block" data-cursor="View">
                  <div className="ui-frame relative aspect-[4/3] bg-ink">
                    <TitleBar title={`${v.slug}.case`} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt="" className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-accent opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80" aria-hidden />
                    <span className="ui-btn absolute bottom-5 left-5 translate-y-4 !bg-white !text-[#101010] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">View case study <span className="ui-dot">→</span></span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="display text-[38px] leading-none md:text-[48px]">{v.name}</h3>
                    <span className={`label shrink-0 rounded-[var(--radius)] px-3 py-1.5 ${v.status === "Concept" ? "bg-accent text-[var(--on-accent)]" : "border border-ink"}`}>{v.status}</span>
                  </div>
                  <p className="label mt-3 text-muted">{v.tags.join(" · ")}</p>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}

export default function Work() {
  return (
    <>
      <PageHero label="Work" title="Selected" italic="work.">
        <Rise className="flex flex-col items-end gap-2">
          <span className="pixel text-6xl text-accent">11</span>
          <span className="label text-muted">Projects · 5 roles · 6 years</span>
        </Rise>
      </PageHero>
      <Timeline />
      <Clients />
      <Ventures />
    </>
  );
}
