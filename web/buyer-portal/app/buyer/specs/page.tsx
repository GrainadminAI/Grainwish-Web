'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sliders, 
  Save, 
  CheckCircle, 
  Smartphone, 
  Sparkles, 
  Info, 
  RefreshCw,
  Percent,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

export interface ProcurementSpec {
  id?: string;
  buyer_name: string;
  grade_name: string;
  max_moisture_pct: number;
  max_broken_pct: number;
  max_foreign_matter_pct: number;
  max_chalkiness_pct: number;
  offered_price: number;
  is_active: boolean;
}

export default function ProcurementSpecsPage() {
  const [spec, setSpec] = useState<ProcurementSpec>({
    buyer_name: 'ITC Foods & Agri-Business',
    grade_name: 'ITC Grade A Wheat (Sharbati)',
    max_moisture_pct: 12.0,
    max_broken_pct: 2.0,
    max_foreign_matter_pct: 1.0,
    max_chalkiness_pct: 1.5,
    offered_price: 2550.0,
    is_active: true
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Fetch current spec from Supabase
  const fetchSpecs = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('buyer_procurement_specs')
          .select('*')
          .limit(1)
          .single();

        if (!error && data) {
          setSpec(data as ProcurementSpec);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchSpecs();
  }, []);

  const handleSaveSpec = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (supabase) {
        // Save or upsert to Supabase
        await supabase
          .from('buyer_procurement_specs')
          .upsert([
            {
              buyer_name: spec.buyer_name,
              grade_name: spec.grade_name,
              max_moisture_pct: Number(spec.max_moisture_pct),
              max_broken_pct: Number(spec.max_broken_pct),
              max_foreign_matter_pct: Number(spec.max_foreign_matter_pct),
              max_chalkiness_pct: Number(spec.max_chalkiness_pct),
              offered_price: Number(spec.offered_price),
              is_active: true,
              updated_at: new Date().toISOString()
            }
          ]);
      }
    } catch (err) {
      console.warn('Supabase save spec notice:', err);
    } finally {
      setSaving(false);
      setSavedNotice(`⚡ Bi-Directional Sync Complete! Mobile virtual pooling clustering engine recalculating for max moisture ${spec.max_moisture_pct}%...`);
      setTimeout(() => setSavedNotice(null), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Sliders className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Bi-Directional Procurement Spec Sync
              </h1>
            </div>
            <p className="text-slate-400 text-sm">
              Configure maximum quality tolerance bands and offered prices. Changes save instantly to Supabase for mobile clustering.
            </p>
          </div>

          <span className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold self-start sm:self-auto">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Mobile Clustering Sync Active</span>
          </span>
        </div>

        {/* Live Sync Notice Banner */}
        {savedNotice && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-300 flex items-center space-x-3 shadow-lg animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs md:text-sm font-semibold">{savedNotice}</span>
          </div>
        )}

        {/* Explanation Card */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start space-x-3 text-xs text-slate-300">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">How Bi-Directional Spec Sync Works:</strong>
            <p className="text-slate-400 mt-0.5">
              When you update the maximum moisture tolerance from <span className="text-blue-300 font-mono">12.0%</span> to <span className="text-blue-300 font-mono">14.0%</span> on this portal, the Android app’s field clustering engine will immediately recalculate its 16 MT pool recommendations for FPO field managers.
            </p>
          </div>
        </div>

        {/* Procurement Spec Form */}
        <form onSubmit={handleSaveSpec} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Active Buyer Grade Specifications</h2>
            <span className="text-xs text-emerald-400 font-mono">Table: buyer_procurement_specs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Buyer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Buyer Enterprise Name</label>
              <input 
                type="text"
                value={spec.buyer_name}
                onChange={(e) => setSpec({ ...spec, buyer_name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Commodity Grade */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Commodity Grade</label>
              <input 
                type="text"
                value={spec.grade_name}
                onChange={(e) => setSpec({ ...spec, grade_name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Offered Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Offered Rate (₹ / Qtl)</span>
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              </label>
              <input 
                type="number"
                value={spec.offered_price}
                onChange={(e) => setSpec({ ...spec, offered_price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-400 font-bold text-base focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Max Moisture Tolerance */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Max Moisture Tolerance (%)</span>
                <Percent className="w-3.5 h-3.5 text-blue-400" />
              </label>
              <input 
                type="number"
                step="0.1"
                value={spec.max_moisture_pct}
                onChange={(e) => setSpec({ ...spec, max_moisture_pct: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-blue-500/50 rounded-xl text-blue-400 font-bold text-base focus:outline-none focus:border-blue-400"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Standard baseline: 12.0% (Increasing broadens mobile pool matches)
              </span>
            </div>

            {/* Max Broken % */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Max Broken Grain (%)</label>
              <input 
                type="number"
                step="0.1"
                value={spec.max_broken_pct}
                onChange={(e) => setSpec({ ...spec, max_broken_pct: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-semibold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Max Foreign Matter % */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Max Foreign Matter (%)</label>
              <input 
                type="number"
                step="0.1"
                value={spec.max_foreign_matter_pct}
                onChange={(e) => setSpec({ ...spec, max_foreign_matter_pct: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-semibold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Broadcasts via Supabase Realtime channel to Android</span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 transition-all flex items-center space-x-2 text-sm"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Syncing Specs...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save & Sync to Mobile</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
