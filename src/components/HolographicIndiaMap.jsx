import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, MapPin, Radio, TrendingUp, Flame, ArrowUpRight, Filter, Info } from 'lucide-react';

// Geographically accurate projected boundary for India (Equirectangular projection)
export const INDIA_BORDER_PATH = "M 161.9,45.5 L 179.2,49.7 L 196.6,62.3 L 214.0,77.0 L 231.4,87.5 L 238.4,102.2 L 234.9,119.0 L 226.2,133.7 L 231.4,150.5 L 234.9,167.3 L 255.8,182.0 L 269.7,190.4 L 261.0,196.7 L 274.9,217.7 L 290.6,230.3 L 313.2,245.0 L 339.3,251.3 L 365.4,259.7 L 391.5,263.9 L 393.2,257.6 L 395.0,245.0 L 401.9,240.8 L 405.4,245.0 L 407.1,257.6 L 422.8,263.9 L 452.4,266.0 L 461.1,255.5 L 469.8,245.0 L 492.4,236.6 L 509.8,224.0 L 530.7,215.6 L 551.6,230.3 L 555.1,240.8 L 539.4,257.6 L 516.8,278.6 L 504.6,299.6 L 495.9,320.6 L 485.5,341.6 L 478.5,362.6 L 475.0,368.9 L 468.1,358.4 L 464.6,341.6 L 457.6,329.0 L 452.4,320.6 L 447.2,324.8 L 447.2,335.3 L 443.7,301.7 L 422.8,299.6 L 422.8,287.0 L 421.1,278.6 L 400.2,293.3 L 395.0,308.0 L 400.2,324.8 L 405.4,345.8 L 410.7,362.6 L 405.4,375.2 L 391.5,375.2 L 374.1,383.6 L 367.1,398.3 L 353.2,413.0 L 339.3,425.6 L 325.4,440.3 L 309.7,457.1 L 292.3,471.8 L 273.2,488.6 L 261.0,497.0 L 254.0,518.0 L 255.8,545.3 L 257.5,553.7 L 248.8,576.8 L 248.8,597.8 L 241.8,612.5 L 238.4,633.5 L 220.9,644.0 L 208.7,658.7 L 198.3,650.3 L 187.8,629.3 L 184.3,612.5 L 179.1,591.5 L 165.2,564.2 L 161.7,553.7 L 154.7,528.5 L 144.3,507.5 L 142.5,494.9 L 135.6,480.2 L 128.6,448.7 L 126.9,427.7 L 125.1,406.7 L 123.4,385.7 L 104.2,389.9 L 91.9,392.0 L 74.5,375.2 L 60.5,360.5 L 69.2,354.2 L 83.2,347.9 L 74.5,343.7 L 57.0,337.4 L 46.5,329.0 L 53.5,318.5 L 86.5,318.5 L 98.8,318.5 L 95.3,308.0 L 86.5,287.0 L 77.8,266.0 L 91.9,249.2 L 109.3,234.5 L 133.7,207.2 L 151.1,186.2 L 158.0,171.5 L 156.3,154.7 L 151.1,140.0 L 144.1,123.2 L 144.1,102.2 L 147.6,81.2 L 161.9,45.5 Z";

