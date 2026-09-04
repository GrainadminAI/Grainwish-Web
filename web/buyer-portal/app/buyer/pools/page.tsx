'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AssayInspectionModal, AssayLotData } from '@/components/AssayInspectionModal';
import { 
  Layers, 
  Sparkles, 
  Lock, 
  CheckCircle, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  FileText, 
  Smartphone, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export interface VirtualPool {
  id: string;
  pool_code: string;
  fpo_name: string;
  commodity: string;
  quantity_mt: number;
  lot_count: number;
  avg_moisture: number;
  broken_pct: number;
  foreign_matter_pct: number;
  offered_price: number;
  status: 'AVAILABLE' | 'LOCKED' | 'DISPATCHED' | 'COMPLETED';
  ble_device_model?: string;
  ble_serial?: string;
  ble_rssi?: string;
  ble_battery?: string;
  gps_accuracy?: string;
  ambient_lux?: string;
  bsa_hash_stamp?: string;
  created_at?: string;
}

const initialMockPools: VirtualPool[] = [
  {
    id: 'pool-1',
    pool_code: 'POOL-MP-IND-8841',
    fpo_name: 'Narmada Valley Farmers Producer Co.',
    commodity: 'ITC Grade A Wheat (Sharbati)',
    quantity_mt: 16.0,
    lot_count: 4,
    avg_moisture: 12.1,
    broken_pct: 1.2,
    foreign_matter_pct: 0.8,
    offered_price: 2550.0,
    status: 'AVAILABLE',
    ble_device_model: 'Dickey-John MiniGAC Pro',
    ble_serial: 'DJ-GAC-9842-X',
    ble_rssi: '-64 dBm',
    ble_battery: '92%',
    gps_accuracy: '± 2.4 meters',
    ambient_lux: '14,200 Lux (Direct Sunlight)',
    bsa_hash_stamp: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'pool-2',
    pool_code: 'POOL-MP-BHO-4019',
    fpo_name: 'Bhopal Agri Producer Organization',
    commodity: 'ITC Grade A Wheat (Durum)',
    quantity_mt: 16.0,
    lot_count: 5,
    avg_moisture: 11.8,
    broken_pct: 0.9,
    foreign_matter_pct: 0.5,
    offered_price: 2580.0,
    status: 'AVAILABLE',
    ble_device_model: 'GrainSense BLE Sensor',
    ble_serial: 'GS-BLE-3310-M',
    ble_rssi: '-58 dBm',
    ble_battery: '88%',
    gps_accuracy: '± 1.8 meters',
    ambient_lux: '18,500 Lux',
    bsa_hash_stamp: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'pool-3',
    pool_code: 'POOL-PB-BTH-1092',
    fpo_name: 'Malwa Kisan Co-operative Society',
    commodity: 'ITC Grade A Wheat',
    quantity_mt: 16.0,
    lot_count: 3,
    avg_moisture: 12.4,
    broken_pct: 1.5,
    foreign_matter_pct: 0.7,
    offered_price: 2540.0,
    status: 'LOCKED',
    ble_device_model: 'Dickey-John GAC 2500',
    ble_serial: 'DJ-GAC-7712-P',
    ble_rssi: '-71 dBm',
    ble_battery: '95%',
    gps_accuracy: '± 3.1 meters',
    ambient_lux: '11,000 Lux',
    bsa_hash_stamp: '603367836747d471d31d1d6f64332c24115c496c72635079a4058c42b8e3a89e'
  }
];

export default function BuyerPoolsPage() {
  const [pools, setPools] = useState<VirtualPool[]>(initialMockPools);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPoolForAssay, setSelectedPoolForAssay] = useState<VirtualPool | null>(null);
  const [isAssayModalOpen, setIsAssayModalOpen] = useState<boolean>(false);
  
  // Aadhaar e-Sign modal state
  const [eSignModalPool, setESignModalPool] = useState<VirtualPool | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState<string>('');
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [newIncomingNotice, setNewIncomingNotice] = useState<string | null>(null);

  const fetchPools = async () => {
    try {
      setLoading(true);
      if (supabase) {
        const { data, error } = await supabase
          .from('virtual_pools')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setPools(data as VirtualPool[]);
        }
      }
    } catch (err) {
      console.warn('Realtime fetch pools notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();

    // Supabase Realtime Subscription for virtual_pools table
    const channel = supabase
      ?.channel('realtime_pools')
      ?.on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'virtual_pools' }, 
        (payload) => {
          console.log('Realtime change received from Android App:', payload);
          setNewIncomingNotice('New 16 MT pool dispatched from Android Mobile app!');
          setTimeout(() => setNewIncomingNotice(null), 6000);
          fetchPools();
        }
      )
      ?.subscribe();

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const handleSimulateNewMobilePool = async () => {
    const newPoolCode = `POOL-MP-IND-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPool: VirtualPool = {
      id: 'pool-' + Date.now(),
      pool_code: newPoolCode,
      fpo_name: 'Satpura Field Manager FPO',
      commodity: 'ITC Grade A Wheat (Sharbati)',
      quantity_mt: 16.0,
      lot_count: 4,
      avg_moisture: 12.0,
      broken_pct: 1.1,
      foreign_matter_pct: 0.6,
      offered_price: 2560.0,
      status: 'AVAILABLE',
      ble_device_model: 'Dickey-John MiniGAC Pro',
      ble_serial: `DJ-GAC-${Math.floor(1000 + Math.random() * 9000)}-X`,
      ble_rssi: '-62 dBm',
      ble_battery: '94%',
      gps_accuracy: '± 2.1 meters',
      ambient_lux: '15,400 Lux (Direct Sunlight)',
      bsa_hash_stamp: 'f1a942b088fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b99'
    };

    try {
      if (supabase) {
        await supabase.from('virtual_pools').insert([newPool]);
      }
    } catch (e) {}

    setPools((prev) => [newPool, ...prev]);
    setNewIncomingNotice(`⚡ Instant Mobile Sync: ${newPoolCode} (16 MT) pushed by Field Manager!`);
    setTimeout(() => setNewIncomingNotice(null), 5000);
  };

  const handleOpenAssayModal = (pool: VirtualPool) => {
    setSelectedPoolForAssay(pool);
    setIsAssayModalOpen(true);
  };

  const handleLockPool = (pool: VirtualPool) => {
    setESignModalPool(pool);
    setAadhaarNumber('');
  };

  const handleCompleteESign = async () => {
    if (!eSignModalPool) return;
    if (aadhaarNumber.length < 12) {
      alert('Please enter a valid 12-digit Aadhaar number for digital e-Sign authentication.');
      return;
    }

    setIsSigning(true);
    setTimeout(async () => {
      // Update local state
      setPools((prev) =>
        prev.map((p) =>
          p.id === eSignModalPool.id || p.pool_code === eSignModalPool.pool_code
            ? { ...p, status: 'LOCKED' }
            : p
        )
      );

      // Update Supabase
      try {
        if (supabase) {
          await supabase
            .from('virtual_pools')
            .update({ status: 'LOCKED' })
            .eq('pool_code', eSignModalPool.pool_code);
        }
      } catch (e) {}

      setIsSigning(false);
      setESignModalPool(null);
      alert(`Consignment ${eSignModalPool.pool_code} successfully LOCKED and digitally e-Signed under Aadhaar ID XXXXXXXX${aadhaarNumber.slice(-4)}!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Layers className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Buyer Virtual Pool Marketplace
              </h1>
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase Webhook Active</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Real-time stream of 16 MT aggregated farmer lots created by FPO field managers on Android mobile app.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchPools}
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-xl text-sm font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Pools</span>
            </button>

            <button
              onClick={handleSimulateNewMobilePool}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-950 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate Mobile Pool Build</span>
            </button>
          </div>
        </div>

        {/* Real-time Notice Banner */}
        {newIncomingNotice && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 flex items-center justify-between shadow-lg shadow-emerald-950/50 animate-bounce">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm font-semibold">{newIncomingNotice}</span>
            </div>
            <span className="text-xs font-mono bg-emerald-900/80 px-2.5 py-1 rounded border border-emerald-700">
              Live Webhook
            </span>
          </div>
        )}

        {/* Market Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400">Total Virtual Pools</span>
            <div className="text-2xl font-extrabold text-white mt-1">{pools.length} <span className="text-xs font-normal text-slate-400">Pools</span></div>
            <span className="text-xs text-emerald-400 mt-1 block">{(pools.length * 16).toFixed(0)} MT Total Volume</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400">Avg Moisture Quality</span>
            <div className="text-2xl font-extrabold text-blue-400 mt-1">
              {(pools.reduce((acc, p) => acc + p.avg_moisture, 0) / pools.length).toFixed(1)}%
            </div>
            <span className="text-xs text-slate-400 mt-1 block">Spec Limit: ≤ 12.0%</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400">Active Offered Price</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹2,550 <span className="text-xs font-normal text-slate-400">/ Qtl</span></div>
            <span className="text-xs text-emerald-400 mt-1 block">ITC Grade A Standard</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400">Locked Consignments</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">
              {pools.filter((p) => p.status === 'LOCKED').length} <span className="text-xs font-normal text-slate-400">Signed</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 block">Aadhaar e-Signed Contracts</span>
          </div>
        </div>

        {/* Pools Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Available 16 MT Pools</span>
            <span className="text-xs font-normal px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full">
              Realtime Updated
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.map((pool) => (
              <div 
                key={pool.id || pool.pool_code}
                className={`relative bg-slate-900/90 border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                  pool.status === 'LOCKED' 
                    ? 'border-amber-500/40 bg-slate-900/60' 
                    : 'border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                {/* Pool Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 bg-emerald-950/60 border border-emerald-800 rounded-lg">
                    {pool.pool_code}
                  </span>
                  
                  {pool.status === 'LOCKED' ? (
                    <span className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold">
                      <Lock className="w-3 h-3" />
                      <span>LOCKED & e-Signed</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span>AVAILABLE</span>
                    </span>
                  )}
                </div>

                {/* Pool Meta */}
                <div className="space-y-3 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{pool.fpo_name}</h3>
                    <p className="text-xs text-slate-400">{pool.commodity}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 block">Total Volume</span>
                      <span className="font-bold text-slate-200">{pool.quantity_mt} MT ({pool.lot_count} Farmer Lots)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Offered Price</span>
                      <span className="font-bold text-emerald-400">₹{pool.offered_price} / Qtl</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-slate-500 block">Moisture</span>
                      <span className="font-semibold text-blue-400">{pool.avg_moisture}%</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-slate-500 block">Foreign Matter</span>
                      <span className="font-semibold text-amber-300">{pool.foreign_matter_pct}%</span>
                    </div>
                  </div>

                  {/* Hardware Telemetry Snippet */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-2">
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      BLE: {pool.ble_serial || 'DJ-GAC-9842-X'}
                    </span>
                    <span className="font-mono text-emerald-300/80">BSA 2023 Sec. 63</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenAssayModal(pool)}
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inspect Assay</span>
                  </button>

                  {pool.status === 'LOCKED' ? (
                    <button
                      disabled
                      className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-amber-950/60 border border-amber-800/60 text-amber-400/80 rounded-xl text-xs font-semibold cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Consignment Locked</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLockPool(pool)}
                      className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-950 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lock & e-Sign</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Assay Inspection Modal */}
      <AssayInspectionModal
        isOpen={isAssayModalOpen}
        onClose={() => setIsAssayModalOpen(false)}
        lot={selectedPoolForAssay}
      />

      {/* Aadhaar e-Sign Modal */}
      {eSignModalPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-lg">Aadhaar e-Sign Lock</h3>
              </div>
              <button 
                onClick={() => setESignModalPool(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Locking 16 MT pool <strong className="text-emerald-400 font-mono">{eSignModalPool.pool_code}</strong> for procurement settlement.
              </p>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <div>FPO: <span className="text-white font-medium">{eSignModalPool.fpo_name}</span></div>
                <div>Offered Rate: <span className="text-emerald-400 font-bold">₹{eSignModalPool.offered_price} / Qtl</span></div>
                <div>Estimated Escrow: <span className="text-amber-300 font-bold">₹{(eSignModalPool.quantity_mt * 10 * eSignModalPool.offered_price).toLocaleString('en-IN')}</span></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Buyer Authorized Aadhaar ID (12 Digits)
                </label>
                <input 
                  type="text" 
                  maxLength={12}
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 9842 1092 8841"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setESignModalPool(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteESign}
                disabled={isSigning}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center space-x-2"
              >
                {isSigning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>e-Sign & Lock</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
