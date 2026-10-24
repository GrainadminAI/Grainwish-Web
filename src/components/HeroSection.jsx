import React, { lazy, Suspense } from 'react';
import { Sparkles, Camera, Smartphone, CheckCircle2, Play, Globe, ShieldCheck, TrendingUp, Leaf, Droplets, BarChart3 } from 'lucide-react';
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
      
      {/* Background Layer: Image 2 Cinematic Agricultural Landscape + Real Crop Wind Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Base Image 2 Photorealistic Landscape */}
        <img
          src="/assets/hero_agri_3d_bg.jpg"
          alt="GrainWise AI Smart Agriculture Field"
          className="w-full h-full object-cover object-center scale-105 filter brightness-100 contrast-110 saturate-110"
        />

        {/* Real Crop Field Video Animation Overlay with Mix-Blend-Screen for Gentle Waving Wind Motion */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/hero_agri_3d_bg.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen filter brightness-110 contrast-125 saturate-125 transition-opacity duration-1000 pointer-events-none"
        >
          <source src="/assets/real_crops_field.mp4" type="video/mp4" />
          <source src="/assets/real_wheat_field.webm" type="video/webm" />
        </video>

        {/* Rich Cinematic Vignette Overlays matching Image 2 Dark Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021109] via-[#021109]/50 to-[#021109]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#021109]/35 to-[#021109]/85" />
      </div>

      {/* 3D Background Canvas Layer (Cyber Perspective Farm Grid, Pollen Particles & Mouse Parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <ThreeFarmCanvas />
        </Suspense>
      </div>

      {/* Decorative Glow Orbs matching Brand Palette */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '3.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-center lg:text-left">
            
            {/* Top Pill Badge matching Image 2 */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-emerald-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/50">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-200">
                  {t('hero_pill')}
                </span>
              </div>
              <MadeInIndiaTag variant="pill" />
            </div>

            {/* Main Headline - Compact and High-Impact matching Image 2 */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.12]">
              {t('hero_welcome')} <br />
              <span className="text-emerald-400">{t('hero_brand')}</span>
            </h1>

            {/* Subtitle / Paragraph matching Image 2 */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-snug sm:leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTAs matching Image 2 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-black font-extrabold rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <Smartphone className="w-4 h-4 text-black" />
                <span>{t('hero_cta_download')}</span>
                <span className="text-black font-bold">→</span>
              </button>

              <a
                href="#diagnostics"
                onClick={onScanClick}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold rounded-2xl backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:border-emerald-400 text-xs sm:text-sm"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {t('hero_cta_scan')}
              </a>
            </div>

            {/* Quick Metrics & Badges matching Image 2 */}
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

          {/* Right Column: 3D Holographic Diagnostics Card from Image 2 */}
          <div className="lg:col-span-3 relative flex justify-center">
            
            {/* Holographic Frame Card */}
            <div className="relative w-full max-w-sm bg-gradient-to-b from-emerald-900/40 to-[#031d10]/95 p-3 sm:p-3.5 rounded-3xl border border-emerald-500/40 shadow-2xl backdrop-blur-xl group hover:border-emerald-400/70 transition-all">
              
              {/* Top Banner Tag matching Image 2 */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-950/85 rounded-xl mb-2.5 border border-emerald-800/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-300 tracking-wider">LIVE AI DIAGNOSTICS</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" /> Real-time crop analysis
                </span>
              </div>

              {/* Graphic Showcase: Soybean Leaf Mosaic AI Live Diagnostics */}
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 aspect-[4/3] bg-emerald-950 shadow-inner group-hover:border-emerald-400/70 transition-all">
                {/* Soybean Leaf Mosaic Image */}
                <img
                  src="/assets/soybean_leaf_mosaic.jpg"
                  alt="Real-time AI crop diagnostics scan of Soybean Yellow Mosaic leaf"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />

                {/* Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

                {/* Real-time Scanning Laser Line */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_14px_#10b981] animate-scan pointer-events-none" />

                {/* Top-Left Floating Badge: Crop Scan Active */}
                <div className="absolute top-2.5 left-2.5 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/50 text-[10px] text-emerald-200 font-semibold flex items-center gap-1.5 shadow-lg">
                  <Leaf className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Crop Scan Active</span>
                </div>

                {/* Top-Right Floating Badge: Identified Condition */}
                <div className="absolute top-2.5 right-2.5 bg-amber-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/50 text-[9px] sm:text-[10px] text-amber-300 font-semibold shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Soybean Mosaic</span>
                </div>

                {/* Holographic Computer Vision HUD Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Outer Orbit Ring with floating telemetry nodes */}
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-emerald-400/30 flex items-center justify-center">
                    
                    {/* Top-Left Orbit Node: Leaf Chlorophyll */}
                    <div className="absolute -top-1.5 left-6 w-6 h-6 rounded-full bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      <Leaf className="w-3 h-3 text-emerald-300" />
                    </div>

                    {/* Top-Right Orbit Node: Water Hydration */}
                    <div className="absolute -top-1.5 right-6 w-6 h-6 rounded-full bg-emerald-950/90 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                      <Droplets className="w-3 h-3 text-cyan-300" />
                    </div>

                    {/* Bottom-Left Orbit Node: NPK Nutrients */}
                    <div className="absolute bottom-2 left-4 px-1.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-[8px] font-bold text-emerald-300 tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      NPK
                    </div>

                    {/* Bottom-Right Orbit Node: Leaf Health */}
                    <div className="absolute bottom-2 right-4 w-6 h-6 rounded-full bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      <Leaf className="w-3 h-3 text-emerald-300" />
                    </div>

                    {/* Central Targeting Reticle */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-emerald-400/60 flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.3)]">
                      {/* Corner Target Brackets */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-300" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-300" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-300" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-300" />

                      {/* Inner Tech Reticle */}
                      <div className="w-16 h-16 rounded-full border border-dashed border-emerald-400/50 flex items-center justify-center animate-spin-slow" />

                      {/* Diagnostic Confidence Pill */}
                      <div className="absolute bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-400/60 shadow-lg">
                        <span className="text-[9px] font-mono font-bold text-emerald-300">99.4% Match</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom-Right Floating Badge: Yield Insight */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-amber-500/40 text-[10px] text-amber-300 font-semibold shadow-lg flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Yield Insight</span>
                </div>
              </div>

              {/* Bottom Split Feature Chips matching Image 2 */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href="#diagnostics" className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/50 text-left transition-all hover:border-emerald-500/60 group/btn">
                  <div className="text-xs font-semibold text-emerald-300 flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-emerald-400" /> Camera AI
                    </span>
                    <span className="text-emerald-400 text-[10px] group-hover/btn:translate-x-0.5 transition-transform">&gt;</span>
                  </div>
                  <div className="text-[9px] text-slate-300 mt-0.5 leading-tight">Instant leaf scan & disease detection</div>
                </a>

                <a href="#ananya-ai" className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/50 text-left transition-all hover:border-emerald-500/60 group/btn">
                  <div className="text-xs font-semibold text-amber-300 flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ananya AI
                    </span>
                    <span className="text-amber-400 text-[10px] group-hover/btn:translate-x-0.5 transition-transform">&gt;</span>
                  </div>
                  <div className="text-[9px] text-slate-300 mt-0.5 leading-tight">22 Native Languages</div>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
