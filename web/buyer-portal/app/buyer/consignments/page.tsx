'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  Truck, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  FileText, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Download, 
  X,
  Search,
  Filter
} from 'lucide-react';

export interface Consignment {
  id: string;
  gate_pass_code: string;
  truck_number: string;
  driver_name: string;
  driver_phone: string;
  origin_fpo: string;
  destination_mill: string;
  commodity: string;
  origin_weight_kg: number;
  origin_moisture_pct: number;
  transit_status: 'In Transit' | 'Approaching Weighbridge' | 'Gate-In Completed';
  signed_contract_url?: string;
  dispatched_at: string;
}

const initialConsignments: Consignment[] = [
  {
    id: 'cons-1',
    gate_pass_code: 'GP-MP09-8841',
    truck_number: 'MP-09-HH-4821',
    driver_name: 'Rajesh Kumar Gurjar',
    driver_phone: '+919826012345',
    origin_fpo: 'Narmada Valley Farmers Producer Co.',
    destination_mill: 'ITC Mill #4, Dewas, MP',
    commodity: 'ITC Grade A Wheat (Sharbati)',
    origin_weight_kg: 16000,
    origin_moisture_pct: 12.1,
    transit_status: 'In Transit',
    signed_contract_url: '/docs/contract_MP-09-HH-4821.pdf',
    dispatched_at: '2026-09-04 08:30 AM'
  },
  {
    id: 'cons-2',
    gate_pass_code: 'GP-MP04-4019',
    truck_number: 'MP-04-CG-9082',
    driver_name: 'Vikram Singh Malviya',
    driver_phone: '+919425098765',
    origin_fpo: 'Bhopal Agri Producer Organization',
    destination_mill: 'ITC Mill #4, Dewas, MP',
    commodity: 'ITC Grade A Wheat (Durum)',
    origin_weight_kg: 16250,
    origin_moisture_pct: 11.8,
    transit_status: 'Approaching Weighbridge',
    signed_contract_url: '/docs/contract_MP-04-CG-9082.pdf',
    dispatched_at: '2026-09-04 07:15 AM'
  },
  {
    id: 'cons-3',
    gate_pass_code: 'GP-PB11-1092',
    truck_number: 'PB-11-BV-3310',
    driver_name: 'Gurpreet Singh Dhillon',
    driver_phone: '+919814054321',
    origin_fpo: 'Malwa Kisan Co-operative Society',
    destination_mill: 'ITC Mill #2, Khanna, PB',
    commodity: 'ITC Grade A Wheat',
    origin_weight_kg: 15950,
    origin_moisture_pct: 12.4,
    transit_status: 'Gate-In Completed',
    signed_contract_url: '/docs/contract_PB-11-BV-3310.pdf',
    dispatched_at: '2026-09-03 04:45 PM'
  }
];

