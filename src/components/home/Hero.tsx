"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import OilInkPortrait from "@/components/gl/OilInkPortrait";
import { profile } from "@/lib/career";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Prologue (Shopify Editions–style choreography):
 * pinned → the title flies into the top-left chapter index → the arch swells →
 * a portal opens from the oil/ink seam and swallows the screen → Act II.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".hero-word", { type: "chars", mask: "lines" });
      gsap.from(split.chars, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.03, delay: 0.15 });
      gsap.from(".hero-fade", { opacity: 0, y: 16, duration: 1, delay: 0.9, stagger: 0.1 });
      gsap.from(".arch", { clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)", duration: 1.6, ease: "expo.inOut" });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = root.current!.querySelector<HTMLElement>(".hero-title")!;
        const target = () => document.getElementById("index-title")?.getBoundingClientRect();
        const delta = () => {
          const t = target();
          const s = title.getBoundingClientRect();
          if (!t) return { x: 0, y: -400, scale: 0.2 };
          const scale = t.width / s.width;
          return { x: t.left - s.left, y: t.top - s.top, scale };
        };

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", scrub: 1, pin: true, invalidateOnRefresh: true },
        });
        tl.to(".hero-fade", { opacity: 0, duration: 0.15 }, 0)
          .to(title, { x: () => delta().x, y: () => delta().y, scale: () => delta().scale, transformOrigin: "0 0", ease: "power2.inOut", duration: 0.35 }, 0)
          .to(title, { opacity: 0, duration: 0.05 }, 0.33)
          .to(document.getElementById("chapter-index"), { autoAlpha: 1, x: 0, duration: 0.08 }, 0.3)
          .to(".rule", { scaleX: 0, duration: 0.2 }, 0.05)
          .to(".arch", { scale: 1.18, y: "6vh", ease: "power1.inOut", duration: 0.4 }, 0.05)
          .fromTo(
            ".portal",
            { clipPath: "circle(0% at 50% 62%)" },
            { clipPath: "circle(150% at 50% 62%)", ease: "power2.in", duration: 0.5 },
            0.45,
          )
          .from(".portal-copy > *", { y: 40, opacity: 0, stagger: 0.04, duration: 0.15 }, 0.75);
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative h-svh overflow-hidden">
      <p className="hero-fade label absolute inset-x-0 top-[13svh] text-center text-muted">Oil · pixel · ink — drag the seam</p>

      {/* the arch */}
      <div className="arch absolute left-1/2 top-[16svh] h-[52svh] w-[min(64vw,33svh)] -translate-x-1/2 origin-bottom">
        <div className="absolute -inset-3 rounded-t-full border border-ink" />
        <OilInkPortrait className="h-full w-full rounded-t-full" />
      </div>

      <div className="hero-fade absolute top-[42svh] hidden text-right lg:block" style={{ right: "calc(50% + min(32vw, 16.5svh) + 2.5rem)" }}>
        <p className="font-serif text-2xl italic">in oil</p>
        <p className="label text-muted">The philosopher</p>
      </div>
      <div className="hero-fade absolute top-[42svh] hidden lg:block" style={{ left: "calc(50% + min(32vw, 16.5svh) + 2.5rem)" }}>
        <p className="font-serif text-2xl italic">in ink</p>
        <p className="label text-muted">The manga hero</p>
      </div>

      {/* rule + title on the ground line */}
      <div className="rule absolute inset-x-5 top-[68svh] h-px origin-center bg-ink md:inset-x-10" />
      <h1 className="hero-title absolute inset-x-0 top-[68svh] flex flex-wrap items-baseline justify-center gap-x-[0.18em] px-4 font-serif text-[13vw] serif-tight md:text-[10.2vw]">
        <span className="sr-only">{profile.name} — The Agentic Renaissance</span>
        <span aria-hidden className="hero-word">The Agentic</span>
        <span aria-hidden className="hero-word italic">Renaissance</span>
      </h1>

      <div className="hero-fade absolute bottom-6 left-5 max-w-[22rem] md:bottom-10 md:left-10">
        <p className="label text-muted">Vol. II — {profile.title}</p>
        <p className="mt-2 font-serif text-xl leading-snug md:text-2xl">
          I&apos;m {profile.name}. {profile.promise}
        </p>
      </div>
      <p className="hero-fade label absolute bottom-6 right-5 hidden md:bottom-10 md:right-10 md:block">Scroll to walk through ↓</p>

      {/* the portal into Act II */}
      <div className="portal absolute inset-0 z-20 flex items-center justify-center bg-ink text-paper [clip-path:circle(0%_at_50%_62%)]">
        <div className="portal-copy text-center">
          <p className="label opacity-70">Act II · The journey</p>
          <p className="mt-4 font-serif text-6xl serif-tight md:text-8xl">
            Five stations.
            <br />
            <em>One line.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
