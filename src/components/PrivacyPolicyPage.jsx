import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Printer, CheckCircle2, Mail, ExternalLink, Calendar } from 'lucide-react';

export default function PrivacyPolicyPage({ onBackToHome }) {
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
              title="Print Policy"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Print
            </button>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
              DPDP Act 2023 & GDPR Compliant
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
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Privacy Policy & Data Protection Charter
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Effective Date: October 12, 2026
            </span>
            <span>•</span>
            <span>Platform: <strong>GrainWise AI</strong> (www.grainwish.com)</span>
            <span>•</span>
            <span className="text-emerald-300 font-medium">Version 2.4</span>
          </div>
        </header>

        {/* Key Takeaways Card */}
        <div className="bg-emerald-950/50 border border-emerald-700/40 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> At a Glance: Our Core Privacy Commitments
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Zero Sale of Personal Data:</strong> We never sell your farming data or contact details to third-party advertisers.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Transparent Camera Use:</strong> Crop leaf scans are utilized solely to diagnose crop diseases and generate treatment plans.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>DPDP & GDPR Compliance:</strong> You have full rights to access, download, or erase your stored data at any time.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Opt-In Analytics:</strong> Session analytics are only recorded with your explicit cookie consent.</span>
            </li>
          </ul>
        </div>

        {/* Document Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed divide-y divide-emerald-900/40">
          
          {/* Section 1 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">1.</span> Introduction & Scope
            </h2>
            <p>
              Welcome to GrainWise AI (&quot;GrainWise&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating via the website <a href="https://www.grainwish.com" className="text-emerald-400 underline hover:text-emerald-300">www.grainwish.com</a> and our associated mobile applications. GrainWise AI is dedicated to empowering agricultural producers and farmers across India and globally with artificial intelligence diagnostic tools, fertilizer recommendations, and market price insights.
            </p>
            <p>
              This Privacy Policy explains how we collect, process, store, and safeguard your personal information when you interact with our website, software simulators, API services, and mobile applications. By accessing or using our platform, you acknowledge that you have read and understood this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">2.</span> Information We Collect
            </h2>
            <p>We collect information in the following categories:</p>
            <div className="space-y-3 pl-2">
              <div>
                <strong className="text-white block">A. Information You Provide Directly:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1 pl-2">
                  <li><strong>Contact Information:</strong> Phone number or email address provided when pre-registering for the Android application trial pack or submitting mobile feedback.</li>
                  <li><strong>Account Data:</strong> Google OAuth profile details (email, display name) if you choose to sign in to sync diagnostic histories.</li>
                  <li><strong>Crop & Field Data:</strong> Crop type, soil selection, acreage, and growth stages entered into the Precision NPK Calculator or Diagnostics Simulator.</li>
                  <li><strong>Agronomic Inquiries:</strong> Spoken or written prompts submitted to the Ananya AI Assistant.</li>
                </ul>
              </div>

              <div>
                <strong className="text-white block">B. Camera & Media Files:</strong>
                <p className="mt-1">
                  When you utilize our AI Diagnostics Tool, you may grant camera permission or upload leaf photos. Images are analyzed using computer vision neural networks to detect disease strains. You maintain full ownership of all uploaded photographs.
                </p>
              </div>

              <div>
                <strong className="text-white block">C. Technical & Diagnostic Information:</strong>
                <p className="mt-1">
                  Device model, operating system, browser type, preferred language (selected from our 22 supported languages), and approximate network region (used solely to display nearest APMC Mandi rates and local weather warnings).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">3.</span> How We Use Your Information
            </h2>
            <p>Your data is processed strictly for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Delivering instant leaf disease diagnostics and dosage recommendations.</li>
              <li>Calculating customized NPK fertilizer splits to prevent over-chemicalization.</li>
              <li>Providing real-time MSP and Mandi price forecasts for your local district.</li>
              <li>Enrolling eligible farmers in the 14-day free Android trial pack upon launch.</li>
              <li>Continuous improvement of agronomy neural model accuracy across regional crops.</li>
              <li>Securing our web platform against malicious automated bots and distributed attacks.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">4.</span> Camera & Location Permissions
            </h2>
            <p>
              GrainWise AI requests device camera access only when you actively initiate a leaf scan. We do not access your camera in the background or inspect any media outside the specific files you submit. Geo-location queries are generalized to the district level to fetch relevant APMC market data and are never tracked continuously.
            </p>
          </section>

          {/* Section 5 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">5.</span> Data Storage & Security Safeguards
            </h2>
            <p>
              We implement enterprise-grade technical and organizational safeguards to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li><strong>HTTPS/TLS Encryption:</strong> All data transmitted between your device and our servers is encrypted using modern TLS 1.3 protocol.</li>
              <li><strong>Access Controls:</strong> Database tables are secured via Row Level Security (RLS) policies ensuring users only access their own records.</li>
              <li><strong>ISO 27001 Compliance:</strong> Data hosting infrastructure conforms to strict international security benchmarks.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">6.</span> Cookies & Analytics
            </h2>
            <p>
              We use essential cookies strictly necessary to provide core navigation and retain your language preference. For session performance analytics (PostHog), we require your explicit opt-in via our Cookie Consent Banner. If you decline or select &quot;Necessary Only&quot;, analytics tracking is disabled.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">7.</span> Your Legal Rights (DPDP Act 2023 & GDPR)
            </h2>
            <p>As a data principal, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Request a copy of any personal data stored in connection with your phone or email.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request the complete deletion and erasure of your user profile and feedback records.</li>
              <li>Withdraw previously granted consent at any time without penalty.</li>
            </ul>
            <p>
              To exercise any of these rights, contact our Data Protection Officer at <a href="mailto:privacy@grainwish.com" className="text-emerald-400 hover:underline">privacy@grainwish.com</a>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="pt-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">8.</span> Contact & Grievance Redressal
            </h2>
            <p>
              If you have any questions, concerns, or grievances regarding this Privacy Policy or our data handling practices, please contact us:
            </p>
            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/60 text-xs space-y-1 text-slate-200">
              <div className="font-bold text-white">GrainWise AI Grievance Redressal Cell</div>
              <div>Email: <a href="mailto:support@grainwish.com" className="text-emerald-400 underline">support@grainwish.com</a> / <a href="mailto:privacy@grainwish.com" className="text-emerald-400 underline">privacy@grainwish.com</a></div>
              <div>Domain: <a href="https://www.grainwish.com" className="text-amber-400 underline">www.grainwish.com</a></div>
              <div>Response Time: All privacy inquiries are responded to within 48 business hours.</div>
            </div>
          </section>

        </div>

        {/* Back to Home CTA */}
        <div className="pt-8 border-t border-emerald-900/60 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to GrainWise AI Homepage
          </button>

          <span className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} GrainWise AI. All rights reserved.
          </span>
        </div>

      </main>

    </div>
  );
}
