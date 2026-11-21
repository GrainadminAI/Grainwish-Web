import React from 'react';
import { ArrowLeft, ShieldCheck, Award, Building, Users, MapPin, Mail, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';

export default function AboutPage({ onBackToHome }) {
  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-5">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-slate-200 hover:text-white hover:bg-emerald-900 transition-colors text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Platform</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white text-base">Grainwish <span className="text-amber-400">AI</span></span>
            <MadeInIndiaTag variant="navbar" />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-emerald-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Corporate Profile &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            About Grainwish AI
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Empowering Indian agriculture through state-of-the-art computer vision crop disease diagnostics, precision NPK agronomy, and real-time APMC Mandi market telemetry.
          </p>
        </div>

        {/* Legal Corporate Identity Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#042013] border border-emerald-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">Grainwish Technologies Private Limited</h2>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">
              Active Corporate Entity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 block text-[11px]">Corporate Identification Number (CIN):</span>
              <span className="font-mono font-bold text-amber-300 text-sm">U62013WB2026PTC296769</span>
            </div>
            
            <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 block text-[11px]">Date of Incorporation:</span>
              <span className="font-medium text-slate-200">September 14, 2026</span>
            </div>

            <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 block text-[11px]">Registrar of Companies (RoC):</span>
              <span className="font-medium text-slate-200">RoC Kolkata II, West Bengal</span>
            </div>

            <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-emerald-900/60">
              <span className="text-slate-400 block text-[11px]">Founders &amp; Directors:</span>
              <span className="font-semibold text-white">Suman Paramanik &amp; Sujit Ray</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-emerald-900/60 space-y-1 text-xs">
            <span className="text-slate-400 block text-[11px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Registered Corporate Office:</span>
            </span>
            <p className="text-slate-200 leading-relaxed font-mono">
              3/21, Shanti Pally, Bhadreswar, Chandannagar, Hooghly, West Bengal, 712124, India.
            </p>
          </div>
        </div>

        {/* Mission & Key Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">AI Crop Diagnostics</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Camera-based multi-spectral leaf scanning trained on 300+ Indian fungal, bacterial, and pest infestations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">Precision NPK Engine</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              ICAR-calibrated fertilizer optimization preventing chemical over-dosing and saving farmers ~18% on input bills.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">22 Regional Languages</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Ananya AI Voice Agronomist delivering 24/7 spoken assistance in native Indian languages with zero literacy barriers.
            </p>
          </div>
        </div>

        {/* Compliance & Contact */}
        <div className="p-5 rounded-2xl bg-black/40 border border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white">ISO 27001 Secured · DPDP Act 2023 Compliant</div>
            <div className="text-slate-400">Official Grievance &amp; Corporate Communication: support@grainwish.com</div>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shrink-0"
          >
            Explore Grainwish AI
          </button>
        </div>

      </div>
    </div>
  );
}
