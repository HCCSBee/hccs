"use client";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Service = {
    id: number;
    title: string;
    short_description: string | null;
    slug: string;
};

function initials(title: string): string {
    const words = title.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ServicesPage() {
    const { t } = useLang();
    const s = t.services;
    const [serviceList, setServiceList] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("services")
            .select("id, title, short_description, slug")
            .order("id")
            .then(({ data }) => {
                setServiceList((data ?? []).filter((s): s is Service => Boolean(s.slug)));
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-white">
            <section className="bg-emerald-950 py-20 lg:py-28 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200 mb-6">
                        {s.badge}
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">{s.title}</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        {s.desc}
                    </p>
                </div>
            </section>

            <section className="py-14 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {s.highlights.map((item) => (
                            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                                <div className="w-2 h-8 bg-amber-500 rounded-full mb-4" />
                                <h2 className="font-semibold text-slate-900 mb-2">{item.title}</h2>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <p className="text-center text-slate-500 py-12">{s.loading}</p>
                    ) : serviceList.length === 0 ? (
                        <p className="text-center text-slate-500 py-12">{s.loading}</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceList.map((service, index) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 text-sm font-bold tracking-wide">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {service.short_description}
                                    </p>
                                    <p className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium">
                                        {t.common.learnMore}
                                        <span aria-hidden>{"->"}</span>
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-12 px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{s.ctaTitle}</h2>
                    <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                        {s.ctaDesc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/consultation"
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            {s.ctaButton}
                        </Link>
                        <Link
                            href="/compliance-scan"
                            className="border border-white text-white hover:bg-white hover:text-emerald-800 font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            {t.common.freeScan}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

