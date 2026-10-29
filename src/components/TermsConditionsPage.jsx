import React from 'react';
import { ArrowLeft, Scale, AlertTriangle, CheckCircle2, FileText, Printer, Calendar, ShieldCheck, MapPin, Compass } from 'lucide-react';

export default function TermsConditionsPage({ onBackToHome }) {
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
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/60">
              Legal Terms of Service
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
            <Scale className="w-4 h-4 text-amber-400" />
            Terms of Service & Agricultural Advisory Agreement
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Terms & Conditions
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Effective Date: October 12, 2026
            </span>
            <span>•</span>
            <span>Platform: <strong>Grainwish AI</strong> (www.grainwish.com)</span>
            <span>•</span>
            <span className="text-emerald-300 font-medium">Version 2.4</span>
          </div>
        </header>

        {/* Agricultural Advisory Notice Callout */}
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" /> Important Agricultural Advisory Disclaimer
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            Grainwish AI provides diagnostic evaluations, NPK nutrient estimates, and treatment alternatives for informational and agronomic support purposes. Real-world crop outcomes vary based on micro-climates, soil test variations, irrigation quality, and weather events. Farmers are encouraged to cross-reference recommendations with certified local agricultural extension officers (KVKs) and follow all statutory pesticide manufacturer labels.
          </p>
        </div>

        {/* Document Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed divide-y divide-emerald-900/40">
          
          {/* Section 1 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">1.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the Grainwish AI website (<a href="https://www.grainwish.com" className="text-emerald-400 underline">www.grainwish.com</a>), software applications, AI simulators, or associated mobile packages, you agree to be legally bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you must refrain from using the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">2.</span> Description of Services
            </h2>
            <p>
              Grainwish AI provides software-driven agricultural intelligence services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Computer-vision leaf pathology diagnostics for commercial Indian and global crops.</li>
              <li>Precision NPK and micronutrient dosage calculators calibrated to regional soil classifications.</li>
              <li>Live APMC Mandi commodity price indices, MSP benchmarks, and localized weather alerts.</li>
              <li>GPS and network-assisted APMC market proximity calculation and nearest-center sorting.</li>
              <li>Multilingual agricultural AI conversation through Ananya AI in 22 native Indian languages.</li>
              <li>Crop seasonal calendars and government subsidy tracking.</li>
            </ul>
          </section>

          {/* Section 2.1: Location & GPS Services Terms */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">2.1</span> Location &amp; GPS Telemetry Services (Terms of Use &amp; Disclaimers)
            </h2>

            <div className="bg-emerald-950/70 border border-emerald-600/50 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Voluntary Location Opt-In &amp; Geodesic Proximity Notice</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Use of GPS features is strictly voluntary and user-initiated. Users can explore all 28 states and Union Territories across India by selecting states manually without granting device GPS permissions.
              </p>
            </div>

            <p>
              When you opt to activate GPS location services on Grainwish AI, you acknowledge and agree to the following operational parameters:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong>Informational Decision Support Only:</strong> Calculated distances to wholesale APMC mandis are computed using mathematical geodesic algorithms (Haversine formula). They are intended as agronomic planning aids and do not constitute real-time turn-by-turn road navigation or a guarantee of current road traffic conditions, toll rates, or fuel economics.
              </li>
              <li>
                <strong>Signal &amp; Hardware Variations:</strong> Geolocation accuracy depends directly on your device’s hardware GPS receiver, cellular network tower triangulation, satellite visibility, and ISP routing. Grainwish AI does not warrant continuous, uninterrupted GPS reception, particularly in remote agrarian topographies.
              </li>
              <li>
                <strong>No Mandi Commercial Contract:</strong> Proximity rankings do not guarantee produce acceptance, price realization, or queue lengths at individual APMC market yards. Farmers are advised to confirm mandi operational hours and statutory cess with respective local market secretaries.
              </li>
              <li>
                <strong>Privacy &amp; Revocation:</strong> Location processing adheres to India’s DPDP Act 2023 and the GDPR. You may disable GPS permissions at any time through your web browser without forfeiting access to any core features.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">3.</span> User Conduct & Permitted Use
            </h2>
            <p>
              You agree to use Grainwish AI exclusively for lawful agricultural, educational, or commercial farming management purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Upload malicious code, automated scraping bots, or reverse-engineer the proprietary neural model weights.</li>
              <li>Submit non-plant media or fraudulent diagnostic requests aimed at degrading platform performance.</li>
              <li>Attempt to bypass rate-limits, honeypot protections, or access unauthorized administrative APIs.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">4.</span> Android Pre-Registration & 14-Day Trial Pack
            </h2>
            <p>
              Users pre-registering their phone number or email for the forthcoming Android mobile application phase are entitled to a Free 14-Day Trial Pack upon official launch. Pre-registration does not obligate the user to make future purchases. Promotional trial offerings are subject to verification of valid contact information.
            </p>
          </section>

          {/* Section 5 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">5.</span> Intellectual Property Rights
            </h2>
            <p>
              All trademarks, software designs, UI components, computer vision algorithms, and logos associated with &quot;Grainwish AI&quot; and &quot;Grainwish&quot; are the exclusive intellectual property of Grainwish AI. You may not copy, reproduce, distribute, or create derivative works without prior written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">6.</span> Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Grainwish AI and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of crop yield, revenue, or business interruption arising from reliance on platform data or unforeseen severe climate disasters.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">7.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Section 8 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">8.</span> Inquiries & Legal Notices
            </h2>
            <p>
              For any questions regarding these Terms or to report potential violations, please reach out to:
            </p>
            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/60 text-xs space-y-1 text-slate-200">
              <div className="font-bold text-white">Grainwish AI Legal Affairs Department</div>
              <div>Email: <a href="mailto:legal@grainwish.com" className="text-emerald-400 underline">legal@grainwish.com</a> / <a href="mailto:support@grainwish.com" className="text-emerald-400 underline">support@grainwish.com</a></div>
              <div>Official URL: <a href="https://www.grainwish.com" className="text-amber-400 underline">www.grainwish.com</a></div>
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
