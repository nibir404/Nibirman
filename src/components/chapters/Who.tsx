"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, stats } from "@/lib/career";

/** CH.01b — Who I am: parallax portrait, slammed name sticker, stat counters. */
export default function Who() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.15]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 md:right-1/3">
        <Image src="/anime/portrait.jpg" alt="Anime portrait of Imtiaz looking to the sky" fill sizes="70vw" className="object-cover object-top" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_30%,#0b0b12_68%)]" />

      <div className="relative ml-auto flex min-h-screen max-w-xl flex-col justify-center gap-8 px-6 py-28 md:mr-24">
        <motion.div
          initial={{ scale: 2.4, rotate: -14, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 3, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="panel accent-bg self-start bg-tang px-6 py-3"
        >
          <span className="font-display text-4xl text-ink md:text-6xl">I&apos;M IMTIAZ.</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="font-display text-4xl leading-[1.05] md:text-6xl"
        >
          I turn AI agents into products people <span className="accent-text text-tang">trust.</span>
        </motion.h2>
        <p className="font-mono text-sm text-paper/70">
          {profile.title} · 6+ years · {profile.city}, {profile.tz}
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12 }}
            >
              <dt className="font-display text-4xl text-cream">{s.value}</dt>
              <dd className="font-mono text-xs text-paper/60">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}