// 12+ Key Indian Agricultural Hubs with real crop products and pan-India demand telemetry
export const AGRI_HUBS = [
  {
    id: 'punjab',
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
    x: 177.0,
    y: 168.7,
    color: '#fbbf24',
    demandColor: '#ef4444'
  },
  {
    id: 'haryana',
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
    x: 195.0,
    y: 198.0,
    color: '#10b981',
    demandColor: '#f59e0b'
  },
  {
    id: 'up',
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
    x: 267.2,
    y: 249.7,
    color: '#34d399',
    demandColor: '#f97316'
  },
  {
    id: 'rajasthan',
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
    x: 141.5,
    y: 256.1,
    color: '#f59e0b',
    demandColor: '#ef4444'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    sub: 'Groundnut & Cotton Giant',
    crop: 'Groundnut (G-20) & Cotton (Shankar-6)',
    cropShort: 'Groundnut · Cotton',
    cropIcon: '🥜',
    category: 'cash',
    demand: 'Surge Demand',
    demandGrowth: '+26% YoY',
    demandScore: 91,
    demandReason: 'Consumer Peanut Oil Preference & Textile Mill Offtake',
    mandi: 'Rajkot APMC',
    status: 'Export Grade Buying',
    rate: '₹6,800/q',
    msp: '₹6,377/q',
    x: 100.8,
    y: 343.6,
    color: '#10b981',
    demandColor: '#f97316'
  },
  {
    id: 'mp',
    name: 'Madhya Pradesh',
    sub: 'Soybean & Pulses Heart of India',
    crop: 'Soybean (JS-2034) & Chana (Gram)',
    cropShort: 'Soybean · Chana',
    cropIcon: '🌱',
    category: 'oilseed',
    demand: 'Peak Demand',
    demandGrowth: '+42% YoY',
    demandScore: 98,
    demandReason: 'High-Protein De-oiled Cake Deficit & National Pulses Stocking',
    mandi: 'Indore Mandi',
    status: 'Heavy Spot Bidding',
    rate: '₹4,890/q',
    msp: '₹4,600/q',
    x: 205.3,
    y: 335.1,
    color: '#10b981',
    demandColor: '#ef4444'
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    sub: 'Cotton, Soybean & Onion Hub',
    crop: 'Cotton, Soybean & Nashik Red Onion',
    cropShort: 'Cotton · Onion',
    cropIcon: '🧅',
    category: 'cash',
    demand: 'Critical Demand',
    demandGrowth: '+35% YoY',
    demandScore: 94,
    demandReason: 'Metro Consumer Retail Deficit & South Asian Export Clearance',
    mandi: 'Nagpur APMC',
    status: 'High Procurement',
    rate: '₹7,120/q',
    msp: '₹6,620/q',
    x: 177.0,
    y: 409.7,
    color: '#34d399',
    demandColor: '#ef4444'
  },
  {
    id: 'wb',
    name: 'West Bengal & Bihar',
    sub: 'Kharif Rice & Jute Basin',
    crop: 'Paddy (Swarna), Jute & Maize',
    cropShort: 'Paddy · Jute',
    cropIcon: '🌾',
    category: 'grain',
    demand: 'High Demand',
    demandGrowth: '+19% YoY',
    demandScore: 84,
    demandReason: 'PDS National Foodgrain Allocation & Starch Processing Units',
    mandi: 'Burdwan Mandi',
    status: 'Steady Offtake',
    rate: '₹2,300/q',
    msp: '₹2,183/q',
    x: 384.1,
    y: 307.3,
    color: '#fbbf24',
    demandColor: '#f59e0b'
  },
  {
    id: 'assam',
    name: 'Assam & NE',
    sub: 'Brahmaputra Valley Organic Hub',
    crop: 'Assam Green Tea & Black Rice',
    cropShort: 'Tea · Black Rice',
    cropIcon: '🍃',
    category: 'cash',
    demand: 'Premium Demand',
    demandGrowth: '+25% YoY',
    demandScore: 89,
    demandReason: 'National Specialty Wellness Demand & Export Auctions',
    mandi: 'Guwahati Auction',
    status: 'Premium Grade Active',
    rate: '₹280/kg',
    msp: 'Auction Rate',
    x: 479.7,
    y: 271.1,
    color: '#10b981',
    demandColor: '#10b981'
  },
  {
    id: 'ap',
    name: 'Andhra & Telangana',
    sub: 'Guntur Chilli & Cotton Belt',
    crop: 'Guntur Red Chilli & Cotton',
    cropShort: 'Red Chilli · Cotton',
    cropIcon: '🌶️',
    category: 'cash',
    demand: 'Skyrocketing Demand',
    demandGrowth: '+48% YoY',
    demandScore: 99,
    demandReason: 'Global Oleoresin Extraction Boom & Pan-India Spice Spike',
    mandi: 'Guntur Yard',
    status: 'Mega Inflow Demand',
    rate: '₹18,500/q',
    msp: 'Market Rate',
    x: 242.5,
    y: 478.0,
    color: '#f97316',
    demandColor: '#ef4444'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    sub: 'Millets, Maize & Coffee Zone',
    crop: 'Ragi (Finger Millet) & Maize',
    cropShort: 'Ragi · Maize',
    cropIcon: '🌾',
    category: 'grain',
    demand: 'High Demand',
    demandGrowth: '+27% YoY',
    demandScore: 90,
    demandReason: 'National Millet Year Adoption & Poultry Feed Requirements',
    mandi: 'Shimoga Mandi',
    status: 'FMCG Buying Active',
    rate: '₹3,200/q',
    msp: '₹2,500/q',
    x: 180.5,
    y: 520.7,
    color: '#fbbf24',
    demandColor: '#f59e0b'
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu & Kerala',
    sub: 'Kaveri Delta & Spices Hub',
    crop: 'Paddy (ADT-45) & Spices',
    cropShort: 'Paddy · Spices',
    cropIcon: '🥥',
    category: 'grain',
    demand: 'Strong Demand',
    demandGrowth: '+21% YoY',
    demandScore: 86,
    demandReason: 'Southern Culinary Staples & Rice Bran Oil Processing',
    mandi: 'Thanjavur APMC',
    status: 'Fast Clearance',
    rate: '₹2,450/q',
    msp: '₹2,183/q',
    x: 219.4,
    y: 599.6,
    color: '#34d399',
    demandColor: '#10b981'
  },
  {
    id: 'jk',
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
    x: 189.3,
    y: 102.5,
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
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'high-demand', 'grain', 'oilseed-cash'

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
      <div className="relative z-10 w-full flex flex-col items-center gap-1.5 mb-2 px-1">
        {/* Main Title Badge */}
        <div className="flex items-center justify-between w-full max-w-[420px] px-2.5 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/60 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="font-extrabold uppercase tracking-wider text-emerald-300 truncate flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
              <span>India Crop &amp; Demand Radar</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] sm:text-[10px] text-rose-300 font-bold bg-rose-950/70 px-1.5 py-0.5 rounded border border-rose-500/40 flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
              Live Demand
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
              28 States
            </span>
          </div>
        </div>

        {/* Quick Filter Tabs: Demand & Crop Types */}
        <div className="flex items-center justify-center gap-1 w-full max-w-[420px] overflow-x-auto py-0.5 scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            All Crops
          </button>

          <button
            onClick={() => setCategoryFilter('high-demand')}
            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
              categoryFilter === 'high-demand'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-rose-950/50 text-rose-300 hover:text-white border border-rose-800/40'
            }`}
          >
            <Flame className="w-2.5 h-2.5 text-amber-300" />
            🔥 Surge Demand
          </button>

          <button
            onClick={() => setCategoryFilter('grain')}
            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'grain'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌾 Grains
          </button>

          <button
            onClick={() => setCategoryFilter('oilseed-cash')}
            className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'oilseed-cash'
                ? 'bg-emerald-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌱 Oilseeds &amp; Cash
          </button>
        </div>
      </div>

      {/* The Central Holographic Map Container (Auto-adjusts for mobile screens 4.5" to 7.5") */}
      <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[390px] md:max-w-[420px] lg:max-w-[450px] aspect-[600/700] mx-auto filter drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
        
        <svg
          viewBox="0 0 600 700"
          className="w-full h-full overflow-visible transition-transform duration-700 hover:scale-[1.01]"
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
          <g opacity="0.32" className="pointer-events-none">
            <circle cx="250" cy="360" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="250" cy="360" r="160" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="250" cy="360" r="240" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="250" y1="120" x2="250" y2="600" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="50" y1="360" x2="450" y2="360" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          {/* Animated Sweeping Radar Beam */}
          <g transform="translate(250, 360)" className="pointer-events-none opacity-40">
            <circle r="220" fill="url(#radar-glow)" />
          </g>

          {/* Base India Geographic Boundary Fill */}
          <path
            d={INDIA_BORDER_PATH}
            fill="url(#india-fill)"
            className="transition-all duration-500"
          />

          {/* Overlay Grid Pattern within India Boundary */}
          <path
            d={INDIA_BORDER_PATH}
            fill="url(#agri-grid)"
            className="pointer-events-none"
          />

          {/* Glowing National Perimeter Outline */}
          <path
            d={INDIA_BORDER_PATH}
            fill="none"
            stroke="url(#border-glow)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
          />

          {/* Inner Secondary Technical Pulse Stroke */}
          <path
            d={INDIA_BORDER_PATH}
            fill="none"
            stroke="#34d399"
            strokeWidth="1.2"
            strokeDasharray="8 12"
            opacity="0.6"
            className="animate-pulse"
          />

          {/* Island Territories (Lakshadweep & Andaman & Nicobar) */}
          <g opacity="0.85">
            {/* Lakshadweep */}
            <circle cx="120" cy="570" r="3" fill="#10b981" />
            <circle cx="125" cy="585" r="2.5" fill="#10b981" />
            <circle cx="122" cy="600" r="2" fill="#10b981" />
            <text x="70" y="590" fill="#94a3b8" fontSize="8" fontFamily="monospace">Lakshadweep</text>

            {/* Andaman & Nicobar */}
            <ellipse cx="505" cy="530" rx="4" ry="12" fill="#10b981" />
            <ellipse cx="515" cy="580" rx="3.5" ry="10" fill="#10b981" />
            <circle cx="522" cy="625" r="3" fill="#10b981" />
            <text x="495" y="645" fill="#94a3b8" fontSize="8" fontFamily="monospace">A&amp;N Islands</text>
          </g>

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
                    stroke="rgba(16, 185, 129, 0.22)"
                    strokeWidth="1.2"
                  />
                  {/* Pulsing Light Beam */}
                  <line
                    x1={fromHub.x}
                    y1={fromHub.y}
                    x2={toHub.x}
                    y2={toHub.y}
                    stroke={fromHub.demandScore > 92 ? '#f43f5e' : '#fbbf24'}
                    strokeWidth="1.6"
                    strokeDasharray="6 14"
                    opacity="0.75"
                    className="animate-pulse"
                    style={{ animationDuration: `${2 + (idx % 3)}s` }}
                  />
                </g>
              );
            })}
          </g>

          {/* Agricultural State Hub Markers & Demand Badges */}
          {filteredHubs.map((hub) => {
            const isSelected = displayHub.id === hub.id;
            const isHighDemand = hub.demandScore >= 92;

            return (
              <g
                key={hub.id}
                transform={`translate(${hub.x}, ${hub.y})`}
                className="cursor-pointer group"
                onClick={() => setActiveHub(hub)}
                onMouseEnter={() => setHoveredHub(hub)}
                onMouseLeave={() => setHoveredHub(null)}
              >
                {/* Invisible generous click/touch target */}
                <circle r="18" fill="transparent" />

                {/* Expanding Radar Wave Ping */}
                <circle
                  r={isSelected ? "18" : "11"}
                  fill="none"
                  stroke={isHighDemand ? hub.demandColor : hub.color}
                  strokeWidth={isSelected ? "2.2" : "1"}
                  opacity="0.65"
                  className="animate-ping"
                  style={{ animationDuration: isSelected ? '1.8s' : '3s' }}
                />

                {/* Second Wave for selected state */}
                {isSelected && (
                  <circle
                    r="26"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.2"
                    opacity="0.45"
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

          {/* Central Ashoka Precision Crosshair (Geographic Heart of India) */}
          <g transform="translate(205.3, 335.1)" className="pointer-events-none opacity-80">
            <circle r="12" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#fbbf24" strokeWidth="0.8" />
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#fbbf24" strokeWidth="0.8" />
          </g>
        </svg>

        {/* Floating Real-Time Hub Telemetry Card: Shows Crop Products & Demand in India */}
        <div className="absolute -bottom-2 sm:bottom-0 inset-x-1 sm:inset-x-2 bg-gradient-to-r from-[#031d10]/98 via-[#06291a]/98 to-[#031d10]/98 backdrop-blur-xl border border-emerald-500/50 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/90 text-xs animate-slide-up">
          
          {/* Top Line: State + Demand Status in India */}
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-emerald-800/40">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-950/90 border border-emerald-400/50 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-sm">{displayHub.cropIcon}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-white text-xs sm:text-sm truncate">
                    {displayHub.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-600/30">
                    {displayHub.sub}
                  </span>
                </div>
              </div>
            </div>

            {/* Demand in India Badge */}
            <div className="flex items-center gap-1 shrink-0">
              <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                displayHub.demandScore >= 92 
                  ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50' 
                  : 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
              }`}>
                <Flame className="w-3 h-3 text-rose-400 animate-pulse" />
                <span>{displayHub.demand}</span>
                <span className="font-mono text-emerald-300">{displayHub.demandGrowth}</span>
              </span>
            </div>
          </div>

          {/* Middle Line: Major Crop Produced & Mandi Rate */}
          <div className="grid grid-cols-12 gap-2 items-center">
            {/* Crops Produced */}
            <div className="col-span-8 min-w-0">
              <div className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
                Crops Produced
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-amber-300 truncate">
                {displayHub.crop}
              </div>
              <div className="text-[10px] text-emerald-300/90 truncate flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{displayHub.demandReason}</span>
              </div>
            </div>

            {/* Mandi Rate vs MSP */}
            <div className="col-span-4 text-right shrink-0">
              <div className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
                Mandi Rate
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-emerald-300 font-mono">
                {displayHub.rate}
              </div>
              <div className="text-[9px] text-slate-400 font-mono">
                MSP: {displayHub.msp}
              </div>
            </div>
          </div>

          {/* Bottom Demand Intensity Progress Bar */}
          <div className="mt-2 pt-1.5 border-t border-emerald-900/40 flex items-center justify-between gap-2 text-[9px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-slate-300">
              <span>National Demand Index:</span>
              <strong className="text-amber-400 font-mono">{displayHub.demandScore}/100</strong>
            </span>
            <div className="w-24 sm:w-32 h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
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

      </div>

      {/* Bottom Coordinates & Accuracy HUD */}
      <div className="relative z-10 mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-slate-300 font-mono px-2 text-center">
        <span className="flex items-center gap-1 text-emerald-300">
          <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" /> 100% Verified MSP Radar
        </span>
        <span className="text-slate-600 hidden xs:inline">•</span>
        <span className="text-slate-300 hidden sm:inline">LAT 20.59° N · LON 78.96° E</span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="text-amber-400">22 Native Languages Synced</span>
      </div>

    </div>
  );
}
