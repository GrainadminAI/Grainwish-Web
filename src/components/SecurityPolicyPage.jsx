import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, KeyRound, Server, GitBranch, 
  Database, AlertTriangle, Cpu, FileCheck, RefreshCw, Printer, 
  Calendar, Mail, CheckCircle2, ChevronRight, Layers, Users, 
  Terminal, Activity, BellRing, BookOpen
} from 'lucide-react';

export default function SecurityPolicyPage({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  const sections = [
    { id: 'sec-1', number: '1', title: 'Purpose', icon: ShieldCheck },
    { id: 'sec-2', number: '2', title: 'Scope', icon: Layers },
    { id: 'sec-3', number: '3', title: 'Access Control & Authentication', icon: Lock },
    { id: 'sec-4', number: '4', title: 'Password & Secret Management', icon: KeyRound },
    { id: 'sec-5', number: '5', title: 'Website & Application Security', icon: Terminal },
    { id: 'sec-6', number: '6', title: 'Data Protection & Privacy', icon: Database },
    { id: 'sec-7', number: '7', title: 'GitHub & Source Code Security', icon: GitBranch },
    { id: 'sec-8', number: '8', title: 'Vercel & Cloud Infrastructure', icon: Server },
    { id: 'sec-9', number: '9', title: 'API & Third-Party Integrations', icon: Cpu },
    { id: 'sec-10', number: '10', title: 'Incident Response & Monitoring', icon: AlertTriangle },
    { id: 'sec-11', number: '11', title: 'Backup & Business Continuity', icon: RefreshCw },
    { id: 'sec-12', number: '12', title: 'Employee & Developer Duties', icon: Users },
    { id: 'sec-13', number: '13', title: 'Vulnerability Management', icon: Activity },
    { id: 'sec-14', number: '14', title: 'Compliance & Enforcement', icon: FileCheck },
    { id: 'sec-15', number: '15', title: 'Policy Review & Approval', icon: BookOpen },
  ];

  const incidentSteps = [
    { step: '1', title: 'Identify', desc: 'Detect and document the incident with timestamps, affected assets, and attack vector.' },
    { step: '2', title: 'Contain', desc: 'Isolate affected accounts, cloud resources, microservices, or tokens immediately.' },
    { step: '3', title: 'Investigate', desc: 'Determine root cause, exploit mechanism, potential exposure, and audit logs.' },
    { step: '4', title: 'Recover', desc: 'Restore clean operations, verify integrity, rotate compromised credentials and keys.' },
    { step: '5', title: 'Notify', desc: 'Inform affected customers, partners, and statutory authorities (CERT-In) as required by law.' },
    { step: '6', title: 'Review', desc: 'Publish a blameless post-mortem, document lessons learned, and implement preventive guardrails.' }
  ];

  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Navigation */}
      <div className="max-w-5xl mx-auto mb-8">
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
              ISO 27001 & CERT-In Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Main Document Container */}
      <main className="max-w-5xl mx-auto bg-[#031d10]/95 border border-emerald-800/60 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-12 relative overflow-hidden">
        
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Metadata Header */}
        <header className="space-y-4 border-b border-emerald-900/60 pb-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Information Security Policy &amp; Governance Charter
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/40 text-[11px] font-mono text-amber-300 border border-amber-800/40">
              Draft — Pending Approval
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-[11px] font-mono text-slate-300 border border-emerald-800/50">
              Classification: Internal
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Security Policy &amp; Architecture Charter
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Review Cycle: At least every 6 months
            </span>
            <span>•</span>
            <span>Policy Owner: <strong>Technology &amp; Operations Lead</strong></span>
            <span>•</span>
            <span>Platform: <strong>Grainwish AI</strong> (www.grainwish.com)</span>
          </div>
        </header>

        {/* Quick Jump Index Bar */}
        <nav aria-label="Table of contents" className="bg-[#02130b] border border-emerald-900/60 rounded-2xl p-4 sm:p-6 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" /> Policy Table of Contents (15 Sections)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-all text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {sec.number}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* =========================================================================
            SECTION 1: PURPOSE
        ========================================================================= */}
        <section id="sec-1" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Purpose
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <p>
              Grainwish AI is committed to protecting the confidentiality, integrity, and availability of its website, application, business data, customer information, and technology infrastructure.
            </p>
            <p>
              These policies establish security requirements for employees, developers, administrators, contractors, and authorized third parties who build, operate, or maintain the Grainwish technology estate.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: SCOPE
        ========================================================================= */}
        <section id="sec-2" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Scope
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <p>These policies apply across all operational and technological assets:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Grainwish Website & Application', desc: 'Core web portal, camera scanner, and mobile interface.' },
                { title: 'Source Code on GitHub', desc: 'GrainadminAI/Grainwish-Web repositories and CI/CD pipelines.' },
                { title: 'Hosting & Deployment', desc: 'Vercel serverless functions, edge routing, and previews.' },
                { title: 'Databases & Cloud Storage', desc: 'Supabase PostgreSQL, object storage, and secure endpoints.' },
                { title: 'Agronomic Records & Data', desc: 'Grain quality assessments, market pricing, and transactions.' },
                { title: 'Customer & Partner Data', desc: 'Farmer profiles, mandi traders, mills, and agronomists.' },
                { title: 'Enterprise Devices & Systems', desc: 'Employee workstations, accounts, credentials, and tokens.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ACCESS CONTROL AND AUTHENTICATION
        ========================================================================= */}
        <section id="sec-3" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Access Control and Authentication
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Principle of Least Privilege:</strong> Access must be granted strictly according to least privilege required to fulfill specific role duties.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Individual Accounts:</strong> Each authorized user must have a unique, non-shared individual account. Generic accounts are prohibited.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Mandatory Multi-Factor Authentication (MFA):</strong> MFA must be enforced for GitHub, Vercel, domain registrars, corporate email, and cloud databases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Restricted Administrative Access:</strong> Superuser, database root, and cloud administrator privileges are restricted to vetted key personnel.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Periodic Access Review &amp; Revocation:</strong> Permissions must be reviewed at least quarterly and revoked immediately upon role termination or departure.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>No Shared Production Access:</strong> Production access must never be shared through common passwords, team messaging apps, or unauthenticated public links.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PASSWORD AND SECRET MANAGEMENT
        ========================================================================= */}
        <section id="sec-4" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Password and Secret Management
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Zero Hardcoded Secrets Policy
              </div>
              <p className="text-xs text-slate-300">
                API keys, database passwords, authentication secrets, and private service tokens must <strong>never</strong> be committed to GitHub or embedded in client bundles.
              </p>
            </div>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Password Complexity:</strong> Business accounts must use strong, unique passwords generated and managed via approved password managers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Secret Management Facilities:</strong> Secrets must be stored using approved facilities (e.g. Vercel Project Secrets, Supabase Vault, encrypted environment variables).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Environment Separation:</strong> Production, staging, and development credentials must remain strictly isolated.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Immediate Revocation:</strong> Any credential exposed in logs, issues, or commits must be revoked and rotated immediately without delay.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Log Sanitization:</strong> Sensitive tokens, authorization headers, and personal details must be redacted from error messages, telemetry, and screenshots.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: WEBSITE AND APPLICATION SECURITY
        ========================================================================= */}
        <section id="sec-5" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Website and Application Security
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>HTTPS Enforcement:</strong> All public traffic must be encrypted with TLS 1.3/1.2 and HSTS enabled with long preload duration.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Rigorous Input Validation:</strong> All user inputs (forms, prompts, camera payloads, queries) must be validated, type-checked, and safely escaped.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Parameterized Queries:</strong> Database queries must use parameterized binding or safe ORM abstraction to eliminate SQL injection vectors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Authentication &amp; Authorization Checks:</strong> Every protected API route must enforce token validity, role scope, and session freshness.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>OWASP Top 10 Protections:</strong> Controls must mitigate Cross-Site Scripting (XSS), Injection, Cross-Site Request Forgery (CSRF), and Broken Access Control.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Security Headers:</strong> Vercel and web servers must send strict headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Rate Limiting:</strong> Sensitive endpoints (authentication, OTP verification, expensive Ananya AI inference) must enforce client rate limits to prevent brute-force attacks and abuse.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Opaque Error Handling:</strong> Detailed stack traces, server banners, or database schemas must never be exposed to public end-users.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: DATA PROTECTION AND PRIVACY
        ========================================================================= */}
        <section id="sec-6" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              6
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Data Protection and Privacy
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Data Minimization:</strong> Only data strictly necessary for delivering agricultural intelligence and transaction services shall be collected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Confidentiality Boundaries:</strong> Farmer phone numbers, crop yield figures, transaction records, and financial details are accessible only by authorized personnel.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Encryption at Rest &amp; Transit:</strong> Data is encrypted in transit via TLS 1.3 and at rest using AES-256 standard encryption on all storage volumes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>No Production Data in Dev/Test:</strong> Real production records must never be copied to local workstations or test environments without formal authorization and anonymization.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Retention &amp; Deletion Compliance:</strong> Retention periods adhere to the Digital Personal Data Protection Act 2023 (DPDP) and contractual obligations. Data deletion workflows are honored upon request.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>AI &amp; Third-Party Processor Review:</strong> All external model APIs and processors must undergo formal privacy review prior to processing platform data.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: GITHUB AND SOURCE CODE SECURITY
        ========================================================================= */}
        <section id="sec-7" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              7
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              GitHub and Source Code Security
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Contributor Control:</strong> Repository membership is strictly restricted to vetted company engineers and authorized contributors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Mandatory MFA for Maintainers:</strong> All organization admins and contributors must have hardware/software MFA enabled on GitHub.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Pull Request &amp; Code Review:</strong> Code changes affecting production branches require peer review and test verification prior to merge.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Branch Protection Rules:</strong> The <code className="text-xs bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">main</code> branch requires status checks, signed commits where applicable, and disallows force pushes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Automated Scanning:</strong> Automated secret scanning and Dependabot vulnerability alerts must remain active.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>No Unauthorized Deployments:</strong> Unapproved, unreviewed commits are strictly prohibited from deployment to production.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: VERCEL AND CLOUD INFRASTRUCTURE SECURITY
        ========================================================================= */}
        <section id="sec-8" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              8
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Vercel and Cloud Infrastructure Security
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Authorized Projects:</strong> Production deployments are triggered only through authenticated Vercel organizational pipelines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Isolated Environment Variables:</strong> Production environment variables are segregated from preview and development builds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Preview Deployment Guardrails:</strong> Previews must never mount production database credentials or expose live farmer data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Domain &amp; DNS Protection:</strong> Domain registrar access is locked with hardware MFA and DNS modification privileges are restricted to senior leads.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Audit Log Monitoring:</strong> Deployment logs, runtime errors, and configuration changes are periodically audited for anomalous behavior.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Automated Backups:</strong> Cloud configurations, functions, and critical state are maintained in version-controlled infrastructure definitions.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: API AND THIRD-PARTY INTEGRATIONS
        ========================================================================= */}
        <section id="sec-9" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              9
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              API and Third-Party Integrations
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>API Authentication:</strong> All internal and external API calls must authenticate and authorize requests via scoped API tokens or session headers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Minimum Key Permissions:</strong> Integration keys are scoped strictly to their required actions (e.g., read-only for market feeds).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Vendor Security Assessment:</strong> Third-party services (APMC aggregators, weather APIs, model inference providers) are evaluated for security reliability before onboarding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Fault-Tolerant Degraded Modes:</strong> External service outages must be handled cleanly via circuit-breakers without leaking secrets or crashing user workflows.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Cryptographic Webhook Verification:</strong> Incoming webhooks must verify HMAC signatures or cryptographic tokens before triggering business logic.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SECURITY MONITORING AND INCIDENT RESPONSE
        ========================================================================= */}
        <section id="sec-10" className="space-y-6 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 font-bold flex items-center justify-center text-sm">
              10
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Security Monitoring and Incident Response
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 pl-11">
            <p>
              All suspected security incidents must be reported promptly to the designated security lead at{' '}
              <a href="mailto:security@grainwish.com" className="text-amber-300 underline hover:text-amber-200">security@grainwish.com</a>.
            </p>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#02130b] border border-amber-900/60 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" /> 6-Phase Incident Response Lifecycle
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {incidentSteps.map((step) => (
                  <div key={step.step} className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-extrabold text-[11px] flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <span className="font-bold text-white text-xs">{step.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Every security incident is recorded in an official incident register detailing root timeline, severity, actions taken, and verified preventive remediation.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: BACKUP AND BUSINESS CONTINUITY
        ========================================================================= */}
        <section id="sec-11" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              11
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Backup and Business Continuity
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Scheduled Backups:</strong> Critical application databases and configurations are snapshotted on an automated schedule with write-once protections.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Access Segregation:</strong> Backup archives are isolated from runtime access and protected from unauthorized alteration or deletion.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Periodic Restoration Drills:</strong> Database restoration drills are performed periodically to validate data integrity and recovery speed.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Documented RTO &amp; RPO:</strong> Target Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are defined for all core farming tools and Mandi feeds.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: EMPLOYEE AND DEVELOPER RESPONSIBILITIES
        ========================================================================= */}
        <section id="sec-12" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              12
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Employee and Developer Responsibilities
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <p>All employees, engineers, and contractors must:</p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Protect devices and credentials with screen-locks, disk encryption, and complex passphrases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Refrain from installing unauthorized, pirated, or unverified software on work machines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Report suspicious communications, phishing messages, or unexpected permission requests immediately.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Adhere to secure coding practices (OWASP Top 10) and sanitization standards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Complete mandatory security awareness training upon onboarding and during annual refreshers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Surrender all company devices, revoke tokens, and delete local code checkouts upon offboarding.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: VULNERABILITY MANAGEMENT
        ========================================================================= */}
        <section id="sec-13" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              13
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Vulnerability Management
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Severity-Based Patching:</strong> Security patches are prioritized according to exposure. Critical production vulnerabilities must be remediated urgently (within 24–48 hours).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Dependency Testing:</strong> Automated package audits (`npm audit`) and updates must be validated in staging prior to production rollout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Pre-Release Security Testing:</strong> Major functional releases undergo security reviews and dynamic testing prior to general availability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Vulnerability Tracking:</strong> Identified findings are tracked with unique tickets until resolved, verified, or formally accepted with documented justification.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 14: COMPLIANCE AND POLICY ENFORCEMENT
        ========================================================================= */}
        <section id="sec-14" className="space-y-4 border-b border-emerald-900/40 pb-8 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              14
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Compliance and Policy Enforcement
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 pl-11">
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Mandatory Adherence:</strong> All personnel, contractors, and affiliates within the scope must strictly adhere to these policies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Consequences of Non-Compliance:</strong> Violations may result in access suspension, disciplinary action, termination of contract, or legal remedies permitted under Indian law.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span><strong>Statutory Alignment:</strong> Grainwish AI periodically benchmarks procedures against the Digital Personal Data Protection Act 2023 (DPDP), CERT-In Cybersecurity Directions, and applicable agricultural sector regulations.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            SECTION 15: POLICY REVIEW AND APPROVAL
        ========================================================================= */}
        <section id="sec-15" className="space-y-4 pb-4 scroll-mt-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center text-sm">
              15
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Policy Review and Approval
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 pl-11">
            <p>
              This policy must be reviewed at least every six months and whenever significant changes occur in the application's architecture, business operations, or applicable legal requirements.
            </p>

            <div className="p-5 rounded-2xl bg-[#02130b] border border-emerald-800/60 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 font-mono text-[11px] uppercase">Policy Owner</div>
                  <div className="font-bold text-white text-sm">Technology and Operations Lead</div>
                </div>
                <div>
                  <div className="text-slate-400 font-mono text-[11px] uppercase">Approver</div>
                  <div className="font-bold text-white text-sm">Authorized Company Management</div>
                </div>
                <div>
                  <div className="text-slate-400 font-mono text-[11px] uppercase">Approval Status</div>
                  <div className="font-bold text-amber-300 text-sm">Draft — Pending Organizational Review and Approval</div>
                </div>
                <div>
                  <div className="text-slate-400 font-mono text-[11px] uppercase">Document Classification</div>
                  <div className="font-bold text-emerald-300 text-sm">Internal</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Reporting Callout Card */}
        <footer className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-amber-400" /> Need to report a security issue or vulnerability?
            </div>
            <p className="text-xs text-slate-400">
              Direct email to our security engineering team for urgent confidential triage.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="mailto:security@grainwish.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              security@grainwish.com
            </a>
            <a
              href="mailto:support@grainwish.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-200 text-xs transition-colors"
            >
              support@grainwish.com
            </a>
          </div>
        </footer>

      </main>

    </div>
  );
}