export default function ActiveConsignmentsPage() {
  const [consignments, setConsignments] = useState<Consignment[]>(initialConsignments);
  const [selectedContract, setSelectedContract] = useState<Consignment | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchConsignments = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('consignments')
          .select('*')
          .order('dispatched_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setConsignments(data as Consignment[]);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchConsignments();
  }, []);

  const filteredConsignments = consignments.filter((c) => 
    c.truck_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gate_pass_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.driver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.origin_fpo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                <Truck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Active In-Transit Consignments Cockpit
              </h1>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full text-xs font-semibold">
                Live Gate-Pass Monitoring
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Track mobile-dispatched grain trucks en route from FPO collection yards to physical mill weighbridges.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search truck (e.g. MP-09-HH-4821)..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Trucks In Transit</span>
              <div className="text-2xl font-extrabold text-blue-400 mt-1">
                {consignments.filter(c => c.transit_status === 'In Transit').length}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">En Route to Mill</span>
            </div>
            <Truck className="w-8 h-8 text-blue-500/40" />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Approaching Weighbridge</span>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">
                {consignments.filter(c => c.transit_status === 'Approaching Weighbridge').length}
              </div>
              <span className="text-xs text-amber-400 mt-1 block">Ready for Gate-In Intake</span>
            </div>
            <Clock className="w-8 h-8 text-amber-500/40" />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Gate-In Completed Today</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                {consignments.filter(c => c.transit_status === 'Gate-In Completed').length}
              </div>
              <span className="text-xs text-emerald-400 mt-1 block">Weighbridge Verified</span>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
          </div>
        </div>

        {/* Consignment List Table / Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Dispatched Truck Fleets</h2>

          <div className="grid grid-cols-1 gap-4">
            {filteredConsignments.map((cons) => (
              <div 
                key={cons.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  
                  {/* License Plate & Driver Info */}
                  <div className="flex items-start space-x-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-2 border-amber-400/80 rounded-xl text-center shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">IND</span>
                      <span className="font-mono text-base font-extrabold text-white tracking-wide">{cons.truck_number}</span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white text-base">{cons.driver_name}</h3>
                        <span className="font-mono text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                          {cons.gate_pass_code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Origin: <span className="text-slate-200">{cons.origin_fpo}</span> • Dispatched: {cons.dispatched_at}
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact Buttons & Status Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    
                    {/* Status Badge */}
                    {cons.transit_status === 'In Transit' && (
                      <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold">
                        <Truck className="w-3.5 h-3.5 animate-pulse" />
                        <span>In Transit</span>
                      </span>
                    )}

                    {cons.transit_status === 'Approaching Weighbridge' && (
                      <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Approaching Weighbridge</span>
                      </span>
                    )}

                    {cons.transit_status === 'Gate-In Completed' && (
                      <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Gate-In Completed</span>
                      </span>
                    )}

                    {/* Driver WhatsApp Button */}
                    <a
                      href={`https://wa.me/${cons.driver_phone.replace(/\+/g, '')}?text=Hello%20${encodeURIComponent(cons.driver_name)},%20regarding%20truck%20${encodeURIComponent(cons.truck_number)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-400 rounded-xl text-xs font-semibold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Driver Call Button */}
                    <a
                      href={`tel:${cons.driver_phone}`}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span>Call Driver</span>
                    </a>
                  </div>

                </div>

                {/* Cargo Details & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Origin Gate-Pass Weight</span>
                      <span className="font-bold text-white text-sm">{(cons.origin_weight_kg / 1000).toFixed(2)} MT ({cons.origin_weight_kg.toLocaleString()} kg)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Origin Moisture Assay</span>
                      <span className="font-semibold text-blue-400 text-sm">{cons.origin_moisture_pct}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Destination Mill</span>
                      <span className="font-medium text-slate-300 text-sm">{cons.destination_mill}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedContract(cons)}
                      className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>e-Sign Contract</span>
                    </button>

                    <Link
                      href={`/buyer/consignments/${cons.id || cons.gate_pass_code}/gate-in`}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
                    >
                      <span>Proceed to Gate-In Settlement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Contract Download / Preview Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-lg">Aadhaar e-Signed Agreement Preview</h3>
              </div>
              <button 
                onClick={() => setSelectedContract(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-slate-300">
              <div className="text-emerald-400 font-sans font-bold text-sm mb-2">
                Digital Procurement Contract #{selectedContract.gate_pass_code}
              </div>
              <div>Truck Plate: <span className="text-white">{selectedContract.truck_number}</span></div>
              <div>Driver: <span className="text-white">{selectedContract.driver_name} ({selectedContract.driver_phone})</span></div>
              <div>Seller FPO: <span className="text-white">{selectedContract.origin_fpo}</span></div>
              <div>Agreed Volume: <span className="text-white">{(selectedContract.origin_weight_kg / 1000).toFixed(2)} MT</span></div>
              <div>Assay Moisture: <span className="text-blue-400">{selectedContract.origin_moisture_pct}%</span></div>
              <div>Aadhaar Authentication Stamp: <span className="text-emerald-300">VERIFIED (BSA 2023 Sec 63)</span></div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
                Digitally locked prior to dispatch from collection yard.
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setSelectedContract(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Close Preview
              </button>
              <a
                href={selectedContract.signed_contract_url || '#'}
                download={`Contract_${selectedContract.truck_number}.pdf`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading Aadhaar e-Signed Procurement Contract PDF for truck ${selectedContract.truck_number}...`);
                }}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-950 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
