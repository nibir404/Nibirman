"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { nav, profile } from "@/lib/content";
import DotField from "./DotField";
import { useTime } from "./TimeProvider";
import { Magnetic } from "./fx";

function Shapla({ size = 30, color = "#F3ECDD" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" aria-hidden>
      <g fill="none" stroke={color} strokeWidth="9">
        {[0, 72, 144, 216, 288].map((r) => <path key={r} d="M0 0 C12 -18 12 -44 0 -62 C-12 -44 -12 -18 0 0Z" transform={`rotate(${r})`} />)}
      </g>
    </svg>
  );
}

/** Engraved Bengal river: palms, ripples, a lone boatman. Animated gently. */
function Riverscape() {
  return (
    <svg viewBox="0 0 1440 410" preserveAspectRatio="xMidYMin slice" className="block h-[200px] w-full md:h-[410px]" aria-hidden>
      <rect x="0" y="80" width="1440" height="330" fill="#F3ECDD" />
      <g fill="#F3ECDD">
        <path d="M0 80 L0 70 Q40 62 80 70 Q120 58 170 68 Q230 60 290 70 L290 80 Z" />
        <path d="M380 80 L380 72 Q450 60 520 70 Q600 62 660 72 L660 80 Z" />
        <path d="M900 80 L900 70 Q980 58 1060 68 Q1140 60 1220 70 Q1320 62 1440 68 L1440 80 Z" />
      </g>
      <g stroke="#F3ECDD" strokeWidth="3" fill="none" strokeLinecap="round" className="river-palms">
        <path d="M120 68 Q118 40 124 18 M124 18 Q104 10 92 22 M124 18 Q144 8 158 20 M124 18 Q112 2 100 4 M124 18 Q138 0 152 4" />
        <path d="M560 70 Q558 50 562 34 M562 34 Q548 28 540 36 M562 34 Q576 26 586 34 M562 34 Q556 22 548 24" />
        <path d="M1010 66 Q1006 36 1014 10 M1014 10 Q994 2 980 14 M1014 10 Q1034 0 1048 12 M1014 10 Q1002 -6 990 -4 M1014 10 Q1028 -8 1042 -4" />
        <path d="M1180 68 Q1178 46 1183 28 M1183 28 Q1168 22 1158 32 M1183 28 Q1198 20 1208 30 M1183 28 Q1176 14 1166 16 M1183 28 Q1192 12 1202 16" />
      </g>
      <g stroke="#2B3CFF" strokeWidth="1.4" fill="none" className="river-ripples">
        {[96, 108, 122, 138, 156, 176, 198, 222, 248].map((y, i) => (
          <path key={y} d={`M-200 ${y} L1640 ${y}`} strokeDasharray={`${40 + i * 7} ${8 + i} ${12 + i * 4} ${8 + i}`} />
        ))}
      </g>
      <g fill="#2B3CFF" className="river-boat">
        <path d="M560 210 Q650 238 760 210 Q752 226 740 232 L580 232 Q568 226 560 210 Z" />
        <path d="M640 210 L640 110 L700 196 Z" fill="none" stroke="#2B3CFF" strokeWidth="2.5" />
        <path d="M646 120 L692 190 M646 140 L682 190 M646 160 L672 190" stroke="#2B3CFF" strokeWidth="1.2" />
        <circle cx="724" cy="168" r="6" />
        <path d="M718 176 L730 176 L732 206 L716 206 Z" />
        <path d="M736 150 L700 250" stroke="#2B3CFF" strokeWidth="2.5" />
      </g>
      <g stroke="#2B3CFF" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M0 300 Q300 284 620 300 T1440 296" />
        {[40, 180, 330, 470, 860, 1000, 1140, 1290].map((x, i) => (
          <path key={x} d={`M${x} ${330 + (i % 3) * 20} l-6 -26 m6 26 l2 -32 m-2 32 l11 -24`} />
        ))}
      </g>
    </svg>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const path = usePathname();
  const { edition, palette, world } = useTime();
  const onContact = path === "/contact";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".f-left", { xPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".f-scene", start: "top 85%", end: "center 60%", scrub: 1 } });
        gsap.from(".f-right", { xPercent: 40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".f-scene", start: "top 85%", end: "center 60%", scrub: 1 } });
        gsap.from(".f-arch", { yPercent: 18, scale: 0.92, ease: "none", scrollTrigger: { trigger: ".f-scene", start: "top bottom", end: "center center", scrub: 1 } });
        gsap.to(".f-scan", { y: 60, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
        gsap.to(".river-boat", { y: 5, rotation: 1.2, transformOrigin: "50% 100%", repeat: -1, yoyo: true, duration: 2.2, ease: "sine.inOut" });
        gsap.to(".river-boat", { x: 60, repeat: -1, yoyo: true, duration: 14, ease: "sine.inOut" });
        gsap.to(".river-ripples path", { x: (i) => (i % 2 ? -120 : 120), repeat: -1, yoyo: true, duration: 9, ease: "sine.inOut" });
        gsap.to(".river-palms path", { rotation: 1.5, transformOrigin: "50% 100%", repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut", stagger: 0.4 });
      });
    },
    { scope: root, dependencies: [path] },
  );

  return (
    <footer ref={root} className="relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      {!onContact && (
        <section className="f-scene dot-field relative flex min-h-[720px] flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] px-5 py-24 text-[#E9E8E3] md:min-h-[820px]">
          <DotField accent={world === "editorial" ? palette.accent : "#2B3CFF"} />
          <div className="label absolute left-5 top-8 flex flex-col gap-1.5 text-[#8b8f96] md:left-10 md:top-12">
            <span className="text-[#E9E8E3]">◉ Signal · Dhaka</span>
            <span>23.8103°N · 90.4125°E</span>
            <span>UTC+6 · {palette.name}</span>
          </div>
          <div className="label absolute right-5 top-8 hidden flex-col items-end gap-1.5 text-[#8b8f96] sm:flex md:right-10 md:top-12">
            <span className="text-[#E9E8E3]">Edition №{edition}</span>
            <span>World · {world}</span>
            <span><span className="text-[#4B5BFF]">■■■■■■■</span>□□□ 4 agents online</span>
          </div>

          <div className="f-arch ui-arch relative z-10 mt-10 h-[340px] w-[250px] border border-white/25 bg-black md:h-[440px] md:w-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/portrait-studio.jpg" alt="Engraved portrait of Imtiaz Ahmed" className="h-full w-full object-cover" style={{ filter: "grayscale(1) invert(1) contrast(1.4)" }} />
            <div className="f-scan absolute inset-x-0 top-[34%] h-[6%] bg-[#2B3CFF]" aria-hidden />
          </div>
          <p className="display pointer-events-none absolute inset-x-5 top-1/2 z-20 flex -translate-y-1/2 justify-between text-[22vw] leading-none md:inset-x-10 md:text-[150px]">
            <span className="f-left">Let&apos;s</span>
            <span className="f-right italic">build.</span>
          </p>
          <Magnetic className="relative z-20 mt-10">
            <Link href="/contact" className="ui-btn !bg-[#E9E8E3] !text-[#101010]" data-cursor="Talk">Start a conversation <span className="ui-dot">→</span></Link>
          </Magnetic>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#2B3CFF] text-[#F3ECDD]">
        <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-[1440px] gap-12 px-5 pb-10 pt-16 md:px-24 md:pt-24 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-3"><Shapla /><span className="font-serif text-[34px] leading-none md:text-[40px]">{profile.name}</span></p>
            <p className="font-serif text-[20px] italic leading-7">{profile.tagline}</p>
            <ul className="flex flex-col gap-1.5 font-serif text-[18px]">
              <li><a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">✉ {profile.email}</a></li>
              <li>◉ {profile.city} · UTC+6</li>
            </ul>
          </div>
          {[
            { h: "Explore", l: nav.slice(0, 4).map((n) => [n.label, n.href]) },
            { h: "Discover", l: [["About", "/about"], ["Research & Ideas", "/research"], ["Résumé (print)", "/resume"]] },
            { h: "Connect", l: profile.links.map((x) => [x.label + " ↗", x.href]) },
          ].map((c) => (
            <nav key={c.h} aria-label={c.h} className="flex flex-col gap-3">
              <p className="label">{c.h}</p>
              <span className="h-px w-8 bg-[#F3ECDD]" aria-hidden />
              <ul className="flex flex-col gap-2 font-serif text-[20px]">
                {c.l.map(([t, h]) => (
                  <li key={t}><Link href={h} className="inline-block transition-transform duration-300 hover:translate-x-1.5 hover:italic">{t}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); location.href = "/contact"; }}>
            <label htmlFor="foot-email" className="label">Share a cup of cha</label>
            <span className="h-px w-8 bg-[#F3ECDD]" aria-hidden />
            <p className="font-serif text-[19px] italic leading-6">Have an interesting problem? Leave your email and I&apos;ll write back within two days.</p>
            <div className="flex border border-[#F3ECDD]">
              <input id="foot-email" type="email" required placeholder="Your work email" className="min-w-0 flex-1 bg-transparent px-4 py-3.5 font-serif text-[17px] italic text-[#F3ECDD] placeholder:text-[#C9CEFF] focus:outline-none" />
              <button type="submit" aria-label="Send" className="w-14 bg-[#F3ECDD] text-lg text-[#2B3CFF] transition-colors hover:bg-white">→</button>
            </div>
          </form>
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-5 pb-8 font-serif text-[15px] italic md:px-24">
          <span>© 2026 {profile.name} · AI Product Architect · Made in Bangladesh</span>
          <span className="flex gap-4"><Link href="/resume" className="hover:underline">Résumé</Link><span aria-hidden>|</span><a href="#main" className="hover:underline">Back to top ↑</a></span>
        </div>
        <Riverscape />
      </section>
    </footer>
  );
}
