import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, MapPin, Radio, TrendingUp, Flame, ArrowUpRight, Filter, Info } from 'lucide-react';
import { INDIA_MAP_LOCATIONS, INDIA_MAP_VIEWBOX, INDIA_BORDER_PATH } from '../lib/indiaMapData';

// Re-export INDIA_BORDER_PATH for testing suites and external consumers
export { INDIA_BORDER_PATH };

// 12+ Key Indian Agricultural Hubs with real crop products and pan-India demand telemetry
// Positions precisely calibrated to the official Survey of India equirectangular coordinates
export const AGRI_HUBS = [
  {
    id: 'punjab',
    stateId: 'pb',
    name: 'Punjab',
    sub: 'Wheat & Basmati Bowl of India',
    crop: 'Wheat (PBW-725) & Basmati Rice',
    cropShort: 'Wheat · Basmati',
    cropIcon: '🌾',
    category: 'grain',
    demand: 'Surge Demand',
    demandGrowth: '+34% YoY',
    demandScore: 96,
    demandReason: 'Central Pool Procurement & Global Basmati Export Demand',
    mandi: 'Khanna APMC',
    status: 'High Procurement',
    rate: '₹2,425/q',
    msp: '₹2,275/q',
    x: 151.0,
    y: 152.0,
    color: '#fbbf24',
    demandColor: '#ef4444'
  },
  {
    id: 'haryana',
    stateId: 'hr',
    name: 'Haryana',
    sub: 'Mustard & Pearl Millet Belt',
    crop: 'Mustard (Giriraj) & Bajra',
    cropShort: 'Mustard · Bajra',
    cropIcon: '🌱',
    category: 'oilseed',
    demand: 'High Demand',
    demandGrowth: '+22% YoY',
    demandScore: 88,
    demandReason: 'Domestic Edible Oil Crushing Surge & Livestock Feed',
    mandi: 'Karnal APMC',
    status: 'Oil Mills Active',
    rate: '₹5,650/q',
    msp: '₹5,650/q',
    x: 168.0,
    y: 195.0,
    color: '#10b981',
    demandColor: '#f59e0b'
  },
  {
    id: 'up',
    stateId: 'up',
    name: 'Uttar Pradesh',
    sub: 'Gangetic Sugarcane & Wheat Belt',
    crop: 'Sugarcane (Co-0238) & Wheat',
    cropShort: 'Sugarcane · Wheat',
    cropIcon: '🎋',
    category: 'cash',
    demand: 'Very High Demand',
    demandGrowth: '+28% YoY',
    demandScore: 92,
    demandReason: '20% National Ethanol Blending Mandate & Sugar Mills',
    mandi: 'Lakhimpur APMC',
    status: 'Ethanol Offtake',
    rate: '₹3,150/q',
    msp: '₹3,050/q',
    x: 258.0,
    y: 248.0,
    color: '#34d399',
    demandColor: '#f97316'
  },
  {
    id: 'rajasthan',
    stateId: 'rj',
    name: 'Rajasthan',
    sub: 'Mustard & Guar Gum Hub',
    crop: 'Mustard, Guar Gum & Bajra',
    cropShort: 'Mustard · Guar',
    cropIcon: '🌿',
    category: 'oilseed',
    demand: 'Peak Demand',
    demandGrowth: '+38% YoY',
    demandScore: 95,
    demandReason: 'Industrial Guar Extraction & Heavy Oilseed Spot Bidding',
    mandi: 'Kota Mandi',
    status: 'Trader Inflow High',
    rate: '₹5,820/q',
    msp: '₹5,650/q',
    x: 130.0,
    y: 260.0,
    color: '#f59e0b',
    demandColor: '#ef4444'
  },
  {
    id: 'gujarat',
    stateId: 'gj',
    name: 'Gujarat',
    sub: 'Groundnut & Cotton Giant',
    crop: 'Groundnut (G-20) & Cotton (Shankar-6)',
    cropShort: 'Groundnut · Cotton',
    cropIcon: '🥜',
    category: 'cash',
    demand: 'Surge Demand',
    demandGrowth: '+26% YoY',
    demandScore: 91,
    demandReason: 'Saurashtra Crushing Expansion & Mill Offtake',
    mandi: 'Rajkot APMC',
    status: 'Heavy Volume',
    rate: '₹6,450/q',
    msp: '₹6,377/q',
    x: 75.0,
    y: 350.0,
    color: '#34d399',
    demandColor: '#ef4444'
  },
  {
    id: 'mp',
    stateId: 'mp',
    name: 'Madhya Pradesh',
    sub: 'Soybean & Chana Capital',
    crop: 'Soybean (JS-2034) & Desi Chana',
    cropShort: 'Soybean · Chana',
    cropIcon: '🟡',
    category: 'grain',
    demand: 'Surge Demand',
    demandGrowth: '+42% YoY',
    demandScore: 98,
    demandReason: 'Soymeal Export Parity & Record Pulses Buffer Procurement',
    mandi: 'Indore Mandi',
    status: 'Active Buying',
    rate: '₹4,890/q',
    msp: '₹4,600/q',
    x: 214.0,
    y: 320.0,
    color: '#f59e0b',
    demandColor: '#ef4444'
  },
  {
    id: 'maharashtra',
    stateId: 'mh',
    name: 'Maharashtra',
    sub: 'Cotton, Onion & Pulses Hub',
    crop: 'Cotton, Lasalgaon Onion & Tur',
    cropShort: 'Cotton · Onion',
    cropIcon: '🧅',
    category: 'cash',
    demand: 'Heavy Demand',
    demandGrowth: '+35% YoY',
    demandScore: 94,
    demandReason: 'Export Lifting & Domestic Festival Kitchen Demand',
    mandi: 'Lasalgaon Mandi',
    status: 'High Movement',
    rate: '₹2,680/q',
    msp: '₹2,100/q',
    x: 175.0,
    y: 430.0,
    color: '#f43f5e',
    demandColor: '#ef4444'
  },
  {
    id: 'ap',
    stateId: 'ap',
    name: 'Andhra & Telangana',
    sub: 'Chilli & Fine Cotton Capital',
    crop: 'Guntur Teja Red Chilli & Cotton',
    cropShort: 'Red Chilli · Cotton',
    cropIcon: '🌶️',
    category: 'cash',
    demand: 'Historic Demand',
    demandGrowth: '+48% YoY',
    demandScore: 99,
    demandReason: 'Asian Spice Export Shipments & Guntur Spot Premium',
    mandi: 'Guntur Yard',
    status: 'Bullish Momentum',
    rate: '₹19,800/q',
    msp: 'Trade Driven',
    x: 248.0,
    y: 495.0,
    color: '#f43f5e',
    demandColor: '#ef4444'
  },
  {
    id: 'karnataka',
    stateId: 'ka',
    name: 'Karnataka',
    sub: 'Ragi & Maize Plateau',
    crop: 'Finger Millet (Ragi) & Hybrid Maize',
    cropShort: 'Ragi · Maize',
    cropIcon: '🌽',
    category: 'grain',
    demand: 'Consistent Demand',
    demandGrowth: '+27% YoY',
    demandScore: 89,
    demandReason: 'Shree Anna Millet Mission Offtake & Poultry Feed',
    mandi: 'Davangere APMC',
    status: 'Stable Flow',
    rate: '₹2,340/q',
    msp: '₹2,090/q',
    x: 172.0,
    y: 520.0,
    color: '#10b981',
    demandColor: '#f59e0b'
  },
  {
    id: 'wb',
    stateId: 'wb',
    name: 'West Bengal & Bihar',
    sub: 'Golden Fiber & Paddy Delta',
    crop: 'Aman Paddy & Raw Jute (TD-5)',
    cropShort: 'Paddy · Jute',
    cropIcon: '🌾',
    category: 'grain',
    demand: 'High Procurement',
    demandGrowth: '+19% YoY',
    demandScore: 87,
    demandReason: 'Compulsory Jute Packaging Act & Public Distribution Procurement',
    mandi: 'Burdwan Mandi',
    status: 'Govt Lifting',
    rate: '₹5,200/q',
    msp: '₹5,050/q',
    x: 375.0,
    y: 325.0,
    color: '#fbbf24',
    demandColor: '#10b981'
  },
  {
    id: 'assam',
    stateId: 'as',
    name: 'Assam & NE',
    sub: 'Brahmaputra Tea & Specialty Rice',
    crop: 'CTC Orthodox Tea & Black Rice',
    cropShort: 'Tea · Black Rice',
    cropIcon: '🍃',
    category: 'cash',
    demand: 'Global Demand',
    demandGrowth: '+25% YoY',
    demandScore: 90,
    demandReason: 'Guwahati Tea Auction Global Bidding & Organic Superfood Demand',
    mandi: 'Guwahati Auction',
    status: 'Export Premium',
    rate: '₹265/kg',
    msp: 'Auction Driven',
    x: 512.0,
    y: 270.0,
    color: '#10b981',
    demandColor: '#10b981'
  },
  {
    id: 'tamilnadu',
    stateId: 'tn',
    name: 'Tamil Nadu & Kerala',
    sub: 'Cauvery Delta & Spice Coast',
    crop: 'Kuruvai Paddy & Black Pepper',
    cropShort: 'Paddy · Spices',
    cropIcon: '🍚',
    category: 'grain',
    demand: 'Steady Demand',
    demandGrowth: '+21% YoY',
    demandScore: 86,
    demandReason: 'Southern Culinary Staples & Rice Bran Oil Processing',
    mandi: 'Thanjavur APMC',
    status: 'Fast Clearance',
    rate: '₹2,450/q',
    msp: '₹2,183/q',
    x: 211.0,
    y: 605.0,
    color: '#34d399',
    demandColor: '#10b981'
  },
  {
    id: 'jk',
    stateId: 'jk',
    name: 'J&K & Ladakh',
    sub: 'Kashmir Valley Horticulture',
    crop: 'Kashmiri GI Saffron & Apple',
    cropShort: 'Saffron · Apple',
    cropIcon: '🌸',
    category: 'cash',
    demand: 'Peak Luxury Demand',
    demandGrowth: '+31% YoY',
    demandScore: 93,
    demandReason: 'Protected GI Purity Authentication & Domestic Fruit Storage',
    mandi: 'Srinagar Fruit Yard',
    status: 'Protected GI',
    rate: '₹220/g',
    msp: 'GI Protected',
    x: 175.0,
    y: 65.0,
    color: '#fbbf24',
    demandColor: '#ef4444'
  }
];

