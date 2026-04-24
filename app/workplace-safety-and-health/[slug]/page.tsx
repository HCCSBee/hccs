import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  "work-injury-compensation": {
    title: "Work Injury Compensation",
    description:
      "The Work Injury Compensation Act (WICA) allows claims for work-related injuries or diseases without starting legal action.",
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return { title: "Page Not Found | HCCS" };
  return { title: `${page.title} | HCCS`, description: page.description };
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function WorkplaceSafetyPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Workplace Safety and Health</p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-5">{page.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.description}</p>
      <Link href="/resources" className="text-emerald-700 hover:text-emerald-800 font-semibold">
        Explore More Resources
      </Link>
    </div>
  );
}
