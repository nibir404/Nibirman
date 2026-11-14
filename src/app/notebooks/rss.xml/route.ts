import { getFolios } from "@/lib/notebooks";
import { profile } from "@/lib/career";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nibirman.vercel.app";
  const items = getFolios()
    .map(
      (f) => `<item><title>${esc(`${f.title} ${f.titleItalic ?? ""}`.trim())}</title><link>${site}/notebooks/${f.slug}</link><guid>${site}/notebooks/${f.slug}</guid><pubDate>${new Date(f.date).toUTCString()}</pubDate><description>${esc(f.dek)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Notebooks — ${esc(profile.name)}</title><link>${site}/notebooks</link><description>Writing on agents, product and craft.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
