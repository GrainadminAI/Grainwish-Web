import React from 'react';
import { Sparkles, Camera, Smartphone, CheckCircle2, Play, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import ThreeFarmCanvas from './ThreeFarmCanvas';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';

export default function HeroSection({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden">
      
      {/* 3D Background Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <ThreeFarmCanvas />
      </div>

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-950/50">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-emerald-200">
                  {t('hero_pill')}
                </span>
              </div>
              <MadeInIndiaTag variant="pill" />
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {t('hero_welcome')} <br />
              <span className="gradient-text-agri">{t('hero_brand')}</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <Smartphone className="w-5 h-5 text-black" />
                {t('hero_cta_download')}
              </button>

              <a
                href="#diagnostics"
                onClick={onScanClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold rounded-2xl backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:border-emerald-400 text-sm sm:text-base"
              >
                <Camera className="w-5 h-5 text-amber-400" />
                {t('hero_cta_scan')}
              </a>
            </div>

            {/* Quick Metrics & Badges */}
            <div className="pt-6 border-t border-emerald-900/50 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">22</div>
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" /> {t('hero_metric_langs')}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">98.4%</div>
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t('hero_metric_accuracy')}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">24/7</div>
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {t('hero_metric_support')}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Phone & Video Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Holographic Frame Card */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-emerald-900/30 to-[#031d10]/90 p-4 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-xl group hover:border-emerald-400/60 transition-all">
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between px-3 py-2 bg-emerald-950/80 rounded-xl mb-3 border border-emerald-800/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">Live AI Diagnostics Preview</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  GrainWise AI
                </span>
              </div>

              {/* Video / Graphic Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 aspect-[4/3] bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/assets/sustainable_farm_diorama.mp4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="/assets/ananya_hero_ai.png"
                  alt="Ananya AI Assistant"
                  className="w-full h-full object-cover"
                  style={{ display: 'none' }}
                  onError={(e) => {
                    e.target.src = '/assets/hand_phone_crop.jpeg';
                  }}
                />

                {/* Live Scanning Holographic Overlay Animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                
                {/* Scanning Laser Line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan" />

                {/* Floating AI HUD Cards */}
                <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>AI Crop Scan: Active</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-amber-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/40 text-[11px] text-amber-300 font-medium shadow-lg flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Yield Protection: +35%</span>
                </div>
              </div>

              {/* Bottom Interactive Feature Chips */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href="#diagnostics" className="p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/40 text-left transition-colors">
                  <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-amber-400" /> Camera AI
                  </div>
                  <div className="text-[10px] text-slate-400">Instant leaf scan diagnosis</div>
                </a>

                <a href="#ananya-ai" className="p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/40 text-left transition-colors">
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ananya AI
                  </div>
                  <div className="text-[10px] text-slate-400">22 Native Languages</div>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
