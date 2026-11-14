import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fmtDate, getFolio, getFolios } from "@/lib/notebooks";
import { profile, roman } from "@/lib/career";
import FolioChrome from "@/components/pages/FolioChrome";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getFolios().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFolio(slug);
  if (!f) return {};
  const title = `${f.title} ${f.titleItalic ?? ""}`.trim();
  return { title, description: f.dek, openGraph: { title, description: f.dek, type: "article", images: f.cover ? [f.cover] : undefined } };
}

/** A single folio: reading-progress rule, painted plate (dither → oil), long-form type, prev/share. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getFolios();
  const i = all.findIndex((f) => f.slug === slug);
  if (i < 0) notFound();
  const f = all[i];
  const prev = all[i + 1];

  return (
    <>
      <FolioChrome cover={f.cover} caption={f.coverCaption} minutes={f.minutes}>
        <header className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <p className="label text-muted">
            Folio {roman[f.number - 1] ?? f.number} · {f.topic} · {f.minutes} min
          </p>
          <h1 className="font-serif text-6xl serif-tight md:text-[120px]">
            {f.title}
            {f.titleItalic && (
              <>
                <br />
                <em>{f.titleItalic}</em>
              </>
            )}
          </h1>
          <p className="max-w-3xl font-serif text-2xl leading-snug text-muted">{f.dek}</p>
          <p className="flex items-center gap-3">
            <span className="font-serif text-xl">{profile.name}</span>
            <span className="label text-muted">{fmtDate(f.date)} · Dhaka</span>
          </p>
        </header>
      </FolioChrome>

      <article className="folio mx-auto max-w-[680px] px-5 pb-20" dangerouslySetInnerHTML={{ __html: f.html }} />

      <nav className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 border-t border-ink px-5 py-10">
        {prev ? (
          <Link href={`/notebooks/${prev.slug}`} className="flex flex-col gap-2">
            <span className="label text-muted">Previous folio · {roman[prev.number - 1]}</span>
            <span className="font-serif text-4xl">← {prev.title} {prev.titleItalic}</span>
          </Link>
        ) : (
          <Link href="/notebooks" className="font-serif text-4xl">← All notebooks</Link>
        )}
        <span className="font-serif text-3xl italic">— I.A., Dhaka</span>
        <div className="flex flex-col items-end gap-2">
          <span className="label text-muted">Share this folio</span>
          <span className="label flex gap-3">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nibirman.com/notebooks/${f.slug}`)}`} target="_blank" rel="noreferrer">LinkedIn</a>·
            <a href={`https://x.com/intent/post?text=${encodeURIComponent(`${f.title} ${f.titleItalic ?? ""}`)}&url=${encodeURIComponent(`https://nibirman.com/notebooks/${f.slug}`)}`} target="_blank" rel="noreferrer">X</a>
          </span>
        </div>
      </nav>
      <Footer showStats={false} />
    </>
  );
}
