import React from 'react';
import { ShieldCheck, Camera, Calculator, CloudSun, Landmark, Scale, TrendingUp, Calendar, Check, Sparkles } from 'lucide-react';

export default function EmpowerHarvest({ onOpenDownloadModal }) {
  const featuresList = [
    {
      id: 'disease',
      icon: Camera,
      title: 'Crop disease detection',
      desc: 'Point your camera at any crop symptom and get an instant diagnosis with treatment suggestions.',
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      badge: 'Camera AI'
    },
    {
      id: 'fertilizer',
      icon: Calculator,
      title: 'Fertilizer calculations',
      desc: 'Calculate the precise nutrient mix your soil needs based on crop type and growth stage.',
      accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      badge: 'Soil & Growth'
    },
    {
      id: 'weather',
      icon: CloudSun,
      title: 'Live weather alerts',
      desc: 'Receive hyper-local forecasts and warnings so you can protect your harvest in time.',
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      badge: 'Hyper-Local'
    },
    {
      id: 'schemes',
      icon: Landmark,
      title: 'Government schemes',
      desc: 'Track the latest subsidies, insurance, and support programs relevant to your region.',
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      badge: 'Subsidies'
    },
    {
      id: 'npk',
      icon: Scale,
      title: 'Precision NPK calculator',
      desc: 'Perfect fertilizer dosing tailored to your soil, crop, and season.',
      accent: 'border-lime-500/40 text-lime-400 bg-lime-500/10',
      badge: 'Precision Soil'
    },
    {
      id: 'mandi',
      icon: TrendingUp,
      title: 'Live Mandi prices & MSP locator',
      desc: 'Never miss a market opportunity or the nearest procurement center.',
      accent: 'border-amber-400/40 text-amber-300 bg-amber-400/10',
      badge: 'Market Radar'
    },
    {
      id: 'calendar',
      icon: Calendar,
      title: 'Interactive farming calendar',
      desc: 'Season-by-season guidance that keeps every operation on schedule.',
      accent: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10',
      badge: 'Seasonal Timeline'
    }
  ];

  return (
    <section className="py-24 bg-[#021109] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#052b19] via-[#083b23] to-[#042013] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl mb-16 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> Comprehensive Agritech Platform
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Empower your harvest with <span className="gradient-text-agri">GrainWise AI</span>
              </h2>
              
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
                From seed to market, GrainWise AI is by your side. Detect diseases early, maximize yields with personalized NPK doses, track government schemes, and navigate market prices — all supported by <strong className="text-amber-400 font-semibold">Ananya AI</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-2">
              <button
                onClick={onOpenDownloadModal}
                className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-2xl shadow-xl shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                Tap Download & Take Guesswork Out
              </button>
              <div className="text-[11px] text-amber-300 font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Application Phase is Coming Soon · Android Pre-Register gets Free 14 days trial pack
              </div>
            </div>

          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="group relative rounded-2xl p-6 bg-[#042013]/80 border border-emerald-800/40 hover:border-emerald-500/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${f.accent} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 text-slate-300 border border-emerald-800/60">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-amber-400" /> GrainWise Verified
                  </span>
                  <span className="text-slate-400 group-hover:text-amber-400 transition-colors">Explore →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
