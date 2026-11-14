import type { Metadata } from "next";
import Link from "next/link";
import { acts, capabilities, loop, profile, stats, works } from "@/lib/career";

export const metadata: Metadata = {
  title: "All chapters (plain list)",
  description: `${profile.title}. ${profile.promise}`,
};

/** The whole story with no motion or WebGL — for search engines, screen readers and slow phones. */
export default function PlainList() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-20 pt-32 leading-relaxed">
      <Link href="/" className="label">← Back to the paintings</Link>
      <h1 className="mt-6 font-serif text-6xl">{profile.name}</h1>
      <p className="mt-2 font-mono text-sm">{profile.title} · {profile.city}, {profile.tz}</p>
      <p className="mt-4 text-xl">{profile.promise}</p>

      <h2 className="mt-12 font-serif text-3xl">Proof</h2>
      <ul className="mt-2 list-disc pl-5">{stats.map((s) => <li key={s.label}><b>{s.value}</b> {s.label}</li>)}</ul>

      <h2 className="mt-12 font-serif text-3xl">Evolution</h2>
      <ol className="mt-2 list-decimal pl-5">{acts.map((a) => <li key={a.n}><b>{a.title.join(" ")}</b> — {a.name}, {a.role}. {a.story}</li>)}</ol>

      <h2 className="mt-12 font-serif text-3xl">Capabilities</h2>
      <ul className="mt-2 list-disc pl-5">{capabilities.map((c) => <li key={c.n}><b>{c.title}.</b> {c.body}</li>)}</ul>

      <h2 className="mt-12 font-serif text-3xl">How I work</h2>
      <ol className="mt-2 list-decimal pl-5">{loop.map((l) => <li key={l.step}><b>{l.step}.</b> {l.line}</li>)}</ol>

      <h2 className="mt-12 font-serif text-3xl">Works</h2>
      {works.map((w) => (
        <article key={w.slug} className="mt-6">
          <h3 className="font-serif text-2xl"><Link href={`/works/${w.slug}`}>{w.name}{w.italic ? ` ${w.italic}` : ""}</Link> <span className="label">{w.tag}</span></h3>
          <p>{w.logline}</p>
          <p><b>In numbers:</b> {w.resultBig} — {w.resultNote}</p>
          <p><a className="underline" href={w.url}>{w.url}</a></p>
        </article>
      ))}

      <h2 className="mt-12 font-serif text-3xl">Contact</h2>
      <p><a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
    </main>
  );
}
