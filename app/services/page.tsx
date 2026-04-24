"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const serviceHighlights = [
    {
        title: "Singapore Market Entry & Business Setup",
        desc: "Helping foreign founders establish and operate in Singapore with full compliance.",
    },
    {
        title: "Work Pass & Residency Strategy",
        desc: "Strategic EP, EntrePass, and PR solutions designed to improve approval success.",
    },
    {
        title: "HR Compliance & Risk Advisory",
        desc: "Protect your business with structured HR frameworks aligned to Singapore regulations.",
    },
    {
        title: "AIHR Compliance Intelligence Platform",
        desc: "AI-powered HR guidance and compliance monitoring backed by expert advisory.",
    },
];

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
                        HCCS Services
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        HCCS offers the following services in accordance with HR trends 2025 as per the World Economic Forum.
                    </p>
                </div>
            </section>

            <section className="py-14 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {serviceHighlights.map((item) => (
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
                        <p className="text-center text-slate-500 py-12">Loading services...</p>
                    ) : serviceList.length === 0 ? (
                        <p className="text-center text-slate-500 py-12">No services found.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceList.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 text-sm font-bold tracking-wide">
                                        {initials(service.title ?? "")}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {service.short_description}
                                    </p>
                                    <p className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium">
                                        Speak with HCCS
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
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Not sure which service you need?</h2>
                    <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                        Book a free 30-minute consultation and our team will assess your situation and recommend the right solution.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/consultation"
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Book Free Consultation
                        </Link>
                        <Link
                            href="/compliance-scan"
                            className="border border-white text-white hover:bg-white hover:text-emerald-800 font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Free HR Compliance Scan
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
