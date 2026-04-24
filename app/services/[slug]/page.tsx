import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-emerald-950 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1 text-emerald-300 text-sm hover:text-white transition-colors mb-6">
            <span aria-hidden>{"<-"}</span> All Services
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3">HCCS Service</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{service.title}</h1>
          {service.short_description && (
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{service.short_description}</p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Long description */}
        {service.long_description && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">{service.long_description}</p>
          </section>
        )}

        {/* Features */}
        {featureList.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What&apos;s Included</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {featureList.map((f) => (
                <li key={f.id} className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Help / Who this helps */}
        {helpList.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Who This Helps</h2>
            <ul className="space-y-3">
              {helpList.map((h) => (
                <li key={h.id} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-slate-600 text-sm leading-relaxed">{h.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-12 px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto text-sm">
            Speak with our HR advisors for a free consultation and find out how we can support your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/services"
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Back to Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

