import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight, Landmark, FileText, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
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
  },
  {
    name: 'Zaid Season (March - June)',
    crops: 'Watermelon, Muskmelon, Cucumber, Moong, Green Fodder',
    stages: [
      { month: 'March', title: 'Summer Tillage & Early Sowing', desc: 'Sow short-duration drought-tolerant varieties. Apply basal organic manure and light furrow irrigation.' },
      { month: 'April - May', title: 'Heat Stress Defense & Vine Care', desc: 'Foliar spray of Potassium Nitrate (13:0:45) @ 10g/L. Monitor red pumpkin beetle with yellow sticky traps.' },
      { month: 'May - June', title: 'Early Morning Harvest & APMC Sales', desc: 'Harvest produce in early morning hours to maintain peak sweetness, crispness, and market freshness.' }
    ]
  }
];

const SCHEMES = [
  { title: 'PM-KISAN Samman Nidhi', benefit: '₹6,000 / year direct transfer', desc: 'Direct income support to all landholding farmer families across India.', status: 'Active Eligible', url: 'https://pmkisan.gov.in' },
  { title: 'PM Fasal Bima Yojana (PMFBY)', benefit: 'Comprehensive Crop Insurance', desc: 'Low premium crop cover against drought, unseasonal rain & pest attacks.', status: 'Enrolling Now', url: 'https://pmfby.gov.in' },
  { title: 'Soil Health Card Scheme', benefit: 'Free Soil Testing & Lab Report', desc: 'Custom NPK and micronutrient recommendations for your field soil profile.', status: 'Claim Available', url: 'https://soilhealth.dac.gov.in' },
  { title: 'PM Krishi Sinchayee Yojana', benefit: 'Up to 100% Micro-Irrigation Subsidy', desc: 'Drip and sprinkler equipment subsidy for optimal water use efficiency.', status: 'State Subsidy', url: 'https://pmksy.gov.in' }
];

export default function FarmingCalendar() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  const handleSeasonSelect = (idx) => {
    setActiveSeason(idx);
    recordFeatureUsageToDB({
      featureName: 'Farming Calendar',
      action: 'switch_season',
      metadata: { season: SEASONS[idx].name, crops: SEASONS[idx].crops }
    });
  };

  const handleCopySchedule = () => {
    const curSeason = SEASONS[activeSeason];
    const text = `📅 Grainwise AI Farming Calendar - ${curSeason.name}
Crops: ${curSeason.crops}
Timeline:
${curSeason.stages.map(stg => `• ${stg.month}: ${stg.title} - ${stg.desc}`).join('\n')}
Source: Grainwise AI Seasonal Guidance Engine`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2500);
  };

  return (
    <section id="calendar" className="py-8 sm:py-12 md:py-14 bg-[#02180d]/85 backdrop-blur-[2px] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          
          {/* Left Column: Interactive Farming Calendar */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] sm:text-xs font-bold text-emerald-300 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Precision Seasonal Guidance Engine</span>
                <span className="bg-emerald-500 text-black px-1.5 py-0.2 rounded-full font-mono text-[9px] uppercase font-extrabold">3 Seasons Covered</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Interactive <span className="gradient-text-agri">Farming Calendar 100%</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Keeps every operation on schedule with <strong>100% seasonal precision</strong> — covering Kharif, Rabi, and Zaid crop cycles.
              </p>
            </div>

            {/* Season Switcher with Copy Schedule Action */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1.5">
                {SEASONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSeasonSelect(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 ${
                      activeSeason === idx
                        ? 'bg-amber-400 text-black border-amber-400 shadow-md font-extrabold'
                        : 'bg-[#042013] text-slate-300 border-emerald-800/60 hover:border-emerald-600'
                    }`}
                  >
                    {s.name.split('(')[0]}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopySchedule}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                title="Copy seasonal timeline"
              >
                {copiedSchedule ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px] font-bold">Copied Schedule!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px]">Copy Schedule</span>
                  </>
                )}
              </button>
            </div>

            {/* Timeline Steps */}
            <div className="bg-[#042013] border border-emerald-800/50 rounded-2xl p-3.5 sm:p-5 shadow-xl space-y-2.5 sm:space-y-3">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Crops: {SEASONS[activeSeason].crops}
              </div>

              <div className="space-y-2.5">
                {SEASONS[activeSeason].stages.map((stg, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/60 hover:border-emerald-500/40 transition-colors">
                    <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-extrabold rounded-lg shrink-0 mt-0.5 border border-emerald-500/30">
                      {stg.month}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        {stg.title}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {stg.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Government Schemes Tracker */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] sm:text-xs font-semibold text-indigo-300">
                <Landmark className="w-3.5 h-3.5 text-indigo-400" /> Government Schemes &amp; Subsidies
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Subsidies <span className="gradient-text-gold">Tracker</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Direct verified portal links for financial support, crop insurance, and irrigation subsidies.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              {SCHEMES.map((scm, idx) => (
                <div key={idx} className="p-3 sm:p-3.5 rounded-xl bg-[#042013] border border-emerald-800/50 hover:border-amber-400/50 transition-colors shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> {scm.title}
                    </div>
                    <span className="text-[9.5px] font-semibold px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {scm.status}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-amber-300 mb-0.5">{scm.benefit}</div>
                  <div className="text-[10.5px] text-slate-400 leading-relaxed mb-2">{scm.desc}</div>
                  <a
                    href={scm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-300 hover:text-amber-300 transition-colors"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
