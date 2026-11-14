import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { works } from "@/lib/career";
import CaseStudy from "@/components/pages/CaseStudy";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  return { title: `${w.name}${w.italic ? " " + w.italic : ""} — case study`, description: w.logline, openGraph: { images: [w.img] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = works.findIndex((w) => w.slug === slug);
  if (i < 0) notFound();
  return <CaseStudy index={i} />;
}
