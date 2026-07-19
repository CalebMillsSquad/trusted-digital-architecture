import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/editorial-page";
import { pages } from "@/lib/site-content";

type RouteProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return Object.keys(pages).map((key) => ({ slug: key.split("/") }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) return {};
  return { title: `${page.eyebrow} | TRUSTed Digital Architecture`, description: page.description };
}

export default async function PublicRoute({ params }: RouteProps) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();
  return <EditorialPage page={page} />;
}
