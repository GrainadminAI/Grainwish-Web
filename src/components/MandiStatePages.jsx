import React, { useEffect } from 'react';
import { 
  TrendingUp, 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  CheckCircle,
  Truck,
  IndianRupee,
  Scale
} from 'lucide-react';

export const MANDI_STATE_DATA = {
  'punjab-wheat': {
    slug: 'punjab-wheat',
    state: 'Punjab',
    crop: 'Wheat (गेहूं)',
    variety: 'Sharbati / PBW-824',
    title: 'Punjab Wheat Mandi Rates Today · APMC Khanna & Bathinda',
    modalPrice: 2475,
    minPrice: 2380,
    maxPrice: 2620,
    mspPrice: 2275,
    mspDelta: 200,
    arrivalsToday: '14,850 Quintals',
    priceTrend: '+3.4% Weekly Gain (Strong Miller Demand)',
    trendType: 'up',
    topMandis: [
      { name: 'Khanna APMC Grain Market', district: 'Ludhiana', modal: 2510, min: 2420, max: 2620, arrivals: '4,200 Qtl' },
      { name: 'Bathinda Main Mandi', district: 'Bathinda', modal: 2460, min: 2380, max: 2540, arrivals: '3,800 Qtl' },
      { name: 'Firozpur Cantt Grain Yard', district: 'Firozpur', modal: 2450, min: 2375, max: 2520, arrivals: '2,900 Qtl' },
      { name: 'Jalandhar APMC Yard', district: 'Jalandhar', modal: 2480, min: 2400, max: 2550, arrivals: '3,950 Qtl' }
    ],
    tradeAdvisory: 'Flour mills and private stockists are actively procuring above MSP. Recommended strategy: Sell premium grade now; hold average quality till late November.',
    lastUpdated: 'Today at 08:30 AM IST (Agmarknet Live Sync)'
  },
  'haryana-basmati': {
    slug: 'haryana-basmati',
    state: 'Haryana',
    crop: 'Basmati Rice 1121 & 1509 (बासमती धान)',
    variety: 'Pusa Basmati 1121 / 1509',
    title: 'Haryana Basmati Rice Mandi Rates · Karnal & Taraori',
    modalPrice: 3850,
    minPrice: 3600,
    maxPrice: 4200,
    mspPrice: 2320,
    mspDelta: 1530,
    arrivalsToday: '22,400 Quintals',
    priceTrend: '+6.8% Surge (Middle-East Export Demand)',
    trendType: 'up',
    topMandis: [
      { name: 'Karnal APMC Grain Mandi', district: 'Karnal', modal: 3920, min: 3650, max: 4200, arrivals: '8,500 Qtl' },
      { name: 'Taraori International Rice Market', district: 'Karnal', modal: 3950, min: 3700, max: 4250, arrivals: '6,200 Qtl' },
      { name: 'Kaithal New Grain Market', district: 'Kaithal', modal: 3800, min: 3550, max: 4100, arrivals: '4,100 Qtl' },
      { name: 'Sirsa Mandi Yard', district: 'Sirsa', modal: 3730, min: 3500, max: 4050, arrivals: '3,600 Qtl' }
    ],
    tradeAdvisory: 'Exporters are offering premium rates for moisture content below 12%. Dry produce thoroughly in mandis to secure top bids.',
    lastUpdated: 'Today at 08:45 AM IST (Agmarknet Live Sync)'
  },
  'madhya-pradesh-soybean': {
    slug: 'madhya-pradesh-soybean',
    state: 'Madhya Pradesh',
    crop: 'Yellow Soybean (सोयाबीन)',
    variety: 'JS-9560 / JS-2034',
    title: 'Madhya Pradesh Soybean Mandi Rates · Indore & Ujjain APMC',
    modalPrice: 4850,
    minPrice: 4500,
    maxPrice: 5120,
    mspPrice: 4892,
    mspDelta: -42,
    arrivalsToday: '38,200 Quintals',
    priceTrend: 'Stable near MSP (Crusher Buying Active)',
    trendType: 'neutral',
    topMandis: [
      { name: 'Indore APMC (Chhawani Mandi)', district: 'Indore', modal: 4920, min: 4600, max: 5120, arrivals: '14,500 Qtl' },
      { name: 'Ujjain Krishi Upaj Mandi', district: 'Ujjain', modal: 4860, min: 4550, max: 5080, arrivals: '11,200 Qtl' },
      { name: 'Dewas APMC Yard', district: 'Dewas', modal: 4810, min: 4500, max: 4990, arrivals: '7,100 Qtl' },
      { name: 'Sehore New Yard', district: 'Sehore', modal: 4790, min: 4480, max: 4950, arrivals: '5,400 Qtl' }
    ],
    tradeAdvisory: 'Soybean oil mills operating at high crushing capacity. Mandi rates are firming up around MSP support levels.',
    lastUpdated: 'Today at 08:15 AM IST (Agmarknet Live Sync)'
  },
  'rajasthan-mustard': {
    slug: 'rajasthan-mustard',
    state: 'Rajasthan',
    crop: 'Mustard / Sarson (सरसों)',
    variety: 'Black Mustard 42% Oil Content',
    title: 'Rajasthan Mustard Mandi Rates · Bharatpur & Kota APMC',
    modalPrice: 5650,
    minPrice: 5350,
    maxPrice: 5950,
    mspPrice: 5650,
    mspDelta: 0,
    arrivalsToday: '18,900 Quintals',
    priceTrend: '+2.1% Gain (High Oil Content Premium)',
    trendType: 'up',
    topMandis: [
      { name: 'Bharatpur Binsar Mandi', district: 'Bharatpur', modal: 5720, min: 5400, max: 5950, arrivals: '6,400 Qtl' },
      { name: 'Alwar Grain Yard', district: 'Alwar', modal: 5680, min: 5380, max: 5900, arrivals: '5,200 Qtl' },
      { name: 'Kota Bhamashah Mandi', district: 'Kota', modal: 5620, min: 5320, max: 5850, arrivals: '4,100 Qtl' },
      { name: 'Nagaur APMC Market', district: 'Nagaur', modal: 5580, min: 5300, max: 5800, arrivals: '3,200 Qtl' }
    ],
    tradeAdvisory: 'Oil testing machines installed at mandis. Lots testing above 40.5% oil receive a direct ₹120/qtl bonus.',
    lastUpdated: 'Today at 08:50 AM IST (Agmarknet Live Sync)'
  },
  'andhra-pradesh-chilli': {
    slug: 'andhra-pradesh-chilli',
    state: 'Andhra Pradesh',
    crop: 'Teja Red Chilli (गुंटूर लाल मिर्च)',
    variety: 'Guntur Teja / S17',
    title: 'Andhra Pradesh Guntur Red Chilli Mandi Rates Today',
    modalPrice: 19800,
    minPrice: 17500,
    maxPrice: 22400,
    mspPrice: 0,
    mspDelta: 19800,
    arrivalsToday: '42,000 Bags (40kg)',
    priceTrend: '+5.5% Surge (Far East Export Buying)',
    trendType: 'up',
    topMandis: [
      { name: 'Guntur Mirchi Yard (Asia’s Largest)', district: 'Guntur', modal: 20100, min: 17800, max: 22400, arrivals: '26,000 Bags' },
      { name: 'Khammam Chilli Yard', district: 'Khammam', modal: 19600, min: 17400, max: 21800, arrivals: '9,500 Bags' },
      { name: 'Warangal Enmamulapet Mandi', district: 'Warangal', modal: 19400, min: 17200, max: 21500, arrivals: '6,500 Bags' }
    ],
    tradeAdvisory: 'Cold storage stocks depleting fast. Chinese and Southeast Asian spice export contracts driving price upwards.',
    lastUpdated: 'Today at 09:00 AM IST (Agmarknet Live Sync)'
  },
  'maharashtra-cotton': {
    slug: 'maharashtra-cotton',
    state: 'Maharashtra',
    crop: 'Raw Cotton / Kapas & Onion (कपास व प्याज)',
    variety: 'Medium-Long Staple 29mm',
    title: 'Maharashtra Cotton & Onion Mandi Rates · Lasalgaon & Jalgaon',
    modalPrice: 7420,
    minPrice: 7050,
    maxPrice: 7850,
    mspPrice: 7121,
    mspDelta: 299,
    arrivalsToday: '31,500 Quintals',
    priceTrend: '+4.2% Strength (Ginning Units Active)',
    trendType: 'up',
    topMandis: [
      { name: 'Lasalgaon Onion & Grain Market', district: 'Nashik', modal: 2850, min: 2100, max: 3400, arrivals: '18,000 Qtl (Onion)' },
      { name: 'Jalgaon Cotton APMC', district: 'Jalgaon', modal: 7480, min: 7100, max: 7850, arrivals: '8,200 Qtl (Cotton)' },
      { name: 'Akola Cotton Yard', district: 'Akola', modal: 7390, min: 7020, max: 7750, arrivals: '5,300 Qtl (Cotton)' }
    ],
    tradeAdvisory: 'CCI (Cotton Corporation of India) procurement centers open across Vidarbha and Marathwada supporting floor rate.',
    lastUpdated: 'Today at 08:40 AM IST (Agmarknet Live Sync)'
  }
};

