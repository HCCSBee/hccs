import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  "employment-act": {
    title: "About the Employment Act",
    description:
      "The Employment Act is Singapore's main labour law and provides core terms and working conditions for most employees.",
  },
  retirement: {
    title: "Retirement",
    description:
      "Reference guidance on retirement-related employment practices and employer obligations in Singapore.",
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

export default async function EmploymentPracticesPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Employment Practices</p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-5">{page.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.description}</p>
      <Link href="/resources" className="text-emerald-700 hover:text-emerald-800 font-semibold">
        Explore More Resources
      </Link>
    </div>
  );
}