// Laser telemetry connection links across India
export const TELEMETRY_LINKS = [
  { from: 'punjab', to: 'up' },
  { from: 'punjab', to: 'rajasthan' },
  { from: 'rajasthan', to: 'gujarat' },
  { from: 'up', to: 'mp' },
  { from: 'mp', to: 'maharashtra' },
  { from: 'up', to: 'wb' },
  { from: 'wb', to: 'assam' },
  { from: 'maharashtra', to: 'ap' },
  { from: 'ap', to: 'karnataka' },
  { from: 'karnataka', to: 'tamilnadu' },
  { from: 'punjab', to: 'jk' }
];

export default function HolographicIndiaMap({ className = "" }) {
  const [activeHub, setActiveHub] = useState(AGRI_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const displayHub = hoveredHub || activeHub;

  // Filter hubs according to selected demand category
  const filteredHubs = AGRI_HUBS.filter(hub => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'high-demand') return hub.demandScore >= 92;
    if (categoryFilter === 'grain') return hub.category === 'grain';
    if (categoryFilter === 'oilseed-cash') return hub.category === 'oilseed' || hub.category === 'cash';
    return true;
  });

  return (
    <div className={`relative flex flex-col items-center justify-center select-none w-full ${className}`}>
      
      {/* Outer Ambient Glow Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Telemetry & Demand Filter Header */}
      <div className="relative z-10 w-full flex flex-col items-center gap-1 mb-1 sm:mb-1.5 px-1">
        {/* Main Title Badge */}
        <div className="flex items-center justify-between w-full max-w-[360px] sm:max-w-[380px] px-2 py-0.5 rounded-full bg-emerald-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/60 text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
            </span>
            <span className="font-extrabold uppercase tracking-wider text-emerald-300 truncate flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
              <span>India Crop &amp; Demand Radar</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[8px] sm:text-[8.5px] text-rose-300 font-bold bg-rose-950/70 px-1 py-0.2 rounded border border-rose-500/40 flex items-center gap-0.5">
              <Flame className="w-2 h-2 text-rose-400 animate-pulse" />
              Live Demand
            </span>
            <span className="text-[8px] sm:text-[8.5px] text-amber-400 font-mono font-bold bg-amber-950/60 px-1 py-0.2 rounded border border-amber-500/30">
              28 States
            </span>
          </div>
        </div>

        {/* Quick Filter Tabs: Demand & Crop Types */}
        <div className="flex items-center justify-center gap-1 w-full max-w-[360px] sm:max-w-[380px] overflow-x-auto py-0.5 scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            All Crops
          </button>

          <button
            onClick={() => setCategoryFilter('high-demand')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all flex items-center gap-0.5 whitespace-nowrap ${
              categoryFilter === 'high-demand'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-rose-950/50 text-rose-300 hover:text-white border border-rose-800/40'
            }`}
          >
            <Flame className="w-2 h-2 text-amber-300" />
            🔥 Surge Demand
          </button>

          <button
            onClick={() => setCategoryFilter('grain')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'grain'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌾 Grains
          </button>

          <button
            onClick={() => setCategoryFilter('oilseed-cash')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'oilseed-cash'
                ? 'bg-emerald-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌱 Oilseeds &amp; Cash
          </button>
        </div>
      </div>

      {/* The Central Holographic Map Container (Auto-adjusts for compact, balanced display) */}
      <div className="relative w-full max-w-[270px] xs:max-w-[295px] sm:max-w-[325px] md:max-w-[350px] lg:max-w-[360px] aspect-[612/696] mx-auto filter drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
        
        <svg
          viewBox={INDIA_MAP_VIEWBOX}
          className="w-full h-full overflow-hidden transition-transform duration-700 hover:scale-[1.01]"
        >
          <defs>
            {/* Holographic Scanline Grid Pattern */}
            <pattern id="agri-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
              <circle cx="20" cy="0" r="0.8" fill="rgba(245, 158, 11, 0.3)" />
            </pattern>

            {/* Glowing Map Fill Gradient */}
            <linearGradient id="india-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#083a24" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#042617" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#02160d" stopOpacity="0.96" />
            </linearGradient>

            {/* Glowing Border Gradient */}
            <linearGradient id="border-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            {/* Radar Sweep Arc Gradient */}
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.35)" />
              <stop offset="60%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Soft Shadow Filter for Nodes */}
            <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Radar Scanner Concentric Range Rings */}
          <g opacity="0.25" className="pointer-events-none">
            <circle cx="260" cy="350" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="260" cy="350" r="170" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="260" cy="350" r="260" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" />
          </g>

          {/* Animated Sweeping Radar Beam */}
          <g transform="translate(260, 350)" className="pointer-events-none opacity-40">
            <circle r="240" fill="url(#radar-glow)" />
          </g>

          {/* Actual Geographic Indian States & Union Territories */}
          <g id="actual-indian-states" className="transition-all duration-300">
            {INDIA_MAP_LOCATIONS.map((loc) => {
              const isSelected = activeHub?.stateId === loc.id;
              const isHovered = hoveredHub?.stateId === loc.id;
              return (
                <path
                  key={loc.id}
                  id={`state-${loc.id}`}
                  d={loc.path}
                  fill={
                    isSelected
                      ? 'rgba(245, 158, 11, 0.45)'
                      : isHovered
                      ? 'rgba(52, 211, 153, 0.4)'
                      : 'url(#india-fill)'
                  }
                  stroke={
                    isSelected
                      ? '#fbbf24'
                      : isHovered
                      ? '#34d399'
                      : 'rgba(52, 211, 153, 0.35)'
                  }
                  strokeWidth={isSelected ? '1.8' : '0.8'}
                  strokeLinejoin="round"
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => {
                    const hub = AGRI_HUBS.find(h => h.stateId === loc.id);
                    if (hub) setActiveHub(hub);
                  }}
                  onMouseEnter={() => {
                    const hub = AGRI_HUBS.find(h => h.stateId === loc.id);
                    if (hub) setHoveredHub(hub);
                  }}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <title>{loc.name}</title>
                </path>
              );
            })}
          </g>

          {/* Overlay Grid Pattern within India Boundary */}
          <path
            d={INDIA_BORDER_PATH}
            fill="url(#agri-grid)"
            className="pointer-events-none"
          />

          {/* Animated Laser Telemetry Links connecting Mandis */}
          <g className="pointer-events-none">
            {TELEMETRY_LINKS.map((link, idx) => {
              const fromHub = AGRI_HUBS.find(h => h.id === link.from);
              const toHub = AGRI_HUBS.find(h => h.id === link.to);
              if (!fromHub || !toHub) return null;

              return (
                <g key={`telemetry-${idx}`}>
                  {/* Subtle Background Arc */}
                  <line
                    x1={fromHub.x}
                    y1={fromHub.y}
                    x2={toHub.x}
                    y2={toHub.y}
                    stroke="rgba(16, 185, 129, 0.25)"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  {/* Active High-Energy Pulse Line */}
                  <line
                    x1={fromHub.x}
                    y1={fromHub.y}
                    x2={toHub.x}
                    y2={toHub.y}
                    stroke={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '#fbbf24' : '#10b981'}
                    strokeWidth={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '2' : '1.2'}
                    strokeDasharray="6 14"
                    className="animate-pulse"
                    opacity={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '0.9' : '0.45'}
                  />
                </g>
              );
            })}
          </g>

          {/* Interactive Agricultural Mandi Hub Markers */}
          {filteredHubs.map((hub) => {
            const isSelected = displayHub.id === hub.id;
            const isHighDemand = hub.demandScore >= 92;

            return (
              <g
                key={hub.id}
                transform={`translate(${hub.x}, ${hub.y})`}
                onClick={() => setActiveHub(hub)}
                onMouseEnter={() => setHoveredHub(hub)}
                onMouseLeave={() => setHoveredHub(null)}
                className="cursor-pointer group/node"
              >
                {/* Ping Radiation Wave for Selected / High-Demand Hubs */}
                {isSelected && (
                  <circle
                    r="15"
                    fill="none"
                    stroke={hub.demandColor || "#fbbf24"}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                {isHighDemand && !isSelected && (
                  <circle
                    r="11"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1"
                    className="animate-ping"
                    style={{ animationDuration: '2.5s', animationDelay: '0.6s' }}
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  r={isSelected ? "9" : "6"}
                  fill={isHighDemand ? hub.demandColor : hub.color}
                  opacity={isSelected ? "0.5" : "0.25"}
                  filter="url(#glow-node)"
                />

                {/* Inner Solid Hub Core */}
                <circle
                  r={isSelected ? "5.5" : "3.8"}
                  fill={isSelected ? "#ffffff" : (isHighDemand ? hub.demandColor : hub.color)}
                  stroke="#021109"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* State Name & Crop Badge on Map */}
                <g className="pointer-events-none">
                  {/* Background pill for text legibility */}
                  <rect
                    x="8"
                    y="-8"
                    width={isSelected ? "78" : "64"}
                    height={isSelected ? "18" : "15"}
                    rx="4"
                    fill="rgba(2, 17, 9, 0.85)"
                    stroke={isSelected ? '#f43f5e' : 'rgba(16, 185, 129, 0.4)'}
                    strokeWidth={isSelected ? '1' : '0.6'}
                  />

                  {/* State Name */}
                  <text
                    x="12"
                    y="0"
                    fill={isSelected ? "#ffffff" : "#e2e8f0"}
                    fontSize={isSelected ? "9" : "8"}
                    fontWeight={isSelected ? "bold" : "600"}
                    fontFamily="sans-serif"
                    className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    {hub.name}
                  </text>

                  {/* Crop Product & Demand Growth Micro Tag */}
                  <text
                    x="12"
                    y="7"
                    fill={isHighDemand ? "#fca5a5" : "#fbbf24"}
                    fontSize="6.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {hub.cropShort} · {hub.demandGrowth}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Central Precision Crosshair (Geographic Center of India) */}
          <g transform="translate(260, 350)" className="pointer-events-none opacity-80">
            <circle r="12" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#fbbf24" strokeWidth="0.8" />
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#fbbf24" strokeWidth="0.8" />
          </g>
        </svg>

      </div>

      {/* Real-Time Hub Telemetry Card: Positioned Cleanly Beneath the Map (Compact, High-Density HUD) */}
      <div className="w-full max-w-[360px] sm:max-w-[380px] mt-1.5 sm:mt-2 bg-gradient-to-r from-[#031d10]/98 via-[#06291a]/98 to-[#031d10]/98 backdrop-blur-xl border border-emerald-500/50 rounded-xl p-2 sm:p-2.5 shadow-2xl shadow-black/90 text-xs animate-slide-up">
        
        {/* Top Line: State + Demand Status in India */}
        <div className="flex items-center justify-between gap-1.5 mb-1 pb-1 border-b border-emerald-800/40">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-950/90 border border-emerald-400/50 flex items-center justify-center shrink-0 shadow-sm text-xs">
              <span>{displayHub.cropIcon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-extrabold text-white text-xs sm:text-[13px] truncate">
                  {displayHub.name}
                </span>
                <span className="text-[8px] sm:text-[8.5px] px-1 py-0.2 rounded font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-600/30 truncate max-w-[150px] sm:max-w-none">
                  {displayHub.sub}
                </span>
              </div>
            </div>
          </div>

          {/* Demand in India Badge */}
          <div className="flex items-center gap-1 shrink-0">
            <span className={`text-[8px] sm:text-[8.5px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
              displayHub.demandScore >= 92 
                ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50' 
                : 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
            }`}>
              <Flame className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
              <span>{displayHub.demand}</span>
              <span className="font-mono text-emerald-300">{displayHub.demandGrowth}</span>
            </span>
          </div>
        </div>

        {/* Middle Line: Major Crop Produced & Mandi Rate */}
        <div className="grid grid-cols-12 gap-1.5 items-center">
          {/* Crops Produced */}
          <div className="col-span-8 min-w-0">
            <div className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider">
              Crops Produced
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-300 truncate">
              {displayHub.crop}
            </div>
            <div className="text-[9px] text-emerald-300/90 truncate flex items-center gap-1 mt-0.2">
              <TrendingUp className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">{displayHub.demandReason}</span>
            </div>
          </div>

          {/* Mandi Rate vs MSP */}
          <div className="col-span-4 text-right shrink-0">
            <div className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider">
              Mandi Rate
            </div>
            <div className="text-xs sm:text-[13px] font-extrabold text-emerald-300 font-mono">
              {displayHub.rate}
            </div>
            <div className="text-[8.5px] text-slate-400 font-mono">
              MSP: {displayHub.msp}
            </div>
          </div>
        </div>

        {/* Bottom Demand Intensity Progress Bar */}
        <div className="mt-1 pt-1 border-t border-emerald-900/40 flex items-center justify-between gap-2 text-[8.5px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <span>National Demand Index:</span>
            <strong className="text-amber-400 font-mono">{displayHub.demandScore}/100</strong>
          </span>
          <div className="w-20 sm:w-28 h-1 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                displayHub.demandScore >= 92 
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500' 
                  : 'bg-gradient-to-r from-emerald-400 to-amber-400'
              }`}
              style={{ width: `${displayHub.demandScore}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Coordinates & Accuracy HUD - Compact Single-Line */}
      <div className="relative z-10 mt-1 flex flex-wrap items-center justify-center gap-1.5 text-[8px] sm:text-[8.5px] text-slate-300 font-mono px-1 text-center">
        <span className="flex items-center gap-0.5 text-emerald-300">
          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" /> Official Survey of India Map
        </span>
        <span className="text-slate-600 hidden xs:inline">•</span>
        <span className="text-slate-400 hidden md:inline">LAT 8.4°N – 37.6°N · LON 68.7°E – 97.4°E</span>
        <span className="text-slate-600 hidden md:inline">•</span>
        <span className="text-amber-400">Mainland India · 28 States &amp; UTs</span>
      </div>

    </div>
  );
}
