import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ServiceDetailClient from "./ServiceDetailClient";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("title, short_description")
    .eq("slug", slug)
    .single();

  if (!service) {
    return { title: "Service Not Found | HCCS" };
  }

  return {
    title: `${service.title} | HCCS Services`,
    description: service.short_description ?? undefined,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("id, title, short_description, long_description")
    .eq("slug", slug)
    .single();

  if (!service) {
    notFound();
  }

  const [{ data: resolvedFeatures }, { data: resolvedHelp }] = await Promise.all([
    supabase.from("services_features").select("id, text").eq("services_id", service.id).order("id"),
    supabase.from("services_help").select("id, text").eq("services_id", service.id).order("id"),
  ]);

  const featureList = resolvedFeatures ?? [];
  const helpList = resolvedHelp ?? [];

  return (
    <ServiceDetailClient
      service={service}
      featureList={featureList}
      helpList={helpList}
    />
  );
}

