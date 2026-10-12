import React from 'react';
import { Smartphone, Camera, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function FloatingMobileBar({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();

  return (
    <aside aria-label="Quick Actions" className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-slide-up pointer-events-none">
      <div className="bg-[#031d10]/95 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl p-2 shadow-2xl flex items-center gap-2 pointer-events-auto">
        
        {/* Secondary Quick Action: AI Scan */}
        <button
          onClick={onScanClick}
          className="flex-1 py-3 px-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
        >
          <Camera className="w-4 h-4 text-amber-400" />
          <span>AI Scan</span>
        </button>

        {/* Unified Primary CTA: Pre-Register Android App */}
        <button
          onClick={onOpenDownloadModal}
          className="flex-[1.6] py-3 px-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 text-xs truncate"
        >
          <Smartphone className="w-4 h-4 text-black shrink-0" />
          <span className="truncate">Pre-Register (14d Free)</span>
        </button>

      </div>
    </aside>
  );
}
