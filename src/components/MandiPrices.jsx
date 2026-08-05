import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, CloudSun, ArrowUpRight, Search, ShieldCheck, Navigation, Bell, Database } from 'lucide-react';
import { fetchMandiPricesFromDB, recordFeatureUsageToDB, isSupabaseConfigured } from '../lib/supabase';

const MANDI_DATA = [
  { commodity: 'Wheat (Sharbati)', state: 'Maharashtra', district: 'Nashik', market: 'Nashik Main Mandi', price: '₹2,840 / qtl', msp: '₹2,275 / qtl', diff: '+₹565', status: 'Up (+4.2%)', distance: '12 km' },
  { commodity: 'Cotton (Long Staple)', state: 'Punjab', district: 'Bathinda', market: 'Bathinda Grain Market', price: '₹7,450 / qtl', msp: '₹5,550 / qtl', diff: '+₹1,900', status: 'Up (+6.8%)', distance: '8 km' },
  { commodity: 'Paddy (Basmati 1509)', state: 'Telangana', district: 'Warangal', market: 'Warangal Agriculture Market', price: '₹3,920 / qtl', msp: '₹2,183 / qtl', diff: '+₹1,737', status: 'Up (+3.1%)', distance: '15 km' },
  { commodity: 'Turmeric (Finger)', state: 'Tamil Nadu', district: 'Erode', market: 'Erode Turmeric Market', price: '₹14,200 / qtl', msp: '₹10,500 / qtl', diff: '+₹3,700', status: 'Up (+8.4%)', distance: '6 km' },
  { commodity: 'Mustard (Yellow)', state: 'Rajasthan', district: 'Bharatpur', market: 'Bharatpur Krishi Mandi', price: '₹5,680 / qtl', msp: '₹5,450 / qtl', diff: '+₹230', status: 'Stable', distance: '22 km' },
  { commodity: 'Soybean (Black)', state: 'Madhya Pradesh', district: 'Indore', market: 'Indore Central Mandi', price: '₹4,890 / qtl', msp: '₹4,600 / qtl', diff: '+₹290', status: 'Up (+1.5%)', distance: '10 km' }
];

export default function MandiPrices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [mandiList, setMandiList] = useState(MANDI_DATA);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    async function loadDbPrices() {
      const data = await fetchMandiPricesFromDB();
      if (data && data.length > 0) {
        setMandiList(data);
        setDbConnected(true);
      }
    }
    loadDbPrices();
  }, []);

  // Record Mandi search/filter interactions to Supabase
  useEffect(() => {
    if (searchTerm.trim() || selectedState !== 'All') {
      const timer = setTimeout(() => {
        recordFeatureUsageToDB({
          featureName: 'Mandi Prices Radar',
          action: 'filter_mandi',
          metadata: { searchTerm, selectedState }
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedState]);

  const filteredMandi = mandiList.filter((item) => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.market.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <section id="mandi" className="py-24 bg-[#021109] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
            <TrendingUp className="w-3.5 h-3.5" /> Market Radar & Weather Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Live <span className="gradient-text-agri">Mandi Prices</span> & Weather Alerts
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Never miss a profitable market opportunity or government MSP procurement window. Get hyper-local price updates and weather warnings sent directly to your phone.
          </p>
        </div>

        {/* Hyper-Local Weather Alert Ticker */}
        <div className="bg-gradient-to-r from-[#032415] via-[#08331f] to-[#032415] border border-emerald-500/30 rounded-2xl p-4 mb-10 shadow-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
              <CloudSun className="w-6 h-6" />
            </span>
            <div>
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" /> Live Weather Radar: Nashik & Warangal
              </div>
              <div className="text-xs text-slate-300">
                Light rainfall (10-14mm) expected tomorrow morning. Protect harvested wheat & paddy grains under tarpaulin.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
              Humidity: 68% · Wind: 12 km/h
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#042013] p-4 rounded-2xl border border-emerald-800/50">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commodity or Mandi market..."
              className="w-full bg-emerald-950/80 border border-emerald-700/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">State Filter:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-auto bg-emerald-950/80 border border-emerald-700/50 rounded-xl px-4 py-2.5 text-xs text-emerald-300 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Telangana">Telangana</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
            </select>
          </div>

        </div>

        {/* Live Mandi Data Table */}
        <div className="bg-[#042013] border border-emerald-800/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              <thead className="bg-[#03190f] text-slate-400 font-bold uppercase tracking-wider border-b border-emerald-900/60">
                <tr>
                  <th className="py-4 px-6">Commodity & District</th>
                  <th className="py-4 px-6">Market Name</th>
                  <th className="py-4 px-6">Today's Mandi Rate</th>
                  <th className="py-4 px-6">Govt MSP Rate</th>
                  <th className="py-4 px-6">Gain Above MSP</th>
                  <th className="py-4 px-6">Nearest Center</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-emerald-900/40 font-medium">
                {filteredMandi.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-900/20 transition-colors">
                    
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">{item.commodity}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" /> {item.district}, {item.state}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-300">
                      {item.market}
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-extrabold text-amber-400 text-sm">{item.price}</div>
                      <div className="text-[10px] text-emerald-400">{item.status}</div>
                    </td>

                    <td className="py-4 px-6 text-slate-300 font-mono">
                      {item.msp}
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/40 inline-flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" /> {item.diff}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <button className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 rounded-lg text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors">
                        <Navigation className="w-3 h-3 text-amber-400" /> {item.distance}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
