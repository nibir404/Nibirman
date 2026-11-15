"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { essays, interests, lenses, profile, topics } from "@/lib/content";
import { useTime } from "../TimeProvider";
import PageHero from "../PageHero";
import { ParallaxImg, Reveal, Rise, ease } from "../fx";

/* ───────────────────────── RESEARCH ───────────────────────── */

const spine = ["bg-ink text-bg", "bg-card text-ink border border-ink", "bg-muted text-bg", "", "bg-ink text-bg", "bg-card text-ink border border-ink", "bg-bg text-ink border border-ink", "bg-ink text-bg", "bg-muted text-bg", "bg-card text-ink border border-ink"];
const widths = [78, 84, 70, 92, 80, 88, 74, 82, 76, 94];
const offs = [6, 0, 12, -3, 4, 2, 9, 0, 7, 0];

export function Research() {
  const [pick, setPick] = useState(3);
  return (
    <section aria-labelledby="rs-h" className="grid-lines">
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] gap-14 px-5 pb-28 pt-32 md:px-10 md:pt-40 lg:grid-cols-[480px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label text-muted">+ Research & ideas · The shelf</p>
          <h1 id="rs-h" className="display mt-4 text-[15vw] leading-[0.88] md:text-[120px]"><Reveal text="Better questions," /><br /><em><Reveal text="better products." delay={0.2} /></em></h1>
          <p className="mt-8 max-w-md text-[17px] leading-7 text-muted">I write to explore ideas, challenge assumptions and make sense of how technology changes the way we work. The goal isn&apos;t to have all the answers — it&apos;s to ask better questions.</p>
          <AnimatePresence mode="wait">
            <motion.p key={pick} aria-live="polite" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="label mt-10 text-accent">Nº{String(pick + 1).padStart(2, "0")} · Essay in progress</motion.p>
          </AnimatePresence>
        </div>
        <ul className="flex flex-col justify-end gap-1.5" aria-label="Essays">
          {essays.map((t, i) => {
            const on = pick === i;
            return (
              <Rise key={t} delay={i * 0.04} y={20}>
                <li style={{ width: `${widths[i]}%`, marginLeft: `${offs[i]}%` }} className="transition-[width] duration-500">
                  <button
                    onMouseEnter={() => setPick(i)}
                    onFocus={() => setPick(i)}
                    onClick={() => setPick(i)}
                    aria-pressed={on}
                    data-cursor="Read"
                    className={`flex w-full items-center justify-between gap-4 px-5 text-left transition-all duration-500 ${on ? "h-[72px] -rotate-[1.5deg] bg-accent text-[var(--on-accent)]" : `h-[56px] ${spine[i] || "bg-ink text-bg"}`}`}
                  >
                    <span className={`display truncate text-[20px] leading-none md:text-[26px] ${on ? "italic md:text-[30px]" : ""}`}>{t}{on ? " →" : ""}</span>
                    <span className="label shrink-0 opacity-70">{on ? "Read · 8 min" : `Nº${String(i + 1).padStart(2, "0")}`}</span>
                  </button>
                </li>
              </Rise>
            );
          })}
          <li aria-hidden className="mt-1 h-2.5 bg-ink" />
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

export function About() {
  const [lens, setLens] = useState(4);
  const pos = [[380, 200], [550, 320], [480, 500], [280, 500], [210, 320]];
  return (
    <>
      <section aria-labelledby="ab-h" className="grid-lines">
        <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] items-end gap-12 px-5 pb-24 pt-32 md:px-10 md:pt-40 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="label text-muted">+ About · {profile.name} · Dhaka</p>
            <h1 id="ab-h" className="display mt-4 text-[17vw] leading-[0.86] md:text-[190px]"><Reveal text="I think" /><br /><Reveal text="in" delay={0.1} /> <em><Reveal text="systems." delay={0.15} /></em></h1>
            <p className="mt-8 max-w-xl text-[18px] leading-8">A product and design professional working across product strategy, UX research, digital experience and emerging AI — six years from interfaces to architecture.</p>
            <dl className="mt-12 flex flex-wrap gap-12">
              {[["6+", "Years shipping"], ["5", "Teams · 2 continents"], ["AA", "WCAG 2.1 shipped"], ["B.Sc", "Computer science"]].map(([v, k], i) => (
                <Rise key={k} delay={i * 0.08}><div><dt className="label order-2 text-muted">{k}</dt><dd className={`display text-[64px] leading-none ${v === "AA" ? "text-accent" : ""}`}>{v}</dd></div></Rise>
              ))}
            </dl>
          </div>
          <div className="relative">
            <ParallaxImg src="/art/portrait-houndstooth.jpg" alt="Engraved portrait of Imtiaz Ahmed in a houndstooth shirt" className="ui-arch h-[560px] bg-ink" />
            <span className="pixel absolute -right-2 bottom-24 rotate-[4deg] bg-accent px-4 py-2 text-xs text-[var(--on-accent)]">I BUILD AROUND PEOPLE</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="ln-h" className="bg-[#101010] py-24 text-[#E9E8E3] md:py-32">
        <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_760px]">
          <div>
            <p className="label text-[#8b8f96]">+ Five perspectives · Hover a lens</p>
            <h2 id="ln-h" className="display mt-3 text-[12vw] leading-[0.95] md:text-[80px]">Best decisions sit <em className="text-[#8b8f96]">where they overlap.</em></h2>
            <div role="radiogroup" aria-label="Perspectives" className="mt-8 flex flex-wrap gap-2">
              {lenses.map((l, i) => (
                <button key={l.t} role="radio" aria-checked={lens === i} onClick={() => setLens(i)} onFocus={() => setLens(i)} className="ui-ghost !border-white/40 !py-2 text-sm aria-checked:!bg-[#2B3CFF] aria-checked:!text-white">{l.t}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={lens} aria-live="polite" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="display mt-8 text-[34px] italic leading-10">{lenses[lens].q}</motion.p>
            </AnimatePresence>
          </div>
          <svg viewBox="0 0 760 680" className="w-full" aria-hidden>
            {pos.map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="170"
                onMouseEnter={() => setLens(i)}
                animate={{ fill: lens === i ? "rgba(43,60,255,0.88)" : "rgba(0,0,0,0)", stroke: lens === i ? "#2B3CFF" : "rgba(233,232,227,0.45)" }}
                transition={{ duration: 0.4 }}
                strokeWidth="1.2"
              />
            ))}
            {pos.map(([cx, cy], i) => (
              <text key={i} x={cx + (cx - 380) * 0.6} y={cy + (cy - 360) * 0.55} textAnchor="middle" fontFamily="var(--f-serif)" fontSize="30" fill="#E9E8E3" fontStyle={lens === i ? "italic" : "normal"} pointerEvents="none">{lenses[i].t}</text>
            ))}
            <circle cx="380" cy="370" r="6" fill="#E9E8E3" />
          </svg>
        </div>
      </section>

      <section aria-labelledby="ph-h" className="mx-auto max-w-[1440px] px-5 py-32 text-center md:px-10 md:py-40">
        <p className="label text-muted">+ Philosophy</p>
        <h2 id="ph-h" className="display mx-auto mt-6 max-w-5xl text-[11vw] leading-[1] md:text-[84px]">Technology should <em>expand</em> human capability — not add complexity.</h2>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2" aria-label="Professional interests">
          {interests.map((t, i) => <li key={t} className={`ui-chip ${i === 4 ? "!border-transparent bg-accent text-[var(--on-accent)]" : ""}`}>{t}</li>)}
        </ul>
      </section>
    </>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

type Errors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

export function Contact() {
  const { palette } = useTime();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [topic, setTopic] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const filled = [form.name, form.email, form.company, topic, form.message].filter(Boolean).length;

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    else if (/@(gmial|gamil|gmai)\./i.test(form.email)) e.email = `Did you mean ${form.email.replace(/@\w+\./, "@gmail.")}?`;
    if (!topic) e.topic = "Pick what you'd like to discuss.";
    if (form.message.trim().length < 10) e.message = "A sentence or two helps me prepare.";
    return e;
  };
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 1400));
    const body = `Hi Imtiaz,\n\n${form.message}\n\n— ${form.name}${form.company ? `, ${form.company}` : ""}\nTopic: ${topic}\nReply to: ${form.email}`;
    window.open(`mailto:${profile.email}?subject=${encodeURIComponent(`${topic} — ${form.name}`)}&body=${encodeURIComponent(body)}`, "_self");
    setState("sent");
  };

  const field = (id: keyof typeof form, label: string, n: string, opts: { type?: string; placeholder: string; required?: boolean; area?: boolean }) => {
    const err = errors[id as keyof Errors];
    return (
      <div className="flex flex-col gap-2 border-b border-[var(--hair)] py-5 focus-within:border-accent">
        <label htmlFor={`f-${id}`} className={`label flex justify-between ${err ? "text-[#C8372D]" : "text-muted"}`}>
          <span>{n} · {label}{opts.required ? "" : " (optional)"}</span>
          <span>{err ? "! Check" : form[id] ? "✓ Done" : ""}</span>
        </label>
        {opts.area ? (
          <textarea id={`f-${id}`} rows={4} value={form[id]} onChange={(e) => setForm({ ...form, [id]: e.target.value })} aria-invalid={!!err} aria-describedby={err ? `e-${id}` : undefined} placeholder={opts.placeholder} className="resize-none bg-transparent font-serif text-[24px] leading-8 placeholder:text-muted/60 focus:outline-none" />
        ) : (
          <input id={`f-${id}`} type={opts.type ?? "text"} value={form[id]} autoComplete={id === "email" ? "email" : id === "name" ? "name" : id === "company" ? "organization" : undefined} onChange={(e) => setForm({ ...form, [id]: e.target.value })} aria-invalid={!!err} aria-describedby={err ? `e-${id}` : undefined} placeholder={opts.placeholder} className="bg-transparent font-serif text-[30px] leading-9 placeholder:text-muted/60 focus:outline-none" />
        )}
        {err && <p id={`e-${id}`} role="alert" className="text-[13px] text-[#C8372D]">{err}</p>}
      </div>
    );
  };

  return (
    <section aria-labelledby="ct-h" className="grid-lines">
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] gap-14 px-5 pb-28 pt-32 md:px-10 md:pt-40 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-8">
          <p className="label text-muted">+ Let&apos;s talk · Reply within 2 days, Dhaka time</p>
          <h1 id="ct-h" className="display text-[16vw] leading-[0.86] md:text-[136px]"><Reveal text="Let's make something" /> <em><Reveal text="meaningful." delay={0.2} /></em></h1>
          <p className="max-w-md text-[17px] leading-7 text-muted">Building an AI product, exploring a new opportunity, transforming a digital experience, or just exchanging ideas — let&apos;s start a conversation.</p>
          <div className="flex flex-col gap-3 border-t border-ink pt-5">
            <span className="label text-muted">Or reach me directly</span>
            <a href={`mailto:${profile.email}`} className="display text-[28px] hover:text-accent md:text-[32px]">{profile.email} ↗</a>
            <div className="flex gap-5 text-sm">{profile.links.slice(0, 2).map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:underline">{l.label} ↗</a>)}</div>
          </div>
          <p className="ui-chip w-fit items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />It&apos;s {palette.name.toLowerCase()} in Dhaka · usually online</p>
        </div>

        <div className="ui-card relative overflow-hidden p-6 md:p-10">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div key="sent" role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }} className="flex min-h-[520px] flex-col justify-between">
                <p className="pixel text-xs text-accent">✓ RECEIVED · DHAKA</p>
                <p className="display text-[44px] leading-[1.05] md:text-[56px]">Thanks for reaching out. I look forward to learning more about what you&apos;re building.</p>
                <button onClick={() => { setState("idle"); setForm({ name: "", email: "", company: "", message: "" }); setTopic(""); }} className="w-fit underline underline-offset-4">Send another →</button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-describedby="ct-progress">
                {field("name", "Name", "01", { placeholder: "Your name", required: true })}
                {field("email", "Work email", "02", { type: "email", placeholder: "you@company.com", required: true })}
                {field("company", "Company or organization", "03", { placeholder: "Where you're building" })}
                <fieldset className="border-b border-[var(--hair)] py-5" aria-describedby={errors.topic ? "e-topic" : undefined}>
                  <legend className={`label ${errors.topic ? "text-[#C8372D]" : "text-muted"}`}>04 · What would you like to discuss?</legend>
                  <div id="f-topic" tabIndex={-1} className="mt-3 flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button type="button" key={t} aria-pressed={topic === t} onClick={() => setTopic(t)} className="ui-ghost !border-[var(--hair)] !py-2 text-[13px]">{t}</button>
                    ))}
                  </div>
                  {errors.topic && <p id="e-topic" role="alert" className="mt-2 text-[13px] text-[#C8372D]">{errors.topic}</p>}
                </fieldset>
                {field("message", "Tell me about your idea or challenge", "05", { placeholder: "A few sentences is plenty…", required: true, area: true })}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                  <span id="ct-progress" className="label text-muted">{filled} / 5 complete</span>
                  <button type="submit" disabled={state === "sending"} className="ui-btn disabled:opacity-70" data-cursor="Send">
                    {state === "sending" ? "Sending to Dhaka…" : "Start the conversation"} <span className="ui-dot">{state === "sending" ? "…" : "→"}</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── RÉSUMÉ (stamp + print) ───────────────────────── */

