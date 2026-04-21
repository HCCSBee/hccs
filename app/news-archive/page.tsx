import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Archive | HCCS",
};

const archived = [
  { month: "Dec 2025", title: "MOM Retrenchment Notification Threshold Updated" },
  { month: "Nov 2025", title: "CPF Salary Ceiling Adjustment Announced" },
  { month: "Oct 2025", title: "Fair Hiring Framework Audit Guidance" },
  { month: "Sep 2025", title: "Employment Act Best Practice Checklist" },
];

export default function NewsArchivePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">News Archive</h1>
      <p className="text-gray-600 mb-8">Historical HR and employment updates curated by HCCS.</p>
      <div className="space-y-3">
        {archived.map((n) => (
          <div key={n.title} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">{n.month}</p>
            <p className="font-medium text-gray-900">{n.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
