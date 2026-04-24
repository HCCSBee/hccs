"use client";

export const dynamic = "force-dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Option = { text: string; score: number };
type Question = {
  id: number;
  question: string;
  category: string;
  options: Option[];
  criticalOverride?: boolean;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Do you currently employ foreign workers such as EP, S Pass or Work Permit holders?",
    category: "Workforce Complexity",
    options: [
      { text: "Yes, many", score: 1 },
      { text: "Yes, a few", score: 1 },
      { text: "No", score: 0 },
    ],
  },
  {
    id: 2,
    question: "Are CPF contributions calculated and submitted with proper checks in place?",
    category: "CPF",
    options: [
      { text: "Yes, with clear internal checks", score: 0 },
      { text: "Yes, but checks are informal", score: 1 },
      { text: "Not sure or fully outsourced without checks", score: 2 },
    ],
    criticalOverride: true,
  },
  {
    id: 3,
    question: "Do all employees have updated employment contracts aligned with MOM Key Employment Terms?",
    category: "MOM",
    options: [
      { text: "Yes, reviewed within last 12 months", score: 0 },
      { text: "Yes, but not recently reviewed", score: 1 },
      { text: "No or not sure", score: 2 },
    ],
    criticalOverride: true,
  },
  {
    id: 4,
    question: "Do you issue itemised payslips in line with MOM requirements?",
    category: "MOM",
    options: [
      { text: "Yes", score: 0 },
      { text: "Partially", score: 1 },
      { text: "No", score: 2 },
    ],
    criticalOverride: true,
  },
  {
    id: 5,
    question: "Are your foreign employees' job roles, salaries and responsibilities aligned with MOM expectations?",
    category: "MOM",
    options: [
      { text: "Yes", score: 0 },
      { text: "Not fully sure", score: 1 },
      { text: "No", score: 2 },
    ],
    criticalOverride: true,
  },
  {
    id: 6,
    question: "Do you maintain proper HR records such as leave, attendance, contracts and warning letters?",
    category: "MOM",
    options: [
      { text: "Yes, in a structured system", score: 0 },
      { text: "Partially", score: 1 },
      { text: "No", score: 2 },
    ],
  },
  {
    id: 7,
    question: "Do you have a clear process for employee termination and dispute handling?",
    category: "MOM",
    options: [
      { text: "Yes", score: 0 },
      { text: "Informal only", score: 1 },
      { text: "No", score: 2 },
    ],
  },
  {
    id: 8,
    question: "Does your company follow fair hiring practices and avoid potentially discriminatory recruitment language?",
    category: "TAFEP",
    options: [
      { text: "Yes", score: 0 },
      { text: "Not fully sure", score: 1 },
      { text: "No", score: 2 },
    ],
    criticalOverride: true,
  },
  {
    id: 9,
    question: "Do you actively monitor updates from MOM, CPF and TAFEP?",
    category: "Governance",
    options: [
      { text: "Yes, regularly", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "No", score: 2 },
    ],
  },
  {
    id: 10,
    question: "Do you have dedicated HR expertise, either internal or external, supporting compliance matters?",
    category: "Governance",
    options: [
      { text: "Yes", score: 0 },
      { text: "Partial support only", score: 1 },
      { text: "No", score: 2 },
    ],
  },
];

const categoryMap: Record<string, number[]> = {
  MOM: [3, 4, 5, 6, 7],
  CPF: [2],
  TAFEP: [8],
  Governance: [9, 10],
  "Workforce Complexity": [1],
};

type AnswerRecord = Record<number, { optionIndex: number; score: number }>;

function calcResult(answers: AnswerRecord) {
  let totalScore = 0;
  let hasCriticalOverride = false;
  questions.forEach((q) => {
    const a = answers[q.id];
    if (a) {
      totalScore += a.score;
      if (q.criticalOverride && a.score === 2) hasCriticalOverride = true;
    }
  });
  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (hasCriticalOverride || totalScore >= 13) riskLevel = "HIGH";
  else if (totalScore >= 6) riskLevel = "MEDIUM";
  return { totalScore, riskLevel, hasCriticalOverride };
}

