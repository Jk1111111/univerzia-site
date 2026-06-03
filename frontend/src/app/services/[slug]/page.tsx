import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "../ServiceDetail";
import { serviceSlugs, getServiceBySlug } from "@/lib/data/services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Service — Univerzia AI" };
  return {
    title: `${s.navLabel} — Univerzia AI`,
    description: s.hero.lead,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();
  return <ServiceDetail s={s} />;
}
