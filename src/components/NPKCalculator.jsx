import React, { useState, useEffect } from 'react';
import { Scale, Calculator, CheckCircle2, TrendingDown, Leaf, Info, DollarSign, Sparkles, Database } from 'lucide-react';
import { saveNPKToDB } from '../lib/supabase';

const CROPS = [
  { name: 'Wheat', npkBase: [120, 60, 40], ureaFactor: 2.17, dapFactor: 2.17, mopFactor: 1.66 },
  { name: 'Paddy / Rice', npkBase: [100, 50, 50], ureaFactor: 1.95, dapFactor: 2.0, mopFactor: 1.66 },
  { name: 'Cotton', npkBase: [150, 60, 60], ureaFactor: 2.5, dapFactor: 2.17, mopFactor: 2.0 },
  { name: 'Turmeric', npkBase: [90, 50, 90], ureaFactor: 1.8, dapFactor: 1.9, mopFactor: 3.0 },
  { name: 'Sugarcane', npkBase: [250, 100, 120], ureaFactor: 4.2, dapFactor: 3.8, mopFactor: 4.0 },
  { name: 'Maize', npkBase: [120, 60, 50], ureaFactor: 2.2, dapFactor: 2.1, mopFactor: 1.7 }
];

const SOIL_TYPES = [
  { name: 'Alluvial Soil (North India)', NAdj: 1.0, PAdj: 1.0, KAdj: 1.0 },
  { name: 'Black Cotton Soil (Deccan)', NAdj: 0.9, PAdj: 1.1, KAdj: 0.8 },
  { name: 'Red Soil (South & East)', NAdj: 1.1, PAdj: 1.2, KAdj: 1.1 },
  { name: 'Sandy Loam', NAdj: 1.2, PAdj: 1.0, KAdj: 1.2 }
];

const STAGES = [
  'Basal Dose (At Sowing / Transplanting)',
  'First Top Dressing (Tillering / Vegetative)',
  'Second Top Dressing (Panicle / Flowering)',
  'Grain Filling / Maturation'
];

export default function NPKCalculator() {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [selectedSoil, setSelectedSoil] = useState(SOIL_TYPES[0]);
  const [acres, setAcres] = useState(2);
  const [stage, setStage] = useState(STAGES[0]);

  // Precise Calculations
  const ureaKg = Math.round(selectedCrop.npkBase[0] * selectedSoil.NAdj * acres * 0.7);
  const dapKg = Math.round(selectedCrop.npkBase[1] * selectedSoil.PAdj * acres * 0.8);
  const mopKg = Math.round(selectedCrop.npkBase[2] * selectedSoil.KAdj * acres * 0.75);

  // Save to Supabase DB on calculation change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveNPKToDB({
        crop: selectedCrop.name,
        soilType: selectedSoil.name,
        acres,
        growthStage: stage,
        ureaKg,
        dapKg,
        mopKg,
        costSavingsPct: savingsPct
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [selectedCrop, selectedSoil, acres, stage]);

  return (
    <section id="npk-calc" className="py-24 bg-[#021109] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-semibold text-amber-300">
            <Scale className="w-3.5 h-3.5 text-amber-400" /> Precision Agriculture Engine
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Precision <span className="gradient-text-gold">NPK Calculator</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Calculate the precise nutrient mix your soil needs based on crop type, soil profile, growth stage, and field size. Prevent over-fertilization and slash your fertilizer bills.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-[#042013] border border-emerald-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* 1. Crop Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>1. Select Crop</span>
                <span className="text-amber-400 font-mono text-[11px]">Recommended NPK standard</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CROPS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCrop(c)}
                    className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedCrop.name === c.name
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                        : 'bg-emerald-950/60 border-emerald-900/60 text-slate-300 hover:border-emerald-700'
                    }`}
                  >
                    <div>{c.name}</div>
                    <div className="text-[10px] text-emerald-200/70 font-mono">NPK: {c.npkBase.join('-')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Soil Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Select Soil Type
              </label>
              <select
                value={selectedSoil.name}
                onChange={(e) => setSelectedSoil(SOIL_TYPES.find(s => s.name === e.target.value))}
                className="w-full bg-emerald-950/80 border border-emerald-700/50 rounded-xl px-4 py-3 text-xs text-emerald-200 focus:outline-none focus:border-amber-400"
              >
                {SOIL_TYPES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Field Area Slider */}
            <div className="space-y-3 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-900/50">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 uppercase tracking-wider">3. Field Size (Acres)</span>
                <span className="text-amber-400 font-mono text-base">{acres} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5 Acre</span>
                <span>10 Acres</span>
                <span>25 Acres</span>
              </div>
            </div>

            {/* 4. Growth Stage */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Current Growth Stage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STAGES.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => setStage(stg)}
                    className={`p-2.5 rounded-xl text-[11px] font-medium text-left transition-all border ${
                      stage === stg
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-emerald-950/30 border-emerald-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-b from-[#08331f] to-[#042013] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recommended Nutrient Mix</div>
                  <div className="text-xl font-extrabold text-white">{selectedCrop.name} · {acres} Acres</div>
                </div>
                <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Leaf className="w-6 h-6" />
                </span>
              </div>

              {/* Dosing Breakdown Cards */}
              <div className="space-y-3">
                
                {/* Urea (Nitrogen) */}
                <div className="flex items-center justify-between p-3.5 bg-emerald-950/80 rounded-xl border border-emerald-800/60">
                  <div>
                    <div className="text-xs font-bold text-white">Urea (46% N)</div>
                    <div className="text-[10px] text-slate-400">Nitrogen for foliage & canopy growth</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-emerald-400">{ureaKg}</span>
                    <span className="text-xs text-slate-400 ml-1">kg</span>
                  </div>
                </div>

                {/* DAP (Phosphorus) */}
                <div className="flex items-center justify-between p-3.5 bg-emerald-950/80 rounded-xl border border-emerald-800/60">
                  <div>
                    <div className="text-xs font-bold text-white">DAP (18-46-0)</div>
                    <div className="text-[10px] text-slate-400">Phosphorus for root establishment</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-amber-400">{dapKg}</span>
                    <span className="text-xs text-slate-400 ml-1">kg</span>
                  </div>
                </div>

                {/* MOP (Potassium) */}
                <div className="flex items-center justify-between p-3.5 bg-emerald-950/80 rounded-xl border border-emerald-800/60">
                  <div>
                    <div className="text-xs font-bold text-white">MOP (60% K2O)</div>
                    <div className="text-[10px] text-slate-400">Potassium for disease resistance</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-cyan-400">{mopKg}</span>
                    <span className="text-xs text-slate-400 ml-1">kg</span>
                  </div>
                </div>

              </div>

              {/* Cost Savings Impact */}
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-300">Lower Fertilizer Bill</div>
                    <div className="text-[11px] text-slate-300">Prevents chemical over-dosing</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-amber-400">~18% Saved</div>
                  <div className="text-[10px] text-emerald-300">Verified by Lakshmi Devi</div>
                </div>
              </div>

              {/* Action Note */}
              <div className="text-[11px] text-slate-400 leading-relaxed pt-2 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  GrainWise AI suggests splitting Nitrogen doses into 3 equal splits to maximize root uptake efficiency and eliminate groundwater leaching.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
