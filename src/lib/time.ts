// The site is lit by the real clock in Dhaka (Asia/Dhaka, UTC+6).
// Four "acts" of the day, each its own palette and sky.

export type Phase = "dawn" | "day" | "dusk" | "night";

export type Palette = {
  name: string;
  label: string; // shown in the clock badge
  paper: string; // page ground
  ink: string; // type + engraving lines
  accent: string; // one intense moment
  muted: string; // secondary text
  card: string; // raised surfaces
  skyTop: string;
  skyBottom: string;
  sun: string;
  cloud: string;
  stars: number; // 0..1
};

export const palettes: Record<Phase, Palette> = {
  dawn: {
    name: "Dawn",
    label: "Fajr light over the Buriganga",
    paper: "#f5ede6",
    ink: "#2a3566",
    accent: "#d9796a",
    muted: "#6b6f8f",
    card: "#fbf6f1",
    skyTop: "#9fb0dd",
    skyBottom: "#f6c9b4",
    sun: "#ffd7a8",
    cloud: "#fff1ea",
    stars: 0.15,
  },
  day: {
    name: "Day",
    label: "Cobalt ink on parchment",
    paper: "#f8f3e7",
    ink: "#1c3aa6",
    accent: "#1c3aa6",
    muted: "#55639a",
    card: "#ffffff",
    skyTop: "#5d8fe0",
    skyBottom: "#d9e7f7",
    sun: "#fff6d8",
    cloud: "#ffffff",
    stars: 0,
  },
  dusk: {
    name: "Dusk",
    label: "Golden hour, oil on canvas",
    paper: "#3d120c",
    ink: "#f3e3c7",
    accent: "#e8a54b",
    muted: "#c9a58f",
    card: "#4a1a12",
    skyTop: "#5a1d14",
    skyBottom: "#e7a15a",
    sun: "#ffcf7a",
    cloud: "#c98a63",
    stars: 0.05,
  },
  night: {
    name: "Night",
    label: "Indigo and gold leaf",
    paper: "#0b0f24",
    ink: "#ebe5d3",
    accent: "#c9a55c",
    muted: "#8b90b0",
    card: "#141a40",
    skyTop: "#05071a",
    skyBottom: "#1b2352",
    sun: "#f2ecd2", // the moon
    cloud: "#2a3266",
    stars: 1,
  },
};

/** Hour in Dhaka as a float, e.g. 17.5 = 5:30 pm. */
export function dhakaHour(d = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

export function phaseAt(hour: number): Phase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 16.5) return "day";
  if (hour >= 16.5 && hour < 19) return "dusk";
  return "night";
}

export function dhakaClock(d = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
}

export const phases: Phase[] = ["dawn", "day", "dusk", "night"];
