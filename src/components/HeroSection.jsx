import React from 'react';
import { Sparkles, Camera, Smartphone, CheckCircle2, Play, Globe, ShieldCheck, TrendingUp, Leaf } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';
import HolographicIndiaMap from './HolographicIndiaMap';

export default function HeroSection({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[auto] lg:min-h-screen pt-14 pb-6 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12 flex items-center overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        {/* Main 2-Column Responsive Layout: Left Copy (col-span-7) and Right Top-Corner Visual Showcase (col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start lg:items-center">
          
          {/* Left Column: Copy, Badges, CTAs, Metrics (Auto-adjusted for mobile 4.5" to 7.5" and desktop) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-4 text-center lg:text-left">
            
            {/* Top Pill Badges: Live Status + Made in India */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md shadow-lg shadow-emerald-950/60">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-200 truncate">
                  {t('hero_pill')}
                </span>
              </div>
              <MadeInIndiaTag variant="pill" />
            </div>

            {/* Main Headline - Responsive Fluid Typography (Fits perfectly on 320px - 480px mobile screens) */}
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.12]">
              {t('hero_welcome')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-400">
                {t('hero_brand')}
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-200/95 max-w-xl mx-auto lg:mx-0 leading-normal sm:leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTAs: Pre-Register & Instant AI Scan */}
            <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-0.5 sm:pt-1">
              <button
                onClick={onOpenDownloadModal}
                className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-black font-extrabold rounded-xl sm:rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <Smartphone className="w-4 h-4 text-black shrink-0" />
                <span>{t('hero_cta_download')}</span>
                <span className="text-black font-bold">→</span>
              </button>

              <a
                href="#diagnostics"
                onClick={onScanClick}
                className="w-full xs:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-semibold rounded-xl sm:rounded-2xl backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:border-emerald-400 text-xs sm:text-sm"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span>{t('hero_cta_scan')}</span>
              </a>
            </div>

            {/* Quick Metrics & Badges */}
            <div className="pt-2 sm:pt-3 border-t border-emerald-900/50 grid grid-cols-3 gap-1.5 sm:gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-sm sm:text-xl font-extrabold text-amber-400">22</div>
                <div className="text-[8.5px] sm:text-[10px] text-slate-300 font-medium flex items-center gap-1 justify-center lg:justify-start">
                  <Globe className="w-3 h-3 text-emerald-400 shrink-0" /> {t('hero_metric_langs')}
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-sm sm:text-xl font-extrabold text-emerald-400">98.4%</div>
                <div className="text-[8.5px] sm:text-[10px] text-slate-300 font-medium flex items-center gap-1 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> {t('hero_metric_accuracy')}
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-sm sm:text-xl font-extrabold text-amber-400">24/7</div>
                <div className="text-[8.5px] sm:text-[10px] text-slate-300 font-medium flex items-center gap-1 justify-center lg:justify-start">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" /> {t('hero_metric_support')}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Placed in the RIGHT TOP CORNER - Indian Map with Crop Products & Demand Telemetry */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center lg:items-end justify-start mt-2 lg:mt-0">
            
            {/* Holographic Indian Map (Crops Produced & Demand in India) */}
            <div className="w-full flex justify-center lg:justify-end">
              <HolographicIndiaMap />
            </div>

            {/* Desktop Docked Live Diagnostics Strip (Shown directly underneath the map on desktop) */}
            <div className="hidden lg:block w-full max-w-[360px] sm:max-w-[380px] mt-1.5">
              <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-emerald-950/80 border border-emerald-600/40 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-400/50 shrink-0">
                    <img
                      src="/assets/soybean_leaf_mosaic.jpg"
                      alt="Soybean leaf scan thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald-400/20 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-white truncate">AI Crop Vision Active</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-amber-300 font-mono truncate">
                      Soybean Mosaic · 99.4% Match
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href="#diagnostics"
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-colors flex items-center gap-1"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Scan</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
