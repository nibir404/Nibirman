# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [SemVer](https://semver.org).

## [Unreleased]

## [2.0.0] — 2026-11-15

A full redesign: **The Agentic Renaissance**, built from the Paper design *v7*.

### Added
- **Dhaka-clock theming:** four palettes (dawn, day, dusk, night) chosen by the real time in Asia/Dhaka, a switch in the masthead to preview the others, `?time=` links, and an inline boot script so there's no colour flash on load.
- **Live WebGL shaders** (raw Three.js): Pixelate, Bayer dither, ASCII (from a canvas glyph atlas), engraving line-screen, Resolve (ASCII → dither → engraving), and the hero seam (dither ⇄ engraving) that you drag.
- **Home**, with scroll choreography modelled on Shopify Editions: a preloader; a pinned hero whose title flies into a fixed chapter index; a portal into Act II; a pinned train journey with an engraved parallax landscape and platform boards; torn-paper sheets that stack over one another (Capabilities, Works, Commission).
- **/evolution:** the five-act timeline with a self-drawing spine and Act V's live ASCII "agent's view".
- **/works/[slug]:** five case studies with a pixel-to-oil hero, a fixed section index, a decision ledger and a link to the next plate.
- **/notebooks**, **/notebooks/[slug]** and **/notebooks/rss.xml:** a markdown blog (gray-matter + marked) with a featured folio, topic filters, reading progress and RSS.
- **/contact:** a fill-in-the-blanks letter with a wax-seal send button (form endpoint or mailto).
- **/resume:** a 3D printer that prints the CV as a tablet, with a live console and a download at the end.
- Imtiaz's real photos (`public/photos/`) and seven cobalt copper-plate engravings drawn from them in Paper (`public/art/`): two portraits and five act scenes. There is no stock or invented art.
- A Print pass re-inks the engravings in each act's colours, and lines always print in the darker colour so nothing turns into a negative at night.

### Changed
- The typography is now Instrument Serif, Inter Tight and JetBrains Mono, with a cobalt-on-parchment base.
- All copy is restructured in `src/lib/career.ts` (acts, works with full case content, capabilities).

### Removed
- The v1 anime comic experience (cover, chapters, HUD, sky scene, ambient pad) and its art.
- `@react-three/fiber` and `@react-three/drei`, now that the shaders use Three.js directly.

## [1.0.0] — 2026-11-14

First release of the cinematic anime portfolio, built from the Paper design *Immersive Comic (v6)*.

### Added
- Next.js 15 + React 19 + TypeScript + Tailwind v4 app.
- Lenis smooth scroll synced with the GSAP ticker and ScrollTrigger.
- A 3D sky (react-three-fiber): cloud sprites, 420 instanced sakura petals that react to scroll speed, and a camera that flies forward as you scroll.
- **Cover:** a 3D book that opens on a click or any key press, with a link to the plain list.
- **CH.01 scroll film:** a pinned four-beat sequence with zooming stills, letter-by-letter comic words that break apart, and speed-line wipes. Then the parallax "Who I am" section with stats.
- **CH.02 Power-ups:** dealt trading cards that flip to show proof.
- **CH.03 How I think:** a pinned manga strip that scrolls sideways.
- **CH.04 Worlds:** industry stickers you can drag.
- **CH.05 Volumes:** a case-study shelf with keyboard navigation and full-screen case scenes.
- **CH.06 Join:** the CV-O-MATIC printer and the hire, partner and contact buttons.
- HUD: chapter label, a chapter rail you can click, the ink thread with Biscuit riding it, the Color ⇄ Manga switch, an ambient sound pad and film grain.
- A `/list` page: the whole story without JavaScript or motion, for SEO and screen readers.
- Support for reduced motion.
- All copy and data in one file: `src/lib/career.ts`.

[Unreleased]: https://github.com/nibir404/Nibirman/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/nibir404/Nibirman/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/nibir404/Nibirman/releases/tag/v1.0.0
