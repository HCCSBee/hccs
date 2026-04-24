import Link from "next/link";

export default function ComplianceScanCoverPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Free · One-Time Scan
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            HR Compliance Risk Scan
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Find out if your company is exposed to MOM regulatory risk. Answer 10 quick questions and receive an
            instant compliance score, risk rating, and recommended corrective actions — at no cost.
          </p>
          <Link
            href="/compliance-scan/company-details"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg"
          >
            Start Free Scan
            <span aria-hidden>→</span>
          </Link>
          <p className="text-white/40 text-xs mt-4">Takes about 3 minutes · No account required</p>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">What You&apos;ll Receive</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Compliance Score", desc: "An instant percentage score across 10 key HR compliance areas." },
              { icon: "⚠️", title: "Risk Level Rating", desc: "Categorised as Low, Medium, High, or Critical risk with a plain-English explanation." },
              { icon: "📋", title: "Action Checklist", desc: "Specific corrective steps tailored to the gaps identified in your answers." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">10 Areas Covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              "Employment Contracts","Payslips","CPF","Foreign Workers","Fair Hiring",
              "Leave Entitlements","Work Injury","Anti-Discrimination","Retrenchment","HR Records",
            ].map((area, i) => (
              <div key={area} className="flex flex-col items-center bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-700 mb-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-slate-800 leading-tight">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 px-4 bg-emerald-950 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to check your compliance status?</h2>
        <p className="text-white/60 mb-6 text-sm">Free, instant, and no account required.</p>
        <Link
          href="/compliance-scan/company-details"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Start Free Scan →
        </Link>
      </section>
    </div>
  );
}