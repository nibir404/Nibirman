"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MachineImage from "@/components/gl/MachineImage";
import Footer from "@/components/Footer";
import { roman } from "@/lib/career";
import type { Folio } from "@/lib/notebooks";

type Meta = Omit<Folio, "html">;

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { month: "short", year: "numeric" }).toUpperCase();

/** Codex Nibirman — a featured folio and a ruled ledger, filterable by topic. */
export default function NotebooksIndex({ folios }: { folios: Meta[] }) {
  const topics = useMemo(() => {
    const m = new Map<string, number>();
    folios.forEach((f) => m.set(f.topic, (m.get(f.topic) ?? 0) + 1));
    return [...m.entries()];
  }, [folios]);
  const [topic, setTopic] = useState<string | null>(null);
  const list = folios.filter((f) => !topic || f.topic === topic);
  const [featured, ...rest] = list;
  const [hover, setHover] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-12 px-5 pb-24 pt-28 md:px-10">
        <div className="flex flex-col gap-7 border-b border-ink pb-7">
          <p className="label text-muted">Codex Nibirman · writing on agents, product &amp; craft</p>
          <h1 className="font-serif text-7xl serif-tight md:text-[200px]">
            The <em>Notebooks</em>
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
              <button onClick={() => setTopic(null)} className={`rounded-full border border-ink px-4 py-2 ${!topic ? "bg-ink text-paper" : ""}`}>
                All · {folios.length}
              </button>
              {topics.map(([t, n]) => (
                <button key={t} onClick={() => setTopic(t)} className={`rounded-full border border-ink px-4 py-2 ${topic === t ? "bg-ink text-paper" : ""}`}>
                  {t} · {n}
                </button>
              ))}
            </div>
            <p className="font-serif text-lg italic text-muted">
              A new folio most months. <a href="/notebooks/rss.xml" className="underline">RSS</a>.
            </p>
          </div>
        </div>

        {featured ? (
          <Link
            href={`/notebooks/${featured.slug}`}
            className="grid gap-10 md:grid-cols-[minmax(0,40rem)_1fr]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-cursor="Read"
          >
            <div className="border border-ink bg-card p-2.5">
              {featured.cover ? (
                <MachineImage src={featured.cover} alt="" mode="dither" progress={hover ? 1 : 0.85} className="aspect-[4/3]" position="50% 25%" />
              ) : (
                <div className="hatch aspect-[4/3]" />
              )}
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-5">
                <p className="label">
                  Folio {roman[featured.number - 1] ?? featured.number} · featured <span className="text-muted">· {featured.topic} · {featured.minutes} min</span>
                </p>
                <h2 className="font-serif text-5xl serif-tight md:text-7xl">
                  {featured.title} {featured.titleItalic && <em>{featured.titleItalic}</em>}
                </h2>
                <p className="max-w-xl font-serif text-2xl leading-snug text-muted">{featured.dek}</p>
              </div>
              <div className="label flex justify-between border-t hair pt-4">
                <span>{fmt(featured.date)} · Dhaka</span>
                <span>Read the folio →</span>
              </div>
            </div>
          </Link>
        ) : (
          <p className="font-serif text-2xl italic text-muted">The first folio is still drying.</p>
        )}

        {rest.length > 0 && (
          <ol className="border-t border-ink">
            {rest.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/notebooks/${f.slug}`}
                  className="group grid grid-cols-[3.5rem_1fr] items-center gap-4 border-b hair py-5 md:grid-cols-[6rem_1fr_9rem_8rem_4rem]"
                  data-cursor="Read"
                >
                  <span className="label text-muted">{roman[f.number - 1] ?? f.number}</span>
                  <span className="font-serif text-3xl leading-tight transition-all duration-500 group-hover:translate-x-4 group-hover:italic md:text-4xl">
                    {f.title} {f.titleItalic}
                  </span>
                  <span className="label hidden text-muted md:block">{f.topic}</span>
                  <span className="label hidden text-muted md:block">{fmt(f.date)}</span>
                  <span className="label hidden text-right md:block">{f.minutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        <form
          action={`mailto:nibirimtiaz1@gmail.com`}
          method="get"
          className="flex flex-wrap items-center justify-between gap-6 border border-ink px-6 py-6 md:px-8"
        >
          <p className="font-serif text-3xl md:text-4xl">
            A new folio, <em>delivered by courier.</em>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input type="hidden" name="subject" value="Subscribe me to the Notebooks" />
            <input name="body" type="email" required placeholder="you@domain.com" className="w-72 border-b border-ink bg-transparent px-2 py-3 font-serif text-xl italic outline-none placeholder:text-muted" />
            <button className="rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">Subscribe</button>
            <a href="/notebooks/rss.xml" className="label px-2">RSS</a>
          </div>
        </form>
      </main>
      <Footer showStats={false} />
    </>
  );
}
