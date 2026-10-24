import React, { lazy, Suspense } from 'react';
import { Sparkles, Camera, Smartphone, CheckCircle2, Play, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';
import HolographicIndiaMap from './HolographicIndiaMap';

const ThreeFarmCanvas = lazy(() => import('./ThreeFarmCanvas'));

export default function HeroSection({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);

  return (
    <section className="relative min-h-[auto] lg:min-h-screen pt-16 pb-8 sm:pt-20 sm:pb-12 lg:pt-22 lg:pb-14 flex items-center overflow-hidden">
      
      {/* Real Cinematic Crop Field Video Animation Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/field_wheat_healthy.jpg"
          className="w-full h-full object-cover opacity-50 sm:opacity-60 scale-105 filter brightness-105 contrast-115 saturate-125 transition-opacity duration-1000"
        >
          <source src="/assets/real_crops_field.mp4" type="video/mp4" />
          <source src="/assets/real_wheat_field.webm" type="video/webm" />
        </video>
        {/* Dark Cinematic Gradient Overlays to guarantee high-contrast text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021109] via-[#021109]/75 to-[#021109]/85" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#021109]/55 to-[#021109]" />
      </div>

      {/* 3D Background Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-[#021109]" />}>
          <ThreeFarmCanvas />
        </Suspense>
      </div>

      {/* Decorative Glow Orbs matching Brand Palette */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '3.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-950/50">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-200">
                  {t('hero_pill')}
                </span>
              </div>
              <MadeInIndiaTag variant="pill" />
            </div>

            {/* Main Headline - Compact and High-Impact */}
            <h1 className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-tight sm:leading-[1.12]">
              {t('hero_welcome')} <br />
              <span className="gradient-text-agri">{t('hero_brand')}</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-snug sm:leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <Smartphone className="w-4 h-4 text-black" />
                {t('hero_cta_download')}
              </button>

              <a
                href="#diagnostics"
                onClick={onScanClick}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold rounded-2xl backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:border-emerald-400 text-xs sm:text-sm"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                {t('hero_cta_scan')}
              </a>
            </div>

            {/* Quick Metrics & Badges */}
            <div className="pt-3 sm:pt-4 border-t border-emerald-900/40 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-base sm:text-xl font-extrabold text-amber-400">22</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" /> {t('hero_metric_langs')}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-base sm:text-xl font-extrabold text-emerald-400">98.4%</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t('hero_metric_accuracy')}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <div className="text-base sm:text-xl font-extrabold text-amber-400">24/7</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {t('hero_metric_support')}
                </div>
              </div>
            </div>

          </div>

          {/* Center Column: Animated Holographic Indian Map with Telemetry */}
          <div className="lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
            <HolographicIndiaMap />
          </div>

          {/* Right Column: 3D Interactive Phone & Video Showcase */}
          <div className="lg:col-span-3 relative flex justify-center">
            
            {/* Holographic Frame Card */}
            <div className="relative w-full max-w-sm bg-gradient-to-b from-emerald-900/30 to-[#031d10]/90 p-3 sm:p-3.5 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-xl group hover:border-emerald-400/60 transition-all">
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-950/80 rounded-xl mb-2.5 border border-emerald-800/40">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">Live AI Diagnostics Preview</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  GrainWise AI
                </span>
              </div>

              {/* Video / Graphic Showcase with Guaranteed Image Display */}
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 aspect-[4/3] bg-emerald-950">
                {/* Fallback Image is ALWAYS mounted and visible by default */}
                <img
                  src="/assets/ananya_hero_ai.png"
                  alt="Ananya AI Agronomy Assistant showcasing holographic crop diagnostic guidance"
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    videoPlaying && !videoFailed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  onError={(e) => {
                    e.target.src = '/assets/hand_phone_crop.jpeg';
                  }}
                />

                {!videoFailed && (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/assets/ananya_hero_ai.png"
                    onPlay={() => setVideoPlaying(true)}
                    onPlaying={() => setVideoPlaying(true)}
                    onError={() => {
                      setVideoFailed(true);
                      setVideoPlaying(false);
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      videoPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                    src="/assets/real_crops_field.mp4"
                  />
                )}

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
