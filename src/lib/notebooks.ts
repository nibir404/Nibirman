import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * The Notebooks — a markdown blog.
 * Write a new folio: add `content/notebooks/<slug>.md` with the frontmatter below.
 *
 * ---
 * title: "Hephaestus had a"
 * titleItalic: "human in the loop."     # optional, set in italic after the title
 * dek: "One-sentence standfirst."
 * date: "2026-11-14"
 * topic: "Agents"                        # Agents | Product | Craft (any string works)
 * cover: "studio"                       # optional: a photo key from src/lib/career.ts
 * coverCaption: "The forge of automatons, oil on linen"
 * draft: false                           # true hides it in production
 * ---
 */
export type Folio = {
  slug: string;
  number: number;
  title: string;
  titleItalic?: string;
  dek: string;
  date: string;
  topic: string;
  cover?: string;
  coverCaption?: string;
  minutes: number;
  html: string;
};

const DIR = path.join(process.cwd(), "content", "notebooks");

export function getFolios(): Folio[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  const all = files
    .map((file): Folio | null => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      if (data.draft && process.env.NODE_ENV === "production") return null;
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ""),
        number: 0,
        title: String(data.title ?? file),
        titleItalic: data.titleItalic ? String(data.titleItalic) : undefined,
        dek: String(data.dek ?? ""),
        date: String(data.date ?? "1970-01-01"),
        topic: String(data.topic ?? "Notes"),
        cover: data.cover ? String(data.cover) : undefined,
        coverCaption: data.coverCaption ? String(data.coverCaption) : undefined,
        minutes: Math.max(1, Math.round(words / 220)),
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .filter((f): f is Folio => f !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  all.forEach((f, i) => (f.number = i + 1));
  return all.reverse(); // newest first
}

export function getFolio(slug: string) {
  return getFolios().find((f) => f.slug === slug);
}

export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
