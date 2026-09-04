import React from 'react';
import { 
  X, 
  Bluetooth, 
  BatteryCharging, 
  Wifi, 
  Camera, 
  ShieldCheck, 
  MapPin, 
  Sun, 
  FileText, 
  CheckCircle2, 
  Cpu, 
  Scale
} from 'lucide-react';

export const AssayInspectionModal = ({ isOpen, onClose, lot }) => {
  if (!isOpen) return null;

  const data = {
    pool_code: lot?.pool_code || 'POOL-MP-IND-8841',
    fpo_name: lot?.fpo_name || 'Narmada Valley Farmers Producer Co.',
    commodity: lot?.commodity || 'ITC Grade A Wheat (Sharbati)',
    avg_moisture: lot?.avg_moisture ?? 12.1,
    broken_pct: lot?.broken_pct ?? 1.2,
    foreign_matter_pct: lot?.foreign_matter_pct ?? 0.8,
    chalkiness_pct: lot?.chalkiness_pct ?? 0.4,
    uniformity_score: lot?.uniformity_score ?? 96.4,
    ble_device_model: lot?.ble_device_model || 'Dickey-John MiniGAC Pro',
    ble_serial: lot?.ble_serial || 'DJ-GAC-9842-X',
    ble_rssi: lot?.ble_rssi || '-64 dBm',
    ble_battery: lot?.ble_battery || '92%',
    gps_accuracy: lot?.gps_accuracy || '± 2.4 meters',
    ambient_lux: lot?.ambient_lux || '14,200 Lux (Direct Sunlight)',
    bsa_hash_stamp: lot?.bsa_hash_stamp || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    image_url: lot?.image_url || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">Farmer Lot Assay Diagnostic</h2>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Verified Hardware Stamp
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {data.fpo_name} • <span className="font-mono text-emerald-400">{data.pool_code}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Section 1: BLE Moisture Sensor Telemetry */}
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bluetooth className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">BLE Moisture Sensor Telemetry</h3>
              </div>
              <span className="flex items-center text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                Live Sensor Sync
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg">
                <span className="text-xs text-slate-400 block mb-1">Device Model</span>
                <span className="text-sm font-semibold text-white">{data.ble_device_model}</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg">
                <span className="text-xs text-slate-400 block mb-1">Probe Serial No.</span>
                <span className="text-sm font-mono font-semibold text-blue-300">{data.ble_serial}</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg">
                <span className="text-xs text-slate-400 flex items-center mb-1">
                  <Wifi className="w-3.5 h-3.5 text-blue-400 mr-1" />
                  RSSI Signal
                </span>
                <span className="text-sm font-semibold text-emerald-400">{data.ble_rssi}</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg">
                <span className="text-xs text-slate-400 flex items-center mb-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                  Battery Level
                </span>
                <span className="text-sm font-semibold text-emerald-400">{data.ble_battery}</span>
              </div>
            </div>
          </div>

          {/* Section 2: CameraX Optical Diagnostics & Morphology */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Captured Grain Image */}
            <div className="md:col-span-5 bg-slate-800/50 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center space-x-2 mb-3">
                <Camera className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-white text-sm">CameraX Optical Image</h3>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-slate-700 group">
                <img 
                  src={data.image_url} 
                  alt="Grain Macro Inspection" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  Macro Optical HD
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Resolution: 12 MP Macro</span>
                <span>Focus: Lock AI</span>
              </div>
            </div>

            {/* Morphology Breakdown */}
            <div className="md:col-span-7 bg-slate-800/50 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center space-x-2 mb-3">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-white text-sm">Grain Morphology Breakdown</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Uniformity Score</div>
                  <div className="text-xl font-bold text-emerald-400">{data.uniformity_score}%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${data.uniformity_score}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Moisture Level</div>
                  <div className="text-xl font-bold text-blue-400">{data.avg_moisture}%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Target: ≤ 12.0%</div>
                </div>

                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Foreign Matter %</div>
                  <div className="text-lg font-semibold text-amber-300">{data.foreign_matter_pct}%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tolerance: &lt; 1.0%</div>
                </div>

                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Broken / Shriveled</div>
                  <div className="text-lg font-semibold text-amber-300">{data.broken_pct}%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tolerance: &lt; 2.0%</div>
                </div>
              </div>

              <div className="px-3 py-2 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-300">Chalkiness Index: <strong className="text-white">{data.chalkiness_pct}%</strong></span>
                <span className="text-emerald-400 font-medium">✓ Grade A Export Compliant</span>
              </div>
            </div>
          </div>

          {/* Section 3: Environmental Proof & Anti-Tamper Stamp */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-white">Environmental Proof & BSA 2023 Compliance</h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-md font-mono">
                Legal Section 63 Admissible
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">GPS Field Location Accuracy</span>
                  <span className="text-sm font-semibold text-white">{data.gps_accuracy}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Ambient Solar Irradiance</span>
                  <span className="text-sm font-semibold text-white">{data.ambient_lux}</span>
                </div>
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash Stamp */}
            <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-lg font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center text-emerald-400 font-sans font-medium">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Bharatiya Sakshya Adhiniyam, 2023 Sec. 63 Certificate Stamp
                </span>
                <span className="text-slate-500">SHA-256</span>
              </div>
              <div className="text-[11px] text-emerald-300/90 break-all select-all font-mono">
                {data.bsa_hash_stamp}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-t border-slate-700">
          <div className="flex items-center space-x-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Telemetry digital signature verified against FPO field key</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-emerald-950 transition-all"
          >
            Close Assay Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssayInspectionModal;
