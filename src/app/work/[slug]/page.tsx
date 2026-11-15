import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/pages/CaseStudy";
import { ventures } from "@/lib/content";

export function generateStaticParams() { return ventures.map((v) => ({ slug: v.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  return v ? { title: `${v.name} — case study`, description: v.vision } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  if (!v) notFound();
  return <CaseStudy v={v} />;
}