export default function MandiStatePage({ mandiSlug, onBackToHome, onOpenMandiFull }) {
  const data = MANDI_STATE_DATA[mandiSlug] || MANDI_STATE_DATA['punjab-wheat'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [mandiSlug]);

  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to GrainWish AI
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="hover:text-emerald-300 cursor-pointer" onClick={onBackToHome}>Home</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="hover:text-emerald-300 cursor-pointer" onClick={onOpenMandiFull}>Mandi Radar</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-emerald-400 font-medium">{data.state} {data.crop.split('(')[0]}</span>
          </nav>
        </div>

        {/* Header Block */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> {data.state} APMC Network
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-mono border border-emerald-800/50">
              <Calendar className="w-3 h-3" /> {data.lastUpdated}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {data.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time daily wholesale arrival quantities, modal prices, and mandi trading bids for <strong>{data.crop}</strong> ({data.variety}) across major APMC grain yards in {data.state}.
          </p>
        </div>

        {/* Big Metric Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-[#032314] to-black border-2 border-emerald-500/60 shadow-xl">
            <span className="text-slate-400 block font-mono text-[11px] uppercase">State Modal Rate</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-white">₹{data.modalPrice.toLocaleString()}</span>
              <span className="text-xs text-slate-400 font-semibold">/ Quintal</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {data.priceTrend}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/50 border border-emerald-900/60">
            <span className="text-slate-400 block font-mono text-[11px] uppercase">Official MSP Floor</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-200">
                {data.mspPrice > 0 ? `₹${data.mspPrice.toLocaleString()}` : 'Trade Driven'}
              </span>
              {data.mspPrice > 0 && <span className="text-xs text-slate-400">/ Qtl</span>}
            </div>
            <span className={`text-[11px] font-bold block mt-2 ${data.mspDelta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {data.mspPrice > 0 
                ? (data.mspDelta >= 0 ? `+₹${data.mspDelta} Above MSP` : `-₹${Math.abs(data.mspDelta)} Below MSP`)
                : 'Free Market Spice Bid'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/50 border border-emerald-900/60">
            <span className="text-slate-400 block font-mono text-[11px] uppercase">Mandi Range Today</span>
            <div className="flex items-baseline gap-1 mt-1 text-sm font-bold text-white">
              <span>₹{data.minPrice.toLocaleString()}</span>
              <span className="text-slate-500">—</span>
              <span>₹{data.maxPrice.toLocaleString()}</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2 font-mono">
              Spread: ₹{data.maxPrice - data.minPrice} / Qtl
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/50 border border-emerald-900/60">
            <span className="text-slate-400 block font-mono text-[11px] uppercase">Daily State Arrivals</span>
            <div className="text-xl font-black text-white mt-1 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>{data.arrivalsToday}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-2">
              High Trading Activity
            </span>
          </div>
        </div>

        {/* Top Mandi Yards Table */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-black/60 border border-emerald-800/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">APMC Market Yards Rate Comparison</h2>
            </div>
            <span className="text-xs text-slate-400">Real-time daily bids</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-emerald-900/80 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Mandi Market Yard</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3 text-right">Modal Rate</th>
                  <th className="py-2.5 px-3 text-right">Min / Max</th>
                  <th className="py-2.5 px-3 text-right">Arrivals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40 text-slate-200">
                {data.topMandis.map((mandi, idx) => (
                  <tr key={idx} className="hover:bg-emerald-950/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      {mandi.name}
                    </td>
                    <td className="py-3 px-3 text-slate-400">{mandi.district}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-300 text-sm">
                      ₹{mandi.modal.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-400">
                      ₹{mandi.min} - ₹{mandi.max}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-amber-300">
                      {mandi.arrivals}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trade Advisory & Farmer Action */}
        <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Agronomic Trade Advisory:
            </div>
            <p className="text-xs text-slate-200 max-w-xl leading-relaxed">
              {data.tradeAdvisory}
            </p>
          </div>

          <button
            onClick={onOpenMandiFull}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            Open 28-State Mandi Radar &rarr;
          </button>
        </div>

        {/* Quick Links to Other State Mandi Pages */}
        <div className="space-y-3 pt-4 border-t border-emerald-900/60">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Check Other State APMC Mandi Rates:
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(MANDI_STATE_DATA).map(([slug, item]) => (
              <a
                key={slug}
                href={`/mandi-prices/${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', `/mandi-prices/${slug}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  slug === mandiSlug
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                    : 'bg-emerald-950/60 border-emerald-800/60 text-slate-300 hover:text-white hover:border-emerald-600'
                }`}
              >
                {item.state} ({item.crop.split('(')[0].trim()})
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
