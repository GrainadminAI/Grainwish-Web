import React from 'react';
import { ArrowLeft, Award, ShieldCheck, CheckCircle2, FileText, Printer, Calendar, Lock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function CertificateTermsPage({ onBackToHome }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-emerald-900/50">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-bold transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 text-slate-300 hover:text-white text-xs transition-colors"
              title="Print Terms"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Print
            </button>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
              ISO/IEC 17025 Calibrated Standard
            </span>
          </div>
        </div>
      </div>

      {/* Main Document Container */}
      <main className="max-w-4xl mx-auto bg-[#031d10]/90 border border-emerald-800/60 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
        
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Metadata */}
        <header className="space-y-4 border-b border-emerald-900/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
            <Award className="w-4 h-4 text-amber-400" />
            Certificate Terms, Verification Criteria &amp; Non-Tamper Warranty
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Certificate Terms &amp; Conditions
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Effective Date: October 2026
            </span>
            <span>•</span>
            <span>Platform: <strong>Grainwish AI</strong> (www.grainwish.com)</span>
            <span>•</span>
            <span className="text-emerald-300 font-medium">Policy Version: v1.0_2026</span>
          </div>
        </header>

        {/* Core Warranty Callout */}
        <div className="bg-emerald-950/60 border border-emerald-600/50 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" /> Cryptographic Integrity &amp; Non-Tamper Warranty
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            Every digital certificate generated on Grainwish AI—including <strong>Leaf Pathology Diagnostic Reports</strong>, <strong>Precision Soil NPK Prescriptions</strong>, and <strong>Assay Quality Inspection Certificates</strong>—is assigned a unique cryptographic verification hash, SHA-256 digital fingerprint, and timestamped QR code. Any physical, digital, or hexadecimal alteration invalidates the certificate automatically.
          </p>
        </div>

        {/* Document Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed divide-y divide-emerald-900/40">
          
          {/* Section 1 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">1.</span> Scope &amp; Applicability
            </h2>
            <p>
              These Certificate Terms govern the generation, issuance, reliance, and verification of all digital documents, certificates, and inspection summaries produced through Grainwish AI (<a href="https://www.grainwish.com" className="text-emerald-400 underline">www.grainwish.com</a>) by farmers, millers, traders, processors, and Farmer Producer Organizations (FPOs).
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">2.</span> Certificate Issuance Criteria
            </h2>
            <p>Certificates are automatically generated only when minimum objective criteria are met:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong>Crop Pathology Certificate:</strong> Requires verified green foliage identification (chlorophyll GLI &gt; +0.10, VARI &gt; 0), non-skin and non-indoor room verification, and minimum multi-spectral model confidence of 90.0%.
              </li>
              <li>
                <strong>Precision NPK Prescription Certificate:</strong> Requires complete agronomic inputs including crop species, soil classification, verified acreage, and physiological crop stage.
              </li>
              <li>
                <strong>Assay Inspection &amp; Moisture Certificate:</strong> Requires calibrated measurement of moisture percentage, foreign matter, broken kernel ratios, and grade classification compliant with Agmarknet / NABL benchmarks.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">3.</span> Farmer &amp; Trader Self-Declaration Clauses
            </h2>
            <p>Prior to certificate generation or official submission, the user explicitly warrants:</p>
            <div className="bg-black/50 border border-emerald-900/80 rounded-xl p-4 text-xs space-y-2 text-slate-200">
              <div className="font-semibold text-amber-300">Mandatory Statutory Self-Declaration:</div>
              <p className="italic">
                &ldquo;I declare that I am the legal titleholder or authorized representative for these survey parcel details and grain lots. I warrant that the samples submitted for diagnostic or assay analysis accurately represent the standing crop or harvested lot without artificial adulteration, moisture blending, or chemical masking.&rdquo;
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">4.</span> Non-Tamper Warranty &amp; Anti-Falsification
            </h2>
            <p>
              Each certificate is immutably logged in our database audit trail. Any party attempting to forge, alter dosages, change moisture values, re-date expired certificates, or reuse digital verification hashes will face immediate platform suspension and referral to statutory regulatory authorities under the Information Technology Act, 2000 and the Bharatiya Nyaya Sanhita, 2023.
            </p>
          </section>

          {/* Section 5 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">5.</span> Agronomic Advisory Disclaimer
            </h2>
            <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-4 space-y-1.5 text-xs text-slate-200">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Advisory Nature Notice</span>
              </div>
              <p>
                Grainwish AI certificates represent algorithmic evaluations and analytical assessments. They are provided as predictive decision-support recommendations and do not constitute statutory seed certification, government revenue land records, or commercial crop insurance guarantees.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">6.</span> Verification &amp; Inquiries
            </h2>
            <p>
              Third parties (buyers, processors, bank credit evaluators, or FPOs) can verify the authenticity of any Grainwish AI certificate by scanning the embedded QR code or contacting our verification team at:
            </p>
            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/60 text-xs space-y-1 text-slate-200">
              <div className="font-bold text-white">Grainwish AI Certificate Verification Cell</div>
              <div>Email: <a href="mailto:support@grainwish.com" className="text-emerald-400 underline">support@grainwish.com</a></div>
              <div>Domain: <a href="https://www.grainwish.com" className="text-amber-400 underline">www.grainwish.com</a></div>
            </div>
          </section>

        </div>

        {/* Back to Home CTA */}
        <div className="pt-8 border-t border-emerald-900/60 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Grainwish AI Homepage
          </button>

          <span className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Grainwish AI. All rights reserved.
          </span>
        </div>

      </main>

    </div>
  );
}

