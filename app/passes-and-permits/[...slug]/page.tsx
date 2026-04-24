import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  "work-permit-for-foreign-worker": {
    title: "Work Permit for Foreign Worker",
    description:
      "Reference guidance on work permit requirements and related employer obligations for foreign workers in Singapore.",
  },
  "work-permit-for-foreign-worker/foreign-worker-levy/what-is-the-foreign-worker-levy": {
    title: "What is the Foreign Worker Levy",
    description:
      "Reference information on the foreign worker levy framework and how it applies to employers in Singapore.",
  },
};

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];
  if (!page) return { title: "Page Not Found | HCCS" };
  return { title: `${page.title} | HCCS`, description: page.description };
}

export function generateStaticParams() {
  return Object.keys(pages).map((key) => ({ slug: key.split("/") }));
}

export default async function PassesAndPermitsPage({ params }: PageProps) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key];

  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Passes and Permits</p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-5">{page.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.description}</p>
      <Link href="/resources" className="text-emerald-700 hover:text-emerald-800 font-semibold">
        Explore More Resources
      </Link>
    </div>
  );
}
