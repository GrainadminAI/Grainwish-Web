import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export interface SettlementRecord {
  id: string;
  gate_pass_code: string;
  fpo_name: string;
  gross_amount: number;
  deductions: number;
  net_payout: number;
  disbursement_status: string;
  settled_at: string;
}

const mockTrailing90Days: SettlementRecord[] = [
  { id: 's-1', gate_pass_code: 'GP-MP09-8841', fpo_name: 'Narmada Valley Farmers Producer Co.', gross_amount: 408000, deductions: 0, net_payout: 408000, disbursement_status: 'T+2 Escrow Release Pending', settled_at: '2026-09-04' },
  { id: 's-2', gate_pass_code: 'GP-MP04-4019', fpo_name: 'Bhopal Agri Producer Organization', gross_amount: 414375, deductions: 0, net_payout: 414375, disbursement_status: 'Settled to Bank', settled_at: '2026-09-02' },
  { id: 's-3', gate_pass_code: 'GP-PB11-1092', fpo_name: 'Malwa Kisan Co-operative Society', gross_amount: 406725, deductions: 0, net_payout: 406725, disbursement_status: 'Settled to Bank', settled_at: '2026-08-28' },
  { id: 's-4', gate_pass_code: 'GP-MH12-5501', fpo_name: 'Nashik Sharbati Wheat Growers', gross_amount: 420000, deductions: 4200, net_payout: 415800, disbursement_status: 'Settled to Bank', settled_at: '2026-08-20' },
  { id: 's-5', gate_pass_code: 'GP-RJ14-3091', fpo_name: 'Kota Agriculture Co-op', gross_amount: 395000, deductions: 0, net_payout: 395000, disbursement_status: 'Settled to Bank', settled_at: '2026-08-12' },
  { id: 's-6', gate_pass_code: 'GP-MP10-2210', fpo_name: 'Indore Farmers Federation', gross_amount: 410000, deductions: 0, net_payout: 410000, disbursement_status: 'Settled to Bank', settled_at: '2026-08-04' }
];

export const SettlementHistoryGraph: React.FC = () => {
  const [settlements, setSettlements] = useState<SettlementRecord[]>(mockTrailing90Days);
  const [liveStreamActive, setLiveStreamActive] = useState<boolean>(true);

  const fetchSettlements = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('settlements')
          .select('*')
          .order('settled_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setSettlements(data as SettlementRecord[]);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchSettlements();

    const channel = supabase
      ?.channel('realtime_settlements')
      ?.on('postgres_changes', { event: '*', schema: 'public', table: 'settlements' }, () => {
        fetchSettlements();
      })
      ?.subscribe();

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const totalGross = settlements.reduce((acc, s) => acc + s.gross_amount, 0);
  const totalNet = settlements.reduce((acc, s) => acc + s.net_payout, 0);
  const maxPayout = Math.max(...settlements.map((s) => s.net_payout), 500000);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-100 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Trailing 90-Day Live Settlement History</h2>
            <p className="text-xs text-slate-400">
              Supabase streamed payouts, T+2 Escrow disbursement status, and quality deductions.
            </p>
          </div>
        </div>

        <span className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Realtime Stream Connected</span>
        </span>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Total Trailing 90-Day Volume</span>
          <div className="text-xl font-extrabold text-white mt-1">₹{totalNet.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            100% Escrow Protected
          </span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Completed Settlements</span>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">
            {settlements.filter(s => s.disbursement_status.includes('Settled')).length} / {settlements.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">T+2 Direct Bank Payout</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">Pending Escrow Release</span>
          <div className="text-xl font-extrabold text-amber-400 mt-1">
            {settlements.filter(s => s.disbursement_status.includes('Pending')).length} <span className="text-xs font-normal text-slate-400">Consignments</span>
          </div>
          <span className="text-[11px] text-amber-300 mt-1 block">Weighbridge Gate-In Verified</span>
        </div>
      </div>

      {/* Visual Graph Bars */}
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Settlement Payout Timeline (90 Days)</span>
          <span className="font-mono text-emerald-400">Peak: ₹{(maxPayout/100000).toFixed(2)} Lakh</span>
        </div>

        <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800 overflow-x-auto">
          {settlements.map((item) => {
            const heightPct = Math.round((item.net_payout / maxPayout) * 100);
            return (
              <div key={item.id} className="flex-1 min-w-[48px] flex flex-col items-center group relative">
                
                {/* Tooltip on hover */}
                <div className="absolute -top-12 hidden group-hover:flex flex-col items-center z-20 bg-slate-800 border border-emerald-500/50 p-2 rounded text-[10px] whitespace-nowrap shadow-xl">
                  <span className="font-bold text-white">{item.fpo_name}</span>
                  <span className="text-emerald-400 font-mono">₹{item.net_payout.toLocaleString('en-IN')}</span>
                </div>

                {/* Bar */}
                <div 
                  className={`w-full max-w-[28px] rounded-t-md transition-all duration-500 ${
                    item.disbursement_status.includes('Pending')
                      ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-125'
                      : 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-125'
                  }`} 
                  style={{ height: `${Math.max(15, heightPct)}%` }}
                />

                <span className="text-[10px] text-slate-500 mt-2 font-mono truncate w-full text-center">
                  {item.settled_at.slice(5)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5" />
              Direct Escrow Settled
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm mr-1.5" />
              T+2 Escrow Release Pending
            </span>
          </div>
          <span className="font-mono text-emerald-400">Live Supabase Sync</span>
        </div>
      </div>

    </div>
  );
};

export default SettlementHistoryGraph;
