import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, MapPin, Phone, Calendar, Clock, CheckCircle2, AlertCircle, Printer, ExternalLink } from 'lucide-react';

export default function GrievanceRedressalPage({ onBackToHome }) {
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
              title="Print Grievance Policy"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Print
            </button>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
              DPDP Act 2023 · Section 6 &amp; 13
            </span>
          </div>
        </div>
      </div>

      {/* Main Document Container */}
      <main className="max-w-4xl mx-auto bg-[#031d10]/90 border border-emerald-800/60 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
        
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Metadata */}
        <header className="space-y-4 border-b border-emerald-900/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Statutory Grievance Redressal Mechanism &amp; Officer Contact
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Grievance Redressal
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Effective Date: October 2026
            </span>
            <span>•</span>
            <span>Platform: <strong>Grainwish AI</strong> (www.grainwish.com)</span>
            <span>•</span>
            <span className="text-emerald-300 font-medium">Resolution SLA: &le; 30 Days</span>
          </div>
        </header>

        {/* Core Grievance Officer Card */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#042817] to-black border-2 border-emerald-500/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Designated Grievance Redressal &amp; Data Protection Officer
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]">
              DPDP Act 2023 Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[11px]">Officer Name &amp; Title:</span>
                <span className="text-white font-bold text-sm">R. Narayanan</span>
                <span className="block text-emerald-300 text-[11px]">Data Protection &amp; Grievance Officer</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Official Email ID:</span>
                <a href="mailto:support@grainwish.com" className="text-amber-400 hover:underline font-mono font-bold text-sm">
                  support@grainwish.com
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[11px]">Indian Registered Office Address:</span>
                <span className="text-slate-200 leading-relaxed block">
                  Grainwish AgriTech India Pvt. Ltd.<br />
                  Agri-Innovation Tech Park, Sector 62,<br />
                  Noida, Uttar Pradesh 201309, India
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Working Hours: Mon – Fri (9:30 AM to 6:00 PM IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process & SLA Timeline */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed divide-y divide-emerald-900/40">
          
          <section className="pt-4 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">1.</span> Grievance Submission Process
            </h2>
            <p>
              In accordance with the Digital Personal Data Protection Act, 2023 (DPDP) and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, any user, farmer, or trader may file a grievance concerning:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>Personal profile data handling, corrections, or requests for complete erasure.</li>
              <li>Camera feed telemetry, GPS coordinates, or crop photograph permissions.</li>
              <li>Land parcel / Khasra survey number records and custodian declarations.</li>
              <li>Algorithmic NPK dosage or AI diagnostic report concerns.</li>
            </ul>
          </section>

          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">2.</span> Redressal Timelines &amp; SLAs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-left space-y-1">
                <span className="text-amber-400 font-bold block text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> 48 Hours Acknowledgment
                </span>
                <span className="text-slate-300 block">
                  Every grievance submitted to <a href="mailto:support@grainwish.com" className="text-emerald-400 underline">support@grainwish.com</a> is logged with a unique tracking ticket and acknowledged within 48 business hours.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-left space-y-1">
                <span className="text-emerald-400 font-bold block text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> &le; 30 Days Full Resolution
                </span>
                <span className="text-slate-300 block">
                  Comprehensive inquiry and corrective action are concluded within 30 days from receipt, per statutory DPDP mandates.
                </span>
              </div>
            </div>
          </section>

          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">3.</span> Escalation to the Data Protection Board of India (DPBI)
            </h2>
            <p>
              If your grievance is not resolved to your satisfaction within 30 days, or if you believe our data processing violates your rights under the DPDP Act 2023, you have the statutory right to escalate the matter to the <strong>Data Protection Board of India (DPBI)</strong>.
            </p>
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

