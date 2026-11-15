// The site is lit by the real clock in Dhaka (Asia/Dhaka, UTC+6).
// Four lights of the day — the whole UI re-themes itself automatically.

export type Phase = "dawn" | "day" | "dusk" | "night";

export type Palette = {
  name: string;
  range: string;
  bg: string; // page ground
  ink: string; // type
  accent: string; // one loud colour
  muted: string; // secondary text
  card: string; // raised surfaces
  dark: boolean;
};

export const palettes: Record<Phase, Palette> = {
  dawn: { name: "Dawn", range: "05:00 – 08:00", bg: "#DCDDE3", ink: "#1B1E2E", accent: "#5866F5", muted: "#5C6070", card: "#EEEFF3", dark: false },
  day: { name: "Day", range: "08:00 – 16:30", bg: "#E9E8E3", ink: "#101010", accent: "#2B3CFF", muted: "#6B7077", card: "#FFFFFF", dark: false },
  dusk: { name: "Dusk", range: "16:30 – 19:00", bg: "#1C1714", ink: "#EDE3D3", accent: "#E39A3B", muted: "#A39787", card: "#2A221D", dark: true },
  night: { name: "Night", range: "19:00 – 05:00", bg: "#0A0A0B", ink: "#E9E8E3", accent: "#4B5BFF", muted: "#8B8F96", card: "#161618", dark: true },
};

export const phases: Phase[] = ["dawn", "day", "dusk", "night"];

// The visitor's device clock can be wrong; correct it against the server's Date header.
let offsetMs = 0;
export const now = () => new Date(Date.now() + offsetMs);

export async function syncClock(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const t0 = Date.now();
    const res = await fetch(`/?_t=${t0}`, { method: "HEAD", cache: "no-store" });
    const t1 = Date.now();
    const server = Date.parse(res.headers.get("date") ?? "");
    if (!Number.isNaN(server)) {
      const off = server + 500 - (t0 + (t1 - t0) / 2);
      offsetMs = Math.abs(off) < 1500 ? 0 : off;
    }
  } catch {
    /* offline: trust the device */
  }
}

/** Hour in Dhaka as a float, e.g. 17.5 = 5:30 pm. */
export function dhakaHour(d = now()): number {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(d);
  const h = Number(p.find((x) => x.type === "hour")?.value ?? 0) % 24;
  const m = Number(p.find((x) => x.type === "minute")?.value ?? 0);
  return h + m / 60;
}

export function phaseAt(h: number): Phase {
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 16.5) return "day";
  if (h >= 16.5 && h < 19) return "dusk";
  return "night";
}

export function dhakaClock(d = now(), seconds = true): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", ...(seconds ? { second: "2-digit" } : {}), hour12: false }).format(d);
}

/** Minutes until the next phase change. */
export function minutesToNext(h = dhakaHour()): { next: Phase; mins: number } {
  const bounds: [number, Phase][] = [[5, "dawn"], [8, "day"], [16.5, "dusk"], [19, "night"], [29, "dawn"]];
  const x = h < 5 ? h + 24 : h;
  for (const [b, p] of bounds) if (b > x) return { next: p, mins: Math.round((b - x) * 60) };
  return { next: "dawn", mins: 0 };
}

/** A per-visit edition number — the site is a little different every time. */
export function editionNumber(): string {
  return String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
}
