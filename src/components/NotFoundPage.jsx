import React from 'react';
import { Home, Camera, TrendingUp, Sparkles, Sprout, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage({ onNavigateHome, onNavigateSection }) {
  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#031d10]/90 border border-emerald-800/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
        
        {/* Animated Sprout Icon */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-[#052b19] to-emerald-950 border border-emerald-500/40 flex items-center justify-center shadow-xl">
            <Sprout className="w-12 h-12 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* 404 Headline */}
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-950/60 rounded-full border border-amber-800/50 inline-block">
            404 • Field Plot Not Found
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            This Crop Hasn&apos;t <span className="gradient-text-agri">Sprouted Yet!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
            The link you followed seems to be out in uncultivated land or has been moved to a new section. Let&apos;s guide you back to productive soil.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            onClick={onNavigateHome}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 text-sm"
          >
            <Home className="w-4 h-4 text-black" />
            Return to GrainWise AI Homepage
          </button>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="pt-4 border-t border-emerald-900/60 space-y-2 text-left">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Or Jump Directly To:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => onNavigateSection('diagnostics')}
              className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-medium text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" /> AI Scan
            </button>

            <button
              onClick={() => onNavigateSection('mandi')}
              className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-medium text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Mandi Rates
            </button>

            <button
              onClick={() => onNavigateSection('ananya-ai')}
              className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-medium text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ananya AI
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-400 pt-2 space-y-1">
          <div>www.grainwish.com · 100% Free Smart Farming Intelligence</div>
          <div>Need help? Contact <a href="mailto:support@grainwish.com" className="text-emerald-400 hover:underline">support@grainwish.com</a></div>
        </div>

      </div>

    </div>
  );
}