function getPrimaryRisk(answers: AnswerRecord) {
  const categoryScores: Record<string, number> = {};
  Object.entries(categoryMap).forEach(([cat, ids]) => {
    categoryScores[cat] = ids.reduce((sum, id) => sum + (answers[id]?.score ?? 0), 0);
  });
  const max = Math.max(...Object.values(categoryScores));
  const top = Object.entries(categoryScores).filter(([, v]) => v === max).map(([k]) => k);
  return top.length > 1 ? "Mixed Compliance Risk" : top[0] ?? "General Compliance";
}

function getAlerts(answers: AnswerRecord): string[] {
  const alerts: string[] = [];
  const momScore = categoryMap.MOM.reduce((s, id) => s + (answers[id]?.score ?? 0), 0);
  if (momScore > 0) alerts.push("MOM Risk Alert: Possible gaps in contracts, payslips, records or termination process.");
  const cpfAnswer = answers[2];
  if (cpfAnswer && cpfAnswer.score > 0) alerts.push("CPF Risk Alert: CPF process may lack verification or control.");
  const tafepAnswer = answers[8];
  if (tafepAnswer && tafepAnswer.score > 0) alerts.push("TAFEP Risk Alert: Recruitment practices may not align with fair employment principles.");
  return alerts;
}

const riskConfig = {
  LOW: {
    label: "Low Risk",
    color: "text-green-600",
    bar: "bg-green-500",
    border: "border-green-200",
    bg: "bg-green-50",
    subtitle: "Your company has solid HR compliance foundations",
    description: "Your responses indicate a generally sound HR compliance structure. Continue periodic reviews to stay aligned with evolving regulations.",
    recommendations: [
      "Maintain current compliance processes",
      "Schedule quarterly HR compliance audits",
      "Monitor MOM updates regularly",
      "Document all HR policies",
    ],
  },
  MEDIUM: {
    label: "Medium Risk",
    color: "text-amber-600",
    bar: "bg-amber-500",
    border: "border-amber-200",
    bg: "bg-amber-50",
    subtitle: "Several compliance areas need attention",
    description: "While no immediate critical issues detected, addressing identified gaps will reduce regulatory and operational risk.",
    recommendations: [
      "Review and update employment contracts",
      "Strengthen HR documentation systems",
      "Conduct fair hiring practice audit",
      "Schedule compliance review with expert",
    ],
  },
  HIGH: {
    label: "High Risk",
    color: "text-red-600",
    bar: "bg-red-500",
    border: "border-red-200",
    bg: "bg-red-50",
    subtitle: "Critical compliance gaps require immediate attention",
    description: "Your company has critical HR compliance areas that need urgent review. Taking immediate action will significantly reduce regulatory exposure.",
    recommendations: [
      "Book urgent compliance review",
      "Create corrective action plan",
      "Audit all employment documentation",
      "Review foreign worker management",
    ],
  },
};

const StepIndicator = ({ activeStep: _activeStep }: { activeStep: number }) => null;

