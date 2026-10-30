import React from 'react';
import { Camera, Bot, LineChart, ArrowRight, Zap, Check } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';

export default function CoreHighlights({ selectedLang }) {
  const { t } = useLanguage();
  const highlights = [
    {
      id: 'camera-ai',
      icon: Camera,
      badge: '100.0% Strain Detection',
      title: t('diag_title'),
      description: t('diag_sub'),
      gradient: 'from-emerald-500/15 via-emerald-600/5 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      link: '#diagnostics',
      image: '/assets/hand_phone_crop.jpeg',
      chips: ['300+ Pathogens', '3s Scan', 'Dual Remedy']
    },
    {
      id: 'ananya-ai',
      icon: Bot,
      badge: '100% AI Accuracy (22 Lang)',
      title: t('ananya_title'),
      description: t('ananya_sub'),
      gradient: 'from-amber-500/15 via-amber-600/5 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-500/60',
      iconBg: 'bg-amber-500/20 text-amber-400',
      link: '#ananya-ai',
      image: '/assets/ananya_hero_ai.png',
      chips: ['22 Languages', 'Voice & Text', '24/7 Agronomist']
    },
    {
      id: 'mandi-weather',
      icon: LineChart,
      badge: '100% Verified MSP Rates',
      title: t('mandi_title'),
      description: t('mandi_sub'),
      gradient: 'from-cyan-500/15 via-cyan-600/5 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      link: '#mandi',
      image: '/assets/tablet_wheat_field.jpeg',
      chips: ['28 States Live', '2,400+ APMCs', 'MSP Radar']
    }
  ];

  const handleScrollTo = (e, link) => {
    e.preventDefault();
    const el = document.querySelector(link);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="py-6 sm:py-10 md:py-12 bg-[#02180d]/80 border-y border-emerald-900/40 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3.5 sm:mb-5 space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-700/50 text-[10.5px] sm:text-xs font-semibold text-emerald-300">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{t('core_pillar_badge')}</span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            {t('core_title')} <span className="gradient-text-agri">{t('core_thrive')}</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm">
            {t('core_subtitle')}
          </p>
        </div>

        {/* Compact Made In India Trust Banner */}
        <MadeInIndiaTag variant="banner" className="mb-4 sm:mb-6" />

        {/* 3 Compact & Featurable Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative group rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-gradient-to-b ${item.gradient} bg-[#042114]/90 border ${item.borderColor} backdrop-blur-md shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className={`p-2 rounded-xl ${item.iconBg} shadow-inner`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Compact Thumbnail Preview (Reduced height from 160px to 100px) */}
                  <div className="relative rounded-xl overflow-hidden mb-2.5 sm:mb-3 h-24 sm:h-28 border border-emerald-800/40">
                    <img
                      src={item.image}
                      alt={`${item.title} - GrainWish AI Smart Farming Intelligence Feature`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/farmer_hologram.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042114] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs leading-relaxed mb-2.5 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Featurable Quick Capability Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {item.chips.map((chip, i) => (
                      <span
                        key={i}
                        className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800/50"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between">
                  <a
                    href={item.link}
                    onClick={(e) => handleScrollTo(e, item.link)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{t('core_explore')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] text-emerald-400/80 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
