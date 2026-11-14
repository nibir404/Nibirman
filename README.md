# The Agentic PM — Vol. 1

> **Imtiaz Ahmed** · Agentic Product Manager · Dhaka (UTC+6)
> *"I turn AI agents into products people trust."*

A cinematic, anime-style portfolio that tells a whole career as a comic book you scroll through. The visitor opens the book, the camera dives through a 3D sky of clouds and sakura petals, and each chapter (who I am, what I'm good at, how I think, where I've worked, case studies, and how to hire me) plays out like a scene from an anime.

The design source is the **"Nibirman Website"** file in Paper (page *Immersive Comic (v6)*).

---

## Contents

- [Experience walkthrough](#experience-walkthrough)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing the content](#editing-the-content)
- [How the motion works](#how-the-motion-works)
- [Accessibility and SEO](#accessibility-and-seo)
- [Deployment](#deployment)
- [Versioning and releases](#versioning-and-releases)
- [Roadmap](#roadmap)

---

## Experience walkthrough

| # | Chapter | What happens |
|---|---------|--------------|
| 00 | **Cover** | A closed comic book, *"The Agentic PM, Vol. 1."* Click it or press any key and the cover swings open in 3D. |
| 01 | **Who I am: the scroll film** | A pinned, five-screen sequence. Each anime still slowly zooms in while a huge comic word (**IMTIAZ → QUESTIONS FIRST → BUILT FOR EVERYONE → SHIPPED.**) slams in letter by letter, then breaks apart as a speed-line wipe cuts to the next shot. It ends on a parallax portrait, an "I'M IMTIAZ." sticker and the key stats. |
| 02 | **Power-ups** | Four trading cards are dealt onto the table. Hover or tap a card to flip it and see the proof. |
| 03 | **How I think** | A pinned manga strip that scrolls sideways: Ask → Listen → Build → Measure. |
| 04 | **Worlds** | Five industry stickers spring onto the page. You can drag them around. |
| 05 | **Volumes** | Case studies sit on a shelf as comic volumes. Use ← → and Enter, or click. Each one opens into a full-screen scene: the problem, then my move, then the result. |
| 06 | **Join the party** | Press the CV-O-MATIC and it prints a CV page. Hire Me and Partner With Me buttons, plus email and social links. |

Always on screen:
- a 3D **sky** (Three.js) whose camera flies forward as you scroll;
- an orange **ink thread** that draws itself across the page, with Biscuit the mascot riding its tip;
- a **chapter rail** you can click to jump;
- a **Color ⇄ Manga** switch that turns everything black-and-white with screentone;
- an optional ambient **sound pad**;
- film grain.

## Tech stack

| Concern | Library |
|---------|---------|
| Framework | [Next.js 15](https://nextjs.org) (App Router, static export friendly) + React 19 + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (theme tokens live in `src/app/globals.css`) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) |
| Scroll timelines | [GSAP](https://gsap.com) + ScrollTrigger + `@gsap/react` |
| UI motion | [Framer Motion](https://www.framer.com/motion/) (springs, drag, presence, flips) |
| 3D | [Three.js](https://threejs.org) via [@react-three/fiber](https://r3f.docs.pmnd.rs) (+ drei available) |
| Fonts | Archivo Black (display), Inter (body), JetBrains Mono (labels) via `next/font` |
| Sound | Web Audio API (generated pad, no audio files) |

## Getting started

Requirements: **Node 20+** and npm 10+.

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>.

| Script | What it does |
|--------|--------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (type-check + lint) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, <html>
│   ├── globals.css         # Tailwind theme tokens, panel/halftone/grain/speedline utilities, manga mode
│   ├── page.tsx            # the comic experience
│   └── list/page.tsx       # plain-text version (no JS, SEO, screen readers)
├── components/
│   ├── Experience.tsx      # orchestrates cover → scene → chapters
│   ├── SmoothScroll.tsx    # Lenis ⇄ GSAP ticker bridge + shared scroll state
│   ├── Cover.tsx           # opening book
│   ├── Hud.tsx             # top bar, chapter rail, ink thread, manga + sound toggles
│   ├── useAmbient.ts       # Web Audio ambient pad
│   ├── three/SkyScene.tsx  # R3F clouds, instanced sakura petals, scroll-driven camera
│   └── chapters/           # one file per chapter
│       ├── ChapterShell.tsx
│       ├── Film.tsx  Who.tsx  PowerUps.tsx  Think.tsx
│       └── Worlds.tsx  Volumes.tsx  Join.tsx
└── lib/
    └── career.ts           # ← ALL copy and data lives here
public/
└── anime/                  # anime illustrations exported from the Paper file
```

## Editing the content

All the text lives in **`src/lib/career.ts`**: profile, stats, power-ups, the thinking loop, industries, teams, case-study volumes and the scroll-film beats. The comic and the `/list` page both read from it, so you only edit in one place.

- **Add a case study:** add an object to `volumes`. Put its art in `public/anime/` and point `img` at it.
- **Swap the art:** replace the files in `public/anime/` and keep the same names.
- **CV download:** put your PDF at `public/cv.pdf`. The "Print my CV" button links there.
- **Real soundtrack:** put a file at `public/audio/theme.mp3` and swap `useAmbient` for an `<audio>` element.

## How the motion works

- **One clock.** Lenis drives the scroll. Its `raf` runs on GSAP's ticker, and every Lenis scroll event calls `ScrollTrigger.update()`. So smooth scrolling, the GSAP scrubs and the Three.js camera all stay in sync.
- **Shared scroll state.** `scrollState` (progress and velocity) is a plain object in `SmoothScroll.tsx`. The 3D camera and the ink thread read it every frame, which avoids React re-renders. Scroll velocity also speeds up how fast the petals fall.
- **Pinned scenes** (Film, Think) are GSAP timelines with `scrub` and `pin`. Think uses `containerAnimation` to zoom each panel as it scrolls sideways.
- **Interaction motion** (card flips, sticker drags, case-study reveals, CV printer) is Framer Motion springs and `AnimatePresence`.
- **WebGL** loads only on the client (`next/dynamic`, `ssr: false`). It uses no textures from the network: the cloud sprite is drawn on a canvas, and the petals are one instanced mesh of 420 petals.

## Accessibility and SEO

- `prefers-reduced-motion` turns off Lenis smoothing, the pinned GSAP scenes and the film grain. Content stays readable.
- `/list` is a server-rendered version of the whole story with no motion, and it's linked from the cover.
- Arrow keys and Enter browse the case studies. Esc or B closes a volume.
- Buttons and dialogs have labels, and images have alt text.

## Deployment

The easiest host is **Vercel**:

```bash
npx vercel
```

Or build it and serve it on any Node host with `npm run build && npm start`.

Before going live, set `metadataBase` in `src/app/layout.tsx` to the production URL so Open Graph images resolve.

## Versioning and releases

This project follows **[Semantic Versioning](https://semver.org)** and **[Conventional Commits](https://www.conventionalcommits.org)**.

| Change | Bump | Example commit |
|--------|------|----------------|
| New chapter or feature | **minor** `1.x.0` | `feat(volumes): add LIMS case study` |
| Fix or copy tweak | **patch** `1.0.x` | `fix(film): first word visible on open` |
| Redesign or breaking structure | **major** `x.0.0` | `feat!: replace comic with ...` |

Release steps:

```bash
npm version minor -m "chore(release): v%s"
```

```bash
git push --follow-tags
```

Then add the notes to [`CHANGELOG.md`](./CHANGELOG.md) and publish a GitHub Release from the tag. `main` is always deployable. Do work on `feat/*` or `fix/*` branches and merge them through a PR.

## Roadmap

- [ ] Real CV PDF (`public/cv.pdf`) and real social URLs in `career.ts`
- [ ] Commissioned soundtrack to replace the generated pad
- [ ] Remaining case-study scenes from Paper: 988 Crisis, LIMS, Fuudy, Poridhi
- [ ] Sky & Sakura UI kit (v2) and the ORBIT agent demo
- [ ] Optimise the art (AVIF/WebP), and add a mobile-specific scroll film

---

© Imtiaz Ahmed. All rights reserved. The illustrations and copy are personal work and are not licensed for reuse.