export default function ComplianceScanQuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerRecord>({});
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState<{ name: string; company: string } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("cs_company");
    if (!raw) {
      router.replace("/compliance-scan/company-details");
      return;
    }
    setCompany(JSON.parse(raw));
  }, [router]);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  function handleSelect(questionId: number, optionIndex: number, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { optionIndex, score } }));
  }

  function handleSubmit() {
    setProcessing(true);
    const { totalScore, riskLevel, hasCriticalOverride } = calcResult(answers);
    const primaryRisk = getPrimaryRisk(answers);
    const alerts = getAlerts(answers);
    const resultsPayload = {
      totalScore,
      riskLevel,
      hasCriticalOverride,
      primaryRisk,
      alerts,
      answers: Object.entries(answers).map(([qId, a]) => {
        const q2 = questions.find((q3) => q3.id === Number(qId));
        return {
          question_number: Number(qId),
          question: q2?.question ?? "",
          category: q2?.category ?? "",
          selected: q2?.options[a.optionIndex]?.text ?? "",
          score: a.score,
        };
      }),
    };

    const raw = sessionStorage.getItem("cs_company");
    const companyData = raw ? JSON.parse(raw) : {};

    supabase
      .from("compliance_scan")
      .insert({
        company_name: companyData.company ?? null,
        contact_name: companyData.name ?? null,
        business_email: companyData.email ?? null,
        contact_number: companyData.phone ?? null,
        industry: companyData.industry ?? null,
        employess: companyData.size ?? null,
        has_foreign_workers: companyData.foreignWorkers === true ? 1 : 0,
        results: resultsPayload,
      })
      .then(() => {
        setProcessing(false);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  function handleExportPDF() {
    window.print();
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Analysing Your Responses</h2>
          <p className="text-slate-500 text-sm">AIHR is now analysing your responses based on key Singapore HR compliance risk indicators.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    const { totalScore, riskLevel } = calcResult(answers);
    const primaryRisk = getPrimaryRisk(answers);
    const alerts = getAlerts(answers);
    const cfg = riskConfig[riskLevel];
    const maxScore = questions.reduce((s, q2) => s + Math.max(...q2.options.map((o) => o.score)), 0);
    const riskPct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <StepIndicator activeStep={3} />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Your Compliance Results</h1>
            {company && <p className="text-slate-500 text-sm">{company.company}</p>}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Total Score</p>
                <p className="text-5xl font-extrabold text-slate-900">
                  {totalScore}
                  <span className="text-xl text-slate-400 font-normal ml-1">out of {maxScore} points</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Risk Level</p>
                <p className={`text-2xl font-bold ${cfg.color}`}>{cfg.label}</p>
              </div>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
              <div className={`h-3 rounded-full transition-all ${cfg.bar}`} style={{ width: `${riskPct}%` }} />
            </div>

            <p className="text-sm font-semibold text-slate-700 mb-1">{cfg.subtitle}</p>
            <p className="text-sm text-slate-500 mb-6">{cfg.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Primary Risk:</span>
              <span className="text-sm font-semibold text-slate-700">{primaryRisk}</span>
            </div>

            {alerts.length > 0 && (
              <div className={`${cfg.bg} ${cfg.border} border rounded-xl p-4 mb-4`}>
                <ul className="space-y-1">
                  {alerts.map((alert) => (
                    <li key={alert} className="text-sm font-medium text-slate-700">⚠ {alert}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border border-slate-100 rounded-xl p-4 mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Category Risk Breakdown</h3>
              <div className="space-y-2">
                {Object.entries(categoryMap).map(([cat, ids]) => {
                  const catScore = ids.reduce((s, id) => s + (answers[id]?.score ?? 0), 0);
                  const catMax = ids.reduce((s, id) => {
                    const qItem = questions.find((qi) => qi.id === id);
                    return s + (qItem ? Math.max(...qItem.options.map((o) => o.score)) : 0);
                  }, 0);
                  const pct = catMax > 0 ? Math.round((catScore / catMax) * 100) : 0;
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-40 flex-shrink-0">{cat}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${pct >= 75 ? "bg-red-500" : pct >= 40 ? "bg-amber-500" : "bg-green-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">{catScore}/{catMax}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Next Steps</h3>
              <ul className="space-y-1.5">
                {cfg.recommendations.map((rec) => (
                  <li key={rec} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-emerald-600 flex-shrink-0">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mb-6 print:hidden">
            This assessment is based on your responses and provides guidance only — not legal advice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 print:hidden">
            <Link
              href="/consultation"
              className="flex-1 text-center bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Book Expert Review
            </Link>
            <button
              onClick={handleExportPDF}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Report (PDF)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (answered / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <StepIndicator activeStep={2} />

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-slate-900">HR Compliance Questions</h1>
          <span className="text-sm text-slate-500">{answered}/{questions.length} answered</span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-4 mb-8">
          {questions.map((q, i) => {
            const currentAnswer = answers[q.id];
            return (
              <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{q.category}</span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">{q.question}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pl-10">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={opt.text}
                      onClick={() => handleSelect(q.id, optIdx, opt.score)}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        currentAnswer?.optionIndex === optIdx
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Link
            href="/compliance-scan/intro"
            className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            ← Back
          </Link>
          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? "Get My Compliance Score →" : `Answer all ${questions.length} questions to continue`}
          </button>
        </div>
      </div>
    </div>
  );
}
