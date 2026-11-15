import { palettes, type Phase } from "./time";

// Ephemeral worlds: every visit the site can arrive dressed differently.
export type World = "editorial" | "win98" | "mac" | "terminal" | "cyberpunk";
export type Mode = "auto" | "light" | "dark";

export type Tokens = { bg: string; ink: string; accent: string; muted: string; card: string; onAccent: string };

export const worlds: { id: World; name: string; blurb: string }[] = [
  { id: "editorial", name: "Editorial", blurb: "Ancient engravings, modern type." },
  { id: "win98", name: "Windows 98", blurb: "Bevels, title bars, teal desktop." },
  { id: "mac", name: "Macintosh", blurb: "1-bit, dithered, System 7." },
  { id: "terminal", name: "Terminal", blurb: "Phosphor green on CRT black." },
  { id: "cyberpunk", name: "Cyberpunk", blurb: "Neon, glitch, night city." },
];

// All pairs meet WCAG AA for body text (≥ 4.5:1) and large display (≥ 3:1).
const fixed: Record<Exclude<World, "editorial">, { light: Tokens; dark: Tokens }> = {
  win98: {
    light: { bg: "#C0C0C0", ink: "#000000", accent: "#000080", muted: "#3A3A3A", card: "#D4D0C8", onAccent: "#FFFFFF" },
    dark: { bg: "#000000", ink: "#FFFFFF", accent: "#00FFFF", muted: "#C0C0C0", card: "#1A1A1A", onAccent: "#000000" },
  },
  mac: {
    light: { bg: "#FFFFFF", ink: "#000000", accent: "#000000", muted: "#444444", card: "#FFFFFF", onAccent: "#FFFFFF" },
    dark: { bg: "#000000", ink: "#FFFFFF", accent: "#FFFFFF", muted: "#BBBBBB", card: "#000000", onAccent: "#000000" },
  },
  terminal: {
    light: { bg: "#F2F0E6", ink: "#14361B", accent: "#8A4B00", muted: "#3E5A42", card: "#E8E5D6", onAccent: "#FFFFFF" },
    dark: { bg: "#070B07", ink: "#4DFF7A", accent: "#FFB000", muted: "#38B85A", card: "#0E160E", onAccent: "#070B07" },
  },
  cyberpunk: {
    light: { bg: "#F4F1FF", ink: "#16002E", accent: "#C4004F", muted: "#4B3A66", card: "#FFFFFF", onAccent: "#FFFFFF" },
    dark: { bg: "#0A0014", ink: "#E8F7FF", accent: "#FF2A6D", muted: "#9AB4C8", card: "#16052A", onAccent: "#0A0014" },
  },
};

export function tokensFor(world: World, mode: Mode, phase: Phase): { tokens: Tokens; dark: boolean } {
  const autoDark = phase === "dusk" || phase === "night";
  const dark = mode === "auto" ? autoDark : mode === "dark";
  if (world === "editorial") {
    // Editorial follows the four lights of Dhaka in auto; light/dark pin day/night.
    const p = mode === "auto" ? palettes[phase] : palettes[dark ? "night" : "day"];
    return { tokens: { bg: p.bg, ink: p.ink, accent: p.accent, muted: p.muted, card: p.card, onAccent: "#FFFFFF" }, dark: p.dark };
  }
  return { tokens: fixed[world][dark ? "dark" : "light"], dark };
}

export const heroArt = ["/art/act-5-maker.jpg", "/art/act-4-teacher.jpg", "/art/act-2-archivist.jpg", "/art/act-1-apprentice.jpg", "/art/act-3-voyager.jpg"];
