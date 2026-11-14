"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { powerUps, profile, teams, volumes } from "@/lib/career";
import ChapterShell from "./ChapterShell";

/** CH.07 — Join the party: the CV-O-MATIC prints your CV, plus hire / partner CTAs. */
export default function Join() {
  const [printed, setPrinted] = useState(false);

  return (
    <ChapterShell id="join" bg="/anime/wave.jpg" title={<>Let&apos;s build <span className="accent-text text-tang">the next episode.</span></>}>
      <div className="grid items-start gap-12 md:grid-cols-2">
        {/* the printer */}
        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            className="relative z-10 flex items-center justify-between rounded-[28px] border-4 border-black bg-gradient-to-b from-white to-slate-300 px-6 py-5 shadow-[8px_8px_0_#000]"
            animate={printed ? { x: [0, -3, 3, -2, 2, 0] } : {}}
            transition={{ duration: 0.4, repeat: printed ? 3 : 0 }}
          >
            <span className="font-display text-2xl text-cobalt">CV-O-MATIC</span>
            <button
              aria-label="Print my CV"
              onClick={() => setPrinted(true)}
              className="h-12 w-12 rounded-full border-4 border-black bg-tang shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none"
            />
            {!printed && (
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute -top-8 right-4 rotate-3 border-2 border-black bg-tang px-2 font-display text-xs text-ink"
              >
                PRESS ME ↓
              </motion.span>
            )}
          </motion.div>
          <div className="mx-6 h-[420px] overflow-hidden">
            <AnimatePresence>
              {printed && (
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2.2, ease: [0.3, 0, 0.3, 1] }}
                  className="-rotate-1 border-4 border-black bg-paper p-5 text-ink"
                >
                  <div className="flex items-center gap-3 border-b-4 border-black pb-3">
                    <div className="relative h-16 w-14 border-2 border-black">
                      <Image src="/anime/manga-portrait.jpg" alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-display text-xl">{profile.name.toUpperCase()}</p>
                      <p className="font-mono text-[11px] uppercase text-cobalt">{profile.title}</p>
                    </div>
                  </div>
                  <CvRow k="Quest log" v={teams.join(" · ")} />
                  <CvRow k="Missions" v={volumes.map((v) => v.name).join(" · ")} />
                  <CvRow k="Power-ups" v={powerUps.map((p) => p.title).join(" · ")} />
                  <p className="mt-6 bg-black px-3 py-2 font-display text-sm text-paper">The page is the trailer. The story is the site.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <a href={`mailto:${profile.email}?subject=Hiring%20—%20Agentic%20PM`} className="panel accent-bg bg-tang px-4 py-6 text-center font-display text-lg text-ink transition-transform hover:-translate-y-1">
              HIRE ME
            </a>
            <a href={`mailto:${profile.email}?subject=Partnership`} className="panel bg-paper px-4 py-6 text-center font-display text-lg text-ink transition-transform hover:-translate-y-1">
              PARTNER WITH ME
            </a>
          </div>
          <a href={profile.cvUrl} download onClick={() => setPrinted(true)} className="panel bg-white px-4 py-5 text-center font-display text-lg text-ink transition-transform hover:-translate-y-1">
            PRINT MY CV ⎙
          </a>
          {printed && (
            <p className="font-mono text-sm text-paper/70">
              Printed! Check your downloads. Nothing there?{" "}
              <a className="underline" href={profile.cvUrl}>Grab the PDF</a>
            </p>
          )}
          <a href={`mailto:${profile.email}`} className="mt-4 font-display text-2xl underline decoration-tang decoration-4 underline-offset-8 md:text-3xl">
            {profile.email}
          </a>
          <div className="flex gap-6 font-mono text-sm text-paper/70">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-tang">
                {l.label} ↗
              </a>
            ))}
            <span>{profile.city}, {profile.tz}</span>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
}

function CvRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="mt-4">
      <p className="font-display text-sm uppercase">{k}</p>
      <p className="text-xs">{v}</p>
    </div>
  );
}
