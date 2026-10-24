import React, { useState } from 'react';
import { Sparkles, Camera, Smartphone, CheckCircle2, Play, Globe, ShieldCheck, TrendingUp, Leaf, Droplets, BarChart3, Radio, Flame, Layers } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';
import HolographicIndiaMap from './HolographicIndiaMap';

export default function HeroSection({ onOpenDownloadModal, onScanClick }) {
  const { t } = useLanguage();
  const [activeRightTab, setActiveRightTab] = useState('map'); // 'map' or 'diagnostics'

  return (
    <section className="relative min-h-[auto] lg:min-h-screen pt-14 pb-6 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12 flex items-center overflow-x-hidden">
      
      {/* Background Layer: Google Flow AI Cinematic Agricultural Landscape + Real Crop Wind Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Base Photorealistic Landscape Poster Fallback */}
        <img
          src="/assets/hero_agri_3d_bg.jpg"
          alt="GrainWise AI Smart Agriculture Field"
          className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-115 saturate-115 [image-rendering:-webkit-optimize-contrast]"
        />

        {/* Google Flow AI Living Farm Background Video (Wind, Moving Leaves, Sunlight, Farmers) - Without Audio */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/flow_farm_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-85 filter brightness-108 contrast-120 saturate-130 [image-rendering:-webkit-optimize-contrast] transform-gpu transition-opacity duration-1000 pointer-events-none"
        >
          <source src="/assets/flow_farm_background.mp4" type="video/mp4" />
          <source src="https://flow-content.google/video/5cd2638b-4b4c-4ace-b9f4-b6126ef94611?Expires=1792852818&KeyName=labs-flow-prod-cdn-key&Signature=bOEf06Hwg7HNhfowrxjPf91Kr6Q" type="video/mp4" />
          <source src="/assets/real_crops_field.mp4" type="video/mp4" />
          <source src="/assets/real_wheat_field.webm" type="video/webm" />
        </video>

        {/* Rich Cinematic Vignette Overlays matching Dark Agri Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021109] via-transparent to-[#021109]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#021109]/15 to-[#021109]/60" />
      </div>

      {/* Decorative Glow Orbs matching Brand Palette */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

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
            
            {/* View Switcher Bar on Mobile / Tablet (Auto-adjusts for 4.5" to 7.5" screens) */}
            <div className="w-full max-w-sm flex items-center justify-between p-1 bg-emerald-950/80 border border-emerald-600/40 rounded-2xl mb-2 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setActiveRightTab('map')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRightTab === 'map'
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-black shadow-md'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Radio className="w-3 h-3 shrink-0" />
                <span>India Crop &amp; Demand Map</span>
              </button>

              <button
                onClick={() => setActiveRightTab('diagnostics')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRightTab === 'diagnostics'
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-black shadow-md'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Leaf className="w-3 h-3 shrink-0" />
                <span>Live AI Diagnostics</span>
              </button>
            </div>

            {/* Mode 1: Holographic Indian Map (Crops Produced & Demand in India) */}
            <div className={`w-full transition-all duration-300 ${activeRightTab === 'map' ? 'block' : 'hidden lg:block'}`}>
              <div className="w-full flex justify-center lg:justify-end">
                <HolographicIndiaMap />
              </div>
            </div>

            {/* Mode 2: 3D Holographic Diagnostics Card (Soybean Leaf Mosaic AI Live Diagnostics) */}
            <div className={`w-full transition-all duration-300 ${activeRightTab === 'diagnostics' ? 'block' : 'hidden'}`}>
              <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-emerald-900/50 to-[#031d10]/98 p-3 sm:p-3.5 rounded-3xl border border-emerald-500/40 shadow-2xl backdrop-blur-xl group hover:border-emerald-400/70 transition-all">
                
                {/* Top Banner Tag */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-950/85 rounded-xl mb-2.5 border border-emerald-800/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold text-emerald-300 tracking-wider">LIVE AI DIAGNOSTICS</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" /> Real-time scan
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
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-emerald-400/30 flex items-center justify-center">
                      
                      {/* Top-Left Orbit Node: Leaf Chlorophyll */}
                      <div className="absolute -top-1.5 left-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        <Leaf className="w-3 h-3 text-emerald-300" />
                      </div>

                      {/* Top-Right Orbit Node: Water Hydration */}
                      <div className="absolute -top-1.5 right-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-950/90 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                        <Droplets className="w-3 h-3 text-cyan-300" />
                      </div>

                      {/* Bottom-Left Orbit Node: NPK Nutrients */}
                      <div className="absolute bottom-2 left-4 px-1.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-[8px] font-bold text-emerald-300 tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        NPK
                      </div>

                      {/* Bottom-Right Orbit Node: Leaf Health */}
                      <div className="absolute bottom-2 right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        <Leaf className="w-3 h-3 text-emerald-300" />
                      </div>

                      {/* Central Targeting Reticle */}
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-emerald-400/60 flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.3)]">
                        <div className="absolute top-1 left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-emerald-300" />
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-emerald-300" />
                        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-emerald-300" />
                        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-emerald-300" />
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-dashed border-emerald-400/50 flex items-center justify-center animate-spin-slow" />
                        <div className="absolute bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-400/60 shadow-lg">
                          <span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300">99.4% Match</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Bottom-Right Floating Badge: Yield Insight */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-amber-500/40 text-[9px] sm:text-[10px] text-amber-300 font-semibold shadow-lg flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-amber-400" />
                    <span>Yield Insight</span>
                  </div>
                </div>

                {/* Bottom Split Feature Chips */}
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <a href="#diagnostics" className="p-2 sm:p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/50 text-left transition-all hover:border-emerald-500/60 group/btn">
                    <div className="text-xs font-semibold text-emerald-300 flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-emerald-400" /> Camera AI
                      </span>
                      <span className="text-emerald-400 text-[10px] group-hover/btn:translate-x-0.5 transition-transform">&gt;</span>
                    </div>
                    <div className="text-[9px] text-slate-300 mt-0.5 leading-tight">Instant leaf scan diagnosis</div>
                  </a>

                  <a href="#ananya-ai" className="p-2 sm:p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/50 text-left transition-all hover:border-emerald-500/60 group/btn">
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

            {/* Desktop Docked Live Diagnostics Strip (Shown directly underneath the map on desktop) */}
            <div className="hidden lg:block w-full max-w-[450px] mt-2">
              <div className="flex items-center justify-between p-2 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-400/50 shrink-0">
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
                      <span className="text-[11px] font-bold text-white truncate">AI Crop Vision Active</span>
                    </div>
                    <div className="text-[10px] text-amber-300 font-mono truncate">
                      Soybean Mosaic · 99.4% Match
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setActiveRightTab(activeRightTab === 'map' ? 'diagnostics' : 'map')}
                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/40 transition-colors flex items-center gap-1"
                  >
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>{activeRightTab === 'map' ? 'Diagnostics View' : 'Map View'}</span>
                  </button>
                  <a
                    href="#diagnostics"
                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-colors flex items-center gap-1"
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
