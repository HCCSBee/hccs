"use client";

import { useLang } from "@/lib/i18n";
import { useEffect, useState } from "react";
import rawData from "./data.json";

interface NewsItem {
    title: string;
    agencyName: string;
    url: string;
    contentType: string;
}

export default function HRNewsClient() {
    const { t } = useLang();
    const h = t.hrNews;
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const items: NewsItem[] = [];
        Object.values(rawData).forEach((category: any) => {
            if (category.recLinks && Array.isArray(category.recLinks)) {
                category.recLinks.forEach((link: any) => {
                    items.push({
                        title: link.title,
                        agencyName: link.agencyName,
                        url: link.url,
                        contentType: link.contentType,
                    });
                });
            }
        });
        setNewsItems(items.slice(0, 12));
        setLoading(false);
    }, []);

    const contentTypeColors: Record<string, string> = {
        FAQ: "bg-blue-100 text-blue-800",
        Information: "bg-green-100 text-green-800",
        Guide: "bg-purple-100 text-purple-800",
        News: "bg-orange-100 text-orange-800",
        Legislation: "bg-red-100 text-red-800",
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <section className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{h.title}</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">{h.desc}</p>
            </section>

            {loading && (
                <div className="text-center py-10">
                    <p className="text-gray-600">Loading news items...</p>
                </div>
            )}

            {!loading && (
                <section className="space-y-6">
                    {newsItems.map((item, index) => (
                        <article
                            key={`${item.url}-${index}`}
                            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            style={{
                                overflow: "hidden"
                            }}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${contentTypeColors[item.contentType] || "bg-gray-100 text-gray-700"}`}
                                >
                                    {item.contentType}
                                </span>
                                <span className="text-xs text-gray-500 flex-shrink-0">{item.agencyName}</span>
                            </div>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
                                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {item.title}
                                </h2>
                            </a>
                            <p className="text-sm text-gray-600" >
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700 truncate"
                                >
                                    {item.url}
                                </a>
                            </p>
                        </article>
                    ))}
                </section>
            )}

            {!loading && newsItems.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-600">No news items available at the moment.</p>
                </div>
            )}

            {/* <div className="text-center mt-10" style={{
                overflow: "hidden",
            }}>
                <p className="text-sm text-gray-500">{h.subscribeNote}</p>
                <a
                    href="mailto:enquiry@hccs.sg?subject=Newsletter Subscription"
                    className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
                >
                    {h.subscribeButton}
                </a>
            </div> */}
        </div>
    );
}
