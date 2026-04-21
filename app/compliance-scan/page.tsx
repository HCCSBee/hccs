"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    area: "Employment Contracts",
    question: "Do all your employees have signed written employment contracts that comply with MOM requirements?",
  },
  {
    id: 2,
    area: "Payslips",
    question: "Do you issue itemised payslips to all employees in line with MOM requirements?",
  },
  {
    id: 3,
    area: "CPF",
    question: "Do you pay CPF contributions correctly and on time for all eligible Singapore Citizens and PRs?",
  },
  {
    id: 4,
    area: "Foreign Workers",
    question: "Do you currently employ foreign workers such as EP, S Pass, or Work Permit holders?",
  },
  {
    id: 5,
    area: "Fair Hiring",
    question: "Do you post job advertisements on MyCareersFuture for at least 28 days before hiring a foreigner?",
  },
  {
    id: 6,
    area: "Leave Entitlements",
    question: "Do you provide the correct annual leave, sick leave, and statutory leave entitlements as required by the Employment Act?",
  },
  {
    id: 7,
    area: "Work Injury",
    question: "Do you have the required Work Injury Compensation insurance coverage for eligible workers?",
  },
  {
    id: 8,
    area: "Anti-Discrimination",
    question: "Do you have a formal anti-harassment and non-discrimination policy communicated to all staff?",
  },
  {
    id: 9,
    area: "Retrenchment",
    question: "Are you aware of MOM notification requirements if you retrench 5 or more employees?",
  },
  {
    id: 10,
    area: "HR Records",
    question: "Do you maintain complete and accurate HR records (contracts, payslips, leave) for at least 2 years?",
  },
];

type Answer = "yes" | "no" | "unsure" | null;
type AnswerOption = Exclude<Answer, null>;

function getRiskLevel(score: number): { level: string; color: string; description: string } {
  if (score >= 80) return { level: "Low Risk", color: "text-green-600", description: "Your HR practices appear largely compliant. Continue monitoring regulatory changes." };
  if (score >= 60) return { level: "Medium Risk", color: "text-amber-600", description: "Some compliance gaps identified. Action is recommended to avoid regulatory exposure." };
  if (score >= 40) return { level: "High Risk", color: "text-orange-600", description: "Significant compliance gaps found. Prompt corrective action is strongly recommended." };
  return { level: "Critical Risk", color: "text-red-600", description: "Multiple critical compliance failures. Immediate expert review is required to mitigate legal exposure." };
}

export default function ComplianceScanPage() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== null);
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (id: number, val: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const yesCount = Object.values(answers).filter((v) => v === "yes").length;
  const score = Math.round((yesCount / questions.length) * 100);
  const risk = getRiskLevel(score);

  const failedAreas = questions
    .filter((q) => answers[q.id] === "no" || answers[q.id] === "unsure")
    .map((q) => q.area);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Your Compliance Scan Results</h1>
          <p className="text-gray-500 text-sm">One-time free HR Compliance Risk Scan</p>
        </div>

        {/* Score Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Score</p>
              <p className="text-5xl font-extrabold text-gray-900">{score}<span className="text-2xl text-gray-400">%</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Risk Level</p>
              <p className={`text-2xl font-bold ${risk.color}`}>{risk.level}</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : score >= 40 ? "bg-orange-500" : "bg-red-500"}`}
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 mb-6">{risk.description}</p>

          {failedAreas.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-red-800 text-sm mb-2">Primary Risk Areas</h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(failedAreas)].map((area) => (
                  <span key={area} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-900 text-sm mb-2">📋 Recommended Next Steps</h3>
            <ul className="space-y-1 text-sm text-amber-800">
              {score < 80 && <li>• Book an expert HR compliance review with HCCS</li>}
              {failedAreas.includes("Employment Contracts") && <li>• Update employment contracts to MOM-compliant format</li>}
              {failedAreas.includes("CPF") && <li>• Review CPF contribution rates and payment schedules</li>}
              {failedAreas.includes("Payslips") && <li>• Implement itemised payslip system immediately</li>}
              {failedAreas.includes("Fair Hiring") && <li>• Ensure all roles advertised on MyCareersFuture for ≥28 days</li>}
              {score >= 80 && <li>• Continue monitoring MOM/CPF regulatory updates</li>}
              {score >= 80 && <li>• Schedule an annual compliance review to stay ahead of changes</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/consultation"
            className="flex-1 text-center bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Book Expert Review
          </Link>
          <button
            onClick={() => { setSubmitted(false); setAnswers({}); }}
            className="flex-1 text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Retake Scan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          FREE · One-Time Scan
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">HR Compliance Risk Scan</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Answer 10 quick questions to assess your HR compliance risk level. Get an instant score, risk assessment,
          and recommended corrective actions — at no cost.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{Object.keys(answers).length} of {questions.length} answered</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{q.area}</span>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{q.question}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {(["yes", "no", "unsure"] as AnswerOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                    answers[q.id] === opt
                      ? opt === "yes"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : opt === "no"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {opt === "unsure" ? "Not Sure" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {allAnswered ? "Get My Compliance Score →" : `Answer all ${questions.length} questions to continue`}
        </button>
      </div>
    </div>
  );
}
