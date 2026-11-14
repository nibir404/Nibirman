"use client";

import { useEffect, useState } from "react";
import MachineImage from "@/components/gl/MachineImage";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/career";
import { dhakaClock } from "@/lib/time";

const roles = ["a full-time PM", "an agentic product lead", "a design + product partner", "a short engagement", "a conversation"];

/** Inline blank: an underlined, auto-sizing input that sits inside the sentence. */
function Blank({ value, onChange, placeholder, type = "text", name }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string; name: string }) {
  return (
    <input
      name={name}
      type={type}
      required
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      size={Math.max(placeholder.length, value.length) + 1}
      className="mx-1 border-b-[1.5px] border-current bg-transparent px-1 font-serif italic outline-none placeholder:text-current/40 focus:border-accent focus:bg-accent/10"
      aria-label={placeholder}
    />
  );
}

/**
 * Contact as correspondence. The form IS the letter; the wax seal sends it.
 * Sends to NEXT_PUBLIC_FORM_ENDPOINT (e.g. Formspree) when configured, otherwise opens the mail app.
 */
export default function Letter() {
  const [f, setF] = useState({ name: "", company: "", building: "", role: roles[0], email: "", ps: "" });
  const [state, setState] = useState<"idle" | "sealing" | "sent" | "error">("idle");
  const [stamp, setStamp] = useState({ no: "0000", time: "" });
  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    const no = String(Math.floor(Math.random() * 9000) + 1000);
    const t = () => setStamp({ no, time: dhakaClock().slice(0, 5) });
    t();
    const id = setInterval(t, 15_000); // the letter's postmark keeps Dhaka time while you write
    return () => clearInterval(id);
  }, []);

  const body = `Dear Imtiaz,\n\nMy name is ${f.name}, and I write from ${f.company}, where we're building ${f.building}. We'd like you as ${f.role}; please reply to ${f.email}.\n\n${f.ps ? "P.S. " + f.ps + "\n\n" : ""}Yours,\n${f.name.split(" ")[0]}`;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sealing");
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    await new Promise((r) => setTimeout(r, 900)); // let the seal land
    if (endpoint) {
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...f, message: body }) });
        setState(res.ok ? "sent" : "error");
      } catch {
        setState("error");
      }
    } else {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`A letter from ${f.name} at ${f.company}`)}&body=${encodeURIComponent(body)}`;
      setState("sent");
    }
  };

  return (
    <main className="grid min-h-svh gap-10 px-5 pb-16 pt-28 md:px-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
      <div className="flex flex-col justify-between gap-10">
        <div>
          <p className="label text-muted">Contact · Correspondence</p>
          <h1 className="mt-5 font-serif text-7xl serif-tight md:text-[112px]">
            Write me
            <br />
            <em className="text-accent">a letter.</em>
          </h1>
          <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-muted">
            Fill in the blanks. I read every letter myself and reply within two working days, Dhaka time.
          </p>
        </div>
        <div className="relative hidden h-72 w-56 overflow-hidden rounded-t-full border border-accent lg:block">
          <MachineImage photo="portraitHoundstooth" mode="engrave" className="h-full w-full" />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <form
          onSubmit={send}
          className="relative w-full max-w-3xl -rotate-1 bg-[#f1eada] px-7 py-10 text-[#1e2350] shadow-[0_40px_80px_rgba(0,0,0,0.35)] md:px-16 md:py-14"
        >
          <div className="flex justify-between font-mono text-[11px] tracking-[0.18em] text-[#6b6f8f]">
            <span>NO. {stamp.no}</span>
            <span>DHAKA · {stamp.time}</span>
          </div>
          <p className="mt-8 font-serif text-4xl italic">Dear Imtiaz,</p>
          <p className="mt-6 font-serif text-2xl leading-[2.4] md:text-3xl">
            My name is
            <Blank name="name" value={f.name} onChange={set("name")} placeholder="your name" />, and I write from
            <Blank name="company" value={f.company} onChange={set("company")} placeholder="company or city" />, where we&apos;re building
            <Blank name="building" value={f.building} onChange={set("building")} placeholder="a product, an agent, an idea" />. We&apos;d like you as
            <select
              value={f.role}
              onChange={(e) => set("role")(e.target.value)}
              className="mx-1 rounded-full border-[1.5px] border-current bg-transparent px-3 font-serif outline-none focus:bg-accent/10"
              aria-label="Role"
            >
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
            ; please reply to
            <Blank name="email" type="email" value={f.email} onChange={set("email")} placeholder="you@domain.com" />.
          </p>

          <label className="mt-8 block">
            <span className="font-mono text-[11px] tracking-[0.18em] text-[#6b6f8f]">POSTSCRIPT (OPTIONAL)</span>
            <textarea
              value={f.ps}
              onChange={(e) => set("ps")(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none bg-[repeating-linear-gradient(180deg,transparent_0_47px,rgba(30,35,80,0.25)_47px_48px)] font-serif text-2xl leading-[48px] outline-none"
            />
          </label>

          <div className="mt-8 flex items-end justify-between">
            <p className="font-serif text-2xl italic leading-tight">
              Yours,
              <br />
              {f.name ? f.name.split(" ")[0] : "—"}
            </p>
            <button type="submit" disabled={state === "sealing"} data-cursor="Seal" className="group flex flex-col items-center gap-3">
              <motion.span
                animate={state === "sealing" ? { scale: [1, 0.86, 1.04, 1], rotate: [0, -8, 4, 0] } : {}}
                transition={{ duration: 0.8 }}
                className="flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_34%,#e6c47e_0%,#c9a55c_38%,#8e6e2e_100%)] shadow-[0_6px_0_#6e531f,0_14px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-1"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-[1.5px] border-[#3c280a]/50 font-serif text-5xl italic text-[#5a4214]">N</span>
              </motion.span>
              <span className="font-mono text-[11px] tracking-[0.2em]">PRESS TO SEAL &amp; SEND</span>
            </button>
          </div>

          <AnimatePresence>
            {(state === "sent" || state === "error") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f1eada]/95 text-center"
              >
                <p className="font-serif text-5xl italic">{state === "sent" ? "Sealed and sent." : "The courier got lost."}</p>
                <p className="max-w-sm font-serif text-xl">
                  {state === "sent" ? "Expect a reply within two working days, Dhaka time." : `Write directly to ${profile.email}.`}
                </p>
                <button type="button" onClick={() => setState("idle")} className="label underline">Write another</button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </main>
  );
}
