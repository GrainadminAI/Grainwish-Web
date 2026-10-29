import React, { useState, useEffect } from 'react';
import {
  Camera,
  Calculator,
  CloudSun,
  Landmark,
  Scale,
  TrendingUp,
  Calendar,
  Check,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function EmpowerHarvest({ onOpenDownloadModal }) {
  const { t } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Close modal on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedFeature(null);
    };
    if (selectedFeature) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedFeature]);

  const featuresList = [
    {
      id: 'disease',
      icon: Camera,
      title: t('feat_disease_title', 'Crop disease detection'),
      teaser: t('feat_disease_teaser', 'Instant computer vision scan identifying 300+ crop pathogens with 98.4% precision.'),
      badge: t('feat_disease_badge', 'Camera AI'),
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      glow: 'shadow-emerald-500/20',
      metric: '98.4% Diagnostic Precision',
      dataSource: 'ICAR & IARI Plant Pathology Database',
      targetSection: '#diagnostics',
      actionText: 'Launch AI Diagnostics Scanner',
      desc: 'Point your smartphone camera at any affected leaf, stem, or grain head. GrainWish AI deep neural vision pipeline scans lesion textures, pustule patterns, and chlorosis in under 3 seconds to accurately classify over 300 crop pathogens.',
      capabilities: [
        'Multi-spectral computer vision for Wheat, Paddy, Cotton, Turmeric & vegetables',
        'Dual-track ICAR prescription: verified chemical dilution (ml/L) & 100% bio-organic alternatives',
        'Dynamic land acreage calculator scaling chemical volume to your specific plot size'
      ]
    },
    {
      id: 'fertilizer',
      icon: Calculator,
      title: t('feat_fertilizer_title', 'Fertilizer calculations'),
      teaser: t('feat_fertilizer_teaser', 'Crop-specific nutrient balancing for Alluvial, Black, Red & Loam soil regions.'),
      badge: t('feat_fertilizer_badge', 'Soil & Growth'),
      accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      glow: 'shadow-amber-500/20',
      metric: 'Save up to ₹2,200 / Acre',
      dataSource: 'National Soil Health Card Protocol',
      targetSection: '#npk-calc',
      actionText: 'Calculate Fertilizer Dosing',
      desc: 'Eliminate costly chemical over-application and soil toxicity. Calculate exact fertilizer requirements based on regional soil chemistry, crop genetics, and physiological growth stages.',
      capabilities: [
        'Soil-specific nutrient correction factors for North, Deccan, South & Eastern belts',
        'Split-dose application schedules across Basal, Tillering, Panicle Initiation & Grain Filling',
        'Calculates direct cost-benefit estimator avoiding excessive commercial urea overdosing'
      ]
    },
    {
      id: 'weather',
      icon: CloudSun,
      title: t('feat_weather_title', 'Live weather alerts'),
      teaser: t('feat_weather_teaser', 'Doppler satellite radar tracking rain, heatwaves, squalls & frost advisories.'),
      badge: t('feat_weather_badge', 'Hyper-Local'),
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      glow: 'shadow-cyan-500/20',
      metric: '27 Agricultural States Covered',
      dataSource: 'India Meteorological Department (IMD)',
      targetSection: '#mandi',
      actionText: 'View Weather & Mandi Radar',
      desc: 'Stay ahead of unseasonal rains and extreme weather threats with 24/7 hyper-local meteorological telemetry synced across 27 Indian agricultural states.',
      capabilities: [
        'Real-time IMD Doppler radar alerts with severity classification (Red, Orange, Yellow)',
        'Field protection advisories including mandatory harvest tarpaulin coverage warnings',
        'Humidity, wind velocity, and precipitation forecasts tailored for field operations'
      ]
    },
    {
      id: 'schemes',
      icon: Landmark,
      title: t('feat_schemes_title', 'Government schemes'),
      teaser: t('feat_schemes_teaser', 'Direct eligibility tracker for PM-KISAN, PMFBY insurance & drip subsidies.'),
      badge: t('feat_schemes_badge', 'Subsidies'),
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      glow: 'shadow-indigo-500/20',
      metric: '100% Verified Central & State Schemes',
      dataSource: 'Ministry of Agriculture & Farmers Welfare',
      targetSection: '#calendar',
      actionText: 'Explore Government Schemes',
      desc: 'Never miss a government welfare transfer, insurance enrollment deadline, or equipment subsidy. Track central and state agricultural support programs with direct eligibility guidelines.',
      capabilities: [
        'PM-KISAN Samman Nidhi installment timeline & direct bank transfer tracker',
        'Pradhan Mantri Fasal Bima Yojana (PMFBY) low-premium crop loss insurance claims',
        'Up to 100% micro-irrigation equipment subsidies under PM Krishi Sinchayee Yojana'
      ]
    },
    {
      id: 'npk',
      icon: Scale,
      title: t('feat_npk_title', 'Precision NPK calculator'),
      teaser: t('feat_npk_teaser', 'Calibrated N-P-K nutrient ratios tailored to your acreage and growth stage.'),
      badge: t('feat_npk_badge', 'Precision Soil'),
      accent: 'border-lime-500/40 text-lime-400 bg-lime-500/10',
      glow: 'shadow-lime-500/20',
      metric: 'Zero Chemical Over-Dosing',
      dataSource: 'State Agricultural Universities (SAUs)',
      targetSection: '#npk-calc',
      actionText: 'Open Precision NPK Engine',
      desc: 'Input your field acreage and crop variety to receive an instant, mathematically verified fertilizer delivery sheet. Balances Nitrogen, Phosphorus, and Potassium ratios for maximum yield return.',
      capabilities: [
        'Pre-calibrated base N-P-K profiles for Wheat, Paddy, Cotton, Turmeric, Sugarcane & Maize',
        'Direct bag and kilogram outputs for commercial Urea (46% N), DAP (18-46-0), and MOP (60% K)',
        'Automatic cloud sync to your farm profile via Supabase for historical season tracking'
      ]
    },
    {
      id: 'mandi',
      icon: TrendingUp,
      title: t('feat_mandi_title', 'Live Mandi prices & MSP locator'),
      teaser: t('feat_mandi_teaser', 'Daily modal prices from 2,400+ APMC yards with GPS nearest-center radar.'),
      badge: t('feat_mandi_badge', 'Market Radar'),
      accent: 'border-amber-400/40 text-amber-300 bg-amber-400/10',
      glow: 'shadow-amber-400/20',
      metric: '2,400+ APMC Yards Active Daily',
      dataSource: 'Agmarknet, e-NAM & APMC Feeds',
      targetSection: '#mandi',
      actionText: 'Launch Mandi Price Radar',
      desc: 'Maximize net farm realization by comparing daily modal prices across neighboring APMC market yards. GPS distance calculation directs you to the most profitable trading center.',
      capabilities: [
        'Agmarknet & e-NAM live daily price feeds across 28 Indian States & Union Territories',
        'MSP profit margin radar highlighting which crops trade above government floor prices',
        'One-tap GPS navigation to the nearest procurement and APMC yard'
      ]
    },
    {
      id: 'calendar',
      icon: Calendar,
      title: t('feat_calendar_title', 'Interactive farming calendar'),
      teaser: t('feat_calendar_teaser', 'Month-by-month Kharif & Rabi operational timeline from sowing to market.'),
      badge: t('feat_calendar_badge', 'Seasonal Timeline'),
      accent: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10',
      glow: 'shadow-emerald-400/20',
      metric: '12-Month Dual Kharif/Rabi Blueprint',
      dataSource: 'ICAR Crop Calendars & Agronomy Protocol',
      targetSection: '#calendar',
      actionText: 'View Farming Calendar Timeline',
      desc: 'Step-by-step seasonal operational timeline keeping every crop phase on track. From nursery bed Trichoderma seed treatment to combine harvesting and moisture testing.',
      capabilities: [
        'Dedicated Kharif (June - Oct) and Rabi (Nov - March) seasonal blueprints',
        'Critical milestone alerts: Crown root irrigation, weed scouting, and yellow rust defense',
        'Harvest moisture threshold guidance to prevent storage grain weevil infestation'
      ]
    }
  ];

  const handleActionClick = (targetSection) => {
    setSelectedFeature(null);
    setTimeout(() => {
      const el = document.querySelector(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#021109]/90 relative overflow-hidden">
      
      {/* Static Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Banner Section */}
        <div className="bg-gradient-to-r from-[#042415] via-[#07321e] to-[#031d11] border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl mb-5 sm:mb-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[10px] sm:text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> {t('empower_harvest_badge', 'Comprehensive Agritech Platform')}
              </div>
              
              <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {t('empower_harvest_title_1', 'Empower your harvest with')} <span className="gradient-text-agri">GrainWish AI</span>
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                {t('empower_harvest_sub', 'From seed to market, GrainWish AI eliminates guesswork. Early pathology diagnostics, precision soil dosing, live mandi rates & government schemes — all in one platform.')}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-2">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-extrabold rounded-xl sm:rounded-2xl shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>{t('empower_harvest_cta', 'Tap Download & Take Guesswork Out')}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <div className="text-[10px] sm:text-[11px] text-amber-300 font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{t('empower_harvest_trial', 'Application Phase Coming Soon · Free 14-day trial pack')}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Compact, Perfectly Balanced Feature Cards Grid (7 Features) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4.5">
          {featuresList.map((f, idx) => {
            const Icon = f.icon;
            const isLastWideCard = idx === 6; // 7th card spans cleanly across the row on tablet & desktop

            return (
              <div
                key={f.id}
                onClick={() => setSelectedFeature(f)}
                className={`group relative rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-[#031d11]/85 border border-emerald-800/40 hover:border-emerald-500/70 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/70 cursor-pointer flex flex-col justify-between ${
                  isLastWideCard ? 'sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#031d11]/95 via-[#052818]/95 to-[#031d11]/95' : ''
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${f.accent} border shadow-inner`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-950/90 text-slate-300 border border-emerald-800/60">
                        {f.badge}
                      </span>
                    </div>

                    <span className="text-[10px] text-amber-400 font-mono font-bold hidden sm:inline-block">
                      {f.metric.split(' ')[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {f.title}
                  </h3>

                  {/* Teaser 1-liner */}
                  <p className="text-slate-300/90 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                    {f.teaser}
                  </p>
                </div>

                {/* Bottom Row: Grainwish Verified on left, Clickable Explore Button on right */}
                <div className="mt-3 pt-2.5 border-t border-emerald-900/40 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>GrainWish Verified</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(f);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/90 hover:bg-amber-400 hover:text-black border border-emerald-700/60 hover:border-amber-400 text-amber-400 font-bold transition-all shadow-sm active:scale-95"
                  >
                    <span>{t('feat_explore_btn', 'Explore')}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE FEATURE DETAILS MODAL                                         */}
      {/* ========================================================================= */}
      {selectedFeature && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feature-modal-title"
          onClick={() => setSelectedFeature(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#042416] via-[#02180d] to-[#011109] border border-emerald-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/90 text-left my-auto space-y-4 sm:space-y-5"
          >
            {/* Header: Icon, Title, Badge & Close Button */}
            <div className="flex items-start justify-between gap-3 border-b border-emerald-900/60 pb-3 sm:pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 sm:p-3 rounded-xl ${selectedFeature.accent} border shadow-lg`}>
                  {React.createElement(selectedFeature.icon, { className: 'w-6 h-6 sm:w-7 sm:h-7' })}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                      {selectedFeature.badge}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      GrainWish Core Pillar
                    </span>
                  </div>
                  <h2 id="feature-modal-title" className="font-display text-lg sm:text-2xl font-extrabold text-white">
                    {selectedFeature.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedFeature(null)}
                aria-label="Close feature details modal"
                className="p-1.5 sm:p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Deep Overview */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Agronomic Capability &amp; Purpose
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {selectedFeature.desc}
              </p>
            </div>

            {/* Key Capabilities Checklist */}
            <div className="bg-[#02180d]/90 border border-emerald-900/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-2">
              <h4 className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Key Feature Capabilities
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {selectedFeature.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                    </span>
                    <span className="leading-snug">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telemetry & Validation Badges */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy / Benefit</div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-400 mt-0.5">
                  {selectedFeature.metric}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Data Calibration</div>
                <div className="text-xs sm:text-sm font-extrabold text-emerald-300 truncate mt-0.5">
                  {selectedFeature.dataSource}
                </div>
              </div>
            </div>

            {/* Bottom Action CTAs */}
            <div className="pt-2 sm:pt-3 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                onClick={() => handleActionClick(selectedFeature.targetSection)}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <span>{selectedFeature.actionText}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedFeature(null);
                    onOpenDownloadModal?.();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-amber-300 font-bold rounded-xl text-xs transition-colors"
                >
                  Pre-Register App
                </button>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-4 py-2 bg-transparent hover:bg-emerald-950/60 border border-emerald-800/60 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
