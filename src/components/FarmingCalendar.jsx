import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight, Landmark, FileText, Sparkles } from 'lucide-react';
import { recordFeatureUsageToDB } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

const SEASONS = [
  {
    name: 'Kharif Season (June - October)',
    crops: 'Paddy, Cotton, Sugarcane, Turmeric, Soybean',
    stages: [
      { month: 'June - July', title: 'Nursery Bed & Sowing', desc: 'Soil testing & seed treatment with Trichoderma. Apply basal DAP dose.' },
      { month: 'August', title: 'Vegetative & Weed Management', desc: 'First Urea top dressing + Micronutrient zinc spray. Run AI leaf diagnostics.' },
      { month: 'September', title: 'Pest Scouting & Flowering', desc: 'Monitor pink bollworm & leaf folder. Check Mandi rate forecast.' },
      { month: 'October', title: 'Harvesting & MSP Procurement', desc: 'Moisture check before threshing. Direct sales at nearest MSP Mandi center.' }
    ]
  },
  {
    name: 'Rabi Season (November - March)',
    crops: 'Wheat, Mustard, Chickpea, Barley',
    stages: [
      { month: 'Nov - Dec', title: 'Land Prep & Seed Treatment', desc: 'Apply Precision NPK calculator recommendations. Sow yellow-rust resistant seeds.' },
      { month: 'Jan - Feb', title: 'Crown Root Irrigation & Yellow Rust Defense', desc: 'Run camera diagnostics on first yellow streak observation. Spray Propiconazole.' },
      { month: 'March', title: 'Combine Harvesting & Storage', desc: 'Store grains under 12% moisture to prevent storage weevils.' }
    ]
  }
];

const SCHEMES = [
  { title: 'PM-KISAN Samman Nidhi', benefit: '₹6,000 / year direct transfer', desc: 'Financial support to all landholding farmer families across India.', status: 'Active Eligible' },
  { title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', benefit: 'Comprehensive Crop Insurance', desc: 'Low premium crop cover against drought, flood & pest infestation.', status: 'Enrolling Now' },
  { title: 'Soil Health Card Scheme', benefit: 'Free Soil Testing & Lab Report', desc: 'Custom NPK and micronutrient recommendations for your field.', status: 'Claim Available' },
  { title: 'PM Krishi Sinchayee Yojana (Drip Irrigation)', benefit: 'Up to 100% Subsidy', desc: 'Micro-irrigation equipment subsidy for water efficiency.', status: 'State Subsidy' }
];

export default function FarmingCalendar() {
  const [activeSeason, setActiveSeason] = useState(0);

  const handleSeasonSelect = (idx) => {
    setActiveSeason(idx);
    recordFeatureUsageToDB({
      featureName: 'Farming Calendar',
      action: 'switch_season',
      metadata: { season: SEASONS[idx].name, crops: SEASONS[idx].crops }
    });
  };

  return (
    <section id="calendar" className="py-24 bg-[#02180d] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Farming Calendar */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-xs font-bold text-emerald-300 shadow-lg">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>100% Precision Seasonal Guidance Engine</span>
                <span className="bg-emerald-500 text-black px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-extrabold">100% ACCURATE</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white">
                Interactive <span className="gradient-text-agri">Farming Calendar 100%</span>
              </h2>
              <p className="text-slate-300 text-sm">
                Keeps every operation on schedule with <strong>100% seasonal precision</strong> — from seed treatment to split fertilization and harvest timing.
              </p>
            </div>

            {/* Season Switcher */}
            <div className="flex gap-2">
              {SEASONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSeasonSelect(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeSeason === idx
                      ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                      : 'bg-[#042013] text-slate-300 border-emerald-800/60 hover:border-emerald-600'
                  }`}
                >
                  {s.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Timeline Steps */}
            <div className="bg-[#042013] border border-emerald-800/50 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Crops: {SEASONS[activeSeason].crops}
              </div>

              <div className="space-y-4">
                {SEASONS[activeSeason].stages.map((stg, i) => (
                  <div key={i} className="flex items-start gap-4 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-900/60 hover:border-emerald-500/40 transition-colors">
                    <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-extrabold rounded-lg shrink-0 mt-0.5 border border-emerald-500/30">
                      {stg.month}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        {stg.title}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {stg.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Government Schemes Tracker */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-xs font-semibold text-indigo-300">
                <Landmark className="w-3.5 h-3.5 text-indigo-400" /> Government Schemes & Subsidies
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white">
                Subsidies <span className="gradient-text-gold">Tracker</span>
              </h2>
              <p className="text-slate-300 text-sm">
                Track the latest subsidies, insurance, and financial support programs relevant to your state.
              </p>
            </div>

            <div className="space-y-3">
              {SCHEMES.map((scm, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 hover:border-amber-400/50 transition-colors shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-400" /> {scm.title}
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {scm.status}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-amber-300 mb-1">{scm.benefit}</div>
                  <div className="text-[11px] text-slate-400">{scm.desc}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
