import type { Metadata } from "next";
import Link from "next/link";
import { loop, powerUps, profile, stats, teams, volumes, worlds } from "@/lib/career";

export const metadata: Metadata = {
  title: "Imtiaz Ahmed — all chapters (plain list)",
  description: `${profile.title}. ${profile.promise}`,
};

/** CH.14 — Plain list: the whole story with no JavaScript or motion. Good for SEO and screen readers. */
export default function PlainList() {
  return (
    <main className="mx-auto max-w-2xl bg-ink px-6 py-16 leading-relaxed text-paper">
      <Link href="/" className="font-mono text-sm text-tang">← back to the comic</Link>
      <h1 className="mt-6 font-display text-5xl">{profile.name}</h1>
      <p className="mt-2 font-mono text-sm">{profile.title} · {profile.city}, {profile.tz}</p>
      <p className="mt-4 text-xl">{profile.promise}</p>

      <h2 className="mt-12 font-display text-2xl">Proof</h2>
      <ul className="mt-2 list-disc pl-5">{stats.map((s) => <li key={s.label}><b>{s.value}</b> {s.label}</li>)}</ul>

      <h2 className="mt-12 font-display text-2xl">What I&apos;m good at</h2>
      <ul className="mt-2 list-disc pl-5">{powerUps.map((p) => <li key={p.n}><b>{p.title}.</b> {p.proof}</li>)}</ul>

      <h2 className="mt-12 font-display text-2xl">How I think</h2>
      <ol className="mt-2 list-decimal pl-5">{loop.map((l) => <li key={l.step}><b>{l.step}.</b> {l.line}</li>)}</ol>

      <h2 className="mt-12 font-display text-2xl">Industries</h2>
      <ul className="mt-2 list-disc pl-5">{worlds.map((w) => <li key={w.name}><b>{w.name}</b> — {w.sub}</li>)}</ul>
      <p className="mt-2">Teams: {teams.join(", ")}</p>

      <h2 className="mt-12 font-display text-2xl">Case studies</h2>
      {volumes.map((v) => (
        <article key={v.slug} className="mt-6">
          <h3 className="font-display text-xl">Vol. {v.vol} — {v.name} <span className="font-mono text-xs text-tang">{v.tag}</span></h3>
          <p><b>Problem:</b> {v.problem}</p>
          <p><b>My move:</b> {v.move}</p>
          <p><b>Result:</b> {v.result}</p>
        </article>
      ))}

      <h2 className="mt-12 font-display text-2xl">Contact</h2>
      <p><a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
    </main>
  );
}
