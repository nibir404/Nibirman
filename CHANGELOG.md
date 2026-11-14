# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [SemVer](https://semver.org).

## [Unreleased]

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

[Unreleased]: https://github.com/nibir404/Nibirman/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/nibir404/Nibirman/releases/tag/v1.0.0
