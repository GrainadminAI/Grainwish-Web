import React from 'react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

/**
 * Indian Flag SVG component for crisp vector rendering
 */
export function IndianFlagIcon({ className = "w-4 h-3" }) {
  return (
    <svg viewBox="0 0 30 20" width="16" height="12" className={`inline-block rounded-[2px] shadow-sm shrink-0 ${className}`}>
      {/* Saffron Top Band */}
      <rect width="30" height="6.67" fill="#FF9933" />
      {/* White Middle Band */}
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      {/* Green Bottom Band */}
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      {/* Ashoka Chakra (24 Spokes) */}
      <g transform="translate(15, 10)">
        <circle r="2.8" fill="none" stroke="#000080" strokeWidth="0.5" />
        <circle r="0.6" fill="#000080" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={2.6 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={2.6 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="0.25"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * MadeInIndiaTag component supporting multiple visual styles
 */
export default function MadeInIndiaTag({ variant = "default", className = "" }) {
  const { t } = useLanguage();

  if (variant === "navbar") {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-[#FF9933]/40 shadow-sm backdrop-blur-md ${className}`}>
        <IndianFlagIcon className="w-4 h-3" />
        <span className="text-[11px] font-bold tracking-wide bg-gradient-to-r from-[#FF9933] via-white to-emerald-400 bg-clip-text text-transparent">
          {t('made_in_india')}
        </span>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#031d10] via-[#052b19] to-[#031d10] border border-[#FF9933]/50 shadow-md backdrop-blur-md ${className}`}>
        <IndianFlagIcon className="w-4 h-3.5" />
        <span className="text-xs font-bold tracking-wider text-slate-100 flex items-center gap-1">
          <span className="text-[#FF9933] font-extrabold">{t('made_in_india').toUpperCase()}</span>
          <span className="text-emerald-400 font-mono text-[10px]">🇮🇳</span>
        </span>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-950/35 via-emerald-950/50 to-emerald-900/35 border border-[#FF9933]/35 p-2.5 sm:p-3.5 shadow-lg backdrop-blur-md ${className}`}>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FF9933]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#031d10] border border-[#FF9933]/50 shadow-sm shrink-0">
              <IndianFlagIcon className="w-5 h-3.5 sm:w-6 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#FF9933] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Atmanirbhar Krishi Tech
                </span>
                <span className="px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-extrabold bg-[#138808]/30 text-emerald-300 border border-emerald-500/40 rounded-full">
                  {t('indigenous_badge')}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white truncate mt-0.5">
                {t('atmanirbhar_title')} 🇮🇳
              </h4>
              <p className="text-[11px] text-slate-300/90 truncate max-w-xl hidden md:block">
                {t('atmanirbhar_desc')}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 border border-emerald-500/30 text-[10.5px] sm:text-xs font-semibold text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Desi AI Excellence</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/80 border border-[#FF9933]/30 text-xs ${className}`}>
        <IndianFlagIcon className="w-4 h-3" />
        <span className="text-slate-300 font-medium">
          {t('made_in_india')} 🇮🇳
        </span>
      </div>
    );
  }

  // Default Tag
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF9933]/20 via-white/10 to-[#138808]/20 border border-[#FF9933]/40 text-xs font-bold text-slate-100 shadow-sm ${className}`}>
      <IndianFlagIcon className="w-4 h-3" />
      <span>{t('made_in_india')} 🇮🇳</span>
    </span>
  );
}
