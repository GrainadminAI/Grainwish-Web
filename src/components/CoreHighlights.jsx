import React from 'react';
import { Camera, Bot, LineChart, ArrowRight, ShieldCheck, Zap, Languages } from 'lucide-react';

export default function CoreHighlights({ selectedLang }) {
  const highlights = [
    {
      id: 'camera-ai',
      icon: Camera,
      badge: 'Instant Detection',
      title: 'Camera-Based AI Diagnostics',
      description: 'Identify crop diseases instantly by pointing your phone at the affected leaf or stem.',
      gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      link: '#diagnostics',
      image: '/assets/hand_phone_crop.jpeg'
    },
    {
      id: 'ananya-ai',
      icon: Bot,
      badge: '22 Languages Supported',
      title: 'Ananya AI Assistant',
      description: 'Smart farming guidance in 22 languages, available anytime you need help.',
      gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/20 text-amber-400',
      link: '#ananya-ai',
      image: '/assets/ananya_hero_ai.png'
    },
    {
      id: 'mandi-weather',
      icon: LineChart,
      badge: 'Live Market & MSP',
      title: 'Live Mandi Prices & Weather',
      description: 'Real-time market insights and localized weather alerts for better planning.',
      gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      link: '#mandi',
      image: '/assets/tablet_wheat_field.jpeg'
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#02180d]/80 border-y border-emerald-900/40 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-xs font-semibold text-emerald-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Three Core Pillars of GrainWise AI
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Designed to Help Your Fields <span className="gradient-text-agri">Thrive</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From instant field diagnostic scans to multi-lingual AI consultation and market intelligence, GrainWise AI puts expert agricultural technology directly in your hands.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative group rounded-3xl p-6 bg-gradient-to-b ${item.gradient} bg-[#042114]/90 border ${item.borderColor} backdrop-blur-xl shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${item.iconBg} shadow-inner`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 h-40 border border-emerald-800/40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/assets/farmer_hologram.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042114] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                >
                  Explore Interactive Feature <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
