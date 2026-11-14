"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/lib/career";

/** Chapter 0 — the closed comic book. Click or press any key to open it. */
export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [reader, setReader] = useState(4213);

  // random only on the client, so server and client HTML match
  useEffect(() => setReader(4000 + Math.floor(Math.random() * 900)), []);

  useEffect(() => {
    const open = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.key === "Tab") return;
      setOpening(true);
    };
    window.addEventListener("keydown", open);
    return () => window.removeEventListener("keydown", open);
  }, []);

  useEffect(() => {
    if (!opening) return;
    const t = setTimeout(onOpen, 1300);
    return () => clearTimeout(t);
  }, [opening, onOpen]);

  return (
    <motion.section
      id="cover"
      className="halftone fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ink"
      exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="absolute left-6 top-6 font-mono text-sm leading-6 md:left-10 md:top-10 md:text-base">
        <b>{profile.name}</b> is an
        <br />\Agentic PM
        <br />\Product designer
        <br />\Builder
      </div>
      <div className="absolute right-6 top-6 text-right font-mono text-sm md:right-10 md:top-10 md:text-base">
        You are reader
        <br />#{(reader / 1000).toFixed(3).replace(".", ",")}
      </div>

      <button
        aria-label="Open the book"
        onClick={() => setOpening(true)}
        className="relative [perspective:1600px]"
      >
        <motion.div
          initial={{ y: 60, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          whileHover={{ rotate: -2, scale: 1.02 }}
          className="relative h-[62vh] max-h-[640px] w-[44vh] max-w-[460px] [transform-style:preserve-3d]"
        >
          {/* pages underneath */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 bg-paper shadow-[18px_18px_0_#000]" />
          <motion.div
            className="absolute inset-0 origin-left border-4 border-black bg-white [backface-visibility:hidden]"
            animate={opening ? { rotateY: -118 } : { rotateY: 0 }}
            transition={{ duration: 1.1, ease: [0.6, 0, 0.2, 1] }}
          >
            <div className="accent-bg bg-cobalt px-5 pb-3 pt-5">
              <h1 className="font-display text-4xl leading-[0.9] text-paper md:text-5xl">
                THE AGENTIC <span className="text-ink">PM</span>
              </h1>
            </div>
            <div className="relative h-[calc(100%-140px)]">
              <Image src="/anime/manga-portrait.jpg" alt="Manga portrait of Imtiaz" fill priority className="object-cover" sizes="460px" />
              <span className="accent-bg absolute right-3 top-3 border-2 border-black bg-tang px-2 font-display text-sm text-ink">VOL.1</span>
            </div>
            <div className="flex items-center justify-between bg-ink px-4 py-3 font-mono text-[11px] uppercase">
              <span className="font-display text-sm text-paper">{profile.name}</span>
              <span className="accent-text text-tang">7 chapters · 5 missions</span>
            </div>
          </motion.div>
        </motion.div>
      </button>

      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center font-mono text-base md:bottom-auto md:left-auto md:right-10 md:top-1/2 md:translate-x-0 md:text-left md:text-xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <p>1. Turn up your ♪ volume</p>
        <p>2. Click to open the book</p>
        <p className="mt-2 text-sm text-paper/60">or press any key</p>
      </motion.div>

      <Link href="/list" className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm text-paper/60 underline-offset-4 hover:underline">
        All chapters as a plain list →
      </Link>
    </motion.section>
  );
}
