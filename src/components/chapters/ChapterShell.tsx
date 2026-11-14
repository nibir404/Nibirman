"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Shared chapter frame: parallax anime background, dark wash, comic title, hint line. */
export default function ChapterShell({
  id,
  bg,
  title,
  hint,
  children,
}: {
  id: string;
  bg: string;
  title: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id={id} ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0">
        <Image src={bg} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,18,0.7)_0%,rgba(11,11,18,0.85)_100%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-12 px-6 py-28 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 60, skewY: 6 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center font-display text-5xl leading-none md:text-7xl"
        >
          {title}
        </motion.h2>
        {children}
        {hint && <p className="text-center font-mono text-sm text-paper/60">{hint}</p>}
      </div>
    </section>
  );
}