export function Resume() {
  const { edition } = useTime();
  return (
    <section aria-labelledby="cv-h" className="flex min-h-[100svh] flex-col items-center justify-between gap-10 bg-[#2B3CFF] px-5 pb-12 pt-28 text-white md:px-14">
      <div className="flex w-full justify-between text-[18px] md:text-[22px]"><h1 id="cv-h">Résumé — Print edition</h1><span>№{edition}</span></div>
      <motion.div initial={{ rotate: -6, y: 60, opacity: 0 }} animate={{ rotate: -1.5, y: 0, opacity: 1 }} transition={{ duration: 1.1, ease }} whileHover={{ rotate: 0, scale: 1.02 }} className="print-sheet w-[min(520px,92vw)] border-[12px] border-dotted border-[#2B3CFF] bg-[#F4F2EC] p-3.5 text-[#101010]">
        <div className="flex items-start justify-between px-2.5 pt-2">
          <div><p className="font-serif text-[26px] leading-none tracking-wide md:text-[30px]">IMTIAZ AHMED</p><p className="label mt-1">AI Product Architect</p></div>
          <p className="font-serif text-[44px] leading-[0.9] md:text-[52px]">2021</p>
        </div>
        <div className="mt-3 h-[min(520px,100vw)] overflow-hidden bg-[#2B3CFF]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/portrait-studio.jpg" alt="Engraved portrait of Imtiaz Ahmed printed in blue" className="h-full w-full object-cover mix-blend-screen" style={{ filter: "grayscale(1) contrast(1.35)" }} />
        </div>
        <div className="mt-3 flex items-end justify-between px-2.5 pb-2">
          <div><p className="font-serif text-[26px] leading-none md:text-[30px]">BANGLADESH</p><p className="label mt-1">Dhaka · 2026</p></div>
          <p className="font-serif text-[44px] leading-[0.9] md:text-[52px]">6<span className="text-[22px]">+ yrs</span></p>
        </div>
      </motion.div>
      <div className="flex w-full flex-wrap items-center justify-between gap-4 text-[18px]">
        <span className="hidden md:inline">nibirman.com</span>
        <div className="flex gap-2.5">
          <button onClick={() => window.print()} className="rounded-full bg-white px-6 py-3.5 text-[15px] text-[#2B3CFF] transition-transform hover:-translate-y-0.5">Print résumé ⎙</button>
          <Link href="/work" className="rounded-full border border-white px-6 py-3.5 text-[15px] transition-colors hover:bg-white hover:text-[#2B3CFF]">See the work →</Link>
        </div>
        <span className="hidden md:inline">{profile.name}</span>
      </div>
    </section>
  );
}
