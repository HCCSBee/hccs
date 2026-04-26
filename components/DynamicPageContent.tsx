"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

type DynamicPageKey = "tafepLabel" | "passesLabel" | "workplaceSafetyLabel" | "employmentPracticesLabel";

export default function DynamicPageContent({
  labelKey,
  title,
  description,
}: {
  labelKey: DynamicPageKey;
  title: string;
  description: string;
}) {
  const { t } = useLang();
  const dp = t.dynamicPages;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">{dp[labelKey]}</p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-5">{title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">{description}</p>
      <Link href="/resources" className="text-emerald-700 hover:text-emerald-800 font-semibold">
        {dp.exploreMoreResources}
      </Link>
    </div>
  );
}
