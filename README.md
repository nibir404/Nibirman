# The Agentic Renaissance

> **Imtiaz Ahmed** · Agentic Product Manager · Dhaka (UTC+6)
> *"I turn AI agents into products people trust."*

A portfolio printed like a copper-plate book. Every image comes from Imtiaz's own photos: either the photo itself, dithered and engraved live in WebGL shaders, or a cobalt engraving drawn from it in Paper. The whole site re-inks itself by the **real time in Dhaka**: dawn, day, dusk, night.

The design source is the **"Nibirman Website"** file in Paper (page *v7 · Agentic Renaissance*). The scroll choreography is modelled on Shopify Editions, *The Renaissance Edition*.

---

## Contents

- [What's on the site](#whats-on-the-site)
- [The four acts of the day](#the-four-acts-of-the-day)
- [How the machine sees you (shaders)](#how-the-machine-sees-you-shaders)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Editing content](#editing-content)
- [Writing a Notebook post](#writing-a-notebook-post)
- [Project structure](#project-structure)
- [Accessibility & fallbacks](#accessibility--fallbacks)
- [Deployment](#deployment)
- [Versioning & releases](#versioning--releases)
- [Roadmap](#roadmap)

---

## What's on the site

| Route | Page | What happens |
|-------|------|--------------|
| `/` | **Home** | A preloader resolves your portrait from ASCII → dither → engraving. Then a **pinned hero** in the scroll style of Shopify Editions: your portrait stands in an arch, split by a seam you can drag: **pixel dither ⇄ engraving**. As you scroll, the title flies into a fixed **chapter index** (top-left, with counts), the arch swells, and a **portal** opens from the seam into Act II. Next comes the **train journey**, a pinned window over an engraved Bengal landscape with parallax layers and a platform board for each career station. Then **torn-paper sheets** slide up one over another: Capabilities (a blueprint grid plus a live dither engraving), Works (a catalogue whose hover previews sharpen from pixels to engraving) and the Commission finale. |
| `/evolution` | **Evolution** | Five engraved acts on a spine that draws itself as you scroll: the Apprentice, the Archivist, the Voyager, the Teacher and the Maker of Automatons. Act V includes the *agent's view*, a live ASCII render of the real photo. |
| `/works/[slug]` | **Case study** | A painted plate that resolves from pixels and tears into paper, a fixed section index, a facts row, a large decorative first letter on the problem, a ledger of three decisions and what each cost, the result, and a link to the next plate. |
| `/notebooks` | **Blog index** | *Codex Nibirman*: a featured folio, topic filters, a ruled ledger of posts, and subscribe/RSS. |
| `/notebooks/[slug]` | **Blog post** | A reading-progress line, a painted plate that loads as a dither, long-form typography, and previous/share links. |
| `/notebooks/rss.xml` | RSS | Generated from the markdown files. |
| `/contact` | **Contact** | The form *is* a letter. Visitors fill in the blanks and press the wax seal to send it. |
| `/resume` | **Résumé** | An engraved 3D printer builds your CV as a stone tablet, layer by layer, while a console logs your career. Then you take it off the bed to download the PDF. |
| `/list` | Plain list | The whole story with no motion or WebGL, for SEO, screen readers and slow phones. |

## The four acts of the day

The palette follows the real clock in `Asia/Dhaka` (`src/lib/time.ts`):

| Act | Dhaka time | Palette |
|-----|-----------|---------|
| Dawn | 05:00–08:00 | Parchment, dusk-ink and rose: *Fajr light over the Buriganga* |
| Day | 08:00–16:30 | Cobalt ink on parchment |
| Dusk | 16:30–19:00 | Oxblood, cream and gold: *Golden hour, oil on canvas* |
| Night | 19:00–05:00 | Indigo and gold leaf |

- **No flash on load.** An inline script in `layout.tsx` paints the right act before React loads.
- **Preview another act.** Visitors can use the four dots in the masthead. You can also link to a specific act with `?time=dusk`.
- **Shaders follow too.** They read the act's ink and paper colours, so a dither print turns cream-on-indigo at night.

## How the machine sees you (shaders)

All passes live in `src/components/gl/shaders.ts` and run in real time with raw Three.js, one full-screen quad per image. Every pass resolves to the engraving or print.

| Pass | Shader | Used on |
|------|--------|---------|
| I · Pixelate | `uv = floor(uv·res/cell)·cell/res`. `uProgress` shrinks the cell size from 48px to 1px. | Works hover previews, case-study hero |
| II · Bayer dither | A 4×4 ordered threshold on brightness, printed in the act's ink and paper colours. | Hero seam band, Capabilities engraving, blog plates while loading |
| III · ASCII | One glyph per 8×14px cell from the ramp `" .:-=+*#%@"`, using a glyph atlas drawn on a canvas. | Preloader, Evolution "agent's view" |
| Resolve | ASCII → dither → engraving, driven by `uProgress`. | Preloader |
| Seam | One portrait, Bayer dither on the left and engraving on the right of `uSeam` (drag or cursor). | Home hero |
| Print | Re-inks an engraved asset in the act's colours. Lines always print in the darker colour, so faces never invert at night. | Every engraving |

`MachineImage` and `OilInkPortrait` render only while on screen. Without WebGL, or with reduced motion turned on, they show the plain painting.

## Tech stack

| Concern | Library |
|---------|---------|
| Framework | Next.js 15 (App Router, statically generated), React 19, TypeScript |
| Styling | Tailwind CSS v4. Colour tokens are CSS variables set by the clock. |
| Scroll | Lenis smooth scroll on the GSAP ticker. GSAP ScrollTrigger handles pins, scrubs and sheet stacking; SplitText handles title reveals. |
| UI motion | Framer Motion: cursor, card fills, hover plates, wax seal |
| WebGL | Three.js with custom GLSL fragment shaders |
| Blog | Markdown files parsed with gray-matter and marked |
| Fonts | Instrument Serif, Inter Tight and JetBrains Mono via `next/font` |

## Getting started

Requires **Node 20+**.

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>. Add `?time=night` (or `dawn`, `day`, `dusk`) to preview an act.

| Script | What it does |
|--------|--------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (type-checks and lints) |
| `npm start` | Serve the production build |

## Editing content

**All career copy lives in `src/lib/career.ts`:** profile, stats, the five acts, capabilities, the five works (with full case-study content), the method loop and the home chapter index. Lines marked `TODO(verify)` are placeholders written during design. Please confirm them.

- **CV:** put your PDF at `public/cv.pdf`. The résumé page and the CTAs link to it.
- **Images:** these are listed in the `photos` registry in `src/lib/career.ts`.
  - **Real photos** live in `public/photos/`. The shaders dither, engrave and turn them into ASCII.
  - **Engravings** live in `public/art/`. They were drawn from those photos in Paper (page *v7*, frame *00 · Engraved assets*) and are marked `art: true`, so the shader re-inks them in the current act's colours.
  - **To add an image,** drop the file in, add a key, and use it with `<MachineImage photo="key" mode="…" />`.
- **Contact delivery:** by default the wax seal opens the visitor's mail app with the letter filled in. To receive letters directly, set `NEXT_PUBLIC_FORM_ENDPOINT` to a form service URL such as Formspree. The form posts JSON to it.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (currently `https://nibirman.vercel.app`) so the RSS feed and social preview images use absolute links.

## Writing a Notebook post

Create `content/notebooks/<slug>.md`:

```md
---
title: "Hephaestus had a"
titleItalic: "human in the loop."     # optional, italic second line
dek: "One-sentence standfirst."
date: "2026-11-14"
topic: "Agents"                        # becomes a filter on the index
cover: "maker"                         # optional: an image key from src/lib/career.ts
coverCaption: "Copper-plate engraving, after a photograph"
draft: false                           # true hides it in production
---

Your first paragraph gets the large decorative first letter automatically.

> A blockquote becomes the pull quote.

## Headings, lists, `code`, images and links are all styled.
```

Folio numbers (I, II, III…), reading time, the index, the post page and RSS are all generated. Commit the file and redeploy.

## Project structure

```
content/notebooks/          markdown posts
public/photos/              Imtiaz's real photographs
public/art/                 cobalt engravings drawn from those photos (Paper)
src/
├── app/
│   ├── layout.tsx          fonts, metadata, inline Dhaka-clock theme boot
│   ├── page.tsx            home
│   ├── evolution/  works/[slug]/  notebooks/  notebooks/[slug]/  notebooks/rss.xml/
│   ├── contact/  resume/  list/
│   └── globals.css         tokens, paper grain, folio typography
├── components/
│   ├── gl/                 shaders.ts · useShaderCanvas · MachineImage · OilInkPortrait
│   ├── home/               Hero · ChapterIndex · Journey · Sheet/SheetStack · Capabilities · Works · Commission
│   ├── pages/              Evolution · CaseStudy · Letter · Printer · NotebooksIndex · FolioChrome
│   ├── Providers · TimeProvider · SmoothScroll · Masthead · InkCursor · Preloader · TornEdge · Footer
└── lib/
    ├── career.ts           ← all copy
    ├── notebooks.ts        ← markdown loader
    └── time.ts             ← Dhaka clock + palettes
```

## Accessibility & fallbacks

- **Reduced motion:** with `prefers-reduced-motion`, there are no pins, scrubs or preloader, and the shaders show static oil.
- **No WebGL:** each image falls back to a plain `<img>`.
- **Keyboard and screen readers:** the act switch is a labelled radio group, the chapter index and filters are buttons, the letter's blanks are real labelled inputs, and the print console is `aria-live`.
- **Plain version:** `/list` has the whole story as plain text.

## Deployment

The site is fully static, so **Vercel** is the easiest host:

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL`, and optionally `NEXT_PUBLIC_FORM_ENDPOINT`, in the project's environment variables.

## Versioning & releases

The project follows [Semantic Versioning](https://semver.org) and [Conventional Commits](https://www.conventionalcommits.org). Every release is tagged and recorded in [`CHANGELOG.md`](./CHANGELOG.md).

| Change | Bump | Example |
|--------|------|---------|
| New page or section | minor | `feat(notebooks): add tag pages` |
| Fix or copy edit | patch | `fix(hero): seam handle on touch` |
| Redesign | major | `feat!: …` |

```bash
npm version minor -m "chore(release): v%s"
```

```bash
git push --follow-tags
```

`main` is always deployable. Do work on `feat/*` or `fix/*` branches.

## Roadmap

- [ ] Real `public/cv.pdf` and real social URLs in `career.ts`
- [ ] Confirm all `TODO(verify)` copy (act order and roles, case-study details)
- [ ] A shader 404 page (ASCII)
- [ ] Mobile pass on the train journey and hero labels
- [ ] Optional soundtrack (lute + tanpura)

---

© Imtiaz Ahmed. Photographs, engravings and copy are personal work and are not licensed for reuse.
