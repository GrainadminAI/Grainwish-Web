import React from 'react';
import { Smartphone, Camera, Sparkles, Mic } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function FloatingMobileBar({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();

  const handleVoiceClick = () => {
    window.dispatchEvent(new CustomEvent('open-ananya-ai-voice'));
  };

  return (
    <aside aria-label="Quick Actions" className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-slide-up pointer-events-none">
      <div className="bg-[#031d10]/95 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl p-1.5 shadow-2xl flex items-center gap-1.5 pointer-events-auto">
        
        {/* Quick Action: Voice AI Assistance */}
        <button
          onClick={handleVoiceClick}
          className="flex-1 py-2.5 px-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 shadow-md"
        >
          <Mic className="w-3.5 h-3.5 text-black shrink-0 animate-pulse" />
          <span>Voice AI</span>
        </button>

        {/* Secondary Quick Action: AI Scan */}
        <button
          onClick={onScanClick}
          className="flex-1 py-2.5 px-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors active:scale-95"
        >
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Scan</span>
        </button>

        {/* Unified Primary CTA: Pre-Register Android App */}
        <button
          onClick={onOpenDownloadModal}
          className="flex-[1.4] py-2.5 px-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-1 transition-transform active:scale-95 text-xs truncate"
        >
          <Smartphone className="w-3.5 h-3.5 text-black shrink-0" />
          <span className="truncate">Pre-Register</span>
        </button>

      </div>
    </aside>
  );
}
