import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NarrativeDetailView } from "@/components/platform/NarrativeDetailView";
import { getNarrative } from "@/lib/intel/narratives";
import { themeById } from "@/lib/intel/config";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const theme = themeById(slug);
  return {
    title: theme?.name ?? "Narrative",
    description: theme?.summary,
  };
}

export default async function NarrativeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getNarrative(slug);
  if (!data) notFound();
  return <NarrativeDetailView data={data} basePath="/narratives" backLabel="Narratives" />;
}
