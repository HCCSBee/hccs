import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ServiceDetailClient from "./ServiceDetailClient";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("title, short_description")
    .eq("slug", slug)
    .single();

  if (!service || error) {
    return { title: "Service Not Found | HCCS" };
  }

  return {
    title: `${service.title} | HCCS Services`,
    description: service.short_description ?? undefined,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, title, short_description, long_description")
    .eq("slug", slug)
    .single();

  if (!service || serviceError) {
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

